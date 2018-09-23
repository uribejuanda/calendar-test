import { Component } from '@angular/core';
import * as moment from 'moment';
import * as ramda from 'ramda';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calendar-test';
  private dateContext = moment().subtract(1, 'months'));
  private today = moment();
  weekdays = moment.weekdays();
  weekdaysShort = moment.weekdaysShort();
  private months = moment.months();
  calendar = [];


  constructor() {
    let now = moment();
    this.fillCalendar();
    console.log(this.currentDay());
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
  currentDay () {
    return this.dateContext.format('D');
  }
  firstDayOfMonth () {
    const firstDay = moment(this.dateContext).startOf('month').format('d'); // DAy of week
    return parseInt(firstDay, 10);
  }
  lastDayPrevMonth () {
    return moment(this.dateContext).subtract(1, 'months').endOf('month').date();
  }

  fillCalendar () {
    const currentDay = this.currentDay();
    const lastDayPrevMonth = this.lastDayPrevMonth();
    for (let i = 0; i < this.firstDayOfMonth(); i++ ) {
      this.calendar.push({day: lastDayPrevMonth - i, class: 'prev-month'});
    }
    this.calendar.reverse();

    for (let d = 1; d <= this.daysInMonth(); d++) {
      this.calendar.push({day: d, class: currentDay ? 'current-month current-day' : 'current-month'});
    }

    const additionalDaysQty = this.calendar.length % 7;
    if (additionalDaysQty !== 0) {
      for (let j = 1; j <= (7 - additionalDaysQty); j++) {
        this.calendar.push({day: j, class: 'next-month'});
      }
    }
  }
}
