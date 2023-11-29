import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, tap, of } from 'rxjs';
import Reminder from './Reminder';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  private url  = 'http://localhost:5200';
  private reminders$: Subject<Reminder[]> = new Subject();

  constructor(private http: HttpClient) { }

  private refreshReminders() {
    this.http.get<Reminder[]>(`${this.url}/Reminders`)
      .subscribe(reminders => {
        this.reminders$.next(reminders);
      })
  }

  getReminders(): Subject<Reminder[]> {
    this.refreshReminders();
    return this.reminders$;
  }

  getReminder(id:string): Observable<Reminder> {
    return this.http.get<Reminder>(`${this.url}/reminders/${id}`)
  }

  createReminder(reminder: Reminder): Observable<string> {
    return this.http.post(`${this.url}/reminders`, reminder, {responseType:'text'});
  }

  updateReminder(id: string | undefined, reminder: Reminder): Observable<string> {
    return this.http.put(`${this.url}/reminders/${id}`, reminder, { responseType: 'text' });
  }
  
  deleteReminder(id: string | undefined): Observable<string> {
    return this.http.delete(`${this.url}/reminders/${id}`, { responseType: 'text' });
  }


}
