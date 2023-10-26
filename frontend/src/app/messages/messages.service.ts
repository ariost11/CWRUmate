import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

var url = `https://cwrumate.azurewebsites.net/api/-----`

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(private http: HttpClient) {}
}