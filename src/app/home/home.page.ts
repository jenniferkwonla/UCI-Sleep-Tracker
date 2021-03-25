import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {SleepService} from '../services/sleep.service';
import {Plugins} from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentDateTime: Date;

  /* inject sleep service */
  constructor( public sleepService: SleepService, public navCtrl: NavController) {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.currentDateTime = new Date();
  }

  /* display all application features */
  openBedtimeAlarm(){
    this.navCtrl.navigateForward('/bedtime-alarm');
  }

  openWakeupAlarm(){
    this.navCtrl.navigateForward('/wakeup-alarm');
  }

  openSleepLogger() {
    this.navCtrl.navigateForward('/overnight-sleep');
  }

  openSleepinessLogger() {
    this.navCtrl.navigateForward('/sleepiness');
  }

  openSleepJourney() {
    this.navCtrl.navigateForward('/view-overnight-sleep-data');
  }

  openSleepinessJourney() {
    this.navCtrl.navigateForward('/view-sleepiness-data');
  }

  openJourneyReport(){
    this.navCtrl.navigateForward('/view-data-report');
  }
  /* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
  get allSleepData() {
    return SleepService.AllSleepData;
  }
}
