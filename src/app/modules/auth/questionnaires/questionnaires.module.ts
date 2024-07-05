import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionnariesRoutingModule } from './questionnaires-routing.module';
import { QuestionnariesComponent } from './questionnaires.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    QuestionnariesComponent,
  ],
  imports: [
    CommonModule,
    QuestionnariesRoutingModule,
    SharedModule,
  ]
})
export class QuestionnariesModule { }
