import { TestBed } from '@angular/core/testing';

import { ArrowStyleConfigurationService } from './arrow-style-configuration.service';

describe('ArrowStyleConfigurationService', () => {
  let service: ArrowStyleConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrowStyleConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
