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
 * @var emailid
 * @var sharemail
 * @var test
 * @var res
 */
export class CollaboratorComponent implements OnInit {
  emailid: any;
  sharemail: any
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
    this.emailid = email;
    debugger;
    /**
     * display all collaborator
     */
    const obs1 = this.noteService.getcollaborator(this.data.item.id);
    obs1.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

  onNoClick(): void {

    const obs1 = this.noteService.getNotes(this.emailid);
    obs1.subscribe(
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
    const obs = this.noteService.addcollaborator(this.data.item.id, this.sharemail);
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
  deletecollaborator(noteid, sharemail) {
    debugger;
    const obs = this.noteService.deletecollaborator(noteid, sharemail);
    obs.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

}
