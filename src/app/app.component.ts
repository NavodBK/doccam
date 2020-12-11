import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { auth } from 'firebase/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title;
  email;
  password ;
  constructor(public auth: AngularFireAuth) {
  }
  
  logIn(){
    this.auth.signInWithEmailAndPassword( this.email,this.password).catch(function(error){
      console.log(error);
    })
  }
  
  logout(){
    this.auth.signOut().then(function(){
      //signed out
    }).catch(function(error){
      console.log(error);
    })
  }
  
}
