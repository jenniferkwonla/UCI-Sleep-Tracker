import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDataReportPageRoutingModule } from './view-data-report-routing.module';

import { ViewDataReportPage } from './view-data-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDataReportPageRoutingModule
  ],
  declarations: [ViewDataReportPage]
})
export class ViewDataReportPageModule {}
