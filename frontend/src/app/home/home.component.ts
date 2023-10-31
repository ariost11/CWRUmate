import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    :host {
      width: 100vw;
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

	apple_map: {[key: string]: string} = {"apple": "fa-brands fa-apple", "android": "fa-brands fa-android", "phone": "fa-solid fa-phone-flip"}
	political_map: {[key: string]: string} = {"democrat": "fa-solid fa-democrat", "republican": "fa-solid fa-republican", "trash": "fa-solid fa-trash", "bath": "fa-solid fa-bath", "fish": "fa-solid fa-fish"}

	accept() {
		this.loading = true;
		this.homeService.swipe(this.caseID, this.profiles[this.profiles_index].caseID, 'YES').subscribe(result => {
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

	majorString(str:string[]){
		var final = "";
		str.forEach((major, i) => {
			final += major;
			if (i < str.length - 1)
				final += ", "
		});
		return final;
	}

	age(str: string){
		var birthday = new Date(str);
		var diff = Math.abs(Date.now() - birthday.getTime())
		return Math.floor(diff / (1000 * 3600 * 24)/365.25)
	}

	phone_pref(str:string){
		return this.apple_map[str];
	}

	political_pref(str: string){
		return this.political_map[str];
	}

	ngOnInit() {
		if(this.caseID) {
			this.homeService.getProfiles(this.caseID).subscribe(profiles => {
				if(profiles.resp === 'PROFILE NOT SET')
					this.toProfile();
			
				console.log(profiles)
				this.profiles = profiles.resp;
				if(this.profiles.length === 0)
					this.noMatches = true;
			}, err => this.invalidSession = true);
		} else
			this.invalidSession = true;
	}

	toProfile() {
		this.router.navigate(['/profile'], { state: {caseID: this.caseID} });
	}
}