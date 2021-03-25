import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WakeupAlarmPageRoutingModule } from './wakeup-alarm-routing.module';

import { WakeupAlarmPage } from './wakeup-alarm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WakeupAlarmPageRoutingModule
  ],
  declarations: [WakeupAlarmPage]
})
export class WakeupAlarmPageModule {}
