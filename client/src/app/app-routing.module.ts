import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroceriesListComponent } from './groceries-list/groceries-list.component';
import { AllItemsComponent } from './all-items/all-items.component';


const routes: Routes = [
  { path: '', redirectTo: 'groceries', pathMatch: 'full' },
  { path: 'all', component:AllItemsComponent},
  { path: 'groceries', component: GroceriesListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
