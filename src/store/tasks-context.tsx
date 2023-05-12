import React, { useState } from "react";
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

  const addTaskHandler = async (item: Object) => {
    await fetch(`${API_URL}/tasks.json`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

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
