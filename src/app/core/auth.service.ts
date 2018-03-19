import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AuthService {

  authState: any = null;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router) {
      this.afAuth.authState.subscribe((auth) => {
        this.authState = auth
      });
    }

    get isUserAnonymousLoggedIn(): boolean {
      return (this.authState !== null) ? this.authState.isAnonymous : false
    }
   
    get currentUserId(): string {
      return (this.authState !== null) ? this.authState.uid : ''
    }
   
    get currentUserName(): string {
      return this.authState['displayName'] || this.authState['email']
    }

    get currentUserDisplayName(): string {
      if (!this.authState) { return 'Guest' }
      else if (this.authState) { return 'Anonymous' }
      else { return this.authState['displayName'] || 'User without a Name' }
    }
   
    get currentUser(): any {
      return (this.authState !== null) ? this.authState : null;
    }
   
    get isUserEmailLoggedIn(): boolean {
      if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
        return true
      } else {
        return false
      }
    }

    login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Email Login: Nice, it worked!');
        this.router.navigateByUrl('/home');
      })
      .catch(err => {
        console.log('Email Login: Something went wrong: ', err.message);
      });
  }

  emailSignup(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Email Signup: Sucess', value);
        this.router.navigateByUrl('/home');
      })
      .catch(error => {
        console.log('Email Signup: Something went wrong: ', error);
      });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider)
      .then(value => {
        console.log('Google Login: Sucess', value),
          console.log('The given name is ' + value.additionalUserInfo.profile.given_name),
          this.router.navigateByUrl('/home');
      })
      .catch(error => {
        console.log('Google Login: Something went wrong: ', error);
      });
  }

  logout() {
    this.afAuth.auth.signOut()
    .then(value => {
      console.log('Logout: Sucess', value);
      this.router.navigate(['/login']);      
    })
    .catch(error => {
      console.log('Logout: Something went wrong: ', error);
    });   
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider);
  }
}