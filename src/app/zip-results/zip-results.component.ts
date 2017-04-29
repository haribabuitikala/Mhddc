import {Component, OnInit} from '@angular/core';
import {ZipResults} from "../shared/zipresults";
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-zip-results',
    templateUrl: './zip-results.component.html',
    styleUrls: ['./zip-results.component.less']
})
export class ZipResultsComponent implements OnInit {

    constructor(private zip:ZipResults
        , private route:ActivatedRoute) {
    }
    results:any;

    ngOnInit() {
        let zip = this.route.snapshot.params['zip'];
        this.getNearest(zip);
    }

    getNearest(zipCode){
        this.results = this.zip.getZip(zipCode);
    }


}
