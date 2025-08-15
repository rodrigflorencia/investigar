import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderCreativityComponent } from 'src/app/layout/header-creativity/header-creativity.component';
import { MATERIAL_IMPORTS } from 'src/app/shared/ui/material.imports';
import { timer, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { Element, CreativeUser, Clock, TestCreativity } from '../models/creativity.models';
import { CreativityStore } from '../models/creativity.store';
import { CreativityRepo } from '../models/creativity.repo';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'app-creativity-test',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        HeaderCreativityComponent, SharedModule,
        ...MATERIAL_IMPORTS,
    ],
    templateUrl: './creativity-test.component.html',
    styleUrls: ['./creativity-test.component.scss'],
})

export class CreativityTestPage implements OnInit {
    private readonly router = inject(Router);
    private readonly store = inject(CreativityStore);
    private readonly repo = inject(CreativityRepo);

    // STATE
    started = false;
    countDown = 4;
    alertDesert = false;
    dateStart: Date;
    dateEnd: Date;

    // CLOCK
    totalTime = 59; // 5 minutes in seconds
    timeLeft = this.totalTime;
    timerSubscription: Subscription;
    clock: Clock = {
        seconds: this.totalTime,
        state: 'started',
        minutes: 4,
        limit: 0,
    };
    // ELEMENT from store
    element: Element;

    // PROPOSAL
    empty = '';
    finalProposals = [];
    proposals = '';
    testCreativity: TestCreativity = {
        id: 1,
        name: 'Creatividad',
    };
    user: CreativeUser;
    points = 0;
    minRandom = 0;
    maxRandom = 2;
    resetClock() {
        this.clock.minutes = 0;
        this.clock.seconds = 0;
        this.alertDesert = false;
        this.clock.state = 'finalized';
    }
    getElement() {
        const finalElement = JSON.parse(localStorage.getItem('final-element'));
        return finalElement;
    }
    ngOnInit(): void {

        this.user = this.getUserFromStorage();
        this.element = this.getElement();

        if (!this.user) {

            this.router.navigate(['/select-test']);
            return;
        }

        this.startCountdown();
    }


    getUserFromStorage(): CreativeUser | null {
        const creativeUser = localStorage.getItem('creative-user');
        console.log(creativeUser);
        return creativeUser ? JSON.parse(creativeUser) : null;
    }

    startCountdown() {
        // Starts at 4, ticks immediately, so user sees 3, 2, 1
        setTimeout(() => {
            this.countDown = 3;
            setTimeout(() => {
                this.countDown = 2;
                setTimeout(() => {
                    this.countDown = 1;
                    setTimeout(() => {
                        this.started = true;
                        this.startTest();
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }

    startTest() {
        this.dateStart = new Date();
        const test = setInterval(() => {
            if (this.clock.state === 'started') {
                this.clock.seconds--;
                if (this.clock.seconds === -1) {
                    this.clock.seconds = this.totalTime;
                    this.clock.minutes--;
                }
                if (
                    this.clock.minutes === this.clock.limit &&
                    this.clock.seconds === this.clock.limit
                ) {
                    this.finalizedTest();
                    clearInterval(test);
                }
            }
        }, 1000);
    }

    get minutesLeft(): number {
        return Math.floor(this.timeLeft / 60);
    }

    get secondsLeft(): number {
        return this.timeLeft % 60;
    }

    activeAlert() {
        if (!this.alertDesert) {
            this.alertDesert = true;
        } else {
            this.alertDesert = false;
        }
    }
    validProposal(arrayProposal: string | any[], empty: any) {

        this.user.proposal = [];
        for (let i = 0; i < arrayProposal.length; i++) {
            const proposal = arrayProposal[i];
            if (proposal !== empty) {
                this.finalProposals.push(proposal);
            }
        }


        return this.finalProposals;
    }

    async finalizedTest() {
        this.timerSubscription?.unsubscribe();
        this.dateEnd = new Date();

        const finalProposals = this.validProposal(this.proposals.split('\n'), this.empty);

        if (this.user && this.element) {
            const updatedUser: CreativeUser = {
                ...this.user,
                proposal: finalProposals,
                object: this.element.name,
                dateStart: this.dateStart,
                dateEnd: this.dateEnd,
            };

            this.repo.saveContact(updatedUser);

        }
        this.points = finalProposals.length;
        localStorage.clear();
        this.store.clearState();

        // Aquí podría navegar a una página de agradecimiento
        // this.router.navigate(['/thank-you']);
    }
}