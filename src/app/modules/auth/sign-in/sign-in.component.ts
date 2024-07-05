import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseMediaWatcherModule, FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/core/auth/auth.service';
import { ExternalAuthDto } from 'app/modules/admin/products/products.model';
import { loadProfile } from 'app/modules/admin/store/actions/profile.action';
import { CredentialResponse } from 'google-one-tap';
import { first, Subject, take, takeUntil } from 'rxjs';
declare const google: any;
@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignInComponent implements OnInit, AfterViewInit {

    ngAfterViewInit(): void {
        google.accounts.id.initialize({
            client_id: '379163260313-i6c3hr07ijome29r3d6v91oa1670aavo.apps.googleusercontent.com',
            callback: this.onGoogleSignIn.bind(this),
            auto_select: false,

        });

        google.accounts.id.renderButton(
            document.getElementById('google-signin-button'),
            { theme: 'filled_blue', size: 'large' }
        );
    }

    onGoogleSignIn(response: any): void {

        if (response) {
            this.loading = true;
            this.signInForm.disable();
        }
        const credential = response;

        this.handleCredentialResponse(credential);
        // Handle the credential and perform the login process
    }


    @ViewChild('signInNgForm') signInNgForm: NgForm;
    @ViewChild('googleBtnRef')
    googleBtn?: ElementRef;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    isScreenSmall: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _socialAuthService: SocialAuthService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        public ngZone: NgZone,
        private store: Store,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {



        this._authService.selectedTenantId = "";

        // Create the form
        this.signInForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            rememberMe: ['']
        });




        // @ts-ignore
        // google.accounts.id.initialize({
        //     // Ref: https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration
        //     client_id: '540635749628-mpaq6f8t3v0b5o9erb4isdct90e0o0ra.apps.googleusercontent.com',
        //     callback: this.handleCredentialResponse.bind(this), // Whatever function you want to trigger...
        //     auto_select: true,
        //     cancel_on_tap_outside: false
        // });



        // OPTIONAL: In my case I want to redirect the user to an specific path.
        // @ts-ignore
        google.accounts.id.renderButton(

            document.getElementById("buttonDiv"),
            {
                type: "icon",
                theme: 'outline',
                logo_alignment: "center",
                shape: "circle",
                size: "medium",
                width: 100
            }
        );


        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');

            });




    }

    handleCredentialResponse(response: CredentialResponse) {

        // Decoding  JWT token...

        const externalAuth: ExternalAuthDto = {
            provider: "Google",
            idToken: response.credential
        }
        this.validateExternalAuth(externalAuth)
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    loading: boolean = false;
    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService.signIn(this.signInForm.value)
            .subscribe((response) => {


                if (response.code == 200) {

                    debugger;
                    // Set the redirect url.
                    // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                    // to the correct page after a successful sign in. This way, that url can be set via
                    // routing file and we don't have to touch here.
                    this.store.dispatch(loadProfile());
                    if (this._authService.selectQuestionnaireComplete || this._authService.isRoleInUser) {
                        if (this._authService.selectedTenantId) {
                            const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/store-signed-in-redirect';
                            this._router.navigateByUrl(redirectURL);
                        }
                        else {
                            const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
                            this._router.navigateByUrl(redirectURL);
                        }
                    }
                    else {
                        const redirectURL = '/questionnaires';
                        this._router.navigateByUrl(redirectURL);
                    }


                    // Navigate to the redirect url

                }
                else {
                    // Re-enable the form
                    this.signInForm.enable();

                    // Reset the form                 

                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: 'Wrong email or password'
                    };

                    // Show the alert
                    this.showAlert = true;
                }


            }
            );
    }

    /**
     * Sign in Google
     */

    // signInWithGoogle(): void {
    //     this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
    //         .then((userData) => {
    //             // Send the user data to the ASP.NET Core backend
    //             // and handle the custom fields as needed
    //         });
    // }

    // externalLogin = () => {
    //     //this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);

    //     const event = new MouseEvent('click', {
    //         view: window,
    //         bubbles: false,
    //         cancelable: true
    //     })
    //     this.googleBtn?.nativeElement.dispatchEvent(event);
    //     this._authService.signInWithGoogle();
    //     // this._authService.extAuthChanged.subscribe(user => {
    //     //     const externalAuth: ExternalAuthDto = {
    //     //         provider: user.provider,
    //     //         idToken: user.idToken
    //     //     }
    //     //     this.validateExternalAuth(externalAuth);
    //     // })
    // }
    private validateExternalAuth(externalAuth: ExternalAuthDto) {

        this.loading = true;
        this.signInForm.disable();
        this._authService.externalLogin(externalAuth)
            .subscribe({
                next: (res) => {
                    this.signInForm.enable();
                    this.loading = false;
                    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
                    // Navigate to the redirect url
                    this.ngZone.run(() => {
                        this._router.navigateByUrl(redirectURL);
                    })
                },

            });
    }
}
