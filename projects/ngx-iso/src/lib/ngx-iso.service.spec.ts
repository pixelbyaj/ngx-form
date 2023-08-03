import { TestBed } from '@angular/core/testing';

import { NgxIsoService } from './ngx-iso.service';

describe('NgxIsoService', () => {
  let service: NgxIsoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxIsoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
