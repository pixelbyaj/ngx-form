import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxIsoFormComponent } from './ngx-iso-form.component';

describe('NgxIsoComponent', () => {
  let component: NgxIsoFormComponent;
  let fixture: ComponentFixture<NgxIsoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxIsoFormComponent]
    });
    fixture = TestBed.createComponent(NgxIsoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
