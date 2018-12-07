import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../fundoonote/fundoonote.component';
import { NoteService } from '../service/note/note.service';
import { Labels } from '../core/model/label';


@Component({
  selector: 'app-editlabel',
  templateUrl: './editlabel.component.html',
  styleUrls: ['./editlabel.component.css']
})

/**
 * @var Label
 * @var test
 */
export class EditlabelComponent implements OnInit {
  Label: any;
  test: Labels[] = [];
  obs:any;

  constructor(public dialogRef: MatDialogRef<EditlabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private noteservice: NoteService) { }

  ngOnInit() {
    var emailE = localStorage.getItem('email');
    
    /**
     * service to show label
     */
    this.obs = this.noteservice.showLabel(emailE);
    this.obs.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
    
  }

  ngOnDestory() {
    this.obs.unsubscribe();
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
    this.obs = this.noteservice.saveLabel(this.Label);
    this.obs.subscribe(
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
    this.obs = this.noteservice.deleteLabel(id);
    this.obs.subscribe(
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
    this.obs = this.noteservice.editLabel(id, label);
    this.obs.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

}
