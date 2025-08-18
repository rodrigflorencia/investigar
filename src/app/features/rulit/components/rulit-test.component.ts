import { Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { fromEvent, interval, lastValueFrom, Observable, Subscription } from 'rxjs';
import { map, filter, take, tap } from 'rxjs/operators';

import { GraphNode } from '../models/rulit.model';

import { HeaderRulitComponent } from 'src/app/layout/header-rulit/header-rulit.component';
import { MATERIAL_IMPORTS } from 'src/app/shared/ui/material.imports';

import { RulitUserService } from '../services/rulit.service';
import { Breakpoints, BreakpointObserver, BreakpointState, MediaMatcher } from '@angular/cdk/layout';
import { RulitDialogScreenOrientationComponent } from './rulit-dialog-screen-orientation.component';
import { RulitDialogLongMemoryWellcomeComponent } from './rulit-dialog-long-memory-wellcome.component';
import { RulitDialogFinishComponent } from './rulit-dialog-finish.component';
import { RulitDialogNotConnectedNodeComponent } from './rulit-dialog-not-connected-node.component';
import { RulitTestService } from '../services/rulit.test.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-rulit-test-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        HeaderRulitComponent,

        ...MATERIAL_IMPORTS
    ],
    templateUrl: './rulit-test.component.html',
    styleUrls: ['./rulit-test.component.scss'],
})
export class RulitTestPage implements OnInit, AfterViewChecked, OnDestroy {
    @ViewChild('countdown') private readonly _countdown: ElementRef<HTMLElement>;
    @ViewChild('canvas', { static: true })
    private readonly canvas: ElementRef<HTMLCanvasElement>;
    private clickCanvas$: Observable<Event>;
    private orientationChange$: Subscription;
    private exerciseChange$: Subscription;
    private testChange$: Subscription;
    private readonly metaviewport: HTMLMetaElement = document.querySelector(
        'meta[name="viewport"]',
    );

    countDown = 3;
    testStarted = false;

    constructor(
        private readonly ngZone: NgZone,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly _userService: RulitUserService,
        private readonly _testService: RulitTestService,
        private readonly _dialog: MatDialog,
        private readonly _breakpointObserver: BreakpointObserver,
        private readonly _mediaMatcher: MediaMatcher,
        private readonly _snackBar: MatSnackBar,
    ) { }

