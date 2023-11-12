import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
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
  async getEvents(): Promise<Observable<any>> {
    const authToken = await this.userService.getUserInfo();
    const headers = new HttpHeaders().append("Authorization", `Bearer ${authToken}`);
    return this.http.get(`${this.apiUrl}/`, { headers });
  }

  async addEvent(eventData: any): Promise<Observable<any>> {
    return this.http.post(`${this.apiUrl}/`, eventData, {
      headers: new HttpHeaders().append("Authorization", `Bearer ${this.authToken}`),
    });
  }
   async editEvent(eventId: number, eventData: any): Promise<Observable<any>> {
    return this.http.put(`${this.apiUrl}/${eventId}/`, eventData, {
      headers: new HttpHeaders().append("Authorization", `Bearer ${this.authToken}`),
    });
  }
  async deleteEvent(eventId: number): Promise<Observable<any>> {
    const url = `${this.apiUrl}/${eventId}/`;
    console.log('Delete URL:', url);

    return this.http.delete(url, {
      headers: new HttpHeaders().append("Authorization", `Bearer ${this.authToken}`),
    });
}

  
  
}
