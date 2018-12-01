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
  obs:any;

  constructor(private noteService: NoteService, private loginService: LoginService) { }

  /**
   * service call to get deleted notes
   * @param email
   */
  ngOnInit() {
    var emailE = localStorage.getItem('email');
    this.email = emailE;
    this.obs = this.noteService.getDeletedNotes(this.email);
    this.obs.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

  ngOnDestory()
  {
    this.obs.unsubscribe();
  }

  /**
   * service to delete permantly
   * @param id  
   */
  deleteforever(id) {
    this.obs = this.noteService.deleteForever(id);
    this.obs.subscribe(
      (status: any) => {
        this.test = status;
      });

  }

  /**
   * service to restore note
   * @param id 
   */
  restore(id) {
    this.obs = this.noteService.restore(id);
    this.obs.subscribe(
      (status: any) => {
        this.test = status;
      });
  }

}
