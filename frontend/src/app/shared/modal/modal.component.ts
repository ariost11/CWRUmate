import { Component } from '@angular/core';

@Component({
  selector: 'message-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
    name = 'Ari';

	display = 'none';

	openModal() {
		this.display = 'block';
	}

	closeModal() {
		this.display = 'none';
	}
}
