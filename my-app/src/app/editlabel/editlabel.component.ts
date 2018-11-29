import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../fundoonote/fundoonote.component';
import { NoteService } from '../service/note/note.service';


@Component({
  selector: 'app-editlabel',
  templateUrl: './editlabel.component.html',
  styleUrls: ['./editlabel.component.css']
})

/**
 * @var Label1
 * @var test
 */
export class EditlabelComponent implements OnInit {
  Label1: any;
  test: any;

  constructor(public dialogRef: MatDialogRef<EditlabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private noteservice: NoteService) { }

  ngOnInit() {
    var email1 = localStorage.getItem('email');
    
    /**
     * service to show label
     */
    const obs = this.noteservice.showLabel(email1);
    obs.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

  /**
   * close dialogbox
   * @param test
   */
  onNoClick(): void {
    this.dialogRef.close(this.test);
  }

  /**
   * service to save label
   */
  savelabel() {
    const obs = this.noteservice.saveLabel(this.Label1);
    obs.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

  /**
   * service to delete label
   * @param id 
   */
  deletelabel(id) {
    const obs = this.noteservice.deleteLabel(id);
    obs.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

  /**
   * service to edit label
   * @param id 
   * @param label 
   */
  editlabel(id, label) {
    debugger;
    const obs = this.noteservice.editLabel(id, label);
    obs.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

}
