import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay } from '@angular/cdk/overlay';
import { SidePanelRef } from 'src/app/shared/services/side-panel/side-panel-ref';

@Component({
  selector: 'app-create-shipment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-shipment.component.html',
  styleUrls: ['./create-shipment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Overlay]
})
export class CreateShipmentComponent {

  constructor(private sidePanelRef: SidePanelRef,) {}

  ngOnInit() {
    console.log('tu');
  }

  close() {
    this.sidePanelRef.close();
  }
}
