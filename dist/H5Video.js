var cailven;
(function (cailven) {
    var H5Video = (function () {
        function H5Video() {
            this.containerName = "";
        }
        H5Video.prototype.destroy = function () {
            if (this.isVid) {
                this.player.muted;
                this.player.pause();
                $("#video").remove();
            }
            else {
                this.player.volume = 0;
                this.player.destroy();
            }
        };
        H5Video.prototype.play = function () {
            if (this.isVid) {
                var s = this;
                s.seek(0.0);
                s.player.play();
            }
            else {
                this.player.play();
            }
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
            setTimeout(function () {
                var v = ($("#video-canvas").height() - window.innerHeight) / 2;
                $("#video-canvas").css("top", v * -1 + "px");
            }, 2500);
            function onUnlocked() {
                document.removeEventListener('touchstart', onTouchStart);
            }
            function onTouchStart() {
                s.player.audioOut.unlock(onUnlocked);
                document.removeEventListener('touchstart', onTouchStart);
            }
            this.player.audioOut.unlock(onUnlocked);
            document.addEventListener('touchstart', onTouchStart, false);
        };
        H5Video.prototype.setVideo = function (vid_url) {
            var str = '<video id="video" preload="preload" src="' + vid_url + '" width="100%"  webkit-playsinline="true" playsinline x-webkit-airplay="true" x5-video-player-type="h5" x5-video-player-fullscreen="true"></video>';
            $(this.containerName).html(str);
            this.isVid = true;
            this.player = $("#video").get(0);
            if (!this.isInWX()) {
                enableInlineVideo(this.player);
            }
            setTimeout(function () {
                var v = ($("#video").height() - window.innerHeight) / 2;
                var _y = v;
                $("#video").css("top", _y * -1 + "px");
            }, 200);
        };
        H5Video.prototype.seek = function (t) {
            if (this.isVid) {
                this.player.currentTime = t;
            }
            else {
                this.player.seek(t);
            }
        };
        H5Video.prototype.init = function (mp4, vid, container) {
            var s = this;
            if (this.isInWX()) {
                this.setVideo(mp4);
            }
            else {
                if (this.isIos()) {
                    this.setVideo(mp4);
                }
                else {
                    this.setCanvas(vid);
                }
            }
            this.containerName = container;
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
        return H5Video;
    }());
    cailven.H5Video = H5Video;
})(cailven || (cailven = {}));
//# sourceMappingURL=H5Video.js.map