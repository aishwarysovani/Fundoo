import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

/**
 * @var createnote
 * @var fetchnote,etc
 * all function used to call api related to note services
 */
export class NoteService {

  private createnote = 'http://localhost/codeigniter/CreateNote';
  private fetchnote = 'http://localhost/codeigniter/Fetchnotes';
  private updatenote = 'http://localhost/codeigniter/Updatenotes';
  private Changecolor = 'http://localhost/codeigniter/Changecolor';
  private Deletenote = 'http://localhost/codeigniter/Deletenote';
  private Changereminder = 'http://localhost/codeigniter/Changereminder';
  private Deletreminder = 'http://localhost/codeigniter/Deletereminder';
  private fetchreminder = 'http://localhost/codeigniter/Fetchreminder';
  private fetchdeletednote = 'http://localhost/codeigniter/Fetchdeletednotes';
  private Deleteforever = 'http://localhost/codeigniter/Deleteforever';
  private Restore = 'http://localhost/codeigniter/Restore';
  private Archive = 'http://localhost/codeigniter/Archive';
  private fetcharchivenote = 'http://localhost/codeigniter/Fetcharchivenote';
  private Unarchive = 'http://localhost/codeigniter/Unarchive';
  private createlabel = 'http://localhost/codeigniter/Createlabel';
  private Showlabel = 'http://localhost/codeigniter/Showlabel'
  private Deletelabel = 'http://localhost/codeigniter/Deletelabel'
  private Editlabel = 'http://localhost/codeigniter/Editlabel'
  private Addnotelabel = 'http://localhost/codeigniter/Addnotelabel';
  private Deletenotelabel = 'http://localhost/codeigniter/Deletenotelabel'
  private Addcollaborator = 'http://localhost/codeigniter/Addcollaborator';
  private Getcollaborator = 'http://localhost/codeigniter/Getcollaborator';
  private Deletecollaborator = 'http://localhost/codeigniter/Deletecollaborator';
  private Addprofile = 'http://localhost/codeigniter/Addprofile';
  private Showprofile = 'http://localhost/codeigniter/Showprofile';
  private Getcollaborator1 = 'http://localhost/codeigniter/getAllCollaborator';
  private Addimage = 'http://localhost/codeigniter/Addimage';


  constructor(private http: HttpClient) { }

