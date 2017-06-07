import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from "../app.component";
import { AppUtilities } from "../shared/appUtilities";
import { CollectionService } from "../shared/data.service";
import { CollectionData } from "../collection/collection-data";
import { ConfigComponent } from "../config/config.component";
import { NavComponent } from "../nav/nav.component";
import { DetailsComponent } from "../details/details.component";
declare var _: any;
declare var $: any;

@Component({
    selector: 'app-design',
    templateUrl: './design.component.html',
    styleUrls: ['./design.component.less']
})
export class DesignComponent implements OnInit {

    constructor(private utils: AppUtilities
        , private dataStore: CollectionData
        , private navComponent: NavComponent
        , private dataService: CollectionService
        , private app: AppComponent
        , private config: ConfigComponent
        , private route: Router) {
    }

    data = [];
    number = 6;
    folder = 'design';
    category = 'constructions';
    loaded = false;

    ngOnInit() {
        this.startProcess();
        $('#visualize-header').html('5 Choose Your Design');
    }


    loadDesigns() {
        let utils = this.utils;
        let data = this.dataStore.designs;
        if (data && data.length > 0) {
            this.config.homeImage = data[0].item_thumbnail;
            utils.resFlowSession.resDetails.designName = data[0].item_name;
        }

        if (utils.utilities.singleDoor === true) {
            this.number = 6;
            this.data = _.chunk(data, 2);
        } else {
            this.number = 12;
            this.data = _.chunk(data, 1);
        }

        this.config.pageTitle = '4.Choose Your Door Design';

    }
    loadQucikDoors() {
        let utils = this.utils;
        let data = this.utils.resQuickSession.designs;
        this.config.homeImage = data[0].item_thumbnail;
        utils.resFlowSession.resDetails.designName = data[0].item_name;
        //this.details.details.designName = data[0].item_name;
 
        var uniqueData = _.uniqBy(data, 'item_id');
 
        if (utils.utilities.singleDoor === true) {
            this.number = 6;
            this.data = _.chunk(uniqueData, 2);
        } else {
            this.number = 12;
            this.data = _.chunk(uniqueData, 1);
        }


        this.config.pageTitle = '3.Choose Your Door Design';
    }

    startProcess() {
        if (this.navComponent.flowType === 'res') {
            this.navComponent.renderNav({
                flowType: 'res',
                flowActiveStep: 4,
                currentStepUrl: '/config/design',
                showStepIndicator: true,
                nextStepFn: () => {

                }
            });
            this.loadDesigns();
        } else {
            this.navComponent.renderNav({
                flowType: 'resquick',
                flowActiveStep: 3,
                currentStepUrl: '/config/design',
                showStepIndicator: true,
                nextStepFn: () => {

                }
            });
            this.loadQucikDoors();
        }

        this.utils.resFlowSession.resDoorObj.windows.topsection = '';

        this.utils.resFlowSession.resDoorObj.hardware.handle = '';
        this.utils.resFlowSession.resDoorObj.hardware.hinge = '';
        this.utils.resFlowSession.resDoorObj.hardware.stepplate = '';
        this.utils.resFlowSession.resDoorObj.hardware.lock = '';

        this.loaded = true;
        this.app.setLoader();
    }

    onDoorDesignSelected (e) {
        console.log(e.obj);
    }

    nextBtn(path) {
        this.route.navigateByUrl(path);
    }
    prevBtn(path) {
        this.utils.resFlowSession.resDoorObj.resetFromStep(2);
        if (this.navComponent.flowType === 'res') {
            this.route.navigateByUrl('/home');
        } else {
            this.route.navigateByUrl('/doorSize');
        }
    }

}
