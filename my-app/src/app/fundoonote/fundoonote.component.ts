import { Component, OnInit } from '@angular/core';
import { ListviewService } from '../service/listview/listview.service';
import { LoginService } from '../service/loginservice/login.service';


@Component({
  selector: 'app-fundoonote',
  templateUrl: './fundoonote.component.html',
  styleUrls: ['./fundoonote.component.css']
})
export class FundoonoteComponent implements OnInit {
  email:string=null;
  listicon:boolean=true;
  gridicon:boolean=false;
  
  constructor(private listviewService:ListviewService,private loginService:LoginService) {    
}

listview(): void {
  // send message to subscribers via observable subject
  this.listviewService.listview('Message from Home Component to App Component!');
  this.listicon=false;
  this.gridicon=true;
}

gridview(): void {
  // clear message
  this.listviewService.gridview();
  this.listicon=true;
  this.gridicon=false;
}

  ngOnInit() {
    var email1=localStorage.getItem('email');
    this.email=email1;
}

logout()
{
this.loginService.logout();
}
  
}
