// 基本信息
1. ServiceWorkerContainer service container  即navigator.serviceWorker对象 具有以下属性和方法 及事件
一. 事件
oncontrollerchange 事件， 触发时机： 当控制的sw脚本更新的时候触发
onerror事件，当sw脚本传递信息失败时触发
onmessage事件， 当service woker 工作scope是 通过postmessage传递信息触发
二.方法
register: 注册sw脚本 返回一个promise  参数为脚本的url 注意只能加载同域的脚本 和localhost
getRegistration: 获取注册成功的注册对象 参数为传递给register的scope参数
三.属性
controller：返回当前的service对象， 前提是当前页面已受到service woker的管理  即当前的状态是activing和actived 否则返回空  使用它可以判断当前是否有已激活的service worker
2. ServiceWorkerRegistration对象 即注册成功返回的注册对象  
一. 事件
onupdatefound 事件， 触发时机： 当前的state改变的时候 即在service 工作scope是 触发 install和active事件的时候， 每次触发需更新的时候可以获取serviceworker
二.方法
navigationPreload： 重新加载页面
update:更新servicer和注册方法类似 返回一个promises 
unregister 卸载当前service worker
三.属性
属性主要获取service worker对象  主要有以下属性
active， installing, waiting , 三个属性
3.ServiceWorkerGlobalScope 对象
和全局作用域一样
4.ServiceWorker对象
二.方法
onstatechange：state改变就会被触发  状态值installing, installed, activating, activated, or redundant.


// service-worker 流程分析  
1 》》 当前origin service-worker被首次加载时会直接Install -》actived   只要安装intall的时候才会触发updatefound事件
2 》》 当前origin 已有service-worker时，当注册成功后会直接触发install事件，但是不会触发active事件， 而是等到当前origin的页面所有页面不被使用的时候才会触发， 此时新的servicework 会进入waiting阶段 即 install -》》 awaiting -》》 active

awaiting阶段会有3种方式更新servicewoker 
1. 在install直接更新， 即使用skipWaiting 跳过等待阶段直接执行 新的worker接管页面 弊端：如果当前使用的是缓存优先的策略 或者当前网络离线，可能会造成请求不到图片 
2. 在1的前提下 给service worker容器监听 controllerchange事件（就是在注册服务的地方） 此时事件在有新的service worker对象是触发 
3. 由用户触发 在更新站点的时候给出弹窗提示，由用户决定是否更新  如果更新 通过postmessage
