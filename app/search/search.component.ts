import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validator, Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

import { ListService } from '../shared/list.service';
import { last } from '@angular/router/src/utils/collection';

@Component({
    moduleId: module.id,
    selector: 'app-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css']
})
export class SearchComponent implements OnInit{
    private data:any = { };

    private city:string;
    private country:string;

    private language:string;
    private apiUrl:string;
    private callback:string;
    private page:number;

    @ViewChild('search') public searchElement:ElementRef;

    constructor(private listService:ListService, private fb:FormBuilder,
    private mapsAPILoader: MapsAPILoader, private ngZone: NgZone){ 
        this.city = "Manchester";
        this.country = "co.uk";
        this.language = "en";
        this.apiUrl = "";
        this.callback = "&callback=JSONP_CALLBACK";
        this.page = 1;
        this.createForm();
    }

    ngOnInit(){
        this.data = JSON.parse(localStorage.getItem("searchRes"));
        this.page = this.data.response.page;

        this.country = this.data.request.country;
        this.city = this.data.request.location;

        this.mapsAPILoader.load().then(
            () =>{
                let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, {
                    //types: ["locality(cities)"],
                });
                autocomplete.addListener("place_changed", () =>{
                    this.ngZone.run(()=>{
                        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                        if(place.formatted_address != null || place.formatted_address != undefined){
                            this.city = place.name.toString();
                            this.country = place.formatted_address.slice(place.formatted_address.lastIndexOf(" ") + 1, place.formatted_address.length);
                        }
                        if(place.geometry === undefined || place.geometry === null){
                            return;
                        }
                    });
                });
            }
        )
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

    public searchFun(page){
        this.page = page;
        this.setFilters(page);
        console.log(this.apiUrl);
        this.listService.getList(this.apiUrl).subscribe(data => {
            //this.data = data;
            localStorage.setItem('searchRes', JSON.stringify(data));
            this.data = JSON.parse(localStorage.getItem("searchRes"));
        });
    }

    public setFilters(page){
        this.countryFilter();
        this.apiUrl = "http://api.nestoria." + this.country +"/api?country=uk&language=" + this.language +
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

    private countryFilter(){
        switch(this.country){
            case "UK":{
                this.country = "co.uk";
                break;
            }
            case "uk":{
                this.country = "co.uk";
                break;
            }
            case "Spain":{
                this.country = "es";
                break;
            }
            case "Germany":{
                this.country = "de";
                break;
            }
            case "France":{
                this.country = "fr";
                break;
            }
            case "Chile":{
                this.country = "cl";
                break;
            }
            case "Mexico":{
                this.country = "mx";
                break;
            }
            case "Brazil":{
                this.country = "com.br";
                break;
            }
            case "br":{
                this.country = "com.br";
                break;
            }
            case "India":{
                this.country = "in";
                break;
            }
            case "Peru":{
                this.country = "pe";
                break;
            }
            case "Australia":{
                this.country = "com.au";
                break;
            }
            case "au":{
                this.country = "com.au";
                break;
            }
            case "Philippines":{
                this.country = "com.ph";
                break;
            }
            case "ph":{
                this.country = "com.ph";
                break;
            }
            case "Poland":{
                this.country = "pl";
                break;
            }
            case "Austria":{
                this.country = "at";
                break;
            }
            case "Emirates":{
                this.country = "ae";
                break;
            }
            case "Italy":{
                this.country = "it";
                break;
            }
            case "Switzerland":{
                this.country = "ch";
                break;
            }
            case "Turkey":{
                this.country = "com.tr";
                break;
            }
            case "tr":{
                this.country = "com.tr";
                break;
            }
            case "Portugal":{
                this.country = "pt";
                break;
            }
            case "Argentina":{
                this.country = "com.ar";
                break;
            }
            case "ar":{
                this.country = "com.ar";
                break;
            }
            case "Colombia":{
                this.country = "com.co";
                break;
            }
            case "co":{
                this.country = "com.co";
                break;
            }
            case "Indonesia":{
                this.country = "co.id";
                break;
            }
            case "id":{
                this.country = "co.id";
                break;
            }
            default:{
                break;
            }
        }
    }

    private paginationControl(index){
        if(index === 0){
            if(this.data.response.page >= 2){
                this.page = this.page - 1;
                this.searchFun(this.page);
            }
            else{
                this.page = this.data.response.page;
            }
        }
        if(index === 1){
            if(this.data.response.page <= this.data.response.total_pages){
                this.page = this.page + 1;
                this.searchFun(this.page);
            }
            else{
                this.page = this.data.response.page;
            }
        }
    }
 }
