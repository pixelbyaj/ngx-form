import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SchemaElement } from 'projects/ngx-iso/src/lib/Models/ISchemaElement';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-iso-app';
  schemaElement: SchemaElement
  /**
   *
   */
  constructor(private httpClient: HttpClient, translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
    const camt = './assets/camt.053.001.10.json';
    const sample = './assets/sample.json'
    this.httpClient.get(sample).subscribe((data) => {
      this.schemaElement = data as SchemaElement;
    });

  }
}
