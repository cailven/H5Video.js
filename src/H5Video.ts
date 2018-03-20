module cailven {
    export class H5Video extends H5Event {
        constructor() {
            super();
        }

        public player;
        public isVid;

        public duration:number = 100;

        private addCss(_stlye:string) {
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = _stlye;
            document.getElementsByTagName('head')[0].appendChild(style);
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

            function onUnlocked() {
                document.removeEventListener('touchstart', onTouchStart)
            }

            function onTouchStart() {
                s.player.audioOut.unlock(onUnlocked)
                document.removeEventListener('touchstart', onTouchStart)
            }

            this.player.audioOut.unlock(onUnlocked)
            document.addEventListener('touchstart', onTouchStart, false)

            setTimeout(function () {
                s.fireEvent({
                    type: "canplay"
                });
            }, 500)

        }

        private setVideo(vid_url:string) {
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

            }
            setTimeout(function () {
                self.fireEvent({
                    type: "canplay"
                });
            }, 500)


        }


        private containerName:string = "";

        public init(mp4:string, vid:string, container:string) {
            var s = this;
            this.containerName = container;
            if (this.isInWX()) {
                this.setVideo(mp4);
            } else {
                if (this.isIos()) {
                    this.setVideo(mp4);
                } else {
                    this.setCanvas(vid);
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


        public seek(t) {
            if (this.isVid) {
                this.player.seek(t);
            } else {
                this.player.currentTime = t;
            }
        }

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
                this.player.play();
            } else {
                this.player.play();
            }
        }

        public pause() {
            if (this.isVid) {
                this.player.pause();
            } else {
                this.player.pause();
            }
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

}