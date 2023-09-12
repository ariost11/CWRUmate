import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  firstName = '';
  lastName = '';
  birthday = '';
  email = '';
  password = '';

  submit() {
    console.log(`Name: ${this.firstName} ${this.lastName}`);
    console.log(`Birthday: ${this.birthday}`);
    console.log(`Email: ${this.email}`);
    console.log(`Password: ${this.password}`);
  }
}
