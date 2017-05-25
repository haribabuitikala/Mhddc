import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CollectionData} from "../collection/collection-data";
declare var _:any;
@Component({
    selector: 'app-construction',
    templateUrl: './construction.component.html',
    styleUrls: ['./construction.component.less']
})
export class ConstructionComponent implements OnInit {

    constructor(private dataStore:CollectionData
        , private route:Router) {
    }

    number:number = 6;
    folder = 'construction';
    category = 'colors';
    data;

    ngOnInit() {
        this.startProcess();
    }

    startProcess() {
        let res = this.dataStore.constructions;
        this.data = _.chunk(res, 2)
    }

    nextBtn(path) {
        this.route.navigateByUrl(path);
    }

}
