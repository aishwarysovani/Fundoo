import { Component, OnInit } from '@angular/core';
import { NoteService } from '../service/note/note.service';
import { LoginService } from '../service/loginservice/login.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  email: string;
  test: any;

  constructor(private noteService: NoteService, private loginService: LoginService) { }

  ngOnInit() {
    var email1 = localStorage.getItem('email');
    this.email = email1;
    const obs1 = this.noteService.getarchivedNotes(this.email);
    obs1.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

  unarchive(id) {
    const obsD = this.noteService.unarchive(id);
    obsD.subscribe(
      (status: any) => {
        this.test = status;
      });
  }

}
