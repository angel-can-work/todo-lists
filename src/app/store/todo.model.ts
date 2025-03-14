export type TodoList = {
  name: string;
  listItems: ListItem[];
  notes: string
}

export type ListItem = {
  name: string;
  isChecked: boolean
}
