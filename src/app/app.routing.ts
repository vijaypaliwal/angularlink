import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { AuthStoreGuard } from './core/auth/guards/auth-store.guard';


// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    { path: '', pathMatch: 'full', redirectTo: 'store-login' },

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'store-login' },


    { path: 'store-signed-in-redirect', pathMatch: 'full', redirectTo: 'products' },
    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        // canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule) },
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule) },
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule) },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
            // { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule) },
            { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up-questionnaire/sign-up-questionnaire.module').then(m => m.SignUpQuestionnaireModule) },
            { path: 'tag-sample', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule) }
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
            { path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule) }
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule) },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        //canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'products', loadChildren: () => import('app/modules/admin/products/products.module').then(m => m.ProductModule) },
        ]
    },

    {
        path: '',
        canActivate: [AuthGuard],
        //canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'product-type', loadChildren: () => import('app/modules/admin/product-type/product-type.module').then(m => m.ProductTypeModule) },
        ]
    },


    {
        path: '',
        canActivate: [AuthGuard],
        //canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'user-defined', loadChildren: () => import('app/modules/admin/user-defined-fields/user-defined-fields.module').then(m => m.UserDefinedFieldsModule) },
        ]
    },
    {
        path: '',
        canActivate: [AuthGuard],
        //canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'location', loadChildren: () => import('app/modules/admin/location/location.module').then(m => m.LocationModule) },
        ]
    },
    {
        path: '',
        canActivate: [AuthGuard],
        //canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'barcode-label', loadChildren: () => import('app/modules/admin/barcode-label-configurations/barcode-label-configurations.module').then(m => m.BarcodeLabelConfigurationsModule) },
        ]
    },
    {
        path: '',
        canActivate: [AuthGuard],
        //canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'barcode-scan', loadChildren: () => import('app/modules/admin/barcode-scan/barcode-scan.module').then(m => m.BarcodeScanModule) },
        ]
    },
    {
        path: '',
        canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'store'
        },
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'store-login', loadChildren: () => import('app/modules/admin/inventory/inventory.module').then(m => m.InventoryModule) },
        ]
    },
    // {
    //     path: '',
    //     //canActivate: [AuthGuard],
    //     canActivateChild: [AuthGuard],
    //     component: LayoutComponent,
    //     data: {
    //         layout: 'store'
    //     },
    //     resolve: {
    //         initialData: InitialDataResolver,
    //     },
    //     children: [
    //         { path: 'store-login', loadChildren: () => import('app/modules/admin/tenants/tenants.module').then(m => m.TenantsModule) },
    //     ]
    // },

    {
        path: '',
        canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'store'
        },
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'settings', loadChildren: () => import('app/modules/admin/settings/settings.module').then(m => m.SettingsModule) },
        ]
    },
    {
        path: '',
        canActivate: [AuthGuard],
        //canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'modern'
        },
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'error403', loadChildren: () => import('app/modules/admin/error403/error403.module').then(m => m.Error403Module) },
        ]
    },
    {
        path: '',
        canActivate: [AuthGuard],
        //canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'modern'
        },
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'fields', loadChildren: () => import('app/modules/admin/fields/fields.module').then(m => m.FieldsModule) },
        ]
    },
    {
        path: '',
        canActivate: [AuthGuard],
        //canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'modern'
        },
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'custom-actions', loadChildren: () => import('app/modules/admin/custom-actions/custom-actions.module').then(m => m.CustomActionsModule) },
        ]
    },

    {
        path: '',
        canActivate: [AuthGuard],
        //canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'modern'
        },
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'form-builder', loadChildren: () => import('app/modules/admin/form-builder/form-builder.module').then(m => m.FormBuilderModule) },
        ]
    },

    {
        path: '',
        canActivate: [AuthGuard],
        //canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'modern'
        },
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'history', loadChildren: () => import('app/modules/admin/history/history.module').then(m => m.HistoryModule) },
        ]
    },

    {
        path: '',
        canActivate: [AuthGuard],
        //canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'modern'
        },
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'upload', loadChildren: () => import('app/modules/admin/upload/upload.module').then(m => m.UploadModule) },
        ]
    },

    {
        path: '',
        canActivate: [AuthGuard],
        //canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'modern'
        },
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'Settings', loadChildren: () => import('app/modules/admin/general-settings/general-settings.module').then(m => m.GeneralSettingsModule) },
        ]
    },

    {
        path: '',
        canActivate: [AuthGuard],
        //canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'store'
        },
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'questionnaires', loadChildren: () => import('app/modules/auth/questionnaires/questionnaires.module').then(m => m.QuestionnariesModule) },
        ]
    }

];
