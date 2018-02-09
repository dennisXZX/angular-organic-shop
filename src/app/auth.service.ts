import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute } from "@angular/router";

@Injectable()
export class AuthService {
  // Todo write a User class
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  login() {
    // retrieve the parameter attached to url
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    // store the url into local storage
    localStorage.setItem('returnUrl', returnUrl);

    // sign up using AngularFireAuth
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
