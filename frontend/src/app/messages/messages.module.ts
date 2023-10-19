import { NgModule } from '@angular/core';
import { MessagesComponent } from './messages.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
	declarations: [
		MessagesComponent
	],
	imports: [
		SharedModule
	]
})
export class MessagesModule { }
