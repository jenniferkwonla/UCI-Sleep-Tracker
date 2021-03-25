import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewOvernightsleepDataPage } from './view-overnightsleep-data.page';

const routes: Routes = [
  {
    path: '',
    component: ViewOvernightsleepDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewOvernightsleepDataPageRoutingModule {}
