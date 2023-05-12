import React, { useState, useEffect } from "react";
import Task from "../models/task";

const API_URL = "https://amk-task-default-rtdb.firebaseio.com";

type TasksContextObj = {
  tasks: Task[];
  addTask: (item: {}) => void;
};

export const TasksContext = React.createContext<TasksContextObj>({
  tasks: [],
  addTask: () => {},
});

type Props = {
  children: React.ReactNode;
};

const TasksContextProvider: React.FC<Props> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks();
  },[tasks])

  const addTaskHandler = async (item: Object) => {
    await fetch(`${API_URL}/tasks.json`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const getTasks = async () => {
    const response = await fetch(`${API_URL}/tasks.json`);
      //  if (!response.ok) {
      //   throw new Error("Something went wrong!");
      // }
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
  }

  const contextValue: TasksContextObj = {
    tasks: tasks,
    addTask: addTaskHandler,
  };

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContextProvider;
