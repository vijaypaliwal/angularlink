import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { MatButton } from "@angular/material/button";
import { Subject } from "rxjs";
import { BarcodeScanService } from "./barcode-scan.service";
// import * as ScanditSDK from "scandit-sdk";
declare const Html5QrcodeScanType;
declare const Html5QrcodeScanner;
@Component({
  selector: "app-barcode-scan",
  templateUrl: "./barcode-scan.component.html",
  styleUrls: ["./barcode-scan.component.scss"],
})
export class BarcodeScanComponent implements OnInit, OnDestroy {
  @ViewChild("scanOrigin") private _scanOrigin: MatButton;
  @ViewChild("scanPanel")
  private _scanPanel: TemplateRef<any>;
  private _overlayRef: OverlayRef;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  isScreenSmall = false;
  scannerDemo = false;
  isScanCompleted = false;
  html5QrcodeScanner;
  @Output() scannedValue = new EventEmitter<any>();
  constructor(
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    public scanService: BarcodeScanService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();

    // Dispose the overlay
    if (this._overlayRef) {
      this._overlayRef.dispose();
    }
  }

  closePanel(): void {
    this._overlayRef.detach();
    if (this.html5QrcodeScanner && this.html5QrcodeScanner.shouldPauseVideo)
      this.html5QrcodeScanner.resume();
    if (this.html5QrcodeScanner) this.html5QrcodeScanner.clear();
  }

  openScanner() {
    this.scannerDemo = true;
    this.isScanCompleted = false;

    setTimeout(() => {
      debugger;
      let config = {
        fps: 20,
        qrbox: { width: 350, height: 200 },
        rememberLastUsedCamera: true,
        // Only support camera scan type.
        //  supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA, Html5QrcodeScanType.SCAN_TYPE_FILE]
        supportedScanTypes: [
          Html5QrcodeScanType.SCAN_TYPE_CAMERA,
          Html5QrcodeScanType.SCAN_TYPE_FILE,

          // Add more barcode types as needed
        ],
        supportedFormats: ["ANY"],

        // supportedScanTypes: [
        //   'CAMERA',
        //   'FILE',
        //   'QR_CODE',
        //   'EAN_13',
        //   'CODE_128',
        //   // Add more barcode types as needed
        // ]
      };

      this.html5QrcodeScanner = new Html5QrcodeScanner(
        "userqrreader",
        config,
        /* verbose= */ false
      );

      this.html5QrcodeScanner.render((decodedText, decodedResult) => {
        decodedText;
        // handle the scanned code as you like, for example:
        this.isScanCompleted = true;
        this.scannedValue.emit(decodedText);
        this.closeScanner();
        this.closePanel();
      });
    }, 500);
  }

  closeScanner() {}

