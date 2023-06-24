import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';


const materialModules = [
  MatSnackBarModule,
  MatMenuModule,
  MatDialogModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatRadioModule,
  MatStepperModule
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports: [...materialModules]
})
export class AngMaterialModule {

}
