import {Injectable} from '@angular/core';
import {SleepData} from '../data/sleep-data';
import {OvernightSleepData} from '../data/overnight-sleep-data';
import {StanfordSleepinessData} from '../data/stanford-sleepiness-data';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
  private static LoadDefaultData: boolean = true;
  public static AllSleepData: SleepData[] = [];
  public static AllOvernightData: OvernightSleepData[] = [];
  public static AllSleepinessData: StanfordSleepinessData[] = [];

  constructor() {
    if (SleepService.LoadDefaultData) {
      this.addDefaultData();
      SleepService.LoadDefaultData = false;
    }
  }

  private addDefaultData() {
    this.logOvernightData(new OvernightSleepData(new Date('February 18, 2021 01:03:00'), new Date('February 18, 2021 09:25:00')));
    this.logSleepinessData(new StanfordSleepinessData(5, new Date('February 18, 2021 14:38:00')));
    this.logOvernightData(new OvernightSleepData(new Date('February 18, 2021 23:30:00'), new Date('February 19, 2021 07:30:00')));
    this.logSleepinessData(new StanfordSleepinessData(4, new Date('February 19, 2021 14:30:00')));
    this.logOvernightData(new OvernightSleepData(new Date('February 19, 2021 22:00:00'), new Date('February 20, 2021 07:30:00')));
    this.logSleepinessData(new StanfordSleepinessData(5, new Date('February 20, 2021 13:30:00')));
    this.logOvernightData(new OvernightSleepData(new Date('February 20, 2021 23:11:00'), new Date('February 21, 2021 08:03:00')));
    this.logSleepinessData(new StanfordSleepinessData(4, new Date('February 21, 2021 13:30:00')));
    this.logOvernightData(new OvernightSleepData(new Date('February 22, 2021 01:03:00'), new Date('February 22, 2021 07:30:00')));
    this.logSleepinessData(new StanfordSleepinessData(7, new Date('February 22, 2021 13:08:00')));
    this.logOvernightData(new OvernightSleepData(new Date('February 22, 2021 21:00:00'), new Date('February 23, 2021 07:30:00')));
    this.logSleepinessData(new StanfordSleepinessData(1, new Date('February 23, 2021 14:30:00')));
    this.logSleepinessData(new StanfordSleepinessData(2, new Date('February 23, 2021 18:30:00')));
    this.logSleepinessData(new StanfordSleepinessData(6, new Date('February 24, 2021 18:30:00')));
    this.logSleepinessData(new StanfordSleepinessData(7, new Date('March 6, 2021 18:00:00')));

  }

  public logOvernightData(sleepData: OvernightSleepData) {
    SleepService.AllSleepData.push(sleepData);
    SleepService.AllOvernightData.push(sleepData);
  }

  public logSleepinessData(sleepData: StanfordSleepinessData) {
    SleepService.AllSleepData.push(sleepData);
    SleepService.AllSleepinessData.push(sleepData);
  }

}
