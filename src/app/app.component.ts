import { Component } from '@angular/core';
import * as moment from 'moment';

moment.locale('es');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calendar-test';
  private dateContext = moment();
  dateSelectedString = this.dateContext.format('YYYY-MM-DD'); // '2017-09-12';
  weekdays;
  calendar;

  constructor() {
    this.fillWeekDays();
    this.fillCalendar();
  }

  year () {
    return this.dateContext.format('Y');
  }
  month () {
    return this.dateContext.format('MMMM');
  }
  daysInMonth () {
    return this.dateContext.daysInMonth();
  }
  currentDate () {
    return this.dateContext.get('date');
  }
  firstDayOfMonth () {
    const firstDay = moment(this.dateContext).startOf('month').format('d'); // Day of week
    return parseInt(firstDay, 10);
  }
  lastDayPrevMonth () {
    return moment(this.dateContext).subtract(1, 'months').endOf('month').date();
  }

  dateSelected (evt) {
    this.dateSelectedString = evt;
    this.dateContext = moment(this.dateSelectedString);
    this.fillCalendar();
  }

  fillWeekDays () {
    const [ head, ...tail ] = moment.weekdays(); // ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    this.weekdays = [...tail, head]; // ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  }

  fillCalendar () {
    const currentDate = this.currentDate();
    const lastDayPrevMonth = this.lastDayPrevMonth();
    this.calendar = [];

    for (let i = 0; i < this.firstDayOfMonth() - 1 ; i++ ) {
      this.calendar.push({day: lastDayPrevMonth - i, class: 'prev-month'});
    }
    this.calendar.reverse();

    for (let d = 1; d <= this.daysInMonth(); d++) {
      this.calendar.push({
        day: d,
        class: (currentDate === d) ? 'current-month current-day' : 'current-month'
      });
    }

    const additionalDaysQty = this.calendar.length % 7;
    if (additionalDaysQty !== 0) {
      for (let j = 1; j <= (7 - additionalDaysQty); j++) {
        this.calendar.push({day: j, class: 'next-month'});
      }
    }
  }
}
