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
var _ = require("lodash");
var core_1 = require("@angular/core");
var events_constant_1 = require("../../../constants/events.constant");
var ng_searchbox_component_1 = require("../components/ng-searchbox.component");
var API = /** @class */ (function () {
    function API(ngSearchBoxComponent) {
        this.ngSearchBoxComponent = ngSearchBoxComponent;
        this.$$registeredEvents = [];
        return this;
    }
    /**
     * @method on
     * Add event listener to our search box
     * @param {string} type
     * @param {Function} fn
     * @returns {API}
     */
    API.prototype.on = function (type, fn) {
        var self = this, isRegisteredAlready = false;
        this
            .hasEventErrors(type, fn)
            .hasInvalidEventType(type);
        this
            .$$registeredEvents
            .forEach(function (event) {
            if (event &&
                event.fn === fn &&
                event.type === type) {
                isRegisteredAlready = true;
            }
        });
        if (!isRegisteredAlready) {
            self
                .$$registeredEvents
                .push({
                'type': type,
                'fn': fn
            });
        }
        return this;
    };
    /**
     * @method off
     * Remove event listener from our search box
     * @param {string} type
     * @param {Function} fn
     * @returns {API}
     */
    API.prototype.off = function (type, fn) {
        var self = this, isFnEmpty = false;
        this
            .hasEventErrors(type, fn, true)
            .hasInvalidEventType(type);
        if (typeof fn !== 'function') {
            isFnEmpty = true;
        }
        self
            .$$registeredEvents
            .slice()
            .reverse()
            .forEach(function (addedEvent, addedIndex, addedObject) {
            if ((addedEvent && addedEvent.fn === fn && addedEvent.type === type) ||
                (isFnEmpty && addedEvent && addedEvent.type === type)) {
                self
                    .$$registeredEvents
                    .splice(addedObject.length - 1 - addedIndex, 1);
            }
        });
        return this;
    };
    /**
     * @method offAll
     * Remove all event listeners attached to our search box
     * @returns {API}
     */
    API.prototype.offAll = function () {
        var self = this;
        self
            .$$registeredEvents
            .slice()
            .reverse()
            .forEach(function (addedEvent, addedIndex, addedObject) {
            self
                .$$registeredEvents
                .splice(addedObject.length - 1 - addedIndex, 1);
        });
        return this;
    };
    API.prototype.addFilterToMenu = function (filter) {
        var _this = this;
        var filters = [];
        if (_.isArray(filter)) {
            filters = filter;
        }
        else {
            filters = [filter];
        }
        filters.forEach(function (item) {
            _this
                .ngSearchBoxComponent
                .ngSearchboxFilteringComponent
                .addToFilterList(item);
        });
        return this;
    };
    API.prototype.removeFilterFromMenu = function (filter) {
        var _this = this;
        var filters = [];
        if (_.isArray(filter)) {
            filters = filter;
        }
        else {
            filters = [filter];
        }
        filters.forEach(function (item) {
            _this
                .ngSearchBoxComponent
                .ngSearchboxFilteringComponent
                .removeFromFilterList(item);
            _this
                .ngSearchBoxComponent
                .Filtering
                .removeByFilterType(item);
        });
        return this;
    };
    /**
     * @method addFilter
     * Add filters automatically to selected filters
     * @returns {API}
     */
    API.prototype.addFilter = function (filter) {
        var _this = this;
        var filters = [];
        if (_.isArray(filter)) {
            filters = filter;
        }
        else {
            filters = [filter];
        }
        filters.forEach(function (item) {
            var f = {};
            if (typeof item === 'string') {
                f.name = item;
            }
            else {
                f = item;
            }
            if (f.name) {
                var availableFilters = _this.ngSearchBoxComponent.ngSearchboxFilteringComponent.getAvailableFilters, foundFilter_1 = _.find(availableFilters, { 'name': f.name });
                if (foundFilter_1) {
                    f.isAllowedEmptyValue = true;
                    f.hideWhenAdded = true;
                    if (!f.value) {
                        f.value = '';
                    }
                    setTimeout(function () {
                        _this
                            .ngSearchBoxComponent
                            .Filtering
                            .add(foundFilter_1, f);
                    });
                }
            }
            else {
                throw new Error('NgSearchbox API - Missing \'name\' key!');
            }
        });
        return this;
    };
    /**
     * @method setQuery
     * Automatically set query via API
     * @param {string} query
     * @param {boolean} fire
     */
    API.prototype.setQuery = function (query, fire) {
        if (fire === void 0) { fire = true; }
        this
            .ngSearchBoxComponent
            .query = query;
        this
            .ngSearchBoxComponent
            .queryChange(query, fire);
    };
    API.prototype.getFilters = function () {
        return this
            .ngSearchBoxComponent
            .ngSearchboxFilteringComponent
            .getAvailableFilters;
    };
    /**
     * @method removeAllFilters
     * Remove all filters from searchbox
     * @param {boolean} update
     */
    API.prototype.removeAllFilters = function (update) {
        if (update === void 0) { update = true; }
        return this
            .ngSearchBoxComponent
            .Filtering
            .removeAll({ update: update });
    };
    API.prototype.hasEventErrors = function (evt, fn, emptyFnAllowed) {
        if (emptyFnAllowed === void 0) { emptyFnAllowed = false; }
        if (typeof evt !== 'string') {
            throw new TypeError('NgSearchbox API - Event Name parameter must be type String!');
        }
        if (typeof fn !== 'function' && !emptyFnAllowed) {
            throw new TypeError('NgSearchbox API - Event Function parameter must be type Function!');
        }
        return this;
    };
    API.prototype.hasInvalidEventType = function (evt) {
        var validType = false, names = Object.keys(events_constant_1.NgSearchboxEvent), types = [];
        _.map(names, function (name) {
            types.push(events_constant_1.NgSearchboxEvent[name]);
        });
        types.forEach(function (type) {
            type = type.toLowerCase();
            evt = evt.toLowerCase();
            if (type === evt) {
                validType = true;
            }
        });
        if (!validType) {
            throw new ReferenceError('NgSearchbox API - Invalid Event Type Provided!');
        }
        return this;
    };
    API = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ng_searchbox_component_1.NgSearchboxComponent])
    ], API);
    return API;
}());
exports.API = API;
//# sourceMappingURL=api.service.js.map