import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-changepasswd',
  templateUrl: './changepasswd.component.html',
  styleUrls: ['./changepasswd.component.css'],
  providers: [MessageService],
})
export class ChangepasswdComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private userService: UsersService // Inject the UsersService
  ) {
    this.form = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }

  changePassword() {
    if (this.form.valid) {
      const oldPassword = this.form.get('oldPassword')?.value;
      const newPassword = this.form.get('newPassword')?.value;

      if (window.confirm('Are you sure you want to change your password?')) {
        this.userService.changePassword(oldPassword, newPassword).subscribe(
          (response: any) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Password changed successfully',
              life: 3000,
            });
            this.router.navigate(['']); // Redirect to the desired page after a successful password change
          },
          (error: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to change the password. Please check your current password.',
              life: 3000,
            });
          }
        );
      }
    }
  }
}
