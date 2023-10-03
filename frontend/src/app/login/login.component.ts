import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private loginService: LoginService,
              private router: Router) {}

  user = {
    caseID: '',
    password: '',
    caseIDError: false,
    passwordError: false,
  };

  networkError = false;
  wrongPassword = false;
  notAUser = false;

  signIn() {
    this.user.caseIDError = !this.user.caseID;
    this.user.passwordError = !this.user.password;

    if(!this.user.caseIDError && !this.user.passwordError) {
      this.loginService.login(this.user.caseID, this.user.password).subscribe(loginData => {
        console.log(loginData);
        switch(loginData.resp) {
          case 'SUCCESS':
            this.router.navigate(['/home'],  { state: {caseID: this.user.caseID} });
            break;
          case 'INCORRECT PASSWORD':
            this.wrongPassword = true;
            this.user.password = '';
            break;
          case 'USER DNE':
            this.notAUser = true;
            this.user.caseID = '';
            this.user.password = '';
            break;
          default:
            this.networkError = true;
        }
      }, err => {
        this.networkError = true;
      });
    }
  }
}