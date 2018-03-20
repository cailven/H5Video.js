class H5Event {
    public eventTarget;

    public addEvent(type, handler) {
        //判断事件处理数组是否有该类型事件
        if (this.eventTarget.handlers[type] == undefined) {
            this.eventTarget.handlers[type] = [];
        }
        //将处理事件push到事件处理数组里面
        this.eventTarget.handlers[type].push(handler);
    }

    public fireEvent(event) {
        //判断是否存在该事件类型
        if (this.eventTarget.handlers[event.type] instanceof Array) {
            var _handler = this.eventTarget.handlers[event.type];
            //在同一个事件类型下的可能存在多种处理事件，找出本次需要处理的事件
            for (var i = 0; i < _handler.length; i++) {
                //执行触发
                _handler[i](event);
            }
        }
    }

    public removeEvent(type, handler) {
        if (this.eventTarget.handlers[type] instanceof Array) {
            var _handler = this.eventTarget.handlers[type];
            //在同一个事件类型下的可能存在多种处理事件，找出本次需要处理的事件
            for (var i = 0; i < _handler.length; i++) {
                //找出本次需要处理的事件下标
                if (_handler[i] == handler) {
                    break;
                }
            }
            //删除处理事件
            _handler.splice(i, 1);
        }
    }

    constructor() {

        this.eventTarget = {
            handlers: {},
        };

    }

}