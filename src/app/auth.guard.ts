import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const permission = route.data["permission"];
      if (this.authenticationService.isLoggedIn() &&
      permission.only.includes(this.authenticationService.getUserRole())) {
        return true;  
      } else {
        console.log("You had been logout, You are not authorized to access the page");
        this.router.navigateByUrl('/logout');
      }
      return false;
    }
  }