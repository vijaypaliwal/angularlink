import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { FormsModule } from '@angular/forms';
import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from 'environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CustomActionsComponent } from './modules/admin/custom-actions/custom-actions.component';
import { NgxPopperModule } from 'ngx-popper';
import { SpinnerViewComponent } from './modules/admin/spinner-view/spinner-view.component';
import { MatSidenavModule } from '@angular/material/sidenav';

const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent,

    ],
    imports: [
        BrowserModule,
        NgxMatDatetimePickerModule,
        MatSidenavModule,
        NgxSkeletonLoaderModule.forRoot({ animation: 'pulse', loadingText: 'This item is actually loading...' }),
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),
        NgxMatNativeDateModule,
        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),
        NgxMatTimepickerModule,
        // Core module of your application
        CoreModule,
        FormsModule,
        // Layout module of your application
        LayoutModule,
        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        NgxPopperModule.forRoot({ placement: 'bottom' }),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),

    ],
    providers: [
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(
                            // replace this with your google client id			
                            //'540635749628-mpaq6f8t3v0b5o9erb4isdct90e0o0ra.apps.googleusercontent.com'
                            '379163260313-i6c3hr07ijome29r3d6v91oa1670aavo.apps.googleusercontent.com'
                        )
                    }
                ]
            } as SocialAuthServiceConfig,
        },
    ],
    bootstrap: [
        AppComponent
    ],


})
export class AppModule {
}
