import { IMembersArr } from "../models/types";
import { MemberActions } from "./memberActions";
import { MEMBERS_ACTION } from "./constants";


const initialState: IMembersArr = {
  members: []
};
export function membersReducer(
  state: IMembersArr = initialState,
  action: MemberActions
){
  switch (action.type) {
    case MEMBERS_ACTION.ADD_MEMBERS: {
      return { ...state, members: action.payload };
    }
    default:
      return state;
  }
}


