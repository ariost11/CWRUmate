import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    :host {
      width: 100vw;
	  height: 100vh;
    }`],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	constructor(private homeService: HomeService,
				private router: Router) {
					this.caseID = this.router.getCurrentNavigation()?.extras?.state?.['caseID'];
				}

	caseID = '';
	invalidSession = false;
	noMatches = false;
	swipeFailed = false;
	loading = false;

	profiles: any[] = [];
	profiles_index = 0;

	
	accept() {
		this.loading = true;
		this.homeService.swipe(this.caseID, this.profiles[this.profiles_index].caseID, 'YES').subscribe(result => {
			console.log(result);
			this.swipeFailed = false;
			if(result.resp === 'ERROR')
				this.swipeFailed = true;
		}, err => {
			this.swipeFailed = true;
		}, () => {
			if(!this.swipeFailed) {
				this.profiles_index++;
				if (this.profiles_index >= this.profiles.length){
					this.noMatches = true;
				}
			}
			this.loading = false;
		});
	}

	decline() {
		this.loading = true;
		this.homeService.swipe(this.caseID, this.profiles[this.profiles_index].caseID, 'NO').subscribe(result => {
			console.log(result);
			this.swipeFailed = false;
			if(result.resp === 'ERROR')
				this.swipeFailed = true;
		}, err => {
			this.swipeFailed = true;
		}, () => {
			if(!this.swipeFailed) {
				this.profiles_index++;
				if (this.profiles_index >= this.profiles.length){
					this.noMatches = true;
				}
			}
			this.loading = false;
		});
	}

	ngOnInit() {
		if(this.caseID) {
			this.homeService.getProfiles(this.caseID).subscribe(profiles => {
				if(profiles.resp === 'PROFILE NOT SET') {
					this.toProfile();
					return;
				}
			
				this.profiles = profiles.resp;
				
				if(this.profiles.length === 0)
					this.noMatches = true;
				else{
					console.log(this.profiles[0].photo)
				}
			}, err => this.invalidSession = true);
		} else
			this.invalidSession = true;
	}

	toProfile() {
		this.router.navigate(['/profile'], { state: {caseID: this.caseID, newUser: true} });
	}
}