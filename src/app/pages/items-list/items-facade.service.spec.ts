import { TestBed } from '@angular/core/testing';

import { ItemsMockService } from './items-facade.service';

describe('ItemsMockService', () => {
  let service: ItemsMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test addToCurrentShipment and checked if the length of the shipments is greater

  // Test removeCurrentSHipment check if the length of the shippments is decreased
});
