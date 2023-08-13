import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IsoForm, SchemaElement } from 'projects/ngx-iso-form/src/public-api';
// import { IsoForm, SchemaElement } from 'ngx-iso-form';

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

    
    

  }
  ngOnInit(): void {
    const camt = './assets/camt.053.001.10.json';
    const sample = './assets/sample.json';
    const sampleLoad = './assets/sample.load.json';
    const camtLoad = './assets/camt.load.json';
    this.httpClient.get(camt).subscribe((data) => {
      this.schema = data as SchemaElement
    });
    this.httpClient.get(camtLoad).subscribe((data) => {      
      this.form = new IsoForm(data);
    });
  }
  getForm() {
    const data = this.form.getFormModel();    
    console.log(JSON.stringify(data));
  }

}
