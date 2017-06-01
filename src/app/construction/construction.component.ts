import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionData } from "../collection/collection-data";
import { ConfigComponent } from "../config/config.component";
import { NavComponent } from "../nav/nav.component";
import { AppUtilities } from "../shared/appUtilities";

declare var _: any;
@Component({
    selector: 'app-construction',
    templateUrl: './construction.component.html',
    styleUrls: ['./construction.component.less']
})
export class ConstructionComponent implements OnInit {

    constructor(private dataStore: CollectionData
        , private route: Router
        , private utils: AppUtilities
        , private config: ConfigComponent
        , private navComponent: NavComponent) {

    }

    number: number = 6;
    folder = 'construction';
    category = 'colors';
    data;

    loaded = false;

    ngOnInit() {
        this.startProcess();
        if (this.navComponent.flowType === 'res') {
            this.navComponent.renderNav({
                flowType: 'res',
                flowActiveStep: 5,
                currentStepUrl: '/config/construction',
                showStepIndicator: true,
                nextStepFn: () => {

                }
            });
            this.config.pageTitle = '5.Choose Your Construction';
        } else {
            this.navComponent.renderNav({
                flowType: 'resquick',
                flowActiveStep: 4,
                currentStepUrl: '/config/construction',
                showStepIndicator: true,
                nextStepFn: () => {

                }
            });
            this.config.pageTitle = '4.Choose Your Construction';
        }
    }

    startProcess() {
        // let res = this.dataStore.constructions;
        let res = this.utils.resFlowSession.resDoorObj.construction.apiData;
        this.data = _.chunk(res, 2);

        this.utils.resFlowSession.resDoorObj.construction.construction = res[0];

        this.loaded = true;
    }

    nextBtn(path) {
        this.route.navigateByUrl('config/color');
    }

    prevBtn() {
        this.route.navigateByUrl('/config/design');
    }

}
