export interface Task {
  "id": number;
  "title": string;
  "description": string;
  "isBloqued": number;
  "status": number;
  "dueDate": string;
  "createdAt": string;
  "updatedAt": string;
  "finishedAt": string;
  "teamID": number;
  "comments": any[];
}

export interface CreateTaskDTO extends Omit<Task, 'id' | 'comments' | 'finishedAt'>{}
