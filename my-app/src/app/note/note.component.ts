declare let require: any;
import { Component, OnInit} from '@angular/core';
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
 * @var test,@var testT,@var message etc.
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
  iserror: boolean;
  errorMessage: any;
  obs:any;
  obsC:any;
  obsV:any;
  base64textString: string;
  url: string;

  constructor(private noteService: NoteService, private loginService: LoginService,
    private listviewService: ListviewService, public dialog: MatDialog) {
    this.subscription = this.listviewService.getview().subscribe(message => { this.message = message; });

    var emailE = localStorage.getItem('email');
    this.email = emailE;
    debugger;
    
    this.searchSubscription = this.listviewService
      .getsearchItem()
      .subscribe(message => {
       this.searchItem = message;
      });
}

 
  ngOnInit() {
    /**
     * get item stored at local storage
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
   this.obsV = this.noteService.getNotes(this.email);
    this.obsV.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });

      /**
     * service to call collaborators
     * @param email
     */
    this.obsC = this.noteService.getCollaboratorNote(this.email);
    this.obsC.subscribe(
      (status: any) => {
        this.testT = status;
        console.log(status);
      });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks

    this.subscription.unsubscribe();
    this.searchSubscription.unsubscribe();
    // this.obsV.unsubscribe();
    // this.obsC.unsubscribe();
    //this.obs.unsubscribe();
  }


  imageadd(id) {
    this.imageId = id;
  }

  /**
   * event call to access file
   * @param event 
   */
  // onFileChanged(event) {
  //   debugger;
  //   this.selectedFile = event.target.files[0];

  //   /**
  //    * service call to update profile pic
  //    * @param email,@param selectedFile
  //    */
  //   this.obs = this.noteService.addImage(this.imageId, this.selectedFile);
  //   this.obs.subscribe(
  //     (status: any) => {
  //       this.testT = status;
  //       console.log(status);
  //     });
  // }

  onFileChanged(event)  {
    debugger;
    var files = event.target.files;
    var file = files[0];
    if (files && file) {
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
    }
    }
    
    _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    console.log(btoa(binaryString));
    debugger;
    this.noteService.uploadNoteImage(this.base64textString, this.imageId)
    .subscribe(
    (status: any) => {
    console.log("darshuuuu");
    
    
    console.log(status);
    
    this.url = "data:image/jpeg;base64," + status;
    }, error => {
    console.log(error);
    alert(error.error.text)
    });
    }

  /**
   * open dialog for edit note
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
   * open dialog to collaborator
   * @param item 
   */
  opencollabDialog(item): void {
    debugger;
    let dialogRef = this.dialog.open(CollaboratorComponent, {
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
        let obsC = this.noteService.getCollaboratorNote(this.email);
        obsC.subscribe(
          (status: any) => {
            this.testT = status;
            console.log(status);
          });
        obsC.unsubscribe();
      });
      dialogRef.afterClosed().unsubscribe();
  }

  takenote() {
    debugger;
    this.mainCard = true;
    this.expandedCard = false;

    /**
     * service to show note in app
     */
   this.obs = this.noteService.getNoteValue(this.model, this.getColor, this.getLabel);
    this.obs.subscribe(
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
    this.obs = this.noteService.changeColor(id, color);
    this.obs.subscribe(
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
    this.obs = this.noteService.deleteNote(id);
    this.obs.subscribe(
      (status: any) => {
        this.test = status;
      });
  }

  changereminder(id, date, time) {
    /**
     * change reminder service
     * @param id,@param date,@param time
     */
    this.obs = this.noteService.changeReminder(id, date, time);
    this.obs.subscribe(
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
    this.obs = this.noteService.deleteReminder(id, date);
    this.obs.subscribe(
      (status: any) => {
        this.test = status;
      });
  }

  /**
   * service to call archive note
   * @param id 
   */
  archive(id) {
    this.obs = this.noteService.archive(id);
    this.obs.subscribe(
      (status: any) => {
        this.test = status;
      });
  }

  /**
   * function call service to shows all label of email id
   * @var email
   */
  alllabel() {
    this.obs = this.noteService.showLabel(this.email);
    this.obs.subscribe(
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
    this.obs = this.noteService.addNoteLabel(id, label);
    this.obs.subscribe(
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
    this.obs = this.noteService.deleteNoteLabel(id, label);
    this.obs.subscribe(
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.test, event.previousIndex, event.currentIndex);
    let diff: any;
    let direction: any;

    if (event.currentIndex > event.previousIndex) {
      direction = "upward";
      diff = event.currentIndex - event.previousIndex;
    } else {
      diff = event.previousIndex - event.currentIndex;
      direction = "downward";
    }

    let email =this.email;
    debugger;
    this.obs = this.noteService.dragnotes(
      email,
      this.test[event.currentIndex].DragAndDropID,
      diff,
      direction
    );
    this.obs.subscribe(
      (notes: any) => {
        // this.all_notes = notes;
        debugger;
      },
      error => {
        this.iserror = true;
        this.errorMessage = error.message;
      }
    );
  }

}
