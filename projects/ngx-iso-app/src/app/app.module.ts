import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxIsoFormModule } from 'projects/ngx-iso-form/src/public-api';
import { AngularSplitModule } from 'angular-split';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
//import { NgxIsoFormModule } from 'ngx-iso-form';
import { ReadonlyComponent } from './readonly.component';
import { IsoComponent } from './component/iso.component';
import { NgxXmlMessageModule } from 'ngx-xml-message';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
//import { NgxXmlMessageModule } from 'projects/ngx-xml-message/src/public-api';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    IsoComponent,
    ReadonlyComponent
  ],
  imports: [
    BrowserModule,
    NgxIsoFormModule,
    NgxXmlMessageModule,
    HttpClientModule,
    AngularSplitModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forRoot([
      { path: 'xsd/:json', component: AppComponent, pathMatch: 'full' },
      { path: '', component: ReadonlyComponent, pathMatch: 'full' },
      { path: '**', component: AppComponent }
    ], { useHash: true }),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
