import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from "../app.component";
import { AppUtilities } from "../shared/appUtilities";
import { CollectionService } from "../shared/data.service";
import { CollectionData } from "../collection/collection-data";
import { ConfigComponent } from "../config/config.component";
import { NavComponent } from "../nav/nav.component";
declare var _: any;

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

    data;
    number = 6;
    folder = 'design';
    category = 'constructions';
    loaded = false;

    ngOnInit() {
        this.startProcess();
        $('#visualize-header').html('5 Choose Your Design');
    }


    startProcess() {
        let utils = this.utils;
        let data = this.dataStore.designs;
        this.config.homeImage = data[0].item_thumbnail;
        this.data = _.chunk(data, 4);

        this.navComponent.renderNav({
            flowType: 'res',
            flowActiveStep: 4,
            currentStepUrl: '/config/design',
            showStepIndicator: true,
            nextStepFn: () => {

            }
        });

        this.config.pageTitle = '4.Choose Your Door Design';

        this.utils.resFlowSession.resDoorObj.design.dsgn = data[0];
        this.utils.resFlowSession.resDoorObj.construction.apiData = data[0].constructions;
        this.utils.resFlowSession.resDoorObj.construction.construction = data[0].constructions[0];
        var constructionSelected = this.utils.resFlowSession.resDoorObj.construction.construction;
        if (constructionSelected && constructionSelected['colors']) {
            if (constructionSelected['colors'].length > 0) {
                this.utils.resFlowSession.resDoorObj.color.base = constructionSelected['colors'][0];
                this.utils.resFlowSession.resDoorObj.color.overlay = constructionSelected['colors'][0];
                this.app.updatePrice();
            }
        }

        this.loaded = true;

        this.config.renderCanvas();
    }

    nextBtn(path) {
        this.route.navigateByUrl(path);
    }
    prevBtn(path) {
        this.route.navigateByUrl('/home');
    }

}
