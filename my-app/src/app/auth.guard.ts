import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './service/loginservice/login.service';
/**
* @Injectable parameter decorator
*/
@Injectable({
providedIn: 'root'
})
/**
* AuthGuard class
*/
export class AuthGuard implements CanActivate {
constructor(private router: Router, private service: LoginService) { }
/**
* canActivate() is function
* checks user logedIn
* return boolean value
*/
canActivate(): boolean {
if (this.service.loggedIn()) {
return true;
} else {
/**
* not logged in so redirect to login page with the return url
**/
this.router.navigate(['/login']);
return false;
}
}
}