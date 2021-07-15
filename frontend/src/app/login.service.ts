import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8000';
  userToken:any;

  constructor(private http: HttpClient,private router: Router) { }

  loginUser(sadmin: Object): Observable<object> {
    return this.http.post(`${this.baseUrl}/api/login/`, sadmin);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }
  

}
