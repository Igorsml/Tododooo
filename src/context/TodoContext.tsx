import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { FilterOptions } from "../enums";
import { useLocalStorage } from "@mantine/hooks";
import { TodoItem, TodosContextType } from "../types/TodoTypes";
import * as React from "react";

export const TodosContext = createContext<TodosContextType>(null);

const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = (todo: TodoItem) => setTodos((prev) => [...prev, todo]);

  const filterTodo = (value: string, filterOption: string | null) => {
    if (filterOption === FilterOptions.taskName) {
      setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.title.includes(value.trim())));
    }
    if (filterOption === FilterOptions.name) {
      setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.title.includes(value.trim())));
    }
    if (filterOption === FilterOptions.deadline) {
      setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.title.includes(value)));
    }
    if (filterOption === FilterOptions.currentStatus) {
    }
  };

  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value: string) => setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const editStatusTodo = useCallback(
    (todoStatus: string, todoKey: string) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.key === todoKey) {
            return {
              ...todo,
              currentStatus: todoStatus,
            };
          } else {
            return todo;
          }
        })
      );
    },
    [setTodos]
  );

  const updateTodo = useCallback(
    (key: string, newTodo: TodoItem) => {
      setTodos((todos) =>
        todos.map((todo: TodoItem) =>
          todo.key === key
            ? {
                ...todo,
                title: newTodo.title !== undefined ? newTodo.title : todo.title,
                description: newTodo.description !== undefined ? newTodo.description : todo.description,
                currentStatus: newTodo.currentStatus !== undefined ? newTodo.currentStatus : todo.currentStatus,
                owner: newTodo.owner !== undefined ? newTodo.owner : todo.owner,
                deadLine: newTodo?.deadline !== undefined ? newTodo.deadline : todo.deadline,
              }
            : todo
        )
      );
    },
    [setTodos]
  );

  const removeTodo = useCallback(
    (key: string) => {
      setTodos(todos.filter((todo: TodoItem) => todo.key !== key));
    },
    [todos]
  );

  const loadTodos = () => {
    let loadedTodos = localStorage.getItem("tasks");

    let todos = JSON.parse(loadedTodos);

    if (todos) {
      setTodos(todos);
    }
  };

  const saveTodos = () => {
    localStorage.setItem("tasks", JSON.stringify(todos));
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const clearAllTodos = () => {
    setTodos([]);
  };

  const contextValue = useMemo(
    () => ({
      todos,
      removeTodo,
      editStatusTodo,
      updateTodo,
      saveTodos,
      clearAllTodos,
      addTodo,
      filterTodo,
    }),
    [todos, removeTodo, editStatusTodo, updateTodo, saveTodos, clearAllTodos, addTodo, filterTodo]
  );

  return <TodosContext.Provider value={contextValue}>{children}</TodosContext.Provider>;
};

const useTodos = () => useContext(TodosContext);

export { TodosProvider, useTodos };
