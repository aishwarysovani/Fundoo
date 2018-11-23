import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterService } from '../service/register/register.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [RegisterService]
})
export class RegisterComponent implements OnInit {
    email = new FormControl('', [Validators.required, Validators.email]);
    hide = true;
    public error;
    registerForm: FormGroup;
    submitted = false;
    constructor(private formBuilder: FormBuilder, private registerService: RegisterService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            Emailid: ['', Validators.required],
            Password: ['', Validators.required],
            Phoneno: ['', Validators.required]

        });
    }
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        alert('SUCCESS!! :-)')
    }

    register() {
        const obs = this.registerService.getRegisterValue(this.registerForm);
        obs.subscribe(
            (s: any) => {
                console.log('got response');
            },

            error => { this.handleError(error) },

        );
        this.registerForm.reset();
    }


    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            this.error = console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            this.error = console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            this.error = 'Something bad happened; please try again later.');
    }
}

