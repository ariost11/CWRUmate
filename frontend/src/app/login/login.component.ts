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

  signIn() {
    this.user.caseIDError = !this.user.caseID;
    this.user.passwordError = !this.user.password;

    if(!this.user.caseIDError && !this.user.passwordError) {
      this.loginService.login(this.user.caseID, this.user.password).subscribe(loginData => {
        console.log(loginData);
      });
      //this.router.navigate(['/home']);
    }
  }
}
