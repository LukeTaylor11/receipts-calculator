import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Receipt} from '../../models/receipt.model';
import {ReceiptsService} from '../../services/receipts.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-receipt-details',
  templateUrl: './receipt-details.page.html',
  styleUrls: ['./receipt-details.page.scss'],
})
export class ReceiptDetailsPage implements OnInit {
  loadedReceipt: Receipt;
  private dateStored: any;
  private year: any;
  private month: any;
  private day: any;
  private hours: any;
  private minutes: any;
  private zero: any;
  private fullDate: string;
  private fullTime: string;
  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private receiptService: ReceiptsService,
      private alertController: AlertController
  ) { }

  ngOnInit() {
    // get the ID from the url to load the selected receipt, and if it does not exist; redirect the user back
    this.activatedRoute.paramMap.subscribe(paraMap => {
        if (!paraMap.has('id')) {
            // no ID has been specified, so redirect the user back
            this.router.navigate(['/tabs/view-receipts']);
        } else {
          // the parameter exists, check if a receipt with the given ID exists within the array
          const receiptId = paraMap.get('id');
          this.loadedReceipt = this.receiptService.getReceipt(Number(receiptId));
          this.convertTimestampToDate();
        }
    });
  }


  convertTimestampToDate() {
      // a function to convert the timestamp saved with the loaded receipt to a user-readable date
      // get the date
      this.dateStored = new Date(this.loadedReceipt.id);
      console.log(this.dateStored);
      this.year =  this.dateStored.getFullYear();
      this.month = this.zeroPad(this.dateStored.getMonth() + 1);
      this.day = this.zeroPad(this.dateStored.getDate());
      // get the time
      this.hours = this.zeroPad(this.dateStored.getHours());
      this.minutes = this.zeroPad(this.dateStored.getMinutes());
      // convert both to user-readable format
      this.fullTime = this.hours + ':' + this.minutes;
      this.fullDate = this.day + '/' + this.month + '/' + this.year;

  }

  // a function used to make sure two numbers are being output e.g. 3 would be 03
  zeroPad(num) {
    this.zero = 2 - num.toString().length + 1;
    return Array(+(this.zero > 0 && this.zero)).join('0') + num;
  }

  onDeleteReceipt() {
    this.alertController.create({
      header: 'Are you sure?',
      message: 'Do you really want to remove this receipt?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
        {
          text: 'Remove',
          // handler to execute the code which deletes the recipe, only if this one button is pressed
          handler: () => {
            this.receiptService.deleteReceipt(this.loadedReceipt.id);
            this.router.navigate(['/tabs/view-receipts']);
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }


}
