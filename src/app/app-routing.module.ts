import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsListComponent } from './pages/items-list/items-list.component';

const routes: Routes = [
  {
    path: '',
    component: ItemsListComponent,
  },
  {
    path: 'shipment',
    loadComponent: () =>
      import('./pages/shipment-list/shipment-list.component').then((component) => component.ShipmentListComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
