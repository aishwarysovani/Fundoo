import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ResetService } from '../service/resetpass/reset.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-conformregi',
  templateUrl: './conformregi.component.html',
  styleUrls: ['./conformregi.component.css']
})

/**
 * @var token
 */
export class ConformregiComponent implements OnInit {

  token: string = null;
  resetForm: FormGroup;
  obs:any;

  constructor(private formBuilder: FormBuilder, private resetService: ResetService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    /**
     * fetch token from activated route
     */
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.token = params['token'];

    });

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.activatedRoute.queryParams.unsubscribe();
    this.obs.unsubscribe();
  }

  /**
   * service to conform registration
   */
  conform() {
   this.obs = this.resetService.getConformValue(this.resetForm, this.token);
    this.obs.subscribe(
      (s: any) => {
        console.log('got response');
      });
  }

}
