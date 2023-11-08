import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, map} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://127.0.0.1:8000/users/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<[]> {
    return this.http.get<[]>(this.apiUrl);
  }
  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    // Define the request body, typically in JSON format
    const request = {
      oldPassword,
      newPassword,
    };

    // Send an HTTP POST request to your API to change the password

   return this.http.put(`${this.apiUrl}`, request).pipe(map((responseData: any) => {
    // If successful, store the response data into localStorage
    alert("Your Password has been changed successfully");
    return responseData;
   }
   ));
}
}
