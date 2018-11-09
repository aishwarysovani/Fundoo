import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private createnote='http://localhost/codeigniter/CreateNote';
  private fetchnote='http://localhost/codeigniter/Fetchnotes';

  constructor(private http: HttpClient) { }

  getNoteValue(noteForm,color) {
    debugger;
    const newdata = new FormData();
    var email1=localStorage.getItem('email');
    // alert(email1)
    newdata.append('email',email1);
    newdata.append('title',noteForm.title);
    newdata.append('note', noteForm.note);
    newdata.append('date',noteForm.date);
    newdata.append('Time',noteForm.time);
    newdata.append('color',color);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
      };
    return this.http.post(this.createnote, newdata,otheroption);
    }


    getNotes(email) {
      debugger;
     const newdata = new FormData();
     var token=localStorage.getItem('currentUser');
     newdata.append('email',email);
     const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
      };
     return this.http.post(this.fetchnote, newdata,otheroption);
    }

    
}
