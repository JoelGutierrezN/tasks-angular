import { Component, OnInit } from '@angular/core';
import {TasksService} from "../services/tasks.service";
import {CreateTaskDTO, Task} from "./interfaces/task.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CreateTeamDTO, Team} from "../teams/interfaces/team.model";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  public tasks: Task[] = []
  public formTask !: FormGroup
  public selectedTask !: Task
  constructor( private tasksService: TasksService, private fb: FormBuilder) { }

  ngOnInit(): void {
    const date = new Date();
    let day: string | number = date.getDate();
    if(day < 10) {
      day = `0${day}`
    }
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

    this.formTask = this.fb.group({
      title: [''],
      description: [''],
      isBloqued: [0],
      status: [0],
      dueDate: [''],
      createdAt: [currentDate],
      updatedAt: [currentDate],
      teamID: [1]
    })

    this.tasksService.getTasks().subscribe(data => {
      this.tasks = data;
    })
  }

  setSelectedTask(task: Task){
    this.selectedTask = task
  }

  createTask(){
    const task: CreateTaskDTO = {
      title: this.formTask.value.title,
      description: this.formTask.value.description,
      isBloqued: this.formTask.value.isBloqued,
      status: this.formTask.value.status,
      dueDate: this.formTask.value.dueDate,
      createdAt: this.formTask.value.createdAt,
      updatedAt: this.formTask.value.updatedAt,
      teamID: this.formTask.value.teamID,
    }
    console.log(task)
    this.tasksService.createTask(task).subscribe(data =>{
      console.log(data)
      this.tasks.unshift(data);
      this.formTask.reset()
    });
  }

  saveTask(selectedTask: Task){
    const task: CreateTaskDTO = {
      title: this.formTask.value.title,
      description: this.formTask.value.description,
      isBloqued: this.formTask.value.isBloqued,
      status: this.formTask.value.status,
      dueDate: this.formTask.value.dueDate,
      createdAt: this.formTask.value.createdAt,
      updatedAt: this.formTask.value.updatedAt,
      teamID: this.formTask.value.teamID,
    }
    this.tasksService.saveTask(selectedTask.id, task).subscribe(data => {
      this.tasks = this.tasks.filter(task => task.id != data.id)
      this.tasks.unshift(data)
      this.formTask.reset()
    });
  }

  deleteTask(task: Task){
    this.tasksService.deleteTask(task.id).subscribe(data => {
      if(data === null){
        this.tasks = this.tasks.filter(t => t.id != task.id)
      }
    })
  }

}
