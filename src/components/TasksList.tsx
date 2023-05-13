import { useContext} from "react";
import { TasksContext } from "../store/tasks-context";

import TaskItem from "./TaskItem";

import classes from "./TasksList.module.css";

const TasksList: React.FC = () => {
  const ctx = useContext(TasksContext);
  let tasksListContent;

  if (ctx.tasks.length > 0 && !ctx.isLoading) {
    tasksListContent = (
      <div className={classes["tasks-list"]}>
        {ctx.tasks.map((task) => (
          <TaskItem
            key={task.id}
            taskId={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
          />
        ))}
      </div>
    );
  } else if (!ctx.isLoading) {
    tasksListContent = (
      <div className={classes.tasksEmpty}>
        <p>You have nothing to do.</p>
        <p>Go get some sleep</p>
      </div>
    );
  }

  return (
    <section className={classes["tasks-container"]}>
      <div className={classes["tasks-title"]}>
        <h3>Tasks</h3>
      </div>
      <div className={classes["tasks-wrapper"]}>{tasksListContent}</div>
    </section>
  );
};

export default TasksList;
