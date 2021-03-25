import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WakeupAlarmPage } from './wakeup-alarm.page';

const routes: Routes = [
  {
    path: '',
    component: WakeupAlarmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WakeupAlarmPageRoutingModule {}
