import {Component, OnInit} from '@angular/core';
import {CollectionData} from "../collection/collection-data";
import {NavComponent} from "../nav/nav.component";
declare var _:any;
@Component({
    selector: 'app-construction',
    templateUrl: './construction.component.html',
    styleUrls: ['./construction.component.less']
})
export class ConstructionComponent implements OnInit {

    constructor(private dataStore:CollectionData, private navComponent:NavComponent) {
    }

    number:number = 6;
    folder = 'construction';
    // category = 'colors';

    ngOnInit() {
        this.startProcess();

        // this.navComponent.renderNav({
        //     flowType: 'res',
        //     flowActiveStep: 1,
        //     currentStepUrl: '/doorSize',
        //     showStepIndicator: true,
        //     nextStepFn: () => {
                
        //     }
        // });
    }

    startProcess() {
        let data = this.dataStore.constructions;
        data = _.chunk(data, 2)
    }

}
