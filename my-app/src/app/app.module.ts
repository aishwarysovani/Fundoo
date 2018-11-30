import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, ROUTES, RoutesRecognized } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RegisterComponent } from './register/register.component';
import { MatDatepickerModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { RegisterService } from './service/register/register.service';
import { LoginService } from './service/loginservice/login.service';
import { ForpassserviceService } from './service/forpassservice/forpassservice.service';
import { ResetService } from './service/resetpass/reset.service';
import { ConformregiComponent } from './conformregi/conformregi.component';
import { FundoonoteComponent } from './fundoonote/fundoonote.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule, MatListModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NoteService } from './service/note/note.service';
import { MatChipsModule } from '@angular/material/chips';
import { NoteComponent } from './note/note.component';
import { ListviewService } from './service/listview/listview.service';
import { IntercepterService } from './service/jwtintercepter/intercepter.service';
import { MatDialogModule } from '@angular/material/dialog';
import { EditnoteComponent } from './editnote/editnote/editnote.component';
import { EditlabelComponent } from './editlabel/editlabel.component';
import { ReminderComponent } from './reminder/reminder.component';
import { BinComponent } from './bin/bin.component';
import { ArchiveComponent } from './archive/archive.component';
import { CollaboratorComponent } from './collaborator/collaborator.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NotefilterPipe } from './note/notefilter.pipe';
import { serviceUrl } from './serviceUrl/serviceUrl';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    ConformregiComponent,
    FundoonoteComponent,
    NoteComponent,
    EditnoteComponent,
    EditlabelComponent,
    ReminderComponent,
    BinComponent,
    ArchiveComponent,
    CollaboratorComponent,
    NotefilterPipe

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatTooltipModule,
    MatGridListModule,
    MatMenuModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule.forRoot(),
    MatChipsModule,
    MatDialogModule,
    DragDropModule
  ],
  providers: [RegisterService,
    LoginService,
    ForpassserviceService,
    ResetService,
    NoteService,
    ListviewService,
    MatDatepickerModule,
    { provide: HTTP_INTERCEPTORS, useClass: IntercepterService, multi: true },
    serviceUrl

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
