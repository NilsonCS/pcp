import { TestBed } from '@angular/core/testing';

import { ServiceCheckoutService } from './service-checkout.service';

describe('ServiceCheckoutService', () => {
  let service: ServiceCheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCheckoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
