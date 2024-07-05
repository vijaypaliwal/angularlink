import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config';
import { select, Store } from '@ngrx/store';
import { Theme } from 'app/core/config/app.config';
import { deepCopy, weightUnit } from 'app/modules/admin/products/products.model';
import { SpinnerViewService } from 'app/modules/admin/spinner-view/spinner-view.service';
import { loadProfile } from 'app/modules/admin/store/actions/profile.action';
import { loadTimeZones } from 'app/modules/admin/store/actions/timezone.action';
import { selectConfigurations } from 'app/modules/admin/store/selectors/layoutsetting.selector';
import { selectTimeZone } from 'app/modules/admin/store/selectors/timezone.selector';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AssestTracking, StockMaintainence } from './questionnairesFields.model';
import { QuestionnairesService } from './questionnaires.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from 'app/core/auth/auth.service';
import { Router } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ProductService } from 'app/modules/admin/products/product.service';


@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.scss']
})
export class QuestionnariesComponent implements OnInit {
  myForm: FormGroup;
  detailsForm: FormGroup;
  selectedOption: string = "none";
  progressValue = 0;
  currentTimeZone;
  questionnairesForm: UntypedFormGroup;
  isSelected = false;
  isScreenSmall = false;
  questionnairesFields: any[] = [];
  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;
  step5 = false;
  showDrawer = false;
  timezones: any[] = [];
  configSubscription: Subscription;
  private config: any;
  weightUnits: any[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('fileInputProfile') fileInputProfile: ElementRef;
  constructor(private _fuseMediaWatcherService: FuseMediaWatcherService, private _cdr: ChangeDetectorRef, private questionnairesService: QuestionnairesService,
    private _router: Router,
    public _snackbar: MatSnackBar, private productService: ProductService, private _authService: AuthService, private _formBuilder: FormBuilder, private store: Store, private _fuseConfigService: FuseConfigService, private spinnerService: SpinnerViewService) {

    this.getTimezoneName();
  }
  getTimezoneName() {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.currentTimeZone = timeZone;
  }
  ngOnInit(): void {
    this.store.dispatch(loadProfile());

    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {


        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('md');

      });

    this.weightUnits = weightUnit;
    this.store.pipe(select(selectTimeZone)).subscribe(res => {
      if (res.timeZones) {
        this.timezones = deepCopy(res.timeZones);

      }
    });

    this.configSubscription = this._fuseConfigService.config$.subscribe((configData) => {
      this.config = configData;
    });

    debugger;
    this.questionnairesForm = this._formBuilder.group({
      step1: this._formBuilder.group({
        organizationLogo: [null],
        organizationName: ['', Validators.required],
      }),
      step2: this._formBuilder.group({
        avatar: [null],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        phoneNumber: ['', Validators.pattern('^[0-9]*$')]
      }),
      step3: this._formBuilder.group({
        inventoryName: ['', [Validators.required]],
        location: [''],
      }),
      step4: this._formBuilder.group({
        defaultTimeZone: [this.currentTimeZone, [Validators.required]],
        defaultdateTimeFormat: ['DD/MM/yyyy', [Validators.required]],
        defaultCurrencyFormat: ['$', [Validators.required]],
        defaultWeight: ['kg'],
      }),
      step5: this._formBuilder.group({
        themeColor: ['', [Validators.required]],
      }),

      // Add more steps and fields as needed
    });
    this.questionnairesForm.get('step1.organizationName').valueChanges.subscribe(value => {
      // Update Step 2 field 1 based on the value of Step 1 field 2
      this.questionnairesForm.get('step3.inventoryName').setValue(value);
    });
    this.store.dispatch(loadTimeZones());
  }

  currentStep = 1;
  backToStep1() {
    this.progressValue = 0;
    this.currentStep = 1;
    this.step2 = false;
    this.step1 = true;
    this.step3 = false;
    this.step4 = false;
    this.step5 = false;
  }

  goToStep2() {
    this.progressValue = 20;
    this.currentStep = 2;
    this.step2 = true;
    this.step1 = false;
    this.step3 = false;
    this.step4 = false;
    this.step5 = false;
  }

  goToStep3() {
    this.progressValue = 40;
    this.currentStep = 3;
    this.step2 = false;
    this.step1 = false;
    this.step3 = true;
    this.step4 = false;
    this.step5 = false;
  }
  goToStep4() {
    this.progressValue = 60;
    this.currentStep = 4;
    this.step2 = false;
    this.step1 = false;
    this.step3 = false;
    this.step4 = true;
    this.step5 = false;
  }
  goToStep5() {
    this.progressValue = 80;
    this.currentStep = 5;
    this.step2 = false;
    this.step1 = false;
    this.step3 = false;
    this.step4 = false;
    this.step5 = true;
  }

  isShowField = false;
  createType() {
    this.isShowField = !this.isShowField;
  }


