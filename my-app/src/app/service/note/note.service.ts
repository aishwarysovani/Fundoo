import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serviceUrl } from '../../serviceUrl/serviceUrl';


@Injectable({
  providedIn: 'root'
})

/**
 * @var createnote
 * @var fetchnote,etc
 * all function used to call api related to note services
 */
export class NoteService {

  constructor(private http: HttpClient, private serviceurl: serviceUrl) { }

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
    return this.http.post(this.serviceurl.host + this.serviceurl.createnote, newdata, otheroption);
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
    return this.http.post(this.serviceurl.host + this.serviceurl.fetchnote, newdata, otheroption);
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
    return this.http.post(this.serviceurl.host + this.serviceurl.updatenote, newdata, otheroption);
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
    return this.http.post(this.serviceurl.host + this.serviceurl.Changecolor, newdata, otheroption);
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
    return this.http.post(this.serviceurl.host + this.serviceurl.Deletenote, newdata, otheroption);
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
    return this.http.post(this.serviceurl.host + this.serviceurl.Changereminder, newdata, otheroption);
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
    return this.http.post(this.serviceurl.host + this.serviceurl.Deletreminder, newdata, otheroption);
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
    return this.http.post(this.serviceurl.host + this.serviceurl.fetchreminder, newdata, otheroption);
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
    return this.http.post(this.serviceurl.host + this.serviceurl.fetchdeletednote, newdata, otheroption);
  }

  deleteForever(id) {
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    newdata.append('email', email1);
    newdata.append('id', id);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.serviceurl.host + this.serviceurl.Deleteforever, newdata, otheroption);
  }

  restore(id) {
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    newdata.append('email', email1);
    newdata.append('id', id);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.serviceurl.host + this.serviceurl.Restore, newdata, otheroption);
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
    return this.http.post(this.serviceurl.host + this.serviceurl.Archive, newdata, otheroption);
  }


  getArchivedNotes(email) {
    debugger;
    const newdata = new FormData();
    var token = localStorage.getItem('currentUser');
    newdata.append('email', email);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.serviceurl.host + this.serviceurl.fetcharchivenote, newdata, otheroption);
  }

  unarchive(id) {
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    newdata.append('email', email1);
    newdata.append('id', id);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.serviceurl.host + this.serviceurl.Unarchive, newdata, otheroption);
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
    return this.http.post(this.serviceurl.host + this.serviceurl.createlabel, newdata, otheroption);
  }

  showLabel(email) {
    const newdata = new FormData();
    newdata.append('email', email);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.serviceurl.host + this.serviceurl.Showlabel, newdata, otheroption);
  }

  deleteLabel(id) {
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    newdata.append('email', email1);
    newdata.append('id', id);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.serviceurl.host + this.serviceurl.Deletelabel, newdata, otheroption);
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
    return this.http.post(this.serviceurl.host + this.serviceurl.Editlabel, newdata, otheroption);
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
    return this.http.post(this.serviceurl.host + this.serviceurl.Addnotelabel, newdata, otheroption);
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
    return this.http.post(this.serviceurl.host + this.serviceurl.Deletenotelabel, newdata, otheroption);
  }

  addImage(id, imagefile) {
    debugger;
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    newdata.append('email', email1);
    newdata.append('id', id);
    newdata.append('file', imagefile);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.serviceurl.host + this.serviceurl.Addimage, newdata, otheroption);
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
    return this.http.post(this.serviceurl.host + this.serviceurl.Addcollaborator, newdata, otheroption);
  }


  getCollaborator(id) {
    const newdata = new FormData();
    var email1 = localStorage.getItem('email');
    newdata.append('email', email1);
    newdata.append('id', id);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.serviceurl.host + this.serviceurl.Getcollaborator, newdata, otheroption);
  }

  getCollaboratorNote(email) {
    const newdata = new FormData();
    newdata.append('email', email);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.serviceurl.host + this.serviceurl.Getcollaborator1, newdata, otheroption);
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
    return this.http.post(this.serviceurl.host + this.serviceurl.Deletecollaborator, newdata, otheroption);
  }

  // /**
  //  * profile related api calls
  //  * @param email 
  //  * @param imagefile 
  //  */
  // addProfile(email, imagefile) {
  //   debugger;
  //   const newdata = new FormData();
  //   newdata.append('email', email);
  //   newdata.append('file', imagefile);
  //   const otheroption: any = {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   };
  //   return this.http.post(this.serviceurl.host + this.serviceurl.Addprofile, newdata, otheroption);
  // }

  /**
* to upload the image for the profile picture
* @param fileToUpload image file to be stored in db
* @param email email of particular 
* @return Observables
*/
  uploadImage(base64string, email) {
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    debugger;
    const params = new FormData();
    params.append("fileKey", base64string);
    params.append("email", email);

    return this.http.post(this.serviceurl.host + this.serviceurl.Addprofile, params, otheroption);
  }

  showProfile(email) {
    const newdata = new FormData();
    newdata.append('email', email);
    const otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.serviceurl.host + this.serviceurl.Showprofile, newdata, otheroption);
  }

  dragnotes(email: any, id: any, loops: any, direction: any): any {
    const data = new FormData();
    debugger;
    data.append("email", email);
    data.append("id", id);
    data.append("loop", loops);
    data.append("direction", direction);
    return this.http.post(this.serviceurl.host + this.serviceurl.DragDrop_url, data);
  }
}
