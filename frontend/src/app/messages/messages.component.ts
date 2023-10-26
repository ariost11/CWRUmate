import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from './messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
	constructor(private router: Router,
				private messagesService: MessagesService) {
		this.caseID = this.router.getCurrentNavigation()?.extras?.state?.['caseID'];
	}

	caseID = '';
	
}
