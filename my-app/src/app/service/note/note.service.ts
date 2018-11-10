import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private createnote='http://localhost/codeigniter/CreateNote';
  private fetchnote='http://localhost/codeigniter/Fetchnotes';
  private updatenote='http://localhost/codeigniter/Updatenotes';
  private Changecolor='http://localhost/codeigniter/Changecolor';
  private Deletenote='http://localhost/codeigniter/Deletenote';
  private Changereminder='http://localhost/codeigniter/Changereminder';
  private Deletreminder='http://localhost/codeigniter/Deletereminder';


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

    updateNotes(item) {
      debugger;
      const newdata = new FormData();
      var email1=localStorage.getItem('email');
      // alert(email1)
      newdata.append('email',email1);
      newdata.append('id',item.id);
      newdata.append('title',item.title);
      newdata.append('note', item.note);
      newdata.append('color',item.color);
      const otheroption: any = {
        'Content-Type': 'application/x-www-form-urlencoded'
        };
      return this.http.post(this.updatenote, newdata,otheroption);
      }

      changecolor(id,color)
      {
        const newdata=new FormData();
        var email1=localStorage.getItem('email');
        newdata.append('email',email1);
        newdata.append('id',id);
        newdata.append('color',color);
        const otheroption:any={
          'Content-Type': 'application/x-www-form-urlencoded'
        };
      return this.http.post(this.Changecolor, newdata,otheroption);
      }

      deletenote(id)
      {
        const newdata=new FormData();
        var email1=localStorage.getItem('email');
        newdata.append('email',email1);
        newdata.append('id',id);
        const otheroption:any={
          'Content-Type': 'application/x-www-form-urlencoded'
        };
      return this.http.post(this.Deletenote, newdata,otheroption);
      }

      changereminder(id,date,time)
      {
        const newdata=new FormData();
        var email1=localStorage.getItem('email');
        newdata.append('email',email1);
        newdata.append('id',id);
        newdata.append('date',date);
        newdata.append('time',time);
        const otheroption:any={
          'Content-Type': 'application/x-www-form-urlencoded'
        };
      return this.http.post(this.Changereminder, newdata,otheroption);
      }

      deletereminder(id,date)
      {
        const newdata=new FormData();
        var email1=localStorage.getItem('email');
        newdata.append('email',email1);
        newdata.append('id',id);
        newdata.append('date',date);
        const otheroption:any={
          'Content-Type': 'application/x-www-form-urlencoded'
        };
      return this.http.post(this.Deletreminder, newdata,otheroption);
      }
  
}
