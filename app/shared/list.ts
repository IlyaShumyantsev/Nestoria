export class List{
    private city:string;
    private country:string;
    private price_high:number;
    private price_low:number;
    private bedroom_number_min:number;
    private bedroom_number_max:number;
    private bathroom_number_min:number;
    private bathroom_number_max:number;
    private room_number_min:number;
    private room_number_max:number;
    private property_type:string;

    constructor(city:string, country:string, price_high:number, price_low:number,
                bedroom_number_min:number, bedroom_number_max:number,
                bathroom_number_min:number, bathroom_number_max:number,
                room_number_min:number, room_number_max:number, property_type:string){
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
}