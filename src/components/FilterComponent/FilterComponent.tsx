import { useState } from "react";
import { Input, Select, Flex } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { FilterOptions, CurrentStatusTodo } from "../../enums";
import { useTodos } from "../../context/TodoContext";

const data = [
  { emoji: "👨‍💻", label: CurrentStatusTodo.ready },
  { emoji: "🤝", label: CurrentStatusTodo.inProgress },
  { emoji: "✅", label: CurrentStatusTodo.done },
];

export const FilterComponent = () => {
  const todosContext = useTodos();
  const [selectOption, setSelectOption] = useState<string | null>("По имени");
  const [inputValue, setInputValue] = useState<string>("");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  let inputType;

  inputType = <Input disabled />;
  if (selectOption === FilterOptions.name || selectOption === FilterOptions.taskName) {
    inputType = (
      <Input
        placeholder='Зафильтруй меня'
        value={inputValue}
        onChange={(value: any) => {
          const targetValue = value.target.value;
          setInputValue(targetValue.trim);
          filterTodo(targetValue, selectOption);
        }}
      />
    );
  }
  if (selectOption === FilterOptions.deadline) {
    inputType = (
      <DatePickerInput
        type='range'
        valueFormat='DD MMM YYYY'
        placeholder='Выберите диапазон дат'
        value={dateRange}
        onChange={(value: any) => {
          setDateRange(value);
          filterTodo(value, selectOption);
        }}
      />
    );
  }
  if (selectOption === FilterOptions.currentStatus) {
    inputType = <Select placeholder='Текущий статус' data={data.map((status) => `${status.emoji}${status.label}`)} clearable checkIconPosition='right' />;
  }

  const { filterTodo } = todosContext || { todos: [] };
  return (
    <Flex justify={"space-between"} align={"center"} w={"100%"} mt={"md"}>
      {inputType}
      <Select data={[FilterOptions.name, FilterOptions.taskName, FilterOptions.deadline, FilterOptions.currentStatus]} clearable checkIconPosition='right' placeholder='Выберите тип фильтра' value={selectOption} onChange={(value) => setSelectOption(value)} />
    </Flex>
  );
};
