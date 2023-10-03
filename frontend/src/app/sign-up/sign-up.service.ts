import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

var url = `https://cwrumate.azurewebsites.net/api/create-new-user/`

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  constructor(private http: HttpClient) { }

  addUser(caseID: string, password: string): Observable<any>{
    return this.http.get(url,
      {
        headers: {},
        params: {
          caseID: caseID,
          password: password
        }
      });
  }
}
