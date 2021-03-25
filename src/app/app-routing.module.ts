import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'overnight-sleep',
    loadChildren: () => import('./overnightsleep/overnightsleep.module').then( m => m.OvernightsleepPageModule)
  },
  {
    path: 'view-overnight-sleep-data',
    loadChildren: () => import('./view-overnightsleep-data/view-overnightsleep-data.module').then( m => m.ViewOvernightsleepDataPageModule)
  },
  {
    path: 'bedtime-alarm',
    loadChildren: () => import('./bedtime-alarm/bedtime-alarm.module').then( m => m.BedtimeAlarmPageModule)
  },
  {
    path: 'wakeup-alarm',
    loadChildren: () => import('./wakeup-alarm/wakeup-alarm.module').then( m => m.WakeupAlarmPageModule)
  },
  {
    path: 'sleepiness',
    loadChildren: () => import('./sleepiness/sleepiness.module').then( m => m.SleepinessPageModule)
  },
  {
    path: 'view-sleepiness-data',
    loadChildren: () => import('./view-sleepiness-data/view-sleepiness-data.module').then( m => m.ViewSleepinessDataPageModule)
  },
  {
    path: 'view-data-report',
    loadChildren: () => import('./view-data-report/view-data-report.module').then( m => m.ViewDataReportPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
