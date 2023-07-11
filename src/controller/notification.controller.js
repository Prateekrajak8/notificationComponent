const notificationService=require('../services/notification.service');
const { responseForward } = require('../utils/util');
const createNotification = async (req,res)=>{
    const data = await notificationService.createNotification(req);
    return responseForward(data, 'service', res);
  };
  const  markNotificationAsRead= async (req,res)=>{
    const data = await notificationService.markNotificationAsRead(req);
   return responseForward(data, 'service', res);
  };
  const  deleteNotification= async (req,res)=>{
    const data = await notificationService.deleteNotification(req);
    return responseForward(data, 'service', res);
  };
  const  notifications= async (req,res)=>{
    const data = await notificationService.getNotifications();
    return responseForward(data, 'service', res);
  };
  const  markAllNotificationsAsRead= async (req,res)=>{
    const data = await notificationService.markAllNotificationsAsRead();
    return responseForward(data, 'service', res);
  };  
  const  markAllNotificationsAsUnread= async (req,res)=>{
    const data = await notificationService.markAllNotificationsAsUnread();
    return responseForward(data, 'service', res);
  };  
  module.exports={
    createNotification,
    markNotificationAsRead,
    deleteNotification,
    notifications,
    markAllNotificationsAsRead,
    markAllNotificationsAsUnread
  }