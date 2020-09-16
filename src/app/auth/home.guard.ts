import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UsercrudService } from '../services/usercrud.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HomeGuard implements CanActivate {
  
  constructor(public userService: UsercrudService, public router: Router) { }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(!this.userService.isLoggedIn()) 
      {
        this.router.navigate(['login']);
        return false;
      }
      
      return true;

  }
  
}
