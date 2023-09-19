import { Component } from '@angular/core';
import { SignUpService } from './sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private signUpService: SignUpService) {}

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
      this.signUpService.addUser(this.user.firstName, this.user.lastName, this.user.caseID, this.user.birthday, this.user.password).subscribe(data => {
        console.log(data);
      });
    }
  }
}
