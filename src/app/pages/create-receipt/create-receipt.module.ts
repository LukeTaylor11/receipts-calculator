import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateReceiptPageRoutingModule } from './create-receipt-routing.module';
import { CreateReceiptPage } from './create-receipt.page';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CreateReceiptPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [CreateReceiptPage]
})
export class CreateReceiptPageModule {}
