import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    constructor(private router: Router) {
        this.caseID = this.router.getCurrentNavigation()?.extras?.state?.['caseID'];
    }

    questionIndex = 0;
    questions = ['What is your name?', 'What are your pronouns?', 'When is your birthday?', 'What is your Major?', 'What clubs are you apart of?', ''];
    answers: string[] = [];
    caseID = '';
}