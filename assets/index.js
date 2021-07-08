if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js", {
      scope: "/",
    })
    .then(function (reg) {
      console.log(navigator, reg);
      // 从第三方服务器接收消息通知的能力
      if (window.PushManager) {
        reg.pushManager.getSubscription().then((subscription) => {
          // 如果用户没有订阅
          if (!subscription) {
            let serviceWorker;
            if (reg.installing) {
              serviceWorker = reg.installing;
            } else if (reg.waiting) {
              serviceWorker = reg.waiting;
            } else if (reg.active) {
              serviceWorker = reg.active;
            }
            serviceWorker.addEventListener("statechange", function (e) {
              console.log("sw statechange : ", e.target.state);
              if (e.target.state == "activated") {
                // use pushManger for subscribing here.
                console.log("Just now activated. now we can subscribe for push notification");
                subscribeUser(reg);
              }
            });
          } else {
            console.log("你已订阅消息服务");
          }
        });
      }

      console.log("注册成功，监听范围是" + reg.scope);
      navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage("页面发送消息给SW");
    })
    .catch(function (error) {
      console.log("注册失败" + error);
    });
}

navigator.serviceWorker.addEventListener("message", function (e) {
  const { origin, data } = event;
  console.log(`从源${origin}发送来的====>${data}`);
});

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function subscribeUser(swRegistration) {
  // 这里的公钥通过web-push生成，暂时可能是因为谷歌的GFM墙的原因不成功，看tool的pushMessage好了
  const applicationServerPublicKey =
    "BAdUQc5D_5qUD2Bk0KxRcyb_uDnKV4LS2Vd0rEfwh7VGoWTSBX1DCWkZbw1tTHH_FQqb9QkoZXRR5AMi7EXtwlw";
  const applicationServerKey = urlBase64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager
    .subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey,
    })
    // 用户同意
    .then(function (subscription) {
      console.log("User is subscribed:", JSON.stringify(subscription));
      // jQuery.post("/add-subscription.php", {
      //   subscription: JSON.stringify(subscription)
      // }, function (result) {
      //   console.log(result);
      // });
    })
    // 用户不同意或者生成失败
    .catch(function (err) {
      console.log("Failed to subscribe the user: ", err);
    });
}

const scope = 'http://127.0.0.1:8888/'
const uninstallBtn = document.getElementById("uninstall");
uninstallBtn.addEventListener("click", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (let registration of registrations) {
        if (registration && registration.scope === `${scope}`) {
          registration.unregister();
        }
      }
    });
  }
});
