import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewSleepinessDataPage } from './view-sleepiness-data.page';

const routes: Routes = [
  {
    path: '',
    component: ViewSleepinessDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewSleepinessDataPageRoutingModule {}
