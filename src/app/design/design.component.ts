import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppUtilities} from "../shared/appUtilities";
import {CollectionData} from "../collection/collection-data";
import {ConfigComponent} from "../config/config.component";
declare var _:any;

@Component({
    selector: 'app-design',
    templateUrl: './design.component.html',
    styleUrls: ['./design.component.less']
})
export class DesignComponent implements OnInit {

    constructor(private utils:AppUtilities
        , private dataStore:CollectionData
        , private config:ConfigComponent
        , private route:Router) {
    }

    data;
    number = 6;
    folder = 'design';
    category = 'constructions';

    ngOnInit() {
        this.startProcess();
    }

    startProcess() {
        let utils = this.utils;
        this.data = this.dataStore.designs;
        this.data = _.chunk(this.data, 6);
    }

    nextBtn(path) {
        this.route.navigateByUrl(path)
    }

    getDesignImgs() {


    }

}
