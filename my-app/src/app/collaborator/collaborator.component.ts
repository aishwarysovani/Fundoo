import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../note/note.component';
import { NoteService } from '../service/note/note.service';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.css']
})

/**
 * @var emailId
 * @var shareMail
 * @var test
 * @var res
 */
export class CollaboratorComponent implements OnInit {
  emailId: any;
  shareMail: any
  test: any;
  res: any;

  /**
   * constructor with all parameters
   * @param dialogRef 
   * @param data 
   * @param noteService 
   */
  constructor(public dialogRef: MatDialogRef<CollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private noteService: NoteService) { }

  ngOnInit() {
    var email = localStorage.getItem('email');
    this.emailId = email;
    debugger;
    /**
     * display all collaborator
     */
    const obs = this.noteService.getCollaborator(this.data.item.id);
    obs.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

  onNoClick(): void {

    const obs = this.noteService.getNotes(this.emailId);
    obs.subscribe(
      (status: any) => {
        debugger;
        this.res = status;
        this.dialogRef.close(this.res);
      });


  }

  /**
   * add new collaborator
   */
  addcollaborator() {
    debugger;
    const obs = this.noteService.addCollaborator(this.data.item.id, this.shareMail);
    obs.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

  /**
   * delete collaborator service
   * @param noteid 
   * @param sharemail 
   */
  deletecollaborator(noteId, shareMail) {
    debugger;
    const obs = this.noteService.deleteCollaborator(noteId, shareMail);
    obs.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

}
