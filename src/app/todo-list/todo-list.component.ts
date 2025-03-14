import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoStore } from '../store/todo.store';

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  store = inject(TodoStore)

  @Input() todoLists: any[] = [];
  @Input() selectedList: any = {};

  newListItem = signal('')

  deleteList() {
    this.store.deleteTodoList();
    this.store.setSelectedList(0);
    this.newListItem.set('');
  }

  addItem() {
    if(this.newListItem().length > 0)
      this.store.addItemToSelectedList(this.newListItem());
    this.newListItem.set('');
  }

  deleteItem(index: number) {
    this.store.deleteItemFromSelectedList(index);
  }

  updateItem(index: number, e: any) {
    this.store.updateItemInSelectedList(index, e.target.value)
  }

  updateListName(e: any) {
    this.store.updateListName(e.target.value);
  }

  updateNotes(e: any) {
    this.store.updateNotesForSelectedList(e.target.value);
  }

  toggle(index: number) {
    this.store.toggleChecked(index);
  }
}
