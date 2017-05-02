import {Component, OnInit} from '@angular/core';
import {ZipResults} from "../shared/zipresults";
import {ActivatedRoute} from '@angular/router';
import {Izip} from "./Izip";

@Component({
    selector: 'app-zip-results',
    templateUrl: './zip-results.component.html',
    styleUrls: ['./zip-results.component.less']
})
export class ZipResultsComponent implements OnInit {

    constructor(private route:ActivatedRoute) {
    }
    results:Izip;

    ngOnInit() {
        this.results = this.route.snapshot.data['results']
    }


}
