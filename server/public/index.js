// service-worker 的流程分析
document.body.addEventListener(
  "update",
  () => {
    let fragment = document.createDocumentFragment();
    let span = document.createElement("span");
    span.textContent = "网站已更新， 是否刷新";
    span.style.cssText = "position:absolute, top: 100px, right:40px";
    console.log("sssssss");
    span.addEventListener("click", () => {
      console.log("触发click");
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg.waiting) {
          reg.waiting.postMessage("skipWaiting");
        }
      });
    });
    fragment.appendChild(span);
    document.body.appendChild(fragment);
  },
  false
);
function tips() {
  console.log("触发");
  let e;
  try {
    e = new Event("update", { bubbles: true, cancelable: true }); // 不支持
  } catch (error) {
    e = document.createEvent("Event");
    e.initEvent("update", true, true);
  }
    document.dispatchEvent(e);
}


if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service.js", { scope: "./" }).then((reg) => {
      console.log("安装成功");
      if (reg.waiting) {
        // 通知浏览器弹出弹窗
        console.log("watinng");
        tips();
        // 更新  awaiting只有在有新的service worker加载是且有页面还在使用旧的service worker 会处于等待状态
        // 代表 有新的serviceworker请求
      }
      reg.addEventListener("updatefound", () => {
        console.log("状态发生变化");
        // 表示状态发生改变
        var service;
        if (reg.installing) {
          service = reg.installing;
          service.onstatechange = () => {
            if (service.state === "installed") {
            }
          };
        }
      });
    });
    navigator.serviceWorker.oncontrollerchange = () => {
      console.log("触发重新刷新");
      window.location.reload();
    };
  });
}
