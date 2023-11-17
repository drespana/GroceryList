import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroceriesListComponent } from './groceries-list/groceries-list.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { AllItemsComponent } from './all-items/all-items.component';


const routes: Routes = [
  { path: '', redirectTo: 'groceries', pathMatch: 'full' },
  { path: 'all', component:AllItemsComponent},
  { path: 'groceries', component: GroceriesListComponent },
  { path: 'groceries/items/new', component:AddItemComponent},
  { path: 'groceries/items/edit/:id', component:EditItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
