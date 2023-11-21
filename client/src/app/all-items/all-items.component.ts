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
  isEditing:boolean=false;
  displayError:boolean=false;
  displayEditError:boolean=false;
  itemForm: FormGroup = new FormGroup({});
  editForm: FormGroup = new FormGroup({});
  newItem:Item={};
  constructor(private fb: FormBuilder, private router:Router, private itemService:ItemService) {}

  get oneTimeItem() {
    return this.editForm.get('item')!;
  }
  get oneTimeStock() {
    return this.editForm.get('inStock')!;
  }
  get oneTimeFrequency() {
    return this.editForm.get('frequency')!;
  }
  get oneTimeStore() {
    return this.editForm.get('store')!;
  }

  get item() {return this.itemForm.get('item')!;}
  get inStock() {return this.itemForm.get('inStock')!;}
  get frequency() {return this.itemForm.get('frequency')!;}
  get store() {return this.itemForm.get('store')!};

  // OnInit //
  ngOnInit(): void {
    this.isAdding=false;
    this.allchip=true;
    this.ooschip=false;
    this.aldichip=false;
    this.jewelchip=false;
    this.peteschip=false;
    this.onlinechip=false;
    this.initialState.subscribe(item => {
      this.itemForm = this.fb.group({
        item: [item.item, [Validators.required]],
        frequency: [ item.frequency, [Validators.required] ],
        inStock: [ item.inStock, [] ],
        store: [item.store, [] ]
      })
    })
    this.initialState.subscribe(item => {
      this.editForm = this.fb.group({
        item: [item.item, [Validators.required]],
        frequency: [ item.frequency, [Validators.required] ],
        inStock: [ item.inStock, [] ],
        store: [item.store, [] ]
      })
    })
    this.itemForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
    this.editForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
    this.fetchItems();
  }

  // Edit Form  Functions //
  submitEdit(id:string | undefined){
    if (this.editForm.invalid) {
      this.displayEditError=true;
    } else {
    this.newItem = this.editForm.value;
    this.editItem(id, this.newItem);
    this.fetchItems();
    this.ngOnInit();
  }
  }

  // Add Item Form Functions //
  toggle():void{
    this.isAdding=!this.isAdding
  }
  submitForm() {
    if (this.itemForm.invalid) {
      this.displayError=true;
    } else {
    // this.formSubmitted.emit(this.itemForm.value)
        this.isAdding=false;
    this.allchip=true;
    this.ooschip=false;
    this.aldichip=false;
    this.jewelchip=false;
    this.peteschip=false;
    this.onlinechip=false;
    this.newItem = this.itemForm.value;
    this.addItem(this.newItem);

    this.fetchItems();
    this.ngOnInit();
  }
  }

  // Chip filters //
allchip:boolean=false;
allChip() {
  this.allchip=true;
  this.ooschip=false;
  this.aldichip=false;
  this.jewelchip=false;
  this.peteschip=false;
  this.onlinechip=false;
  this.fetchItems();
}
ooschip:boolean=false;
oosChip(){
  this.allchip=false;
  this.ooschip=true;
  this.aldichip=false;
  this.jewelchip=false;
  this.peteschip=false;
  this.onlinechip=false;
  this.filterStock();
}
aldichip:boolean=false;
aldiChip(){
  this.allchip=false;
  this.ooschip=false;
  this.aldichip=true;
  this.jewelchip=false;
  this.peteschip=false;
  this.onlinechip=false;
}
jewelchip:boolean=false;
jewelChip(){
  this.allchip=false;
  this.ooschip=false;
  this.aldichip=false;
  this.jewelchip=true;
  this.peteschip=false;
  this.onlinechip=false;
}
peteschip:boolean=false;
petesChip(){
  this.allchip=false;
  this.ooschip=false;
  this.aldichip=false;
  this.jewelchip=false;
  this.peteschip=true;
  this.onlinechip=false;
}
onlinechip:boolean=false;
onlineChip(){
  this.allchip=false;
  this.ooschip=false;
  this.aldichip=false;
  this.jewelchip=false;
  this.peteschip=false;
  this.onlinechip=true;
}

  // HTTP Requests //
  addItem(item:Item){
    this.itemService.createItem(item)
      .subscribe({
        error: (error) => {
          alert("Failed to create Item");
          console.error(error);
        }
      })
  }

  editItem(id:string | undefined, item:Item):void{
    this.itemService.updateItem(id, item).subscribe({
      next: () => this.fetchItems()
    })
  }

  deleteItem(id: string | undefined): void {
    this.itemService.deleteItem(id).subscribe({
      next: () => this.fetchItems(),
    });
  }

  filterStock():void{
    this.itemService.getOutOfStock();
  }

  private fetchItems(): void {
    this.items$ = this.itemService.getItems();
  }
}
