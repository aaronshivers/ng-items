import { Injectable } from '@angular/core';
import { v1 as uuid } from 'uuid';
import { Item } from './item';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  // initialize an empty items array
  items: Item[] = [];

  constructor() {
    this.loadItems();
  }

  // make items available publicly
  getItems(): Observable<Item[]> {
    return of(this.items);
  }

  // create item, save data, return id
  createItem(text: string): string {
    const id = uuid();

    this.items.push({ id, text, completed: false });

    this.saveItems();

    return id;
  }

  // delete item
  deleteItem(id: string): void {
    const itemIndex = this.getItemIndex(id);

    if (itemIndex >= 0) {
      this.items.splice(itemIndex, 1);
      this.saveItems();
    }
  }

  toggleCompleted(id: string): void {
    const itemIndex = this.getItemIndex(id);

    if (itemIndex >= 0) {
      this.items[itemIndex].completed = !this.items[itemIndex].completed;
      this.saveItems();
    }
  }

  // load existing items from localStorage
  private loadItems(): void {
    const itemsJSON = localStorage.getItem('items');
    this.items = itemsJSON ? JSON.parse(itemsJSON) : [];
  }

  // save items to localStorage
  private saveItems(): void {
    const itemsJSON = JSON.stringify(this.items);
    localStorage.setItem('items', itemsJSON);
  }

  // get the item index
  private getItemIndex(id: string): number {
    return this.items.findIndex(item => item.id === id);
  }
}
