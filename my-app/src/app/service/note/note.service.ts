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
  private fetchreminder='http://localhost/codeigniter/Fetchreminder';
  private fetchdeletednote='http://localhost/codeigniter/Fetchdeletednotes';
  private Deleteforever='http://localhost/codeigniter/Deleteforever';
  private Restore='http://localhost/codeigniter/Restore';
  private Archive='http://localhost/codeigniter/Archive';
  private fetcharchivenote='http://localhost/codeigniter/Fetcharchivenote';
  private Unarchive='http://localhost/codeigniter/Unarchive';
  private createlabel='http://localhost/codeigniter/Createlabel';
  private Showlabel='http://localhost/codeigniter/Showlabel'
  private Deletelabel='http://localhost/codeigniter/Deletelabel'
  private Editlabel='http://localhost/codeigniter/Editlabel'
  private Addnotelabel='http://localhost/codeigniter/Addnotelabel';
  private Deletenotelabel='http://localhost/codeigniter/Deletenotelabel'
  private Addcollaborator='http://localhost/codeigniter/Addcollaborator';
  private Getcollaborator='http://localhost/codeigniter/Getcollaborator';
  private Deletecollaborator='http://localhost/codeigniter/Deletecollaborator';
  private Addprofile='http://localhost/codeigniter/Addprofile';
  private Showprofile='http://localhost/codeigniter/Showprofile';


  constructor(private http: HttpClient) { }

  getNoteValue(noteForm,color,label) {
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
    newdata.append('label',label);
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
  
      getreminders(email) {
        debugger;
       const newdata = new FormData();
       var token=localStorage.getItem('currentUser');
       newdata.append('email',email);
       const otheroption: any = {
        'Content-Type': 'application/x-www-form-urlencoded'
        };
       return this.http.post(this.fetchreminder, newdata,otheroption);
      }

      getdeletedNotes(email) {
        debugger;
       const newdata = new FormData();
       var token=localStorage.getItem('currentUser');
       newdata.append('email',email);
       const otheroption: any = {
        'Content-Type': 'application/x-www-form-urlencoded'
        };
       return this.http.post(this.fetchdeletednote, newdata,otheroption);
      }

      deleteforever(id)
      {
        const newdata=new FormData();
        var email1=localStorage.getItem('email');
        newdata.append('email',email1);
        newdata.append('id',id);
        const otheroption:any={
          'Content-Type': 'application/x-www-form-urlencoded'
        };
      return this.http.post(this.Deleteforever, newdata,otheroption);
      }

      restore(id)
      {
        const newdata=new FormData();
        var email1=localStorage.getItem('email');
        newdata.append('email',email1);
        newdata.append('id',id);
        const otheroption:any={
          'Content-Type': 'application/x-www-form-urlencoded'
        };
      return this.http.post(this.Restore, newdata,otheroption);
      }

      archive(id)
      {
        const newdata=new FormData();
        var email1=localStorage.getItem('email');
        newdata.append('email',email1);
        newdata.append('id',id);
        const otheroption:any={
          'Content-Type': 'application/x-www-form-urlencoded'
        };
      return this.http.post(this.Archive, newdata,otheroption);
      }


      getarchivedNotes(email) {
        debugger;
       const newdata = new FormData();
       var token=localStorage.getItem('currentUser');
       newdata.append('email',email);
       const otheroption: any = {
        'Content-Type': 'application/x-www-form-urlencoded'
        };
       return this.http.post(this.fetcharchivenote, newdata,otheroption);
      }

      unarchive(id)
      {
        const newdata=new FormData();
        var email1=localStorage.getItem('email');
        newdata.append('email',email1);
        newdata.append('id',id);
        const otheroption:any={
          'Content-Type': 'application/x-www-form-urlencoded'
        };
      return this.http.post(this.Unarchive, newdata,otheroption);
      }

      savelabel(model) {
        debugger;
        const newdata = new FormData();
        var email1=localStorage.getItem('email');
        newdata.append('email',email1);
        newdata.append('label',model);
        const otheroption: any = {
          'Content-Type': 'application/x-www-form-urlencoded'
          };
        return this.http.post(this.createlabel, newdata,otheroption);
        }

        showlabel(email) {
          const newdata = new FormData();
          newdata.append('email',email);
          const otheroption: any = {
            'Content-Type': 'application/x-www-form-urlencoded'
            };
          return this.http.post(this.Showlabel, newdata,otheroption);
          }

          deletelabel(id) {
            const newdata = new FormData();
            var email1=localStorage.getItem('email');
            newdata.append('email',email1);
            newdata.append('id',id);
            const otheroption: any = {
              'Content-Type': 'application/x-www-form-urlencoded'
              };
            return this.http.post(this.Deletelabel, newdata,otheroption);
            }

           editlabel(id,label) {
              const newdata = new FormData();
              var email1=localStorage.getItem('email');
              newdata.append('email',email1);
              newdata.append('id',id);
              newdata.append('label',label);
              const otheroption: any = {
                'Content-Type': 'application/x-www-form-urlencoded'
                };
              return this.http.post(this.Editlabel, newdata,otheroption);
              }

              addnotelabel(id,label)
              {
                const newdata=new FormData();
                var email1=localStorage.getItem('email');
                newdata.append('email',email1);
                newdata.append('id',id);
                newdata.append('label',label);
                const otheroption:any={
                  'Content-Type': 'application/x-www-form-urlencoded'
                };
              return this.http.post(this.Addnotelabel, newdata,otheroption);
              }

              deletenotelabel(id,label) {
                const newdata = new FormData();
                var email1=localStorage.getItem('email');
                newdata.append('email',email1);
                newdata.append('id',id);
                newdata.append('label',label);
                const otheroption: any = {
                  'Content-Type': 'application/x-www-form-urlencoded'
                  };
                return this.http.post(this.Deletenotelabel, newdata,otheroption);
                }
            
                addcollaborator(id,sharemail)
              {
                const newdata=new FormData();
                var email1=localStorage.getItem('email');
                newdata.append('email',email1);
                newdata.append('id',id);
                newdata.append('sharemail',sharemail);
                const otheroption:any={
                  'Content-Type': 'application/x-www-form-urlencoded'
                };
              return this.http.post(this.Addcollaborator, newdata,otheroption);
              }


              getcollaborator(id)
              {
                const newdata=new FormData();
                var email1=localStorage.getItem('email');
                newdata.append('email',email1);
                newdata.append('id',id);
                const otheroption:any={
                  'Content-Type': 'application/x-www-form-urlencoded'
                };
              return this.http.post(this.Getcollaborator, newdata,otheroption);
              }

              deletecollaborator(noteid,sharemail)
              {
                const newdata=new FormData();
                var email1=localStorage.getItem('email');
                newdata.append('email',email1);
                newdata.append('noteid',noteid);
                newdata.append('sharemail',sharemail);
                const otheroption:any={
                  'Content-Type': 'application/x-www-form-urlencoded'
                };
              return this.http.post(this.Deletecollaborator, newdata,otheroption);
              }

              addprofile(email,imagefile)
              {
                debugger;
                const newdata=new FormData();
                newdata.append('email',email);
                newdata.append('file',imagefile);
                // newdata.append('imagefile',imagefile.name);
                // newdata.append('imageloc',imagefile.webkitRelativePath);
                const otheroption:any={
                  'Content-Type': 'application/x-www-form-urlencoded'
                };
              return this.http.post(this.Addprofile, newdata,otheroption);
              }
              
              showprofile(email)
              {
                const newdata=new FormData();
                newdata.append('email',email);
                const otheroption:any={
                  'Content-Type': 'application/x-www-form-urlencoded'
                };
              return this.http.post(this.Showprofile, newdata,otheroption);
              }
    
        
}
