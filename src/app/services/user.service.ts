import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import HttpResponse from '../model/http.response.model';
import { HttpClient } from '@angular/common/http';

let _prefix = '/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  addCompanyMember(params: any): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(`${_prefix}/`, params).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }
}
