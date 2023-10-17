import { Component } from '@angular/core';
import { SignUpService } from './sign-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private signUpService: SignUpService,
              private router: Router) {}

  user = {
    caseID: '',
    password: '',
    cError: false,
    pError: false,
  };

  networkError = false;
  userTaken = false;
  
  submit() {
    this.user.cError = !this.user.caseID;
    this.user.pError = !this.user.password; //TODO: Add more password requirements

    if(!this.user.cError && !this.user.pError) {
      this.signUpService.addUser(this.user.caseID, this.user.password).subscribe(data => {
        switch(data.resp) {
          case 'SUCCESS':
            this.router.navigate(['/home']);
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
