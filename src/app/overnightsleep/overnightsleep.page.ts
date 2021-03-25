import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {SleepService} from '../services/sleep.service';
import {OvernightSleepData} from '../data/overnight-sleep-data';

@Component({
  selector: 'app-overnightsleep',
  templateUrl: './overnightsleep.page.html',
  styleUrls: ['./overnightsleep.page.scss'],
})
export class OvernightsleepPage implements OnInit {
  private yesterdayDate: Date;
  private todayDate: Date;
  private defaultDate: Date;
  private sleepStartSet: Date;
  private sleepEndSet: Date;
  private data: OvernightSleepData;

  constructor(public sleepService: SleepService, public navCtrl: NavController) {
  }

  ngOnInit() {
    this.yesterdayDate = new Date();
    this.yesterdayDate.setDate(this.yesterdayDate.getDate() - 1);
    this.todayDate = new Date();
    this.defaultDate = new Date();
    this.sleepStartSet = null;
    this.sleepEndSet = null;
  }

  dateChangedSleepStart(event) {
      this.sleepStartSet = new Date(this.yesterdayDate);
  }

  dateChangedSleepEnd(event) {
    this.sleepEndSet = new Date(this.todayDate);
  }

  addOvernightSleepData() {
    if (this.sleepStartSet != null || this.sleepEndSet != null){
      this.data = new OvernightSleepData(this.sleepStartSet, this.sleepEndSet);
      this.sleepService.logOvernightData(this.data);
      this.navCtrl.navigateForward('/home');
    }
  }

  back() {
    this.sleepStartSet = null;
    this.sleepEndSet = null;
    this.navCtrl.navigateBack('/home');
  }
}
