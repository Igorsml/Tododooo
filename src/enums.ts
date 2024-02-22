 enum CurrentStatusTodo {
  ready = "Готова к работе",
  inProgress = "Взята в работу",
  done = "Выполнена",
}

enum FilterOptions {
  name = "Фильтр по имени",
  taskName = "Фильтр по названию задачи",
  deadline = 'Фильтр по дедлайну',
  currentStatus = 'Фильтр по статусу'
}

export {CurrentStatusTodo,FilterOptions}