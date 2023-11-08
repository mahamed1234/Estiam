import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  getEvents() {
    throw new Error('Method not implemented.');
  }
  private eventsSubject = new BehaviorSubject<any[]>([]);
  public events$: Observable<any[]> = this.eventsSubject.asObservable();

  constructor() {}

  setEvents(events: any[]): void {
    this.eventsSubject.next(events);
  }
  
}
