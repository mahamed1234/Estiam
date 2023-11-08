import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from "../../services/users.service";



@Component({
    selector: 'app-user-view',
    templateUrl: './user-view.component.html',
    styleUrls: ['./user-view.component.css']
})

export class UserViewComponent implements OnInit {
    users : any= [];
    body : any = {};

    isUrlColumnVisible: boolean = false;
    displayedColumns: string[] = ['username', 'email'];
    searchKeyword: string = ''; // Add a property for the search keyword
    filteredUsers:  []; 
    originalUsers:  [];
    
    constructor(private userService: UsersService) {
    }

    ngOnInit(): void {
        this.userService.getUsers().subscribe((data: any) => {
            this.users = data.results;
          
        });
    }
    
    toggleUrlColumnVisibility() {
        this.isUrlColumnVisible = !this.isUrlColumnVisible;
      }
      applyFilter() {
        // Apply the filter when the searchKeyword is not empty
        if (this.searchKeyword) {
          this.users = this.users.filter((user: { username: string; email: string }) => {
            return (
              user.username.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
              user.email.toLowerCase().includes(this.searchKeyword.toLowerCase())
            );
          });
        } else {
          // Reset to the original users when searchKeyword is empty
        
          // You should fetch the original users from your service here

          // For demonstration, we'll assume you have a method getUsers() to fetch the users
          this.users = this.originalUsers;
        }
      }
    
      // For demonstration, simulate fetching users from a service
      getUsers() {
        // Replace this with the actual service call to fetch users
        this.users = [
         
        ];
      }
}
