import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {SleepService} from '../services/sleep.service';

@Component({
  selector: 'app-view-data-report',
  templateUrl: './view-data-report.page.html',
  styleUrls: ['./view-data-report.page.scss'],
})
export class ViewDataReportPage implements OnInit {
  private allData: any;
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.allData = SleepService.AllSleepData;
  }

  back() {
    this.navCtrl.navigateBack('/home');
  }
}
