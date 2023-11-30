import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'message-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

	constructor(private modalService: ModalService) {
		this.messages = this.modalService.loadMessages();
	}

	@Input() name = '';
	@Input() lastMessage = '';
	@Input() from = '';
	@Input() picture: any;
	@Input() read: boolean = false;
	@Input() caseID = '';
	@Input() otherID = '';

	messages: any[];
	myName = 'ERROR';
	display = 'none';

	openModal() {
		this.display = 'block';
	}

	closeModal() {
		this.display = 'none';
	}


	now(){
		return new Date();
	}

	sendMessage($event: { message: string; }) {
		var newMessage = {
			text: $event.message,
			user: 'true',
			name: this.myName,
			date: new Date(),
			count: this.modalService.getCount() + 1,
		}

		this.modalService.sendMessage(newMessage.text, newMessage.date.toString(), this.caseID, this.otherID, newMessage.count).subscribe(resp => {
			if(resp.resp === 'SUCCESS')
				this.messages.push(newMessage);
		});
	}

	getAllMessages() {
		this.modalService.getRecentMessages(this.caseID, this.otherID, 0).subscribe(resp => {
			if(resp.resp === 'SUCCESS') {
				this.messages = resp.resp.messages;
			}
		});
	}

	addRecentMessages() {
		this.modalService.getRecentMessages(this.caseID, this.otherID, this.modalService.getCount()).subscribe(resp => {
			if(resp.resp === 'SUCCESS') {
				resp.resp.messages.forEach((message: any) => {
					this.messages.push(message);
				});
			}
		});
	}

	ngOnInit() {
		//set name
		this.modalService.getName(this.caseID).subscribe(resp => {
			this.myName = resp.resp ? resp.resp : 'ERROR';
		});
		
	}
}
