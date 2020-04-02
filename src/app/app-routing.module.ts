import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'view-receipts',
    loadChildren: () => import('./pages/view-receipts/view-receipts.module').then( m => m.ViewReceiptsPageModule)
  },
  {
    path: 'create-receipt',
    loadChildren: () => import('./pages/create-receipt/create-receipt.module').then( m => m.CreateReceiptPageModule)
  },
  {
    path: 'receipt-details',
    loadChildren: () => import('./pages/receipt-details/receipt-details.module').then( m => m.ReceiptDetailsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
