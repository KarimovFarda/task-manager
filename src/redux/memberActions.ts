import { Dispatch } from "redux";
import { IMember, IMembersArr } from "../models/types";
import { HttpClient } from "../service/httpRequest";
import { MEMBERS_ACTION } from "./constants";

interface IActionMembers {
  type: "ADD_MEMBERS";
  payload: IMember[];
}
const request = new HttpClient("https://62b87e12f4cb8d63df5ec8f1.mockapi.io/");

export async function getMembers(){
  return await request
    .get(`Member`)
};

export const addMembers = (payload: any) => (dispatch: Dispatch) => {
  request
    .post(`Member`, payload)
    .then((response) => {
      dispatch({
        type: MEMBERS_ACTION.ADD_MEMBERS,
        payload: response.data,
      });
    })
    .catch((err) => console.error(err));
};

export type MemberActions = IActionMembers;
export type DispatchType = (args: IMembersArr) => IMembersArr;