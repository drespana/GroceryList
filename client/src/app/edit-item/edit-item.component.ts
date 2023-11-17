import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import Item from '../Item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent {
item: BehaviorSubject<Item> = new BehaviorSubject({});

constructor(
  private router:Router,
  private route:ActivatedRoute,
  private itemService:ItemService
){}

ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  if (!id) {
    alert('No id provided');
  }

  this.itemService.getItem(id!).subscribe((item)=>{
    this.item.next(item);
  })
}

editItem(item: Item){
  this.itemService.updateItem(this.item.value._id || '', item)
    .subscribe({
      next: () => {
        this.router.navigate(['/items']);
      },
      error: (error) => {
        alert("Failed to update item");
        console.error(error);
      }
    })
}


}
