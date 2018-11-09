import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ConformregiComponent } from './conformregi/conformregi.component';
import { FundoonoteComponent } from './fundoonote/fundoonote.component';
import { AuthGuard } from './auth.guard';
import { NoteComponent } from './note/note.component';


const appRoutes: Routes =([
  {
    path: '',
    component: LoginComponent,pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgotpassword',
    component:ForgotpasswordComponent
  },
  {
    path: 'resetpassword',
    component:ResetpasswordComponent
  },
  // {
  //   path: '',redirectTo:'login',pathMatch:'full'
  // },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'conformregi',component:ConformregiComponent
  },
  {
    path:'fundoonote',component:FundoonoteComponent,canActivate: [AuthGuard] ,
    children:[{
      path:'note',component:NoteComponent,pathMatch: 'full'
    }]
  }
  
]);

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule, 
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
    
  ],
  declarations: []
})
export class AppRoutingModule { }
