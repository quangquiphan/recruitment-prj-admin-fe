import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import HttpResponse from '../model/http.response.model';
import { Observable, map } from 'rxjs';

let _prefix = "/user-job"

@Injectable({
  providedIn: 'root'
})
export class UserJobService {

  constructor(
    private http: HttpClient
  ) { }

  getListApplicant(jobStatus: string, params: any) : Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}/${jobStatus}`, {params}).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }
}
