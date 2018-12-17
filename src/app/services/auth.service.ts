import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuardService implements CanActivate {

 constructor() {
  }

  canActivate() {
  	return true;
  //   debugger;
  //   if(localStorage.getItem('CurrentUser')){
  //   	this.router.navigate(['/home/movies']);
  //   	console.log("allowed");
  //   	return true;
  //   }else{
  //   	this.router.navigate(['/login']);
  //   	console.log("not allowed" + localStorage.getItem('CurrentUser'));
  //   return false;
  // }
  }
}
