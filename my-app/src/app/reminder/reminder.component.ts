declare let require:any;
import { Component, OnInit } from '@angular/core';
import { NoteService } from '../service/note/note.service';
import { LoginService } from '../service/loginservice/login.service';
import { ListviewService } from '../service/listview/listview.service';
import { Subscription } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EditnoteComponent } from '../editnote/editnote/editnote.component';

export interface DialogData {
  item:any;
 }

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {

  model:any={};
  test: any;
  panelOpenState = false;
  card3:boolean=false;
  card1:boolean=true;
  card2:boolean=false;
  email:string=null;
  gridview:boolean=true;
  listview:boolean=false;
  listicon:boolean=true;
  gridicon:boolean=false;
  public now:Date=new Date();
  message: any;
  subscription: Subscription;
  getColor:any;


  constructor(private noteService: NoteService,private loginService: LoginService,
    private listviewService:ListviewService,public dialog: MatDialog) {
      this.subscription = this.listviewService.getview().subscribe(message => { this.message = message; });
     }

     ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
  }
 ngOnInit() {
    var email1=localStorage.getItem('email');
    this.email=email1;
    setInterval(()=>{
      this.now=new Date();
      // this.remindfunction();
      // console.log(this.now);
    },1);

    this.gridview=true;
    this.listview=false;
    this.listicon=true;
    this.gridicon=false;
    this.card1=true;
    this.card2=false;
   debugger;
    const obs1 = this.noteService.getreminders(this.email);
    obs1.subscribe(
  (status:any)=>{
    this.test=status;
    console.log(status);
  });
}

  openDialog(item): void {
    const dialogRef = this.dialog.open(EditnoteComponent, {
      height: '250px',
      width: '500px',
      data: {item}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  // this.loginService.logout();


 takenote() {
    debugger;
    this.card1=true;
    this.card2=false;
    const obs = this.noteService.getNoteValue(this.model,this.getColor);
    obs.subscribe(
  (status:any)=>{
    this.test=status;
    // debugger;
    console.log(status);
  });
  }

  changecolor(id:any,color:any) {
    debugger;
    const obs= this.noteService.changecolor(id,color);
    obs.subscribe(
  (status:any)=>{
    this.test=status;
    console.log(status);
  });
  }

  deletenote(id)
  {
    const obsD=this.noteService.deletenote(id);
    obsD.subscribe(
      (status:any)=>{
        this.test=status;
      });
  }

  changereminder(id,date,time)
  {
   const obsD=this.noteService.changereminder(id,date,time);
    obsD.subscribe(
      (status:any)=>{
        this.test=status;
      });

  }

  deleteremider(id,date)
  {
   const obsD=this.noteService.deletereminder(id,date);
    obsD.subscribe(
      (status:any)=>{
        this.test=status;
      });

  }

  setcolor(color: any) {
    
    this.getColor = color;
  }
  
    matCard1()
    {
      this.card1=false;
      this.card2=true;
      this.card3=true;
    }
   
    remindfunction()
    {
      this.test.forEach(element => {
        let now=new Date();
        let dateFormat=require("dateformat");
        let td=dateFormat(now,"dd,mm,yyyy");
        let db=dateFormat(element.remind_date,"dd,mm,yyyy");
        // if(dateFormat(now,"hh:MM tt")==dateFormat(element.remind_date,"hh:MM tt") && td==db){
        // alert(element.title);
        // }
      });
    }
  
  
}
