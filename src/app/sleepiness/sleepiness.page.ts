import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {SleepService} from '../services/sleep.service';
import {StanfordSleepinessData} from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-sleepiness',
  templateUrl: './sleepiness.page.html',
  styleUrls: ['./sleepiness.page.scss'],
})
export class SleepinessPage implements OnInit {
  private sleepinessDateSet: Date;
  private defaultDate: Date;
  private sleepinessValue: number;
  private defaultValue: number;
  private sleepinessScale: number[];
  private scaleDefined: string[];
  private data: StanfordSleepinessData;

  constructor(public sleepService: SleepService, public navCtrl: NavController) { }

  ngOnInit() {
    this.sleepinessDateSet = null;
    this.defaultDate = new Date();
    this.sleepinessValue = -1;
    this.defaultValue = 1;
    this.sleepinessScale = [1, 2, 3, 4, 5, 6, 7];
    this.scaleDefined = ['active, alert, awake, vital',
                         'able to concentrate',
                          'awake but relaxed, not fully alert',
                          'somewhat foggy',
                          'foggy, slowed down',
                          'sleepy, woozy, prefer to lie down',
                          'sleeping soon'];
  }

  dateChanged(event){
    this.sleepinessDateSet = new Date(this.defaultDate);
  }

  valueChanged(event){
    for (let i = 0; i < 7; ++i){
      // @ts-ignore
      if (this.defaultValue.includes(this.scaleDefined[i])){
        this.sleepinessValue = i + 1;
      }
    }
  }

  addSleepinessData() {
    if (this.sleepinessDateSet != null && this.sleepinessValue > 0) {
      this.data = new StanfordSleepinessData(this.sleepinessValue, this.sleepinessDateSet);
      this.sleepService.logSleepinessData(this.data);
      this.navCtrl.navigateForward('/home');
    }
  }

  back() {
    this.sleepinessDateSet = null;
    this.sleepinessValue = -1;
    this.navCtrl.navigateBack('/home');
  }
}
