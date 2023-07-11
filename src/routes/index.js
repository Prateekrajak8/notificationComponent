const express = require('express');
const router = express.Router();
const app = express();
const port = 3000;
const { serverConnection } = require('../utils/util');
const notificationController = require('../controller/notification.controller');
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

const startServer = async () => {
  try {
    await serverConnection;
    console.log('Connected to the PostgreSQL database');

    // Register the createNotification route
    router.route('/createNotification').post(notificationController.createNotification);
    router.route('/markNotificationAsRead').post(notificationController.markNotificationAsRead);
    router.route('/deleteNotification').post(notificationController.deleteNotification);
    router.route('/markAllNotificationsAsRead').post(notificationController.markAllNotificationsAsRead);
    router.route('/getNotification').get(notificationController.notifications);
    router.route('/markAllNotificationsAsUnread').post(notificationController.markAllNotificationsAsUnread);

    // Register the router middleware
    app.use('/', router);

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to the PostgreSQL database:', error);
  }
};

startServer();




