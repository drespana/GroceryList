import { Observable } from 'rxjs';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { BehaviorSubject } from 'rxjs';
import Item from '../Item';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.css'],
})
export class AllItemsComponent {
  @Input() initialState: BehaviorSubject<Item> = new BehaviorSubject({});
  
  @Output() formSubmitted = new EventEmitter<Item>();
  @Output() formValuesChanged = new EventEmitter<Item>();
  items$: Observable<Item[]> = new Observable();
  isAdding:boolean=false;
  displayError:boolean=false;
  itemForm: FormGroup = new FormGroup({});
  newItem:Item={};
  constructor(private fb: FormBuilder, private router:Router, private itemService:ItemService) {}

  get item() {return this.itemForm.get('item')!;}
  get inStock() {return this.itemForm.get('inStock')!;}
  get frequency() {return this.itemForm.get('frequency')!;}
  get store() {return this.itemForm.get('store')!};

  ngOnInit(): void {
    this.fetchItems();
    this.isAdding=false;

    this.initialState.subscribe(item => {
      this.itemForm = this.fb.group({
        item: [item.item, [Validators.requiredTrue]],
        frequency: [ item.frequency, [Validators.required] ],
        inStock: [ item.inStock, [] ],
        store: [item.store, [] ]
      })
    })
    this.itemForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  toggle():void{
    this.isAdding=!this.isAdding
  }

  submitForm() {
    if (this.itemForm.invalid) {
      this.displayError=true;
    } else {
    this.formSubmitted.emit(this.itemForm.value)
    this.newItem = this.itemForm.value;
    this.addItem(this.newItem);
    this.fetchItems();
    this.ngOnInit();
  }
  }

  addItem(item:Item){
    this.itemService.createItem(item)
      .subscribe({
        error: (error) => {
          alert("Failed to create Item");
          console.error(error);
        }
      })
  }

  deleteItem(id: string | undefined): void {
    this.itemService.deleteItem(id).subscribe({
      next: () => this.fetchItems(),
    });
  }

  private fetchItems(): void {
    this.items$ = this.itemService.getItems();
  }
}
