import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

var url = `https://cwrumate.azurewebsites.net/api/create-new-user/`

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  addUser(firstName: string, lastName: string, caseID: string, birthday: string, password: string): Observable<any>{
    return this.http.get(url,
      {
        headers: {
          
        },
        params: {
          firstName: firstName,
          lastName: lastName,
          caseID: caseID,
          birthday: birthday,
          password: password
        }
      });
  }
}
