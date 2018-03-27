import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthserviceService } from './authservice.service';
import { config } from './config';
import { ModelServices } from './services/model-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title:string ;
  constructor(private auth:AuthserviceService,
             private router: Router){
    if (auth.isAuthenticated()){
        router.navigate(['/price']);
    }else router.navigate(['/login']);
  }
  isLogon:boolean;

  ngOnInit() {
   
    this.isLogon = this.auth.isAuthenticated();
    this.auth.authChanged.subscribe(
      (x)=>{this.isLogon=x; }
   
      ) ;
   
  }

  isAuthenticate(){
    return this.auth.isAuthenticated();
  }

  OnLogout(){
    this.auth.logOut();
    this.router.navigate(['/login']);
  }
}
