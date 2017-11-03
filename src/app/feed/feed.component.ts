import { Component, OnInit, OnChanges } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';

import { ChatService }  from "../services/chat.service";
import { ChatMessage } from '../models/chat-message.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: Observable<ChatMessage[]>;
  constructor(private db: AngularFireDatabase, private chatService: ChatService) { }

  ngOnInit() {
    this.feed = this.db.list('messages', ref=> ref.limitToLast(25).orderByKey(true)).valueChanges();
  }

  ngOnChanges(){
    // this.feed = this.chatService.getMessages();
    this.feed = this.db.list('messages', ref=> ref.limitToLast(25)).valueChanges();
  }
}
