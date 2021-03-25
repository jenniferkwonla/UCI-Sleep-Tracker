import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewOvernightsleepDataPageRoutingModule } from './view-overnightsleep-data-routing.module';

import { ViewOvernightsleepDataPage } from './view-overnightsleep-data.page';
import {HighchartsChartComponent} from 'highcharts-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewOvernightsleepDataPageRoutingModule,
  ],
  declarations: [ViewOvernightsleepDataPage, HighchartsChartComponent]
})
export class ViewOvernightsleepDataPageModule {}
