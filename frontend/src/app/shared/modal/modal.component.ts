import { Component, Input } from '@angular/core';

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
}
