import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ItemInShipment, WarehouseItem } from '../../core/models/warehouse.model';
import { ItemsService } from './items-facade.service';
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
})
export class ItemsListComponent {
  public items$ = this.itemsService.mockedItems$;
  public inShipment$ = this.itemsService.inShipment$;

  // in theory we could have ItemsService declared as public, then we could acces the behavior subject directly in the template
  constructor(
    private itemsService: ItemsService,
    private panel: SidePanelService,
    private cdRef: ChangeDetectorRef
  ) {
    this.items$.subscribe(d => (console.log('items: ', d)))
  }

  addItemToShipment(item: WarehouseItem): void {
    this.itemsService.addToCurrentShipment(item);
  }

  removeShipment(ids: {tempId: string, id: number}) {
    console.log(ids.tempId);
    this.itemsService.removeFromCurrentShipment(ids.tempId, ids.id);
    this.cdRef.detectChanges();
  }

  createShipment(items: ItemInShipment[]) {
    console.log(items);
    const filterRef = this.panel.open(CreateShipmentComponent, { data: items });
    filterRef.afterClosed().subscribe(() => {
      console.log('filter is closed');
    });
  }
}
