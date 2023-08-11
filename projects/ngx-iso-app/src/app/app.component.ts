import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SchemaElement } from 'projects/ngx-iso-form/src/lib/Models/Schema';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('someInput') someInput!: TemplateRef<any>;
  title = 'ngx-iso-app';
  schemaElement: SchemaElement
  isoForm: FormGroup;
  /**
   *
   */
  constructor(private httpClient: HttpClient, translate: TranslateService,private fb: FormBuilder) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
   
    const camt = './assets/camt.053.001.10.json';
    const sample = './assets/sample.json'
    this.httpClient.get(camt).subscribe((data) => {
      this.schemaElement = data as SchemaElement;
    });

  }
  ngOnInit(): void {
    this.isoForm = this.fb.group({});
  }
  getForm(){
    this.isoForm = (this.someInput as any).getIsoForm;
    console.log(this.isoForm);
  }
}
