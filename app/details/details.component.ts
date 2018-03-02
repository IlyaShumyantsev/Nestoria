import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector: 'app-details',
    templateUrl: 'details.component.html',
    styleUrls: ['details.component.css']
})

export class DetailsComponent {
    private querySubscription: Subscription;
    private info:any = {
        title: { },
        summay: { },
        image: { },
        price: { },
        property_type: { },
        bathroom_number: { },
        bedroom_number: { },
        keywords: { }
    };

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

                console.log(this.info.title);
                console.log(this.info.summary);
                console.log(this.info.image);
                console.log(this.info.price);
                console.log(this.info.property_type);
                console.log(this.info.bathroom_number);
                console.log(this.info.bedroom_number);
                console.log(this.info.keywords);
            }
        );
    }
}