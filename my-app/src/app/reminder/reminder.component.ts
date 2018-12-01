declare let require: any;
import { Component, OnInit,OnDestroy } from '@angular/core';
import { NoteService } from '../service/note/note.service';
import { LoginService } from '../service/loginservice/login.service';
import { ListviewService } from '../service/listview/listview.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditnoteComponent } from '../editnote/editnote/editnote.component';

export interface DialogData {
  item: any;
}

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})

/**
 * @var test,@var card1,@var email etc.
 */
export class ReminderComponent implements OnInit,OnDestroy {

  model: any = {};
  test: any;
  panelOpenState = false;
  dialogCard: boolean = false;
  mainCard: boolean = true;
  expandedCard: boolean = false;
  email: string = null;
  gridView: boolean = true;
  listView: boolean = false;
  listIcon: boolean = true;
  gridIcon: boolean = false;
  public now: Date = new Date();
  message: any;
  subscription: Subscription;
  getColor: any;
  label: any;
  obs:any;

  constructor(private noteService: NoteService, private loginService: LoginService,
    private listviewService: ListviewService, public dialog: MatDialog) {
    this.subscription = this.listviewService.getview().subscribe(message => { this.message = message; });
  }

  
  ngOnInit() {

    /**
     * fetech item from localstorage
     * @var email
     */
    var emailE = localStorage.getItem('email');
    this.email = emailE;
    setInterval(() => {
      this.now = new Date();
      // this.remindfunction();
      // console.log(this.now);
    }, 1);

    this.gridView = true;
    this.listView = false;
    this.listIcon = true;
    this.gridIcon = false;
    this.mainCard = true;
    this.expandedCard = false;
    debugger;

    /**
     * service to call all reminders 
     */
    this.obs = this.noteService.getReminders(this.email);
    this.obs.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
    //this.obs.unsubscribe();
  }

  /**
   * dialog box open to edit note
   * @param item 
   */
  openDialog(item): void {
   let dialogRef = this.dialog.open(EditnoteComponent, {
      height: '250px',
      width: '500px',
      data: { item }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    dialogRef.afterClosed().unsubscribe();
  }


  /**
   * function to call note values service
   * @param getColor,@param label
   */
  takenote() {
    debugger;
    this.mainCard = true;
    this.expandedCard = false;
    this.obs = this.noteService.getNoteValue(this.model, this.getColor, this.label);
    this.obs.subscribe(
      (status: any) => {
        this.test = status;
        // debugger;
        console.log(status);
      });
  }

  /**
   * function to call change color service
   * @param id 
   * @param color 
   */
  changecolor(id: any, color: any) {
    debugger;
    this.obs = this.noteService.changeColor(id, color);
    this.obs.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

  /**
   * function to call service to delete note
   * @param id 
   */
  deletenote(id) {
    this.obs = this.noteService.deleteNote(id);
    this.obs.subscribe(
      (status: any) => {
        this.test = status;
      });
  }

  /**
   * function to call service change reminder of note
   * @param id 
   * @param date 
   * @param time 
   */
  changereminder(id, date, time) {
    this.obs = this.noteService.changeReminder(id, date, time);
    this.obs.subscribe(
      (status: any) => {
        this.test = status;
      });

  }

  deleteremider(id, date) {
    this.obs = this.noteService.deleteReminder(id, date);
    this.obs.subscribe(
      (status: any) => {
        this.test = status;
      });

  }

  /**
   * function to set background color
   * @param color 
   */
  setcolor(color: any) {

    this.getColor = color;
  }

  matCard1() {
    this.mainCard = false;
    this.expandedCard = true;
    this.dialogCard = true;
  }

  /**
   * function to set reminder to note
   */
  remindfunction() {
    this.test.forEach(element => {
      let now = new Date();
      let dateFormat = require("dateformat");
      let td = dateFormat(now, "dd,mm,yyyy");
      let db = dateFormat(element.remind_date, "dd,mm,yyyy");
      // if(dateFormat(now,"hh:MM tt")==dateFormat(element.remind_date,"hh:MM tt") && td==db){
      // alert(element.title);
      // }
    });
  }


}
