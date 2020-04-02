import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,

    children: [
      {
        path: 'view-receipts',
        loadChildren: () => import('../view-receipts/view-receipts.module').then( m => m.ViewReceiptsPageModule)
      },
      {
        path: 'create-receipt',
        loadChildren: () => import('../create-receipt/create-receipt.module').then( m => m.CreateReceiptPageModule)
      },
      {
        path: 'view-receipts/:id',
        loadChildren: () => import('../receipt-details/receipt-details.module').then( m => m.ReceiptDetailsPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/view-receipts',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
