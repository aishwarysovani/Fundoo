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
import { EditnoteComponent } from './editnote/editnote/editnote.component';
import { EditlabelComponent } from './editlabel/editlabel.component';
import { ReminderComponent } from './reminder/reminder.component';
import { BinComponent } from './bin/bin.component';
import { ArchiveComponent } from './archive/archive.component';
import { CollaboratorComponent } from './collaborator/collaborator.component';


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
    },
    {
      path:'reminder',component:ReminderComponent
    },
    {
      path:'bin',component:BinComponent
    },
    {
      path:'archive',component:ArchiveComponent
    }
  ]
  },
  {
    path:'editnote',component:EditnoteComponent
  },
  {
    path:'editlabel',component:EditlabelComponent
  },
  {
    path:'collaborator',component:CollaboratorComponent
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
