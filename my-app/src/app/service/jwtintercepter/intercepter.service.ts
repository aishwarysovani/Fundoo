import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

/**
 * @var currentUser used to get item from localstorage
 * intecepter used to set header field of token
 */
export class IntercepterService implements HttpInterceptor {

    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        var currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser}`
                }
            });
        }

        return next.handle(request);
    }
}
