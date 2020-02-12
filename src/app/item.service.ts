import { Injectable } from '@angular/core';
import { v1 as uuid } from 'uuid';

interface Item {
  id: string;
  item: string;
}

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
  getItems(): Item[] {
    return this.items;
  }

  // create item, save data, return id
  createItem(item: string): string {
    const id = uuid();

    this.items.push({ id, item });

    this.saveItems();

    return id;
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
}
