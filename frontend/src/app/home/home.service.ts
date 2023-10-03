import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

var url = `https://cwrumate.azurewebsites.net/api/get-profile`

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) { }

  getProfile(caseID: string): Observable<any>{
    return this.http.get(url, 
      {
        params: {
          caseID: caseID
        }
      }
    );
  }
}