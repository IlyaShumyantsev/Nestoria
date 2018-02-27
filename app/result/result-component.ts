import { Component, OnInit } from '@angular/core';

import { ListService } from '../shared/list.service';

@Component({
    moduleId: module.id,
    selector: 'app-result',
    templateUrl: 'result-component.html',
    styleUrls: ['result-component.css'],
})
export class ResultComponent implements OnInit{
    private apiUrl:string = "http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&place_name=newcr&callback=JSONP_CALLBACK";

    constructor(private listService:ListService){ }

    ngOnInit(){
        this.listService.getList(this.apiUrl).subscribe(data => {
            console.log(data);
        });
    }
 }
