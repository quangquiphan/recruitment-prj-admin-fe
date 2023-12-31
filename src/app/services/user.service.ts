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
    return this.http.post<HttpResponse>(`${_prefix}/member`, params).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  getCompanyMember(params: any): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}/member`, {params}).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  getUser(id: string): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}/${id}`).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  searchUser(params: any): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}/search`, {params}).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  updateCompanyMember(id: string, params: any): Observable<HttpResponse> {
    return this.http.put<HttpResponse>(`${_prefix}/member/${id}`, params).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  deleteUser(id: string): Observable<HttpResponse> {
    return this.http.delete<HttpResponse>(`${_prefix}/${id}`).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }
}
