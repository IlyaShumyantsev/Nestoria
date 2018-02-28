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
var SearchComponent = /** @class */ (function () {
    function SearchComponent(listService) {
        this.listService = listService;
        this.data = {
            request: {
                country: {},
                language: {},
                location: {},
                page: {}
            },
            response: {
                listings: [],
                page: {},
                status_code: {},
                total_pages: {},
                total_results: {}
            }
        };
        this.city = "Manchester";
        this.country = "co.uk";
        this.price_high = 0;
        this.price_low = 0;
        this.bedroom_number_min = 0;
        this.bedroom_number_max = 0;
        this.bathroom_number_min = 0;
        this.bathroom_number_max = 0;
        this.room_number_min = 0;
        this.room_number_max = 0;
        this.property_type = "all";
        this.apiUrl = "";
        this.callback = "&callback=JSONP_CALLBACK";
    }
    SearchComponent.prototype.search = function () {
        var _this = this;
        this.setFilters();
        this.listService.getList(this.apiUrl).subscribe(function (data) {
            _this.data = data;
        });
    };
    SearchComponent.prototype.setFilters = function () {
        this.apiUrl = "http://api.nestoria." + this.country + "/api?country=uk&pretty=1&action=search_listings" +
            "&encoding=json&listing_type=buy&page=1&place_name=" + this.city;
        if (this.price_high > 0) {
            this.apiUrl += "&price_max=" + this.price_high;
        }
        if (this.price_low > 0) {
            this.apiUrl += "&price_min=" + this.price_low;
        }
        if (this.bedroom_number_max > 0) {
            this.apiUrl += "&bedroom_max=" + this.bedroom_number_max;
        }
        if (this.bedroom_number_min > 0) {
            this.apiUrl += "&bedroom_min=" + this.bedroom_number_min;
        }
        if (this.bathroom_number_max > 0) {
            this.apiUrl += "&bathroom_max=" + this.bathroom_number_max;
        }
        if (this.bathroom_number_min > 0) {
            this.apiUrl += "&bathroom_min=" + this.bathroom_number_min;
        }
        if (this.room_number_max > 0) {
            this.apiUrl += "&room_max=" + this.room_number_max;
        }
        if (this.room_number_min > 0) {
            this.apiUrl += "&room_min=" + this.room_number_min;
        }
        if (this.property_type != "all") {
            this.apiUrl += "&property_type=" + this.property_type;
        }
        this.apiUrl += this.callback;
    };
    SearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-search',
            templateUrl: 'search.component.html',
            styleUrls: ['search.component.css']
        }),
        __metadata("design:paramtypes", [list_service_1.ListService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map