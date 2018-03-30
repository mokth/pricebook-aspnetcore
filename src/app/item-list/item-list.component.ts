import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelServices } from '../services/model-services.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  constructor(private modelserv:ModelServices,
              private router: Router) {}
  item$:any;

  ngOnInit() {
    this.item$= this.modelserv.getProdList();
  }
  
  OnCancel(){
    this.router.navigate(['/main']);
  }

  getStatus(status:number):string{
    return (status==0)?"ACTIVE":"INAVTIVE";
  }
}
