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
var ResultComponent = /** @class */ (function () {
    function ResultComponent() {
        this.title = "Recent searches: ";
        this.step = -1;
    }
    ResultComponent.prototype.ngOnInit = function () {
        this.data = JSON.parse(localStorage.getItem("searchRes"));
    };
    ResultComponent.prototype.info = function (data, i) {
        alert('Title: ' + data.response.listings[i].title +
            '\nProperty type: ' + data.response.listings[i].property_type +
            '\nBathroom number: ' + data.response.listings[i].bathroom_number +
            '\nBedroom number: ' + data.response.listings[i].bedroom_number +
            '\nSummary: ' + data.response.listings[i].summary +
            '\nKeywords: ' + data.response.listings[i].keywords);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ResultComponent.prototype, "data", void 0);
    ResultComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-result',
            templateUrl: 'result.component.html',
            styleUrls: ['result.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], ResultComponent);
    return ResultComponent;
}());
exports.ResultComponent = ResultComponent;
//# sourceMappingURL=result.component.js.map