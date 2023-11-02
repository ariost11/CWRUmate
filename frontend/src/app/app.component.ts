import { Component } from '@angular/core';
import { UserLoginStatusService } from './shared/user-login-status.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    session$: Observable<boolean>;

    constructor(private userLoginStatuService: UserLoginStatusService,
                private router: Router) {
        this.session$ = userLoginStatuService.isLoggedIn$;
    }

    routeHome() {
        this.router.navigate(['/home'],  { state: {caseID: this.userLoginStatuService.caseID} });
    }

    routeMessages() {
        this.router.navigate(['/messages'],  { state: {caseID: this.userLoginStatuService.caseID} });
    }
}
