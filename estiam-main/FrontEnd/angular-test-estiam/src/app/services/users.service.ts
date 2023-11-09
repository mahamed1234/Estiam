import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://127.0.0.1:8000/users/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<[]> {
    return this.http.get<[]>(this.apiUrl);
  }

  getUser(userId: string): Observable<any> {
    const url = `${this.apiUrl}${userId}/`;
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Get User Error:', error);
        return throwError(error);
      })
    );
  }

  editProfile(username: string, email: string, password: string): Observable<any> {
    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
      return throwError('User ID not found in local storage');
    }

    const url = `${this.apiUrl}${user_id}/`;

    // You may need to adjust the actual API endpoint and request method
    return this.http.put(url, { username, email, password }).pipe(
      catchError((error) => {
        console.error('Edit Profile Error:', error);
        return throwError(error);
      })
    );
  }
}
