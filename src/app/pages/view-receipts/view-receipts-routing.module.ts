import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewReceiptsPage } from './view-receipts.page';

const routes: Routes = [
  {
    path: '',
    component: ViewReceiptsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewReceiptsPageRoutingModule {}
