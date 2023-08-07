import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import HttpResponse from '../model/http.response.model';

let _prefix = "/language";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private http: HttpClient
  ) { }

  addLanguage(params: any) : Observable<HttpResponse> {
    return this.http.post<HttpResponse>(`${_prefix}`, params).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  editLanguage(id: string, params: any) : Observable<HttpResponse> {
    return this.http.put<HttpResponse>(`${_prefix}/${id}`, params).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  getAllLang() : Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}`).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  getLang(id: string) : Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}/${id}`).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  getPageLang(params: any) : Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}/pages`, {params}).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  searchLang(params: any) : Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}/search`, {params}).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  deleteLang(id: string) : Observable<HttpResponse> {
    return this.http.delete<HttpResponse>(`${_prefix}/${id}`).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }
}
