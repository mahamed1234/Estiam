import { Component, OnInit } from '@angular/core';
import {UserService} from "./services/user.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'estiam-test';
  constructor(private readonly router: Router, private readonly userservice: UserService){}
  ngOnInit() {
    
    this.userservice.isAuth.subscribe((isAuthenticated: any) => {
      if(isAuthenticated) {
        this.router.navigate(['/calendar']);
    }
  });
  }
}
