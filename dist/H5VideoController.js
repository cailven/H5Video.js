var H5VideoController = (function () {
    function H5VideoController() {
        this.signalConfig = [];
        this.currentPointId = 0;
    }
    H5VideoController.prototype.enterfame = function () {
        var s = this;
        requestAnimationFrame(this.enterfame.bind(this));
        if (this.player) {
            var currentTime = this.player.currentTime.toFixed(1);
            var currentTime = currentTime;
            if (this.currentPointId < this.signalConfig.length) {
                if (parseFloat(currentTime) == this.signalConfig[this.currentPointId].time) {
                    this.signalConfig[this.currentPointId].handle();
                    this.currentPointId++;
                }
            }
        }
    };
    H5VideoController.prototype.start = function (_player, _config) {
        this.signalConfig = _config;
        this.player = _player;
        this.enterfame();
    };
    H5VideoController.prototype.stop = function () {
        window.cancelAnimationFrame(this.enterfame.bind(this));
    };
    return H5VideoController;
}());
//# sourceMappingURL=H5VideoController.js.map