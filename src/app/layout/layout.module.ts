import { NgModule } from '@angular/core';
import { LayoutComponent } from 'app/layout/layout.component';
import { EmptyLayoutModule } from 'app/layout/layouts/empty/empty.module';
import { CenteredLayoutModule } from 'app/layout/layouts/horizontal/centered/centered.module';
import { EnterpriseLayoutModule } from 'app/layout/layouts/horizontal/enterprise/enterprise.module';
import { MaterialLayoutModule } from 'app/layout/layouts/horizontal/material/material.module';
import { ModernLayoutModule } from 'app/layout/layouts/horizontal/modern/modern.module';
import { ClassicLayoutModule } from 'app/layout/layouts/vertical/classic/classic.module';
import { ClassyLayoutModule } from 'app/layout/layouts/vertical/classy/classy.module';
import { CompactLayoutModule } from 'app/layout/layouts/vertical/compact/compact.module';
import { DenseLayoutModule } from 'app/layout/layouts/vertical/dense/dense.module';
import { FuturisticLayoutModule } from 'app/layout/layouts/vertical/futuristic/futuristic.module';
import { ThinLayoutModule } from 'app/layout/layouts/vertical/thin/thin.module';
import { SettingsModule } from 'app/layout/common/settings/settings.module';
import { SharedModule } from 'app/shared/shared.module';
import { StoreModuleFeature } from './layouts/store/store.module';
import { EffectsFeatureModule, EffectsModule } from '@ngrx/effects';
import { LayoutSettingsEffects } from 'app/modules/admin/store/effects/layoutsettings.effects';
import { StoreModule } from '@ngrx/store';
import { layoutSettingsReducer } from 'app/modules/admin/store/reducers/layoutsettings.reducer';
import { profileReducer } from 'app/modules/admin/store/reducers/profile.reducer';
import { ProfileEffects } from 'app/modules/admin/store/effects/profile.effects';


const layoutModules = [
    // Empty
    EmptyLayoutModule,

    // Horizontal navigation
    CenteredLayoutModule,
    EnterpriseLayoutModule,
    MaterialLayoutModule,
    ModernLayoutModule,

    // Vertical navigation
    ClassicLayoutModule,
    ClassyLayoutModule,
    CompactLayoutModule,
    DenseLayoutModule,
    FuturisticLayoutModule,
    ThinLayoutModule,
    StoreModuleFeature,

];

@NgModule({
    declarations: [
        LayoutComponent,
    ],
    imports: [
        SharedModule,
        SettingsModule,
        StoreModule.forFeature("configuration", layoutSettingsReducer),
        EffectsModule.forFeature([LayoutSettingsEffects]),
        StoreModule.forFeature("Profile", profileReducer),
        EffectsModule.forFeature([ProfileEffects]),
        ...layoutModules
    ],
    exports: [
        LayoutComponent,
        ...layoutModules
    ]
})
export class LayoutModule {
}
