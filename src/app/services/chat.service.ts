import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { io } from "socket.io-client";
import { Message } from '../models/message.model';


@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public message$: BehaviorSubject<Message | null> = new BehaviorSubject<Message | null>(null);
  public socket = io('http://localhost:8080/');

  constructor(){
    this.getNewMessage().subscribe(message => {
      if (message !== null) {
        this.message$.next(message);
      }
    });
  }

  public sendMessage(message : Message) {
    console.log('Sending message:', message)
    this.socket.emit('/app/message', message);
  }

  // public getNewMessage() : Observable<Message | null> {
  //   return this.message$.asObservable();
  // };

  public getNewMessage(): Observable<Message | null> {
    return new Observable(observer => {
      this.socket.on('message', (message) => {
        console.log('getNewMessage', message);
        observer.next(message);
      });
    });
  }
}
