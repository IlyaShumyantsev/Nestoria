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
var router_1 = require("@angular/router");
var DetailsComponent = /** @class */ (function () {
    function DetailsComponent(route) {
        var _this = this;
        this.route = route;
        this.info = {
            title: {},
            summay: {},
            image: {},
            price: {},
            property_type: {},
            bathroom_number: {},
            bedroom_number: {},
            keywords: {},
            latitude: {},
            longitude: {},
            lister_url: {}
        };
        this.querySubscription = route.queryParams.subscribe(function (queryParam) {
            _this.info.title = queryParam['title'];
            _this.info.summary = queryParam['summary'];
            _this.info.image = queryParam['image'];
            _this.info.price = queryParam['price'];
            _this.info.property_type = queryParam['property_type'];
            _this.info.bathroom_number = queryParam['bathroom_number'];
            _this.info.bedroom_number = queryParam['bedroom_number'];
            _this.info.keywords = queryParam['keywords'];
            _this.info.latitude = queryParam['latitude'];
            _this.info.longitude = queryParam['longitude'];
            _this.latitude = parseFloat(_this.info.latitude);
            _this.longitude = parseFloat(_this.info.longitude);
            _this.info.lister_url = queryParam['lister_url'];
        });
    }
    DetailsComponent.prototype.ngOnInit = function () {
        var data = [];
        if (JSON.parse(localStorage.getItem("faves")) != null) {
            data = JSON.parse(localStorage.getItem("faves"));
            if (this.searchInLocalStorage(data) == false) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    DetailsComponent.prototype.addFaves = function () {
        var data = [];
        if (JSON.parse(localStorage.getItem("faves")) != null) {
            data = JSON.parse(localStorage.getItem("faves"));
            if (this.searchInLocalStorage(data) == true) {
                data.push(this.info);
                localStorage.setItem("faves", JSON.stringify(data));
            }
            else {
                for (var i = 0; i < data.length; i++) {
                    if (JSON.stringify(data[i]) == JSON.stringify(this.info)) {
                        data.splice(i, 1);
                        localStorage.setItem("faves", JSON.stringify(data));
                    }
                }
            }
        }
        else {
            data.push(this.info);
            localStorage.setItem("faves", JSON.stringify(data));
        }
    };
    DetailsComponent.prototype.searchInLocalStorage = function (data) {
        var info = { info: this.info };
        if (data.some(this.searchInData, info) == false) {
            return true;
        }
        else {
            return false;
        }
    };
    DetailsComponent.prototype.searchInData = function (data) {
        return JSON.stringify(data) == JSON.stringify(this.info);
    };
    DetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-details',
            templateUrl: 'details.component.html',
            styleUrls: ['details.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute])
    ], DetailsComponent);
    return DetailsComponent;
}());
exports.DetailsComponent = DetailsComponent;
//# sourceMappingURL=details.component.js.map