import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private loginService: LoginService) {}

  user = {
    firstName: '',
    lastName: '',
    birthday: '',
    caseID: '',
    password: '',
    fnError: false,
    bError: false,
    cError: false,
    pError: false,
  };
  
  submit() {
    this.user.fnError = !this.user.firstName;
    this.user.bError = !this.user.birthday;
    this.user.cError = !this.user.caseID;
    this.user.pError = !this.user.password; //TODO: Add more password requirements

    console.log(this.user);

    if(!this.user.fnError && !this.user.bError && !this.user.cError && !this.user.pError) {
      this.loginService.addUser(this.user.firstName, this.user.lastName, this.user.caseID, this.user.birthday, this.user.password).subscribe(data => {
        console.log(data);
      });
    }
  }
}
