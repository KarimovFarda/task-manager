export interface IRegister {
  firstname: String,
  organizationName: String,
  email: String,
  password: String,
  address: String,
  phoneNumber: String
}

export interface ILogin {
  email: String,
  password: String
}

export interface IAdmin {
  email: String,
  password: String
}
export interface ITasks {
  task_name: String,
  description: String,
  assign_member_id: String,
  date: String
}

export interface ITasksArr {
  tasks: ITasks[];
}


export interface IMember {
  member_id: String,
  member_name: String,
}
export interface IMembersArr {
  members: IMember[];
}


