import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDynamicComponent } from './ngx-dynamic.component';

describe('DynamicComponent', () => {
  let component: NgxDynamicComponent;
  let fixture: ComponentFixture<NgxDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxDynamicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
