var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var cailven;
(function (cailven) {
    var H5Video = (function (_super) {
        __extends(H5Video, _super);
        function H5Video() {
            var _this = _super.call(this) || this;
            _this.duration = 100;
            _this.containerName = "";
            return _this;
        }
        H5Video.prototype.addCss = function (_stlye) {
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = _stlye;
            document.getElementsByTagName('head')[0].appendChild(style);
        };
        H5Video.prototype.setCanvas = function (vid_url) {
            this.isVid = false;
            var s = this;
            var str = "<canvas id='video-canvas'></canvas>";
            $(this.containerName).html(str);
            var canvas = document.getElementById('video-canvas');
            this.player = new JSMpeg.Player(vid_url, {
                loop: false,
                autoplay: false,
                canvas: canvas,
            });
            function onUnlocked() {
                document.removeEventListener('touchstart', onTouchStart);
            }
            function onTouchStart() {
                s.player.audioOut.unlock(onUnlocked);
                document.removeEventListener('touchstart', onTouchStart);
            }
            this.player.audioOut.unlock(onUnlocked);
            document.addEventListener('touchstart', onTouchStart, false);
            setTimeout(function () {
                s.fireEvent({
                    type: "canplay"
                });
            }, 500);
        };
        H5Video.prototype.setVideo = function (vid_url) {
            var self = this;
            this.addCss(" video {position: absolute;top: 0;left: 0;width: 100%;object-fit: cover;background-size: 100% 100%;}");
            var str = '<video id="video" preload="preload" src="' + vid_url + '" width="100%"  webkit-playsinline="true" playsinline x-webkit-airplay="true" x5-video-player-type="h5" x5-video-player-fullscreen="true"></video>';
            $(this.containerName).html(str);
            this.isVid = true;
            this.player = $("#video").get(0);
            if (!this.isInWX()) {
                this.addCss(".IIV::-webkit-media-controls-play-button,.IIV::-webkit-media-controls-start-playback-button {opacity: 0;pointer-events: none;width: 5px;} ");
                enableInlineVideo(this.player);
            }
            this.player.oncanplay = function () {
            };
            setTimeout(function () {
                self.fireEvent({
                    type: "canplay"
                });
            }, 500);
        };
        H5Video.prototype.init = function (mp4, vid, container) {
            var s = this;
            this.containerName = container;
            if (this.isInWX()) {
                this.setVideo(mp4);
            }
            else {
                if (this.isIos()) {
                    this.setVideo(mp4);
                }
                else {
                    if (vid == "") {
                        this.setVideo(mp4);
                    }
                    else {
                        this.setCanvas(vid);
                    }
                }
            }
        };
        H5Video.prototype.isIos = function () {
            var u = navigator.userAgent;
            if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                return true;
            }
            else {
                return false;
            }
        };
        H5Video.prototype.isInWX = function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            var ua = navigator.userAgent.toLowerCase();
            var t = ua.match(/MicroMessenger/i) + "";
            if (t == "micromessenger") {
                return true;
            }
            else {
                return false;
            }
        };
        H5Video.prototype.seek = function (t) {
            this.player.currentTime = t;
        };
        H5Video.prototype.destroy = function () {
            if (this.isVid) {
                this.player.muted;
                this.player.pause();
                $("#video").remove();
            }
            else {
                this.player.volume = 0;
                this.player.destroy();
                $("#video-canvas").remove();
            }
        };
        H5Video.prototype.play = function () {
            if (this.isVid) {
                this.player.play();
            }
            else {
                this.player.play();
            }
        };
        H5Video.prototype.pause = function () {
            if (this.isVid) {
                this.player.pause();
            }
            else {
                this.player.pause();
            }
        };
        H5Video.prototype.mute = function (bool) {
            if (bool) {
                if (this.isVid) {
                    this.player.muted = true;
                }
                else {
                    this.player.volume = 0;
                }
            }
            else {
                if (this.isVid) {
                    this.player.muted = false;
                }
                else {
                    this.player.volume = 1;
                }
            }
        };
        return H5Video;
    }(H5Event));
    cailven.H5Video = H5Video;
})(cailven || (cailven = {}));
//# sourceMappingURL=H5Video.js.map