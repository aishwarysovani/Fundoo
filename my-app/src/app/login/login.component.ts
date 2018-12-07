import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../service/loginservice/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoggerService } from '../service/logger/logger.service';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angular-6-social-login-v2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})

/**
 * @var flag,@var hide,@var msgform 
 * form control to valid email id
 */
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  flag = false;
  hide = true;
  msg: string = null;
  loginForm: FormGroup;
  status: any;
  returnUrl: string;
  obs:any;
  fail: string;
  iserror: boolean;
  errorMessage: any;
  errorstack: any;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private formBuilder: FormBuilder,
    private loginService: LoginService, private route: ActivatedRoute,
    private router: Router,private socialAuthService: AuthService) {
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

  // ngOnDestory() {
  //   this.obs.unsubscribe();
  // }

  login() {
    debugger;
    /**
     * service to login with valid emailid and password
     */
    this.obs = this.loginService.getLoginValue(this.loginForm);
    this.obs.subscribe(
      (s: any) => {
        LoggerService.log('LOGIN');
        LoggerService.logdata('LOGIN', s);
        alert(s.message);
        if (s.message == "Successful login.") {
          localStorage.setItem('currentUser', s.jwt);
          this.router.navigate([this.returnUrl]);
        }
        else {
          return;
        }

      });
  }

  public socialSignIn(socialPlatform: string) {
    debugger;
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
    socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(userData => {
    this.sendToRestApiMethod(
    userData.token,
    userData.email,
    userData.image,
    userData.name
    );
    });
    }
    /**
    *@method sendToRestApiMethod() is used send user social login details
    * @param token string
    * @param email string
    * @param profilepic string
    * @param first_name string
    */
    sendToRestApiMethod(
    token: string,
    email: string,
    profilepic: string,
    first_name: string): any {
    
    let data = [{ username: first_name, email: email, profilepic: profilepic }];
    this.obs = this.loginService.socialLogin({ data });
    this.obs.subscribe(
    (response: any) => {
      debugger;
    if (response.status == 200) {
    alert('Login Successfull' + ' ' + response.jwt);
    this.fail = '';
    localStorage.setItem('token', response.jwt);
    localStorage.setItem('email', response.emailId);
    console.log(response);
    this.router.navigate(['/fundoonote']);
    } else if (response.status == 400) {
    this.flag = true;
    this.fail = 'Invalid password';
    alert('Login Failed');
    }
    },
    error => {
    this.iserror = true;
    this.errorMessage = error.message;
    this.errorstack = error.stack;
    }
    );
    }

}
