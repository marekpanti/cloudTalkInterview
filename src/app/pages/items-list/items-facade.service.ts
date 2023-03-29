import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { MockedItems } from 'src/app/core/models/mockedItems';
import { ItemInShipment, WarehouseItem } from '../../core/models/warehouseItem';

@Injectable({providedIn: 'root'})
export class ItemsService {
  // I used BehaviorSubject instead so we have our small chunk of state created
  public mockedItems$ = new BehaviorSubject<WarehouseItem[]>(MockedItems);
  public inShipment$ = new BehaviorSubject<ItemInShipment[]>([]);

  constructor() {}

  addToCurrentShipment(item: WarehouseItem): void {
    const items = this.inShipment$.getValue();
    const itemWithTempId: ItemInShipment = {...item, tempId: (new Date()).toISOString()};
    this.inShipment$.next([...items, itemWithTempId]);
    this.changeItemQuantity(item.id, -1);
  }

  removeFromCurrentShipment(tempId: string, itemId: number): void {
    const items = this.inShipment$.getValue();
    const filteredItems = items.filter(item => item.tempId !== tempId);
    console.log(itemId);
    this.inShipment$.next([...filteredItems]);
    this.changeItemQuantity(itemId, 1);
  }

  private changeItemQuantity(itemId: number, quantityDifferentiator: number): void {
    const currentItems = this.mockedItems$.getValue();
    const currentItemIndex = currentItems.findIndex(currentItem => currentItem.id === itemId);
    currentItems[currentItemIndex].quantity += quantityDifferentiator;
    this.mockedItems$.next([...currentItems]);
  }

  deleteCurrentShipment(): void {
    this.inShipment$.next([]);
  }
}
