import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Item from '../Item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-groceries-list',
  templateUrl: './groceries-list.component.html',
  styleUrls: ['./groceries-list.component.css']
})

export class GroceriesListComponent {
  
  items$: Observable<Item[]> = new Observable();

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  deleteItem(id:string):void {
    this.itemService.deleteItem(id).subscribe({
      next: ()=> this.fetchItems()
    })
  }

  private fetchItems(): void {
    this.items$ = this.itemService.getItems();
  }
}
