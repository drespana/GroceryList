import { Component } from '@angular/core';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent {

  addingReminder:boolean=false;
  addingTask:boolean=false;
  weeklyCalendar:boolean=true;
  monthlyCalendar:boolean=false;

  toggleCalendar(){
    this.weeklyCalendar = !this.weeklyCalendar
    this.monthlyCalendar = !this.monthlyCalendar
  }

}
