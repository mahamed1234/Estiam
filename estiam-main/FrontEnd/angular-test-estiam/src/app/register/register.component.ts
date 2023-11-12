import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { HttpResponse } from '@angular/common/http';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    providers: [MessageService],
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    form: FormGroup;
    saved = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authservice: AuthService
    ) {
        this.form = this.fb.group(
            {
                username: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                password: [
                    '',
                    [
                        Validators.required,
                        Validators.pattern(
                            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
                        ),
                    ],
                ],
                confirmPassword: ['', Validators.required],
            },
            {
                validators: this.passwordMatchValidator,
            }
        );
    }

    ngOnInit(): void {}

    async register() {
        try {
            if (this.form.valid) {
                // Your registration logic here, without AuthService
                const user = {
                    username: this.form.value.username,
                    email: this.form.value.email,
                    password: this.form.value.password,
                };
                this.authservice.register(user).subscribe(
                    (response: HttpResponse<any>) => {
                        // Assuming the server sends a success status code (e.g., 201 Created)
                        if (response.status === 201) {
                            // Registration was successful
                            this.saved = true;
                            this.router.navigate(['/login']);
                        } else {
                            // Handle registration errors here
                            console.log('failed 1');
                        }
                    },
                    (_error: any) => {
                        // Handle registration errors here
                        console.log('failed 2');
                    }
                );

                this.router.navigate(['/login']);
            }
        } catch (error) {
            console.error('Registration failed', error);
        }
    }

    private passwordMatchValidator(form: FormGroup) {
        const password = form.get('password')?.value;
        const confirmPassword = form.get('confirmPassword')?.value;

        return password === confirmPassword ? null : { notMatch: true };
    }
}