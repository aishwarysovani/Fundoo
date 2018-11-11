import { Component, OnInit,Inject } from '@angular/core';
import { ListviewService } from '../service/listview/listview.service';
import { LoginService } from '../service/loginservice/login.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EditlabelComponent } from '../editlabel/editlabel.component';

export interface DialogData {
  label:any;
 }

@Component({
  selector: 'app-fundoonote',
  templateUrl: './fundoonote.component.html',
  styleUrls: ['./fundoonote.component.css']
})
export class FundoonoteComponent implements OnInit {
  email:string=null;
  listicon:boolean=true;
  gridicon:boolean=false;
  
  constructor(private listviewService:ListviewService,private loginService:LoginService,
    public dialog: MatDialog) {    
}

listview(): void {
  // send message to subscribers via observable subject
  this.listviewService.listview('Message from Home Component to App Component!');
  this.listicon=false;
  this.gridicon=true;
}

gridview(): void {
  // clear message
  this.listviewService.gridview();
  this.listicon=true;
  this.gridicon=false;
}

  ngOnInit() {
    var email1=localStorage.getItem('email');
    this.email=email1;
}

logout()
{
this.loginService.logout();
}
  

openDialog(): void {
  const dialogRef = this.dialog.open(EditlabelComponent, {
    height: 'flex',
    width: '300px',
    data: {label:"hello"}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
}
