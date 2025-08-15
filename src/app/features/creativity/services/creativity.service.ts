import { Injectable } from '@angular/core';
import {
    collection,
    CollectionReference,
    doc,
    endBefore,
    getDoc,
    getDocs,
    getFirestore,
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
import { CreativeUser } from '../models/creativity.models';
import { COLLECTIONS } from 'src/app/data/collections';
@Injectable({
    providedIn: 'root',
})
export class CreativityFirestoreService {
    private readonly _firestore = getFirestore();
    private readonly _metadataCollectionRef = collection(this._firestore, COLLECTIONS.META);
    private readonly _creativityUsersCollectionRef
        = collection(
            this._firestore,
            'creatives-users-config'
        ) as CollectionReference<CreativeUser>;


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
    async saveContact(newUser: CreativeUser): Promise<void> {

        const userDocRef = doc(this._creativityUsersCollectionRef);
        this._incrementUserCounter();
        await setDoc(userDocRef, newUser, { merge: true });
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



    private _incrementUserCounter(): Promise<void> {
        const ref = doc(this._metadataCollectionRef, 'test-counter');
        return updateDoc(ref, {
            count: increment(1),
        });
    }
}
