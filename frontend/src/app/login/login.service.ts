import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

var url = `https://cwrumate.azurewebsites.net/api/sign-in`

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  login(caseID: string, password: string): Observable<any>{
    return this.http.get(url, 
      {
        params: {
          caseID: caseID,
          password: password
        }
      }
    );
  }
}