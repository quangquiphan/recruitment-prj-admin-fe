import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

let _prefix = "/notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient
  ) { }
}
