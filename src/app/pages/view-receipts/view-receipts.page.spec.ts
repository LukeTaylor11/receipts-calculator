import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewReceiptsPage } from './view-receipts.page';

describe('ViewReceiptsPage', () => {
  let component: ViewReceiptsPage;
  let fixture: ComponentFixture<ViewReceiptsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReceiptsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewReceiptsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
