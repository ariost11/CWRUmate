import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

var url = `https://cwrumate.azurewebsites.net/api/set-profile`

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  setProfile(caseID: string, answers: any[]): Observable<any>{
	const options = {
		headers: new HttpHeaders({
			'Content-Type': 'multipart/form-data',
		}),

		body: {
			caseID: caseID,
			name: answers[0],
			photo: answers[1],
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
	}

    return this.http.request('get', url, options);
  }

  getProfile(caseID: string): Observable<any>{
	return new Observable<any>;
  }

  easySetProfile(answers: any[]): Observable<any>{
	const options = {
		headers: new HttpHeaders({
			'Content-Type': 'multipart/form-data',
		}),

		body: {
			caseID: 'test123',
			name: 't',
			photo: answers[1],
			birthday: '480921',
			year: 'jfdkls',
			bio: 'jfdkls',
			gender_identity: ['jfdkls'],
			gender_preferences: ['jfdkls'],
			majors: ['jfdkls'],
			clubs: ['jfdkls'],
			ideal_date: 'jfdkls',
			looking_for: ['jfdkls'],
			political_leaning: 'jfdkls',
			apple_android: 'jfdkls',
			religion: 'jfdkls',
			mothers_maiden_name: 'jfdkls',
			passphrase: 'jfdkls',
			tink: 'jfdkls',
			study_spot: 'jfdkls',
			season: 'jfdkls',
		}
	}

    return this.http.request('get', url, options);
  }
}
