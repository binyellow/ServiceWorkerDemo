const CACHE_KEY = 'demo';
const CACHE_FILES = [
  'service-worker.js',
  '/',
  '/index.html',
  'bg.jpg',
  'index.js',
  'index.css'
];


self.addEventListener('install', function (event) { // 监听worker的install事件
  event.waitUntil( // 延迟install事件直至Cache初始化完成
    caches.open(CACHE_KEY)
    .then(function (cache) {
      console.log('Cache created');
      return cache.addAll(CACHE_FILES);
    })
  );
});

self.addEventListener('activate', function (event) { // 监听worker的activate事件
  console.log(self);
  event.waitUntil( // 延迟activate事件直到Cache初始化完成
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key, i) { // 清除旧版本缓存
        if (key !== CACHE_KEY) {
          return caches.delete(keys[i]);
        }
      }))
    })
  )
});

// self.addEventListener('fetch', function (event) { // 拦截资源请求
//   event.respondWith( // 返回资源请求
//     caches.match(event.request).then(function (res) { // 判断是否命中缓存
//       if (res) { // 返回缓存的资源
//         return res;
//       }
//       fallback(event); // 执行请求备份操作
//     })
//   )
// });

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(res => {
      return res ||
        fetch(event.request)
        .then(response => {
          // 因为对请求和响应流只能取一次，固克隆一下
          const responseClone = response.clone();
          console.log(responseClone);
          caches.open('demo').then(cache => {
            cache.put(event.request, responseClone);
          })
          return response;
        })
        .catch(err => {
          console.log(err);
        });
    })
  )
});


function fallback(event) { // 恢复原始请求
  const url = event.request.clone();
  return fetch(url).then(function (res) { // 请求资源
    //if not a valid response send the error
    if (!res || res.status !== 200 || res.type !== 'basic') {
      return res;
    }

    const response = res.clone();

    caches.open(CACHE_KEY).then(function (cache) { // 缓存从刚刚下载的资源
      cache.put(event.request, response);
    });

    return res;
  })
}

this.addEventListener('message', function (event) {
  const {
    origin,
    data,
    source,
  } = event;
  console.log(`从源${origin}发送来的====>${data}`);
  source.postMessage('从SW发送消息给页面');
});

this.addEventListener('push', function (event) {
  console.log(event);
  console.log(`服务端推送的消息是: "${event.data.text()}"`);

  const title = '好消息！好消息！';
  const options = {
    body: event.data.text(),
    icon: 'bg.png',
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    // badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

this.addEventListener('notificationclick', function (event) {
  console.log();

  let notification = event.notification;
  notification.close();
  event.waitUntil(
    // notification.data.url || 
    clients.openWindow('https://baidu.com')
  );
});