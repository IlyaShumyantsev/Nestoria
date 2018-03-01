import { Component } from '@angular/core';

import { ListService } from '../shared/list.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

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
    };

    private city:string;
    private language:string;
    private apiUrl:string;
    private callback:string;
    private page:number;

    constructor(private listService:ListService, private fb:FormBuilder){ 
        this.city = "Manchester";
        this.language = "en";
        this.apiUrl = "";
        this.callback = "&callback=JSONP_CALLBACK";
        this.page = 1;
        this.createForm();
    }

    private myForm:FormGroup;
    
    private createForm(){
        this.myForm = this.fb.group({
            country:new FormControl("co.uk"),
            property_type:new FormControl("all"),
            price_low:new FormControl(0),
            price_high:new FormControl(0),
            bedroom_number_min:new FormControl(0),
            bedroom_number_max:new FormControl(0),
            room_number_min:new FormControl(0),
            room_number_max:new FormControl(0),
            bathroom_number_min:new FormControl(0),
            bathroom_number_max:new FormControl(0)
        });
    }

    public search(page){
        this.page = page;
        this.setFilters(page);
        this.listService.getList(this.apiUrl).subscribe(data => {
            this.data = data;
        });
    }

    public setFilters(page){
        this.apiUrl = "http://api.nestoria." + this.myForm.get("country").value +"/api?country=uk&language=" + this.language +
                        "&pretty=1&action=search_listings" + 
                        "&encoding=json&listing_type=buy&page=" + page + "&place_name=" + this.city;
        if(this.myForm.get("price_high").value > 0){
            this.apiUrl += "&price_max=" + this.myForm.get("price_high").value;
        }
        if(this.myForm.get("price_low").value > 0){
            this.apiUrl += "&price_min=" + this.myForm.get("price_low").value;
        }
        if(this.myForm.get("bedroom_number_max").value > 0){
            this.apiUrl += "&bedroom_max=" + this.myForm.get("bedroom_number_max").value ;
        }
        if(this.myForm.get("bedroom_number_min").value  > 0){
            this.apiUrl += "&bedroom_min=" + this.myForm.get("bedroom_number_min").value ;
        }
        if(this.myForm.get("bathroom_number_max").value > 0){
            this.apiUrl += "&bathroom_max=" + this.myForm.get("bathroom_number_max").value;
        }
        if(this.myForm.get("bathroom_number_min").value> 0){
            this.apiUrl += "&bathroom_min=" + this.myForm.get("bathroom_number_min").value;
        }
        if(this.myForm.get("room_number_max").value > 0){
            this.apiUrl += "&room_max=" + this.myForm.get("room_number_max").value;
        }
        if(this.myForm.get("room_number_min").value > 0){
            this.apiUrl += "&room_min=" + this.myForm.get("room_number_min").value;
        }
        if(this.myForm.get("property_type").value != "all"){
            this.apiUrl += "&property_type=" + this.myForm.get("property_type").value;
        }
        this.apiUrl += this.callback;
    }

    private backPage(){
        if(this.data.response.page >= 2){
            this.page = this.page - 1;
            this.search(this.page);
        }
        else{
            this.page = this.data.response.page;
        }
    }

    private nextPage(){
        if(this.data.response.page <= this.data.response.total_pages){
            this.page = this.page + 1;
            this.search(this.page);
        }
        else{
            this.page = this.data.response.page;
        }
    }
 }
