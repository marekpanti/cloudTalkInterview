import {
  ChangeDetectionStrategy,
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
  @Output() remove: EventEmitter<string> = new EventEmitter<string>();
  @Output() createShipment: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}
}
