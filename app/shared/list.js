"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List = /** @class */ (function () {
    function List(city, country, price_high, price_low, bedroom_number_min, bedroom_number_max, bathroom_number_min, bathroom_number_max, room_number_min, room_number_max, property_type) {
        this.city = city;
        this.country = country;
        this.price_high = price_high;
        this.price_low = price_low;
        this.bedroom_number_max = bedroom_number_max;
        this.bedroom_number_min = bedroom_number_min;
        this.bathroom_number_max = bathroom_number_max;
        this.bathroom_number_min = bathroom_number_min;
        this.room_number_max = room_number_max;
        this.room_number_min = room_number_min;
        this.property_type = property_type;
    }
    return List;
}());
exports.List = List;
//# sourceMappingURL=list.js.map