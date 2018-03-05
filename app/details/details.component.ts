import { Component, OnInit } from '@angular/core'
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { isNumeric } from 'rxjs/util/isNumeric';

declare const google: any;

@Component({
    moduleId: module.id,
    selector: 'app-details',
    templateUrl: 'details.component.html',
    styleUrls: ['details.component.css']
})

export class DetailsComponent implements OnInit {
    private querySubscription: Subscription;
    private info:any = {
        title: { },
        summay: { },
        image: { },
        price: { },
        property_type: { },
        bathroom_number: { },
        bedroom_number: { },
        keywords: { },
        latitude: { },
        longitude: { },
        lister_url: { }
    };

    private latitude:number;
    private longitude:number;

    constructor(private route: ActivatedRoute){
        this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => {
                this.info.title = queryParam['title'];
                this.info.summary = queryParam['summary'];
                this.info.image = queryParam['image'];
                this.info.price = queryParam['price'];
                this.info.property_type = queryParam['property_type'];
                this.info.bathroom_number = queryParam['bathroom_number'];
                this.info.bedroom_number = queryParam['bedroom_number'];
                this.info.keywords = queryParam['keywords'];
                this.info.latitude = queryParam['latitude'];
                this.info.longitude = queryParam['longitude'];
                this.latitude = parseFloat(this.info.latitude);
                this.longitude = parseFloat(this.info.longitude);
                this.info.lister_url = queryParam['lister_url'];
            }
        );
    }

    ngOnInit():boolean{
        let data = [];
        if(JSON.parse(localStorage.getItem("faves")) != null){
            data = JSON.parse(localStorage.getItem("faves"));
            if(this.searchInLocalStorage(data) == false){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }

    private addFaves(){
        let data = [];
        if(JSON.parse(localStorage.getItem("faves")) != null){
            data = JSON.parse(localStorage.getItem("faves"));
            if(this.searchInLocalStorage(data) == true){
                data.push(this.info);
                localStorage.setItem("faves", JSON.stringify(data));
            }
            else{
                for(let i=0; i<data.length; i++){
                    if(JSON.stringify(data[i]) == JSON.stringify(this.info)){
                        data.splice(i, 1);
                        localStorage.setItem("faves", JSON.stringify(data));
                    }
                }
            }
        }
        else{
            data.push(this.info);
            localStorage.setItem("faves", JSON.stringify(data));
        }
    }

    private searchInLocalStorage(data):boolean{
        let info = { info: this.info };
        if(data.some(this.searchInData, info) == false){
            return true;
        }
        else{
            return false;
        }
    }

    private searchInData(data){
        return JSON.stringify(data) == JSON.stringify(this.info);
    }
}