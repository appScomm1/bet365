'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.afterDclComponents = ['TestComponent'];
        this.filters = [
            {
                'name': 'cpi',
                'displayName': 'CPI',
                'root': 'Product',
                'validation': 'length=3',
                'excluded': true
            }, {
                'name': 'vendor_desc',
                'displayName': 'Vendor Description',
                'root': 'Product',
                'validation': 'between=3,6 numeric'
            }, {
                'name': 'vendor_abbr',
                'displayName': 'Vendor Abbreviation',
                'root': 'Product',
                'multi': true
            }, {
                'name': 'vendor_sku',
                'displayName': 'Vendor SKU',
                'multi': true,
                'root': 'Product',
                'middleware': [function (val) {
                        return val + ' test';
                    }, function (val) {
                        return val + ' test 2';
                    }]
            }, {
                'name': 'color',
                'displayName': 'Vendor Color',
                'suggestedValues': [
                    'Yellow',
                    'Red',
                    'Black',
                    'Green'
                ],
                'restrictedSuggestedValues': true,
                'root': 'Product'
            }, {
                'name': 'gender',
                'displayName': 'Vendor Gender',
                'suggestedValues': 'GENDER',
                'suggestedDataPoint': 'data',
                'reloadOnCreate': true,
                'restrictedSuggestedValues': true,
                'multi': true,
                'root': 'Product'
            }, {
                'name': 'product_type',
                'displayName': 'Product Type',
                'root': 'Product'
            }, {
                'name': 'upc',
                'displayName': 'UPC',
                'child': 'Size'
            }
        ];
        this.config = {
            'delay': 1000,
            'placeholders': [
                'Enter your query here...',
                'Products will be searched via this query',
                'You can enter any search term you\'d like'
            ],
            'placeholderInterval': 3000,
            'placeholderSpeedOutInterval': 15,
            'placeholderSpeedInInterval': 100
        };
    }
    AppComponent.prototype.register = function (api) {
        console.log(api);
        api.addFilter(['vendor_abbr', 'vendor_desc']);
        api.addFilterToMenu({
            'name': 'bm_legacy_sku',
            'displayName': 'Legacy SKU',
            'root': 'Product',
            'multi': true
        });
        api.addFilter(['bm_legacy_sku']);
        setTimeout(function () {
            // api.removeFilterFromMenu('bm_legacy_sku');
            api.removeAllFilters();
        }, 10000);
        console.log(this.filters);
        api
            .on('onQueryAdded', function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log('added', args);
        })
            .on('onEraser', function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log('eraser', args);
        })
            .on('onQueryRemoved', function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log('removed', args);
        })
            .on('onFilterChanged', function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log('filter', args);
        })
            .on('onGarbage', function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log('garbage', args);
        })
            .on('onChange', function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log('change...', args);
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            'selector': 'app',
            'template': `<div class="app"><h1>NgSearchbox</h1><div class="container"><ng-searchbox [ngSearchBoxEnableFilterOperators]="true" [ngSearchBoxFiltering]="filters" [ngSearchBoxConfig]="config" [ngSearchBoxCacheFilter]="true" (onRegisterApi)="register($event);" [placeholder]="'Search...'" [ngSearchBoxDclAfter]="afterDclComponents"></ng-searchbox></div></div>`,
            'styles': [`:host div.app div.container {
  margin: 0 auto;
  width: 80%; }
`]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map