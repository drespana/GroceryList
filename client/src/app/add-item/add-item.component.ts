import { Component } from '@angular/core';
import {Router} from '@angular/router';
import Item from '../Item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {

constructor(private router:Router, private itemService:ItemService) {}

addItem(item:Item){
  this.itemService.createItem(item)
    .subscribe({
      next: ()=>{
        this.router.navigate(['/items']);
      },
      error: (error) => {
        alert("Failed to create Item");
        console.error(error);
      }
    })
}

}
