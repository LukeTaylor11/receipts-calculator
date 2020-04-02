import { Component, OnInit } from '@angular/core';
import {Receipt} from '../../models/receipt.model';
import {ReceiptsService} from '../../services/receipts.service';
import {ActivatedRoute} from '@angular/router';
import {Storage} from '@ionic/storage';
import {ChangeDetectorRef} from '@angular/core';
import {stringify} from 'querystring';
import {storage} from 'firebase';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-view-receipts',
  templateUrl: './view-receipts.page.html',
  styleUrls: ['./view-receipts.page.scss'],
})
export class ViewReceiptsPage implements OnInit {

  constructor(
      public receipt: ReceiptsService,
      public route: ActivatedRoute,
      public ionicStorage: Storage,
      private cd: ChangeDetectorRef,
      public ionicSecondStorage: Storage
  ) {
    // this runs when the navigator takes the user back to this page
    route.params.subscribe(val => {
        this.updateReceipts();
    });

    this.receipt.receiptsChanged.subscribe(data => {
        this.updateReceipts();
    });
    // check if the default receipts are in storage, if not, create them
    ionicStorage.get('app_opened_before').then((val) => {
      if (val == null) {


        const currentTimeStamp = new Date().getTime();
        const currentTimeStampTwo = currentTimeStamp + 1;

        const firstTimeStamp = JSON.stringify(currentTimeStamp);
        const secondTimeStamp = JSON.stringify(currentTimeStampTwo);

        this.setFirstDefaultReceipt(firstTimeStamp);
        this.setSecondDefaultReceipt(secondTimeStamp);

        // make sure this code won't run again
        ionicStorage.set('app_opened_before', true);
      }
      receipt.loadReceiptsFromStorage();
    });
  }
  private receipts: Receipt[];
  private totalCost: any;
  private zero: any;

  updateReceipts() {
    // update receipts and total_cost
    this.receipts = this.receipt.getAllReceipts();
    this.totalCost = Number(this.zeroPad(this.receipt.getTotalCost())).toFixed(2);
  }


  setFirstDefaultReceipt(timestamp) {
    const json_firstDefaultReceipt = {
      'id': Number(timestamp),
      'title': 'Mcdonald\'s Order',
      'imageUrl': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/170px-ReceiptSwiss.jpg',
      'totalCost': 7.50
    };
    this.ionicStorage.set(timestamp, JSON.stringify(json_firstDefaultReceipt));
  }

  setSecondDefaultReceipt(timestamp) {
    const json_secondDefaultReceipt = {
      'id': Number(timestamp),
      'title': 'Fuel',
      'imageUrl': 'https://media-cdn.tripadvisor.com/media/photo-s/12/43/f6/f5/receipt.jpg',
      'totalCost': 15
    };
    this.ionicSecondStorage.set(timestamp, JSON.stringify(json_secondDefaultReceipt));
  }
  zeroPad(num) {
    this.zero = 2 - num.toString().length + 1;
    return Array(+(this.zero > 0 && this.zero)).join('0') + num;
  }

  ngOnInit() {
    this.receipts = this.receipt.getAllReceipts();
  }

}
