import {Component, OnInit} from '@angular/core';
import {CollectionData} from "../collection/collection-data";
declare var _:any;
@Component({
    selector: 'app-construction',
    templateUrl: './construction.component.html',
    styleUrls: ['./construction.component.less']
})
export class ConstructionComponent implements OnInit {

    constructor(private dataStore:CollectionData) {
    }

    number:number = 6;
    folder = 'construction';
    // category = 'colors';

    ngOnInit() {
        this.startProcess();
    }

    startProcess() {
        let data = this.dataStore.constructions;
        data = _.chunk(data, 2)
    }

}
