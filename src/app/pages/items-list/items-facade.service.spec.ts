import { TestBed } from '@angular/core/testing';

import { ItemsFacadeService } from './items-facade.service';

describe('ItemsMockService', () => {
  let service: ItemsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test addToCurrentShipment and checked if the length of the shipments is greater

  // Test removeCurrentSHipment check if the length of the shippments is decreased

  // Test changeItemQuantity add one and remove one

  // Delete shipment should return 0 currentSHipment
});
