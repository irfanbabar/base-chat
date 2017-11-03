import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from "../models/chat-message.model";
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() chatMessage: ChatMessage;
  userEmail: string;
  userName: string;
  timeStamp: string;
  messageContent: string;

  constructor() { }

  ngOnInit(chat = this.chatMessage) {
    this.userEmail = chat.email;
    this.userName = chat.userName;
    this.messageContent = chat.message;
    this.timeStamp = chat.timeSent;
  }

}
