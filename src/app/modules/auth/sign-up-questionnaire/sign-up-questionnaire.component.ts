import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/core/auth/auth.service';
import { matchPassword } from 'app/modules/admin/products/products.model';
import { loadProfile } from 'app/modules/admin/store/actions/profile.action';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'sign-up-questionnaire',
  templateUrl: './sign-up-questionnaire.component.html',
  styleUrls: ['./sign-up-questionnaire.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class SignUpQuestionnaireComponent implements OnInit {
  @ViewChild('signUpNgForm') signUpNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  signUpForm: UntypedFormGroup;
  showAlert: boolean = false;
  submitted: boolean = false;
  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _formBuilder: UntypedFormBuilder,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _router: Router,
    private store: Store,
  ) {
  }

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  isScreenSmall: boolean = false;

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.signUpForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validator: matchPassword }
    );

    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {

        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('md');

      });

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  get f() { return this.signUpForm.controls; }
  /**
   * Sign up
   */
  signUp(): void {
    this.submitted = true
    // Do nothing if the form is invalid
    if (this.signUpForm.invalid) {
      return;
    }



    // Disable the form
    this.signUpForm.disable();

    // Hide the alert
    this.showAlert = false;
    // Sign up
    this._authService.signUpQuestionnaire(this.signUpForm.value)
      .subscribe((response) => {


        if (response.code == 200) {
          // Set the redirect url.
          // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
          // to the correct page after a successful sign in. This way, that url can be set via
          // routing file and we don't have to touch here.
          // const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

          // // Navigate to the redirect url
          // this._router.navigateByUrl(redirectURL);
          this.submitted = false
          this._authService.signIn(this.signUpForm.value).subscribe(res => {
            {

              this.store.dispatch(loadProfile());
              if (this._authService.selectQuestionnaireComplete) {
                const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
                this._router.navigateByUrl(redirectURL);
              }
              else {
                const redirectURL = '/questionnaires';
                this._router.navigateByUrl(redirectURL);
              }
            };
          })

          // this._router.navigateByUrl('/confirmation-required');
        }
        else {
          // Re-enable the form
          this.signUpForm.enable();

          // Reset the form
          this.signUpNgForm.resetForm();
          this.submitted = false
          // Set the alert
          this.alert = {
            type: 'error',
            message: response.message
          };

          // Show the alert
          this.showAlert = true;
        }


      });
  }
}
