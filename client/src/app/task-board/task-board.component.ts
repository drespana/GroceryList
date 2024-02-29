import { Observable } from 'rxjs';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { ReminderService } from '../reminder.service';
import { BehaviorSubject } from 'rxjs';
import Task from '../Task';
import Reminder from '../Reminder';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
})
export class TaskBoardComponent implements OnInit {
  @Input() initialState: BehaviorSubject<Reminder> = new BehaviorSubject({});

  @Output() formSubmitted = new EventEmitter<Reminder>();
  @Output() formValuesChanged = new EventEmitter<Reminder>();
  reminders$: Observable<Reminder[]> = new Observable();
  tasks$: Observable<Reminder[]> = new Observable();

  // booleans//
  addingReminder: boolean = false;
  addingWeeklyTask: boolean = false;
  addingMonthlyTask: boolean = false;
  weeklyCalendar: boolean = true;
  monthlyCalendar: boolean = false;

  // forms //
  addReminderForm: FormGroup = new FormGroup({});
  newReminder: Reminder = {};

  addTaskForm: FormGroup = new FormGroup({});
  newTask: Task = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private taskService: TaskService,
    private reminderService: ReminderService
  ) {}

  get title() {
    return this.addReminderForm.get('title')!;
  }
  get description() {
    return this.addReminderForm.get('description')!;
  }

  ngOnInit(): void {

    this.initialState.subscribe((reminder) => {
      this.addReminderForm= this.fb.group({
        title: [reminder.title, [Validators.required]],
        description: [reminder.description, []]
      })
    })

    this.addReminderForm.valueChanges.subscribe((val) => {
      this.formValuesChanged.emit(val);
    })

    this.fetchReminders();
    this.fetchTasks();
  }

  toggleCalendar() {
    this.weeklyCalendar = !this.weeklyCalendar;
    this.monthlyCalendar = !this.monthlyCalendar;
  }

  toggleReminderForm() {
    this.addingReminder = !this.addingReminder;
  }

  toggleWeeklyTaskForm() {
    this.addingWeeklyTask = !this.addingWeeklyTask;
  }

  toggleMonthlyTaskForm() {
    this.addingMonthlyTask = !this.addingMonthlyTask;
  }

  private fetchTasks(): void {
    this.tasks$ = this.taskService.getTasks();
  }

  submitReminderForm() {
    if(this.addReminderForm.invalid){}
    else{
      this.newReminder = this.addReminderForm.value;
      this.addReminder(this.newReminder)
      this.ngOnInit();
      this.fetchReminders();
    }
  }

  addReminder(reminder: Reminder) {
    this.reminderService.createReminder(reminder).subscribe({
      error: (error) => {
        alert('Failed to create Reminder');
        console.log(error);
      }
    })
  }

  deleteReminder(id: string | undefined): void {
    this.reminderService.deleteReminder(id).subscribe({
      next: () => this.fetchReminders(),
    });
  }

  private fetchReminders(): void {
    this.reminders$ = this.reminderService.getReminders();
  }
}
