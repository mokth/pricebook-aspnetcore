import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms/src/forms";
import { Router } from "@angular/router";


import { config } from './../config';
import { AuthserviceService } from '../authservice.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLogon:boolean;
  isEnable:boolean=false;
  message:string;
  constructor(private auth:AuthserviceService,
              private router: Router) { }

  ngOnInit() {
    this.isLogon = this.auth.isAuthenticated();
    this.auth.authChanged.subscribe(
        (x)=>{
                this.isLogon = x;
                this.isEnable=false;
                if (this.isLogon){
                  this.router.navigate(['price']);
                }
          }
      ) ;  
    this.auth.authMsgChanged.subscribe(
        (x)=>{
            this.message =x;
          }
      ) ;
  }

   onSignin(form: NgForm) {
    this.isEnable=true;
    const name = form.value.name;
    const password = form.value.password;
    this.auth.logIn(name, password);
  }
}
