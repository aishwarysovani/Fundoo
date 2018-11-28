import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

/**
 * service to used to call list view and 
 * grid view
 * @object subject used as observable
 */
export class ListviewService {

    constructor() { }
    private subjectforSearch=new Subject<any>();
    private subject = new Subject<any>();

    listview(message: string) {
        this.subject.next(message);
    }

    gridview() {
        this.subject.next();
    }

    getview(): Observable<any> {
        return this.subject.asObservable();
    }

    searchItem(searchItem: any): any {
        this.subjectforSearch.next(searchItem);
      }
      getsearchItem(): Observable<any> {
        return this.subjectforSearch.asObservable();
      }
}
