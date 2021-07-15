import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { LoginService } from '../login.service';
import { User } from '../user';
import {Router} from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);

  user: User = new User();
  private userData: any;
  token:any;

  onSubmit() {
    this.login()
    
  }


  constructor(private loginService: LoginService,private route:Router, private dataService: DataService) { }

  ngOnInit(): void {
  }

  login() {
    // var user = [
    //   {
    //       "email": this.user.email,
    //       "password": this.user.password,
    //   }];
    this.loginService.loginUser(this.user)
      .subscribe(
        data => {
          this.token = data;
          this.dataService.setUser(this.user);
          localStorage.setItem('expiry',this.token["expiry"]);
          localStorage.setItem('token',this.token["token"]);
          this.dataService.getUserType().subscribe(data =>{
            this.userData = data
            
            if(this.userData[0].userType=="Staff"){
              this.route.navigate(['/forms']);
            }
            else{
              this.route.navigate(['/test']);
            }
            
          })
          // var type=data['type'];
          // localStorage.setItem('id',data['id']);
          // this.loginService.generatetoken(user).subscribe(
          //   data => {
          //     localStorage.setItem('access',data['access'])
          //     localStorage.setItem('refresh',data['refresh'])
              
          //     if(type == "Super Admin"){
          //       this.route.navigate(['/sadminpanel']);
          //       }
          //       else{
          //       this.route.navigate(['/adminpanel']);
          //       }
            // },
            // error =>{ 
            //   alert("Token Problems");
            //   }
            //   );
            },
        error =>{ 
            if(error){
              alert("Wrong Credentials");
            }
        });
    // this.sadmin = new User();
  }

}
