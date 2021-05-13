const CASH_NAME = "cache_name";

// 用于waiting
// self.addEventListener("install", (event) => {
//     console.log("触发install事件");
//     // 安装过程下载缓存一些资源
//     event.waitUntil(
//       caches.open(CASH_NAME).then((cache) => {
//         return cache.addAll(["./img.png"]);
//       })
//     );
//     self.skipWaiting() // 跳过等待
//   });

self.addEventListener("install", (event) => {
  console.log("触发install事件");
  // 安装过程下载缓存一些资源
  event.waitUntil(
    caches.open(CASH_NAME).then((cache) => {
      return cache.addAll(["./img.png"]);
    })
  );
});
self.addEventListener("activate", (event) => {
  console.log("触发activate事件");
  //主要清理一些旧service worker的资源
  event.waitUntil(
    caches.keys().then((r) => {
      r.filter((c) => c === CASH_NAME).forEach((v) => {
        caches.delete(v);
      });
    })
  );
});

// 对于更新service worker  流程为
// 给出提示表示站点有重大更新 -》 由操作者进行点击操作 通过postMessage 向servie woker 工作域发送请求

self.addEventListener("message", (e) => {
  let message = e.data
  if (message === "skipWaiting") {
      console.log("跳过 vvvv", )
    self.skipWaiting();
  }
});
// 拦截请求
