import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { AvailabilityServiceService } from '../../services/availability-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-mentor-availability-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FullCalendarModule,
    HttpClientModule,
    ToastModule,
    RouterModule,
    ButtonModule
  ],
  providers: [MessageService],
  templateUrl: './mentor-availability-calendar.component.html',
  styleUrls: ['./mentor-availability-calendar.component.scss']
})
export class MentorAvailabilityCalendarComponent {
  private readonly availabilityService = inject(AvailabilityServiceService);
  private readonly messageService = inject(MessageService);

  private eventsSignal = signal<any[]>([]);

  calendarOptions = computed<CalendarOptions>(() => ({
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    selectable: true,
    editable: false,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: this.eventsSignal(),
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventDidMount: (info) => {
      const tooltip = document.createElement('div');
      tooltip.innerHTML = `
        <b>${info.event.title}</b><br/>
        ${new Date(info.event.start!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
        ${new Date(info.event.end!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      `;
      tooltip.className = 'fc-tooltip';
      info.el.setAttribute('title', tooltip.innerText);
    }
  }));

  constructor() {
    effect(() => this.loadAvailabilities());
  }

  loadAvailabilities(): void {
    this.availabilityService.getMyAvailabilities().subscribe(availabilities => {
      const events = availabilities.map(a => ({
        id: a.id.toString(),
        title: a.status === 'BOOKED' ? 'Session réservée' : 'Disponible',
        start: a.startTime,
        end: a.endTime,
        color: a.status === 'BOOKED' ? '#ff9800' : '#00c853'
      }));
      this.eventsSignal.set(events);
    });
  }

  handleDateClick(info: DateClickArg): void {
    const start = new Date(info.date);
    const end = new Date(start);
    end.setHours(start.getHours() + 1);

    this.availabilityService.addAvailability({ start, end }).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Créneau ajouté' });
      this.loadAvailabilities();
    });
  }

  handleEventClick(info: EventClickArg): void {
    const id = Number(info.event.id);
    if (confirm('Supprimer ce créneau ?')) {
      this.availabilityService.deleteAvailability(id).subscribe(() => {
        this.messageService.add({ severity: 'info', summary: 'Créneau supprimé' });
        this.loadAvailabilities();
      });
    }
  }
}

