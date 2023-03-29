import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseItem } from '../../../../core/models/warehouse.model';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  @Input() items: WarehouseItem[];
  @Output() addToShipment: EventEmitter<WarehouseItem> = new EventEmitter<WarehouseItem>();

  ngOnChanges() {
    console.log('tada');
  }
  constructor() {}
}
