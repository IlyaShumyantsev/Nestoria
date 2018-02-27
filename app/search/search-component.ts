import { Component } from '@angular/core';

import { List } from '../shared/list';

@Component({
    moduleId: module.id,
    selector: 'app-search',
    templateUrl: 'search-component.html',
    styleUrls: ['search-component.css']
})
export class SearchComponent{
    private apiUrl:string;

    constructor(){ }

    private country:string;
 }
