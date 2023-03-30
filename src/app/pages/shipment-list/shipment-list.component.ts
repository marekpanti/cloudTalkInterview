import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentService } from './shipment-list.facade';
import { Shipment } from 'src/app/core/models/warehouse.model';
import { CreateShipmentComponent } from 'src/app/shared/components/create-shipment/create-shipment.component';
import { SidePanelService } from 'src/app/shared/services/side-panel/side-panel.service';

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
    private panel: SidePanelService
  ) {}

  changeStatus(id: number) {
    this.shipmentService.changeStatus(id);
  }

  editShipment(shipment: Shipment) {
    this.panel.open(CreateShipmentComponent, {
      data: { isEditing: true, shipment },
    });
  }

  removeShipment(id: number) {
    this.shipmentService.removeShipment(id);
  }
}
