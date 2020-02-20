import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemService } from './item.service';
import { Observable } from 'rxjs';
import { Item } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
})
export class AppComponent {
  title = 'Items';
  @ViewChild('itemForm', { static: false }) itemForm: NgForm;
  items: Item[];

  constructor(
    private itemService: ItemService,
  ) {
    this.getItems();
  }

  onAddItem(): void {
    const text = this.itemForm.value.text;

    if (text) {
      this.itemService.createItem(text);
    }

    this.itemForm.resetForm();
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
