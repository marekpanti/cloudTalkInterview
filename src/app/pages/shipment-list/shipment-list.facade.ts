import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MockedShipments } from 'src/app/core/models/mockedShipments';
import { Shipment, ShipmentStatus } from '../../core/models/warehouse.model';
import { ItemsService } from '../items-list/items-facade.service';

@Injectable({ providedIn: 'root' })
export class ShipmentService {
  public mockedShipments$ = new BehaviorSubject<Shipment[]>(MockedShipments);

  constructor(private itemService: ItemsService) {}

  createShipment(shipment: Shipment) {
    const currentShipments = this.mockedShipments$.getValue();
    this.mockedShipments$.next([...currentShipments, shipment]);
  }

  changeStatus(shipmentId: number) {
    const currentShipments = this.mockedShipments$.getValue();
    const index = currentShipments.findIndex(
      (shipment) => shipment.id === shipmentId
    );
    currentShipments[index].status = ShipmentStatus.SHIPPED;
    this.mockedShipments$.next([...currentShipments]);
  }

  editShipment(shipment: Shipment) {
    const currentShipments = this.mockedShipments$.getValue();
    const index = currentShipments.findIndex(
      (currentShipment) => currentShipment.id === shipment.id
    );
    currentShipments[index] = shipment;
    this.mockedShipments$.next([...currentShipments]);
  }

  removeShipment(shipmentId: number) {
    // remove shipment
    // add items back to stock, change their quantity based on itemIds
    const hashItemsIdQuantity: { [itemId: number]: number } = {};
    const currentShipment = this.mockedShipments$
      .getValue()
      .find((shipment) => shipment.id === shipmentId);
      currentShipment?.items.forEach((item) => {
      if (!hashItemsIdQuantity[item]) {
        hashItemsIdQuantity[item] = 1;
      } else {
        hashItemsIdQuantity[item] += 1;
      }
    });
    this.itemService.setItemQuantityAfterShipmentDeletion(hashItemsIdQuantity);

    const removedCurrentShipment = this.mockedShipments$.getValue().filter(shipment => shipment.id !== shipmentId);
    this.mockedShipments$.next([...removedCurrentShipment]);
  }
}
