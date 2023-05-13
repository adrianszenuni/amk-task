import React, { useState, useEffect, useCallback } from "react";
import Task from "../models/task";

const API_URL = "https://amk-task-default-rtdb.firebaseio.com";

type TasksContextObj = {
  tasks: Task[];
  isLoading: boolean;
  findTask: (id: string) => Task;
  addTask: (item: {}) => void;
  editTask: (item: Task) => void;
  getTasks: () => void;
};

export const TasksContext = React.createContext<TasksContextObj>({
  tasks: [],
  isLoading: true,
  findTask: () => new Task("", "", "", ""),
  addTask: () => {},
  editTask: () => {},
  getTasks: () => {},
});

type Props = {
  children: React.ReactNode;
};

const TasksContextProvider: React.FC<Props> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tasksChanged, setTasksChanged] = useState(false);

  useEffect(() => {
    getTasks();
  }, [tasksChanged]);

  const addTaskHandler = async (item: Object) => {
    await fetch(`${API_URL}/tasks.json`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTasksChanged(!tasksChanged);
  };

  const findTask = (id?: string): Task => {
    const task = tasks.find((el) => el.id === id);
    return new Task(task!.title, task!.description, task!.status, task!.id);
  };

  const editTask = (item: Task) => {
    const taskData = {
      title: item.title,
      description: item.description,
      status: item.status,
    };
    fetch(`${API_URL}/tasks/${item.id}.json`, {
      method: "PUT",
      body: JSON.stringify(taskData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTasksChanged(!tasksChanged);
  };

  const getTasks = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(`${API_URL}/tasks.json`);
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();
    const loadedTasks = [];
    for (const key in data) {
      loadedTasks.push({
        id: key,
        title: data[key].title,
        description: data[key].description,
        status: data[key].status,
      });
    }
    setTasks(loadedTasks);
    setIsLoading(false);
  }, []);

  const contextValue: TasksContextObj = {
    tasks: tasks,
    isLoading: isLoading,
    findTask: findTask,
    addTask: addTaskHandler,
    editTask: editTask,
    getTasks: getTasks,
  };

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContextProvider;
