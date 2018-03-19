module cailven {
    export class VideoCanvas {
        constructor() {
        }

        public player;
        public isVid;


        public destroy() {
            if (this.isVid) {
                this.player.muted;
                this.player.pause();
                $("#video").remove();
            } else {
                this.player.volume = 0;
                this.player.destroy();
            }
        }

        public play() {
            if (this.isVid) {
                var s = this;
                s.seek(0.0);
                s.player.play();
            } else {
                this.player.play();
            }

        }


        private setCanvas(vid_url:string) {
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
                // alert("top:" + v);
            }, 2500);


            function onUnlocked() {
                document.removeEventListener('touchstart', onTouchStart)
            }

            function onTouchStart() {
                s.player.audioOut.unlock(onUnlocked)
                document.removeEventListener('touchstart', onTouchStart)
            }

            this.player.audioOut.unlock(onUnlocked)
            document.addEventListener('touchstart', onTouchStart, false)
        }

        private setVideo(vid_url:string) {
            var str = '<video id="video" preload="preload" src="' + vid_url + '" width="100%"  webkit-playsinline="true" playsinline x-webkit-airplay="true" x5-video-player-type="h5" x5-video-player-fullscreen="true"></video>';

            $(this.containerName).html(str);
            this.isVid = true;
            this.player = $("#video").get(0);


            if (!this.isInWX()) {
                enableInlineVideo(this.player);
            }

            // var WinH = window.innerHeight * (750 / window.innerWidth);
            setTimeout(function () {
                var v = ($("#video").height() - window.innerHeight) / 2
                var _y = v;
                $("#video").css("top", _y * -1 + "px");
            }, 200)

        }

        public seek(t) {
            if (this.isVid) {
                this.player.currentTime = t;
            } else {
                this.player.seek(t);
            }
        }

        private containerName:string = "";


        public init(mp4:string, vid:string, container:string) {
            var s = this;

            if (this.isInWX()) {
                this.setVideo(mp4);
            } else {
                if (this.isIos()) {
                    this.setVideo(mp4);
                } else {
                    this.setCanvas(vid);
                }
            }
            this.containerName = container;
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
            var u = navigator.userAgent,
                app = navigator.appVersion;
            var ua:string = navigator.userAgent.toLowerCase();
            var t:string = ua.match(/MicroMessenger/i) + "";
            if (t == "micromessenger") {
                return true;
            } else {
                return false;
            }
        }


    }

}