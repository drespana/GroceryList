import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import Item from '../Item';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent {
  @Input() initialState: BehaviorSubject<Item> = new BehaviorSubject({});
  
  @Output() formSubmitted = new EventEmitter<Item>();
  @Output() formValuesChanged = new EventEmitter<Item>();
  itemForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  get item() {return this.itemForm.get('item')!;}
  get inStock() {return this.itemForm.get('inStock')!;}
  get store() {return this.itemForm.get('store')!};

  ngOnInit() {
    this.initialState.subscribe(item => {
      this.itemForm = this.fb.group({
        item: [item.item, [Validators.required]],
        inStock: [ item.inStock, [Validators.required]],
        store: [item.store, [Validators.required]]
      })
    })
    this.itemForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.itemForm.value)
  }

}
