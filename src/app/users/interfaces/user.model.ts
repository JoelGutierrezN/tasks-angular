import { Team } from "../../teams/interfaces/team.model";
import { Task } from "../../tasks/interfaces/task.model";

export interface User{
  "id": number
  "fullname": string
  "username": string
  "gender": string
  "email": string
  "password": string
  "phone": string
  "cellphone": string
  "profilePicture": string
  "role": number
  "comments": []
  "ownerOf": any
  "teams": Team[]
  "tasks": Task[]
}

export interface CreateUserDTO extends Omit<User, 'id' | 'comments' | 'ownerOf' | 'teams' | 'tasks'>{}
