import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '../models/user.model';

@Injectable({
  providedIn: "root",
})

export class AuthService {
  user$: Observable<any>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async register(user: any) {
    const userAuth = await this.afAuth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );

    const data = {
      uid: userAuth.user.uid,
      email: userAuth.user.email.toLocaleLowerCase(),
      name: user.name,
      photo: userAuth.user.photoURL,
      authorized: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: new Date(),
    };

    await this.updateUserData(data);
  }

  resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  updateUserData(data) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${data.uid}`
    );
    return userRef.set(data, { merge: true });
  }

  logout() {
    return this.afAuth.signOut();
  }

  getAuth() {
    return this.afAuth;
  }
}
