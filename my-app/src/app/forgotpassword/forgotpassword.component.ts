import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ForpassserviceService } from '../service/forpassservice/forpassservice.service';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
  providers: [ForpassserviceService]
})

/**
 * @var msg
 * form control to required valid email id
 */
export class ForgotpasswordComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  form: FormGroup;
  public msg: string = null;
  constructor(private formBuilder: FormBuilder, private forpassserviceService: ForpassserviceService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [" ", [Validators.required, Validators.email]]

    });
  }

  /**
   * service to forgot password
   * @param emailid
   */
  forgot() {
    const obs = this.forpassserviceService.getforgotValue(this.form);
    obs.subscribe(
      (s: any) => {
        console.log('got response');
      });
    this.msg = "send link on mail to reset password";

  }
}
