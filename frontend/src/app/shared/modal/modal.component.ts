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
	@Input() read: boolean = true;
	@Input() caseID = '';
	@Input() otherID = '';

	profile:any;
	profile_display:boolean = false;
	modalLoading = false;
	messages: any[];
	myName = 'ERROR';

	activateProfileCard(){
		this.profile_display = true;
		this.modalLoading = true;
		this.modalService.getProfile(this.otherID).subscribe(resp => {
			this.profile = resp.resp
			console.log(resp)
		}, () => {}, () => {this.modalLoading = false;});
	}

	getCount() {
		return this.messages.length - 1;
	}

	sendMessage($event: { message: string; }) {
		var newMessage = {
			text: $event.message,
			user: 'true',
			name: this.myName,
			date: new Date(),
			count: this.getCount() + 1,
		}

		this.modalService.sendMessage(newMessage.text, newMessage.date.toString(), this.caseID, this.otherID).subscribe(resp => {
			if(resp.resp === 'SUCCESS')
				this.messages.push(newMessage);
		});
	}

	getAllMessages() {
		this.modalLoading = true;
		this.modalService.getRecentMessages(this.caseID, this.otherID, 0).subscribe(resp => {
			resp.resp.forEach((a : any) => {
				if(!this.messages.includes(a)) {
					this.messages.push(a);
				}
			});
		}, () => {}, () => {
			this.modalLoading = false;
		});
	}

	addRecentMessages() {
		this.modalService.getRecentMessages(this.caseID, this.otherID, this.getCount()).subscribe(resp => {
			resp.resp.forEach((a: any) => {
				if(!this.messages.includes(a)) {
					this.messages.push(a);
				}
			});
		});
	}

	ngOnInit() {
		//get name
		this.modalService.getName(this.caseID).subscribe(resp => {
			this.myName = resp.resp ? resp.resp : 'ERROR';
		});
		this.picture = this.pictureTime(this.picture);
		//loop messages check
		var tempName = this.replaceSpace(this.name);
		var modalOpen = false;
		var firstClicked = true;
		document.addEventListener('click', () => {
			if(firstClicked) {
				var modal = document.getElementById(`chatModal_${tempName}`);
				console.log(modal);
				modal?.addEventListener('hidden.bs.modal', () => {
					modalOpen = false;
				});
				modal?.addEventListener('shown.bs.modal', () => {
					if(this.messages.length === 0)
						this.getAllMessages();
					modalOpen = true;
				});

				setInterval(() => {
					if(modalOpen && !this.profile_display) {
						this.addRecentMessages();
					}
				}, 1000);
			}
			firstClicked = false;
		});
	}
	
	pictureTime(str: string){
        return str + "?" + new Date().getMilliseconds();
    }

	replaceSpace(str: string){
		return str.replaceAll(" ", "_");
	}
}
