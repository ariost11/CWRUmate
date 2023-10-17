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
	invalidSession = false;

	profiles: any[] = [];
	profiles_index = 0;

	accept() {
		this.profiles_index++;
	}

	decline() {
		this.profiles_index++;
	}

	ngOnInit() {
		if(this.caseID) {
			this.homeService.getProfiles(this.caseID).subscribe(profiles => {
				if(profiles.resp === 'PROFILE NOT SET')
					this.toProfile();
			
				console.log(profiles)
				this.profiles = profiles.resp;
			}, err => this.invalidSession = true);
		} else
			this.invalidSession = true;
	}

	toProfile() {
		this.router.navigate(['/profile'], { state: {caseID: this.caseID} });
	}
}