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
    this.initialState.subscribe(item => {
      this.oneTimeForm = this.fb.group({
        oneTimeItem: [item.item, [Validators.required]],
        oneTimeFrequency: [ item.frequency]="One-Time Request",
        oneTimeStock: [ item.inStock, [] ],
        oneTimeStore: [item.store, [] ]
      })
    })
    this.oneTimeForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  
    this.addIndefinite = false;


  }

  toggleOne(): void {
    this.addOneTime = !this.addOneTime;
    
  }

  submitOne(): void {
    console.log('one-time item submitted!');
    this.newOneItem = this.oneTimeForm.value;
    this.addItem(this.newOneItem)
    console.log(this.newOneItem)
    // this.ngOnInit();
  }

  toggleMonth() {
    this.addMonthly = !this.addMonthly;
  }
  submitMonth() {
    console.log('Monthly item submitted!');
  }

  toggleWeek() {
    this.addWeekly = !this.addWeekly;
  }
  submitWeek() {
    console.log('Weekly item submitted!');
  }

  toggleIndef() {
    this.addIndefinite = !this.addIndefinite;
  }
  submitIndef() {
    console.log('Indefinitely item submitted!');
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
