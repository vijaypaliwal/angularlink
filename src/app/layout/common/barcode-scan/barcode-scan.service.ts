import { Overlay, OverlayConfig } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { ComponentRef, Injectable, Injector } from "@angular/core";
import { Subject } from "rxjs";
import { BarcodeScanComponent } from "./barcode-scan.component";

@Injectable({
  providedIn: "root",
})
export class BarcodeScanService {
  private scanResultSubject = new Subject<boolean>();
  scanResult$ = this.scanResultSubject.asObservable();

  scan(scannerOn: boolean): void {
    // Implement your scanning logic here
    // After scanning, emit the result to subscribers
    this.scanResultSubject.next(scannerOn);
  }
  constructor(private overlay: Overlay, private injector: Injector) {}

  openOverlay(): ComponentRef<BarcodeScanComponent> {
    const overlayRef = this.overlay.create(this.getOverlayConfig());
    const portal = new ComponentPortal(
      BarcodeScanComponent,
      null,
      this.createInjector()
    );
    const componentRef = overlayRef.attach(portal);

    return componentRef;
  }

  private getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy,
    });

    return overlayConfig;
  }

  private createInjector(): Injector {
    return Injector.create({
      providers: [],
      parent: this.injector,
    });
  }
}
