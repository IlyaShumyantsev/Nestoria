import { Component } from '@angular/core'
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

export class DetailsComponent{
    private querySubscription: Subscription;
    private info:any = { };

    private latitude:number;
    private longitude:number;

    constructor(private route: ActivatedRoute){
        this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => {
                this.info = JSON.parse(queryParam['data']);
 
                this.latitude = parseFloat(this.info.latitude);
                this.longitude = parseFloat(this.info.longitude);
            }
        );
    }

    favesStatus():boolean{
        let data = localStorage.getItem("faves");
        if(JSON.parse(data) != null){
            if(this.searchInLocalStorage(JSON.parse(data)) == false){
                return true;
            }
            return false;
        }
        return false;
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
        return false;
    }

    private searchInData(data){
        return JSON.stringify(data) == JSON.stringify(this.info);
    }
}