import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	constructor(private homeService: HomeService,
				private route: ActivatedRoute,
				private router: Router) {}

	caseID = '';
	profileSetup = false;
	invalidSession = false;

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			this.caseID = params['caseID'];
		}, err => this.invalidSession = true);

		if(this.caseID) {
			this.homeService.getProfile(this.caseID).subscribe(profile => {
				console.log('profile: ', profile);
				//TODO: configure profileSetup variable with API!
			}, err => this.invalidSession = true);
		} else
			this.invalidSession = true;
	}

	toProfile() {
		this.router.navigate(['/profile'], { queryParams: {caseID: this.caseID}, skipLocationChange: true });
	}
}