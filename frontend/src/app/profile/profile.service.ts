import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

var url = `https://cwrumate.azurewebsites.net/api/set-profile`
var editUrl = `https://cwrumate.azurewebsites.net/api/update-profile`;
var getProfile = `https://cwrumate.azurewebsites.net/api/get-your-profile`;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  setProfile(caseID: string, answers: any[]): Observable<any>{
	const params = {
		caseID: caseID,
		name: answers[0],
		birthday: answers[2],
		year: answers[3],
		bio: answers[4],
		gender_identity: answers[5],
		gender_preferences: answers[6],
		majors: answers[7],
		clubs: answers[8],
		ideal_date: answers[9],
		looking_for: answers[10],
		political_leaning: answers[11],
		apple_android: answers[12],
		religion: answers[13],
		mothers_maiden_name: answers[14],
		passphrase: answers[15],
		tink: answers[16],
		study_spot: answers[17],
		season: answers[18],
	}
	const fileData = answers[1];
	console.log(fileData);
	const formData = new FormData();
    formData.append('file', new Blob([fileData]));

	return this.http.post(url, formData, { params });
  }

  updateProfile(caseID: string, answers: any): Observable<any> {
	const params = {
		caseID: caseID,
		name: answers.name,
		birthday: answers.birthday,
		year: answers.year,
		bio: answers.bio,
		gender_identity: answers.gender_identity,
		gender_preferences: answers.gender_preferences,
		majors: answers.majors,
		clubs: answers.clubs,
		ideal_date: answers.ideal_date,
		looking_for: answers.looking_for,
		political_leaning: answers.political_leaning,
		apple_android: answers.apple_android,
		religion: answers.religion,
		mothers_maiden_name: answers.mothers_maiden_name,
		passphrase: answers.passphrase,
		tink: answers.tink,
		study_spot: answers.study_spot,
		season: answers.season,
	}
	const fileData = answers.photo;
	console.log(fileData);
	const formData = new FormData();
	formData.append('file', new Blob([fileData]));

	return this.http.post(editUrl, formData, { params });
  }

  getProfile(caseID: string): Observable<any>{
	return this.http.get(getProfile, 
		{
			params: {
				caseID: caseID
			}
		}
	);
  }
}