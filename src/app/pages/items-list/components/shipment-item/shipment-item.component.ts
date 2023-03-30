import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemInShipment } from '../../../../core/models/warehouse.model';

@Component({
  selector: 'app-shipment-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shipment-item.component.html',
  styleUrls: ['./shipment-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipmentItemsComponent {
  @Input() items: ItemInShipment[];
  @Output() remove: EventEmitter<{ tempId: string; id: number }> = new EventEmitter<{ tempId: string; id: number }>();
  @Output() createShipment: EventEmitter<ItemInShipment[]> = new EventEmitter<ItemInShipment[]>();

  constructor() {}

  removeItem(item: ItemInShipment) {
    this.remove.emit({ tempId: item.tempId, id: item.id });
  }

  addItemsToShipment() {
    this.createShipment.emit(this.items);
  }
}
