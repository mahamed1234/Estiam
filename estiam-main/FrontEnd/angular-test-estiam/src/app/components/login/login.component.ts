import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpResponse } from '@angular/common/http';
import { Message, MessageService, } from 'primeng/api';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[MessageService],
})
export class LoginComponent implements OnInit {
  email : string = ""
  password : string = ""

  form: FormGroup;
  NUMERIC_PATTREN = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
  email_Pattren = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; 
  fb: any;
  messages1: Message[] | undefined;
   constructor(private authservice:AuthService, private readonly router: Router, private readonly userservice: UserService, private readonly formBuilder: FormBuilder,    private messageService: MessageService) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.email_Pattren)]],
      password: ['', [Validators.required, Validators.pattern(this.NUMERIC_PATTREN)]]
    });
   }

  ngOnInit(): void {
    this.loadForm();
    this.messages1 = [
      { severity: 'success', summary: 'Success', detail: 'Message Content' },
      { severity: 'info', summary: 'Info', detail: 'Message Content' },
  ];
  }
  loadForm() {
    this.form = this.fb.group({
      email: ['', Validators.pattern(this.email_Pattren)],
      Password: ['', Validators.pattern(this.NUMERIC_PATTREN)]
    });
  }
  saved() {
    if (this.form.value.email && this.form.value.password) {
      this.authservice.login({ email: this.form.value.email, password: this.form.value.password }).subscribe(
        (response: HttpResponse<any>) => {
          const token = response.body.access; // Access the access token from the response
          console.log(token);
          if (response.status === 200) { // Check for the correct status code
            this.userservice.setAuth(token);
            localStorage.setItem('user',JSON.stringify(this.email))
            this.router.navigate(['calendar']);
          } else {
            // Handle authentication errors here
          this.showError();
          }
        },
        error => {
          this.showError();
        }
      );
    }
  }
  
  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Login failed' });
  }

}
