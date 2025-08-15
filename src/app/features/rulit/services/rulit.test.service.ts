import { ElementRef, Injectable, signal } from '@angular/core';
import { buildGraph, CanvasGraph, getGraphAndSolutionData, GraphNode, IRulitSolutionSettings, IRulitUser, TestName } from '../models/rulit.model';
import { ExerciseService, IRulitExercise, RulitUserService } from './rulit.service';
import { filter, map, Observable, Subject, tap } from 'rxjs';
import { RulitFirestoreService } from './rulit-firestore.service';

@Injectable({
  providedIn: 'root'
})
export class RulitTestService   {
    isTesting: boolean;
    graph: CanvasGraph;
    testName: TestName;


  private readonly _currentUser = signal<IRulitUser | null>(null);
  readonly currentUser = this._currentUser.asReadonly();

  private readonly _solutionCode = signal<string | null>(null);
   solutionCode = this._solutionCode;
  
  
    private _solution: Array<number>;
    private _currentExercise: ExerciseService;
    private _activeNodeChange$: Observable<GraphNode>;
    private readonly _isExerciseOver$: Subject<boolean>;
    private readonly _isTestOver$: Subject<string | null>;
    private _solutionSettings: IRulitSolutionSettings = null;
  
    constructor(
        private readonly _rulitFirestoreService: RulitFirestoreService,
        private readonly _userService: RulitUserService,
      ) {
        this.isTesting = false;
        this._isExerciseOver$ = new Subject<boolean>();
        this._isTestOver$ = new Subject<string | null>();
      }
    set rulitSolutionCodeUrl(urlCode) {
        this._solutionCode.set(urlCode);
      }
    async loadSolutionSettings(): Promise<void> {
      if (this._userService.user) {
        const settingsDoc =
          await this._rulitFirestoreService.getRulitSolutionSettings(
            this._userService.user.graphAndSolutionCode,
          );
        this._solutionSettings = settingsDoc.data();
      }
    }
  
    get isExerciseOver$(): Observable<boolean> {
      return this._isExerciseOver$.asObservable();
    }
  
    get isTestOver$(): Observable<string | null> {
      return this._isTestOver$.asObservable();
    }
  
    async initGraph(
      canvas: ElementRef<HTMLCanvasElement>,
      graphAndSolutionCode: string,
    ): Promise<void> {
      const { graphData, solutionData } =
        getGraphAndSolutionData(graphAndSolutionCode);
      this.graph = await buildGraph(graphData, canvas);
      this._solution = solutionData.reverse();
    }
  
    startTest(userService: RulitUserService): void {
      this.testName = userService.user.nextTest;
      this._currentExercise = new ExerciseService();
      if (!this._solutionSettings) {
        this.loadSolutionSettings();
      }
  
      //
      this._activeNodeChange$ = this.graph.activeNode$;
      this._activeNodeChange$
        .pipe(
          filter((theNode) => theNode.isLastNode),
          map(() => this.getCurrentTestExercisesArray(userService)),
          tap((currentTestExercisesArray) => {
            this.saveCurrentExercise(currentTestExercisesArray);
          }),
        )
        .subscribe({
          next: (currentTestExercisesArray: Array<IRulitExercise>) => {
            const testOver = this.isTestOver(
              userService,
              currentTestExercisesArray,
            );
            if (testOver) {
              this._isTestOver$.next(testOver);
            } else {
              this._isExerciseOver$.next(true);
            }
          },
        });
  
      this.isTesting = true;
    }
  
    private saveCurrentExercise(
      currentTestExercisesArray: Array<IRulitExercise>,
    ): void {
      currentTestExercisesArray.push(this._currentExercise.toDataExercise());
    }
  
    getCurrentTestExercisesArray(
      userService: RulitUserService,
    ): Array<IRulitExercise> {
      let currentTestExercisesArray: Array<IRulitExercise>;
  
      if (this.testName == 'learning' || this.testName == 'short_memory_test') {
        currentTestExercisesArray = userService.user.shortMemoryTest;
      } else if (this.testName == 'long_memory_test') {
        currentTestExercisesArray = userService.user.longMemoryTest;
      }
  
      return currentTestExercisesArray;
    }
  
    private isTestOver(
      userService: RulitUserService,
      currentTestExercisesArray: Array<IRulitExercise>,
    ): string | null {
      const MAX_EXERCISES: number = this.getMaxExercises();
      const MAX_CORRECT_EXERCISES: number = this.getMaxCorrectExercises();
  
      const correctExercisesInTest = userService.getConsecutiveCorrectExercises(
        this.testName,
      );
  
      if (correctExercisesInTest >= MAX_CORRECT_EXERCISES) {
        return 'MAX_CORRECT_EXERCISES';
      }
  
      if (currentTestExercisesArray.length == MAX_EXERCISES) {
        return 'MAX_EXERCISES';
      }
  
      return null;
    }
  
    private getMaxExercises(): number {
      switch (this.testName) {
        case 'short_memory_test':
          return this._solutionSettings.shortMem_MaxExercises;
        case 'long_memory_test':
          return this._solutionSettings.longMem_MaxExercises;
      }
    }
  
    private getMaxCorrectExercises(): number {
      switch (this.testName) {
        case 'short_memory_test':
          return this._solutionSettings.shortMem_MaxCorrectExercises;
        case 'long_memory_test':
          return this._solutionSettings.longMem_MaxCorrectExercises;
      }
    }
  
    isNodeNextInSolution(theNode: GraphNode): boolean {
      // Compare the node to the last element in the array
      return this._solution[this._solution.length - 1] == theNode.id;
    }
  
    setActiveNode(theNode: GraphNode): void {
      if (this._currentExercise.currentStep) {
        this._currentExercise.completeCurrentStep();
      }
  
      this._solution.pop();
      this._currentExercise.initNewStep();
      this.graph.activeNode = theNode;
    }
  
    registerError(user: IRulitUser) {
      this._currentExercise.addIncorrectMove();
      const stepIndex = this._currentExercise.steps.length;
      user.stepErrors[stepIndex] += 1;
    }
  }
