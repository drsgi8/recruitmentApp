import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from "../list/list.component";

const routes: Routes = [
  { path: '',
    redirectTo: '/list/1',
    pathMatch: 'full' },
  { path: 'list',
    redirectTo: '/list/1',
    pathMatch: 'full' },
  { path: 'list/:page',
    component: ListComponent }];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