  openPanel(event): void {
    event.stopPropagation();
    // Return if the notifications panel or its origin is not defined
    if (!this._scanPanel || !this._scanOrigin) {
      return;
    }

    // ScanditSDK.configure(
    //   "AYjUXQyBKIRZGtmHmytA6wklGVUpLfmabnp88eRuONGpU7DIJwv1GMEX1OElerOaqnHQQuFp8Z/PeoANNn1e1GFCVuOYUI8ZAxAsZ3tOrh5HXX2CzFyFzzVBUN8Mc5YEb1nYinpo69DCHM+3slxbUrhtLANjfUbCJXdNjvBak6HnA1Sl/VluibJfkCNJMzuLG3asK6FQHq1+aE84YFqs3IxbkWt5c/2swG4HX3dedeBndTutZEqw4RMSY9/qRF8pp19pwgl5zKx4XvQW1U9nPl5yKeMheA79O2okYL1M+vQ1Yx/ij01ykKdG2XizJmN3C295pz5q3AUJUyXio35uPHJ3BItFdj7wKC2wuahzb4RRWDHX+i5U8nxAfRMjcHgenF6GTiNzv+ciRc+8uGfcL7hWj1f4fEEgjmzY6XJAoV2NSJicLWwH471Y+ZJ0RRkWlBGyKh5xpYSOOrfIoD8mnv1dQVApDiQCdVxBg8x0xkSDIi7g5Gvg+Ld/B7l7So4VJkOy/Xhzi35aXTsPcjZwoA1uXAlKCk1hEhxS478aX5BvPx9WpydXr5bLNKhoK9cr9acXDqCXIABomp/vsBnOFd0FWC2Y/s7RqcylIuiO9PXJk8QD90SLM+kqNYlTHwmbNh0gu3EzGK3KTOz3UaOYOXn5uM6tb7x5ZY8czKV5bEw3bh7tOTHFnkGysnWLE5Ne5PkarYuKP0msSpueijkJz3Z58M+g0tNWHXc4a1SfpJVQKC16BOv+O52b6ubb85vuohIoG266x75ENHYtAo8le5pDdjcdMpsjp9rd7T8X17jGZc/47TWzL0WjHU+WLyah6R9JQiqkALfBYelJ8s3Y8sZHL5wUYsDu130pP02MDWazNDZRssjwWK//7/csoJ8dskZMYrVPfmXRQtPbCDBxP0hxZ61PpfK7rU63y9bCa1Umb+MzRyX3vUrcrNbHmByvGv7IBZR9SEK5+2MPOdNvOAKPJ8IwQWEUxhtlGJsYNBNGeYgIjY7L//53cYC4ZwK5s8Oe//dsXePIAvyyz0D0+bWMZCMcAFT6r3chgpfmB8f8pWXcX23Ut60DiPclqODqXgMvC12gE9ahx5dC0EybtFokLqAikUI10pW3+c5o//82nC53VzNJr+j1YZN78+Mae9ePr1dH7151W/bhhViuCR1uhzKyHcQPOvBY06vmch1LL+sOJeRdRhVCxW2yXupa6cpWcrVSnDQWCF/bR16E/zICcDPHrzc=",
    //   {
    //     engineLocation: "https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build/",
    //   }
    // )
    //   .then(() => {
    //     return ScanditSDK.BarcodePicker.create(
    //       document.getElementById("scandit-barcode-picker"),
    //       {
    //         // enable some common symbologies
    //         scanSettings: new ScanditSDK.ScanSettings({
    //           enabledSymbologies: [],
    //         }),
    //       }
    //     );
    //   })
    //   .then((barcodePicker) => {
    //     // barcodePicker is ready here, show a message every time a barcode is scanned
    //     barcodePicker.on("scan", (scanResult) => {
    //       alert(scanResult.barcodes[0].data);
    //     });
    //   });

    // this.openScanner();
    // Create the overlay if it doesn't exist
    if (!this._overlayRef) {
      this._createOverlay();
    }

    // Attach the portal to the overlay
    this._overlayRef.attach(
      new TemplatePortal(this._scanPanel, this._viewContainerRef)
    );
  }

  private _createOverlay(): void {
    // Create the overlay
    this._overlayRef = this._overlay.create({
      hasBackdrop: true,
      backdropClass: "fuse-backdrop-on-mobile",
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(this._scanOrigin._elementRef.nativeElement)
        .withLockedPosition(true)
        .withPush(true)
        .withPositions([
          {
            originX: "start",
            originY: "bottom",
            overlayX: "start",
            overlayY: "top",
          },
          {
            originX: "start",
            originY: "top",
            overlayX: "start",
            overlayY: "bottom",
          },
          {
            originX: "end",
            originY: "bottom",
            overlayX: "end",
            overlayY: "top",
          },
          {
            originX: "end",
            originY: "top",
            overlayX: "end",
            overlayY: "bottom",
          },
        ]),
    });

    // Detach the overlay from the portal on backdrop click
    this._overlayRef.backdropClick().subscribe(() => {
      this._overlayRef.detach();
    });
  }
  /**
   * Close the notifications panel
   */
  // closePanel(): void {

  // }
}
