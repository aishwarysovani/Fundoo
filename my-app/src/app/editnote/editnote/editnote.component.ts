import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogData } from '../../note/note.component';
import { NoteService } from '../../service/note/note.service';


@Component({
  selector: 'app-editnote',
  templateUrl: './editnote.component.html',
  styleUrls: ['./editnote.component.css']
})
export class EditnoteComponent implements OnInit {
  getColor:any;

  constructor(
    public dialogRef: MatDialogRef<EditnoteComponent>,
    @Inject(MAT_DIALOG_DATA)public data: DialogData,private noteService:NoteService) {}


  ngOnInit() {
  }

  onNoClick(): void {
    const obs1 = this.noteService.updateNotes(this.data.item);
    obs1.subscribe(
  (status:any)=>{
    console.log(status);
  });
    this.dialogRef.close();
  }

  setcolor(color: any) {
    
    this.data.item.color = color;
  }

  deletenote(id)
  {
    const obsD=this.noteService.deletenote(id);
    obsD.subscribe(
      (status:any)=>{
        this.data.item=status;
        console.log(status);
      });
  }
}
