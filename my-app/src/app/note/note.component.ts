declare let require: any;
import { Component, OnInit } from '@angular/core';
import { NoteService } from '../service/note/note.service';
import { LoginService } from '../service/loginservice/login.service';
import { ListviewService } from '../service/listview/listview.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditnoteComponent } from '../editnote/editnote/editnote.component';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';


export interface DialogData {
  item: any;
}


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

/**
 * @var test,@var test1,@var message etc.
 */
export class NoteComponent implements OnInit {

  model: any = {};
  test: any;
  testT: any;
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
  getLabel: any;
  selectedFile: any;
  imageId: any;
  searchSubscription: Subscription;
  searchItem: any;

  constructor(private noteService: NoteService, private loginService: LoginService,
    private listviewService: ListviewService, public dialog: MatDialog) {
    this.subscription = this.listviewService.getview().subscribe(message => { this.message = message; });

    var email1 = localStorage.getItem('email');
    this.email = email1;
    debugger;

    /**
     * service to call collaborators
     * @param email
     */
    const obs1 = this.noteService.getCollaboratorNote(this.email);
    obs1.subscribe(
      (status: any) => {
        this.testT = status;
        console.log(status);
      });

    this.searchSubscription = this.listviewService
      .getsearchItem()
      .subscribe(message => {
       this.searchItem = message;
      });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    /**
     * get item stored at local storage
     * @var email
     */
    var email1 = localStorage.getItem('email');
    this.email = email1;
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
    const obs1 = this.noteService.getNotes(this.email);
    obs1.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

  /**
   * event call to drag and drop
   * @param event 
   */
  drop(event: CdkDragDrop<string[]>) {
    debugger;
    moveItemInArray(this.test, event.previousIndex, event.currentIndex);
  }

  imageadd(id) {
    this.imageId = id;
  }

  /**
   * event call to access file
   * @param event 
   */
  onFileChanged(event) {
    debugger;
    this.selectedFile = event.target.files[0];

    /**
     * service call to update profile pic
     * @param email,@param selectedFile
     */
    const obs = this.noteService.addImage(this.imageId, this.selectedFile);
    obs.subscribe(
      (status: any) => {
        this.testT = status;
        console.log(status);
      });
  }

  /**
   * open dialog for edit note
   * @param item 
   */
  openDialog(item): void {
    const dialogRef = this.dialog.open(EditnoteComponent, {
      height: '250px',
      width: '500px',
      data: { item }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  /**
   * open dialog to collaborator
   * @param item 
   */
  opencollabDialog(item): void {
    debugger;
    const dialogRef = this.dialog.open(CollaboratorComponent, {
      height: 'flex',
      width: '500px',
      data: { item }
    });
    debugger;
    dialogRef.afterClosed().subscribe(
      (status: any) => {
        this.test = status;
        console.log("notes" + status);

        /**
         * shows collaborator on perticular note
         * @param email
         */
        const obs1 = this.noteService.getCollaboratorNote(this.email);
        obs1.subscribe(
          (status: any) => {
            this.testT = status;
            console.log(status);
          });
      });
  }

  takenote() {
    debugger;
    this.mainCard = true;
    this.expandedCard = false;

    /**
     * service to show note in app
     */
    const obs = this.noteService.getNoteValue(this.model, this.getColor, this.getLabel);
    obs.subscribe(
      (status: any) => {
        this.test = status;
        // debugger;
        console.log(status);
      });
  }

  /**
   * function to change color
   * @param id 
   * @param color 
   */
  changecolor(id: any, color: any) {
    debugger;
    const obs = this.noteService.changeColor(id, color);
    obs.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

  deletenote(id) {
    /**
     * service to delete note 
     * @param id
     */
    const obsD = this.noteService.deleteNote(id);
    obsD.subscribe(
      (status: any) => {
        this.test = status;
      });
  }

  changereminder(id, date, time) {
    /**
     * change reminder service
     * @param id,@param date,@param time
     */
    const obsD = this.noteService.changeReminder(id, date, time);
    obsD.subscribe(
      (status: any) => {
        this.test = status;
      });

  }

  /**
   * function to call service to delete reminder
   * @param id 
   * @param date 
   */
  deleteremider(id, date) {
    const obsD = this.noteService.deleteReminder(id, date);
    obsD.subscribe(
      (status: any) => {
        this.test = status;
      });

  }

  /**
   * service to call archive note
   * @param id 
   */
  archive(id) {
    const obsD = this.noteService.archive(id);
    obsD.subscribe(
      (status: any) => {
        this.test = status;
      });
  }

  /**
   * function call service to shows all label of email id
   * @var email
   */
  alllabel() {
    const obs = this.noteService.showLabel(this.email);
    obs.subscribe(
      (status: any) => {
        this.testT = status;
        console.log(status);
      });
  }

  /**
   * function call service to add label to note
   * @param id 
   * @param label 
   */
  addnotelabel(id: any, label: any) {
    debugger;
    const obs = this.noteService.addNoteLabel(id, label);
    obs.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

  /**
   * function call service to delete label of note
   * @param id 
   * @param label 
   */
  deletenotelabel(id, label) {
    const obsD = this.noteService.deleteNoteLabel(id, label);
    obsD.subscribe(
      (status: any) => {
        this.test = status;
      });

  }

  addlabel(label: any) {
    this.getLabel = label;
  }

  setcolor(color: any) {

    this.getColor = color;
  }

  matMaincard() {
    this.mainCard = false;
    this.expandedCard = true;
    this.dialogCard = true;
  }

  /**
   * function to set reminder
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
