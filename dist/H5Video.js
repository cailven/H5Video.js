var H5Video = (function () {
    function H5Video() {
        this.containerName = "";
    }
    H5Video.prototype.setCanvas = function (vid_url) {
        this.isVid = false;
        var s = this;
        var canvas = document.createElement("canvas");
        document.querySelector(this.containerName).appendChild(canvas);
        this.player = new JSMpeg.Player(vid_url, {
            loop: false,
            autoplay: false,
            canvas: canvas,
        });
    };
    H5Video.prototype.setVideo = function (vid_url) {
        this.player = document.createElement("video");
        this.player.setAttribute("width", "100%");
        this.player.setAttribute("playsinline", "true");
        this.player.setAttribute("webkit-playsinline", "true");
        this.player.setAttribute("x-webkit-airplay", "true");
        this.player.setAttribute("x5-video-player-type", "h5");
        this.player.setAttribute("x5-video-player-fullscreen", "true");
        this.player.poster = "";
        this.player.src = vid_url;
        this.player.preload = "preload";
        this.player.controls = false;
        this.player.style.width = "100%";
        this.player.style.objectFit = "cover";
        this.player.style.backgroundSize = " 100% 100%;";
        document.querySelector(this.containerName).appendChild(this.player);
        this.isVid = true;
        if (!this.isInWX()) {
            this.addCss(".IIV::-webkit-media-controls-play-button,.IIV::-webkit-media-controls-start-playback-button {opacity: 0;pointer-events: none;width: 5px;} ");
            enableInlineVideo(this.player);
        }
    };
    H5Video.prototype.addCss = function (_stlye) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = _stlye;
        document.getElementsByTagName('head')[0].appendChild(style);
    };
    H5Video.prototype.init = function (mp4, vid, container) {
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
        this.player.play();
    };
    H5Video.prototype.pause = function () {
        this.player.pause();
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
}());
//# sourceMappingURL=H5Video.js.map