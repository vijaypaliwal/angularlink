import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { SharedModule } from 'app/shared/shared.module';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { RouterModule } from '@angular/router';
import { UserModule } from 'app/layout/common/user/user.module';
import { NotificationsModule } from 'app/layout/common/notifications/notifications.module';



@NgModule({
  declarations: [
    StoreComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FuseLoadingBarModule,
    SharedModule,
    UserModule,
    NotificationsModule,
  ],
  exports: [
    StoreComponent
  ]
})
export class StoreModuleFeature { }
