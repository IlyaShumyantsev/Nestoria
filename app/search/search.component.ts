import { Component } from '@angular/core';

import { List } from '../shared/list';
import { ListService } from '../shared/list.service';
import { parse } from 'querystring';

@Component({
    moduleId: module.id,
    selector: 'app-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css']
})
export class SearchComponent{
    private data:any = {
        request: {
            country: { },
            language: { },
            location: { },
            page: { }
        },
        response: {
            listings: [],
            page: { },
            status_code: { },
            total_pages: { },
            total_results: { }
        }
    }

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
    private apiUrl:string;
    private callback:string;

    constructor(private listService:ListService){ 
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

    public search(){
        this.setFilters();
        this.listService.getList(this.apiUrl).subscribe(data => {
            this.data = data;
        });
    }

    public setFilters(){
        this.apiUrl = "http://api.nestoria." + this.country +"/api?country=uk&pretty=1&action=search_listings" + 
                        "&encoding=json&listing_type=buy&page=1&place_name=" + this.city;
        if(this.price_high > 0){ this.apiUrl += "&price_max=" + this.price_high; }
        if(this.price_low > 0){ this.apiUrl += "&price_min=" + this.price_low; }
        if(this.bedroom_number_max > 0){ this.apiUrl += "&bedroom_max=" + this.bedroom_number_max; }
        if(this.bedroom_number_min > 0){ this.apiUrl += "&bedroom_min=" + this.bedroom_number_min; }
        if(this.bathroom_number_max > 0){ this.apiUrl += "&bathroom_max=" + this.bathroom_number_max; }
        if(this.bathroom_number_min > 0){ this.apiUrl += "&bathroom_min=" + this.bathroom_number_min; }
        if(this.room_number_max > 0){ this.apiUrl += "&room_max=" + this.room_number_max; }
        if(this.room_number_min > 0){ this.apiUrl += "&room_min=" + this.room_number_min; }
        if(this.property_type != "all"){ this.apiUrl += "&property_type=" + this.property_type; }
        this.apiUrl += this.callback;
    }
 }
