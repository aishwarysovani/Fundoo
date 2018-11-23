import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../service/loginservice/login.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  flag = false;
  hide = true;
  msg: string = null;
  loginForm: FormGroup;
  status: any;
  returnUrl: string;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private formBuilder: FormBuilder,
    private loginService: LoginService, private route: ActivatedRoute,
    private router: Router) {
    iconRegistry.addSvgIcon(
      'fb',
      sanitizer.bypassSecurityTrustResourceUrl('assets/fb.svg'));
    iconRegistry.addSvgIcon(
      'g',
      sanitizer.bypassSecurityTrustResourceUrl('assets/g.svg'));
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });


    // get return url from route parameters or default to '/'
  }


  login() {
    debugger;
    const obs = this.loginService.getLoginValue(this.loginForm);
    obs.subscribe(
      (s: any) => {
        alert(s.message);
        // console.log('got response');
        if (s.message == "Successful login.") {
          localStorage.setItem('currentUser', s.jwt);
          this.router.navigate([this.returnUrl]);
        }
        else {
          return;
        }

      });


  }

}
