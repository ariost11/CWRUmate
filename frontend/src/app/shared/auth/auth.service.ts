import { Injectable } from '@angular/core';
import { UserLoginStatusService } from '../user-login-status.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private userLoginStatusService: UserLoginStatusService,
                private router: Router) { }

    isAuthenticated(): boolean {
        return this.userLoginStatusService.caseID !== '';
    }
}
