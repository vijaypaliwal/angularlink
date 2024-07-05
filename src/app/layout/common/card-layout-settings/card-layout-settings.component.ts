import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { select, Store } from '@ngrx/store';
import { AppConfig, Scheme, Theme, Themes } from 'app/core/config/app.config';
import { Layout } from 'app/layout/layout.types';
import { deepCopy } from 'app/modules/admin/products/products.model';
import { loadLayoutSettings } from 'app/modules/admin/store/actions/layoutsettings.action';
import { selectConfigurations } from 'app/modules/admin/store/selectors/layoutsetting.selector';
import { result } from 'lodash';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'card-layout-settings',
  templateUrl: './card-layout-settings.component.html',
  styles: [
    `
            card-layout-settings {
                position: static;
                display: block;
                flex: none;
                width: auto;
            }

            @media (screen and min-width: 1280px) {

                empty-layout + card-layout-settings .settings-cog {
                    right: 0 !important;
                }
            }
        `
  ],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./card-layout-settings.component.scss']
})
export class CardLayoutSettingsComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  configId: string;
  config: AppConfig;
  layout: Layout;
  scheme: 'dark' | 'light';
  theme: string;
  themes: Themes;
  checkbox: boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  isScreenSmall: boolean = false;
  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    public _snackbar: MatSnackBar,
    private _fuseConfigService: FuseConfigService,
    private store: Store,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to config changes

    this.store.pipe(select(selectConfigurations)).subscribe((res: any) => {
      if (res.data) {
        let entity = deepCopy(res.data);
        this.configId = entity.Id;
        this.config = JSON.parse(entity.ConfigSettings);
        this._fuseConfigService.config = this.config;
      }
    })

    this.store.dispatch(loadLayoutSettings());

    // this.getCustomLayoutSettings();
    this._fuseConfigService.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: AppConfig) => {

        // Store the config
        this.config = config;

      });
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {

        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('md');

      });
  }

  getCustomLayoutSettings() {
    this._fuseConfigService.getLayout().subscribe(res => {

      if (res.code == 200) {

        this.configId = res.entity.Id;
        this.config = JSON.parse(res.entity.ConfigSettings);
        this._fuseConfigService.config = this.config;
      }

    })
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
   * Set the layout on the config
   *
   * @param layout
   */
  setLayout(layout: string): void {
    // Clear the 'layout' query param to allow layout changes
    this._router.navigate([], {
      queryParams: {
        layout: null
      },
      queryParamsHandling: 'merge'
    }).then(() => {

      // Set the config
      this._fuseConfigService.config = { layout };
    });
  }

  /**
   * Set the cardLayout on the config
   *
   * @param cardLayout 
   */
  setScheme(scheme: Scheme): void {
    this._fuseConfigService.config = { scheme };
  }

  setCardLayout(cardLayout: string): void {
    this._fuseConfigService.config = { cardLayout }
  }
  setGridLayout(gridLayout: string): void {
    this._fuseConfigService.config = { gridLayout }
  }

  /**
   * Set the theme on the config
   *
   * @param theme
   */
  setTheme(theme: Theme): void {
    this._fuseConfigService.config = { theme };
  }

  loadingSpinner = false;

  saveLayout() {
    this.loadingSpinner = true;
    if (this.configId) {

      let settingsViewModel = {
        "configSettings": JSON.stringify(this.config),
        "Id": this.configId
      }
      this._fuseConfigService.updateLayout(this.configId, settingsViewModel).subscribe(res => {

        if (res.code == 200) {
          this._snackbar.open("Successfully Updated", "close", {
            duration: 2000, panelClass: ['success-snackbar'], horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }

      });
      this.loadingSpinner = false;
    }
    else {
      let settingsViewModel = {
        "configSettings": JSON.stringify(this.config),
        "Id": this.configId
      }
      this._fuseConfigService.saveLayout(settingsViewModel).subscribe(res => {

        if (res.code == 200) {
          this.configId = res.entity.Id;
          this._snackbar.open("Successfully Added", "close", {
            duration: 2000, panelClass: ['success-snackbar'], horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      });
      this.loadingSpinner = false;
    }
  }
}
