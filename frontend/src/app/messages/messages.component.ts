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

	matches: any[] = [];
	caseID = '';

	ngOnInit() {
		this.messagesService.getMatches(this.caseID).subscribe(resp => {
			if(resp.resp.length !== 0)
				this.matches = resp.resp;
		});
	}
}
