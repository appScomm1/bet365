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
var PlaceholdersService = /** @class */ (function () {
    function PlaceholdersService(searchbox) {
        this.searchbox = searchbox;
        this.index = 0;
        this.position = 0;
        this.stopped = true;
        this.val = '';
        this.timer = null;
        this.config = null;
        this.setup();
        return this;
    }
    PlaceholdersService.prototype.setup = function () {
        this.config = this.searchbox.ngSearchBoxConfig;
        if (this.config &&
            this.config.placeholders) {
            this.start(this.index);
        }
        return this;
    };
    PlaceholdersService.prototype.stop = function () {
        this.stopped = true;
        return clearTimeout(this.timer);
    };
    PlaceholdersService.prototype.start = function (index) {
        this.stopped = false;
        if (typeof index !== 'undefined') {
            this.index = index;
        }
        else {
            if (typeof this.index !== 'undefined') {
                this.index = 0;
            }
            else {
                if (typeof this.index === 'number') {
                    this.index++;
                }
            }
        }
        this.position = 0;
        this.val = '';
        this.change();
    };
    PlaceholdersService.prototype.change = function (reverse) {
        var elem = (this.searchbox.element.nativeElement);
        var visible = elem.offsetWidth > 0 && elem.offsetHeight > 0;
        if (this.stopped || !visible) {
            return;
        }
        var self = this;
        if (reverse) {
            self.timer = setTimeout(function () {
                self.val = self.val.slice(0, self.val.length - 1);
                self.searchbox.placeholder = self.val;
                if (self.val.length) {
                    self.change(true);
                }
                else {
                    self.position = 0;
                    self.index++;
                    if (self.index > (self.config.placeholders.length - 1)) {
                        self.index = 0;
                    }
                    self.change();
                }
            }, self.config.placeholderSpeedOutInterval || 25);
        }
        else {
            self.timer = setTimeout(function () {
                var val = self.config.placeholders[self.index], len = val.length;
                self.val += val[self.position];
                self.searchbox.placeholder = self.val;
                self.position++;
                if (self.position < len) {
                    self.change();
                }
                else {
                    self.timer = setTimeout(function () {
                        self.change(true);
                    }, self.config.placeholderInterval || 2000);
                }
            }, self.config.placeholderSpeedInInterval || 75);
        }
    };
    PlaceholdersService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ng_searchbox_component_1.NgSearchboxComponent])
    ], PlaceholdersService);
    return PlaceholdersService;
}());
exports.PlaceholdersService = PlaceholdersService;
//# sourceMappingURL=placeholders.service.js.map