# H5Video.js

## 介绍

在HTML5手机平台项目中，我们经常使用Video视频来展示产品效果。但使用HTML原生的<video>标签，在手机端弹出播放等问题。这样我们无法自定义播放内容的样式以及增加互动效果。在过去我们使用序列帧来代替视频，但序列帧导致的文件大小非常惊人，而且画质也并非尽如人意。
我整理这个播放组件的目的就是提供一套目前来说在微信、微博等各类浏览器以及安卓IOS各系统下的兼容方案。旨在不弹出播放。并在目前主流手机内播放效率流程的最优解。

## 解决思路

### IOS 微信内：
支持<video>的webkit-playsinline属性，因此直接使用

### IOS 非微信：
例如iphone下的微博，QQ浏览器等。
使用了[iphone-inline-video项目](https://github.com/bfred-it/iphone-inline-video),这个项目利用修改ios下视频播放器样式的方法来屏蔽弹出，效果还不错。

### 安卓 微信内：
因为微信安卓版使用了腾讯X5内核，因此可以使用X5的相关属性playsinline x-webkit-airplay，x5-video-player-type，x5-video-player-fullscreen

### 安卓 非微信：
例如安卓下的微博，QQ浏览器等。
使用了canvas重新绘制视频内容的做法[JSMpeg](https://github.com/phoboslab/jsmpeg)。但因为文件过大渲染和加载非常慢卡顿严重，因此我建议视频每帧控制在1500kbs，但尺寸只导出原来的一半。

## 使用方法：

```javascript

    var h5vid = new cailven.H5Video();
    h5vid.init("mp4视频地址用于video标签", "ts视频地址用于canvas", "#videoContainer");

```

## API:
- play();
视频播放

- pause();
暂停

- seek(time);
跳转到某时间

- destroy();
销毁

- mute(bool);
是否静音；true为静音，false为不静音

- isIos();
是否ios设备；true为ios

- isInWX():
是否在微信里播放；true为微信

---
# H5VideoController控件

## 使用方法：

```javascript

   var timeConfig = [
          {
              time: 2.0, handle: function () {
              console.log("point1要做的事情")
          }
          }, {
              time: 5.0, handle: function () {
                  console.log("point2要做的事情")
              }
          }, {
              time: 8.0, handle: function () {
                  console.log("point3要做的事情")
              }
          },
      ]


      var h5VidController = new H5VideoController();
      h5VidController.start(h5vid.player, timeConfig);

```
## API:
- start(_player, _config)
开始监控，指定有效的player组件和config配置；config里必须包含time和handle来设置什么时间出发什么事件，精读为0.1秒。

- stop()
停止监控


## 感谢
[jsmpeg](https://github.com/phoboslab/jsmpeg) 的作者 [Dominic Szablewski](https://github.com/phoboslab);
[iphone-inline-video](https://github.com/bfred-it/iphone-inline-video)的作者[Federico Brigante](https://github.com/bfred-it)


