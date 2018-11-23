import { Component, OnInit } from '@angular/core';
import { NoteService } from '../service/note/note.service';
import { LoginService } from '../service/loginservice/login.service';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.css']
})
export class BinComponent implements OnInit {
  email: string;
  test: any;

  constructor(private noteService: NoteService, private loginService: LoginService) { }

  ngOnInit() {
    var email1 = localStorage.getItem('email');
    this.email = email1;
    const obs1 = this.noteService.getdeletedNotes(this.email);
    obs1.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

  deleteforever(id) {
    const obsD = this.noteService.deleteforever(id);
    obsD.subscribe(
      (status: any) => {
        this.test = status;
      });
  }

  restore(id) {
    const obsD = this.noteService.restore(id);
    obsD.subscribe(
      (status: any) => {
        this.test = status;
      });
  }

}
