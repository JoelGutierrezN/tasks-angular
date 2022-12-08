import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateTaskDTO, Task} from "../tasks/interfaces/task.model";
import {CreateTeamDTO, Team} from "../teams/interfaces/team.model";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private apiTasks: string = 'http://localhost:2000/api/tasks'
  constructor(private http: HttpClient) { }

  public getTasks(){
    return this.http.get<Task[]>(this.apiTasks);
  }
  public createTask(data: CreateTaskDTO){
    return this.http.post<Task>(this.apiTasks, data)
  }
  public saveTask(id: number, task: CreateTaskDTO){
    return this.http.put<Task>(`${this.apiTasks}/${id}`, task);
  }
  public deleteTask(id: number){
    return this.http.delete<null>(`${this.apiTasks}/${id}`);
  }
}
