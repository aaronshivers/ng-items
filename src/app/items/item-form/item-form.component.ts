import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: [ './item-form.component.css' ],
})
export class ItemFormComponent {
  @ViewChild('itemForm', { static: false }) itemForm: NgForm;

  constructor(private itemService: ItemService) { }

  onAddItem(): void {
    const text = this.itemForm.value.text;

    if (text) {
      this.itemService.createItem(text);
    }

    this.itemForm.resetForm();
  }
}
