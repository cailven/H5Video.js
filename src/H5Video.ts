class H5Video  {
    constructor() {
    }

    public player;
    public isVid;
    private setCanvas(vid_url:string) {
        this.isVid = false;
        var s = this;
        var canvas = document.createElement("canvas");
        document.querySelector(this.containerName).appendChild(canvas);
        this.player = new JSMpeg.Player(vid_url, {
            loop: false,
            autoplay: false,
            canvas: canvas,
        });
    }
    private setVideo(vid_url:string) {
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
    }
    private addCss(_stlye:string) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = _stlye;
        document.getElementsByTagName('head')[0].appendChild(style);
    }
    private containerName:string = "";
    public init(mp4:string, vid:string, container:string) {
        this.containerName = container;
        if (this.isInWX()) {
            this.setVideo(mp4);
        } else {
            if (this.isIos()) {
                this.setVideo(mp4);
            } else {
                if (vid == "") {
                    this.setVideo(mp4);
                } else {
                    this.setCanvas(vid);
                }
            }
        }
    }
    public isIos():boolean {
        var u = navigator.userAgent;
        if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            return true;
        } else {
            return false;
        }
    }
    public isInWX():boolean {
        var ua:string = navigator.userAgent.toLowerCase();
        var t:string = ua.match(/MicroMessenger/i) + "";
        if (t == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }
    public seek(t) {
        this.player.currentTime = t;
    }
    public destroy() {
        if (this.isVid) {
            this.player.muted;
            this.player.pause();
            $("#video").remove();
        } else {
            this.player.volume = 0;
            this.player.destroy();
            $("#video-canvas").remove();

        }
    }
    public play() {
        this.player.play();
    }
    public pause() {
        this.player.pause();
    }
    public mute(bool) {
        if (bool) {
            if (this.isVid) {
                this.player.muted = true;
            } else {
                this.player.volume = 0;
            }
        } else {
            if (this.isVid) {
                this.player.muted = false;
            } else {
                this.player.volume = 1;
            }
        }
    }
}