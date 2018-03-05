import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-faves',
    templateUrl: 'faves.component.html',
    styleUrls: ['faves.component.css']
})

export class FavesComponent implements OnInit{ 
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

    ngOnInit(){
        this.data = JSON.parse(localStorage.getItem("faves"));
    }

    private info(data, i){
        alert('Title: ' + data[i].title +
            '\nProperty type: ' + data[i].property_type +
            '\nBathroom number: ' + data[i].bathroom_number +
            '\nBedroom number: ' + data[i].bedroom_number + 
            '\nSummary: ' + data[i].summary +
            '\nKeywords: ' + data[i].keywords);
    }
}