import { TestBed } from '@angular/core/testing';

import { NgxRangesliderService } from './ngx-rangeslider.service';

describe('NgxRangesliderService', () => {
  let service: NgxRangesliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxRangesliderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
