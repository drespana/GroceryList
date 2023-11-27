import { Observable } from 'rxjs';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { BehaviorSubject } from 'rxjs';
import Task from '../Task';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent {

  addingReminder:boolean=false;
  addingWeeklyTask:boolean=false;
  addingMonthlyTask:boolean=false;
  weeklyCalendar:boolean=true;
  monthlyCalendar:boolean=false;

  toggleCalendar(){
    this.weeklyCalendar = !this.weeklyCalendar
    this.monthlyCalendar = !this.monthlyCalendar
  }

  toggleReminderForm(){
    this.addingReminder = !this.addingReminder
  }

  toggleWeeklyTaskForm(){
    this.addingWeeklyTask = !this.addingWeeklyTask
  }

  toggleMonthlyTaskForm(){
    this.addingMonthlyTask = !this.addingMonthlyTask
  }

}
