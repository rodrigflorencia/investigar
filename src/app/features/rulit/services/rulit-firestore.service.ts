import { inject, Injectable } from '@angular/core';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    DocumentReference,
    DocumentData,
    DocumentSnapshot,
    QuerySnapshot,
    CollectionReference,
    Firestore
} from '@angular/fire/firestore';
import { IRulitUser, IRulitSettings, IRulitSolutionSettings } from '../models/rulit.model';

@Injectable({
    providedIn: 'root',
})
export class RulitFirestoreService {
    private readonly _firestore = inject(Firestore);

    private readonly _rulitConfigCollectionRef = collection(
        this._firestore,
        'rulit-config'
    ) as CollectionReference<IRulitSettings>;

    private readonly _rulitSolutionsCollectionRef = collection(
        this._firestore,
        'rulit-solutions'
    ) as CollectionReference<IRulitSolutionSettings>;

    private readonly _rulitUserCollectionRef = collection(
        this._firestore,
        'rulit-users'
    ) as CollectionReference<IRulitUser>;

    getRulitSettings(): Promise<DocumentSnapshot<IRulitSettings>> {
        const settingsDocRef = doc(this._rulitConfigCollectionRef, 'config');
        return getDoc(settingsDocRef);
    }

    getRulitSolutionSettings(
        solutionCode: string,
    ): Promise<DocumentSnapshot<IRulitSolutionSettings>> {
        const solutionSettingsDocRef = doc(
            this._rulitSolutionsCollectionRef,
            solutionCode
        );
        return getDoc(solutionSettingsDocRef);
    }

    getAllRulitUsersData(): Promise<QuerySnapshot<IRulitUser>> {
        const q = query(
            this._rulitUserCollectionRef,
            orderBy('trainingDate', 'desc')
        );
        return getDocs(q);
    }

    getNewRulitDocumentRef(): DocumentReference<DocumentData> {
        return doc(this._rulitUserCollectionRef);
    }

    getRulitUserData(userId: string): Promise<DocumentSnapshot<IRulitUser>> {
        const userDocRef = doc(this._rulitUserCollectionRef, userId);
        return getDoc(userDocRef);
    }

    async saveRulitUserData(user: IRulitUser): Promise<void> {
        const userData: any = { ...user };

        if (user.nextTest === 'long_memory_test') {
            userData.trainingDate = serverTimestamp();
        }

        if (user.nextTest === 'no_next_test') {
            userData.testDate = serverTimestamp();
        }

        const userDocRef = doc(this._rulitUserCollectionRef, user.userId);
        await setDoc(userDocRef, userData, { merge: true });
    }
}