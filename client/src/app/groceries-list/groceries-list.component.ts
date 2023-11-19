import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Item from '../Item';
import { ItemService } from '../item.service';
import { BehaviorSubject } from 'rxjs';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-groceries-list',
  templateUrl: './groceries-list.component.html',
  styleUrls: ['./groceries-list.component.css'],
})
export class GroceriesListComponent {
  @Input() initialState: BehaviorSubject<Item> = new BehaviorSubject({});

  @Output() formSubmitted = new EventEmitter<Item>();
  @Output() formValuesChanged = new EventEmitter<Item>();
  items$: Observable<Item[]> = new Observable();
  addOneTime: boolean = false;
  oneTimeForm: FormGroup = new FormGroup({});
  addMonthly: boolean = false;
  monthlyForm: FormGroup = new FormGroup({});
  addWeekly: boolean = false;
  weeklyForm: FormGroup = new FormGroup({});
  addIndefinite: boolean = false;
  indefForm: FormGroup = new FormGroup({});
  newOneItem:Item={};
  newMonthlyItem:Item={};
  newWeeklyItem:Item={};
  newIndefItem:Item={};
  constructor(private fb: FormBuilder, private itemService: ItemService) {}

  get oneTimeItem() {
    return this.oneTimeForm.get('item')!;
  }
  get oneTimeStock() {
    return this.oneTimeForm.get('inStock')!;
  }
  get oneTimeFrequency() {
    return this.oneTimeForm.get('frequency')!;
  }
  get oneTimeStore() {
    return this.oneTimeForm.get('store')!;
  }
  get monthlyItem() {
    return this.oneTimeForm.get('item')!;
  }
  get monthlyStock() {
    return this.oneTimeForm.get('inStock')!;
  }
  get monthlyFrequency() {
    return this.oneTimeForm.get('frequency')!;
  }
  get monthlyStore() {
    return this.oneTimeForm.get('store')!;
  }
  get weeklyItem() {
    return this.oneTimeForm.get('item')!;
  }
  get weeklyStock() {
    return this.oneTimeForm.get('inStock')!;
  }
  get weeklyFrequency() {
    return this.oneTimeForm.get('frequency')!;
  }
  get weeklyStore() {
    return this.oneTimeForm.get('store')!;
  }
  get indefItem() {
    return this.oneTimeForm.get('item')!;
  }
  get indefStock() {
    return this.oneTimeForm.get('inStock')!;
  }
  get indefFrequency() {
    return this.oneTimeForm.get('frequency')!;
  }
  get indefStore() {
    return this.oneTimeForm.get('store')!;
  }

  ngOnInit(): void {
    this.fetchItems();
    this.addOneTime = false;
    this.addMonthly = false;
    this.addWeekly = false;    
    this.addIndefinite = false;
    this.initialState.subscribe(item => {
      this.oneTimeForm = this.fb.group({
        item: [item.item, [Validators.required]],
        frequency: [ item.frequency]="One-Time Request",
        inStock: [ item.inStock, [] ],
        store: [item.store, [] ]
      })
    })
    this.initialState.subscribe(item => {
      this.monthlyForm = this.fb.group({
        item: [item.item, [Validators.required]],
        frequency: [ item.frequency]="Monthly",
        inStock: [ item.inStock, [] ],
        store: [item.store, [] ]
      })
    })
    this.initialState.subscribe(item => {
      this.weeklyForm = this.fb.group({
        item: [item.item, [Validators.required]],
        frequency: [ item.frequency]="Weekly",
        inStock: [ item.inStock, [] ],
        store: [item.store, [] ]
      })
    })
    this.initialState.subscribe(item => {
      this.indefForm = this.fb.group({
        item: [item.item, [Validators.required]],
        frequency: [ item.frequency]="Indefinite",
        inStock: [ item.inStock, [] ],
        store: [item.store, [] ]
      })
    })
    this.oneTimeForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
    this.monthlyForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
    this.weeklyForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
    this.indefForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  toggleOne(): void {
    this.addOneTime = !this.addOneTime;
    
  }

  submitOne(): void {
    this.formSubmitted.emit(this.oneTimeForm.value)
    this.newOneItem = this.oneTimeForm.value;
    this.addItem(this.newOneItem)
    this.fetchItems();
    this.ngOnInit();
  }

  toggleMonth() {
    this.addMonthly = !this.addMonthly;
  }
  submitMonth() {
    console.log('Monthly item submitted!');
    this.fetchItems();
    this.ngOnInit();
  }

  toggleWeek() {
    this.addWeekly = !this.addWeekly;
  }
  submitWeek() {
    console.log('Weekly item submitted!');
    this.fetchItems();
    this.ngOnInit();
  }

  toggleIndef() {
    this.addIndefinite = !this.addIndefinite;
  }
  submitIndef() {
    console.log('Indefinitely item submitted!');
    this.fetchItems();
    this.ngOnInit();
  }

  addItem(item: Item) {
    this.itemService.createItem(item).subscribe({
      error: (error) => {
        alert('Failed to create Item');
        console.error(error);
      },
    });
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
