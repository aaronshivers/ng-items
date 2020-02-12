import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemService } from './item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
})
export class AppComponent {
  @ViewChild('itemForm', { static: false }) itemForm: NgForm;
  items: string[] = [];
  item = '';

  constructor(
    private itemService: ItemService,
  ) {}

  onAddItem(): void {
    this.item = this.itemForm.value.item;
    this.items.push(this.item);

    this.itemService.createItem(this.item);

    this.itemForm.resetForm();
  }

  onDelete(i: number) {
    this.items.splice(i, 1);
  }
}
