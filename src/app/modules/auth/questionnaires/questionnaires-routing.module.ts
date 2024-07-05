import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionnariesComponent } from './questionnaires.component';

const routes: Routes = [

  { path: '', component: QuestionnariesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionnariesRoutingModule { }
