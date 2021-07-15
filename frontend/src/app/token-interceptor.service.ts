import { Injectable,Injector } from '@angular/core';
import { HttpInterceptor ,HttpErrorResponse} from '@angular/common/http';
import { DataService } from './data.service';
import {throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private router:Router,private injector: Injector,private zone: NgZone) { }

  handleError(error: HttpErrorResponse){
    
    if (error.status === 500) {
      alert("Some Error has Occured. Check Your Connectivity");
      this.zone.run(() => this.router.navigate(['/']));
    }
    return throwError(error);
   }

//code to inject authorization token into http header

  intercept(req:any,next:any){
    let dataservice = this.injector.get(DataService);
    if(dataservice.getToken()){
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization: `Token ${dataservice.getToken()}`
      }
    })
    return next.handle(tokenizedReq).pipe(
      catchError(this.handleError)
    );
  }
  else{
    return next.handle(req);
  }
}
}
