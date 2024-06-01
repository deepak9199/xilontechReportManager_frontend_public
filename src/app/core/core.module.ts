import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
//angular materials
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
import { SafePipe } from '../shared/pipe/SafePipe';



@NgModule({
  declarations: [SafePipe],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ToastrModule,
    SafePipe
  ]
})
export class CoreModule { }
