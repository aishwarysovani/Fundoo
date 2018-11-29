import { Component, OnInit } from '@angular/core';
import { NoteService } from '../service/note/note.service';
import { LoginService } from '../service/loginservice/login.service';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.css']
})
/**
 * @var email
 * @var test
 */
export class BinComponent implements OnInit {
  email: string;
  test: any;

  constructor(private noteService: NoteService, private loginService: LoginService) { }

  /**
   * service call to get deleted notes
   * @param email
   */
  ngOnInit() {
    var email1 = localStorage.getItem('email');
    this.email = email1;
    const obs1 = this.noteService.getDeletedNotes(this.email);
    obs1.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

  /**
   * service to delete permantly
   * @param id  
   */
  deleteforever(id) {
    const obsD = this.noteService.deleteForever(id);
    obsD.subscribe(
      (status: any) => {
        this.test = status;
      });
  }

  /**
   * service to restore note
   * @param id 
   */
  restore(id) {
    const obsD = this.noteService.restore(id);
    obsD.subscribe(
      (status: any) => {
        this.test = status;
      });
  }

}
