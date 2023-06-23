import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { TreeSelectModule } from 'primeng/treeselect';
import { TooltipModule } from 'primeng/tooltip';
import { FocusTrapModule } from 'primeng/focustrap';
import { FileUploadModule } from 'primeng/fileupload';
import { AccordionModule } from 'primeng/accordion';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ImageModule } from 'primeng/image';
import { TabViewModule } from 'primeng/tabview';

const primeNgModules = [
  DynamicDialogModule,
  ConfirmDialogModule,
  MultiSelectModule,
  ColorPickerModule,
  InputSwitchModule,
  RadioButtonModule,
  InputNumberModule,
  TreeSelectModule,
  FileUploadModule,
  InputMaskModule,
  InputTextModule,
  PaginatorModule,
  AccordionModule,
  FocusTrapModule,
  CheckboxModule,
  PasswordModule,
  CalendarModule,
  DropdownModule,
  SkeletonModule,
  TooltipModule,
  DividerModule,
  TabViewModule,
  ButtonModule,
  DialogModule,
  ToastModule,
  TableModule,
  ImageModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...primeNgModules
  ],
  exports: [
    ...primeNgModules
  ]
})
export class PrimeNgModule { }
