import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-result',
    templateUrl: 'result.component.html',
    styleUrls: ['result.component.css'],
})
export class ResultComponent{
    private title:string = "Recent searches: ";
    private step:number;
    @Input() data;
    constructor(){
        this.step = -1;
    }

    private nextStep():number{
        return this.step++;
    }
 }
