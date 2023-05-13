import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { TasksContext } from "../store/tasks-context";

import EditIcon from "../ui/EditIcon";
import classes from "./EditTaskForm.module.css";

const EditTaskForm: React.FC = () => {
  const isNotEmpty = (value: string): boolean => value.trim() !== "";
  const isNotShortAndEmpty = (value: string): boolean =>
    value.trim() !== "" && value.trim().length > 10;

  const [formIsValid, setFormIsValid] = useState(false);
  const [formInputsValidity, setFormInputsValidity] = useState({
    title: true,
    description: true,
  });

  const [taskStatus, setTaskStatus] = useState([
    "ToDo",
    "In Progress",
    "In QA",
    "Done",
  ]);

  const [selectedStatus, setSelectedStatus] = useState("");

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredTitleIsValid, setEnteredTitleIsValid] = useState(false);
  const [enteredTitleIsTouched, setEnteredTitleIsTouched] = useState(false);
  const [titleInputHasError, setTitleInputHasError] = useState(false);

  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredDescriptionIsValid, setEnteredDescriptionIsValid] =
    useState(false);
  const [enteredDescriptionIsTouched, setEnteredDescriptionIsTouched] =
    useState(false);
  const [descriptionInputHasError, setDescriptionInputHasError] =
    useState(false);

  const ctx = useContext(TasksContext);
  const navigate = useNavigate();

  const params = useParams();
  const taskId: string = params.id ? params.id.toString() : "";
  let findedTask;

  useEffect(() => {
    findedTask = ctx.findTask(taskId);
    setEnteredTitle(findedTask.title);
    setEnteredDescription(findedTask.description);
    setSelectedStatus(findedTask.status);

    if (findedTask.status === "ToDo") {
      setTaskStatus(["ToDo", "In Progress"]);
    }
    if (findedTask.status === "In QA") {
      setTaskStatus(["In QA", "ToDo", "Done"]);
    }

    if (findedTask.status === "In Progress") {
      setTaskStatus(["In Progress", "ToDo", "In QA"]);
    }
  }, []);

  useEffect(() => {
    setEnteredTitleIsValid(isNotEmpty(enteredTitle));
    setTitleInputHasError(!enteredTitleIsValid && enteredTitleIsTouched);
  }, [enteredTitleIsTouched, enteredTitleIsValid, enteredTitle]);

  useEffect(() => {
    setEnteredDescriptionIsValid(isNotShortAndEmpty(enteredDescription));
    setDescriptionInputHasError(
      !enteredDescriptionIsValid && enteredDescriptionIsTouched
    );
  }, [
    enteredDescriptionIsTouched,
    enteredDescriptionIsValid,
    enteredDescription,
  ]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(enteredTitleIsValid && enteredDescriptionIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [enteredTitleIsValid, enteredDescriptionIsValid]);

  const selectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredTitle(event.target.value);
  };

  const titleBlurHandler = () => {
    setEnteredTitleIsTouched(true);
  };

  const descriptionChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEnteredDescription(event.target.value);
  };

  const descriptionBlurHandler = () => {
    setEnteredDescriptionIsTouched(true);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    setFormInputsValidity({
      title: enteredTitleIsValid,
      description: enteredDescriptionIsValid,
    });

    if (!formIsValid) {
      return;
    }

    if (formIsValid) {
      const task = {
        id: taskId,
        title: enteredTitle,
        description: enteredDescription,
        status: selectedStatus,
      };
      ctx.editTask(task);
    }

    setEnteredTitle("");
    setEnteredDescription("");
    navigate(-1);
  };

  const titleControlClasses = `${classes.control} ${
    titleInputHasError || !formInputsValidity.title ? classes.invalid : ""
  }`;

  const descriptionControlClasses = `${classes.control} ${
    descriptionInputHasError || !formInputsValidity.description
      ? classes.invalid
      : ""
  }`;

  return (
    <section className={classes["form-wrapper"]}>
      <form className={classes.form} onSubmit={submitHandler}>
        <h2>Edit Task</h2>
        <div className={titleControlClasses}>
          <input
            type="text"
            placeholder="Title"
            value={enteredTitle}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
          />
          {(titleInputHasError || !formInputsValidity.title) && (
            <p>Name should not be empty!</p>
          )}
        </div>
        <div className={descriptionControlClasses}>
          <textarea
            placeholder="Description"
            value={enteredDescription}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
          ></textarea>
          {(descriptionInputHasError || !formInputsValidity.description) && (
            <p>Description should not be empty and should be longer!</p>
          )}
        </div>
        <div className={classes.control}>
          <select
            value={selectedStatus}
            className={classes.status}
            onChange={selectChangeHandler}
          >
            {taskStatus.map((status, idx) => (
              <option key={idx} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className={classes["form-actions"]}>
          <button type="submit">
            <EditIcon />
            Edit
          </button>
          <button
            type="button"
            className={classes.cancelBtn}
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};
export default EditTaskForm;
