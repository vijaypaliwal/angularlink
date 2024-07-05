import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { select, Store } from '@ngrx/store';
import { selectUser } from 'app/modules/admin/store/selectors/profile.selector';
import { loadProfile } from 'app/modules/admin/store/actions/profile.action';
import { deepCopy } from 'app/modules/admin/products/products.model';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user'
})
export class UserComponent implements OnInit, OnDestroy {
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;
    user: User;
    isQuestionnaireCompleted: boolean = false;
    isRoleInUser: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _userService: UserService,
        private store: Store,
        private _authService: AuthService
    ) {

        this.store.dispatch(loadProfile());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {


        this.isQuestionnaireCompleted = this._authService.selectQuestionnaireComplete
        this.isRoleInUser = this._authService.isRoleInUser;
        debugger;
        this.store.pipe(select(selectUser)).subscribe(res => {
            if (res) {
                this.user = res;
                this._userService.user = res
                //this.user = deepCopy(res);
            }
        })

        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
        // Subscribe to user changes

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the user status
     *
     * @param status
     */
    updateUserStatus(status: string): void {
        // Return if user is not available
        if (!this.user) {
            return;
        }

        // Update the user
        this._userService.update({
            ...this.user,
            status
        }).subscribe();
    }

    /**
     * Sign out
     */
    signOut(): void {
        this._router.navigate(['/sign-out']);
    }

    gotoSettings(): void {
        this._router.navigate(['/settings']);
    }

    //store management
    storeManage(): void {
        localStorage.removeItem('accessAPIKey');
        localStorage.removeItem('accessAPISecret');
        this._router.navigate(['/store-login']);
    }
}
