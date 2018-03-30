import { PriceSet, PriceDetail } from './../../model/model';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ModelServices } from '../../services/model-services.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {DatePipe} from '@angular/common'
import { ItemEntry, PrcSet } from '../../model';
import { Observer } from 'rxjs/Observer';

import { AuthserviceService } from '../../authservice.service';

@Component({
  selector: 'app-priceset',
  templateUrl: './priceset.component.html',
  styleUrls: ['./priceset.component.scss']
})
export class PricesetComponent implements OnInit {
  searhForm: FormGroup;
  orderForm: FormGroup;
  items: Promise<any>;
  itemlist:ItemEntry[];
  priceset$:any;
  priceset:PriceDetail[];
  prcset:PrcSet[];
  message:string;

  constructor(private modelserv:ModelServices,
              private authService:AuthserviceService,
              private formBuilder: FormBuilder,
              private router: Router) {
       
  }

  ngOnInit() {
    this.createSearchForm();
    this.orderForm = this.formBuilder.group({
      customerName: '',
      email: '',
      items: this.formBuilder.array([])
    });
    this.modelserv.getPrcSet().subscribe(
      (resp) => {
        this.prcset = resp.json();
      
      },
      (err) => {
        console.log(err)
      }
    )
    
    // this.searhForm = this.formBuilder.group({
    //   pricedate: '',
    //   pricegrp: '',
    // });
  }
  
  OnLoadPrice(){
    this.message="";
    this.itemlist = this.modelserv.getItemEntryList();  
    let pdate = this.searhForm.get('pricedate').value;
    let group = this.searhForm.get('pricegrp').value;
    let fitems = this.orderForm.get('items') as FormArray;
    while (fitems.length !== 0) {
        fitems.removeAt(0);
     }
     this.priceset$= this.modelserv.getPriceSet(pdate,group);
     this.priceset$.subscribe(
        (resp) => {
          if (resp.length===0){
            this.priceset=null;
            this.loadEntryFromItemlist(fitems);
            return;
         }
         this.priceset = resp.json();
         console.log(this.priceset);
         this.priceset.forEach(itm=>{
              let found = this.itemlist.find(entry=> entry.code===itm.code);
              if (found){
                  found.price= itm.unitprice;  
                  console.log(found.price);             
              }
            // fitems.push(this.createItem(itm));
           });
           let count=1;
           this.itemlist.forEach(entry=>{
             fitems.push(this.createItem(entry,count));
             count++;
           });       
        },
        (err) => {
          console.log(err)
        }
      );
  }
  loadEntryFromItemlist(fitems:FormArray){
    let count=1;
    this.itemlist.forEach(entry=>{
      fitems.push(this.createItem(entry,count));
      count++;
     });
  }
  
 isEven(n):boolean {
    return n % 2 == 0;
 }
 
 isOdd(n):boolean {
    return Math.abs(n % 2) == 1;
 }
  createSearchForm() {
     this.searhForm = this.formBuilder.group({
      pricedate: new Date().toISOString().substring(0, 10),
      pricegrp: 'A'
    });
   
  }
  
  get formData() { return <FormArray>this.orderForm.get('items'); }
  
  createItem(itm:ItemEntry,counter:number): FormGroup {
    return this.formBuilder.group({
      no: counter,
      name: itm.name,  
      prodid: itm.prodid,
      prodcode:itm.code,   
      price: itm.price
    });
  }

  OnSave() {
    let prodlist= this.modelserv.getProdList();
    let pdate = this.searhForm.get('pricedate').value;
    let group = this.searhForm.get('pricegrp').value;
    let priset:PriceSet = new PriceSet();
    priset.lastuser = this.authService.getUserID();
    priset.prcdate =pdate;
    priset.prcid =group;
    priset.items=[];
    //console.log(prodlist);
    let fitems = this.orderForm.get('items') as FormArray;
    for(let i=0;i<fitems.length;i++){
      
        let dtl= new PriceDetail();
        dtl.prodid = fitems.at(i).get('prodid').value;
        let prod = prodlist.filter(x=>x.prodid==dtl.prodid);
        console.log(dtl.prodid );
        if (prod==null){
          console.log(dtl.prodid +' is null');
          continue;
        }
        dtl.code = prod[0].code;
        dtl.codename= prod[0].codename;
        dtl.lastuser= priset.lastuser;
        dtl.modifieddate = new Date();
        dtl.prcdate=pdate;
        dtl.prcid= group;
        dtl.unitprice = fitems.at(i).get('price').value;
        priset.items.push(dtl);
    }
   // console.log(priset);
    this.modelserv.postPriceSet(priset)
    .subscribe(resp=>{
       let element: HTMLElement = document.getElementById('openModalButton') as HTMLElement;
       let data =resp.json(); 
       this.message = data.error;
       element.click();
       this.priceset=null;
       this.clearFormArray();
    });
  }
  
  clearFormArray(){
    //console.log('clear');
    let fitems = this.orderForm.get('items') as FormArray;
    while (fitems.length !== 0) {
        fitems.removeAt(0);
      
    }
    fitems = new FormArray([]);
    this.orderForm.reset();
  }

  OnCancel(){
    this.router.navigate(['/main']);
  }
  
   pad(num:number, size:number): string {
      let s = num+"";
      while (s.length < size) s = "0" + s;
      return s;
  }

  getRightSideStarNum():number{
    let fitems = this.orderForm.get('items') as FormArray;    
    let div = Math.trunc(fitems.length/2);
    let rem = fitems.length % 2;
    return div+rem;
  }
}
