import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import HttpResponse from '../model/http.response.model';
import { get } from 'lodash';

let _prefix = "/dashboard";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  dashboard(): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}`).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }
}
