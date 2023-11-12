import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpResponse } from '@angular/common/http';
import { Message, MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [MessageService],
})
export class LoginComponent implements OnInit {
    email: string = '';
    password: string = '';

    form: FormGroup;
    NUMERIC_PATTREN = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
    email_Pattren = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    fb: FormBuilder;  // Correct type for fb

    messages1: Message[] | undefined;
    constructor(
        private authservice: AuthService,
        private readonly router: Router,
        private readonly userservice: UserService,
        private readonly formBuilder: FormBuilder,  // Ensure formBuilder is properly injected
        private messageService: MessageService
    ) {
        this.fb = formBuilder;  // Assign formBuilder to fb
        this.form = this.fb.group({
            email: [
                '',
                [Validators.required, Validators.pattern(this.email_Pattren)],
            ],
            password: [
                '',
                [Validators.required, Validators.pattern(this.NUMERIC_PATTREN)],
            ],
        });
    }

    ngOnInit(): void {
      this.loadForm();
    }
    loadForm() {
        this.form = this.fb.group({
            email: ['', Validators.pattern(this.email_Pattren)],
            password: ['', Validators.pattern(this.NUMERIC_PATTREN)],  // Corrected field name to 'password'
        });
    }
    saved() {
        if (this.form.value.email && this.form.value.password) {
            this.authservice
                .login({
                    email: this.form.value.email,
                    password: this.form.value.password,
                })
                .subscribe(
                    (response: HttpResponse<any>) => {
                        const token = response.body.access; // Access the access token from the response
                        console.log(token);
                        console.log(response);
                        if (response.status === 200) {
                            // Check for the correct status code
                            this.userservice.setAuth(token);

                            this.router.navigate(['/calendar']);
                            window.location.reload();
                        } else {
                            // Handle authentication errors here
                            this.showError();
                        }
                    },
                    (error) => {
                        this.showError();
                    }
                );
        }
    }

    showError() {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Login failed',
        });
    }
}
