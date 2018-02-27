"use strict";
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
var list_service_1 = require("../shared/list.service");
var ResultComponent = /** @class */ (function () {
    function ResultComponent(listService) {
        this.listService = listService;
        this.apiUrl = "http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&place_name=newcr&callback=JSONP_CALLBACK";
    }
    ResultComponent.prototype.ngOnInit = function () {
        this.listService.getList(this.apiUrl).subscribe(function (data) {
            console.log(data);
        });
    };
    ResultComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-result',
            templateUrl: 'result-component.html',
            styleUrls: ['result-component.css'],
        }),
        __metadata("design:paramtypes", [list_service_1.ListService])
    ], ResultComponent);
    return ResultComponent;
}());
exports.ResultComponent = ResultComponent;
//# sourceMappingURL=result-component.js.map