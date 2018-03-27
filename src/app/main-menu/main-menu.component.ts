import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthserviceService } from '../authservice.service';


@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  constructor(private auth:AuthserviceService,private router: Router) { }

  ngOnInit() {
     
  }
 
 
}
