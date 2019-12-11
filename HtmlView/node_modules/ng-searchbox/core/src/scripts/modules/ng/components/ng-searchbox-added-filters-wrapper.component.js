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
var ng_searchbox_added_filter_component_1 = require("./ng-searchbox-added-filter.component");
var search_1 = require("../../../interfaces/search");
var NgSearchboxAddedFiltersWrapper = /** @class */ (function () {
    function NgSearchboxAddedFiltersWrapper(componentFactoryResolver, changeDetectionRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.changeDetectionRef = changeDetectionRef;
        this.observer = null;
        this.Filtering = null;
        this.searchbox = null;
        return this;
    }
    NgSearchboxAddedFiltersWrapper.prototype.ngAfterViewInit = function () {
        var self = this;
        this
            .observer
            .subscribe(function (change) {
            switch (change.name) {
                case search_1.Search.InformationChange:
                    var data = change.data;
                    self.searchbox = data.component;
                    if (self.searchbox) {
                        self.Filtering = self
                            .searchbox
                            .Filtering;
                    }
                    break;
            }
            self
                .changeDetectionRef
                .detectChanges();
        });
    };
    __decorate([
        core_1.ViewChild('ngSearchboxAddedFilters', { 'read': core_1.ViewContainerRef }),
        __metadata("design:type", core_1.ViewContainerRef)
    ], NgSearchboxAddedFiltersWrapper.prototype, "ngSearchboxAddedFiltersViewContainer", void 0);
    __decorate([
        core_1.ViewChild('ngSearchboxAddedFilters'),
        __metadata("design:type", NgSearchboxAddedFiltersWrapper)
    ], NgSearchboxAddedFiltersWrapper.prototype, "ngSearchboxAddedFilters", void 0);
    __decorate([
        core_1.Input('observer'),
        __metadata("design:type", core_1.EventEmitter)
    ], NgSearchboxAddedFiltersWrapper.prototype, "observer", void 0);
    NgSearchboxAddedFiltersWrapper = __decorate([
        core_1.Component({
            'selector': 'ng-searchbox-added-filters-wrapper',
            'template': `<div class="ng-searchbox-added-filters-wrapper ng-searchbox-group"><div class="ng-searchbox-added-filters" #ngSearchboxAddedFilters=""></div></div>`,
            'styles': [`:host div.ng-searchbox-added-filters-wrapper {
  padding: 0 0 8px 7px;
  background: #E1F0FD;
  border-radius: 6px;
  margin-top: 7px;
  margin-bottom: 4px;
  display: none; }
  :host div.ng-searchbox-added-filters-wrapper.ng-searchbox-group:before, :host div.ng-searchbox-added-filters-wrapper.ng-searchbox-group:after {
    content: "";
    display: table; }
  :host div.ng-searchbox-added-filters-wrapper.ng-searchbox-group:after {
    clear: both; }
  :host div.ng-searchbox-added-filters-wrapper.ng-searchbox-group {
    zoom: 1; }

:host.active div.ng-searchbox-added-filters-wrapper {
  display: block; }
`],
            'entryComponents': [
                ng_searchbox_added_filter_component_1.NgSearchboxAddedFilter
            ]
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver,
            core_1.ChangeDetectorRef])
    ], NgSearchboxAddedFiltersWrapper);
    return NgSearchboxAddedFiltersWrapper;
}());
exports.NgSearchboxAddedFiltersWrapper = NgSearchboxAddedFiltersWrapper;
//# sourceMappingURL=ng-searchbox-added-filters-wrapper.component.js.map