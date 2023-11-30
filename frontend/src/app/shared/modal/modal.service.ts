import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

var getName = `https://cwrumate.azurewebsites.net/api/get-name`;
var sendMessage = `https://cwrumate.azurewebsites.net/api/send-message`;
var getRecentMessages = `https://cwrumate.azurewebsites.net/api/get-recent-messages`;

@Injectable({
providedIn: 'root'
})
export class ModalService {

	constructor(private http: HttpClient) { }

	messages = [
		{
			text: 'Hello, how are you? This should be a very long message so that we can test how it fit into the screen.',
			reply: false,
			date: new Date(),
			name: 'Amy',
			count: 0,
		},
		{
			text: 'Hello, how are you? This should be a very long message so that we can test how it fit into the screen.',
			reply: true,
			date: new Date(),
			name: 'Ari',
			count: 1,
		},
		{
			text: 'Hello, how are you?',
			reply: false,
			date: new Date(),
			name: 'Amy',
			count: 2,
		},
		{
			text: 'Hey looks at that pic I just found!',
			reply: true,
			date: new Date(),
			name: 'Ari',
			count: 3,
		},
		{
			text: 'What do you mean by that?',
			reply: false,
			date: new Date(),
			name: 'Amy',
			count: 4,
		},
		{
			text: 'Attached is an archive I mentioned',
			reply: false,
			date: new Date(),
			name: 'Amy',
			count: 5,
		},
		{
			text: 'Meet me there',
			reply: true,
			date: new Date(),
			name: 'Ari',
			count: 6,
		},
	];

	loadMessages() {
		return this.messages;
	}

	getCount() {
		return this.messages[this.messages.length - 1].count;
	}

	getName(caseID: string): Observable<any> {
		return this.http.get(getName, {
			params: {
				caseID: caseID
			}
		});
	}

	sendMessage(text: string, date: string, senderID: string, recieverID: string, count: number): Observable<any> {
		return this.http.get(sendMessage, {
			params: {
				text: text,
				date: date,
				senderID: senderID,
				recieverID: recieverID,
				count: count,
			}
		});
	}

	getRecentMessages(senderID: string, recieverID: string, count: number): Observable<any>{
		return this.http.get(getRecentMessages, {
			params: {
				senderID: senderID,
				recieverID: recieverID,
				count: count
			}
		});
	}
}