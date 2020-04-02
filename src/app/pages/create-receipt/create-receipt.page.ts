import {Component, OnInit, SecurityContext} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {initializeApp, storage, database} from 'firebase';
import {FIREBASE_CONFIG} from '../../firebase.config';
import {CameraResultType, CameraSource, Plugins} from '@capacitor/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {stringify} from 'querystring';
import {Storage} from '@ionic/storage';
import {Receipt} from '../../models/receipt.model';
import {ReceiptsService} from '../../services/receipts.service';
import {AlertController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-create-receipt',
  templateUrl: './create-receipt.page.html',
  styleUrls: ['./create-receipt.page.scss'],
})
export class CreateReceiptPage implements OnInit {

  constructor(
      private formBuilder: FormBuilder,
      private http: HttpClient,
      private sanitizer: DomSanitizer,
      private ionicStorage: Storage,
      private receipts: ReceiptsService,
      private alertController: AlertController,
      private router: Router
  ) {
      initializeApp(FIREBASE_CONFIG);
      // database testing

      ionicStorage.get('default_1').then((val) => {
            if (val == null) {
                // load the default value into the array
            } else {
                // no default value has been set
            }
      });
  }

  get title() {
    return this.registrationForm.get('title');
  }

  get totalCost() {
    return this.registrationForm.get('totalCost');
  }

  get avatar() {
      return this.registrationForm.get('avatar');
  }

    private image: SafeResourceUrl;
    private imageString: string;
    private currentTimestamp: string;

    registrationForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      totalCost: ['', [Validators.required, Validators.pattern('^[0-9]\\d{0,9}(\\.\\d{1,3})?%?$')]],
      image: ['']
  });

  public errorMessages = {
      title: [
        { type: 'required', message: 'Title is required'},
        {type: 'minlength', message: 'Title must be at least four characters long'}
      ],
      totalCost: [
          {type: 'required', message: 'Total cost is required'},
          {type: 'pattern', message: 'Cost must contain a valid number'}
      ]
  };
    async takePicture() {
        const result = await Plugins.Camera.getPhoto({
            quality: 100,
            allowEditing: false,
            resultType: CameraResultType.Base64,
            source: CameraSource.Prompt
        });

        // tslint:disable-next-line:max-line-length
        this.image = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(result && result.base64String));
        this.imageString = 'data:image/jpeg;base64,' + this.image;
        document.getElementById('uploadedImg').style.display = 'block';

    }

  public submit() {
        if (this.registrationForm.valid) {
            // store image into the directory uploaded_receipts with the name being the current timestamp,
            // const firebaseStorage = storage().ref('uploaded_receipts');
            this.currentTimestamp = JSON.stringify(new Date().getTime());
            const title = JSON.stringify(this.registrationForm.get('title').value);
            const newReceipt: Receipt = {
                id: Number(this.currentTimestamp),
                title: title.substring(1, title.length - 1),
                imageUrl: this.imageString,
                totalCost: Number(this.registrationForm.get('totalCost').value)
            };

            if (this.receipts.addReceipt(newReceipt, this.currentTimestamp)) {
                this.alertController.create({
                    header: 'Success',
                    message: 'The new receipt has been added.',
                    buttons: ['Okay']
                }).then(alertEl => {
                    alertEl.present();
                    this.router.navigate(['/tabs/view-receipts']);
                });
            } else {
                this.alertController.create({
                    header: 'Error',
                    message: 'The receipt could not be added',
                    buttons: ['Okay']
                }).then(alertEl => {
                    alertEl.present();
                });
            }
        }
  }


  ngOnInit() {}


}