    private canTakeTest(): boolean {
        if (!this._userService) {
            return true;
        }

        const user = this._userService.user;
        if (user === undefined) {
            return true;
        }
        // If trainingDate is null, allow taking the test
        if (user.trainingDate === null) {
            return true;
        }

        // Calculate days difference between today and trainingDate
        const trainingDate = user.trainingDate.toDate();

        const today = new Date();
        const diffTime = Math.abs(today.getTime() - trainingDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Allow test if at least 4 days have passed since training
        return diffDays >= 4;
    }

    async ngOnInit(): Promise<void> {
        try {
            // When user enters the URL for the long term memory test.
            //      - eg. /rulit/test/<<userId>>
            if (!this._userService.user) {
                const userIdParam = this.route.snapshot.paramMap.get('userId');
                await this._userService.loadUserFromDB(userIdParam);
            }

            // Check if user can take the test
            if (!this.canTakeTest()) {
                this._snackBar.open('No puedes realizar el test nuevamente.', 'Cerrar', {
                    duration: 10000,
                    panelClass: ['error-snackbar']
                });

                return;
            }

            // TODO: Cambiar la segunda condicion por: ! this._testService.isTesting
            if (
                this._userService.user.nextTest === 'long_memory_test' &&
                this._userService.user.longMemoryTest.length === 0
            ) {

                await this.openLongMemoryWellcomeDialog().afterClosed().toPromise();
            }

            // Test inits if the mobile is landscape or not in mobile
            if (this._mediaMatcher.matchMedia(Breakpoints.Handset).matches) {
                let orientationDialogRef: MatDialogRef<RulitDialogScreenOrientationComponent> =
                    null;

                this.orientationChange$ = this._breakpointObserver
                    .observe(Breakpoints.HandsetLandscape)
                    .subscribe((result: BreakpointState) => {
                        if (result.matches) {
                            if (orientationDialogRef) {
                                orientationDialogRef.close();
                            }
                            if (
                                !this.testStarted &&
                                this._breakpointObserver.isMatched(Breakpoints.HandsetLandscape)
                            ) {
                                this.testStarted = true;
                                this.initTest();
                            }
                        } else {
                            orientationDialogRef = this.openScreenOrientationDialog();
                        }
                    });
            } // Not in mobile
            else if (!this._testService.isTesting) {
                this.initTest();
            }
        } catch (error) {
            console.error(error);
        }
    }
    private async initTest() {

        await this.countdown();

        this.setCanvasSize();

        await this._testService.initGraph(
            this.canvas,
            this._userService.user.graphAndSolutionCode,
        );

        // Observers
        this.clickCanvas$ = fromEvent(this.canvas.nativeElement, 'click');

        // Handles user new click
        this.clickCanvas$
            .pipe(
                map((ev: MouseEvent) =>
                    this._testService.graph.getNodeAtPosition(ev.clientX, ev.clientY),
                ),
                filter((node: GraphNode | undefined) => node !== undefined),
                filter((node: GraphNode) => node != this._testService.graph.activeNode),
            )
            .subscribe({
                next: (node) => {
                    if (this._testService.isNodeNextInSolution(node)) {
                        this._testService.setActiveNode(node);
                        this._testService.graph.draw();
                    } else {
                        this._testService.registerError(this._userService.user);
                        if (this._testService.graph.isActiveNodeNextTo(node)) {
                            this._testService.graph.flickerNode(node);
                        } else {
                            this.openNotConnectedNodeDialog();
                        }
                    }
                },
            });

        // On desktop screens, when mouse move:
        //      - set cursor to pointer if over a node
        if (!this._mediaMatcher.matchMedia(Breakpoints.Handset).matches) {
            fromEvent(this.canvas.nativeElement, 'mousemove').subscribe(
                (event: MouseEvent) => {
                    this.ngZone.runOutsideAngular(() => {
                        const newNode = this._testService.graph.getNodeAtPosition(
                            event.clientX,
                            event.clientY,
                        );

                        // Theres a node
                        if (newNode) {
                            if (this._testService.graph.isActiveNodeNextTo(newNode)) {
                                this.canvas.nativeElement.style.cursor = 'pointer';
                                this._testService.graph.highlightNode(newNode);
                                this._testService.graph.draw();
                            }
                        } else {
                            this.canvas.nativeElement.style.cursor = 'default';
                            this._testService.graph.resetHighlights();
                            this._testService.graph.draw();
                        }
                    });
                },
            );
        }

        // When exercise is over go to next one
        this.exerciseChange$ = this._testService.isExerciseOver$
            .pipe(
                filter((isExerciseOver) => isExerciseOver === true),
                tap(() => {
                    if (this._testService.testName === 'learning') {
                        this._userService.user.nextTest = 'short_memory_test';
                    }
                }),
            )
            .subscribe({
                next: () => {
                    this._testService.isTesting = false;
                    this.goNextExercise();
                    this.exerciseChange$.unsubscribe();
                },
            });

        // When test is over go to next one
        this.testChange$ = this._testService.isTestOver$
            .pipe(filter((testOver) => testOver !== null))
            .subscribe({
                next: (testOver) => {
                    if (this._testService.testName === 'short_memory_test') {
                        this._userService.user.nextTest = 'long_memory_test';
                        if (testOver === 'MAX_CORRECT_EXERCISES') {
                            this.openFinishTestDialog(
                                'Completaste la prueba',
                                'Perfecto encontraste el final del camino oculto. En unos dias te enviaremos un e-mail para completar la prueba.',
                            );
                        } else if (testOver === 'MAX_EXERCISES') {
                            this.openFinishTestDialog(
                                'Completaste la prueba',
                                'Muchas gracias por participar, ya practicaste suficiente. En unos dias te enviaremos un e-mail para completar la prueba.',
                            );
                        }
                    } else if (this._testService.testName === 'long_memory_test') {
                        this._userService.user.nextTest = 'no_next_test';
                        this.openFinishTestDialog(
                            '¡Felicitaciones!',
                            'Completaste todas las pruebas. ¡Has hecho un gran aporte a la ciencia!',
                        );
                    }
                    this._testService.isTesting = false;
                    this._userService.saveTestData();
                },
            });

        //
        this._testService.startTest(this._userService);

        // Test starts with first node selected
        this._testService.setActiveNode(this._testService.graph.firstNode);

        // First Draw
        this._testService.graph.draw();

        this.testStarted = true;
    }

    // Sets the canvas used for the graph based on window size
    private setCanvasSize(): void {
        // Has to do this compare because safari and chrome gives different results
        const screenHeight =
            window.screen.height < window.screen.width
                ? window.screen.height
                : window.screen.width;

        if (this._mediaMatcher.matchMedia(Breakpoints.Handset).matches) {
            this.canvas.nativeElement.width = screenHeight * 0.9 * 1.4;
            this.canvas.nativeElement.height = screenHeight * 0.9;
        } else {
            this.canvas.nativeElement.width = 672;
            this.canvas.nativeElement.height = 480;
        }
    }

    private goNextExercise(): void {

        this.router.navigate(['rulit/test', this._userService.user.userId]);
    }

    private countdown() {
        const countdownStart = 3;

        return lastValueFrom(
            interval(1000).pipe(
                take(countdownStart + 1),
                map((i) => countdownStart - i),
                tap((i) => {
                    this.countDown = i;
                }),
            ),
        );
    }

    ngAfterViewChecked(): void {
        // scroll to the graph
        if (this.testStarted) {
            this.canvas.nativeElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest',
            });
        }
        if (!this.testStarted) {
            this._countdown.nativeElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest',
            });
        }
    }

    ngOnDestroy(): void {
        this.metaviewport.content = 'width=device-width, initial-scale=1.0';
        this._testService.isTesting = false;
        if (this.orientationChange$) {
            this.orientationChange$.unsubscribe();
        }
        this.testChange$.unsubscribe();
        this.exerciseChange$.unsubscribe();

    }

    // Dialogs

    private openScreenOrientationDialog(): MatDialogRef<
        RulitDialogScreenOrientationComponent,
        any
    > {
        this.metaviewport.content =
            'width=device-width, initial-scale=1.0, maximum-scale=1.0';
        const config = new MatDialogConfig();
        config.panelClass = ['custom-rulit-dialog'];
        config.disableClose = true;
        return this._dialog.open(RulitDialogScreenOrientationComponent, config);
    }

    private openLongMemoryWellcomeDialog(): MatDialogRef<
        RulitDialogLongMemoryWellcomeComponent,
        any
    > {
        const config = new MatDialogConfig();
        config.panelClass = ['custom-rulit-dialog'];
        config.maxWidth = '30rem';
        config.data = {
            userName: this._userService.user.name,
            message:
                'Hace unos dias encontraste el final del camino oculto. Trata de recordarlo para hallarlo nuevamente, el camino oculto es el mismo. ',
        };
        return this._dialog.open(RulitDialogLongMemoryWellcomeComponent, config);
    }

    private openNotConnectedNodeDialog() {
        const config = new MatDialogConfig();
        config.panelClass = ['custom-rulit-dialog'];
        this._dialog.open(RulitDialogNotConnectedNodeComponent, config);
    }

    //
    private openFinishTestDialog(
        theTitle: string,
        theMessage: string,
    ): MatDialogRef<RulitDialogFinishComponent, any> {
        const config = new MatDialogConfig();
        config.data = { title: theTitle, message: theMessage };
        config.panelClass = ['custom-rulit-dialog'];
        config.disableClose = true;
        return this._dialog.open(RulitDialogFinishComponent, config);
    }
}