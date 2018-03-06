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
var forms_1 = require("@angular/forms");
var core_2 = require("@agm/core");
var list_service_1 = require("../shared/list.service");
var SearchComponent = /** @class */ (function () {
    function SearchComponent(listService, fb, mapsAPILoader, ngZone) {
        this.listService = listService;
        this.fb = fb;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.data = {};
        this.city = "Manchester";
        this.country = "co.uk";
        this.language = "en";
        this.apiUrl = "";
        this.callback = "&callback=JSONP_CALLBACK";
        this.page = 1;
        this.createForm();
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data = JSON.parse(localStorage.getItem("searchRes"));
        this.page = this.data.response.page;
        this.country = this.data.request.country;
        this.city = this.data.request.location;
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElement.nativeElement, {});
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    var place = autocomplete.getPlace();
                    if (place.formatted_address != null || place.formatted_address != undefined) {
                        _this.city = place.name.toString();
                        _this.country = place.formatted_address.slice(place.formatted_address.lastIndexOf(" ") + 1, place.formatted_address.length);
                    }
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                });
            });
        });
    };
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
    SearchComponent.prototype.searchFun = function (page) {
        var _this = this;
        this.page = page;
        this.setFilters(page);
        console.log(this.apiUrl);
        this.listService.getList(this.apiUrl).subscribe(function (data) {
            //this.data = data;
            localStorage.setItem('searchRes', JSON.stringify(data));
            _this.data = JSON.parse(localStorage.getItem("searchRes"));
        });
    };
    SearchComponent.prototype.setFilters = function (page) {
        this.countryFilter();
        this.apiUrl = "http://api.nestoria." + this.country + "/api?country=uk&language=" + this.language +
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
    SearchComponent.prototype.countryFilter = function () {
        if (this.country === "UK" || this.country === "uk") {
            this.country = "co.uk";
        }
        else if (this.country === "Spain") {
            this.country = "es";
        }
        else if (this.country === "Germany") {
            this.country = "de";
        }
        else if (this.country === "France") {
            this.country = "fr";
        }
        else if (this.country === "Chile") {
            this.country = "cl";
        }
        else if (this.country === "Mexico") {
            this.country = "mx";
        }
        else if (this.country === "Brazil" || this.country === "br") {
            this.country = "com.br";
        }
        else if (this.country === "India") {
            this.country = "in";
        }
        else if (this.country === "Peru") {
            this.country = "pe";
        }
        else if (this.country === "Australia" || this.country === "au") {
            this.country = "com.au";
        }
        else if (this.country === "Philippines" || this.country === "ph") {
            this.country = "com.ph";
        }
        else if (this.country === "Poland") {
            this.country = "pl";
        }
        else if (this.country === "Austria") {
            this.country = "at";
        }
        else if (this.country === "Emirates") {
            this.country = "ae";
        }
        else if (this.country === "Italy") {
            this.country = "it";
        }
        else if (this.country === "Switzerland") {
            this.country = "ch";
        }
        else if (this.country === "Turkey" || this.country === "tr") {
            this.country = "com.tr";
        }
        else if (this.country === "Portugal") {
            this.country = "pt";
        }
        else if (this.country === "Argentina" || this.country === "ar") {
            this.country = "com.ar";
        }
        else if (this.country === "Colombia" || this.country === "co") {
            this.country = "com.co";
        }
        else if (this.country === "Indonesia" || this.country === "id") {
            this.country = "co.id";
        }
    };
    SearchComponent.prototype.paginationControl = function (index) {
        if (index === 0) {
            if (this.data.response.page >= 2) {
                this.page = this.page - 1;
                this.searchFun(this.page);
            }
            else {
                this.page = this.data.response.page;
            }
        }
        if (index === 1) {
            if (this.data.response.page <= this.data.response.total_pages) {
                this.page = this.page + 1;
                this.searchFun(this.page);
            }
            else {
                this.page = this.data.response.page;
            }
        }
    };
    __decorate([
        core_1.ViewChild('search'),
        __metadata("design:type", core_1.ElementRef)
    ], SearchComponent.prototype, "searchElement", void 0);
    SearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-search',
            templateUrl: 'search.component.html',
            styleUrls: ['search.component.css']
        }),
        __metadata("design:paramtypes", [list_service_1.ListService, forms_1.FormBuilder,
            core_2.MapsAPILoader, core_1.NgZone])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map