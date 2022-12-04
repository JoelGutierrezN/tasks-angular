import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TeamService{

  private apiTeams: string = 'http://localhost:2000/api/teams'

  constructor(private httpClient:HttpClient) {}

  protected getTeams(){
      return this.httpClient.get(this.apiTeams);
  }

}
