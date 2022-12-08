import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateUserDTO, User} from '../users/interfaces/user.model';
import {CreateTeamDTO, Team} from "../teams/interfaces/team.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUsers: string = 'http://localhost:2000/api/users'
  constructor(
    private httpClient: HttpClient
  ) { }

  public getUsers(){
    return this.httpClient.get<User[]>(this.apiUsers);
  }
  public createUser(data: CreateUserDTO){
    return this.httpClient.post<User>(this.apiUsers, data)
  }
  public saveUser(id: number, user: CreateUserDTO){
    return this.httpClient.put<User>(`${this.apiUsers}/${id}`, user);
  }
  public deleteUser(id: number){
    return this.httpClient.delete<null>(`${this.apiUsers}/${id}`);
  }
}
