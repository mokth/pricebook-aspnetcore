import { Observable } from 'rxjs/Observable';
import { config } from './config';
import { Http, Headers, RequestOptions, RequestMethod } from "@angular/http";
import { Injectable, Inject } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { AuthHttp, JwtHelper } from 'angular2-jwt';


@Injectable()
export class AuthserviceService {
  authChanged = new Subject<boolean>();
  authMsgChanged = new Subject<string>();
  titleChanged = new Subject<string>();
  isvalidUser:boolean=false;
  jwtHelper: JwtHelper = new JwtHelper();
  userId:string;
  changeMsgChanged = new Subject<string>();
  constructor(private http:Http,@Inject('API_URL') private apiUrl:string) { }
 
  logIn(name: string, password: string) {
      let body = JSON.stringify({	"name":name,"password":password,"fullname":''});
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions();
      options.headers = headers;
      options.method=RequestMethod.Post;
      console.log('posting login');
      this.http.post(this.apiUrl+'api/auth/jwt1',
                    body,{ headers: headers })
        .subscribe(
        (resp)=>{
          let token =resp.json();
          try{
                this.jwtHelper.isTokenExpired(token);
                this.isvalidUser =resp.ok;
                this.userId=name;
                localStorage.setItem('_token', resp.json())
                this.isvalidUser =true;
                this.authChanged.next(true);
                console.log("success login"+token);
          }catch(e)
          {
            this.authMsgChanged.next('Error '+e);
            this.authChanged.next(false);
          }
        },
        (err)=>{
          console.log(err)
          this.authMsgChanged.next('Error '+err);
          this.authChanged.next(false);
        },
        ()=>{
          console.log('Complete post login')
        }
      )
  }

  logOut() {
    this.isvalidUser =false;
     this.authChanged.next(false);
     localStorage.removeItem('_token');
  }

   isAuthenticated() {
    let token= localStorage.getItem('_token');
    let isvalid:boolean=false;
    if (token!=null){
        try{
          isvalid =!this.jwtHelper.isTokenExpired(token);
        }catch(e)
        {
        //  console.log('invalid token');
          
        }
    }
   // console.log('isvalid'+isvalid);
    return isvalid;
  }
  
  getAuthToken(){
    let authToken="";
    let token= localStorage.getItem('_token');
    let isvalid:boolean=false;
    if (token!=null){
        try{
          var decode= this.jwtHelper.decodeToken(token);
          authToken = decode.aud+";"+token;
        }catch(e)
        {
          console.log('invalid token');
          
        }
    }
    return authToken;
  }
  
  requestAccess(screenid: string) {
    let body = JSON.stringify({	"name":this.getUserID(),"password":'nill',"fullname":screenid});
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.getAuthToken());
    return this.http.post(this.apiUrl+'api/auth/access',
                   body,{ headers: headers });
  }

  getUserID(){
    this.userId ="";
    let token= localStorage.getItem('_token');
    let isvalid:boolean=false;
    if (token!=null){
        try{
          var decode= this.jwtHelper.decodeToken(token);
          this.userId = decode.aud;
        }catch(e)
        {
          console.log('invalid token');
          
        }
    }
    return this.userId;
  }

  changePassword(name: string, newpass: string,oldpass:string) {
    let body = JSON.stringify({	"name":name,"fullname":oldpass,"password":newpass});
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post(this.apiUrl+'api/auth/change',
                  body,{ headers: headers })
      .subscribe(
      (resp)=>{
        let result =resp.json();
        try{
            console.log(resp.json());
             if (result.ok=='OK')
                 this.changeMsgChanged.next(result.ok);
             else this.changeMsgChanged.next(result.error);
        }catch(e)
        { }
      },
      (err)=>{
      },
      ()=>{
        console.log('Complete post change')
      }
    )   
}
}
