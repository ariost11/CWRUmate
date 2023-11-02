import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { UserLoginStatusService } from '../shared/user-login-status.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService,
              private userLoginStatusService: UserLoginStatusService,
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

  loading = false;

  ngOnInit() {
    this.userLoginStatusService.updateLoggedInStatus(false);
    this.userLoginStatusService.updateCaseID('');
    this.router.navigate(['/login']);
  }

  signIn() {
    this.user.caseIDError = !this.user.caseID;
    this.user.passwordError = !this.user.password;

    if(!this.user.caseIDError && !this.user.passwordError) {
      this.loginService.login(this.user.caseID, this.user.password).subscribe(loginData => {
        switch(loginData.resp) {
          case 'SUCCESS':
            this.userLoginStatusService.updateLoggedInStatus(true);
            this.userLoginStatusService.updateCaseID(this.user.caseID);
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
      }, () => {
        this.loading = false;
      });
    }

    // FOLLOWING CODE IS FROM https://getbootstrap.com/docs/5.0/forms/validation/
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach( (form) => {
        form.addEventListener('submit',  (event: { preventDefault: () => void; stopPropagation: () => void; }) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add('was-validated');
        }, false);
      });
  }
}