import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  newListName: string = '';
  newListItem: string = '';
  todoLists: any[] = [
    {
      name: 'My List',
      listItems: [
        {name: 'Item 1', isChecked: false}, 
        {name: 'Item 2', isChecked: false},
      ],
      notes: ''
    }
  ];
  selectedList = this.todoLists[0];
  percentage: string = '0%';
  numberChecked: number = 0;

  createList(){
    const newListNameIndex = this.todoLists.findIndex(list => list.name.toLowerCase() === this.newListName.toLowerCase());

    if(newListNameIndex  > -1) {
      this.selectedList = this.todoLists.at(newListNameIndex);
    } else {
      const newList = {
        name: this.newListName,
        listItems: [
          {name: 'Item 1', isChecked: false}, 
          {name: 'Item 2', isChecked: false}
        ],
        notes: ''
      };
      this.todoLists.push(newList);
      this.selectedList = this.todoLists.at(-1);
      this.newListItem = '';
      this.setPercentage();
    }
  }

  deleteList() {
    const selectedIndex = this.todoLists.indexOf(this.selectedList);
    this.todoLists.splice(selectedIndex, 1);
    this.selectedList = {};
    this.newListItem = '';
  }

  addItem() {
    if(this.newListItem?.length > 0) {
      const newItem = {name: this.newListItem, isChecked: false};
      const selectedIndex = this.todoLists.indexOf(this.selectedList);
      this.todoLists[selectedIndex].listItems.push(newItem);
      this.setPercentage();
    }
  }

  deleteItem(index: number) {
    const selectedIndex = this.todoLists.indexOf(this.selectedList);
    this.todoLists[selectedIndex].listItems.splice(index, 1);
    this.setPercentage();
  }

  updateItem(index: number, e: any) {
    const selectedIndex = this.todoLists.indexOf(this.selectedList);
    const listItem = this.todoLists[selectedIndex].listItems[index];
    e.target.type === 'text' ? listItem.name = e.target.value : listItem.isChecked = e.target.checked;
    this.setPercentage();
  }

  setSelectedList(index: number){
    this.selectedList = this.todoLists[index];
    this.newListItem = '';
    this.setPercentage();
  }

  updateListName(e: any) {
    const selectedIndex = this.todoLists.indexOf(this.selectedList);
    this.todoLists[selectedIndex].name = e.target.value;
  }

  updateNotes(e: any) {
    const selectedIndex = this.todoLists.indexOf(this.selectedList);
    this.todoLists[selectedIndex].notes = e.target.value;
  }

  private setPercentage() {
    this.numberChecked = this.selectedList.listItems.filter((item: any) => item.isChecked).length;
    this.percentage = (this.numberChecked *100/this.selectedList.listItems.length) + '%';
  }
}
