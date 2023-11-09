import { Component, OnInit, ViewChild } from '@angular/core';
import { MbscCalendarEvent, MbscDatepickerOptions, MbscEventcalendarOptions, MbscPopup, MbscPopupOptions, Notifications, setOptions, localeEnGB } from '@mobiscroll/angular';
import { EventsService } from '../../services/events.service'; // Replace 'path-to-your-service' with the correct path
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

setOptions({
  locale: localeEnGB,
  theme: 'ios',
  themeVariant: 'light'
});

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [Notifications]
})
export class CalendarComponent implements OnInit{
  form: FormGroup;
  @ViewChild('popup', { static: false })
  popup!: MbscPopup;

  popupEventTitle: string | undefined;
  popupEventDescription = '';
  popupEventDates: string | object | Date ;
  popupEventStatus = 'busy';
  calendarSelectedDate: any = new Date();
  body: any = {};
  events:  [];
  myEvents: MbscCalendarEvent[] = [];
  tempEvent!: MbscCalendarEvent;

  calendarOptions: MbscEventcalendarOptions = {
    clickToCreate: 'single',
    dragToCreate: true,
    dragToMove: false,
    dragToResize: false,
    view: {
      calendar: { type: 'month', labels: true }
    },
    onEventClick: (args) => {
      this.isEdit = true;
      this.tempEvent = args.event;
      this.loadPopupForm(args.event);
      this.popupHeaderText = 'Edit event';
      this.popupButtons = this.popupEditButtons;
      this.popupAnchor = args.domEvent.currentTarget;
      this.popup.open();
    },
    onEventCreated: (args) => {
      setTimeout(() => {
        this.isEdit = false;
        this.tempEvent = args.event;
        this.loadPopupForm(args.event);
        this.popupHeaderText = 'New Event';
        this.popupButtons = this.popupAddButtons;
        this.popupAnchor = args.target;
        this.popup.open();
      });
    },
     onEventDeleted: (args) => {
      setTimeout(() => {
        this.deleteEvent(args.event);
      });
    }, 
    onEventUpdated: (args) => {
      // Update the event in your storage if necessary
    }
  };

  popupHeaderText!: string;
  popupAnchor: HTMLElement | undefined;
  popupAddButtons = ['cancel', {
    handler: () => {
      this.saveEvent();
    },
    keyCode: 'enter',
    text: 'Add',
    cssClass: 'mbsc-popup-button-primary'
  }];

  popupEditButtons = ['cancel', {
    handler: () => {
      this.saveEvent();
    },
    keyCode: 'enter',
    text: 'Save',
    cssClass: 'mbsc-popup-button-primary'
  }];

  popupButtons: any = [];

  popupOptions: MbscPopupOptions = {
    display: 'bottom',
    contentPadding: false,
    fullScreen: true,
    onClose: () => {
      if (!this.isEdit) {
        this.myEvents = [...this.myEvents];
      }
    },
    responsive: {
      medium: {
        display: 'anchored',
        width: 400,
        fullScreen: false,
        touchUi: false
      }
    }
  };

  datePickerControls = ['date'];

  datePickerResponsive: any = {
    medium: {
      controls: ['calendar'],
      touchUi: false
    }
  };

  datetimePickerControls = ['datetime'];

  datetimePickerResponsive = {
    medium: {
      controls: ['calendar', 'time'],
      touchUi: false
    }
  };

  datePickerOptions: MbscDatepickerOptions = {
    select: 'range',
    showRangeLabels: false,
    touchUi: true
  };

  isEdit = false;

  constructor(private notify: Notifications,private router: Router, private eventsService: EventsService,private cd: ChangeDetectorRef) {
    this.form = new FormGroup({
      popupEventDescription: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    
    this.getEvents();
  }

  async getEvents() {
    (await this.eventsService.getEvents()).subscribe((data) => {
      this.body = data;
       console.log(this.body);
      this.events = this.body.results;
      this.mapBackendEventsToMyEvents();
    });
  }

  mapBackendEventsToMyEvents() {
    this.myEvents = this.events.map((event: any) => ({
      id: event.id,
      title: event.title,
      start: new Date(event.start_date),
      end: new Date(event.end_date),
      description: event.description,
    }));
  }

  loadPopupForm(event: MbscCalendarEvent): void {
    this.popupEventTitle = event.title;
    this.popupEventDescription = event['description'];
    this.popupEventDates = [event.start, event.end];
  }

  async saveEvent(): Promise<void> {
    const eventData = {
      title: this.popupEventTitle,
      description: this.popupEventDescription,
      start_date: this.tempEvent.start,
      end_date: this.tempEvent.end,
    };

    if (this.isEdit) {
      (await this.eventsService.editEvent(Number(this.tempEvent.id), eventData)).subscribe((response) => {
      
      this.getEvents();
      
      this.popup.close();
        }
    )}

    else {
      (await this.eventsService.addEvent(eventData)).subscribe((response) => {
        this.getEvents();
        this.popup.close();
      });
    }
}

  async deleteEvent(event: MbscCalendarEvent): Promise<void> {
    (await this.eventsService.deleteEvent(Number(event.id))).subscribe((response) => {
      this.myEvents = this.myEvents.filter((item) => item.id !== event.id);
      this.notify.snackbar({
        button: {
          action: () => {
            this.myEvents = [...this.myEvents, event];
          },
          text: 'Undo'
        },
        message: 'Event deleted'
      });
    });
  }

  onDeleteClick(): void {
    this.deleteEvent(this.tempEvent);
    this.popup.close();
  } 

}
