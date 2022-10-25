import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskListPage } from './task-list.page';

const routes: Routes = [
  {
    path: 'task-list',
    component: TaskListPage
  },
  // {
  //   path: 'task-list/:id',
  //   component: TaskListPage
  // },
  {
    path: '',
    redirectTo: '/task-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskListPageRoutingModule {}
