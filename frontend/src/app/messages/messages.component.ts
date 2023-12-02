import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from './messages.service';
/*
 * HOW DATA SHOULD FLOW HERE:
 * List of matches containing name, profile picture, and most recent message and who that's from, if messages are unread.
 * 
 * After the user clicks on a conversation, it will request and open the message history and ability to send messages (This call will flag messages as read).
 * If a message is sent, flag unread for other user, add timestamp.
 **/
@Component({
  	selector: 'app-messages',
  	templateUrl: './messages.component.html',
  	styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
	constructor(private router: Router,
				private messagesService: MessagesService) {
		this.caseID = this.router.getCurrentNavigation()?.extras?.state?.['caseID'];
	}

	matches = [
		{
			name: 'Ari',
			picture: null,
			lastMessage: 'Hiiiiiiiiii!',
			from: '',
			read: true,
			caseID: 'axo193',
		},
		{
			name: 'Georgia',
			picture: null,
			lastMessage: 'Sup loser',
			from: '',
			read: false,
			caseID: 'gcm49',
		},
		{
			name: 'JD',
			picture: null,
			lastMessage: '*LONG DESTINY RANT*',
			from: '',
			read: true,
			caseID: 'jdt96',
		},
		{
			name: 'Amy',
			picture: null,
			lastMessage: 'I have an interview today :(',
			from: '',
			read: false,
			caseID: 'aec127',
		}
	]
	caseID = '';

	ngOnInit() {
		this.messagesService.getMatches(this.caseID).subscribe(resp => {
			console.log(resp);
			// if(resp.resp.length !== 0)
			// 	this.matches = resp.resp;
		});
	}
}
