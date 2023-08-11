import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IsoForm, SchemaElement } from 'projects/ngx-iso-form/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('someInput') someInput!: TemplateRef<any>;
  title = 'ngx-iso-app';
  form: IsoForm;
  schema: SchemaElement;
  /**
   *
   */
  constructor(private httpClient: HttpClient, translate: TranslateService, private fb: FormBuilder) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');

    const camt = './assets/camt.053.001.10.json';
    const sample = './assets/sample.json'
    const sampleLoad = './assets/sample.load.json'
    this.httpClient.get(sample).subscribe((data) => {
      this.schema = data as SchemaElement
    });
    this.httpClient.get(sampleLoad).subscribe((model) => {
      this.form = {
        model: model,
        getFormModel: (data: any) => {
          debugger
        }
      }

    });

  }
  ngOnInit(): void {
  }
  getForm() {
    this.form.getFormModel();
    const data = (this.someInput as any).ngModel;
    console.log(JSON.stringify(data));
  }

}
