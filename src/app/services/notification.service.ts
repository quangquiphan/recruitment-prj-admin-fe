import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import HttpResponse from '../model/http.response.model';

let _prefix = "/notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient
  ) { }

  getAllNotificationsByCompany(params :any) : Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}`, {params}).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }
}
