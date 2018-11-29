import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

/**
 * @var forgotpass
 * service used to call api for forgot password
 */
export class ForpassserviceService {

  private forgotpass = 'http://localhost/codeigniter/Forgotpass';
  registerForm: any = {};
  constructor(private http: HttpClient) { }

  getForgotValue(form) {
    debugger
    const newdata = new FormData();
    newdata.append('forgotemail', form.email);
    return this.http.post(this.forgotpass, newdata);
  }
}
