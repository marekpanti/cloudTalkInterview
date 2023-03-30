import { TestBed } from '@angular/core/testing';

import { ItemsService } from './items-facade.service';

describe('ItemsMockService', () => {
  let service: ItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test addToCurrentShipment and checked if the length of the shipments is greater

  // Test removeCurrentSHipment check if the length of the shippments is decreased

  // Test changeItemQuantity add one and remove one
});
