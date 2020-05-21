// const webpush = require('web-push');
// //VAPID keys should only be generated only once. Eaqsco8SxgUFbhtA0jehy1Q7Kr3JJ_SrRVZwzP9xByY
// const vapidKeys = webpush.generateVAPIDKeys();
// console.log(vapidKeys.publicKey, vapidKeys.privateKey);

const webpush = require('web-push');
// 从数据库取出用户的subsciption
const pushSubscription = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/d3sYGqcqfU4:APA91bE-LTE24QpTeHQtlWnhTo5FFM90WGWzBLBOqdMTAp91RkfaDlFNVikyjbsi5370ocCDDY2T39K-_-7vVbHga3t6TqlTrCQtlFuFNZGvlFmjCNMOFxGKAew1MIXxaWrpZ9zo8RGB",
  "expirationTime": null,
  "keys": {
    "p256dh": "BD9V0c10hJTKvT80FbiaaPfWgepzyPOmi0iZrMGMYX6EM1SoCIjLCNiJusTVVOOgbZjTwMI6T2w68y9SwifK3Pk",
    "auth": "02nKfMjlG22EBx7h_K8k5A"
  }
}

// push的数据
const payload = {
  title: '一篇新的文章',
  body: '点开看看吧',
  icon: '/html/app-manifest/logo_512.png',
  data: {
    url: "https://www.rrfed.com"
  }
  //badge: '/html/app-manifest/logo_512.png'
};

webpush.sendNotification(pushSubscription, JSON.stringify(payload))
  .catch(function (error) {
    console.log(error);
    process.exit(1);
  });