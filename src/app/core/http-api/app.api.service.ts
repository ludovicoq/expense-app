import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class AppApiService {

  constructor(  private readonly http: HttpClient  ) { }

  getTests(): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    console.log(environment.apiUrl);
    return this.http.get<string>(`${environment.apiUrl}}/test`, { headers: headers, responseType: 'text' })
  }
}
