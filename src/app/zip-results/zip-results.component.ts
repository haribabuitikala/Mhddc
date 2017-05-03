import {Component, OnInit} from '@angular/core';
import {ZipResults} from "../shared/zipresults";
import {ActivatedRoute} from '@angular/router';
import {Izip} from "./Izip";
 import {LangEnglishService} from "../shared/english";

@Component({
    selector: 'app-zip-results',
    templateUrl: './zip-results.component.html',
    styleUrls: ['./zip-results.component.less']
})
export class ZipResultsComponent implements OnInit {

lang;
    constructor(private route:ActivatedRoute,private language:LangEnglishService) {
    }
    results:Izip;

    ngOnInit() {
        this.results = this.route.snapshot.data['results']
        this.lang=this.language.getzipResults();
    }


}
