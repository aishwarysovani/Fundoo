import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ResetService } from '../service/resetpass/reset.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})

/**
 * @var hide,@var token
 */
export class ResetpasswordComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl("", [Validators.required]);
  hide = true;
  token = null;
  resetForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private resetService: ResetService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    /**
     * fetch token from activated route
     */
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.token = params['token'];
    });

  }

  /**
   * function call service to reset password value
   * @param form ,@param token
   */
  reset() {
    const obs = this.resetService.getResetValue(this.resetForm, this.token);
    obs.subscribe(
      (s: any) => {
        console.log('got response');
      });


  }
}
