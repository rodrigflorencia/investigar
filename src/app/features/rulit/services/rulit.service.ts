import { Injectable } from '@angular/core';

import {


    DocumentReference

} from '@angular/fire/firestore';
import { IRulitStep, IRulitExercise, IRulitUser, DEFAULT_GRAPH_SOLUTION, TestName } from '../models/rulit.model';
import { RulitFirestoreService } from './rulit-firestore.service';
import { NavigationService } from './rulit-navigation.service';



interface IRulitTestStep extends IRulitStep {
    initialTime: number;
}

interface IRulitTestExercise extends IRulitExercise {
    currentStep: IRulitTestStep;
    initNewStep(): void;
    completeCurrentStep(): void;
    addIncorrectMove(): void;
    toDataExercise(): IRulitExercise;
    toDataStep(theStep: IRulitTestStep): IRulitStep;
}

@Injectable({
    providedIn: 'root',
})
export class ExerciseService implements IRulitTestExercise {
    totalMoves: number;
    totalIncorrectMoves: number;
    totalExerciseTime: number;
    steps: Array<IRulitStep>;
    currentStep: IRulitTestStep;

    constructor() {
        this.totalMoves = 0;
        this.totalIncorrectMoves = 0;
        this.totalExerciseTime = 0;
        this.steps = new Array<IRulitStep>();
        this.currentStep = null;
    }

    initNewStep(): void {
        this.currentStep = this.buildNewStep();
    }

    completeCurrentStep(): void {
        const currentTimeInMilliseconds = new Date().getTime();

        const timeDiff = new Date(
            currentTimeInMilliseconds - this.currentStep.initialTime,
        );
        this.currentStep.elapsedTime = timeDiff.getMinutes() * 60 * 1000;
        this.currentStep.elapsedTime += timeDiff.getSeconds() * 1000;
        this.currentStep.elapsedTime += timeDiff.getMilliseconds();

        this.totalExerciseTime += this.currentStep.elapsedTime;

        const completeStep = this.toDataStep(this.currentStep);

        this.steps.push(completeStep);
    }

    addIncorrectMove() {
        this.currentStep.incorrectMoves++;
        this.totalIncorrectMoves++;
    }

    toDataExercise(): IRulitExercise {
        const dataExercise: IRulitExercise = {
            totalMoves: 15 + this.totalIncorrectMoves,
            totalIncorrectMoves: this.totalIncorrectMoves,
            totalExerciseTime: this.totalExerciseTime,
            steps: this.steps,
        };

        return dataExercise;
    }

    toDataStep(theStep: IRulitTestStep): IRulitStep {
        return {
            incorrectMoves: theStep.incorrectMoves,
            elapsedTime: theStep.elapsedTime,
        } as IRulitStep;
    }

    private readonly buildNewStep = (): IRulitTestStep => {
        const currentTimeInMilliseconds = new Date().getTime();

        return {
            initialTime: currentTimeInMilliseconds,
            elapsedTime: 0,
            incorrectMoves: 0,
        } as IRulitTestStep;
    };
}


@Injectable({
    providedIn: 'root',
})
export class RulitUserService {

    private _user: IRulitUser;
    private _userDbRef: DocumentReference;

    constructor(
        private readonly _rulitFirestoreService: RulitFirestoreService,
        private readonly _navigationService: NavigationService,
    ) { }

    get user() {
        return this._user;
    }

    createNewUser(newUserData: {
        name: string;
        email: string;

    }): void {
        this._user = {

            userId: '',
            email: newUserData.email || 'usuario@example.com',
            name: newUserData.name || 'usuario@example.com',
            graphAndSolutionCode: '',
            shortMemoryTest: new Array<IRulitExercise>(),
            longMemoryTest: new Array<IRulitExercise>(),
            stepErrors: new Array<number>(),
            nextTest: 'learning',
            trainingDate: null,
            testDate: null,
        };

        for (let i = 0; i < 15; i++) {
            this._user.stepErrors.push(0);
        }

        this._userDbRef = this._rulitFirestoreService.getNewRulitDocumentRef();
        this._user.userId = this._userDbRef.id;

        if (this._navigationService.rulitSolutionCodeUrl !== null) {
            this._user.graphAndSolutionCode =
                this._navigationService.rulitSolutionCodeUrl;
        } else {
            this._user.graphAndSolutionCode = DEFAULT_GRAPH_SOLUTION;
        }

    }

    // Load user from db
    async loadUserFromDB(userId: string): Promise<boolean> {
        this._user = (
            await this._rulitFirestoreService.getRulitUserData(userId)
        ).data();

        return true;
    }

    getConsecutiveCorrectExercises(testName: TestName): number {
        // In this context _user.nextTest has the name of the current test

        if (testName == 'learning') {
            return -1;
        }

        let exercises: Array<IRulitExercise>;

        if (testName == 'short_memory_test') {
            // Exclude the "learning" exercise from the count.
            exercises = Object.assign(
                [],
                this.user.shortMemoryTest.slice(1, this.user.shortMemoryTest.length),
            );
        } else if (testName == 'long_memory_test') {
            exercises = this.user.longMemoryTest;
        }

        let exercisesWithoutMistakes = 0;
        exercises.forEach((exercise) => {
            if (exercise.totalIncorrectMoves == 0) {
                exercisesWithoutMistakes++;
            } else {
                exercisesWithoutMistakes = 0;
            }
        });
        return exercisesWithoutMistakes;
    }

    saveTestData() {

        this._rulitFirestoreService.saveRulitUserData(this._user);
    }
}
export { IRulitUser, IRulitExercise };
