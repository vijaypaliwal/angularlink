import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpQuestionnaireRoutingModule } from './sign-up-questionnaire-routing.module';
import { SignUpQuestionnaireComponent } from './sign-up-questionnaire.component';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseCardModule } from '@fuse/components/card';
import { FuseAlertModule } from '@fuse/components/alert';


@NgModule({
  declarations: [
    SignUpQuestionnaireComponent
  ],
  imports: [
    CommonModule,
    SignUpQuestionnaireRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FuseCardModule,
    FuseAlertModule,
    SharedModule
  ]
})
export class SignUpQuestionnaireModule { }
