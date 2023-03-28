import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './components/list-item/list-item.component';
import { WarehouseItem } from '../../core/models/warehouseItem';
import { ItemsMockService } from './items-facade.service';
import { ShipmentItemsComponent } from './components/shipment-item/shipment-item.component';
import { SidePanelService } from 'src/app/shared/services/side-panel/side-panel.service';
import { CreateShipmentComponent } from './components/create-shipment/create-shipment.component';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, ListItemComponent, ShipmentItemsComponent, OverlayModule, CreateShipmentComponent],
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ItemsMockService],
})
export class ItemsListComponent {
  public items$ = this.itemsMockService.mockedItems$;
  public inShipment$ = this.itemsMockService.inShipment$;

  // in theory we could have ItemsMockService declared as public, then we could acces the behavior subject directly in the template
  constructor(
    private itemsMockService: ItemsMockService,
    private panel: SidePanelService
  ) {}

  addItemToShipment(item: WarehouseItem): void {
    this.itemsMockService.addToCurrentShipment(item);
  }

  removeShipment(tempId: string) {
    console.log(tempId);
    this.itemsMockService.removeFromCurrentShipment(tempId);
  }

  createShipment() {
    const filterRef = this.panel.open(CreateShipmentComponent, { data: null });
    filterRef.afterClosed().subscribe(() => {
      console.log('filter is closed');
    });
  }
}
