declare let require:any;
import { Component, OnInit } from '@angular/core';
import { NoteService } from '../service/note/note.service';
import { LoginService } from '../service/loginservice/login.service';
import { ListviewService } from '../service/listview/listview.service';
import { Subscription } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EditnoteComponent } from '../editnote/editnote/editnote.component';
import { CollaboratorComponent } from '../collaborator/collaborator.component';


export interface DialogData {
 item:any;
}


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  model:any={};
  test: any;
  test1:any;
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
  getlabel:any;

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
    const obs1 = this.noteService.getNotes(this.email);
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


  opencollabDialog(item): void {
    debugger;
    const dialogRef = this.dialog.open(CollaboratorComponent, {
      height: 'flex',
      width: '500px',
      data: {item}
    });
    debugger;
    dialogRef.afterClosed().subscribe(
      (status:any) =>{
      this.test=status;
      console.log("notes"+status);
    });
  }

 takenote() {
    debugger;
    this.card1=true;
    this.card2=false;
    const obs = this.noteService.getNoteValue(this.model,this.getColor,this.getlabel);
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

  archive(id)
  {
    const obsD=this.noteService.archive(id);
    obsD.subscribe(
      (status:any)=>{
        this.test=status;
      });
  }

  alllabel()
  {
    const obs= this.noteService.showlabel(this.email);
    obs.subscribe(
    (status:any)=>{
      this.test1=status;
      console.log(status);
    });
  }

  addnotelabel(id:any,label:any) {
    debugger;
    const obs= this.noteService.addnotelabel(id,label);
    obs.subscribe(
  (status:any)=>{
    this.test=status;
    console.log(status);
  });
  }

  deletenotelabel(id,label)
  {
   const obsD=this.noteService.deletenotelabel(id,label);
    obsD.subscribe(
      (status:any)=>{
        this.test=status;
      });

  }

  addlabel(label:any)
  {
    this.getlabel=label;
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
