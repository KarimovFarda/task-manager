import { ITasksArr } from "../models/types";
import { Actions } from "./taskActions";
import { TASKS_ACTIONS } from "./constants";


const initialState: ITasksArr = {
  tasks: []
};
export default function tasksReducer(
  state: ITasksArr = initialState,
  action: Actions
) {
  switch (action.type) {
    case TASKS_ACTIONS.ADD_TASKS: {
      return { ...state, tasks: action.payload };
    }
    default:
      return state;
  }
}