import { Component, OnInit } from '@angular/core';
import { NoteService } from '../service/note/note.service';
import { LoginService } from '../service/loginservice/login.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})

/**
 * @var string email,
 * @var test 
*/
export class ArchiveComponent implements OnInit {
  email: string;
  test: any;

  constructor(private noteService: NoteService, private loginService: LoginService) { }

  ngOnInit() {
    var email1 = localStorage.getItem('email');
    this.email = email1;

    /**
     * service to show archive notes
     * @param email
     */
    const obs1 = this.noteService.getArchivedNotes(this.email);
    obs1.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

  /**
   * service call to shows unarchived notes
   * @param id 
   */
  unarchive(id) {
    const obsD = this.noteService.unarchive(id);
    obsD.subscribe(
      (status: any) => {
        this.test = status;
      });
  }

}
