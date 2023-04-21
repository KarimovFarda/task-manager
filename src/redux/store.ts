import { createStore, combineReducers } from "redux";


import tasksReducer from "./taskReducer";
import {membersReducer} from "./memberReducer";

const reducer = combineReducers({
  tasks : tasksReducer,
  members: membersReducer
})

const store = createStore(reducer)

export default store;
