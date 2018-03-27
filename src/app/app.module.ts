import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthserviceService } from "./authservice.service";
import { MainMenuComponent } from "./main-menu/main-menu.component";
import { AuthguardService } from "./authguard.service";
import { config } from './config';
import { CanDeactivateGuard } from "./canDeactivateGuard";
import { PricesetComponent } from './priceset/priceset/priceset.component';
import { ModelServices } from './services/model-services.service';
import { ItemListComponent } from './item-list/item-list.component';
import { ChangePassComponent } from './login/change-pass/change-pass.component';


const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'home', component: AppComponent },
  { path: 'login',component:LoginComponent},
  { path: 'price',component:PricesetComponent , canActivate: [AuthguardService]},
  { path: 'items',component:ItemListComponent , canActivate: [AuthguardService]},
  { path: 'change',component:ChangePassComponent, canActivate: [AuthguardService] },
  { path: 'main',component:MainMenuComponent, canActivate: [AuthguardService] },
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainMenuComponent,
    PricesetComponent,
    ItemListComponent,
    ChangePassComponent,
 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,  
    RouterModule.forRoot(appRoutes)
  ],
  
  providers: [AuthserviceService,
              AuthguardService,
              CanDeactivateGuard,      
              ModelServices,    
               {provide:'API_URL',useValue: config.apiUrl}
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
