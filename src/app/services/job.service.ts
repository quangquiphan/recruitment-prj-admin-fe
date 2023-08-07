import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import HttpResponse from '../model/http.response.model';

let _prefix = "/job";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(
    private http: HttpClient
  ) { }

  getJobsByCompanyId(params: any) : Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}`, {params}).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  getJobs(params: any) : Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}/all`, {params}).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  getJob(id: string) : Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}/${id}`).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  searchJobs(params: any) : Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}/search`, {params}).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  deleteJob(id: string) : Observable<HttpResponse> {
    return this.http.delete<HttpResponse>(`${_prefix}/${id}`).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }
}
