import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {FormControl, Validators,FormGroup, FormBuilder} from '@angular/forms';
import { ResetService } from '../service/resetpass/reset.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-conformregi',
  templateUrl: './conformregi.component.html',
  styleUrls: ['./conformregi.component.css']
})
export class ConformregiComponent implements OnInit {

  token1:string=null;
  resetForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private resetService: ResetService,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.token1 = params['token'];
     
      });

  }

  conform() {
    const obs = this.resetService.getconformValue(this.resetForm,this.token1);
    obs.subscribe(
    (s: any) => {
    console.log('got response');
     });

}

}
