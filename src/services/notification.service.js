const { queryResult } = require('pg-promise');
const promisifyQuery=require('../utils/util')
const createNotification = async(req)=>{
    try {
        const data=req.body;
        const userId=data.userId;
         const event=data.event;
         const eventDetail=data.eventDetail;
         const timeStamp=new Date();
         const isRead= false;
         const metaData=data.metaData;
       const values=[
        userId,
        event,
        eventDetail,
        timeStamp,
        isRead,
        metaData
       ]

      const query = `INSERT INTO notification (user_id, event, event_detail, time_stamp, is_read, meta_data) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
      
    let result = await promisifyQuery.promisifyQuery(query,values);
   const queryResult = {
        status: 200,
        statusDescription: "Successfully Executed",
      };
      return queryResult;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw new Error('An error occurred while creating the notification.');
    }
  }
  
  // Mark a notification as read
const markNotificationAsRead=async(req)=>{
    try {
        const data=req.body;
        const notificationId=data.notificationId;
      const query = 'UPDATE notification SET is_read = true WHERE notification_id = $1 RETURNING *'
      const values=[notificationId]
      let result = await promisifyQuery.promisifyQuery(query,values);
     const queryResult = {
        status: 200,
        statusDescription: "Successfully Executed",
      };
      return queryResult;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw new Error('An error occurred while marking the notification as read.');
    }
  }
  
  // Delete a notification
const deleteNotification=async(req)=>{
    try {
        const data=req.body;
        const notificationId=data.notificationId; 
      const query ='DELETE FROM notification WHERE notification_id = $1 RETURNING *';
      const  values= [notificationId]
      
  
      const result = await promisifyQuery.promisifyQuery(query,values);
      const queryResult = {
        status: 200,
        statusDescription: "Successfully Executed",
      };
      return queryResult;
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw new Error('An error occurred while deleting the notification.');
    }
  }
  
  // Retrieve notifications for a specific user
const getNotifications=async() =>{
    try { 
      const query = 'SELECT * FROM notification JOIN user_detail ON notification.user_id = user_detail.user_id ORDER BY notification.time_stamp DESC'
      
  
      let result = await promisifyQuery.promisifyQuery(query);
      return result;
    } catch (error) {
      console.error('Error retrieving notifications:', error);
      throw new Error('An error occurred while retrieving notifications.');
    }
  }
  
const markAllNotificationsAsRead=async()=>{
    try {
      const query = 'UPDATE notification SET is_read = true'     
      let result = await promisifyQuery.promisifyQuery(query);
      const queryResult = {
        status: 200,
        statusDescription: "Successfully Executed",
      };
      return queryResult;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw new Error('An error occurred while marking all notifications as read.');
    }
  }
  const markAllNotificationsAsUnread=async()=>{
    try {
      const query = 'UPDATE notification SET is_read = false'     
      let result = await promisifyQuery.promisifyQuery(query);
      const queryResult = {
        status: 200,
        statusDescription: "Successfully Executed",
      };
      return queryResult;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw new Error('An error occurred while marking all notifications as read.');
    }
  }
   
  module.exports = {
    createNotification,
    markNotificationAsRead,
    deleteNotification,
    getNotifications,
    markAllNotificationsAsRead,
    markAllNotificationsAsUnread
  };
  