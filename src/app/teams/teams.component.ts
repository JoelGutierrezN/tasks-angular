import { Component, OnInit } from '@angular/core';
import { TeamService } from "../services/team.service";
import {CreateTeamDTO, Team} from "./interfaces/team.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  public teams: Team[] = []
  public formTeam !: FormGroup
  public selectedTeam !: Team
  constructor(
    private teamsService: TeamService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formTeam = this.fb.group({
      name: ['', { updateOn: 'submit' }],
      teamImage: ['fotito'],
      teamColor: ['', { updateOn: 'submit' }]
    })
    this.teamsService.getTeams().subscribe( data => {
      this.teams = data;
    })
  }

  setSelectedTeam(team: Team){
    this.selectedTeam = team
  }

  createTeam(){
    const team: CreateTeamDTO = {
      name: this.formTeam.value.name,
      teamImage: this.formTeam.value.teamImage,
      teamColor: this.formTeam.value.teamColor
    }
    this.teamsService.createTeam(team).subscribe(data =>{
      console.log(data)
      this.teams.unshift(data);
      this.formTeam.reset()
    });
  }

  saveTeam(selectedTeam: Team){
    const team: CreateTeamDTO = {
      name: this.formTeam.value.name,
      teamImage: this.formTeam.value.teamImage,
      teamColor: this.formTeam.value.teamColor
    }
    this.teamsService.saveTeam(selectedTeam.id, team).subscribe(data => {
      this.teams = this.teams.filter(team => team.id != data.id)
      this.teams.unshift(data)
      this.formTeam.reset()
    });
  }

  deleteTeam(team: Team){
    this.teamsService.deleteTeam(team.id).subscribe(data => {
      if(data === null){
        this.teams = this.teams.filter(t => t.id != team.id)
      }
    })
  }

}
