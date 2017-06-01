import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { Router } from '@angular/router';
import { AppUtilities } from "../shared/appUtilities";
import { NavService } from "../nav/nav-service";
import { CollectionData } from "../collection/collection-data";
import { CollectionService } from "../shared/data.service";
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
    dataParams: any;

    selectedOpener;
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
        this.dataParams = {
            natmarketid: +this.utils.utilities.natmarketid,
            wf: this.utils.utilities.wf,
            wi: this.utils.utilities.wi,
            hf: this.utils.utilities.hf,
            hi: this.utils.utilities.hi,
            lang: 'en',
            isgdo: 0,
            localmarketid: +this.utils.utilities.localmarketid,
            constructionid: +this.utils.resFlowSession.resDoorObj.construction.construction['item_id'],
            producttype: 'RES',
            windcode: this.utils.resFlowSession.resDoorObj.product.product['windcode'],
            doorsize: +this.utils.utilities.homeSize,
        }

        this.dataService.getResOpener(this.dataParams)
            .subscribe(
            res => {
                let data = res;
                this.openers = _.chunk(data, 2);
                this.utils.resFlowSession.resDoorObj.opener.apiData = res;
                this.isLoaded = true;
            });
    }

    additionalItems = [];
    nextBtn(path) {
        let openerParams = {
            natmarketid: +this.utils.utilities.natmarketid,
            lang: 'en',
            localmarketid: +this.utils.utilities.localmarketid,
            openerid: +this.utils.resFlowSession.resDoorObj.opener.opener['item_id']
        };
        this.selectedOpener = this.utils.resFlowSession.resDoorObj.opener.opener;
        this.dataService.getOpenerAdditional(openerParams)
            .subscribe(
            res => {
                this.additionalItems = res;
                this.gdoOponerAccessories.open();
            });
    }



    resopenerText;
    resConfig = {
        openerText: ''
    };

    prevBtn(path) {
         this.route.navigateByUrl('/config/install');
    }

    accessoriesModalClose() {
        this.additionalItems = [];
        this.gdoOponerAccessories.close();
    }

    accessoriesModalNext() {
        this.route.navigateByUrl('/config/additionalOptions');
    }


}
