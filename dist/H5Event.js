var H5Event = (function () {
    function H5Event() {
        this.eventTarget = {
            handlers: {},
        };
    }
    H5Event.prototype.addEvent = function (type, handler) {
        if (this.eventTarget.handlers[type] == undefined) {
            this.eventTarget.handlers[type] = [];
        }
        this.eventTarget.handlers[type].push(handler);
    };
    H5Event.prototype.fireEvent = function (event) {
        if (this.eventTarget.handlers[event.type] instanceof Array) {
            var _handler = this.eventTarget.handlers[event.type];
            for (var i = 0; i < _handler.length; i++) {
                _handler[i](event);
            }
        }
    };
    H5Event.prototype.removeEvent = function (type, handler) {
        if (this.eventTarget.handlers[type] instanceof Array) {
            var _handler = this.eventTarget.handlers[type];
            for (var i = 0; i < _handler.length; i++) {
                if (_handler[i] == handler) {
                    break;
                }
            }
            _handler.splice(i, 1);
        }
    };
    return H5Event;
}());
//# sourceMappingURL=H5Event.js.map