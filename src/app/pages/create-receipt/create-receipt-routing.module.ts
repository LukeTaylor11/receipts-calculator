import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateReceiptPage } from './create-receipt.page';

const routes: Routes = [
  {
    path: '',
    component: CreateReceiptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateReceiptPageRoutingModule {}
