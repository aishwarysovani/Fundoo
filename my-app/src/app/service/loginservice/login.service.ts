import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private login = 'http://localhost/codeigniter/Login';

  registerForm: any = {};
  constructor(private http: HttpClient) { }

  getLoginValue(loginForm) {
    const newdata = new FormData();
    newdata.append('loginemail', loginForm.email);
    localStorage.setItem('email', loginForm.email);
    // alert(localStorage.getItem('email'));
    newdata.append('password', loginForm.password);
    return this.http.post(this.login, newdata);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}