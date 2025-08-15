import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, signOut, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { FirestoreClient } from 'src/app/data/firestore.client';
import { COLLECTIONS } from 'src/app/data/collections';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly auth: Auth = inject(Auth);
  private readonly firestore: FirestoreClient = inject(FirestoreClient);
  private readonly router: Router = inject(Router);
  
  readonly user$: Observable<User | null> = authState(this.auth);

  constructor() {}

  async googleLogin() {
    const credential = await signInWithPopup(this.auth, new GoogleAuthProvider());
    return this.verifyUserIsAdmin(credential.user);
  }

  async signOut() {
    await signOut(this.auth);
    this.router.navigate(['/']);
  }

  private async verifyUserIsAdmin(user: User) {
    const userDocRef = this.firestore.doc(`${COLLECTIONS.ADMIN_USERS}/${user.uid}`);
    const docSnap = await this.firestore.get(userDocRef.path);

    if (!docSnap.exists()) {
      this.signOut();
      throw new Error('User is not an admin.');
    }
  }
}
