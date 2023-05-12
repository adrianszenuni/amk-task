import { useContext } from 'react';
import { TasksContext } from '../store/tasks-context';

import { NavLink } from "react-router-dom";

import classes from './TasksList.module.css';
import EditIcon from '../ui/EditIcon';

const DUMMY_TASKS = [
  {
    id: "T1",
    title: "Task 1",
    description: "Test task 1 test task 1 the task is to task a tasks description and also do this and that for this and me for me",
    status: "In Progress",
  },
  {
    id: "T2",
    title: "Task 2",
    description: "Test task 1 test task 1",
    status: "Done",
  },
  {
    id: "T3",
    title: "Task 3",
    description: "Test task 1 test task 1",
    status: "toDo",
  },
  {
    id: "T4",
    title: "Task 4",
    description: "Test task 1 test task 1",
    status: "toDo",
  },
];

const TasksList: React.FC = () => {
    const ctx = useContext(TasksContext);

    return (
      <section className={classes["tasks-container"]}>
        <div className={classes["tasks-title"]}>
          <h3>Tasks</h3>
        </div>
        <div className={classes["tasks-wrapper"]}>
          <div className={classes["tasks-list"]}>
            {ctx.tasks.map((task) => (
              <div key={task.id} className={classes["task-wrapper"]}>
                <div className={classes.task}>
                  <div className={classes["task-details"]}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                  </div>
                  <div className={classes["task-actions"]}>
                    <button type="button">{task.status}</button>
                    <NavLink to={`/edit/${task.id}`}>
                      <EditIcon />
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}

export default TasksList;