  submitQuestionnaries() {
    this.progressValue = 80;
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

  openDrawer() {
    this.showDrawer = true;
  }

  closeDrawer() {
    this.showDrawer = false;
  }
  onRadioChange() {
    if (this.selectedOption === 'assetsTrack') {
      this.showDrawer = true;
      this.questionnairesFields = AssestTracking;
    }
    else if (this.selectedOption === 'manufaturing') {
      this.showDrawer = true;
      this.questionnairesFields = StockMaintainence
    }
    else if (this.selectedOption === 'stockMaintenance') {
      this.showDrawer = true;
      this.questionnairesFields = StockMaintainence;
    }
    else if (this.selectedOption === 'none') {
      this.questionnairesFields = [];
      this.showDrawer = false;
    }
    else {
      this.showDrawer = false
    }
  }


  saveOrganizationWithInventory() {
    debugger;

    const data = {
      Logo: this.questionnairesForm.value.step1.organizationLogo,
      OrganizationName: this.questionnairesForm.value.step1.organizationName,
      FirstName: this.questionnairesForm.value.step2.firstName,
      LastName: this.questionnairesForm.value.step2.lastName,
      Avatar: this.questionnairesForm.value.step2.avatar,
      PhoneNumber: this.questionnairesForm.value.step2.phoneNumber,
      InventoryName: this.questionnairesForm.value.step3.inventoryName,
      InventoryType: this.questionnairesForm.value.step3.inventoryType,
      AccessToken: this._authService.accessToken,
      RefreshToken: this._authService.refreshToken,

    };

    let spinnerRef = this.spinnerService.start("Creating...")
    this.progressValue = 100;
    this.currentStep = 6;
    this.questionnairesService.createOrganizationWithInventory(data)
      .subscribe(res => {

        if (res.code == 200) {
          debugger;
          this._authService.accessToken = res.entity.accessToken;
          this._authService.refreshToken = res.entity.refreshToken;

          this._authService.selectQuestionnaireComplete = res.entity.isQuestionnaireComplete;
          this._authService.selectedTenant = res.entity.inventoryName;
          this._authService.selectedTenantId = res.entity.inventoryId;

          var myData = {
            DefaultTypeName: "General",
            Locations: this.questionnairesForm.value.step3.location ? this.questionnairesForm.value.step3.location : [],
            GeneralSettings: {
              defaultTimeZone: this.questionnairesForm.value.step4.defaultTimeZone,
              defaultDateFormat: this.questionnairesForm.value.step4.defaultdateTimeFormat,
              defaultCurrency: this.questionnairesForm.value.step4.defaultCurrencyFormat,
              defaultWeight: this.questionnairesForm.value.step4.defaultWeight,
            },
            ConfigSettings: JSON.stringify(this.config),
            Fields: this.questionnairesFields.filter(x => x.IsSelected),
          };
          this.questionnairesService.setupInventory(myData).subscribe(res => {
            debugger;
            if (res.code == 200) {
              this.spinnerService.stop(spinnerRef);
              this._snackbar.open("Save Successfully", 'close', {
                duration: 2000, panelClass: ['success-snackbar'], horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
              this._router.navigate(['/products']);
            }
            else {
              this.spinnerService.stop(spinnerRef);
            }
          });
        }
        else {
          this.spinnerService.stop(spinnerRef);
          this._snackbar.open(res.message, 'close', {
            duration: 4000, panelClass: ['warning-snackbar'], horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      })

  }

  selectedFiles: any[] = [];

  uploadOrganizationLogo(fileList: FileList): void {

    debugger;
    // Return if canceled

    if (!fileList.length) {
      return;
    }
    this.selectedFiles = [];

    for (let i = 0; i < fileList.length; i++) {
      this.selectedFiles.push(fileList[i]);
    }
    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = fileList[0];

    // Return if the file is not allowed
    if (!allowedTypes.includes(file.type)) {
      return;
    }
    const maxSize = 1024 * 1024; // 1MB

    if (file.size > maxSize) {

      this._snackbar.open('Maximum file size exceeded (1MB max)', 'close', {
        duration: 4000, panelClass: ['warning-snackbar'], horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      // Reset the file input and display an error message
      return;
    }

    // Upload the avatar
    const formData = new FormData();
    const spinnerRef = this.spinnerService.start("Uploading...");
    this.selectedFiles.forEach((f) => formData.append('files', f));
    this.productService.uploadImages(formData).subscribe(res => {
      this.spinnerService.stop(spinnerRef);

      this.questionnairesForm.get("step1.organizationLogo").setValue(res.entity[0].ImageOrginalURL);
      this._cdr.detectChanges();
    })

  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.onFileChange(files);
  }

  onFileChange(files: FileList) {
    this.uploadOrganizationLogo(files);
  }

  removeImage() {
    this.fileInput.nativeElement.value = '';
    this.questionnairesForm.get("step1.organizationLogo").setValue("");
    this._cdr.detectChanges();
  }


  onFileDropProfile(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.onFileChange(files);
  }

  onFileChangeProfile(files: FileList) {
    this.uploadProfileLogo(files);
  }

  removeImageProfile() {
    this.fileInputProfile.nativeElement.value = '';
    this.questionnairesForm.get("step2.avatar").setValue("");
    this._cdr.detectChanges();
  }

  uploadProfileLogo(fileList: FileList): void {

    debugger;
    // Return if canceled

    if (!fileList.length) {
      return;
    }
    this.selectedFiles = [];

    for (let i = 0; i < fileList.length; i++) {
      this.selectedFiles.push(fileList[i]);
    }
    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = fileList[0];

    // Return if the file is not allowed
    if (!allowedTypes.includes(file.type)) {
      return;
    }
    const maxSize = 1024 * 1024; // 1MB

    if (file.size > maxSize) {

      this._snackbar.open('Maximum file size exceeded (1MB max)', 'close', {
        duration: 4000, panelClass: ['warning-snackbar'], horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      // Reset the file input and display an error message
      return;
    }

    // Upload the avatar
    const formData = new FormData();
    const spinnerRef = this.spinnerService.start("Uploading...");
    this.selectedFiles.forEach((f) => formData.append('files', f));
    this.productService.uploadImages(formData).subscribe(res => {
      this.spinnerService.stop(spinnerRef);

      this.questionnairesForm.get("step2.avatar").setValue(res.entity[0].ImageOrginalURL);
      this._cdr.detectChanges();
    })

  }

  isAddLocation = false;
  addNewLocation() {
    this.isAddLocation = true;
  }


}
