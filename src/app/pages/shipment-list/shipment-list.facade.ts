import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MockedShipments } from 'src/app/core/models/mockedShipments';
import { Shipment } from '../../core/models/warehouse.model';

@Injectable({providedIn: 'root'})
export class ShipmentService {

  public mockedShipments$ = new BehaviorSubject<Shipment[]>(MockedShipments);

  constructor() {}

  createShipment(shipment: Shipment) {
    const currentShipments = this.mockedShipments$.getValue();
    console.log('tu v create', this.mockedShipments$.getValue());

    this.mockedShipments$.next([...currentShipments, shipment]);
  }
}
