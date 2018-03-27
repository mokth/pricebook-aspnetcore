import { PriceSet, PrcSet } from './../model/model';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthserviceService } from '../authservice.service';
import { Prod } from '../model';
import { ItemEntry, PriceDetail } from 'app/model/model';

@Injectable()
export class ModelServices {
  
  prodlist:Prod[];
  prcset:PrcSet[];

  constructor(private http: Http,
              private auth: AuthserviceService,
              @Inject('API_URL') private apiUrl: string) {
      this.getProds();
    
    }

  getProds() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.auth.getAuthToken());
    this.http.get(this.apiUrl + 'api/Prod',
      { headers: headers })
      .subscribe(
        (resp) => {
          this.prodlist = resp.json();
          //console.log(this.prodlist);
        },
        (err) => {
          console.log(err)
        }
      );
  }

  getPrcSet() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.auth.getAuthToken());
    return this.http.get(this.apiUrl + 'api/price/set',
      { headers: headers });
       
  }

  getProdAsyn() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.auth.getAuthToken());
    return this.http.get(this.apiUrl + 'api/Prod',
      { headers: headers })
     
  }

  getProdList(){
    return this.prodlist;
  }


  getPrcSetList(){
    return this.prcset;
  }

  getPriceSet(datestr:string,priceset:string) {
    const searchkey = "?id="+priceset+"&date="+ datestr;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.auth.getAuthToken());
    console.log(this.apiUrl + 'api/Price/details'+searchkey);
    return this.http.get(this.apiUrl + 'api/Price/details'+searchkey,
      { headers: headers });
     
  }

  postPriceSet(priset:PriceSet) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.auth.getAuthToken());
    //console.log(this.apiUrl + 'api/Price/priceset');
    let body: string = JSON.stringify(priset);
    return this.http.post(this.apiUrl + 'api/Price/priceset',
                          body,{ headers: headers });
     
  }

  getItemEntryList():ItemEntry[] {
    let entrys:ItemEntry[]=[];
    console.log("mas "+this.prodlist.length);
    let count=1;
    this.prodlist.forEach(x=>{
       let entry:ItemEntry = new ItemEntry();
           entry.no= count;
           entry.prodid =x.prodid;
           entry.code= x.code;
           entry.name= x.codename;
           entry.price=0.00;
           
       entrys.push(entry);   
       //console.log(x); 
    });
   // console.log(entrys.length);
    return entrys;
 }
}
