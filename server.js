const webpush = require("web-push");
// VAPID keys should be generated only once.
console.log(webpush.generateVAPIDKeys());
var vapidPublicKey = "BAdUQc5D_5qUD2Bk0KxRcyb_uDnKV4LS2Vd0rEfwh7VGoWTSBX1DCWkZbw1tTHH_FQqb9QkoZXRR5AMi7EXtwlw";
var vapidPrivateKey = "Q-mskTejA1YTbJhx9I84TSVN8CCRUcSYXZ1IeJjqEo4";

webpush.setVapidDetails("mailto:myaccount@outlook.com", vapidPublicKey, vapidPrivateKey);

const pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/cxijTBekqhk:APA91bFFBGFUg4s54YuCsSEPpUA-v1lNHMoxt-f8u3gmqgIUtMogV2VLtfR3-xakZrNf9dTihYIYvGY5j0jpleqB3p55RKiHZhfZ59K5qipYhw3e-g3_hICUUvJIF2TKPnyxoyU2QJPr",
  expirationTime: null,
  keys: {
    p256dh: "BAZfJJsHbB8Ft_Ix6QN4WLoKuELS7yxSstg2xmPlW6os_YV7f5N92xQ3S-1dn1SPTXs9k4qWImYeRng1FJ-Jyxc",
    auth: "n0SoO_OBkptZAzJlGbwF3A",
  },
};

// push的数据
const payload = {
  title: "一篇新的文章",
  body: "点开看看吧",
  icon: "/html/app-manifest/logo_512.png",
  data: {
    url: "https://www.rrfed.com",
  },
  //badge: '/html/app-manifest/logo_512.png'
};

const options = {
  // headers: {
  //   Authorization:
  //     "key=1AAAA9hXQqUE:APA91bGUqvVig3pQ3JFQu3jq35XKZuUQRiu7dp4wUI0NtC41v4Ol4mZh2RGStLMXri7JjWDQZ1YiqdTz1TcZ8TAXs11h0QE-P5F3Z53_LQBMynRiLaNjRosGeG_5bVo_DLYlqwImp-2q",
  //   "Content-Type": "application/json",
  // },
};

webpush.sendNotification(pushSubscription, JSON.stringify(payload), options).catch(function (error) {
  console.log(error);
  process.exit(1);
});
