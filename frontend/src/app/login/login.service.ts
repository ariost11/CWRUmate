import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  addUser(firstName: string, lastName: string, caseID: string, birthday: string, password: string): Observable<any>{
    return this.http.get(`https://cwrumate.azurewebsites.net/api/create-new-user?firstName=${firstName}&lastName=${lastName}&caseID=${caseID}&birthday=${birthday}&password=${password}`);
  }
}