  /**
   * add note api call 
   * @param noteForm 
   * @param color 
   * @param label 
   */
  getNoteValue(noteForm, color, label) {
    debugger;
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    // alert(email1)
    newdata.append('email', email1);
    newdata.append('title', noteForm.title);
    newdata.append('note', noteForm.note);
    newdata.append('date', noteForm.date);
    newdata.append('Time', noteForm.time);
    newdata.append('color', color);
    newdata.append('label', label);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.createnote, newdata, otheroption);
  }


  /**
   * fetches notes api call
   * @param email 
   */
  getNotes(email) {
    debugger;
    const newdata = new FormData();
    var token = localStorage.getItem('currentUser');
    newdata.append('email', email);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.fetchnote, newdata, otheroption);
  }

  /**
   * update note values api call
   * @param item 
   */
  updateNotes(item) {
    debugger;
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    // alert(email1)
    newdata.append('email', email1);
    newdata.append('id', item.id);
    newdata.append('title', item.title);
    newdata.append('note', item.note);
    newdata.append('color', item.color);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.updatenote, newdata, otheroption);
  }

  /**
   * change color api call
   * @param id 
   * @param color 
   */
  changeColor(id, color) {
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    newdata.append('email', email1);
    newdata.append('id', id);
    newdata.append('color', color);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.Changecolor, newdata, otheroption);
  }

  /**
   * delete note api call
   * @param id 
   */
  deleteNote(id) {
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    newdata.append('email', email1);
    newdata.append('id', id);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.Deletenote, newdata, otheroption);
  }

  /**
   * change reminder api call
   * @param id 
   * @param date 
   * @param time 
   */
  changeReminder(id, date, time) {
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    newdata.append('email', email1);
    newdata.append('id', id);
    newdata.append('date', date);
    newdata.append('time', time);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.Changereminder, newdata, otheroption);
  }

  /**
   * delete reminder api call
   * @param id 
   * @param date 
   */
  deleteReminder(id, date) {
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    newdata.append('email', email1);
    newdata.append('id', id);
    newdata.append('date', date);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.Deletreminder, newdata, otheroption);
  }

  /**
   * fetch all reminders api call
   * @param email 
   */
  getReminders(email) {
    debugger;
    const newdata = new FormData();
    var token = localStorage.getItem('currentUser');
    newdata.append('email', email);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.fetchreminder, newdata, otheroption);
  }

  /**
   * fetch all deleted note api call
   * and delete function related api calls
   * @param email 
   */
  getDeletedNotes(email) {
    debugger;
    const newdata = new FormData();
    var token = localStorage.getItem('currentUser');
    newdata.append('email', email);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.fetchdeletednote, newdata, otheroption);
  }

  deleteForever(id) {
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    newdata.append('email', email1);
    newdata.append('id', id);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.Deleteforever, newdata, otheroption);
  }

  restore(id) {
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    newdata.append('email', email1);
    newdata.append('id', id);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.Restore, newdata, otheroption);
  }

  /**
   * archive function related api calls
   * @param id 
   */
  archive(id) {
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    newdata.append('email', email1);
    newdata.append('id', id);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.Archive, newdata, otheroption);
  }


  getArchivedNotes(email) {
    debugger;
    const newdata = new FormData();
    var token = localStorage.getItem('currentUser');
    newdata.append('email', email);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.fetcharchivenote, newdata, otheroption);
  }

  unarchive(id) {
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    newdata.append('email', email1);
    newdata.append('id', id);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.Unarchive, newdata, otheroption);
  }

  /**
   * label related api calls
   * @param model 
   */
  saveLabel(model) {
    debugger;
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    newdata.append('email', email1);
    newdata.append('label', model);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.createlabel, newdata, otheroption);
  }

  showLabel(email) {
    const newdata = new FormData();
    newdata.append('email', email);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.Showlabel, newdata, otheroption);
  }

  deleteLabel(id) {
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    newdata.append('email', email1);
    newdata.append('id', id);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.Deletelabel, newdata, otheroption);
  }

  editLabel(id, label) {
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    newdata.append('email', email1);
    newdata.append('id', id);
    newdata.append('label', label);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.Editlabel, newdata, otheroption);
  }

  addNoteLabel(id, label) {
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    newdata.append('email', email1);
    newdata.append('id', id);
    newdata.append('label', label);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.Addnotelabel, newdata, otheroption);
  }

  deleteNoteLabel(id, label) {
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    newdata.append('email', email1);
    newdata.append('id', id);
    newdata.append('label', label);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.Deletenotelabel, newdata, otheroption);
  }

  addImage(id, imagefile) {
    debugger;
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    newdata.append('email', email1);
    newdata.append('id',id);
    newdata.append('file', imagefile);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.Addimage, newdata, otheroption);
  }


  /**
   * collaborator related api calls
   * @param id 
   * @param sharemail 
   */
  addCollaborator(id, sharemail) {
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    newdata.append('email', email1);
    newdata.append('id', id);
    newdata.append('sharemail', sharemail);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.Addcollaborator, newdata, otheroption);
  }


  getCollaborator(id) {
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    newdata.append('email', email1);
    newdata.append('id', id);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.Getcollaborator, newdata, otheroption);
  }

  getCollaboratorNote(email) {
    const newdata = new FormData();
    newdata.append('email', email);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.Getcollaborator1, newdata, otheroption);
  }

  deleteCollaborator(noteid, sharemail) {
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    newdata.append('email', email1);
    newdata.append('noteid', noteid);
    newdata.append('sharemail', sharemail);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.Deletecollaborator, newdata, otheroption);
  }

  /**
   * profile related api calls
   * @param email 
   * @param imagefile 
   */
  addProfile(email, imagefile) {
    debugger;
    const newdata = new FormData();
    newdata.append('email', email);
    newdata.append('file', imagefile);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.Addprofile, newdata, otheroption);
  }

  showProfile(email) {
    const newdata = new FormData();
    newdata.append('email', email);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.Showprofile, newdata, otheroption);
  }


}
