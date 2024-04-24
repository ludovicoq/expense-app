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
    return this.http.get(`${environment.apiUrl}/test`, { responseType: 'text' });
  }
}
