import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  token: string;

  constructor(private router: Router) {}

  signupUser(email:  string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      password = '';
      alert('Your account was created');
      this.router.navigate(['/signin']);
    }).catch(
      error => {
        console.log(error);
        alert('Please try again');
      }
    );
  }

  changePassword(oldPassword: string, newPassword: string) {
    const user = firebase.auth().currentUser;
    user.reauthenticateAndRetrieveDataWithCredential(firebase.auth.EmailAuthProvider.credential(
      user.email,
      oldPassword
    )).then(() => user.updatePassword(newPassword).then(
      response => {
        oldPassword = '';
        newPassword = '';
        alert('Password changed succesfully!');
        this.router.navigate(['/']);
      }
    )).catch(() => alert('Wrong current Password!'));
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken().then(
          (token: string) => {
            this.token = token;
            password = '';
          }
        );
      }).catch(() => alert('Wrong E-Mail/Password'));
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.router.navigate(['/']);
    });
    this.token = null;
  }

  getToken() {
    firebase.auth().currentUser.getIdToken().then(
      (token: string) => this.token = token
    );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

}
