import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import {
  DateAdapter,
  MatRippleModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { TranslocoModule } from "@ngneat/transloco";
import { NgApexchartsModule } from "ng-apexcharts";
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from "@angular/material-moment-adapter";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import {
  NgxMatDateAdapter,
  NgxMatDateFormats,
  NgxMatDatetimePickerModule,
  NGX_MAT_DATE_FORMATS,
} from "@angular-material-components/datetime-picker";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { CreateEditLocationComponent } from "app/modules/admin/location/create-edit-location/create-edit-location.component";
import { CreateFieldComponent } from "app/modules/admin/fields/create-field/create-field.component";
import { MatTreeModule } from "@angular/material/tree";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { FieldsBuilderCreateComponent } from "app/modules/admin/fields/fields-builder/fields-builder-create/fields-builder-create.component";
import { NgxPopperModule } from "ngx-popper";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { StoreModule } from "@ngrx/store";
import { fieldsReducer } from "app/modules/admin/store/reducers/fields.reducer";
import { EffectsModule } from "@ngrx/effects";
import { FieldsEffects } from "app/modules/admin/store/effects/fields.effects";
import { ProductTypeEffects } from "app/modules/admin/store/effects/productType.effects";
import { productTypeReducer } from "app/modules/admin/store/reducers/productType.reducer";
import { userDefinedFieldsReducer } from "app/modules/admin/store/reducers/userDefinedFields.reducets";
import { UserDefinedFieldsEffects } from "app/modules/admin/store/effects/userDefinedFields.effects";
import { locationReducer } from "app/modules/admin/store/reducers/location.reducer";
import { LocationEffects } from "app/modules/admin/store/effects/location.effects";
import { formsReducer } from "app/modules/admin/store/reducers/forms.reducers";
import { FormEffects } from "app/modules/admin/store/effects/form.effects";
import { UploadWizardComponent } from "app/modules/admin/upload/upload-wizard/upload-wizard.component";
import { MatStepperModule } from "@angular/material/stepper";
import { FuseCardModule } from "@fuse/components/card";
import { SpreadsheetAllModule } from "@syncfusion/ej2-angular-spreadsheet";
import { UploaderModule } from "@syncfusion/ej2-angular-inputs";
import { MatExpansionModule } from "@angular/material/expansion";
import { historyReducer } from "app/modules/admin/store/reducers/history.reducer";
import { HistoryEffects } from "app/modules/admin/store/effects/history.effect";
import { SkeletonComponent } from "app/modules/admin/skeleton/skeleton.component";
import { SpinnerViewComponent } from "app/modules/admin/spinner-view/spinner-view.component";
import { SafeHtmlPipe } from "app/modules/admin/upload/upload/safe-html.pipe";
import { Select2Module } from "ng-select2-component";
import { timeZoneReducer } from "app/modules/admin/store/reducers/timezone.reducer";
import { TimeZoneEffects } from "app/modules/admin/store/effects/timezone.effect";
import { CustomMomentDateAdapter } from "app/modules/directives/CustomMomentDateAdapter";
import { CustomNgxDatetimeAdapter } from "app/modules/directives/CustomNgxDatetimeAdapter";
//import { BarcodeScanComponent } from 'app/modules/admin/barcode-scan/barcode-scan.component';
import {
  barcodeConfigureReducer,
  barcodeDefaultConfigureReducer,
} from "app/modules/admin/store/reducers/barcode.reducer";
import { BarcodeConfigureEffects } from "app/modules/admin/store/effects/barcode.effect";
import { headerColumnReducer } from "app/modules/admin/store/reducers/header.reducers";
import { HeaderColumnEffects } from "app/modules/admin/store/effects/header.effects";
import { BarcodeScanComponent } from "app/layout/common/barcode-scan/barcode-scan.component";

const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: "DD/MM/YYYY", // this is how your date will be parsed from Input
  },
  display: {
    dateInput: "DD/MM/YYYY", // this is how your date will get displayed on the Input
    monthYearLabel: "MMMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};
const CUSTOM_DATETIME_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: "l, LTS",
  },
  display: {
    dateInput: "MM-DD-YYYY HH:mm a",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

@NgModule({
  declarations: [
    CreateEditLocationComponent,
    CreateFieldComponent,
    FieldsBuilderCreateComponent,
    UploadWizardComponent,
    SkeletonComponent,
    SpinnerViewComponent,
    SafeHtmlPipe,
    BarcodeScanComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    NgxSkeletonLoaderModule.forRoot({
      animation: "pulse",
      loadingText: "This item is actually loading...",
    }),
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSidenavModule,
    MatSortModule,
    NgxMatDatetimePickerModule,
    MatTabsModule,
    MatTableModule,
    NgApexchartsModule,
    TranslocoModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    MatTooltipModule,
    // NgxMatMomentModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatRadioModule,
    NgxMaterialTimepickerModule,
    NgxPopperModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature("headerColumns", headerColumnReducer),
    EffectsModule.forFeature([HeaderColumnEffects]),
    StoreModule.forFeature("myFields", fieldsReducer),
    EffectsModule.forFeature([FieldsEffects]),
    StoreModule.forFeature("productType", productTypeReducer),
    EffectsModule.forFeature([ProductTypeEffects]),
    StoreModule.forFeature("userDefinedFileds", userDefinedFieldsReducer),
    EffectsModule.forFeature([UserDefinedFieldsEffects]),
    StoreModule.forFeature("myLocation", locationReducer),
    EffectsModule.forFeature([LocationEffects]),
    StoreModule.forFeature("Forms", formsReducer),
    EffectsModule.forFeature([FormEffects]),
    StoreModule.forFeature("histories", historyReducer),
    EffectsModule.forFeature([HistoryEffects]),
    StoreModule.forFeature("timezones", timeZoneReducer),
    EffectsModule.forFeature([TimeZoneEffects]),
    StoreModule.forFeature("barcodeConfigure", barcodeConfigureReducer),
    EffectsModule.forFeature([BarcodeConfigureEffects]),
    StoreModule.forFeature(
      "barcodeDefaultConfigure",
      barcodeDefaultConfigureReducer
    ),
    EffectsModule.forFeature([BarcodeConfigureEffects]),
    MatStepperModule,
    FuseCardModule,
    SpreadsheetAllModule,
    UploaderModule,
    MatExpansionModule,
    Select2Module,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    NgxSkeletonLoaderModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    NgApexchartsModule,
    TranslocoModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatRadioModule,
    CreateEditLocationComponent,
    CreateFieldComponent,
    MatTreeModule,
    NgxMaterialTimepickerModule,
    FieldsBuilderCreateComponent,
    NgxPopperModule,
    MatProgressSpinnerModule,
    UploadWizardComponent,
    MatStepperModule,
    FuseCardModule,
    SpreadsheetAllModule,
    UploaderModule,
    MatExpansionModule,
    SkeletonComponent,
    SpinnerViewComponent,
    SafeHtmlPipe,
    Select2Module,
    BarcodeScanComponent,
  ],

  providers: [
    {
      provide: DateAdapter,
      useClass: CustomMomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    {
      provide: NgxMatDateAdapter,
      useClass: CustomNgxDatetimeAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATETIME_FORMATS },
  ],
})
export class SharedModule {}
