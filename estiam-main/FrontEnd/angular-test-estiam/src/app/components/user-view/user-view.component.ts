import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
})
export class UserViewComponent implements OnInit {
  users: any = [];
  originalUsers: any[] = [];
  displayedColumns: string[] = ['username', 'email'];
  searchKeyword: string = '';

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: any) => {
      this.users = this.mapUsers(data.results);
      this.originalUsers = [...this.users]; // Make a copy of the original users
    });
  }

  toggleUrlColumnVisibility() {
    // Implement if needed
  }

  applyFilter() {
    // Reset to the original users when the searchKeyword is empty
    if (!this.searchKeyword) {
      this.users = [...this.originalUsers];
    } else {
      // Apply the filter when the searchKeyword is not empty
      this.users = this.originalUsers.filter((user) => {
        return (
          user.username.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchKeyword.toLowerCase())
        );
      });
    }
  }

  mapUsers(users: any[]): any[] {
    return users.map((user) => {
      // Add the 'role' property based on 'is_superuser'
      user.role = user.is_superuser ? 'Admin' : 'User';
      return user;
    });
  }
}
