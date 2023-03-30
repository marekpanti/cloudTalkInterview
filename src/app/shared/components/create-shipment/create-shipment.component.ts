import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay } from '@angular/cdk/overlay';
import { SidePanelRef } from 'src/app/shared/services/side-panel/side-panel-ref';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ShipmentFacadeService } from 'src/app/pages/shipment-list/shipment-list.facade';
import {
  ItemInShipment,
  LoginForm,
  Shipment,
  ShipmentStatus,
} from 'src/app/core/models/warehouse.model';
import { SIDE_PANEL_DATA } from 'src/app/shared/services/side-panel/side-panel.service';
import { ItemsFacadeService } from '../../../pages/items-list/items-facade.service';

@Component({
  selector: 'app-create-shipment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-shipment.component.html',
  styleUrls: ['./create-shipment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Overlay],
})
export class CreateShipmentComponent {
  shipmentStatuses = ShipmentStatus;
  shipmentForm = new FormGroup<LoginForm>({
    companyName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    scheduledTo: new FormControl(new Date(), {
      nonNullable: true,
      validators: [Validators.required],
    }),
    status: new FormControl(ShipmentStatus.CREATED, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    private sidePanelRef: SidePanelRef,
    private shipmentService: ShipmentFacadeService,
    private itemsService: ItemsFacadeService,
    // this should be typed, a general interface should be crated with isEditing: boolean, itemInShipment and shipment
    @Inject(SIDE_PANEL_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data.isEditing) {
      this.shipmentForm.setValue({
        companyName: this.data.shipment.companyName,
        scheduledTo: new Date(this.data.shipment.scheduledTo),
        status: this.data.shipment.status,
      });
    }
  }

  save() {
    const lazyToDoRealUUID =
      this.shipmentService.mockedShipments$.getValue().length + 1;
    if (
      this.shipmentForm.value.companyName &&
      this.shipmentForm.value.scheduledTo &&
      this.shipmentForm.value.status
    ) {
      const shipment: Shipment = {
        companyName: this.shipmentForm.value.companyName,
        status: this.shipmentForm.value.status,
        scheduledTo: this.shipmentForm.value.scheduledTo,
        createdAt: new Date(),
        lastUpdate: new Date(),
        totalPrice: 2, // a service from facade should calculate the price from the items store based on saved items ids
        id: lazyToDoRealUUID,
        items: this.data.map((item: ItemInShipment) => item.id),
      };
      this.shipmentService.createShipment(shipment);
      this.itemsService.deleteCurrentShipment();
      this.close();
    }
  }

  edit() {
    if (
      this.shipmentForm.value.companyName &&
      this.shipmentForm.value.scheduledTo &&
      this.shipmentForm.value.status
    ) {
      const shipment: Shipment = {
        ...this.data.shipment,
        companyName: this.shipmentForm.value.companyName,
        status: this.shipmentForm.value.status,
        scheduledTo: this.shipmentForm.value.scheduledTo,
        lastUpdate: new Date(),
      };
      this.shipmentService.editShipment(shipment);
      this.close();
    }
  }

  close() {
    this.sidePanelRef.close();
  }
}
