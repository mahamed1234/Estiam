import {Component,ViewChild,ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css']
})


export class TopBarComponent implements OnInit {
    items: MenuItem[] | undefined;
    
    constructor(private router: Router) {
    }

    ngOnInit(){
        this.items=[{
            label: 'User',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Profile',
                    icon: 'pi pi-fw pi-user',
                    command:()=>{
                        this.router.navigate(['/changepasswd/']);
                    }
    
                },
                {
                    label: 'logout',
                    icon: 'pi pi-fw pi-user',
                    command:()=>{
                        this.logoutData()
                    }
                },
            ]
        },]

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

    navigateToProfile(){
        this.router.navigate(['/changepasswd'])
    }    

    logoutData() {
        localStorage.clear();
        this.router.navigate(['/']);
    }
    

        navigateTolistEvents(){
            this.router.navigate(['/listevents']);
        }
    

}
