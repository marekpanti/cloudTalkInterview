import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentService } from './shipment-list.facade';

@Component({
  selector: 'app-shipment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.scss'],
})
export class ShipmentListComponent {
  public shipments$ = this.shipmentService.mockedShipments$;

  // in theory we could have ItemsMockService declared as public, then we could acces the behavior subject directly in the template
  constructor(
    private shipmentService: ShipmentService,
  ) {}

}
