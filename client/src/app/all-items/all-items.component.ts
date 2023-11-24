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
  isoos: boolean = false;
  isaldi: boolean = false;
  isjewel: boolean = false;
  ispetes: boolean = false;
  isonline: boolean = false;

  // hidden errors
  displayError: boolean = false;
  displayEditError: boolean = false;

  // forms
  itemForm: FormGroup = new FormGroup({});
  editForm: FormGroup = new FormGroup({});
  oosForm: FormGroup = new FormGroup({});
  aldiForm: FormGroup = new FormGroup({});
  jewelForm: FormGroup = new FormGroup({});
  petesForm: FormGroup = new FormGroup({});
  onlineForm: FormGroup = new FormGroup({});

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

  get oosItem() {
    return this.oosForm.get('item')!;
  }
  get oosStock() {
    return this.oosForm.get('inStock')!;
  }
  get oosFrequency() {
    return this.oosForm.get('frequency')!;
  }
  get oosStore() {
    return this.oosForm.get('store')!;
  }

  get aldiItem() {
    return this.aldiForm.get('item')!;
  }
  get aldiStock() {
    return this.aldiForm.get('inStock')!;
  }
  get aldiFrequency() {
    return this.aldiForm.get('frequency')!;
  }
  get aldiStore() {
    return this.aldiForm.get('store')!;
  }

  get jewelItem() {
    return this.jewelForm.get('item')!;
  }
  get jewelStock() {
    return this.jewelForm.get('inStock')!;
  }
  get jewelFrequency() {
    return this.jewelForm.get('frequency')!;
  }
  get jewelStore() {
    return this.jewelForm.get('store')!;
  }

  get petesItem() {
    return this.petesForm.get('item')!;
  }
  get petesStock() {
    return this.petesForm.get('inStock')!;
  }
  get petesFrequency() {
    return this.petesForm.get('frequency')!;
  }
  get petesStore() {
    return this.petesForm.get('store')!;
  }

  get onlineItem() {
    return this.onlineForm.get('item')!;
  }
  get onlineStock() {
    return this.onlineForm.get('inStock')!;
  }
  get onlineFrequency() {
    return this.onlineForm.get('frequency')!;
  }
  get onlineStore() {
    return this.onlineForm.get('store')!;
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
    this.initialState.subscribe((item) => {
      this.oosForm = this.fb.group({
        item: [item.item, [Validators.required]],
        frequency: [item.frequency, [Validators.required]],
        inStock: [(item.inStock = 0)],
        store: [item.store, []],
      });
    });
    this.initialState.subscribe((item) => {
      this.aldiForm = this.fb.group({
        item: [item.item, [Validators.required]],
        frequency: [item.frequency, [Validators.required]],
        inStock: [item.inStock, []],
        store: [(item.store = 'Aldi')],
      });
    });
    this.initialState.subscribe((item) => {
      this.jewelForm = this.fb.group({
        item: [item.item, [Validators.required]],
        frequency: [item.frequency, [Validators.required]],
        inStock: [item.inStock, []],
        store: [item.store="Jewel Osco"],
      });
    });
    this.initialState.subscribe((item) => {
      this.petesForm = this.fb.group({
        item: [item.item, [Validators.required]],
        frequency: [item.frequency, [Validators.required]],
        inStock: [item.inStock, []],
        store: [item.store="Petes"],
      });
    });
    this.initialState.subscribe((item) => {
      this.onlineForm = this.fb.group({
        item: [item.item, [Validators.required]],
        frequency: [item.frequency, [Validators.required]],
        inStock: [item.inStock, []],
        store: [item.store="Online"],
      });
    });

    this.itemForm.valueChanges.subscribe((val) => {
      this.formValuesChanged.emit(val);
    });
    this.editForm.valueChanges.subscribe((val) => {
      this.formValuesChanged.emit(val);
    });
    this.oosForm.valueChanges.subscribe((val) => {
      this.formValuesChanged.emit(val);
    });
    this.aldiForm.valueChanges.subscribe((val) => {
      this.formValuesChanged.emit(val);
    });
    this.jewelForm.valueChanges.subscribe((val) => {
      this.formValuesChanged.emit(val);
    });
    this.petesForm.valueChanges.subscribe((val) => {
      this.formValuesChanged.emit(val);
    });
    this.onlineForm.valueChanges.subscribe((val) => {
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
      this.fetchItems();
      this.ngOnInit();
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
      this.fetchItems();
      this.ngOnInit();
    }
  }
  oosSubmit() {
    if (this.oosForm.invalid) {
      this.displayError = true;
    } else {
      // this.formSubmitted.emit(this.itemForm.value)
      this.newItem = this.oosForm.value;
      this.addItem(this.newItem);
      this.ngOnInit();
      this.filterStock();
      this.filterStock();
    }
  }
  aldiSubmit() {
    if (this.aldiForm.invalid) {
      this.displayError = true;
    } else {
      // this.formSubmitted.emit(this.itemForm.value)
      this.newItem = this.aldiForm.value;
      this.addItem(this.newItem);
      this.ngOnInit();
      this.filterAldi();
      this.filterAldi();
    }
  }
  petesSubmit() {
    if (this.petesForm.invalid) {
      this.displayError = true;
    } else {
      // this.formSubmitted.emit(this.itemForm.value)
      this.newItem = this.petesForm.value;
      this.addItem(this.newItem);
      this.ngOnInit();
      this.filterPetes();
      this.filterPetes();
    }
  }
  jewelSubmit() {
    if (this.jewelForm.invalid) {
      this.displayError = true;
    } else {
      // this.formSubmitted.emit(this.itemForm.value)
      this.newItem = this.jewelForm.value;
      this.addItem(this.newItem);
      this.ngOnInit();
      this.filterJewel();
      this.filterJewel();
    }
  }
  onlineSubmit() {
    if (this.onlineForm.invalid) {
      this.displayError = true;
    } else {
      // this.formSubmitted.emit(this.itemForm.value)
      this.newItem = this.onlineForm.value;
      this.addItem(this.newItem);
      this.ngOnInit();
      this.filterOnline();
      this.filterOnline();
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
    this.isAdding = false;
    this.allchip = false;
    this.ooschip = !this.ooschip;
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
    // this.ngOnInit();
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

  deleteAldi(id: string | undefined): void {
    this.itemService.deleteItem(id).subscribe({
      next: () => this.filterAldi(),
    });
  }

  deleteOos(id: string | undefined): void {
    this.itemService.deleteItem(id).subscribe({
      next: () => this.filterStock(),
    });
  }

  deleteOnline(id: string | undefined): void {
    this.itemService.deleteItem(id).subscribe({
      next: () => this.filterOnline(),
    });
  }

  deletePetes(id: string | undefined): void {
    this.itemService.deleteItem(id).subscribe({
      next: () => this.filterPetes(),
    });
  }

  deleteJewel(id: string | undefined): void {
    this.itemService.deleteItem(id).subscribe({
      next: () => this.filterJewel(),
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
