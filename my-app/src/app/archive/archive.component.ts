import { Component, OnInit} from '@angular/core';
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
  obs:any;

  constructor(private noteService: NoteService, private loginService: LoginService) { }

  ngOnInit() {
    var emailE = localStorage.getItem('email');
    this.email = emailE;

    /**
     * service to show archive notes
     * @param email
     */
    this.obs = this.noteService.getArchivedNotes(this.email);
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
   * service call to shows unarchived notes
   * @param id 
   */
  unarchive(id) {
    let obs = this.noteService.unarchive(id);
    obs.subscribe(
      (status: any) => {
        this.test = status;
      });
  }

}
