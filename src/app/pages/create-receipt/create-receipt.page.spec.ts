import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateReceiptPage } from './create-receipt.page';

describe('CreateReceiptPage', () => {
  let component: CreateReceiptPage;
  let fixture: ComponentFixture<CreateReceiptPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateReceiptPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateReceiptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
