import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UsersService } from 'src/app/services/users.service'; // Update this path
 
@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
    items: MenuItem[] | undefined;
    user: any; // Assuming you have a user variable
 
    constructor(private router: Router, private userService: UsersService) {}
 
    ngOnInit() {
        const userId = localStorage.getItem('user_id');
        if (userId) {
            this.userService.getUser(userId).subscribe((userData: any) => {
                this.user = userData;
                this.items = [
                    {
                        label: this.user.username, // Change the label to the username
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Profile',
                                icon: 'pi pi-fw pi-user',
                                command: () => {
                                    this.router.navigate(['/editprofile/']);
                                },
                            },
                            {
                                label: 'Logout',
                                icon: 'pi pi-fw pi-user',
                                command: () => {
                                    this.logoutData();
                                },
                            },
                        ],
                    },
                ];
            });
        } else {
            // Handle the case where user_id is not found in local storage
            this.items = []; // or set it to some default value
        }
    }
 
    navigateToHome() {
        this.router.navigate(['/']);
    }
 
    navigateToUsers() {
        this.router.navigate(['/users']);
    }
 
    navigateToCalendar() {
        this.router.navigate(['/calendar']);
    }
 
    navigateToSettings() {
        this.router.navigate(['/settings']);
    }
 
    navigateToProfile() {
        this.router.navigate(['/editprofile']);
    }
 
    logoutData() {
        localStorage.clear();
        this.router.navigate(['/']);
    }
 
    navigateTolistEvents() {
        this.router.navigate(['/listevents']);
    }
}
 