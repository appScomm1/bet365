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
var search_1 = require("../../../interfaces/search");
var utils_service_1 = require("../services/utils.service");
var NgSearchboxFilteringComponent = /** @class */ (function () {
    function NgSearchboxFilteringComponent(changeDetectionRef, utils, zone) {
        this.changeDetectionRef = changeDetectionRef;
        this.utils = utils;
        this.zone = zone;
        this.observer = null;
        this.Filtering = null;
        this.active = false;
        this.searchbox = null;
        return this;
    }
    NgSearchboxFilteringComponent.prototype.handleResize = function () {
        if (this.active) {
            this.setPosition();
        }
    };
    NgSearchboxFilteringComponent.prototype.toggleFilters = function (active) {
        var self = this;
        if (typeof active !== 'undefined') {
            this.active = active;
        }
        else {
            this.active = !this.active;
        }
        this
            .zone
            .run(function () {
            if (self.active) {
                self.setPosition();
            }
        });
    };
    NgSearchboxFilteringComponent.prototype.setPosition = function () {
        var el = this.searchbox.element, list = this.ngSearchboxFilteringList.nativeElement, h = this.utils.getHeightOf(el);
        list.style.top = h + 'px';
    };
    NgSearchboxFilteringComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var self = this;
        this
            .observer
            .subscribe(function (change) {
            switch (change.name) {
                case search_1.Search.InformationChange:
                    var data = change.data;
                    self.searchbox = data.component;
                    if (self.searchbox) {
                        self.availableFilters = _this.excludeFromFilters(self
                            .searchbox
                            .ngSearchBoxFiltering);
                        self.Filtering = self.searchbox.Filtering;
                    }
                    break;
            }
            self
                .changeDetectionRef
                .detectChanges();
        });
    };
    NgSearchboxFilteringComponent.prototype.setFilters = function (filters) {
        this.availableFilters = this.excludeFromFilters(filters);
    };
    NgSearchboxFilteringComponent.prototype.addToFilterList = function (filter) {
        this
            .availableFilters
            .push(filter);
    };
    NgSearchboxFilteringComponent.prototype.removeFromFilterList = function (filter) {
        var name = null;
        if (typeof filter === 'string') {
            name = filter;
        }
        else {
            name = filter.name;
        }
        var index = _.findIndex(this.availableFilters, { 'name': name });
        if (index !== -1) {
            this
                .availableFilters
                .splice(index, 1);
        }
    };
    NgSearchboxFilteringComponent.prototype.excludeFromFilters = function (filters) {
        var excludedFilters = JSON.parse(JSON.stringify(filters));
        excludedFilters
            .slice()
            .reverse()
            .forEach(function (filter, filterIndex, filterObject) {
            if (filter.excluded) {
                excludedFilters
                    .splice(filterObject.length - 1 - filterIndex, 1);
            }
        });
        return excludedFilters;
    };
    NgSearchboxFilteringComponent.prototype.addFilterAndClose = function (filter) {
        this.toggleFilters(false);
        this
            .Filtering
            .add(filter);
        return;
    };
    NgSearchboxFilteringComponent.prototype.addFilter = function (event, name) {
        var self = this;
        if (this.availableFilters) {
            this
                .availableFilters
                .forEach(function (filter) {
                var modifiedFilter = filter;
                if (modifiedFilter.name === name) {
                    if (modifiedFilter.restrictedSuggestedValues) {
                        self.addFilterAndClose(modifiedFilter);
                    }
                    else {
                        if (!modifiedFilter.multi) {
                            modifiedFilter.notFiltered = !modifiedFilter.notFiltered;
                            if (!modifiedFilter.notFiltered) {
                                self.addFilterAndClose(modifiedFilter);
                            }
                        }
                        else {
                            self.addFilterAndClose(modifiedFilter);
                        }
                    }
                }
            });
        }
    };
    Object.defineProperty(NgSearchboxFilteringComponent.prototype, "getAvailableFilters", {
        get: function () {
            return this.availableFilters;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChild('ngSearchboxFilteringList'),
        __metadata("design:type", core_1.ElementRef)
    ], NgSearchboxFilteringComponent.prototype, "ngSearchboxFilteringList", void 0);
    __decorate([
        core_1.Input('observer'),
        __metadata("design:type", core_1.EventEmitter)
    ], NgSearchboxFilteringComponent.prototype, "observer", void 0);
    __decorate([
        core_1.HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NgSearchboxFilteringComponent.prototype, "handleResize", null);
    NgSearchboxFilteringComponent = __decorate([
        core_1.Component({
            'selector': 'ng-searchbox-filtering',
            'template': `<div class="ng-filtering ng-searchbox-group"><span class="filtering-selection" [ngClass]="{ 'active': active }" (click)="toggleFilters();"><i class="fa fa-filter"></i></span><ul [hidden]="!active" #ngSearchboxFilteringList=""><li *ngFor="let filter of availableFilters" [ngClass]="{ 'child-filter': filter.child, 'root-filter': filter.root }" (click)="addFilter($event, filter.name);"><i class="fa fa-filter"></i><span class="ng-filter-display-name" [innerText]="filter.displayName"></span><ng-template *ngIf="filter.root"><span class="ng-filtered-from"><i class="fa fa-level-up"></i>(Derived from Root<i class="fa fa-angle-double-right"></i><span [innerText]="' ' + filter.root"></span>)</span></ng-template><ng-template *ngIf="filter.child"><span class="ng-filtered-from"><i class="fa fa-level-down"></i>(Derived from<span [innerText]="' ' + filter.child"></span>)</span></ng-template></li></ul></div>`,
            'styles': [`:host {
  display: block; }
  :host span.filtering-selection {
    border-right: 1px solid rgba(4, 4, 4, 0.3);
    margin-top: 0;
    cursor: pointer;
    opacity: 0.75;
    margin-left: 0;
    font-size: 16px;
    font-weight: normal;
    margin-right: 8px;
    display: block;
    text-align: center;
    width: 20px;
    padding: 11px 8px 11px 8px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    background: #cee8ff;
    background: -moz-linear-gradient(top, #cee8ff 0%, #b5dcff 100%);
    background: -webkit-linear-gradient(top, #cee8ff 0%, #b5dcff 100%);
    background: linear-gradient(to bottom, #cee8ff 0%, #b5dcff 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#cee8ff', endColorstr='#b5dcff',GradientType=0 );
    transition: opacity .25s ease-in-out;
    -moz-transition: opacity .25s ease-in-out;
    -webkit-transition: opacity .25s ease-in-out;
    position: absolute;
    z-index: 2; }
    :host span.filtering-selection.active {
      background: #b5dcff;
      background: -moz-linear-gradient(top, #b5dcff 0%, #cee8ff 100%);
      background: -webkit-linear-gradient(top, #b5dcff 0%, #cee8ff 100%);
      background: linear-gradient(to bottom, #b5dcff 0%, #cee8ff 100%);
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#b5dcff', endColorstr='#cee8ff',GradientType=0 ); }
  :host ul {
    position: absolute;
    z-index: 6;
    list-style-type: none;
    padding: 0;
    margin: 0;
    overflow-y: scroll;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    width: 100%;
    left: 0;
    top: 0; }
    :host ul li {
      font-size: 14px;
      margin-right: 8px;
      padding: 5px 10px;
      border-bottom: 2px solid #FFF;
      cursor: pointer;
      -moz-user-select: none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      transition: background .25s ease-in-out;
      -moz-transition: background .25s ease-in-out;
      -webkit-transition: background .25s ease-in-out;
      background: #CEE8FF; }
      :host ul li:last-child {
        border-bottom: none; }
      :host ul li.root-filter {
        background: #CEE8FF; }
      :host ul li.child-filter {
        background: #FFDFDF; }
        :host ul li.child-filter:hover {
          background: #FFD6D6; }
      :host ul li i.fa-filter {
        opacity: 0.45;
        margin-right: 5px; }
      :host ul li i.fa-level-up, :host ul li i.fa-level-down {
        margin-right: 4px; }
      :host ul li:hover span.ng-filter-display-name {
        font-weight: bold; }
      :host ul li span.ng-filtered-from {
        opacity: .6;
        font-size: 12px;
        margin-left: 10px; }
`]
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            utils_service_1.UtilsService,
            core_1.NgZone])
    ], NgSearchboxFilteringComponent);
    return NgSearchboxFilteringComponent;
}());
exports.NgSearchboxFilteringComponent = NgSearchboxFilteringComponent;
//# sourceMappingURL=ng-searchbox-filtering.component.js.map