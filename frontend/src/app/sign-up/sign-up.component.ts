import { Component, OnInit } from '@angular/core';
import { SignUpService } from './sign-up.service';
import { Router } from '@angular/router';
import { UserLoginStatusService } from '../shared/user-login-status.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  constructor(private signUpService: SignUpService,
              private userLoginStatusService: UserLoginStatusService,
              private router: Router) {}

  user = {
    caseID: '',
    password: '',
    cError: false,
    pError: false,
  };

  networkError = false;
  userTaken = false;
  loading = false;

  ngOnInit() {
    this.userLoginStatusService.updateLoggedInStatus(false);
    this.userLoginStatusService.updateCaseID('');
    this.router.navigate(['/sign-up']);
  }
  
  submit() {
    this.user.cError = !this.user.caseID;
    this.user.pError = !this.user.password; //TODO: Add more password requirements

    if(!this.user.cError && !this.user.pError) {
      this.loading = true;
      this.signUpService.addUser(this.user.caseID, this.user.password).subscribe(data => {
        switch(data.resp) {
          case 'SUCCESS':
            this.userLoginStatusService.updateLoggedInStatus(true);
            this.userLoginStatusService.updateCaseID(this.user.caseID);
            this.router.navigate(['/home'], { state: {caseID: this.user.caseID} });
            break;
          case 'FAIL':
            this.userTaken = true;
            this.user.caseID = ''; //TODO: remove more fields if necessary
            break;
          default: 
            this.networkError = true;
        }
      }, err => {
        this.networkError = true;
      }, () => {
        this.loading = false;
      }
      );
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
