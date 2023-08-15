import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxXmlMessageComponent } from './ngx-xml-message.component';

describe('NgxXmlMessageComponent', () => {
  let component: NgxXmlMessageComponent;
  let fixture: ComponentFixture<NgxXmlMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxXmlMessageComponent]
    });
    fixture = TestBed.createComponent(NgxXmlMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
