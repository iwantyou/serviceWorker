if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service.js", { scope: "./" }).then((reg) => {
      if (reg.waiting) {
        // 更新  awaiting只有在有新的service worker加载是且有页面还在使用旧的service worker 会处于等待状态
        // 代表 有新的serviceworker请求
      }
      reg.addEventListener("updatefound", () => {
        // 表示状态发生改变
        var service;
        if (reg.installing) {
          service = reg.installing;
          service.onstatechange = () => {

          }
        }
      });
    });
  });
}
