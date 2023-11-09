import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { ConfirmationService } from 'primeng/api';
import { MbscCalendarEvent } from '@mobiscroll/angular';
import { FormBuilder ,} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listevents',
  templateUrl: './listevents.component.html',
  styleUrls: ['./listevents.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ListeventsComponent implements OnInit {
   
  
  
  events: any[] = [];
  searchKeyword: string = ''; // Add a property for the search keyword
  originalEvents: any[] = [];
  myEvents: MbscCalendarEvent[] = []
  editMode: boolean = false;
  event: any;

 
  
  constructor(private messageService: MessageService,
    private readonly router: Router,
    private eventsService: EventsService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    ) {
    

  }

  ngOnInit() {
    this.getEvents();
   
    
  }
  

  async getEvents() {
    (await this.eventsService.getEvents()).subscribe((data: any) => {
      this.events = data.results;
      this.originalEvents = this.events.slice();

    });
  }

  applyFilter() {
       
    if (this.searchKeyword) {
      this.events = this.events.filter((events: { title: string; description: string }) => {
        return (
          events.title.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
          events.description.toLowerCase().includes(this.searchKeyword.toLowerCase())
        );
      });
    } else {
      this.events = this.originalEvents;
    }
  }
  async deleteEvent(event: MbscCalendarEvent): Promise<void> {
    const eventId = Number(event.id);
    if (!isNaN(eventId)) {
      if (window.confirm('Are you sure you want to delete this event?')) {
        (await this.eventsService.deleteEvent(eventId)).subscribe((response) => {
          console.log('Event deleted:', response);
          this.myEvents = this.myEvents.filter((item) => item.id !== eventId);
          this.showSuccessMessage('Event deleted');
          this.getEvents();
        });
      }
    } else {
      console.error('Invalid event ID:', event.id);
    }
  }
  
  showSuccessMessage(detail: string) {
    // Display a success message using MessageService
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: detail,
      life: 3000,
    });
  }

  async editEvent(event: MbscCalendarEvent): Promise<void> {
    this.editMode = true;
    this.event = event;
  }

async saveEvent(): Promise<void> {
  if (this.event) {
    const eventData = {
      title: this.event.title,
      description: this.event.description,
      start_date: this.event.start_date,
      end_date: this.event.end_date,
    };
    (await this.eventsService.editEvent(Number(this.event.id), eventData)).subscribe((response) => {
      console.log(eventData)
      Object.assign(this.event, eventData);
      this.getEvents();
      this.editMode = false; // Set editMode to false after saving changes
    });
  }
}




}