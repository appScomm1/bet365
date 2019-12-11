'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var demo_module_1 = require("./modules/demo/demo.module");
var environment_1 = require("./environments/environment");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic()
    .bootstrapModule(demo_module_1.DemoModule)
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map