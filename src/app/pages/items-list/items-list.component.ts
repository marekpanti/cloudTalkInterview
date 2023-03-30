import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ItemInShipment, WarehouseItem } from '../../core/models/warehouse.model';
import { ItemsFacadeService } from './items-facade.service';
import { ShipmentItemsComponent } from './components/shipment-item/shipment-item.component';
import { SidePanelService } from 'src/app/shared/services/side-panel/side-panel.service';
import { CreateShipmentComponent } from '../../shared/components/create-shipment/create-shipment.component';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, ListItemComponent, ShipmentItemsComponent, OverlayModule, CreateShipmentComponent],
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsListComponent {
  public items$ = this.itemsService.mockedItems$;
  public inShipment$ = this.itemsService.inShipment$;

  // in theory we could have ItemsService declared as public, then we could acces the behavior subject directly in the template
  constructor(private itemsService: ItemsFacadeService, private panel: SidePanelService) {}

  addItemToShipment(item: WarehouseItem): void {
    this.itemsService.addToCurrentShipment(item);
  }

  removeShipment(ids: { tempId: string; id: number }) {
    this.itemsService.removeFromCurrentShipment(ids.tempId, ids.id);
  }

  createShipment(items: ItemInShipment[]) {
    this.panel.open(CreateShipmentComponent, { data: items });
  }
}
