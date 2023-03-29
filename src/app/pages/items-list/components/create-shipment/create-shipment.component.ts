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
import { ShipmentService } from 'src/app/pages/shipment-list/shipment-list.facade';
import { Shipment, ShipmentStatus } from 'src/app/core/models/warehouseItem';
import { SIDE_PANEL_DATA } from 'src/app/shared/services/side-panel/side-panel.service';
import { ItemsService } from '../../items-facade.service';

export interface LoginForm {
  companyName: FormControl<string>;
  scheduledTo: FormControl<Date>;
  status: FormControl<ShipmentStatus>;
}

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
    private shipmentService: ShipmentService,
    private itemsService: ItemsService,
    @Inject(SIDE_PANEL_DATA) public data: string
  ) {}

  ngOnInit() {
    console.log('tu', this.sidePanelRef);
  }

  save() {
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
        totalPrice: 2,
        id: 2,
        items: [1],
      };
      console.log(shipment);
      this.shipmentService.createShipment(shipment);
      this.itemsService.deleteCurrentShipment();
      this.close();
    }
  }

  close() {
    this.sidePanelRef.close();
  }
}
