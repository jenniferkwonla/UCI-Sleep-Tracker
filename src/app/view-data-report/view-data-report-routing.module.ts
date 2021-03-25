import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewDataReportPage } from './view-data-report.page';

const routes: Routes = [
  {
    path: '',
    component: ViewDataReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewDataReportPageRoutingModule {}
