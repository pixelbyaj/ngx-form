import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { XmlMessageConfig } from 'projects/ngx-xml-message/src/public-api';

@Component({
  selector: 'app-readonly',
  templateUrl: './readonly.component.html',
  styleUrls: [
    './readonly.component.scss'
  ]
})
export class ReadonlyComponent implements OnInit {
  title = 'ngx-iso-app';
  message: string;
  xmlMessage: string;
  config: XmlMessageConfig = {
    showCopy: true,
    showNamespace:true
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
    const xmlPath = `./assets/xml/camt.053.xml`;
    this.httpClient.get(xmlPath, { responseType: 'text' }).subscribe((data) => {
      this.message = data as string;
      this.loadMessage();
    });
  }

  loadMessage(): void {
    this.xmlMessage = this.message;
  }

}
