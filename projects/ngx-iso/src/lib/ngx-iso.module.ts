import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { BrowserModule } from '@angular/platform-browser';

import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {  MatSelectModule } from '@angular/material/select';

import { NgxIsoFormComponent, ControlService } from '../public-api';
import { NgxIsoPanelComponent } from './components/iso-panel/iso.panel.component';
import { NgxIsoControlComponent } from './components/iso-control/iso-control.component';
import { ComponentDirective } from './shared/directives/component-content.directive';
import { NgxDynamicComponent } from './shared/components/dynamic/ngx-dynamic.component';
import { IsoBaseControlComponent } from './components/controls/iso-base-control.component';
import { IsoMatInput } from './components/controls/iso-mat-input.component';
import { IsoMatTextarea } from './components/controls/iso-mat-textarea.component';
import { IsoMatDateTime } from './components/controls/iso-mat-datetime.component';
import { IsoTranslatePipe } from './shared/pipe/translate.pipe';
import { NgxIsoChoiceComponent } from './components/iso-choice/iso-choice.component';



// // AoT requires an exported function for factories
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }

@NgModule({
  declarations: [
    NgxIsoFormComponent,
    NgxIsoPanelComponent,
    NgxIsoControlComponent,
    NgxDynamicComponent,
    IsoBaseControlComponent,
    IsoMatInput,
    IsoMatTextarea,
    IsoMatDateTime,
    NgxIsoChoiceComponent,
    ComponentDirective,
    IsoTranslatePipe
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
    NgxIsoFormComponent,
    NgxIsoPanelComponent
  ]
})
export class NgxIsoFormModule { }
