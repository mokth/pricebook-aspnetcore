import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;
  isAuth:boolean;
  displayname:string;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
    this.isAuth=false;
    this.user.subscribe(auth=>{
      if (auth){
        this.isAuth=true;
       // auth.updateProfile({displayName:'TH MOK',photoURL:'http://weknowyourdreams.com/images/girl/girl-12.jpg'})
        this.displayname= auth.displayName;
        console.log(this.displayname);
      }
    });
  }
  
  getUserState(){
    return this.user;
  }
  
  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  logout() {
   return this.firebaseAuth
      .auth
      .signOut();
  }
  
  isAuthenticated(){
    return this.isAuth;
  }
}
