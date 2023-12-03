import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

var getName = `https://cwrumate.azurewebsites.net/api/get-name`;
var sendMessage = `https://cwrumate.azurewebsites.net/api/send-message`;
var getRecentMessages = `https://cwrumate.azurewebsites.net/api/get-recent-messagez`;
var getProfile = `https://cwrumate.azurewebsites.net/api/get-your-profile`;

@Injectable({
providedIn: 'root'
})
export class ModalService {

	constructor(private http: HttpClient) { }

	loadMessages() {
		return [];
	}

	getName(caseID: string): Observable<any> {
		return this.http.get(getName, {
			params: {
				caseID: caseID
			}
		});
	}

	sendMessage(text: string, date: string, senderID: string, recieverID: string): Observable<any> {
		return this.http.get(sendMessage, {
			params: {
				text: text,
				date: date,
				userA: senderID,
				userB: recieverID,
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

	getProfile(caseID: string): Observable<any>{
		return this.http.get(getProfile, 
			{
				params: {
					caseID: caseID
				}
			}
		);
	  }
}