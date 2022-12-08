import { Component, OnInit } from '@angular/core';
import {CreateUserDTO, User} from "./interfaces/user.model";
import {UserService} from "../services/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CreateTeamDTO, Team} from "../teams/interfaces/team.model";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: User[] = []
  public formUser !: FormGroup
  public selectedUser !: User;
  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formUser = this.fb.group({
      fullname: ['' , { updateOn: 'submit' }],
      username: [''],
      gender: [''],
      email: [''],
      password: [''],
      phone: [''],
      cellphone: [''],
      profilePicture: ['fotito'],
      role: ['2'],
    })
    this.userService.getUsers().subscribe(data => {
      this.users = data
    })
  }

  getRole(role: number){
    if(role === 1) return "Lider de Equipo"
    else return "Miembro de Equipo"
  }

  setSelectedUser(user: User){
    this.selectedUser = user
  }

  getGender(gender: string | undefined){
    if(gender === 'F') return "Femenino"
    else return "Masculino"
  }

  createUser(){
    const user: CreateUserDTO = {
      fullname: this.formUser.value.fullname,
      username: this.formUser.value.username,
      gender: this.formUser.value.gender,
      email: this.formUser.value.email,
      password: this.formUser.value.password,
      phone: this.formUser.value.phone,
      cellphone: this.formUser.value.cellphone,
      profilePicture: this.formUser.value.profilePicture,
      role: this.formUser.value.role,
    }
    this.userService.createUser(user).subscribe(data =>{
      console.log(data)
      this.users.unshift(data);
      this.formUser.reset()
    });
  }

  saveUser(selectedUser: User){
    const user: CreateUserDTO = {
      fullname: this.formUser.value.fullname,
      username: this.formUser.value.username,
      gender: this.formUser.value.gender,
      email: this.formUser.value.email,
      password: this.formUser.value.password,
      phone: this.formUser.value.phone,
      cellphone: this.formUser.value.cellphone,
      profilePicture: this.formUser.value.profilePicture,
      role: this.formUser.value.role,
    }

    console.log(user);
    // this.userService.saveUser(selectedUser.id, user).subscribe(data => {
    //   this.users = this.users.filter(user => user.id != data.id)
    //   this.users.unshift(data)
    //   this.formUser.reset()
    // });
  }

  deleteUser(user: User){
    this.userService.deleteUser(user.id).subscribe(data => {
      if(data === null){
        this.users = this.users.filter(u => u.id != user.id)
      }
    })
  }

}
