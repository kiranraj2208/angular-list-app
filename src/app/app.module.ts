import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent, DialogContentExampleDialog } from './table/table.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { DialogDeleteDialog } from './table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    DialogContentExampleDialog,
    DialogContentComponent,
    DialogDeleteDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule, 
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogContentExampleDialog,
    DialogDeleteDialog
  ]
})
export class AppModule { }
