interface TodoItem {
  title: string;
  description?: string;
  owner?: string;
  currentStatus: string;
  deadline?: number | string;
  key: string;
  isShow: boolean;
}

type TodosContextType = {
  todos: TodoItem[];
  addTodo: (Todo: TodoItem) => void;
  removeTodo: (key: string) => void;
  editStatusTodo: (todo: string | null, todoKey: string) => void;
  updateTodo: (key: string, newTodo: TodoItem) => void;
  clearAllTodos: () => void;
  saveTodos: () => void;
  filterTodo: (value: string, filterOption: string | null) => void;
};

export type { TodoItem, TodosContextType };
