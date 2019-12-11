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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var core_1 = require("@angular/core");
var ng_searchbox_added_filter_component_1 = require("./ng-searchbox-added-filter.component");
var selectors_constant_1 = require("../../../constants/selectors.constant");
var NgSearchboxFilterSelectors = /** @class */ (function () {
    function NgSearchboxFilterSelectors(ngAddedFilter) {
        this.ngAddedFilter = ngAddedFilter;
        this.filter = null;
        this.selectors = _.clone(selectors_constant_1.NgSearchboxSelectors);
        this.shownStatus = true;
        return this;
    }
    NgSearchboxFilterSelectors.prototype.takeSelector = function (selector) {
        var self = this;
        self
            .selectors
            .forEach(function (selector) {
            selector.selected = false;
        });
        self.filter.selector = selector;
        selector.selected = true;
        if (self.filter.value) {
            this
                .ngAddedFilter
                .Filtering
                .update();
            this
                .ngAddedFilter
                .Event
                .onFilterSelectorChanged(selector, self.filter);
        }
        this
            .ngAddedFilter
            .setFocus();
    };
    NgSearchboxFilterSelectors.prototype.getDefaultSelector = function () {
        var self = this;
        setTimeout(function () {
            if (!self.filter.selector) {
                self
                    .selectors
                    .forEach(function (selector) {
                    if (selector.selected) {
                        self.filter.selector = selector;
                    }
                });
                if (!self.filter.selector
                    && self.selectors.length) {
                    var selector = self.selectors[0];
                    selector.selected = true;
                    self.filter.selector = selector;
                }
            }
            else {
                self
                    .selectors
                    .forEach(function (selector) {
                    selector.selected = (selector.key === self.filter.selector.key);
                });
            }
        });
        return this;
    };
    NgSearchboxFilterSelectors.prototype.ngAfterViewInit = function () {
        this.getDefaultSelector();
    };
    NgSearchboxFilterSelectors.prototype.setVisibility = function (visibility) {
        if (visibility === void 0) { visibility = null; }
        if (visibility === null) {
            this.shownStatus = !this.shownStatus;
        }
        else {
            this.shownStatus = visibility;
        }
        return this;
    };
    __decorate([
        core_1.Input('filter'),
        __metadata("design:type", Object)
    ], NgSearchboxFilterSelectors.prototype, "filter", void 0);
    NgSearchboxFilterSelectors = __decorate([
        core_1.Component({
            'selector': 'ng-searchbox-filter-selectors',
            'template': `<div class="ng-searchbox-filter-selectors" [hidden]="!shownStatus"><ul class="ng-searchbox-selectors-list"><li *ngFor="let selector of selectors" [ngClass]="{ 'active': selector.selected }" (click)="takeSelector(selector);"><span [innerText]="selector.name"></span></li></ul></div>`,
            'styles': [`:host div.ng-searchbox-filter-selectors {
  position: absolute;
  z-index: 1;
  margin-top: 5px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  left: 2px;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.25); }
  :host div.ng-searchbox-filter-selectors ul {
    list-style-type: none;
    padding: 0;
    margin: 0 0 0 0;
    display: block;
    border-left: 1px solid #A9A9A9;
    border-right: 1px solid #A9A9A9;
    border-bottom: 1px solid #A9A9A9;
    max-height: 130px;
    overflow-y: scroll; }
    :host div.ng-searchbox-filter-selectors ul li {
      padding: 5px;
      font-size: 12px;
      text-transform: uppercase;
      cursor: pointer; }
      :host div.ng-searchbox-filter-selectors ul li:nth-child(odd) {
        background: #E1F0FD; }
      :host div.ng-searchbox-filter-selectors ul li:nth-child(even) {
        background: #FFF; }
      :host div.ng-searchbox-filter-selectors ul li.active {
        font-weight: bold;
        font-style: italic;
        color: rgba(0, 0, 0, 0.75);
        text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
        border-top: 1px solid rgba(0, 0, 0, 0.15);
        border-bottom: 1px solid rgba(0, 0, 0, 0.15); }
`]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return ng_searchbox_added_filter_component_1.NgSearchboxAddedFilter; }))),
        __metadata("design:paramtypes", [ng_searchbox_added_filter_component_1.NgSearchboxAddedFilter])
    ], NgSearchboxFilterSelectors);
    return NgSearchboxFilterSelectors;
}());
exports.NgSearchboxFilterSelectors = NgSearchboxFilterSelectors;
//# sourceMappingURL=ng-searchbox-filter-selectors.component.js.map