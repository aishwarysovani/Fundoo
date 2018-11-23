import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../fundoonote/fundoonote.component';
import { NoteService } from '../service/note/note.service';


@Component({
  selector: 'app-editlabel',
  templateUrl: './editlabel.component.html',
  styleUrls: ['./editlabel.component.css']
})
export class EditlabelComponent implements OnInit {
  Label1: any;
  test: any;

  constructor(public dialogRef: MatDialogRef<EditlabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private noteservice: NoteService) { }

  ngOnInit() {
    var email1 = localStorage.getItem('email');
    const obs = this.noteservice.showlabel(email1);
    obs.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

  onNoClick(): void {
    this.dialogRef.close(this.test);
  }

  savelabel() {
    const obs = this.noteservice.savelabel(this.Label1);
    obs.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

  deletelabel(id) {
    const obs = this.noteservice.deletelabel(id);
    obs.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

  editlabel(id, label) {
    debugger;
    const obs = this.noteservice.editlabel(id, label);
    obs.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

}
