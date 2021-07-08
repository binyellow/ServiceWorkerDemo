const webpush = require("web-push");
// VAPID keys should be generated only once.
console.log(webpush.generateVAPIDKeys());
const key = {
  publicKey: "BKiZQsVXCphqnpsKCb864-8erc6ePbIMxEIdT0mKF9MLA5-fBdrxKY-4wa3LSvo7e6hnoiSZD3SofoTHU7Ulbzw",
  privateKey: "_IpBm5vuRZVMKJaUBoXVnZI-fkaJYnXW0HWaoGMf0No",
};

webpush.setVapidDetails("mailto:myaccount@outlook.com", key.publicKey, key.privateKey);

const pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/cUBDFyUnx_Y:APA91bHVePEwEHWbQz5bPQ9Rs_ADgRX_7cviKOKeao8I2mH5CnlNHSAivYuPHNyUhRk7E27TjCqwlrUDEYzEMufuWWcGsFwtn7vR50cht27aX8a2LeXd2y2ttC7bw5PVDLZVEYwjPDZ4",
  expirationTime: null,
  keys: {
    p256dh: "BIOkrhdpHuOWa6Rfwgz0fn2GdTbPH0JS0scaVS5EuI734wSbx13jxyIetOLht3mjQv2ptJf9-9-Op7oYdfdi7Tg",
    auth: "CRI3k0HiFtAGYXaQzjy7rQ",
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
