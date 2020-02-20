import { Injectable } from '@angular/core';
import { v1 as uuid } from 'uuid';
import { Item } from './item';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  // initialize the items array
  items: Item[] = [];

  constructor() {
    // load items on initialization
    this.loadItems();
  }

  // get items from items array
  getItems() {
    return this.items;
  }

  createItem(text: string): void {
    // create item
    const item = { id: uuid(), text, completed: false };

    // add item to items array
    this.items.push(item);

    // save all items
    this.saveItems();
  }

  // delete item
  deleteItem(id: string): void {
    // get the item index
    const itemIndex = this.getItemIndex(id);

    if (itemIndex >= 0) {
      // remove the item from the items array
      this.items.splice(itemIndex, 1);

      // save all items
      this.saveItems();
    }
  }

  // change completed property
  toggleCompleted(id: string): void {
    // get the item index
    const itemIndex = this.getItemIndex(id);

    if (itemIndex >= 0) {
      // toggle the completed boolean
      this.items[itemIndex].completed = !this.items[itemIndex].completed;

      // save all items
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
