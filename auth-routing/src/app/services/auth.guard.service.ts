import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate,CanActivateChild{

  constructor(private router:Router,private authService:AuthService) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isLoggedIn = this.authService.isLoggedIn();
    if(!isLoggedIn){
      alert('You are not allowed to view this page. You are redirected to login Page');
      console.log('canActivate', isLoggedIn);
      // this.router.navigate(["login"],{ queryParams: { retUrl: route.url} });
      var urlTree = this.router.createUrlTree(['login']);
      return urlTree;
    }
    return isLoggedIn;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   
    if (!this.authService.isAdmin()) {
      alert('You are not allowed to view this page');
      return false;
  }


  return true;
  }
}
