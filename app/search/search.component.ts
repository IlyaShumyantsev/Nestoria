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
    private country:string;

    private language:string;
    private apiUrl:string;
    private callback:string;
    private page:number;

    constructor(private listService:ListService, private fb:FormBuilder,
    private mapsAPILoader: MapsAPILoader, private ngZone: NgZone){ 
        this.city = "Manchester";
        this.language = "en";
        this.apiUrl = "";
        this.callback = "&callback=JSONP_CALLBACK";
        this.page = 1;
        this.createForm();
    }

    @ViewChild('search') public searchElement: ElementRef;

    ngOnInit(){
        this.data = JSON.parse(localStorage.getItem("searchRes"));
        this.page = this.data.response.page;

        this.mapsAPILoader.load().then(
            () =>{
                let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, {
                    //types: ["locality(cities)"],
                });
                autocomplete.addListener("place_changed", () =>{
                    this.ngZone.run(()=>{
                        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                        this.city = place.name.toString();
                        this.country = place.formatted_address.slice(place.formatted_address.lastIndexOf(" "), place.formatted_address.length);
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
        if(this.country === " UK"){
            this.country = "co.uk";
        }
        else if(this.country === "Spain"){
            this.country = "es";
        }
        else if(this.country === "Germany"){
            this.country = "de";
        }
        else if(this.country === "France"){
            this.country = "fr";
        }
        else if(this.country === "Chile"){
            this.country = "ch";
        }
        else if(this.country === "Mexico"){
            this.country = "mx";
        }
        else if(this.country === "Brazil"){
            this.country = "com.br";
        }
        else if(this.country === "India"){
            this.country = "in";
        }
        else if(this.country === "Peru"){
            this.country = "pe";
        }
        else if(this.country === "Australia"){
            this.country = "au";
        }
        else if(this.country === "Philippines"){
            this.country = "ph";
        }
        else if(this.country === "Polska"){
            this.country = "pl";
        }
        else if(this.country === "Austria"){
            this.country = "at";
        }
        else if(this.country === "Emirates"){
            this.country = "ae";
        }
        else if(this.country === "Italy"){
            this.country = "it";
        }
        else if(this.country === "Switzerland"){
            this.country = "ch";
        }
        else if(this.country === "Turkey"){
            this.country = "com.tr";
        }
        else if(this.country === "Portugal"){
            this.country = "pt";
        }
    }

    private backPage(){
        if(this.data.response.page >= 2){
            this.page = this.page - 1;
            this.searchFun(this.page);
        }
        else{
            this.page = this.data.response.page;
        }
    }

    private nextPage(){
        if(this.data.response.page <= this.data.response.total_pages){
            this.page = this.page + 1;
            this.searchFun(this.page);
        }
        else{
            this.page = this.data.response.page;
        }
    }
 }
