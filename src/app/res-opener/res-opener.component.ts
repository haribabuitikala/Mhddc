import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { Router } from '@angular/router';
import { AppUtilities } from "../shared/appUtilities";
import { NavService } from "../nav/nav-service";
import { CollectionData } from "../collection/collection-data";
import { CollectionService } from "../shared/data.service";
import { GdoConfigComponent } from "../gdo-config/gdo-config.component";
import { NavComponent } from '../nav/nav.component'
import { ConfigComponent } from "../config/config.component";
declare var _: any;

@Component({
    selector: 'res-opener',
    templateUrl: './res-opener.component.html',
    styleUrls: ['./res-opener.component.less']
})
export class ResOpenerComponent implements OnInit {
    @ViewChild('gdoOponerAccessories') gdoOponerAccessories: ModalComponent;

    constructor(private utils: AppUtilities
        , private navComp: NavService
        , private navComponent: NavComponent
        , private route: Router
        , private config: ConfigComponent
        , private dataStrorage: CollectionData
        , private dataService: CollectionService) {
    }

    isLoaded = false;
    openers;
    number = 6;
    ngOnInit() {
        this.navComponent.renderNav({
            flowType: 'res',
            flowActiveStep: 11,
            currentStepUrl: '/config/opener',
            showStepIndicator: true,
            nextStepFn: () => {

            }
        });
        this.config.pageTitle = '11.Choose Your Opener';
        // let dataParams = {
        //     dheightFt: this.utils.utilities.hf,
        //     lang: this.utils.utilities.lang,
        //     isGDO: this.utils.utilities.isGDO,
        //     localmarketid: this.utils.utilities.localmarketid,
        //     NatMarketID: this.utils.utilities.natmarketid,
        //     ProductType: 'RES',
        //     openertype: this.utils.utilities.gdoStore
        // };

        let dataParams = {
            natmarketid: 6000,
            wf: 8,
            wi: 0,
            hf: 7,
            hi: 0,
            lang: 'en',
            isgdo: 0,
            localmarketid: 75,
            constructionid: 83,
            producttype: 'RES',
            windcode: 'W0',
            doorsize: 1,
        }
        console.log('params ', dataParams);

        this.dataService.getGdoOpener(dataParams)
            .subscribe(
            res => {
                console.log('openers', res);
                let data = res;
                this.openers = _.chunk(data, 2);
                this.utils.resFlowSession.resDoorObj.opener.apiData = res;
                this.isLoaded = true;
            });
    }

    nextBtn(path) {

    }




    getOpenerId(data) {

    }

    prevBtn(path) {

    }

    goTo(path) {
        console.log('path ', path);
        this.route.navigateByUrl(path);


    }

}
