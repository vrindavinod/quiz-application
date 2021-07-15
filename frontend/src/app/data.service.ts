import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://localhost:8000';
  public userDetails= new Subject<any>();
  private messageSource = new BehaviorSubject(this.userDetails);
  currentUser = this.messageSource.asObservable();
  userToken:any;



  constructor(private http: HttpClient,private router: Router) { }

  logoutUser(): Observable<object> {
    return this.http.post(`${this.baseUrl}/api/logout/`, this.userToken);
    
  }
  getToken(){
    return localStorage.getItem('token');
  }
  
  setUser(user:any) {
    this.messageSource.next(user)
    console.log(user["username"]);
    }

  setTest(qpaper:any): Observable<object>{
    return this.http.post(`${this.baseUrl}/questions/settest/`, qpaper);
  }

  getTest(){
    return this.http.get(`${this.baseUrl}/questions/gettest/`);
  }

  sendScore(score:any){
    return this.http.post(`${this.baseUrl}/questions/gettest/`,score);
  }

  getUserType(): Observable<object>{
    return this.http.get(`${this.baseUrl}/api/login/`);
  }

  didTakeTest(){
    return this.http.get(`${this.baseUrl}/questions/settest/`);
  }

}
