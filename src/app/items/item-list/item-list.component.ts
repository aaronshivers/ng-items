import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();
  }

  onDelete(id: string) {
    this.itemService.deleteItem(id);
  }

  onComplete(id: string) {
    this.itemService.toggleCompleted(id);
  }

  // getItems items
  private getItems(): void {
    this.items = this.itemService.getItems();
  }
}
