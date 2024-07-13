import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

import { TranslateModule } from '@ngx-translate/core';

import {
  NgxIsoControlComponent,
  IsoBaseControlComponent,
  IsoMatInput,
  IsoMatDate,
  IsoMatTextarea,
  IsoMatSelect,
  IsoMatCheckbox,
  IsoMatDateTime,
  IsoMatCurrency,
} from './components';

import { NgxIsoFormComponent } from './ngx-iso-form.component';

import { ComponentDirective } from './shared/directives/component-content.directive';
import { NgxDynamicComponent } from './shared/components/dynamic/ngx-dynamic.component';
import { IsoTranslatePipe } from './shared/pipe/translate.pipe';
import { IsoErrorPipe } from './shared/pipe/error.pipe';
import { IsoGeneralPipe } from './shared/pipe/general.pipe';
import { ControlService } from './shared/services';
import { CUSTOM_DATE_FORMATS, CustomDateAdapter } from './shared/services/custom-date-adapter';


// // AoT requires an exported function for factories
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }

@NgModule({
  declarations: [
    NgxIsoFormComponent,
    NgxIsoControlComponent,
    NgxDynamicComponent,
    IsoBaseControlComponent,
    IsoMatInput,
    IsoMatTextarea,
    IsoMatDate,
    IsoMatDateTime,
    IsoMatSelect,
    IsoMatCheckbox,
    IsoMatCurrency,
    ComponentDirective,
    IsoTranslatePipe,
    IsoErrorPipe,
    IsoGeneralPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ],
  exports: [
    NgxIsoFormComponent
  ]
})
export class NgxIsoFormModule { }
