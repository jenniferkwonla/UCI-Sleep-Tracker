import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BedtimeAlarmPageRoutingModule } from './bedtime-alarm-routing.module';

import { BedtimeAlarmPage } from './bedtime-alarm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BedtimeAlarmPageRoutingModule
  ],
  declarations: [BedtimeAlarmPage]
})
export class BedtimeAlarmPageModule {}
