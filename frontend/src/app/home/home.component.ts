import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	constructor(private homeService: HomeService,
				private router: Router) {
					this.caseID = this.router.getCurrentNavigation()?.extras?.state?.['caseID'];
				}

	caseID = '';
	profileSetup = true;
	invalidSession = false;

	ngOnInit() {
		if(this.caseID) {
			this.homeService.getProfile(this.caseID).subscribe(profile => {
				console.log('profile: ', profile);
				//TODO: configure profileSetup variable with API!
			}, err => this.invalidSession = true);
		} else
			this.invalidSession = true;
	}

	toProfile() {
		this.router.navigate(['/profile'], { state: {caseID: this.caseID} });
	}
}