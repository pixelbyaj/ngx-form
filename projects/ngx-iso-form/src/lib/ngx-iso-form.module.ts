import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
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
  IsoMatDateTime,
  IsoMatTextarea,
  IsoMatSelect
} from './components';

import { NgxIsoFormComponent } from './ngx-iso-form.component';

import { ComponentDirective } from './shared/directives/component-content.directive';
import { NgxDynamicComponent } from './shared/components/dynamic/ngx-dynamic.component';
import { IsoTranslatePipe } from './shared/pipe/translate.pipe';
import { IsoErrorPipe } from './shared/pipe/error.pipe';
import { ControlService } from './shared/services';


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
    IsoMatDateTime,
    IsoMatSelect,
    ComponentDirective,
    IsoTranslatePipe,
    IsoErrorPipe
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
    ControlService
  ],
  exports: [
    NgxIsoFormComponent
  ]
})
export class NgxIsoFormModule { }
