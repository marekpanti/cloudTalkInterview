import { Overlay, ComponentType } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, InjectionToken, Injector } from '@angular/core';
import { SidePanelRef } from './side-panel-ref';

export interface DialogConfig {
  data?: any;
}

export const SIDE_PANEL_DATA = new InjectionToken<any>('SIDE_PANEL_DATA');

@Injectable({
  providedIn: 'root',
})
export class SidePanelService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  /**
   * Open a custom component in an overlay
   */
  open<T>(component: ComponentType<T>, config?: DialogConfig): SidePanelRef {
    // Globally centered position strategy
    const positionStrategy = this.overlay.position().global().centerHorizontally().right();

    // Create the overlay with customizable options
    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'overlay-backdrop',
      panelClass: 'overlay-panel',
    });

    // Create dialogRef to return
    const dialogRef = new SidePanelRef(overlayRef);

    // Create injector to be able to reference the DialogRef from within the component
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: SidePanelRef, useValue: dialogRef },
        { provide: SIDE_PANEL_DATA, useValue: config?.data },
      ],
    });

    // Attach component portal to the overlay
    const portal = new ComponentPortal(component, null, injector);
    overlayRef.attach(portal);

    return dialogRef;
  }
}
