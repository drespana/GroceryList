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

  // hidden
  isAdding: boolean = false;
  isEditing: boolean = false;

  // hidden errors
  displayError: boolean = false;
  displayEditError: boolean = false;

  // forms
  itemForm: FormGroup = new FormGroup({});
  editForm: FormGroup = new FormGroup({});

  // create
  newItem: Item = {};
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private itemService: ItemService
  ) {}

  get editedItem() {
    return this.editForm.get('item')!;
  }
  get editedStock() {
    return this.editForm.get('inStock')!;
  }
  get editedFrequency() {
    return this.editForm.get('frequency')!;
  }
  get editedStore() {
    return this.editForm.get('store')!;
  }

  get item() {
    return this.itemForm.get('item')!;
  }
  get inStock() {
    return this.itemForm.get('inStock')!;
  }
  get frequency() {
    return this.itemForm.get('frequency')!;
  }
  get store() {
    return this.itemForm.get('store')!;
  }


  // OnInit //
  ngOnInit(): void {
    this.isAdding = false;
    this.allchip = true;
    this.ooschip = false;
    this.aldichip = false;
    this.jewelchip = false;
    this.peteschip = false;
    this.onlinechip = false;
    this.initialState.subscribe((item) => {
      this.itemForm = this.fb.group({
        item: [item.item, [Validators.required]],
        frequency: [item.frequency, [Validators.required]],
        inStock: [item.inStock, []],
        store: [item.store, []],
      });
    });
    this.initialState.subscribe((item) => {
      this.editForm = this.fb.group({
        item: [item.item, [Validators.required]],
        frequency: [item.frequency, [Validators.required]],
        inStock: [item.inStock, []],
        store: [item.store, []],
      });
    });


    this.itemForm.valueChanges.subscribe((val) => {
      this.formValuesChanged.emit(val);
    });
    this.editForm.valueChanges.subscribe((val) => {
      this.formValuesChanged.emit(val);
    });

    this.fetchItems();
  }

  // Edit Form  Functions //
  submitEdit(id: string | undefined) {
    if (this.editForm.invalid) {
      this.displayEditError = true;
    } else {
      this.newItem = this.editForm.value;
      this.editItem(id, this.newItem);
      this.ngOnInit();
      this.fetchItems();
    }
  }

  // Add Item Form Functions //
  toggle(): void {
    this.isAdding = !this.isAdding;
  }
  submitForm() {
    if (this.itemForm.invalid) {
      this.displayError = true;
    } else {
      // this.formSubmitted.emit(this.itemForm.value)
      this.newItem = this.itemForm.value;
      this.addItem(this.newItem);
      this.ngOnInit();
      this.fetchItems();
    }
  }

  // Chip filters //
  allchip: boolean = true;
  allChip() {
    this.isAdding = false;
    this.allchip = !this.allchip;
    this.ooschip = false;
    this.aldichip = false;
    this.jewelchip = false;
    this.peteschip = false;
    this.onlinechip = false;
    this.ngOnInit();
    this.fetchItems();
  }
  ooschip: boolean = false;
  oosChip() {
    this.ooschip = !this.ooschip;
    this.isAdding = false;
    this.allchip = false;
    this.aldichip = false;
    this.jewelchip = false;
    this.peteschip = false;
    this.onlinechip = false;
    this.ngOnInit();
    this.filterStock();

  }
  aldichip: boolean = false;
  aldiChip() {
    this.isAdding = false;
    this.allchip = false;
    this.ooschip = false;
    this.aldichip = !this.aldichip;
    this.jewelchip = false;
    this.peteschip = false;
    this.onlinechip = false;
    this.ngOnInit();
    this.filterAldi();
  }
  jewelchip: boolean = false;
  jewelChip() {
    this.isAdding = false;
    this.allchip = false;
    this.ooschip = false;
    this.aldichip = false;
    this.jewelchip = !this.jewelchip;
    this.peteschip = false;
    this.onlinechip = false;
    this.ngOnInit();
    this.filterJewel();
  }
  peteschip: boolean = false;
  petesChip() {
    this.isAdding = false;
    this.allchip = false;
    this.ooschip = false;
    this.aldichip = false;
    this.jewelchip = false;
    this.peteschip = !this.peteschip;
    this.onlinechip = false;
    this.ngOnInit();
    this.filterPetes();
  }
  onlinechip: boolean = false;
  onlineChip() {
    this.isAdding = false;
    this.allchip = false;
    this.ooschip = false;
    this.aldichip = false;
    this.jewelchip = false;
    this.peteschip = false;
    this.onlinechip = !this.onlinechip;
    this.ngOnInit();
    this.filterOnline();
  }

  // HTTP Requests //
  addItem(item: Item) {
    this.itemService.createItem(item).subscribe({
      error: (error) => {
        alert('Failed to create Item');
        console.error(error);
      },
    });
  }

  editItem(id: string | undefined, item: Item): void {
    this.itemService.updateItem(id, item).subscribe({
      next: () => this.fetchItems(),
    });
  }

  deleteItem(id: string | undefined): void {
    this.itemService.deleteItem(id).subscribe({
      next: () => this.fetchItems(),
    });
  }


  filterStock(): void {
    this.itemService.getOutOfStock();
  }

  filterAldi(): void {
    this.itemService.getAldi();
  }

  filterJewel(): void {
    this.itemService.getJewel();
  }

  filterPetes(): void {
    this.itemService.getPetes();
  }

  filterOnline(): void {
    this.itemService.getOnline();
  }

  filterAll() {
    this.items$ = this.itemService.getItems();
  }

  private fetchItems(): void {
    this.items$ = this.itemService.getItems();
  }
}
