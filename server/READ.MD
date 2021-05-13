// service-worker 流程分析  
1 》》 当前origin service-worker被首次加载时会直接Install -》actived   只要安装intall的时候才会触发updatefound事件
2 》》 当前origin 已有service-worker时，当注册成功后会直接触发install事件，但是不会触发active事件， 而是等到当前origin的页面所有页面不被使用的时候才会触发， 此时新的servicework 会进入waiting阶段 即 install -》》 awaiting -》》 active

awaiting阶段会有3种方式更新servicewoker 
1. 在install直接更新， 即使用skipWaiting 跳过等待阶段直接执行 新的worker接管页面 弊端：如果当前使用的是缓存优先的策略 或者当前网络离线，可能会造成请求不到图片 
2. 在1的前提下 给service worker容器监听 controllerchange事件（就是在注册服务的地方） 此时事件在有新的service worker对象是触发 
3. 由用户触发 在更新站点的时候给出弹窗提示，由用户决定是否更新  如果更新 通过postmessage
