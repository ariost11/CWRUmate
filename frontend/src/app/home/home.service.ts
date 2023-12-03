import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

var url = `https://cwrumate.azurewebsites.net/api/get-potential-matches`
var swipe_url = `https://cwrumate.azurewebsites.net/api/swipe-on-user`

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) { }

  getProfiles(caseID: string): Observable<any>{
    return this.http.get(url, 
      {
        params: {
          caseID: caseID
        }
      }
    );
  }

  swipe(caseID: string, nextCaseID: string, result: string): Observable<any>{
    return this.http.get(swipe_url,
      {
        params: {
          userA: caseID,
          userB: nextCaseID,
          result: result
        }
      }
    );
  }
}