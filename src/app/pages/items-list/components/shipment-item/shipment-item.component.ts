import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemInShipment } from '../../../../core/models/warehouseItem';

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
  @Output() remove: EventEmitter<{tempId: string, id: number}> = new EventEmitter<{tempId: string, id: number}>();
  @Output() createShipment: EventEmitter<ItemInShipment[]> = new EventEmitter<ItemInShipment[]>();

  constructor(private cdRef: ChangeDetectorRef) {}

  removeItem(item: ItemInShipment) {
    this.remove.emit({tempId: item.tempId, id: item.id})
    this.cdRef.markForCheck();
  }

  addItemsToShipment() {
    this.createShipment.emit(this.items)
  }
}
