import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

var url = `https://cwrumate.azurewebsites.net/api/get-matches`

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  	constructor(private http: HttpClient) {}

	getMatches(caseID: string): Observable<any> {
		return this.http.get(url, {
			params: {
				caseID: caseID
			}
		});
	}
}