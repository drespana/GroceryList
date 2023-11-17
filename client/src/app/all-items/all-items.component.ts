import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Item from '../Item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.css']
})
export class AllItemsComponent {
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
