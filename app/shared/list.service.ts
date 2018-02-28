import { Injectable } from '@angular/core';
import { JsonpModule, Jsonp, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ListService{
    private apiUrl:string;

    constructor(private jsonp:Jsonp){ }
    
    public getList(apiUrl:string){
        this.apiUrl = apiUrl;
        return this.jsonp.request(this.apiUrl).map(res =>{
            return res.json();
        })
    }
}