import { Injectable, inject } from '@angular/core';
import { FirestoreClient } from 'src/app/data/firestore.client';
import { COLLECTIONS, docPaths } from 'src/app/data/collections';
import { IRulitUser, IRulitSettings, IRulitSolutionSettings } from './rulit.model';
import { doc } from 'firebase/firestore';
import { orderBy as _orderBy } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
})
export class RulitRepo {
    private readonly firestore = inject(FirestoreClient);

    getSettings() {
        const settingsDocRef = doc(this.firestore.col(COLLECTIONS.RULIT_CONFIG), 'config');
        return this.firestore.get<IRulitSettings>(settingsDocRef.path);
    }

    getSolutionSettings(solutionCode: string) {
        const solutionDocRef = doc(this.firestore.col(COLLECTIONS.RULIT_SOLUTIONS), solutionCode);
        return this.firestore.get<IRulitSolutionSettings>(solutionDocRef.path);
    }

    getAllUsers() {
        return this.firestore.list<IRulitUser>(COLLECTIONS.RULIT_USERS, [
            _orderBy('trainingDate', 'desc'),
        ]);
    }

    getUser(userId: string) {
        return this.firestore.get<IRulitUser>(docPaths.rulitUser(userId));
    }

    // Note: The timestamp logic should ideally be in a service layer.
    saveUser(user: IRulitUser) {
        let userData: Partial<IRulitUser> = { ...user };

        if (user.nextTest === 'long_memory_test') {
            userData.trainingDate = this.firestore.ts();
        }
        if (user.nextTest === 'no_next_test') {
            userData.testDate = this.firestore.ts();
        }

        return this.firestore.set(docPaths.rulitUser(user.userId), userData);
    }

    getNewFirestoreId(): string {
        return doc(this.firestore.col(COLLECTIONS.RULIT_USERS)).id;
    }

}
