import { Observable } from 'rxjs';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { ReminderService } from '../reminder.service';
import { BehaviorSubject } from 'rxjs';
import Task from '../Task';
import Reminder from '../Reminder'

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {

  reminders$: Observable<Reminder[]> = new Observable();
  tasks$: Observable<Reminder[]> = new Observable();

  addingReminder:boolean=false;
  addingWeeklyTask:boolean=false;
  addingMonthlyTask:boolean=false;
  weeklyCalendar:boolean=true;
  monthlyCalendar:boolean=false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private taskService: TaskService,
    private reminderService: ReminderService
  ) {}

  ngOnInit(): void {
    this.fetchReminders();
    this.fetchTasks();
  }

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

  private fetchReminders(): void {
    this.reminders$ = this.reminderService.getReminders();
  }

  private fetchTasks(): void {
    this.tasks$ = this.taskService.getTasks();
  }

}
