import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private storage: StorageService, private readonly router: Router) {
    // Check if the user is authenticated
    const authHeader = this.storage.getSetting('Authorization');
    if (authHeader) {
      this.router.navigate(['']);
      this.isAuth.next(true);
    }
  }

  getUserInfo() {
    const authHeader = this.storage.getSetting('Authorization');
    if (authHeader) {
      // Extract and decode the access token
      const token = authHeader.replace('Bearer ', '');
      // You can add additional logic here to decode the JWT token if needed
      return token;
    } else {
      console.error('User not signed in');
      return null;
    }
  }

  setAuth(token: string) {
    // Set the "Authorization" header with the "Bearer" token
    this.storage.setSetting('Authorization', `Bearer ${token}`);
    this.isAuth.next(true);
  }

  unAuth() {
    // Remove the "Authorization" header to log the user out
    this.storage.removeSetting('Authorization');
    this.isAuth.next(false);
    this.router.navigate(['login']);
  }
}
