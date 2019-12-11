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
var utils_service_1 = require("../services/utils.service");
var ng_searchbox_filter_selectors_component_1 = require("./ng-searchbox-filter-selectors.component");
var NgSearchboxAddedFilter = /** @class */ (function () {
    function NgSearchboxAddedFilter(utils) {
        this.utils = utils;
        this.Filtering = null;
        this.Event = null;
        this.filter = null;
        this.searchbox = null;
        this.uuid = null;
        this.v = '';
        this.pv = '';
        this.uuid = this.utils.uuid();
        return this;
    }
    NgSearchboxAddedFilter.prototype.set = function (filteringSvc, searchbox, filter) {
        this.Filtering = filteringSvc;
        this.Event = searchbox.Event;
        this.filter = filter;
        this.searchbox = searchbox;
        if (filter.value) {
            this.v = filter.value;
        }
        if (filter.hideWhenAdded) {
            this.toggleActivation();
            this.closeFilter();
        }
        else {
            this.toggleActivation();
        }
        return this;
    };
    NgSearchboxAddedFilter.prototype.toggleActivation = function (force) {
        var _this = this;
        var self = this;
        if (typeof this.filter.active === 'undefined') {
            this.filter.active = true;
            this.filter.editing = true;
        }
        else {
            if (typeof force !== 'undefined') {
                this.filter.active = force;
            }
            else {
                this.filter.active = !this.filter.active;
            }
        }
        if (this.filter.active) {
            setTimeout(function () {
                self.proxiedFunction = function (event) {
                    _this
                        .windowClicked
                        .apply(self, [event]);
                };
                window.addEventListener('click', self.proxiedFunction);
            }, 25);
            self.setFocus();
        }
        else {
            window.removeEventListener('click', this.proxiedFunction);
            self.closeFilter();
        }
    };
    NgSearchboxAddedFilter.prototype.openFilter = function () {
        var _this = this;
        if (!this.filter.editing) {
            this
                .filter
                .editing = true;
            setTimeout(function () {
                window.addEventListener('click', _this.proxiedFunction);
            }, 25);
            this.setFocus();
        }
        return this;
    };
    NgSearchboxAddedFilter.prototype.setFocus = function () {
        var self = this;
        setTimeout(function () {
            var input = self
                .ngSearchboxAddedFilter
                .nativeElement
                .querySelector('input');
            if (input) {
                input.focus();
            }
        }, 25);
        return this;
    };
    NgSearchboxAddedFilter.prototype.closeFilter = function () {
        if (!this.filter.value &&
            !this.filter.isAllowedEmptyValue) {
            this
                .Filtering
                .removeByComponent(this, {
                'update': false
            });
        }
        else {
            this.filter.editing = false;
            this
                .ngFilterSelectors
                .setVisibility(false);
        }
        return this;
    };
    NgSearchboxAddedFilter.prototype.toggleFilterSelectors = function () {
        this
            .ngFilterSelectors
            .setVisibility();
    };
    NgSearchboxAddedFilter.prototype.valueChange = function (val) {
        this.filter.value = val;
        if (val !== this.pv) {
            this
                .Event
                .onFilterChanged(this.filter);
            this
                .Filtering
                .update(this.filter);
        }
    };
    NgSearchboxAddedFilter.prototype.onKeyDown = function (event) {
        this.pv = event.target.value;
        this.filter.$$lastValue = this.pv;
    };
    NgSearchboxAddedFilter.prototype.onKeyUp = function (event) {
        if (event.keyCode === 13) {
            this.closeFilter();
        }
    };
    NgSearchboxAddedFilter.prototype.windowClicked = function (event) {
        var target = event.target, element = this.ngSearchboxAddedFilter.nativeElement;
        if (!element.contains(target)) {
            window.removeEventListener('click', this.proxiedFunction);
            this.toggleActivation(false);
            this.closeFilter();
        }
    };
    /**
     * @method destroy
     * Unload this filter from our searchbox memory
     */
    NgSearchboxAddedFilter.prototype.destroy = function () {
        this
            .Filtering
            .removeByComponent(this);
    };
    __decorate([
        core_1.ViewChild('ngSearchboxAddedFilter'),
        __metadata("design:type", core_1.ElementRef)
    ], NgSearchboxAddedFilter.prototype, "ngSearchboxAddedFilter", void 0);
    __decorate([
        core_1.ViewChild('ngFilterSelectors'),
        __metadata("design:type", ng_searchbox_filter_selectors_component_1.NgSearchboxFilterSelectors)
    ], NgSearchboxAddedFilter.prototype, "ngFilterSelectors", void 0);
    NgSearchboxAddedFilter = __decorate([
        core_1.Component({
            'selector': 'ng-searchbox-added-filter',
            'template': `<div class="ng-searchbox-added-filter" #ngSearchboxAddedFilter=""><div class="filter-section operators" *ngIf="searchbox &amp;&amp; searchbox.ngSearchBoxEnableFilterOperators"><ng-searchbox-filter-operators [filter]="filter"></ng-searchbox-filter-operators></div><div class="ng-searchbox-added-filter-contents" (click)="openFilter();"><span class="filter-name" [innerText]="filter.displayName + ':'"></span><div class="filter-section selectors" *ngIf="filter &amp;&amp; filter.selector" (click)="toggleFilterSelectors();"><span class="selector-type" [innerText]="filter.selector.name"></span></div><div class="filter-section" *ngIf="filter &amp;&amp; filter.value &amp;&amp; !filter.editing"><span class="filter-value" [innerText]="filter.value"></span></div><div class="filter-section" *ngIf="filter &amp;&amp; !filter.value &amp;&amp; !filter.editing"><span class="filter-value">Empty</span></div><div class="filter-section" *ngIf="filter &amp;&amp; filter.editing"><input type="text" [(ngModel)]="v" (ngModelChange)="valueChange($event);" (keydown)="onKeyDown($event);" (keyup)="onKeyUp($event);"/></div><span class="filter-destroy" (click)="destroy();"><i class="fa fa-times"></i></span><ng-searchbox-filter-selectors #ngFilterSelectors="" [filter]="filter"></ng-searchbox-filter-selectors></div></div>`,
            'styles': [`:host > div.ng-searchbox-added-filter {
  display: block;
  float: left;
  transition: opacity .50s ease-in-out;
  -moz-transition: opacity .50s ease-in-out;
  -webkit-transition: opacity .50s ease-in-out; }
  :host > div.ng-searchbox-added-filter .filter-section {
    display: inline-block;
    vertical-align: top; }
    :host > div.ng-searchbox-added-filter .filter-section.selectors {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none; }
    :host > div.ng-searchbox-added-filter .filter-section.operators {
      float: left; }
  :host > div.ng-searchbox-added-filter > div.ng-searchbox-added-filter-contents {
    background: #FFF;
    padding: 5px 6px 5px 6px;
    position: relative;
    border-radius: 6px;
    margin-right: 10px;
    margin-top: 8px;
    float: left; }
    :host > div.ng-searchbox-added-filter > div.ng-searchbox-added-filter-contents input {
      outline: none;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border: 1px solid #D4D1D1;
      font-size: 14px;
      padding-left: 5px;
      margin-right: 3px; }
    :host > div.ng-searchbox-added-filter > div.ng-searchbox-added-filter-contents span.filter-destroy {
      margin-left: 8px;
      margin-right: 4px; }
    :host > div.ng-searchbox-added-filter > div.ng-searchbox-added-filter-contents span.filter-name {
      font-size: 13px;
      text-transform: uppercase;
      color: rgba(0, 0, 0, 0.65);
      font-weight: bold;
      letter-spacing: 1px; }
    :host > div.ng-searchbox-added-filter > div.ng-searchbox-added-filter-contents span.selector-type {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: bold;
      margin-top: 0;
      background: #CAE5FF;
      margin-left: 9px;
      padding: 4px;
      opacity: 0.6;
      border-radius: 4px;
      margin-right: 7px; }
    :host > div.ng-searchbox-added-filter > div.ng-searchbox-added-filter-contents span.filter-value {
      display: inline-block;
      padding-bottom: 2px;
      font-size: 15px;
      color: rgba(0, 0, 0, 0.82); }
    :host > div.ng-searchbox-added-filter > div.ng-searchbox-added-filter-contents i.fa-times {
      display: inline-block;
      margin-left: 5px;
      vertical-align: top;
      font-size: 18px;
      margin-right: 5px; }
`]
        }),
        __metadata("design:paramtypes", [utils_service_1.UtilsService])
    ], NgSearchboxAddedFilter);
    return NgSearchboxAddedFilter;
}());
exports.NgSearchboxAddedFilter = NgSearchboxAddedFilter;
//# sourceMappingURL=ng-searchbox-added-filter.component.js.map