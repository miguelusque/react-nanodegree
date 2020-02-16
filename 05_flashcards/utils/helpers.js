// The content of this file is based on Udacifitness project
import { AsyncStorage} from 'react-native';
import {Notifications, Permissions} from 'expo';


const NOTIFICATION_KEY = 'flashcards:notification';

export const clearLocalNotification = () => (
  AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
);

const createNotification = () => ({
  title: 'Study time!',
  body: '👋  don‘t forget study a bit today!',
  ios: {
    sound: true,
  },
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true
  }
});

export const setLocalNotification = () => (
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(JSON.parse)
  .then((data) => {
    if (data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(
              createNotification(), {time: tomorrow, repeat: 'day'}
            );

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
    }
  })
);
