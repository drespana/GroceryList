import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTableModule } from '@angular/material/table'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatBadgeModule } from '@angular/material/badge'
import { MatButtonModule } from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field';
import {DragDropModule} from '@angular/cdk/drag-drop'
import { MatMenuModule } from '@angular/material/menu'
import { MatChipsModule } from '@angular/material/chips'

import { AppComponent } from './app.component';
import { GroceriesListComponent } from './groceries-list/groceries-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllItemsComponent } from './all-items/all-items.component';
import { TaskBoardComponent } from './task-board/task-board.component';

@NgModule({
  declarations: [
    AppComponent,
    GroceriesListComponent,
    AllItemsComponent,
    TaskBoardComponent
  ],
  imports: [
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatGridListModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTableModule,
    MatSidenavModule,
    MatBadgeModule,
    MatButtonModule,
    DragDropModule,
    MatMenuModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
