import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { DayComponent } from './day/day.component';

const routes: Routes = [
    { path: 'calendar', component: CalendarComponent },
    { path: 'calendar/day', component: DayComponent },
    { path: '', redirectTo: '/calendar', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
