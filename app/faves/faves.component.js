"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FavesComponent = /** @class */ (function () {
    function FavesComponent() {
        this.data = {};
    }
    FavesComponent.prototype.ngOnInit = function () {
        this.data = JSON.parse(localStorage.getItem("faves"));
    };
    FavesComponent.prototype.info = function (data, i) {
        alert('Title: ' + data[i].title +
            '\nProperty type: ' + data[i].property_type +
            '\nBathroom number: ' + data[i].bathroom_number +
            '\nBedroom number: ' + data[i].bedroom_number +
            '\nSummary: ' + data[i].summary +
            '\nKeywords: ' + data[i].keywords);
    };
    FavesComponent.prototype.objectToString = function (obj) {
        try {
            return JSON.stringify(obj);
        }
        catch (err) {
            console.log(err);
        }
    };
    FavesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-faves',
            templateUrl: 'faves.component.html',
            styleUrls: ['faves.component.css']
        })
    ], FavesComponent);
    return FavesComponent;
}());
exports.FavesComponent = FavesComponent;
//# sourceMappingURL=faves.component.js.map