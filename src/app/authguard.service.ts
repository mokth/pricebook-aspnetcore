import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";
import { AuthserviceService } from './authservice.service';


@Injectable()
export class AuthguardService implements CanActivate {
 constructor(private authService:AuthserviceService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.debug(this.authService.isAuthenticated());
    return this.authService.isAuthenticated();
  }

}
