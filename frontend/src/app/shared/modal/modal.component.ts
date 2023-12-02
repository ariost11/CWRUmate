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

	profile:any;
	profile_display:boolean = false;
	modalLoading = false;
	messages: any[];
	myName = 'ERROR';

	now(){
		return new Date();
	}

	activateProfileCard(){
		this.profile_display = true;
		this.modalLoading = true;
		this.modalService.getProfile(this.otherID).subscribe(resp => {
			this.profile = resp.resp
			console.log(resp)
		}, () => {}, () => {this.modalLoading = false;});
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
		this.modalLoading = true;
		this.modalService.getRecentMessages(this.caseID, this.otherID, 0).subscribe(resp => {
			if(resp.resp === 'SUCCESS') {
				this.messages = resp.resp.messages;
			}
		}, () => {}, () => {
			this.modalLoading = false;
		});
	}

	addRecentMessages() {
		this.modalLoading = true;
		this.modalService.getRecentMessages(this.caseID, this.otherID, this.modalService.getCount()).subscribe(resp => {
			if(resp.resp === 'SUCCESS') {
				resp.resp.messages.forEach((message: any) => {
					this.messages.push(message);
				});
			}
		}, () => {}, () => {
			this.modalLoading = false;
		});
	}

	ngOnInit() {
		//get name
		this.modalService.getName(this.caseID).subscribe(resp => {
			this.myName = resp.resp ? resp.resp : 'ERROR';
		});

		//loop messages check
		var tempName = this.name;
		var modalOpen = false;
		var profile_display = this.profile_display;
		document.addEventListener("DOMContentLoaded", () => {
			var modal = document.getElementById(`chatModal_${tempName}`);
			modal?.addEventListener('hidden.bs.modal', function (event) {
				modalOpen = false;
			});
			modal?.addEventListener('shown.bs.modal', function (event) {
				modalOpen = true;
			});
			setInterval(() =>{
				if(modalOpen && !this.profile_display)
					console.log('open');
					//this.addRecentMessages();
			}, 1000);
		});
	}
}
