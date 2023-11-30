import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {

    @Input() profile: any = {};

    apple_map: {[key: string]: string} = {"apple": "fa-brands fa-apple", "android": "fa-brands fa-android", "phone": "fa-solid fa-phone-flip"}
	political_map: {[key: string]: string} = {"democrat": "fa-solid fa-democrat", "republican": "fa-solid fa-republican", "trash": "fa-solid fa-trash", "bath": "fa-solid fa-bath", "fish": "fa-solid fa-fish"}


    majorString(arr:string[]){
        var final = "";
        arr.forEach((major, i) => {
            final += major;
            if (i < arr.length - 1)
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
}
