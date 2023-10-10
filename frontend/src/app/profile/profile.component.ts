import { Component, EventEmitter } from '@angular/core';
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


    majors = ["Ancient Near / East Egyptian Studies",
		"Anthropology",
		"Art Education",
		"Art History",
		"Asian Studies",
		"Chinese",
		"Classics",
		"Cognitive Science",
		"Communication Sciences",
		"Dance",
		"English",
		"Environmental Studies",
		"French",
		"Francophone Stds",
		"German",
		"German Studies",
		"Gerontological Studies",
		"History",
		"History and Philosophy of Science",
		"International Studies",
		"Japanese Studies",
		"Music",
		"Music Education",
		"Philosophy",
		"Political Science",
		"architecture",
		"Psychology",
		"Religious Studies",
		"Sociology",
		"Spanish",
		"Teacher Education",
		"Theater Arts",
		"Gender Studies",
		"World Literature",
		"Ethnicity",
		"Math and Science",
		"Applied Mathematics",
		"Astronomy",
		"Biochemistry",
		"Biology",
		"Chemical Biology",
		"Chemistry",
		"Data Science and Analytics",
		"Environmental Geology",
		"Evolutionary Biology",
		"Geological Sciences",
		"Mathematics",
		"Mathematics and Physics",
		"Natural Sciences",
		"Neuroscience",
		"Nutrition",
		"Metabolism",
		"Origins Sciences",
		"Physics",
		"Statistics",
		"Systems Biology",
		"Aerospace Engineering",
		"Biomedical Engineering",
		"Chemical Engineering",
		"Civil Engineering",
		"Computer Engineering",
		"Computer Science",
		"Electrical Engineering",
		"Engineering Physics",
		"Engineering undesignated",
		"Materials Science and Engr",
		"Mechanical Engineering",
		"Polymer Science and Engineering",
		"Systems and Control Engineering",
		"Management",
		"Accounting",
		"Economics",
		"Finance",
		"Marketing", 
		"Nursing"
    ];
    questionIndex = 0;
    questions = [
		'What is your name?', 
		'Please upload a few photos of yourself!',
		'When is your birthday?',
		'What year are you?',
		'Please create your bio (in 200 characters or less)!',
		'What is your gender?',
		'What gender(s) are you looking for?', 
		'What is your Major?', 
		'What clubs are you a part of?', 
		'What is your ideal campus date?', 
		'What are you looking for?',
		'What is your political leaning?',
		'What is your religious experience?',
		'What is your mother\'s maiden name',
		'What is the passphrase to your case email?',
		'Pick one- MELT U, PK, or Pinzas',
		'What is your favorite study spot on campus?',
		'What is your favorite season?',
    ];
    answers: any[] = [];
    caseID = '';
	url: [string | ArrayBuffer | null] = [''];

	onFilesSelected(event: any) {
		const files = event.target.files;
		if (files.length === 0)
			return;

		const reader = new FileReader();
		for(let file of files) {
			reader.readAsDataURL(file); 
			reader.onload = (_event) => { 
				this.url.push(reader.result); 
			}
		}
		
		if(this.url[0] === '')
			this.url.shift();
	}
}