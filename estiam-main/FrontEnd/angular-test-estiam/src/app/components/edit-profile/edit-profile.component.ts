import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [MessageService]
})
export class EditProfileComponent implements OnInit {
  form: FormGroup;
  user: any = {};

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private userService: UsersService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.userService.getUser(userId).subscribe((userData: any) => {
        this.user = userData;
        this.form.patchValue({
          username: this.user.username,
          email: this.user.email,
          password: this.user.password,
        });
      });
    } else {
      // Handle the case where user_id is not found in local storage
    }
  }

  editProfile() {
    if (this.form.valid) {
      const username = this.form.get('username')?.value;
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;

      if (window.confirm('Are you sure you want to save changes to your profile?')) {
        this.userService.editProfile(username, email, password).subscribe(
          (response: any) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Profile updated successfully',
              life: 3000,
            });
            
          },
          (error: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update the profile. Please check your information.',
              life: 3000,
            });
          }
        );
      }
    }
  }
}
