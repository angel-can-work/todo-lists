import { Component, ViewEncapsulation } from '@angular/core';
import { TodoListComponent } from "./todo-list/todo-list.component";

@Component({
  selector: 'app-root',
  imports: [TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
