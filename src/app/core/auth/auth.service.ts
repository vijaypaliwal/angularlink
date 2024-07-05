import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of, Subject, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { ExternalAuthDto } from 'app/modules/admin/products/products.model';

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;
    private authChangeSub = new Subject<boolean>();
    private extAuthChangeSub = new Subject<SocialUser>();
    public authChanged = this.authChangeSub.asObservable();
    public extAuthChanged = this.extAuthChangeSub.asObservable();
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private externalAuthService: SocialAuthService
    ) {
        this.externalAuthService.authState.subscribe((user) => {
            //console.log(user)
            this.extAuthChangeSub.next(user);
        })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */

    set refreshToken(token: string) {
        localStorage.setItem('refreshToken', token);
    }

    get refreshToken(): string {
        return localStorage.getItem('refreshToken') ?? '';
    }

    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    set accessAPIKey(token: string) {
        localStorage.setItem('accessAPIKey', token);
    }

    get accessAPIKey(): string {
        return localStorage.getItem('accessAPIKey') ?? '';
    }

    set accessAPISecret(token: string) {
        localStorage.setItem('accessAPISecret', token);
    }

    get accessAPISecret(): string {
        return localStorage.getItem('accessAPISecret') ?? '';
    }

    set selectedTenant(name: string) {
        localStorage.setItem('selectedTenantName', name);
    }
    get selectedTenant(): string {
        return localStorage.getItem('selectedTenantName') ?? '';
    }

    set selectedTenantId(name: string) {
        localStorage.setItem('selectedTenantId', name);
    }
    get selectedTenantId(): string {
        return localStorage.getItem('selectedTenantId') ?? '';
    }

    set selectQuestionnaireComplete(isCompleted: boolean) {
        const stringValue = isCompleted ? 'true' : 'false';
        localStorage.setItem('isQuestionnaireCompleted', stringValue);
    }

    get selectQuestionnaireComplete(): boolean {
        const storedValue = localStorage.getItem('isQuestionnaireCompleted');
        return storedValue === 'true'; // Convert the string to a boolean
    }

    set isRoleInUser(isRoleInUser: boolean) {
        const stringValue = isRoleInUser ? 'true' : 'false';
        localStorage.setItem('isRoleInUser', stringValue);
    }

    get isRoleInUser(): boolean {
        const storedValue = localStorage.getItem('isRoleInUser');
        return storedValue === 'true'; // Convert the string to a boolean
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     * @param clientURL
     */
    forgotPassword(model: any): Observable<any> {
        return this._httpClient.post(`${environment.gobalAccountService}Account/forgot-password`, model);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post(`${environment.gobalAccountService}Account/reset-password`, password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(`${environment.identityLoginServer}Account/login`, credentials).pipe(
            switchMap((response: any) => {

                if (response.code == 200) {
                    // Store the access token in the local storage
                    debugger;
                    this.accessToken = response.entity.accessToken;
                    // this.accessToken = response.entity.Token;
                    this.refreshToken = response.entity.refreshToken;

                    this.selectQuestionnaireComplete = response.entity.isQuestionnaireComplete;

                    this.isRoleInUser = response.entity.isRoleUser
                    // this.refreshToken = response.entity.RefreshToken;
                    // Set the authenticated flag to true
                    this._authenticated = true;

                    if (response.entity.inventoryId) {
                        this.selectedTenantId = response.entity.inventoryId
                    }
                    if (response.entity.inventoryName) {
                        this.selectedTenant = response.entity.inventoryName
                    }
                    // Store the user on the user service
                    this._userService.user = response.entity;
                    localStorage.setItem("user", JSON.stringify(response.entity));
                }

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Sign in using the token
        return this._httpClient.post('api/auth/sign-in-with-token', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Replace the access token with the new one if it's available on
                // the response object.
                //
                // This is an added optional step for better security. Once you sign
                // in using the token, you should generate a new one on the server
                // side and attach it to the response object. Then the following
                // piece of code can replace the token with the refreshed one.
                if (response.accessToken) {
                    this.accessToken = response.accessToken;
                }

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }


    questionnaireCompleted() {
        return this.selectQuestionnaireComplete;
        //return this._httpClient.get(`${environment.identityLoginServer}Questionnaire/completed`)
    }

    public loginWithGoogle() {
        return this._httpClient.get<any>(`${environment.gobalAccountService}Account/ExternalLogin`,
            {
                params: new HttpParams().set('provider', 'Google'),
                headers: new HttpHeaders()
                    .set('Access-Control-Allow-Headers', 'Content-Type')
                    .set('Access-Control-Allow-Methods', 'GET')
                    .set('Access-Control-Allow-Origin', '*')
            })
            .pipe(map(data => {
                return data;
            }));
    }

    public signInWithGoogle = () => {
        this.externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    public externalLogin = (body: ExternalAuthDto) => {
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }
        return this._httpClient.post(`${environment.identityLoginServer}Account/external-login`, body).pipe(
            switchMap((response: any) => {



                if (response.code == 200) {
                    // Store the access token in the local storage

                    this.accessToken = response.entity.accessToken;
                    // this.accessToken = response.entity.Token;
                    this.refreshToken = response.entity.refreshToken;
                    // this.refreshToken = response.entity.RefreshToken;
                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = response.entity;
                    localStorage.setItem("user", JSON.stringify(response.entity));
                }

                // Return a new observable with the response
                return of(response);
            })
        );

    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage

        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        localStorage.removeItem('accessAPIKey');
        localStorage.removeItem('accessAPISecret');
        localStorage.removeItem('selectedTenantId');
        localStorage.removeItem('selectQuestionnaireComplete');
        localStorage.removeItem('isRoleInUser');
        this._userService.user = null;
        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string }): Observable<any> {

        return this._httpClient.post(`${environment.identityLoginServer
            }Account/register-user`, user).pipe(
                switchMap((response: any) => {
                    // Return a new observable with the response
                    return of(response);
                })
            );

        // return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
    * Sign up
    *
    * @param user
    */
    signUpQuestionnaire(user: { name: string; email: string; password: string }): Observable<any> {

        return this._httpClient.post(`${environment.identityLoginServer
            }Account/register-user-with-questionnarie`, user).pipe(
                switchMap((response: any) => {
                    // Return a new observable with the response
                    return of(response);
                })
            );

        // return this._httpClient.post('api/auth/sign-up', user);
    }


    storeLogin(tenant) {
        // Store API

        this.accessAPIKey = tenant.APIKey;
        this.accessAPISecret = tenant.Id;
        this.selectedTenant = tenant.Name;
    }

    inventoryLogin(inventory) {
        this.selectedTenantId = inventory.id;
        this.selectedTenant = inventory.name;
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }

    checkStore(): Observable<boolean> {
        // Check if the user is logged in
        if (!this.accessAPIKey) {
            return of(false);
        }
        // If the access token exists and it didn't expire, sign in using it
        return of(true)
    }


}
