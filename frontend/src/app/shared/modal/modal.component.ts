import { Component, Input } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'message-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

	@Input() name = '';
	@Input() lastMessage = '';
	@Input() from = '';
	@Input() picture: any;
	@Input() read: boolean = false;

	display = 'none';

	openModal() {
		this.display = 'block';
	}

	closeModal() {
		this.display = 'none';
	}

	//MESSAGES STUFF BELOW
	constructor(private modalService: ModalService) {
		this.messages = this.modalService.loadMessages();
	}

	messages: any[];

	sendMessage($event: { message: string; }) {
		console.log(this.modalService.getCount() + 1);
		var newMessage = {
			text: $event.message,
			user: 'true',
			name: 'Ari',
			date: new Date(),
			count: this.modalService.getCount() + 1,
		}
		this.messages.push(newMessage);
	}
}
