import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serviceUrl } from '../../serviceUrl/serviceUrl';


@Injectable({
  providedIn: 'root'
})

/**
 * @var login
 * service used to call api for login
 */
export class LoginService {

  registerForm: any = {};
  constructor(private http: HttpClient,private serviceurl:serviceUrl) { }

  getLoginValue(loginForm) {
    const newdata = new FormData();
    newdata.append('loginemail', loginForm.email);
    localStorage.setItem('email', loginForm.email);
    newdata.append('password', loginForm.password);
    return this.http.post(this.serviceurl.host+this.serviceurl.login, newdata);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  socialLogin(value) {
    const formData = new FormData();
    formData.append('email', value.data[0].email);
    formData.append('profilepic', value.data[0].profilepic);
    formData.append('username', value.data[0].username);
    const otheroption: any = {
    'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.serviceurl.host + this.serviceurl.socialLogin, formData, otheroption);
    
    }  

    loggedIn() {
      return !!localStorage.getItem('token');
      }
}