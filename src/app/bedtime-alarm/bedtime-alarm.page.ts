import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { Plugins} from '@capacitor/core';
import { AlertController } from '@ionic/angular';
const { LocalNotifications } = Plugins;

@Component({
  selector: 'app-bedtime-alarm',
  templateUrl: './bedtime-alarm.page.html',
  styleUrls: ['./bedtime-alarm.page.scss'],
})

export class BedtimeAlarmPage implements OnInit {
  private bedTime: Date;
  private defaultTime: Date;
  private bedTimeSet: Date;
  private once: boolean;
  private everyday: boolean;
  private id: number;
  constructor(private navCtrl: NavController, private alertCtrl: AlertController) { }

  async ngOnInit() {
    this.once = false;
    this.bedTime = new Date();
    this.bedTimeSet = null;
    this.defaultTime = new Date();
    this.id = 1;
    // initialize for the user to allow notifications
    await LocalNotifications.requestPermission();
  }

  timeChanged(event){
    this.bedTimeSet = this.bedTime;
  }

  async addBedtimeAlarm(event){
    if (this.bedTimeSet != null){
      // tslint:disable-next-line:radix
      const hours = parseInt(this.bedTime.toString().substring(0, 2));
      // tslint:disable-next-line:radix
      const minutes = parseInt(this.bedTime.toString().substring(3, 5));
      this.bedTimeSet = new Date(this.defaultTime.getFullYear(), this.defaultTime.getMonth(),
                                this.defaultTime.getDate(), hours, minutes);

      // the next section schedules the local notification at least once, even if the toggle is not on
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Friendly Reminder',
            body: 'Your Bedtime Alarm is Set for One Day',
            id: 1,
            extra: {
                data: 'Pass data to your handler'
              },
            iconColor: '#FF0000',
            actionTypeId: 'CHAT_MSG',
          },
          {
            title: 'Friendly Reminder',
            body: 'Time To Go To Bed',
            id: 1,
            extra: {
              data: 'Pass data to your handler'
            },
            iconColor: '#FF0000',
            // actionTypeId: 'CHAT_MSG',
            schedule: { at: this.bedTimeSet,
                        every: 'day',
                        count: 1,
                        },
          },
        ]
      });

      // // the next section schedules the local notification to everyday, only if the toggle is on
      if (this.everyday){
        await LocalNotifications.schedule({
          notifications: [
            {
              title: 'Friendly Reminder',
              body: 'Your Everyday Bedtime Alarm is Set',
              id: 1,
              extra: {
                data: 'Pass data to your handler'
              },
              iconColor: '#FF0000',
              actionTypeId: 'CHAT_MSG',
            },

            {
              title: 'Friendly Reminder',
              body: 'Time To Go To Bed',
              id: 1,
              extra: {
                data: 'Pass data to your handler'
              },
              iconColor: '#FF0000',
              // actionTypeId: 'CHAT_MSG',
              schedule: { at: this.bedTimeSet,
                          every: 'day',
                          count: 1,
                          repeats: true,
              },
            },
          ]
        });
        this.everyday = false;
      }
    }
  }

  back() {
    this.bedTimeSet = null;
    this.navCtrl.navigateBack('/home');
  }
}
