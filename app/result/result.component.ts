import { Component, Input, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-result',
    templateUrl: 'result.component.html',
    styleUrls: ['result.component.css'],
})
export class ResultComponent implements OnInit{
    private title:string = "Recent searches: ";
    private step:number;
    @Input() data;
    
    constructor(){
        this.step = -1;
    }

    ngOnInit(){
        this.data = JSON.parse(localStorage.getItem("searchRes"));
    }

    private info(data, i){
        alert('Title: ' + data.response.listings[i].title +
            '\nProperty type: ' + data.response.listings[i].property_type +
            '\nBathroom number: ' + data.response.listings[i].bathroom_number +
            '\nBedroom number: ' + data.response.listings[i].bedroom_number + 
            '\nSummary: ' + data.response.listings[i].summary +
            '\nKeywords: ' + data.response.listings[i].keywords);
    }

    private objectToString(obj):string{
        try{
            return JSON.stringify(obj);
        }
        catch(err){
            console.log(err);
        }
    }
 }
