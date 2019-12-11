/**
 * @note This module is specifically for usage with demo;
 * doesn't provide any functionality towards the searchbox.
 */
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
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
var ng_searchbox_module_1 = require("../ng/ng-searchbox.module");
var app_component_1 = require("./components/app.component");
var test_component_1 = require("./components/test.component");
var DemoModule = /** @class */ (function () {
    function DemoModule() {
    }
    DemoModule = __decorate([
        core_1.NgModule({
            'imports': [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ng_searchbox_module_1.NgSearchboxModule
            ],
            'declarations': [
                app_component_1.AppComponent,
                test_component_1.TestComponent
            ],
            'providers': [],
            'bootstrap': [app_component_1.AppComponent],
            'entryComponents': [
                test_component_1.TestComponent
            ]
        })
    ], DemoModule);
    return DemoModule;
}());
exports.DemoModule = DemoModule;
//# sourceMappingURL=demo.module.js.map