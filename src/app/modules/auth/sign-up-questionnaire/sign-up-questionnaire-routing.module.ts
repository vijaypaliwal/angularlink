import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpQuestionnaireComponent } from './sign-up-questionnaire.component';

const routes: Routes = [
  {
    path: '',
    component: SignUpQuestionnaireComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpQuestionnaireRoutingModule { }
