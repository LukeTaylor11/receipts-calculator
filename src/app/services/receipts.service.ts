import { Injectable } from '@angular/core';
import {Receipt} from '../models/receipt.model';
import {Storage} from '@ionic/storage';
import {storage} from 'firebase';
import {stringify} from 'querystring';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ReceiptsService {

  constructor(public ionicStorage: Storage, private router: Router) { }
  private receipts: Receipt[] = [];

  // Setup an observable which pushes a receipts changed event
  private receiptsListener = new Subject();
  receiptsChanged = this.receiptsListener.asObservable();

  sendReceiptsChangedEvent() {
    this.receiptsListener.next();
  }

  getAllReceipts() {
    return [...this.receipts];
  }

  loadReceiptsFromStorage() {
    const newReceipt: Receipt = {
      id: 123,
      title: 'blank',
      imageUrl: 'blank',
      totalCost: 123
    };
    this.ionicStorage.forEach((value, key, index) => {
      // if the value has a title, add it to the receipts array
      if (JSON.parse(value).title) {
            this.receipts.push(JSON.parse(value));
          }
        }).then((d) => {
              // once all receipts are added, send the event so pages can listen and update
              this.sendReceiptsChangedEvent();

        });
  }

  getReceipt(receiptId: number) {
    return {...this.receipts.find(receipt => {
        if (receipt.id === receiptId) {
          return true;
        }
      })};
  }


  addReceipt(receipt: Receipt, timestamp) {
    try {
      this.ionicStorage.set(timestamp, JSON.stringify(receipt));
      this.receipts.push(receipt);
      return true;
    } catch (err) {
      return false;
    }

  }

  deleteReceipt(id: number) {
    this.ionicStorage.remove(JSON.stringify(id));
    this.receipts = this.receipts.filter(receipt => {
      // return true for elements you want to keep, and updates the array
      // if implementing local storage or database storage in future, will need to save in storage
      return receipt.id !== id;
    });
  }

  getTotalCost() {
    let totalCost = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.receipts.length; i++) {
      totalCost += this.receipts[i].totalCost;
    }
    return totalCost;
  }
}
