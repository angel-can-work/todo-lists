import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { TodoList, ListItem } from './todo.model';
import { computed } from '@angular/core';

type TodoState = {
  todos: TodoList[];
  selectedList: TodoList;
};

const newTodo: TodoList = {
  name: 'My List',
  listItems: [
    { name: 'Item 1', isChecked: false },
    { name: 'Item 2', isChecked: false },
  ],
  notes: ''
};

const initialState: TodoState = {
  todos: [newTodo],
  selectedList: newTodo
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    addTodoList(listName: string) {
      const newList: TodoList = {
        name: listName,
        listItems: [
          { name: 'Item 1', isChecked: false },
          { name: 'Item 2', isChecked: false }
        ],
        notes: ''
      };

      patchState(store, {
        todos: [newList, ...store.todos()]
      });
    },

    deleteTodoList() {
      const filteredTodos = store.todos().filter(
        (todo) => {
          return todo.name !== store.selectedList().name}
      );

      patchState(store, {
        todos: filteredTodos,
        selectedList: filteredTodos[0]
      });
    },

    updateListName(name: string) {
      patchState(store, {
        todos: store.todos().map(list =>
          list.name === store.selectedList().name ? { ...list, name } : list
        ),
        selectedList: {...store.selectedList(), name: name}
      });
    },

    addItemToSelectedList(itemName: string) {
      const updatedList = {
        ...store.selectedList(),
        listItems: [
          ...store.selectedList().listItems,
          { name: itemName, isChecked: false }
        ]
      };

      patchState(store, {
        todos: store.todos().map(list =>
          list.name === store.selectedList().name ? updatedList : list
        ),
        selectedList: updatedList
      });
    },

    deleteItemFromSelectedList(index: number) {
      const updatedListItems = store.selectedList().listItems.filter(
        (_, i) => i !== index
      );

      const updatedList = { ...store.selectedList(), listItems: updatedListItems };

      patchState(store, {
        todos: store.todos().map(list =>
          list.name === store.selectedList().name ? updatedList : list
        ),
        selectedList: updatedList
      });
    },

    updateItemInSelectedList(index: number, itemName: string) {
      const updatedListItems = store.selectedList().listItems.map((item, i) =>
        i === index ? { ...item, name: itemName } : item
      );

      const updatedList = { ...store.selectedList(), listItems: updatedListItems };

      patchState(store, {
        todos: store.todos().map(list =>
          list.name === store.selectedList().name ? updatedList : list
        ),
        selectedList: updatedList
      });
    },

    toggleChecked(index: number) {
      const updatedListItems = store.selectedList().listItems.map((item, i) =>
        i === index ? { ...item, isChecked: !item.isChecked } : item
      );

      const updatedList = { ...store.selectedList(), listItems: updatedListItems };

      patchState(store, {
        todos: store.todos().map(list =>
          list.name === store.selectedList().name ? updatedList : list
        ),
        selectedList: updatedList
      });
    },

    updateNotesForSelectedList(notes: string) {
      const updatedList = { ...store.selectedList(), notes };

      patchState(store, {
        todos: store.todos().map(list =>
          list.name === store.selectedList().name ? updatedList : list
        ),
        selectedList: updatedList
      });
    },

    setSelectedList(index: number) {
      const selected = store.todos()[index];

      patchState(store, {
        selectedList: selected
      });
    }
  })),

  withComputed((store) => ({
    percentage: computed(() => {
      const list = store.selectedList().listItems;
      const totalItems = list.length;
      const checkedItems = list.filter(item => item.isChecked).length;
      return totalItems === 0 ? 0 : (checkedItems / totalItems) * 100;
    }),
    numberChecked: computed(() => {
      return store.selectedList().listItems.filter(item => item.isChecked).length
    })
  }))
);
