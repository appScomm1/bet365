'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var ng_searchbox_component_1 = require("./components/ng-searchbox.component");
var ng_searchbox_added_filter_component_1 = require("./components/ng-searchbox-added-filter.component");
var ng_searchbox_added_filters_wrapper_component_1 = require("./components/ng-searchbox-added-filters-wrapper.component");
var ng_searchbox_filtering_component_1 = require("./components/ng-searchbox-filtering.component");
var ng_searchbox_filter_operators_component_1 = require("./components/ng-searchbox-filter-operators.component");
var ng_searchbox_filter_selectors_component_1 = require("./components/ng-searchbox-filter-selectors.component");
var memory_service_1 = require("./services/memory.service");
var utils_service_1 = require("./services/utils.service");
require("./ng-searchbox.font-awesome");
var NgSearchboxModule = /** @class */ (function () {
    function NgSearchboxModule() {
    }
    NgSearchboxModule = __decorate([
        core_1.NgModule({
            'imports': [
                common_1.CommonModule,
                forms_1.FormsModule
            ],
            'declarations': [
                ng_searchbox_component_1.NgSearchboxComponent,
                ng_searchbox_added_filter_component_1.NgSearchboxAddedFilter,
                ng_searchbox_added_filters_wrapper_component_1.NgSearchboxAddedFiltersWrapper,
                ng_searchbox_filter_operators_component_1.NgSearchboxFilterOperators,
                ng_searchbox_filter_selectors_component_1.NgSearchboxFilterSelectors,
                ng_searchbox_filtering_component_1.NgSearchboxFilteringComponent
            ],
            'providers': [
                memory_service_1.MemoryService,
                utils_service_1.UtilsService
            ],
            'exports': [
                ng_searchbox_component_1.NgSearchboxComponent
            ]
        })
    ], NgSearchboxModule);
    return NgSearchboxModule;
}());
exports.NgSearchboxModule = NgSearchboxModule;
//# sourceMappingURL=ng-searchbox.module.js.map