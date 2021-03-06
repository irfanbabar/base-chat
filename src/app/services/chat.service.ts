import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { AuthService } from "../services/auth.service";
import * as firebase from "firebase/app";

// ==== custom  model
import { ChatMessage } from "../models/chat-message.model";
import { User } from "../models/user.model";

@Injectable()
export class ChatService {
  user: firebase.User;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  userName: string;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth)
  {
    this.afAuth.authState.subscribe(auth => {
      if(auth !== undefined && auth !== null){
        this.user = auth;
      }
      this.getUser().subscribe(a => {
        this.userName = a['displayName'];
      });
    });
  }

  getUser(){
    const user_id = this.user.uid;
    console.log(user_id);
    const path = `/users/${user_id}`;
    return this.db.object(path).valueChanges();
  }

  getUsers(){
    const path = "/users";
    return this.db.list(path).valueChanges();
  }

  sendMesage(msg: string){
    const timeStamp = this.getTimeStamp();
    console.log(timeStamp);
    const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timeStamp,
      userName: this.userName,
      email: email
    });
  }

  getMessages(): AngularFireList<ChatMessage>{
    // query to create our message feed binding
    return this.db.list('messages',
      ref => ref.limitToLast(25)
    );
  }

  getTimeStamp(){
    const now = new Date();
    const date = now.getUTCFullYear() + '/'+
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':'+
                now.getUTCMinutes() + ':' +
                now.getUTCSeconds();
    return (date +' '+time)
  }
}
