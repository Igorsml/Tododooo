import { Button, Container, Title, Modal, TextInput, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { ToggleTheme } from "../ToggleTheme/ToggleTheme";
import { randomId } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
import { useLocalStorage } from "@mantine/hooks";
import { CurrentStatusTodo } from "../../enums";
import { useTodos } from "../../context/TodoContext";
import { TodosItems } from "../TodoList/TodosItems";
import { FilterComponent } from "../FilterComponent/FilterComponent";

const data = [
  { emoji: "👨‍💻", label: CurrentStatusTodo.ready },
  { emoji: "🤝", label: CurrentStatusTodo.inProgress },
  { emoji: "✅", label: CurrentStatusTodo.done },
];

export const Todo = () => {
  const [opened, setOpened] = useState<boolean>(false);

  const { todos, addTodo, clearAllTodos } = useTodos() || { todos: [] };

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      owner: "",
      deadline: 0,
      currentStatus: "",
      key: "",
      isShow: true,
    },
  });

  const [colorScheme, setColorScheme] = useLocalStorage({
    keyColor: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  return (
    <>
      <Modal
        opened={opened}
        size={"md"}
        title={"Новая задача"}
        withCloseButton={true}
        onClose={() => {
          setOpened(false);
        }}
        centered
      >
        <form
          onSubmit={form.onSubmit((values) => {
            addTodo({ ...values, key: randomId() });
            setOpened(false);
          })}
        >
          <TextInput mt={"md"} placeholder={"Название задачи"} label='Название' {...form.getInputProps("title")} required />
          <TextInput mt={"md"} placeholder={"Описание задачи"} label='Описание' {...form.getInputProps("description")} />
          <TextInput mt={"md"} placeholder={"Имя владельца"} label='Имя' {...form.getInputProps("owner")} />
          <DatePickerInput mt={"md"} placeholder='Дедлайн' label='Крайний срок' valueFormat='DD/M/YY' allowDeselect {...form.getInputProps("deadline")} />
          <Select mt={"md"} placeholder='Текущий статус' label='Статус' data={data.map((status) => `${status.emoji}${status.label}`)} clearable checkIconPosition='right' {...form.getInputProps("currentStatus")} />
          <Button mt='md' type='submit'>
            Добавить ёпта
          </Button>
        </form>
      </Modal>
      <Container size={550} my={40}>
        <Group position={"apart"}>
          <Title order={1} textWrap='pretty'>
            Todo list
          </Title>
          <ToggleTheme />
          <Button
            onClick={() => {
              setOpened(true);
            }}
            fullWidth
            mt={"md"}
            color='gray'
          >
            Добавить задачу
          </Button>
          {todos.length && (
            <Button onClick={() => clearAllTodos && clearAllTodos()} variant='filled' color='gray' w={"100%"}>
              Очистить всё
            </Button>
          )}
          {todos.length && <FilterComponent />}
        </Group>
        <TodosItems />
      </Container>
    </>
  );
};
