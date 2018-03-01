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
var forms_1 = require("@angular/forms");
var SearchComponent = /** @class */ (function () {
    function SearchComponent(listService, fb) {
        this.listService = listService;
        this.fb = fb;
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
        this.language = "en";
        this.apiUrl = "";
        this.callback = "&callback=JSONP_CALLBACK";
        this.page = 1;
        this.createForm();
    }
    SearchComponent.prototype.createForm = function () {
        this.myForm = this.fb.group({
            country: new forms_1.FormControl("co.uk"),
            property_type: new forms_1.FormControl("all"),
            price_low: new forms_1.FormControl(0),
            price_high: new forms_1.FormControl(0),
            bedroom_number_min: new forms_1.FormControl(0),
            bedroom_number_max: new forms_1.FormControl(0),
            room_number_min: new forms_1.FormControl(0),
            room_number_max: new forms_1.FormControl(0),
            bathroom_number_min: new forms_1.FormControl(0),
            bathroom_number_max: new forms_1.FormControl(0)
        });
    };
    SearchComponent.prototype.search = function (page) {
        var _this = this;
        this.page = page;
        this.setFilters(page);
        this.listService.getList(this.apiUrl).subscribe(function (data) {
            _this.data = data;
        });
    };
    SearchComponent.prototype.setFilters = function (page) {
        this.apiUrl = "http://api.nestoria." + this.myForm.get("country").value + "/api?country=uk&language=" + this.language +
            "&pretty=1&action=search_listings" +
            "&encoding=json&listing_type=buy&page=" + page + "&place_name=" + this.city;
        if (this.myForm.get("price_high").value > 0) {
            this.apiUrl += "&price_max=" + this.myForm.get("price_high").value;
        }
        if (this.myForm.get("price_low").value > 0) {
            this.apiUrl += "&price_min=" + this.myForm.get("price_low").value;
        }
        if (this.myForm.get("bedroom_number_max").value > 0) {
            this.apiUrl += "&bedroom_max=" + this.myForm.get("bedroom_number_max").value;
        }
        if (this.myForm.get("bedroom_number_min").value > 0) {
            this.apiUrl += "&bedroom_min=" + this.myForm.get("bedroom_number_min").value;
        }
        if (this.myForm.get("bathroom_number_max").value > 0) {
            this.apiUrl += "&bathroom_max=" + this.myForm.get("bathroom_number_max").value;
        }
        if (this.myForm.get("bathroom_number_min").value > 0) {
            this.apiUrl += "&bathroom_min=" + this.myForm.get("bathroom_number_min").value;
        }
        if (this.myForm.get("room_number_max").value > 0) {
            this.apiUrl += "&room_max=" + this.myForm.get("room_number_max").value;
        }
        if (this.myForm.get("room_number_min").value > 0) {
            this.apiUrl += "&room_min=" + this.myForm.get("room_number_min").value;
        }
        if (this.myForm.get("property_type").value != "all") {
            this.apiUrl += "&property_type=" + this.myForm.get("property_type").value;
        }
        this.apiUrl += this.callback;
    };
    SearchComponent.prototype.backPage = function () {
        if (this.data.response.page >= 2) {
            this.page = this.page - 1;
            this.search(this.page);
        }
        else {
            this.page = this.data.response.page;
        }
    };
    SearchComponent.prototype.nextPage = function () {
        if (this.data.response.page <= this.data.response.total_pages) {
            this.page = this.page + 1;
            this.search(this.page);
        }
        else {
            this.page = this.data.response.page;
        }
    };
    SearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-search',
            templateUrl: 'search.component.html',
            styleUrls: ['search.component.css']
        }),
        __metadata("design:paramtypes", [list_service_1.ListService, forms_1.FormBuilder])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map