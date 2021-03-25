import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {SleepService} from '../services/sleep.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-view-sleepiness-data',
  templateUrl: './view-sleepiness-data.page.html',
  styleUrls: ['./view-sleepiness-data.page.scss'],
})
export class ViewSleepinessDataPage implements OnInit {
  private weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(public navCtrl: NavController, sleepService: SleepService) { }

  ngOnInit() {
    this.getStackedBarChart();
    this.getMostRecentLog();
    this.getAvgSleepiness();
    this.getMostSleepyDayOfWeek();
    this.getMostAwakeDayOfWeek();
  }

  getAvgSleepiness(){
    const data = SleepService.AllSleepinessData;
    let avg = 0.0;
    let total = 0.0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < data.length; i++ ){
      total = total + data[i].getLoggedValue();
    }
    avg = total / data.length;
    return avg;
  }

  getMostRecentLog(){
    const result = SleepService.AllSleepinessData[SleepService.AllSleepinessData.length - 1];
    return result.getLoggedValue();
  }

  getMostRecentDate(){
    const result = SleepService.AllSleepinessData[SleepService.AllSleepinessData.length - 1];
    return result.getLoggedAt();
  }

  getStackedBarChart(){
    /*
    create a stacked bar chart with the x-axis day of the week
    and the y-axis values stacked
     */
    const data = SleepService.AllSleepinessData;
    console.log(data.length);
    const ones = [0, 0, 0, 0, 0, 0, 0];
    const twos = [0, 0, 0, 0, 0, 0, 0];
    const threes = [0, 0, 0, 0, 0, 0, 0];
    const fours = [0, 0, 0, 0, 0, 0, 0];
    const fives = [0, 0, 0, 0, 0, 0, 0];
    const sixes = [0, 0, 0, 0, 0, 0, 0];
    const sevens = [0, 0, 0, 0, 0, 0, 0];
    console.log(data.length);
    // the array is organized by the day of the week
    // for ex. mondays = [7,6,5,4,3,2,1] the user logged sleepiness value 1 7x.
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < data.length; ++i){
        if (data[i].getLoggedValue() === 1){
          ones[data[i].getLoggedAt().getDay()] += 1;
        }
        if (data[i].getLoggedValue() === 2){
          twos[data[i].getLoggedAt().getDay()] += 1;
        }
        if (data[i].getLoggedValue() === 3){
          threes[data[i].getLoggedAt().getDay()] += 1;
        }
        if (data[i].getLoggedValue() === 4){
          fours[data[i].getLoggedAt().getDay()] += 1;
        }
        if (data[i].getLoggedValue() === 5){
          fives[data[i].getLoggedAt().getDay()] += 1;
        }
        if (data[i].getLoggedValue() === 6){
          sixes[data[i].getLoggedAt().getDay()] += 1;
        }
        if (data[i].getLoggedValue() === 7){
          sevens[data[i].getLoggedAt().getDay()] += 1;
        }
    }
    // @ts-ignore
    const stackedBar = new Chart('chart1', {
      type: 'bar',
      data: {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
          {label: '1', data: ones, backgroundColor: '#673C4F'},
          {label: '2', data: twos, backgroundColor: '#7F557D'},
          {label: '3', data: threes, backgroundColor: '#C89BB0'},
          {label: '4', data: fours, backgroundColor: '#8cc2e0'},
          {label: '5', data: fives, backgroundColor: '#7698B3'},
          {label: '6', data: sixes, backgroundColor: '#4661a5'},
          {label: '7', data: sevens, backgroundColor: '#4a6c7e'},
        ]
      },
      options: {
        scales: {
          xAxes: [{stacked: true}],
          yAxes: [{stacked: true}]
        },
        legend: {
          display: true,
          position: 'bottom'
        }
      }
    });
  }

  getMostSleepyDayOfWeek(): string{
    let highest = SleepService.AllSleepinessData[0];
    for (let i = 1; i < SleepService.AllSleepinessData.length; ++i){
      if (highest.getLoggedValue() < SleepService.AllSleepinessData[i].getLoggedValue()){
        highest = SleepService.AllSleepinessData[i];
      }
    }
    return this.weekday[highest.getLoggedAt().getDay()];
  }

  getMostAwakeDayOfWeek(): string{
    let lowest = SleepService.AllSleepinessData[0];
    for (let i = 1; i < SleepService.AllSleepinessData.length; ++i){
      if (lowest.getLoggedValue() > SleepService.AllSleepinessData[i].getLoggedValue()){
        lowest = SleepService.AllSleepinessData[i];
      }
    }
    return this.weekday[lowest.getLoggedAt().getDay()];
  }

  back() {
    this.navCtrl.navigateBack('/home');
  }
}
