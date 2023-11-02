import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  	providedIn: 'root'
})
export class UserLoginStatusService {

	private isLoggedInSource = new ReplaySubject<boolean>(1);
	public isLoggedIn$: Observable<boolean>;
	public caseID = '';

	constructor() {
		this.isLoggedIn$ = this.isLoggedInSource.asObservable();
		this.syncLoggedIn();
	}

	updateCaseID(newID: string) {
		this.caseID = newID;
	}

	updateLoggedInStatus(isLoggedIn: boolean) {
		localStorage.setItem('loggedIn', isLoggedIn ? 'true' : 'false');
		this.syncLoggedIn();
	}

	private syncLoggedIn() {
		this.isLoggedInSource.next(localStorage.getItem('loggedIn') === 'true');
	}
}