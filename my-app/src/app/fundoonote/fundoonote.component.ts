import { Component, OnInit} from '@angular/core';
import { ListviewService } from '../service/listview/listview.service';
import { LoginService } from '../service/loginservice/login.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditlabelComponent } from '../editlabel/editlabel.component';
import { NoteService } from '../service/note/note.service';


export interface DialogData {
  label: any;
}

@Component({
  selector: 'app-fundoonote',
  templateUrl: './fundoonote.component.html',
  styleUrls: ['./fundoonote.component.css']
})

/**
 * @var email,@var listicon,@var gridicon
 * @var test,@var test1,@var image
 * @var selectedFile
 */
export class FundoonoteComponent implements OnInit {
  email: string = null;
  listIcon: boolean = true;
  gridIcon: boolean = false;
  test: any;
  testT: any;
  selectedFile: File;
  image: any;
  obs:any;

  constructor(private listviewService: ListviewService, private loginService: LoginService,
    public dialog: MatDialog, private noteservice: NoteService) {
    debugger;
    var email1 = localStorage.getItem('email');
    this.email = email1;

    /**
     * service to show profile pic
     * @param email
     */
    this.obs = this.noteservice.showProfile(this.email);
    this.obs.subscribe(
      (status: any) => {
        debugger;
        this.testT = status;
        console.log(status);
      });
  }

  search(searchItem) {
    this.listviewService.searchItem(searchItem);
  }

  listview(): void {
    // send message to subscribers via observable subject
    this.listviewService.listview('Message from Home Component to App Component!');
    this.listIcon = false;
    this.gridIcon = true;
  }

  gridview(): void {
    // clear message
    this.listviewService.gridview();
    this.listIcon = true;
    this.gridIcon = false;
  }

  ngOnInit() {
    var emailE = localStorage.getItem('email');
    this.email = emailE;
    this.obs = this.noteservice.showLabel(emailE);
    this.obs.subscribe(
      (status: any) => {
        this.test = status;
        console.log(status);
      });
  }

  ngOnDestory() {
    this.obs.unsubscribe();
  }
  /**
   * event call to access file
   * @param event 
   */
  onFileChanged(event) {
    debugger;
    this.selectedFile = event.target.files[0];

    /**
     * service call to update profile pic
     * @param email,@param selectedFile
     */
    this.obs = this.noteservice.addProfile(this.email, this.selectedFile);
    this.obs.subscribe(
      (status: any) => {
        this.testT = status;
        console.log(status);
      });
  }

  /**
   * call logout service
   */
  logout() {
    this.loginService.logout();
  }

  /**
   * open dialog of edit label with all functionality
   */
  openDialog(): void {
    let dialogRef = this.dialog.open(EditlabelComponent, {
      height: 'flex',
      width: '300px',
      data: { label: "hello" }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.test = result;
      console.log('The dialog was closed');
    });
    dialogRef.afterClosed().unsubscribe();
  }
}
