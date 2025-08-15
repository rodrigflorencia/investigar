import { Injectable } from '@angular/core';
import {
    collection,
    CollectionReference,
    doc,
    endBefore,
    Firestore,
    getDoc,
    getDocs,
    increment,
    limit,
    orderBy,
    query,
    QuerySnapshot,
    setDoc,
    startAfter,
    startAt,
    updateDoc,
} from '@angular/fire/firestore';
import { CreativeUser } from './creativity.models';
import { COLLECTIONS } from 'src/app/data/collections';

@Injectable({
    providedIn: 'root',
})
export class CreativityRepo {
    private readonly _metadataCollectionRef: CollectionReference;
    private readonly _creativityUsersCollectionRef: CollectionReference<CreativeUser>;

    constructor(private readonly _firestore: Firestore) {

        this._metadataCollectionRef = collection(this._firestore, COLLECTIONS.META);
        this._creativityUsersCollectionRef = collection(
            this._firestore,
            COLLECTIONS.CREATIVITY_USERS,
        ) as CollectionReference<CreativeUser>;
    }

    getCreativityMetadataCounter() {
        const ref = doc(this._metadataCollectionRef, 'test-counter');
        return getDoc(ref);
    }

    getFirstPage(pageSize = 3): Promise<QuerySnapshot<CreativeUser>> {
        const q = query(
            this._creativityUsersCollectionRef,
            orderBy('dateStart', 'desc'),
            limit(pageSize),
        );
        return getDocs(q);
    }

    getPrevPage(
        prevFirst,
        actualFirst,
        pageSize = 3,
    ): Promise<QuerySnapshot<CreativeUser>> {
        const q = query(
            this._creativityUsersCollectionRef,
            orderBy('dateStart', 'desc'),
            limit(pageSize),
            startAt(prevFirst),
            endBefore(actualFirst),
        );
        return getDocs(q);
    }

    getNextPage(actualLast, pageSize = 3): Promise<QuerySnapshot<CreativeUser>> {
        const q = query(
            this._creativityUsersCollectionRef,
            orderBy('dateStart', 'desc'),
            limit(pageSize),
            startAfter(actualLast),
        );
        return getDocs(q);
    }

    async getAllUsersData(): Promise<QuerySnapshot<CreativeUser>> {
        const q = query(
            this._creativityUsersCollectionRef,
            orderBy('dateStart', 'desc'),
        );
        return getDocs(q);
    }

    saveContact(newUser: CreativeUser): Promise<void> {
        const userDocRef = doc(this._creativityUsersCollectionRef);
        this._incrementUserCounter();
        return setDoc(userDocRef, newUser);
    }

    private _incrementUserCounter(): Promise<void> {
        const ref = doc(this._metadataCollectionRef, 'test-counter');
        return updateDoc(ref, {
            count: increment(1),
        });
    }
}