import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Phase1Component } from './phase1/phase1.component';
import { Phase2Component } from './phase2/phase2.component';

const routes: Routes = [
 {
    path:'',
    component: Phase1Component
  },
  {
    path:'interphase2',
    component: Phase2Component
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
