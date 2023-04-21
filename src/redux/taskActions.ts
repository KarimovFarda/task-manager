import { Dispatch } from "redux";
import { ITasks, ITasksArr } from "../models/types";
import { HttpClient } from "../service/httpRequest";
import { TASKS_ACTIONS } from "./constants";

interface IActionTasks {
  type: "ADD_TASKS";
  payload: ITasks[];
}
const request = new HttpClient("https://61e2d0883050a1001768228f.mockapi.io/api/v1");
export async function getTasks(){
  return await request
    .get(`task`)
};

export const addTasks = (payload: any) => (dispatch: Dispatch) => {
  request
    .post(`task`, payload)
    .then((response) => {
      dispatch({
        type: TASKS_ACTIONS.ADD_TASKS,
        payload: response.data,
      });
    })
    .catch((err) => console.error(err));
};

export const editTasks =
  (payload: any, taskId: Number) => (dispatch: Dispatch) => {
    request
      .edit(`task/${taskId}`, payload)
      .then((response) => {
        dispatch({
          type: TASKS_ACTIONS.EDIT_TASKS,
          payload: response,
        });
      })
      .catch((err) => console.error(err));
  };

export const deleteTasks =
( taskId: Number) => (dispatch: Dispatch) => {
    request
      .delete(`task/${taskId}`)
      .then((response) =>
        dispatch({
          type: TASKS_ACTIONS.DELETE_TASKS,
          payload: response,
        })
      )
      .catch((err) => console.error(err));
  };

export type Actions = IActionTasks;
export type DispatchType = (args: ITasksArr) => ITasksArr;