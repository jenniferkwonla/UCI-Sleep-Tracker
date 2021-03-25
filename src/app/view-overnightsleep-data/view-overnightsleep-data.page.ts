import {Component, OnInit, ViewChild} from '@angular/core';
import {SleepService} from '../services/sleep.service';
import {NavController} from '@ionic/angular';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-view-overnightsleep-data',
  templateUrl: './view-overnightsleep-data.page.html',
  styleUrls: ['./view-overnightsleep-data.page.scss'],
})
export class ViewOvernightsleepDataPage implements OnInit {

  private earliestBedtime: Date;
  private latestBedtime: Date;

  constructor(private navCtrl: NavController, private sleepService: SleepService) {
  }

  ngOnInit() {
    this.getChartWithHoursOfSleep();
    this.getChartWithBedtimeRange();
    this.getChartWithWakeupTimeRange();
  }

  getChartWithHoursOfSleep() {
    /*
    The next section creates a chart using chart.js.
    The chart creates a doughnut graph that displays the number of hours, minutes of the most recent sleep session
    */
    const sleepStartMs = SleepService.AllOvernightData[SleepService.AllOvernightData.length - 1].getSleepEnd().getTime();
    const sleepEndMs = SleepService.AllOvernightData[SleepService.AllOvernightData.length - 1].getSleepStart().getTime();
    const diffHoursMs = sleepStartMs - sleepEndMs;
    const hours = Math.floor(diffHoursMs / (1000 * 60 * 60));
    const hoursStr = hours.toString();
    const minutes = Math.floor(diffHoursMs / (1000 * 60) % 60);
    const minutesStr = minutes.toString();
    const minutesDouble = minutes / 60.0;
    const hoursMin = hours + minutesDouble;

    // @ts-ignore
    const sleepSession = new Chart('chart1', {
      type: 'doughnut',
      data: {
        labels: ['asleep', 'awake'],
        datasets: [{
          data: [Math.round(hoursMin * 100) / 100, 24 - Math.round(hoursMin * 100) / 100],
          backgroundColor: ['#33C9C7', '#f5f7fa'],
          borderWidth: 0.5,
        }]
      },
      options: {
        cutoutPercentage: 88,
        animation: {
          animateRotate: true,
          duration: 2000
        },
        legend: {
          display: true
        }
      }
    });

    // the next section is for placing text in the middle of the doughnut graph.
    Chart.plugins.register({
      // tslint:disable-next-line:only-arrow-functions
      beforeDraw(chart) {
        if (chart.config.type === 'doughnut') {
          const width = chart.width;
          const height = chart.height;
          const ctx = chart.ctx;

          ctx.restore();
          const fontSize = (height / 160).toFixed(2);
          ctx.font = fontSize + 'em sans-serif';
          ctx.textBaseline = 'middle';

          const text = hoursStr + 'h  ' + minutesStr + 'min';
          const textX = Math.round((width - ctx.measureText(text).width) / 2);
          const textY = height / 2;

          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }
    });
  }

  getChartWithWakeupTimeRange() {
    /*
    The next section creates a chart using chart.js.
    The chart  marks the earliest wakeup time, latest wakeup time and most recent wakeup
    */
    // @ts-ignore
    const earliest = this.getEarliestSleepEnd();
    const latest = this.getLatestSleepEnd();
    const recent = this.getRecentSleepEnd();

    // tslint:disable-next-line:prefer-const
    let wakeupChart = new Chart('chart3', {
      type: 'line',
      data: {
        datasets: [{
          data: [{x: earliest, y: 0},
            {x: recent, y: 1},
            {x: latest, y: 0}],
          backgroundColor: ['#d5d5d5', '#33C9C7', '#d5d5d5'],
          showLine: false
        }]
      },
      options: {
        legend: {display: false},
        title: {
          display: true,
          text: 'Earliest and Latest With Last Wakeup Marked'
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {display: true, reverse: true},
            scaleLabel: {labelString: 'Count'},
            type: 'time',
            distribution: 'series',
            time: {
              unit: 'minute',
              displayFormats: {
                hour: 'h:mm a'
              }
            }
          }],
          yAxes: [{
            display: false,
            scaleLabel: {
              labelString: 'Time'
            },
          }]
        }
      }
    });
  }

  getChartWithBedtimeRange() {
    /*
    The next section creates a chart using chart.js.
    The chart  marks the earliest bedtime, latest bedtime and most recent bedtime
    */
    // @ts-ignore
    const earliest = this.getRecentSleepStart();
    const latest = this.getLatestSleepStart();
    const recent = this.getEarliestSleepStart();

    // tslint:disable-next-line:prefer-const
    let bedtimeChart = new Chart('chart2', {
      type: 'line',
      data: {
        datasets: [{
          data: [{x: earliest, y: 0},
                  {x: recent, y: 1},
                  {x: latest, y: 0}],
          backgroundColor: ['#d5d5d5', '#33C9C7', '#d5d5d5'],
          showLine: false
        }]
      },
      options: {
        legend: {display: false},
        title: {
          display: true,
          text: 'Earliest and Latest With Last Bedtime Marked'
        },
        scales: {
          xAxes: [{
            stacked: true,
            display: true,
            ticks: {display: true, reverse: true},
            scaleLabel: {labelString: 'Count'},
            type: 'time',
            distribution: 'series',
            time: {
              unit: 'minute',
              displayFormats: {
                hour: 'h:mm a'
              }
            },
          }],
          yAxes: [{
            stacked: true,
            display: false,
            scaleLabel: {
              labelString: 'Time'
            },
          }]
        }
      }
    });
  }

  getEarliestSleepStart(): Date {
    // get earliest bedtime
    let earliest = SleepService.AllOvernightData[0];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < SleepService.AllOvernightData.length; ++i) {
      // tslint:disable-next-line:max-line-length
      earliest = SleepService.AllOvernightData[i].getSleepStart().getTime() > earliest.getSleepStart().getTime() ? SleepService.AllOvernightData[i] : earliest;
    }
    this.earliestBedtime = earliest.getSleepStart();
    return earliest.getSleepStart();

  }

  getLatestSleepStart(): Date {
    // get latest bedtime
    let latest = SleepService.AllOvernightData[0];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < SleepService.AllOvernightData.length; ++i) {
      // tslint:disable-next-line:max-line-length
      latest = SleepService.AllOvernightData[i].getSleepStart().getTime() < latest.getSleepStart().getTime() ? SleepService.AllOvernightData[i] : latest;
    }
    this.latestBedtime = latest.getSleepStart();
    return latest.getSleepStart();
  }

  getEarliestSleepEnd(): Date {
    // earliest wakeup time
    let earliest = SleepService.AllOvernightData[0];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < SleepService.AllOvernightData.length; ++i) {
      // tslint:disable-next-line:max-line-length
      earliest = SleepService.AllOvernightData[i].getSleepEnd().getTime() > earliest.getSleepEnd().getTime() ? SleepService.AllOvernightData[i] : earliest;
    }
    return earliest.getSleepEnd();
  }

  getLatestSleepEnd(): Date {
    // get latest wakeup time
    let latest = SleepService.AllOvernightData[0];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < SleepService.AllOvernightData.length; ++i) {
      // tslint:disable-next-line:max-line-length
      latest = SleepService.AllOvernightData[i].getSleepEnd().getTime() < latest.getSleepEnd().getTime() ? SleepService.AllOvernightData[i] : latest;
    }
    return latest.getSleepEnd();
  }

  getAmountOfLastNightsSleep(): string {
    // get most recent logged sleep session
    const temp = SleepService.AllOvernightData[SleepService.AllOvernightData.length - 1].summaryString();
    const temp2 = temp.split(' ');
    return temp2[0].toString() + 'h ' + temp2[2] + 'm';
  }

  getAverageAmountOfSleep(): string {
    // calculate the average hours and minutes of sleep
    let hours = 0;
    let minutes = 0.0;
    const count = SleepService.AllOvernightData.length;
    for (let i = 0; i < count; ++i){
      // @ts-ignore
      const ms = SleepService.AllOvernightData[i].getSleepEnd() - SleepService.AllOvernightData[i].getSleepStart();
      hours = hours + Math.floor(ms / 3600 / 1000);
      minutes = minutes + Math.abs((ms / 3600 / 1000) - Math.floor(ms / 3600 / 1000)) ; // in decimal format
      if(minutes > 1){
        hours = hours + 1;
        minutes = minutes - 1;
      }
    }
    const total = hours + minutes;
    hours = total / count;
    const temp = hours - Math.floor(hours);
    minutes = temp * 60;
    return Math.floor(hours).toString() + 'h ' + Math.floor(minutes).toString() + 'm';
  }

  getRecentSleepStart(): Date {
    return SleepService.AllOvernightData[SleepService.AllOvernightData.length - 1].getSleepStart();
  }

  getRecentSleepEnd(): Date {
    return SleepService.AllOvernightData[SleepService.AllOvernightData.length - 1].getSleepEnd();
  }

  getRecentSleepStartString(): string {
    return SleepService.AllOvernightData[SleepService.AllOvernightData.length - 1].getSleepStart().toString();
  }

  getRecentSleepEndString(): string {
    return SleepService.AllOvernightData[SleepService.AllOvernightData.length - 1].getSleepEnd().toString();
  }

  back() {
    this.navCtrl.navigateBack('/home');
  }

}
