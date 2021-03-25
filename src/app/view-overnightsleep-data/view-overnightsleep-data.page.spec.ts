import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewOvernightsleepDataPage } from './view-overnightsleep-data.page';

describe('ViewOvernightsleepDataPage', () => {
  let component: ViewOvernightsleepDataPage;
  let fixture: ComponentFixture<ViewOvernightsleepDataPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOvernightsleepDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewOvernightsleepDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
