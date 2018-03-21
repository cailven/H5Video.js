class H5VideoController {
    public constructor() {
    }
    public player;
    public signalConfig = [];
    private currentPointId:number = 0;
    private enterfame() {
        var s = this;
        requestAnimationFrame(this.enterfame.bind(this));
        if (this.player) {
            var currentTime:string = this.player.currentTime.toFixed(1);
            var currentTime = currentTime;

            if (this.currentPointId < this.signalConfig.length) {
                if (parseFloat(currentTime) == this.signalConfig[this.currentPointId].time) {
                    this.signalConfig[this.currentPointId].handle();
                    this.currentPointId++;

                }
            }
        }
    }

    public start(_player, _config) {
        this.signalConfig = _config;
        this.player = _player;
        this.enterfame();
    }

    public stop() {
        window.cancelAnimationFrame(this.enterfame.bind(this));
    }


}