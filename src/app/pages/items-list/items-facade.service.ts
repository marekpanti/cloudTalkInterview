import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { MockedItems } from 'src/app/core/models/mockedItems';
import { ItemInShipment, WarehouseItem } from '../../core/models/warehouseItem';

@Injectable()
export class ItemsMockService {
  // I used BehaviorSubject instead so we have our small chunk of state created
  public mockedItems$ = new BehaviorSubject<WarehouseItem[]>(MockedItems);
  public inShipment$ = new BehaviorSubject<ItemInShipment[]>([]);

  constructor() {}

  addToCurrentShipment(item: WarehouseItem): void {
    const items = this.inShipment$.getValue();
    const itemWithTempId: ItemInShipment = {...item, tempId: (new Date()).toISOString()};
    this.inShipment$.next([...items, itemWithTempId]);
  }

  removeFromCurrentShipment(tempId: string): void {
    const items = this.inShipment$.getValue();
    const filteredItems = items.filter(item => item.tempId !== tempId);
    console.log(filteredItems);
    this.inShipment$.next(filteredItems);
  }

  createShipment() {

  }
}
