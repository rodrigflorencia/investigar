import { Injectable, inject } from '@angular/core';
import {
  Firestore, collection, doc, addDoc, setDoc, getDoc, getDocs, updateDoc, deleteDoc,
  serverTimestamp, type DocumentReference, type CollectionReference, type DocumentData,
  query, type QueryConstraint, orderBy, limit, startAfter, endBefore
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class FirestoreClient {
  private readonly db = inject(Firestore);
  col<T = DocumentData>(path: string): CollectionReference<T> { return collection(this.db, path) as any; }
  doc<T = DocumentData>(path: string): DocumentReference<T> { return doc(this.db, path) as any; }
  add<T>(colPath: string, data: T) { return addDoc(this.col<T>(colPath), data as any); }
  set<T>(docPath: string, data: Partial<T>, opts: { merge?: boolean } = { merge: true }) { return setDoc(this.doc<T>(docPath), data as any, opts); }
  update<T>(docPath: string, data: Partial<T>) { return updateDoc(this.doc<T>(docPath) as any, data as any); }
  delete(docPath: string) { return deleteDoc(this.doc(docPath) as any); }
  get<T>(docPath:string) { return getDoc(this.doc<T>(docPath)); }
  async list<T>(colPath: string, constraints: QueryConstraint[] = []) {
    const q = constraints.length ? query(this.col<T>(colPath), ...constraints) : this.col<T>(colPath);
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as T) }));
  }
  async listPage<T>(colPath: string, opts: { orderByField: string; direction?: 'asc'|'desc'; pageSize?: number; startAfterValue?: any; }) {
    const constraints: QueryConstraint[] = [orderBy(opts.orderByField, opts.direction ?? 'asc'), limit(opts.pageSize ?? 25)];
    if (opts.startAfterValue !== undefined) constraints.push(startAfter(opts.startAfterValue));
    const snap = await getDocs(query(this.col<T>(colPath), ...constraints));
    const items = snap.docs.map(d => ({ id: d.id, ...(d.data()) }));
    const nextCursor = snap.docs[-1] ;
    return { items, nextCursor };
  }
  ts() { return serverTimestamp(); }
  startAfter(v: any) { return startAfter(v); }
  endBefore(v: any) { return endBefore(v); }
}
