import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class EventsService {
  [x: string]: any;
  id(id: any) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://127.0.0.1:8000/Events';

  constructor(private http: HttpClient,private  userService : UserService) {}

  authToken = this.userService.getUserInfo();
  getEvents(): Observable<any>{
    return this.http.get(`${this.apiUrl}/`,{
      headers: new HttpHeaders().append("Authorization",`Bearer ${this.authToken}`),
    })
  }
  addEvent(eventData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, eventData, {
      headers: new HttpHeaders().append("Authorization", `Bearer ${this.authToken}`),
    });
  }
  editEvent(eventId: number, eventData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${eventId}/`, eventData, {
      headers: new HttpHeaders().append("Authorization", `Bearer ${this.authToken}`),
    });
  }
  deleteEvent(eventId: number): Observable<any> {
    const url = `${this.apiUrl}/${eventId}/`;
    console.log('Delete URL:', url);

    return this.http.delete(url, {
      headers: new HttpHeaders().append("Authorization", `Bearer ${this.authToken}`),
    });
}

  
  
}
