import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxIsoComponent } from './ngx-iso-form.component';

describe('NgxIsoComponent', () => {
  let component: NgxIsoComponent;
  let fixture: ComponentFixture<NgxIsoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxIsoComponent]
    });
    fixture = TestBed.createComponent(NgxIsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
