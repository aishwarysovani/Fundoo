import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serviceUrl } from '../../serviceUrl/serviceUrl';
@Injectable({
  providedIn: 'root'
})

/**
 * @var forgotpass
 * service used to call api for forgot password
 */
export class ForpassserviceService {

  registerForm: any = {};
  constructor(private http: HttpClient,private serviceurl:serviceUrl) { }

  getForgotValue(form) {
    debugger
    const newdata = new FormData();
    newdata.append('forgotemail', form.email);
    return this.http.post(this.serviceurl.host + this.serviceurl.forgotpass, newdata);
  }
}
