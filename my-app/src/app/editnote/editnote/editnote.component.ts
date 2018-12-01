import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../../note/note.component';
import { NoteService } from '../../service/note/note.service';


@Component({
  selector: 'app-editnote',
  templateUrl: './editnote.component.html',
  styleUrls: ['./editnote.component.css']
})

/**
 * @var getColor
 */
export class EditnoteComponent implements OnInit {
  getColor: any;
  obs:any;

  constructor(
    public dialogRef: MatDialogRef<EditnoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private noteService: NoteService) { }


  ngOnInit() {
  }

  ngOnDestory() {
    this.obs.unsubscribe();
  }


  /**
   * update note with title and note
   * @param
   */
  onNoClick(): void {
    this.obs = this.noteService.updateNotes(this.data.item);
    this.obs.subscribe(
      (status: any) => {
        console.log(status);
      });
    this.dialogRef.close();
  }

  setcolor(color: any) {

    this.data.item.color = color;
  }

  /**
   * service to delete note
   * @param id 
   */
  deletenote(id) {
    this.obs = this.noteService.deleteNote(id);
    this.obs.subscribe(
      (status: any) => {
        this.data.item = status;
        console.log(status);
      });
  }
}
