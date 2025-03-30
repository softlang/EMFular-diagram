import { TestBed } from '@angular/core/testing';

import { ArrowsService } from './arrows.service';

describe('ArrowsService', () => {
  let service: ArrowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
