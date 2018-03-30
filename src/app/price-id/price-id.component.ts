import { PriceID } from './../model/model';
import { Component, OnInit } from '@angular/core';
import { ModelServices } from '../services/model-services.service';
import { Router } from '@angular/router';
import { PrcSet } from '../model';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-price-id',
  templateUrl: './price-id.component.html',
  styleUrls: ['./price-id.component.scss']
})
export class PriceIdComponent implements OnInit {
  orderForm: FormGroup;
  prcset:PrcSet[];
  items: Promise<any>;
  message:string;

  get formData() { return <FormArray>this.orderForm.get('items'); }

  constructor(private modelserv:ModelServices,
              private router: Router,
              private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
    this.modelserv.getPrcSet().subscribe(
     (resp)=>{
        this.prcset = resp.json();
        let fitems = this.orderForm.get('items') as FormArray;
        this.prcset.forEach(entry=>{
          fitems.push(this.createItem(entry));
         });
     })    
  }
  
  createItem(itm:PrcSet): FormGroup {
    return this.formBuilder.group({
      prcid: itm.prcid,
      prcname: itm.prcname      
    });
  }
  
  OnAddNew(){
    let fitems = this.orderForm.get('items') as FormArray;
    for(let i=0;i<fitems.length;i++){
      let prcid = fitems.at(i).get('prcid').value;
      let prcname = fitems.at(i).get('prcname').value;
      if ((prcid==="")|| (prcname==="")){
        return;
      }
    }
    let entry = new PrcSet();
    entry.prcid="";
    entry.prcname="";
    fitems.push(this.createItem(entry));
    this.prcset.push(entry);
    
  }
  OnDelete(index:number){
    let fitems = this.orderForm.get('items') as FormArray;
    fitems.removeAt(index);
    this.prcset.splice(index,1);
  }
 OnSave(){
  let prcids:PrcSet[]=[];
  let fitems = this.orderForm.get('items') as FormArray;
    for(let i=0;i<fitems.length;i++){
      let entry = new PrcSet();
      entry.prcid = fitems.at(i).get('prcid').value;
      entry.prcname = fitems.at(i).get('prcname').value;
      prcids.push(entry);
    }
  this.modelserv.postPriceId(prcids)
  .subscribe(resp=>{
     let element: HTMLElement = document.getElementById('openModalButton') as HTMLElement;
     let data =resp.json(); 
     this.message = data.error;
     element.click();
    
  });
 }

 OnCancel(){
    this.router.navigate(['/main']);
 }
}
