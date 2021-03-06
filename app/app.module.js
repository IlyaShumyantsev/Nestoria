"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var core_2 = require("@agm/core");
var app_component_1 = require("./app.component");
var search_component_1 = require("./search/search.component");
var result_component_1 = require("./result/result.component");
var faves_component_1 = require("./faves/faves.component");
var details_component_1 = require("./details/details.component");
var list_service_1 = require("./shared/list.service");
var appRoutes = [
    { path: 'faves', component: faves_component_1.FavesComponent },
    { path: 'details/:id', component: details_component_1.DetailsComponent },
    { path: '', component: search_component_1.SearchComponent }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.JsonpModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule.forRoot(appRoutes),
                core_2.AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyCJ5t0y5LTCTbDMnFNuUNZlX-5SeTZBTL4',
                    libraries: ["places"],
                    language: "en"
                })
            ],
            declarations: [
                app_component_1.AppComponent,
                search_component_1.SearchComponent,
                result_component_1.ResultComponent,
                faves_component_1.FavesComponent,
                details_component_1.DetailsComponent
            ],
            providers: [
                list_service_1.ListService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map