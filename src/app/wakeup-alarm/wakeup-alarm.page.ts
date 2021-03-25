import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { Plugins, LocalNotificationEnabledResult, LocalNotificationActionPerformed, LocalNotification, Device} from '@capacitor/core';
import { AlertController } from '@ionic/angular';
const { LocalNotifications } = Plugins;

@Component({
  selector: 'app-wakeup-alarm',
  templateUrl: './wakeup-alarm.page.html',
  styleUrls: ['./wakeup-alarm.page.scss'],
})
export class WakeupAlarmPage implements OnInit {
  private wakeupTime: Date;
  private defaultTime: Date;
  private wakeupTimeSet: Date;
  private once: boolean;
  private everyday: boolean;
  private id: number;
  constructor(private navCtrl: NavController, private alertCtrl: AlertController) { }

  async ngOnInit() {
    this.once = false;
    this.everyday = false;
    this.wakeupTime = new Date();
    this.wakeupTimeSet = null;
    this.defaultTime = new Date();
    this.id = 1;
    // initialize for the user to allow notifications
    await LocalNotifications.requestPermission();
    // general registration of local notifications
    LocalNotifications.registerActionTypes({
      types: [
        {
          id: 'CHAT_MSG',
          actions: [
            {
              id: 'view',
              title: 'Open Chat'
            },
            {
              id: 'remove',
              title: 'Dismiss',
              destructive: true
            },
            {
              id: 'respond',
              title: 'Respond',
              input: true
            }
          ]
        }
      ]
    });
  }

  timeChanged(event){
    this.wakeupTimeSet = this.wakeupTime;
  }

  async addWakeupTimeAlarm(event){
    if (this.wakeupTimeSet != null){
      // parse wakeup time from picker format 00:00 (hh: mm)
      const hours = parseInt(this.wakeupTime.toString().substring(0,2));
      const minutes = parseInt(this.wakeupTime.toString().substring(3, 5));
      this.wakeupTimeSet = new Date(this.defaultTime.getFullYear(), this.defaultTime.getMonth(),
                                  this.defaultTime.getDate(), hours, minutes);

      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Friendly Reminder',
            body: 'Your Wakeup Alarm is Set',
            id: 1,
            extra: {
              data: 'Pass data to your handler'
            },
            iconColor: '#FF0000',
            actionTypeId: 'CHAT_MSG',
          },

          {
            title: 'Friendly Reminder',
            body: 'Time To Wakeup',
            id: 1,
            extra: {
              data: 'Pass data to your handler'
            },
            iconColor: '#FF0000',
            actionTypeId: 'CHAT_MSG',
            schedule: { at: this.wakeupTimeSet},
          },
        ]
      });
      if (this.everyday){
        await LocalNotifications.schedule({
          notifications: [
            {
              title: 'Friendly Reminder',
              body: 'Your Everyday Wakeup Alarm is Set',
              id: 1,
              extra: {
                data: 'Pass data to your handler'
              },
              iconColor: '#FF0000',
              actionTypeId: 'CHAT_MSG',
            },

            {
              title: 'Friendly Reminder',
              body: 'Time To Wakeup',
              id: 1,
              extra: {
                data: 'Pass data to your handler'
              },
              iconColor: '#FF0000',
              actionTypeId: 'CHAT_MSG',
              schedule: { at: this.wakeupTimeSet},
            },
          ]
        });
      }
      this.wakeupTimeSet = null;
    }
  }

  back() {
    this.wakeupTimeSet = null;
    this.navCtrl.navigateBack('/home');
  }

}
