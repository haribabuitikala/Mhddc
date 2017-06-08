import { Component, OnInit } from '@angular/core';
import { CollectionData } from "../collection/collection-data";
import { Router } from '@angular/router';
import { CollectionService } from "../shared/data.service";
import { ConfigComponent } from "../config/config.component";
import { NavComponent } from "../nav/nav.component";
import { AppComponent } from "../app.component";
import { AppUtilities } from "../shared/appUtilities";

declare var _: any;

@Component({
    selector: 'app-color',
    templateUrl: './color.component.html',
    styleUrls: ['./color.component.less']
})
export class ColorComponent implements OnInit {

    constructor(private dataStore: CollectionData
        , private route: Router
        , private navComponent: NavComponent
        , private utils: AppUtilities
        , private app: AppComponent
        , private config: ConfigComponent
        , private dataService: CollectionService) {
    }

    data;
    number = 4;
    folder = 'color';
    showVinyl = false;
    vinylOptions = [];
    selectedVinyl;
    selectedGroove;
    loaded = false;
    showgroove = false;
    grooves = [];
    selectedCladding;
    claddings = [];

    ngOnInit() {
        this.startProcess();
    }

    startProcess() {
        let res = this.utils.resFlowSession.resDoorObj.construction.construction['colors'];
        this.data = _.chunk(res, 6);

        if (this.navComponent.flowType === 'res') {
            this.navComponent.renderNav({
                flowType: 'res',
                flowActiveStep: 6,
                currentStepUrl: '/config/color',
                showStepIndicator: true,
                nextStepFn: () => {

                }
            });
            this.config.pageTitle = '6.Choose Your Color';
        } else {
            this.navComponent.renderNav({
                flowType: 'resquick',
                flowActiveStep: 5,
                currentStepUrl: '/config/color',
                showStepIndicator: true,
                nextStepFn: () => {

                }
            });
            this.config.pageTitle = '5.Choose Your Color';
        }

        this.utils.resFlowSession.resDoorObj.color.apiData = res;
        this.utils.resFlowSession.resDoorObj.color.base = res[0];
        this.utils.resFlowSession.resDoorObj.color.overlay = res[0];

        if (this.utils.resFlowSession.resDoorObj.product.product['item_id'] == 11) {
            this.showOverlay = true;
        }

        this.claddings = this.utils.resFlowSession.resDoorObj.construction.construction['claddingoverlays'];

        this.loaded = true;

        if (this.utils.resFlowSession.resDoorObj.product.product['item_id'] == 9) {
            this.showVinyl = true;
            this.showgroove = true;
            let vinylOptions = this.utils.resFlowSession.resDoorObj.construction.construction['vinyls'];
            var vinylOptionsunique = _.uniqBy(vinylOptions, 'item_name');
            this.vinylOptions = [].concat([{
                heightitem_price: 0,
                heightpartid: "",
                heightqty: 0,
                isdefault: false,
                item_description: null,
                item_id: -1,
                item_name: "No Vinyl",
                item_price: 0,
                item_thumbnail: null,
                widthitem_price: 0,
                widthpartid: "",
                widthqty: 0
            }], vinylOptionsunique);

            this.selectedVinyl = 0;

            this.grooves = [].concat([{
                centergrooveconfig: "CNONE",
                isdefault: false,
                item_description: null,
                item_id: 84,
                item_name: "No Center Groove",
                item_price: 0,
                item_thumbnail: null,
                nogrooves: 0

            }], [this.utils.resFlowSession.resDoorObj.construction.construction['centergrooves'][0]]);
            this.selectedGroove = 0;
        }
    }

    showOverlay = false;
    setParams() {

        let utils = this.utils.utilities;
        var resDoorObj = this.utils.resFlowSession.resDoorObj;
        return {
            "dtype": 'RES',
            "productid": resDoorObj.product.product['item_id'],
            "windcode": "W0",
            "NatMarketID": +utils.natmarketid,
            "doorcolumns": resDoorObj.design.dsgn['Columns'],
            'colorconfig': resDoorObj.color.base['colorconfig'],
            "clopaymodelnumber": resDoorObj.construction.construction['ClopayModelNumber'],
            "dwidthFt": +utils.wf,
            "dwidthIn": +utils.wi || 0,
            "dheightFt": +utils.hf,
            "dheightIn": +utils.hi || 0,
            "lang": "en",
            "marketID": +utils.localmarketid,
            "doorsize": +utils.homeSize
        };
    }


    errorMsg;
    nextBtn(path, warning?) {
        if (this.utils.resFlowSession.resDoorObj.product.product['item_id'] == 9) {
            this.utils.resFlowSession.resDoorObj.construction.vinyl = this.vinylOptions[+this.selectedVinyl];
            this.utils.resFlowSession.resDoorObj.construction.groove = this.grooves[+this.selectedGroove];
        }
        if (this.claddings && this.claddings.length > 1) {
            if (this.selectedCladding) {
                this.utils.resFlowSession.resDoorObj.construction.cladding = this.claddings[+this.selectedCladding];
                this.moveToPage();
            } else {
                this.errorMsg = 'Please Select Cladding and Overlay';
                warning.open();
            }
        } else {
            this.moveToPage();
        }
    }

    moveToPage() {
        if (this.navComponent.flowType === 'res') {
            let params = this.setParams();
            this.dataService.getTopSection(params).subscribe(res => {
                this.dataStore.topSection = res;
                this.utils.resFlowSession.resDoorObj.windows.apiData = res;
                this.route.navigateByUrl('config/topSection');
            });
        } else {
            this.route.navigateByUrl('config/install');
        }
    }

    prevBtn() {
        this.resetPrice();
        this.utils.resFlowSession.resDoorObj.resetFromStep(4);
        this.route.navigateByUrl('/config/construction');
    }

    resetPrice() {
        this.utils.resFlowSession.resDoorObj.color.overlay = null;
        this.utils.resFlowSession.resDoorObj.color.base = null;
    }

    updatePrice() {
        this.app.updatePrice();
    }
}
