import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private dataService: DataService,private route:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.dataService.logoutUser()
    .subscribe(
      data => {
        localStorage.removeItem('expiry');
        localStorage.removeItem('token');
        this.route.navigate(['/']);
       
          },
      error =>{ 
          if(error){
            alert("Wrong Credentials");
          }
      });
    }
}
