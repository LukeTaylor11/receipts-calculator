import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewReceiptsPageRoutingModule } from './view-receipts-routing.module';

import { ViewReceiptsPage } from './view-receipts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewReceiptsPageRoutingModule
  ],
  declarations: [ViewReceiptsPage]
})
export class ViewReceiptsPageModule {}
