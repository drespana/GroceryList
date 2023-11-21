import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, tap } from 'rxjs';
import Item from './Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private url  = 'http://localhost:5200';
  private items$: Subject<Item[]> = new Subject();

  constructor(private http: HttpClient) { }

  private refreshItems() {
    this.http.get<Item[]>('http://localhost:5200/groceries')
      .subscribe(items => {
        this.items$.next(items);
      })
  }

  getItems(): Subject<Item[]> {
    this.refreshItems();
    return this.items$;
  }

  
  // get by store

  getOutOfStock() {
    this.http.get<Item[]>(`${this.url}/groceries/out-of-stock`)
      .subscribe(items => {
        this.items$.next(items);
      })
  }

  getItem(id:string): Observable<Item> {
    return this.http.get<Item>(`${this.url}/groceries/${id}`)
  }

  createItem(item: Item): Observable<string> {
    return this.http.post(`${this.url}/groceries`, item, {responseType:'text'});
  }

  updateItem(id: string | undefined, item: Item): Observable<string> {
    return this.http.put(`${this.url}/groceries/${id}`, item, { responseType: 'text' });
  }
  
  deleteItem(id: string | undefined): Observable<string> {
    return this.http.delete(`${this.url}/groceries/${id}`, { responseType: 'text' });
  }

}
