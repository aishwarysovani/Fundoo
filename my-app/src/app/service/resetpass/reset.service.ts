import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ResetService {

  private resetpass = 'http://localhost/codeigniter/resetpass';
  private conformregi = 'http://localhost/codeigniter/conformregi';
  registerForm: any = {};
  constructor(private http: HttpClient) { }
  
  getResetValue(resetForm,token) {
  const newdata = new FormData();
  newdata.append('resetemail',resetForm.email);
  newdata.append('resetpassword', resetForm.password);
  newdata.append('token',token);
  alert('password updated')
  return this.http.post(this.resetpass, newdata);
  }

  getconformValue(resetForm,token1) {
    const newdata = new FormData();
    newdata.append('token1',token1);
    // alert(token1)
    return this.http.post(this.conformregi, newdata);
    }
  }