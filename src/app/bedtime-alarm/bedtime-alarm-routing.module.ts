import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BedtimeAlarmPage } from './bedtime-alarm.page';

const routes: Routes = [
  {
    path: '',
    component: BedtimeAlarmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BedtimeAlarmPageRoutingModule {}
