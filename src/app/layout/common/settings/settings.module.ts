import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { SettingsComponent } from 'app/layout/common/settings/settings.component';
import { MatButtonModule } from '@angular/material/button';
import { CardLayoutSettingsComponent } from '../card-layout-settings/card-layout-settings.component';

@NgModule({
    declarations: [
        SettingsComponent,
        CardLayoutSettingsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatTooltipModule,
        FuseDrawerModule,
        MatButtonModule
    ],
    exports: [
        SettingsComponent,
        CardLayoutSettingsComponent
    ]
})
export class SettingsModule {
}
