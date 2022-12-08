import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {CreateTeamDTO, Team} from "../teams/interfaces/team.model";

@Injectable({
  providedIn: 'root'
})
export class TeamService{

  private apiTeams: string = 'http://localhost:2000/api/teams'

  constructor(private http: HttpClient) {}

  public getTeams(){
      return this.http.get<Team[]>(this.apiTeams)
  }
  public createTeam(data: CreateTeamDTO){
    return this.http.post<Team>(this.apiTeams, data)
  }
  public saveTeam(id: number, team: CreateTeamDTO){
    return this.http.put<Team>(`${this.apiTeams}/${id}`, team);
  }
  public deleteTeam(id: number){
    return this.http.delete<null>(`${this.apiTeams}/${id}`);
  }

}
