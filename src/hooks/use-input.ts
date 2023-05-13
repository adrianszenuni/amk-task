import { useReducer } from "react";

const initState = {
  value: "",
//   isValid: false,
  isTouched: false,
};

const enum REDUCER_ACTION_TYPE {
  USER_INPUT,
  INPUT_BLUR,
  RESET,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: string;
};

const inputStateReducer = (
  state: typeof initState,
  action: ReducerAction
): typeof initState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.USER_INPUT:
      return {
        ...state,
        value: action.payload ?? "",
        isTouched: state.isTouched,
      };
    case REDUCER_ACTION_TYPE.INPUT_BLUR:
      return { ...state, value: state.value, isTouched: true };
    case REDUCER_ACTION_TYPE.RESET:
      return { ...state, value: "", isTouched: false };
    default:
      return initState;
  }
};

const useInput = (validateValue: (value: string) => boolean) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initState);

  const valueIsValid= validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;


  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.USER_INPUT,
      payload: event.target.value,
    });
  };

  const inputBlurHandler = () => {
    dispatch({ type: REDUCER_ACTION_TYPE.INPUT_BLUR });
  };

  const reset = () => {
    dispatch({ type: REDUCER_ACTION_TYPE.RESET });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
