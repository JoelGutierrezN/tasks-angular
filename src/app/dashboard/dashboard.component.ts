import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {TasksService} from "../services/tasks.service";
import {TeamService} from "../services/team.service";
import { User } from '../users/interfaces/user.model';
import {Team} from "../teams/interfaces/team.model";
import {Task} from "../tasks/interfaces/task.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public users: User[] = []
  public teams: Team[] = []
  public tasks: Task[] = []
  constructor(
    private userService: UserService,
    private taskService: TasksService,
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data
    })

    this.userService.getUsers().subscribe(data => {
      this.users = data
    })

    this.teamService.getTeams().subscribe(data => {
      this.teams = data
    })
  }

}
