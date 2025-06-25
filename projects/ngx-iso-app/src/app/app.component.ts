import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IsoForm, SchemaElement } from 'projects/ngx-iso-form/src/public-api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  @ViewChild('someInput') someInput!: TemplateRef<any>;
  title = 'ngx-iso-app';
  form: IsoForm;
  schema: SchemaElement;
  selectedSchema: string;
  jsonSchema = {
    camt: [
      { id: 'camt.052.001.11', activated: false },
      { id: 'camt.053.001.10', activated: false },
      { id: 'camt.054.001.11', activated: false }],
    pacs: [
      { id: 'pacs.002.001.12', activated: false },
      { id: 'pacs.002.001.13', activated: false },
      { id: 'pacs.004.001.12', activated: false },
      { id: 'pacs.008.001.11', activated: false },
      { id: 'pacs.009.001.10', activated: false }
    ],
    pain: [
      { id: 'pain.001.001.12', activated: false },
      { id: 'pain.002.001.13', activated: false },
      { id: 'pain.007.001.11', activated: false },
      { id: 'pain.008.001.10', activated: false },
      { id: 'pain.009.001.07', activated: false }
    ]
  }
  /**
   *
   */
  constructor(private httpClient: HttpClient, translate: TranslateService, private route: ActivatedRoute) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['json']) {
        this.selectedSchema = params['json'];
        const jsonURL = `./assets/iso20022/${params['json']}.json`;
        this.httpClient.get(jsonURL).subscribe((data) => {
          this.schema = data as SchemaElement
          this.form = new IsoForm(null);
        });
      }
    });
  }
  onFileChange($event: any) {
    const files = $event.target.files;
    if (files && files.length) {
      const file = $event.target.files.item(0);
      const formData = new FormData();
      const fileToUpload = file as File;
      formData.append('File', fileToUpload, fileToUpload.name);
      this.httpClient.post('https://www.pixelbyaj.com/api/XsdToJson', formData).subscribe((data: any) => {
        this.schema = data.schemaElement as SchemaElement;
        this.selectedSchema = fileToUpload.name;
        this.form = new IsoForm(null);
      });
    }
  }
  getForm() {
    const data = this.form.getFormModel();
    console.log(JSON.stringify(data));
  }

}
