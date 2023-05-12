import { NavLink } from "react-router-dom";
import classes from "./TaskItem.module.css";
import EditIcon from "../ui/EditIcon";

const TaskItem: React.FC<{
  taskId: string;
  title: string;
  description: string;
  status: string;
}> = (props) => {
  return (
    <div key={props.taskId} className={classes["task-wrapper"]}>
      <div className={classes.task}>
        <div className={classes["task-details"]}>
          <h3>{props.title}</h3>
          <p>{props.description}</p>
        </div>
        <div className={classes["task-actions"]}>
          <button type="button">{props.status}</button>
          <NavLink to={`/edit/${props.taskId}`}>
            <EditIcon />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
