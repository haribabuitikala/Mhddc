import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CollectionData} from "../collection/collection-data";
import {ConfigComponent} from "../config/config.component";
import {NavComponent} from "../nav/nav.component";
declare var _:any;
@Component({
    selector: 'app-construction',
    templateUrl: './construction.component.html',
    styleUrls: ['./construction.component.less']
})
export class ConstructionComponent implements OnInit {

    constructor(private dataStore:CollectionData
        , private route:Router
        , private config:ConfigComponent
        , private navComponent:NavComponent) {

    }

    number:number = 6;
    folder = 'construction';
    category = 'colors';
    data;

    ngOnInit() {
        this.startProcess();

        this.navComponent.renderNav({
            flowType: 'res',
            flowActiveStep: 5,
            currentStepUrl: '/config/construction',
            showStepIndicator: true,
            nextStepFn: () => {
                
            }
        });

        this.config.pageTitle = '5.Choose Your Construction';
    }

    startProcess() {
        let res = this.dataStore.constructions;
        this.data = _.chunk(res, 2)
    }

    nextBtn(path) {
        this.route.navigateByUrl(path);
    }

}
