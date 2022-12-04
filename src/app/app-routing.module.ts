import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { TeamsComponent } from './teams/teams.component';
import { UsersComponent } from './users/users.component';

const ROUTES : Routes = [
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
  { path: 'users', component: UsersComponent, pathMatch: 'full' },
  { path: 'tasks', component: TasksComponent, pathMatch: 'full' },
  { path: 'teams', component: TeamsComponent, pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];


@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
