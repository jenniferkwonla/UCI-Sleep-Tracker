import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewSleepinessDataPageRoutingModule } from './view-sleepiness-data-routing.module';

import { ViewSleepinessDataPage } from './view-sleepiness-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewSleepinessDataPageRoutingModule
  ],
  declarations: [ViewSleepinessDataPage]
})
export class ViewSleepinessDataPageModule {}
