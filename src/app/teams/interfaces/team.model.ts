export interface Team {
  id: number;
  name: string;
  teamImage: string;
  teamColor: string;
  tasks: any[];
  users: any[];
}

export interface CreateTeamDTO extends Omit<Team, 'id' | 'tasks' | 'users'>{}
