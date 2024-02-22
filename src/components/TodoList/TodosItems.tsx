import { useContext } from "react";
import {
  Text,
  Group,
  Card,
  ActionIcon,
  Divider,
  Flex,
  Select,
} from "@mantine/core";
import { Trash } from "../../assets/icons";
import dayjs from "dayjs";
import { useTodos } from "../../context/TodoContext";
import { CurrentStatusTodo } from "../../enums";

const data = [
  { emoji: "👨‍💻", label: CurrentStatusTodo.ready },
  { emoji: "🤝", label: CurrentStatusTodo.inProgress },
  { emoji: "✅", label: CurrentStatusTodo.done },
];

export const TodosItems = () => {
  const { todos, removeTodo, editStatusTodo } = useTodos() || { todos: [] };

  return todos.length ? (
    todos?.map((todo, index) => {
      if (todo?.title) {
        return (
          <Card withBorder key={index} mt={"sm"}>
            <Group position={"apart"} justify="space-between">
              <Text weight={"bold"}>{todo.title}</Text>
              <Flex justify={"flex-end"} align={"center"} gap={"8px"}>
                <ActionIcon
                  onClick={() => {
                    removeTodo(todo.key);
                  }}
                  color={"red"}
                  variant={"transparent"}
                >
                  <Trash />
                </ActionIcon>
              </Flex>
            </Group>
            <Divider my="md" />
            <Text color={"dimmed"} size={"xs"} mt={"sm"}>
              {todo.description ? todo.description : "Описание пока пустое 😔"}
            </Text>
            <Text color={"dimmed"} size={"xs"} mt={"sm"}>
              {todo.currentStatus ? (
                <Group position={"apart"} justify="space-between">
                  <Select
                    mt={"md"}
                    data={data.map(
                      (status) => `${status.emoji} ${status.label}`
                    )}
                    clearable
                    checkIconPosition="right"
                    placeholder={todo.currentStatus}
                    onChange={(statusValue) =>
                      editStatusTodo(statusValue, todo.key)
                    }
                  />
                </Group>
              ) : (
                <Select
                  mt={"md"}
                  data={data.map((status) => `${status.emoji} ${status.label}`)}
                  clearable
                  checkIconPosition="right"
                  placeholder="Выберите статус задачи"
                  onChange={(statusValue) =>
                    editStatusTodo(statusValue, todo.key)
                  }
                />
              )}
            </Text>
            <Text color={"dimmed"} size={"xs"} mt={"sm"}>
              {todo.owner ? todo.owner : ""}
            </Text>
            <Text color={"dimmed"} size={"xs"} mt={"sm"}>
              {todo.deadline
                ? dayjs(todo.deadline.toString()).format("DD/MM/YYYY")
                : ""}
            </Text>
          </Card>
        );
      }
    })
  ) : (
    <Text size={"lg"} mt={"md"} color={"dimmed"}>
      Ты не озадачен(а)
    </Text>
  );
};
