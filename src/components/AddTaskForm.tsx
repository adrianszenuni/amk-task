import { useState, useEffect, useContext } from "react";

import classes from "./AddTaskForm.module.css";
import PlusIcon from "../ui/PlusIcon";

import { TasksContext } from "../store/tasks-context";
import useInput from "../hooks/use-input";

const AddTaskForm: React.FC = () => {
  const isNotEmpty = (value: string): boolean => value.trim() !== "";
  const isNotShortAndEmpty = (value: string): boolean => value.trim() !== "" && value.trim().length > 10;

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    inputChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionInputHasError,
    inputChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput,
  } = useInput(isNotShortAndEmpty);

  const [formIsValid, setFormIsValid] = useState(false);
  const [formInputsValidity, setFormInputsValidity] = useState({
    title: true,
    description: true,
  });
  const ctx = useContext(TasksContext);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(enteredTitleIsValid && enteredDescriptionIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [enteredTitleIsValid, enteredDescriptionIsValid]);

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
        title: enteredTitle,
        description: enteredDescription,
        status: "ToDo",
      };
      ctx.addTask(task);
    }

    resetTitleInput();
    resetDescriptionInput();
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
        <h2>Add a new Task</h2>
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
        <button type="submit">
          <PlusIcon /> Add
        </button>
      </form>
    </section>
  );
};

export default AddTaskForm;