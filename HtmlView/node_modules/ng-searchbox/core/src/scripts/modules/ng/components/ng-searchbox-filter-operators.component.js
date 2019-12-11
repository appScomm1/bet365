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
var operators_constant_1 = require("../../../constants/operators.constant");
var ng_searchbox_added_filter_component_1 = require("./ng-searchbox-added-filter.component");
var NgSearchboxFilterOperators = /** @class */ (function () {
    function NgSearchboxFilterOperators(ngAddedFilter, element) {
        this.ngAddedFilter = ngAddedFilter;
        this.element = element;
        this.filter = null;
        this.operators = _.clone(operators_constant_1.NgSearchboxOperators);
        this.selectedOperator = null;
        this.Filtering = null;
        this.showOperators = false;
        this.hasOperator = false;
        this.Filtering = this.ngAddedFilter.Filtering;
        if (this.Filtering.getFilterCount() > 1) {
            this.hasOperator = true;
        }
        return this;
    }
    NgSearchboxFilterOperators.prototype.toggleOperators = function (show) {
        var _this = this;
        var self = this;
        if (typeof show === 'boolean') {
            self.showOperators = show;
        }
        else {
            self.showOperators = !self.showOperators;
        }
        if (self.showOperators) {
            setTimeout(function () {
                self.proxiedFunction = function (event) {
                    _this
                        .windowClicked
                        .apply(self, [event]);
                };
                window.addEventListener('click', self.proxiedFunction);
            }, 25);
        }
        else {
            window.removeEventListener('click', this.proxiedFunction);
        }
    };
    NgSearchboxFilterOperators.prototype.windowClicked = function (event) {
        var target = event.target, element = this
            .element
            .nativeElement;
        if (!element.contains(target)) {
            this
                .toggleOperators(false);
        }
    };
    NgSearchboxFilterOperators.prototype.takeOperator = function (operator) {
        var self = this;
        _.each(self.operators, function (op) {
            op.selected = false;
        });
        self
            .filter
            .operator = operator;
        self
            .Filtering
            .addOperatorToFilter(operator, self.filter, true);
        self
            .ngAddedFilter
            .Event
            .onOperatorChanged(operator, self.filter);
        operator.selected = true;
        this
            .toggleOperators(false);
    };
    NgSearchboxFilterOperators.prototype.getDefaultOperator = function () {
        var operatorByFilter = null, self = this;
        if (operatorByFilter === null) {
            if (!this.filter.operator) {
                _.each(self.operators, function (operator) {
                    if (operator.selected) {
                        self.selectedOperator = operator;
                    }
                });
                if (!self.filter.operator &&
                    self.operators &&
                    self.operators.length) {
                    var operator = self.operators[0];
                    operator.selected = true;
                    self.selectedOperator = operator;
                }
            }
        }
        setTimeout(function () {
            self.filter.operator = self.selectedOperator;
        });
        return this;
    };
    NgSearchboxFilterOperators.prototype.addOperatorToFilter = function () {
        var self = this;
        if (!self.Filtering.hasOperatorAlready(self.filter)) {
            this
                .Filtering
                .addOperatorToFilter(self.selectedOperator, self.filter);
        }
        return this;
    };
    NgSearchboxFilterOperators.prototype.ngAfterViewInit = function () {
        if (this.hasOperator) {
            this
                .Filtering
                .setOperator(this.filter, this);
            this
                .getDefaultOperator()
                .addOperatorToFilter();
        }
    };
    __decorate([
        core_1.Input('filter'),
        __metadata("design:type", Object)
    ], NgSearchboxFilterOperators.prototype, "filter", void 0);
    NgSearchboxFilterOperators = __decorate([
        core_1.Component({
            'selector': 'ng-searchbox-filter-operators',
            'template': `<div class="ng-searchbox-added-filter-operator" [hidden]="!hasOperator"><span (click)="toggleOperators();"><i class="fa fa-arrow-left"></i><div class="operator-name" *ngIf="filter &amp;&amp; filter.operator"><i [innerText]="filter.operator.name"></i></div><i class="fa fa-arrow-right"></i></span><div class="ng-searchbox-filter-operators-wrapper" [hidden]="!showOperators"><ul><li *ngFor="let operator of operators" [ngClass]="{ 'active': operator.selected }" (click)="takeOperator(operator);"><span [innerText]="operator.name"></span></li></ul></div></div>`,
            'styles': [`:host {
  float: left; }
  :host div.ng-searchbox-added-filter-operator {
    background: #FFF;
    border-radius: 6px;
    margin-right: 10px;
    margin-top: 8px;
    position: relative; }
    :host div.ng-searchbox-added-filter-operator span {
      padding: 6px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
      font-weight: bold;
      display: block; }
      :host div.ng-searchbox-added-filter-operator span div.operator-name {
        display: inline-block;
        vertical-align: top;
        margin-left: 5px;
        margin-right: 7px; }
      :host div.ng-searchbox-added-filter-operator span i.fa-arrow-left {
        margin-right: 5px;
        color: rgba(0, 0, 0, 0.75); }
      :host div.ng-searchbox-added-filter-operator span i.fa-arrow-right {
        margin-left: 5px;
        color: rgba(0, 0, 0, 0.75); }
    :host div.ng-searchbox-added-filter-operator div.ng-searchbox-filter-operators-wrapper {
      position: absolute;
      width: 100%; }
      :host div.ng-searchbox-added-filter-operator div.ng-searchbox-filter-operators-wrapper ul {
        list-style-type: none;
        padding: 0;
        margin: 0 0 0 0;
        display: block;
        border-left: 1px solid #A9A9A9;
        border-right: 1px solid #A9A9A9;
        border-bottom: 1px solid #A9A9A9;
        max-height: 130px;
        overflow-y: scroll; }
        :host div.ng-searchbox-added-filter-operator div.ng-searchbox-filter-operators-wrapper ul li:nth-child(odd) {
          background: #E1F0FD; }
        :host div.ng-searchbox-added-filter-operator div.ng-searchbox-filter-operators-wrapper ul li:nth-child(even) {
          background: #FFF; }
        :host div.ng-searchbox-added-filter-operator div.ng-searchbox-filter-operators-wrapper ul li.active {
          font-weight: bold;
          font-style: italic;
          color: rgba(0, 0, 0, 0.75);
          text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
          border-top: 1px solid rgba(0, 0, 0, 0.15);
          border-bottom: 1px solid rgba(0, 0, 0, 0.15); }
`],
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return ng_searchbox_added_filter_component_1.NgSearchboxAddedFilter; }))),
        __metadata("design:paramtypes", [ng_searchbox_added_filter_component_1.NgSearchboxAddedFilter,
            core_1.ElementRef])
    ], NgSearchboxFilterOperators);
    return NgSearchboxFilterOperators;
}());
exports.NgSearchboxFilterOperators = NgSearchboxFilterOperators;
//# sourceMappingURL=ng-searchbox-filter-operators.component.js.map