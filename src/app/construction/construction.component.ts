<<<<<<< HEAD
import { Component, OnInit, ViewChild } from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> 560562b6ade07caaff9bb4e204035abfb73245b8
import { Router } from '@angular/router';
import { CollectionData } from "../collection/collection-data";
import { ConfigComponent } from "../config/config.component";
import { NavComponent } from "../nav/nav.component";
import { AppUtilities } from "../shared/appUtilities";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";

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
    showUpsell: boolean = false;

    loaded = false;
    className = '';

    @ViewChild('upsell') upsell: ModalComponent;

    ngOnInit() {
        console.log("construction step");
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


		switch (this.utils.resFlowSession.resDetails.collectionName) {
            case "Coachman&#174; Collection": {
                this.className = 'classic-collection';
                break;
            }
            case "Gallery&#174; Collection":
            case "Classic&#8482; Collection - Premium Series": {
                this.className = 'gallery-collection';
                break;
            }
            case "Modern Steel Collection": {
                this.className = 'more-steel-collection';
                break;
            }
        }
    }

    startProcess() {
        // let res = this.dataStore.constructions;
        let res = this.utils.resFlowSession.resDoorObj.construction.apiData;
        this.data = _.chunk(res, 2);

        this.utils.resFlowSession.resDoorObj.construction.construction = res[0];

        this.loaded = true;
    }

 
    nextBtn(path, upsellModal) {
        if (this.utils.resFlowSession.collection.selectedCollection.item_id == 11 || 12 || 13 || 170) {
            upsellModal.open();
        } else {
            this.route.navigateByUrl(path);
        }
 
    }

    prevBtn() {
        this.route.navigateByUrl('/config/design');
    }

    moveNext() {
        this.route.navigateByUrl('config/color');
        // this.goToHome(this.selected);
    }

}
