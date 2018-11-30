import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serviceUrl } from '../../serviceUrl/serviceUrl';


@Injectable({
  providedIn: 'root'
})

/**
 * @var resetpass
 * @var conformregi
 * for registration conform and reset password 
 * api calls by using this class 
 */
export class ResetService {

  registerForm: any = {};
  constructor(private http: HttpClient,private serviceurl:serviceUrl) { }

  getResetValue(resetForm, token) {
    const newdata = new FormData();
    newdata.append('resetemail', resetForm.email);
    newdata.append('resetpassword', resetForm.password);
    newdata.append('token', token);
    alert('password updated')
    return this.http.post(this.serviceurl.host + this.serviceurl.resetpass, newdata);
  }

  getConformValue(resetForm, token) {
    const newdata = new FormData();
    newdata.append('token', token);
    return this.http.post(this.serviceurl.host + this.serviceurl.conformregi, newdata);
  }
}