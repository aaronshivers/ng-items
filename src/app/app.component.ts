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
  @ViewChild('itemForm', { static: false }) itemForm: NgForm;
  items$: Observable<Item[]>;
  item = '';

  constructor(
    private itemService: ItemService,
  ) {
    this.getItems();
  }

  onAddItem(): void {
    this.item = this.itemForm.value.text;
    // this.items.push(this.item);

    this.itemService.createItem(this.item);

    this.itemForm.resetForm();
  }

  onDelete(id: string) {
    this.itemService.deleteItem(id);
  }

  // getItems items
  private getItems(): void {
    this.items$ = this.itemService.getItems();
  }
}
