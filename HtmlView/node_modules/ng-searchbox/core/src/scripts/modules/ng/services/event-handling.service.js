'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng_searchbox_component_1 = require("../components/ng-searchbox.component");
var events_constant_1 = require("../../../constants/events.constant");
var EventHandling = /** @class */ (function () {
    function EventHandling(ngSearchBoxComponent) {
        this.ngSearchBoxComponent = ngSearchBoxComponent;
        this.timer = null;
        return this;
    }
    EventHandling.prototype.fire = function (type, data) {
        var ev = {
            '$$lastChange': new Date().getTime()
        };
        type = type.toLowerCase();
        this
            .ngSearchBoxComponent
            .Api
            .$$registeredEvents
            .forEach(function (event) {
            if (event && event.type) {
                event.type = event.type.toLowerCase();
                if (event.type === type &&
                    typeof event.fn === 'function') {
                    event.fn(ev, data);
                }
            }
        });
        return this;
    };
    EventHandling.prototype.onChange = function (parameters, invocation) {
        var _this = this;
        if (invocation === void 0) { invocation = null; }
        if (!invocation ||
            typeof invocation !== 'function') {
            invocation = function () { };
        }
        if (this.timer) {
            window.clearTimeout(this.timer);
            this.timer = null;
        }
        if (this.ngSearchBoxComponent.ngSearchBoxConfig &&
            this.ngSearchBoxComponent.ngSearchBoxConfig.delay) {
            this.timer = window.setTimeout(function () {
                invocation();
                _this.fire(events_constant_1.NgSearchboxEvent.ON_CHANGE, parameters);
            }, this.ngSearchBoxComponent.ngSearchBoxConfig.delay);
        }
        else {
            invocation();
            this.fire(events_constant_1.NgSearchboxEvent.ON_CHANGE, parameters);
        }
        return this;
    };
    EventHandling.prototype.onQueryAdded = function (n, o) {
        if (o === null ||
            typeof o === 'undefined' ||
            (typeof o !== 'undefined' && !o.length)) {
            if (n && n.length) {
                this.fire('onQueryAdded', n);
            }
        }
        return this;
    };
    EventHandling.prototype.onQueryRemoved = function (n, o) {
        if (o === null ||
            typeof o !== 'undefined' && o && o.length) {
            if (!n ||
                (typeof n === 'string' && !n.length)) {
                this.fire('onQueryRemoved', n);
            }
        }
        return this;
    };
    EventHandling.prototype.onEraser = function () {
        this.fire('onEraser');
        return this;
    };
    EventHandling.prototype.onGarbage = function () {
        this.fire('onGarbage');
        return this;
    };
    EventHandling.prototype.onFilterChanged = function (filter) {
        this.fire('onFilterChanged', filter);
        return this;
    };
    EventHandling.prototype.onFilterSelectorChanged = function (selector, filter) {
        var opts = {
            'selector': selector,
            'filter': filter
        };
        this.fire('onFilterSelectorChanged', opts);
        return this;
    };
    EventHandling.prototype.onOperatorChanged = function (operator, filter) {
        var opts = {
            'name': operator ? operator.name : '',
            'filter': filter
        };
        this.fire('onOperatorChanged', opts);
        return this;
    };
    EventHandling = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ng_searchbox_component_1.NgSearchboxComponent])
    ], EventHandling);
    return EventHandling;
}());
exports.EventHandling = EventHandling;
//# sourceMappingURL=event-handling.service.js.map