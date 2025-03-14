import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { TodoListComponent } from "./todo-list/todo-list.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoStore } from './store/todo.store';

@Component({
  selector: 'app-root',
  imports: [TodoListComponent, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  newListName = signal('')
  store = inject(TodoStore)

  createTodoList() {
    const listIndex = this.store.todos().findIndex(list => list.name === this.newListName());
    if(listIndex == -1) {
      this.store.addTodoList(this.newListName());
      this.setSelectedList(0);
      this.newListName.set('');
    } else (
      this.setSelectedList(listIndex)
    )
  }

  setSelectedList(index: number){
    this.store.setSelectedList(index);
  }

}
