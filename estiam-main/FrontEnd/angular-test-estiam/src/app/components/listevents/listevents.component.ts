import { Component, OnInit, ViewChild } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { ConfirmationService } from 'primeng/api';
import { MbscCalendarEvent, MbscPopup } from '@mobiscroll/angular';
import { FormBuilder ,FormGroup} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listevents',
  templateUrl: './listevents.component.html',
  styleUrls: ['./listevents.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ListeventsComponent implements OnInit {
   
  @ViewChild('popup', { static: false })
  popup!: MbscPopup;
  
  events: any[] = [];
  searchKeyword: string = ''; // Add a property for the search keyword
  originalEvents: any[] = [];
  event!: number;
  myEvents: MbscCalendarEvent[] = [];
  tempEvent!: MbscCalendarEvent;
  popupEventTitle: string | undefined;
  popupEventDescription='';
  
  constructor(private messageService: MessageService,private readonly router: Router,private eventsService: EventsService,private confirmationService: ConfirmationService,private formBuilder: FormBuilder,private readonly userservice: UserService,) {
    

  }

  ngOnInit() {
    this.getEvents();
   
    
  }
  

  getEvents() {
    this.eventsService.getEvents().subscribe((data: any) => {
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
  deleteEvent(event: MbscCalendarEvent): void {
    const eventId = Number(event.id);
    if (!isNaN(eventId)) {
      if (window.confirm('Are you sure you want to delete this event?')) {
        this.eventsService.deleteEvent(eventId).subscribe((response) => {
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

  editevent(){}

}




