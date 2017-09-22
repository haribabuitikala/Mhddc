import { Component, OnInit } from '@angular/core';
import { CollectionData } from "../collection/collection-data";
import { Router } from '@angular/router';
import { CollectionService } from "../shared/data.service";
import { ConfigComponent } from "../config/config.component";
import { NavComponent } from "../nav/nav.component";
import { AppComponent } from "../app.component";
import { AppUtilities } from "../shared/appUtilities";

declare var _: any;
declare var ga:Function;
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
    selectedCladding = "-1";
    claddings = [];

    ngOnInit() {
        this.utils.resFlowSession.resDoorObj.resetcolor();
        this.startProcess();
    }

    startProcess() {


        // setting the details info
        this.config.detailsInfo = {
            construction: true,
            baseName: true,
            overlayName: false,
            topSection: false,
            Hardware: false,
            color: true,
            overlayColor: false,
            glassType: false,
            Opener: false
        }
        let res = this.utils.resFlowSession.resDoorObj.construction.construction['colors'];
        let colorsFiltered = res;
        this.colors = res;
        let resObj = this.utils.resFlowSession.resDoorObj;
        if (res && resObj.product && resObj.product.product['item_id'] == 30 &&
            resObj.product.product['productline'] == 'speciality') {
            colorsFiltered = res.filter(c => {
                if (c.item_id != 126) {
                    return true;
                }
                return false;
            });
        }
        this.data = _.chunk(colorsFiltered, 6);

        if (this.navComponent.flowType === 'res') {
            this.navComponent.renderNav({
                flowType: 'res',
                flowActiveStep: 6,
                currentStepUrl: '/config/color',
                showStepIndicator: true,
                pageTitle: 'Choose Your Color',
                nextStepFn: () => {

                }
            });

        } else {
            this.navComponent.renderNav({
                flowType: 'resquick',
                flowActiveStep: 5,
                currentStepUrl: '/config/color',
                showStepIndicator: true,
                pageTitle: 'Choose Your Color',
                nextStepFn: () => {

                }
            });
        }

        this.utils.resFlowSession.resDoorObj.color.apiData = res;
        this.utils.resFlowSession.resDoorObj.color.base = res[0];
        this.utils.resFlowSession.resDoorObj.color.overlay = res[0];

        if (this.utils.resFlowSession.resDoorObj.product.product['item_id'] == 11) {
            this.showOverlay = true;
            this.config.detailsInfo.overlayColor = true;
        }

        this.claddings = this.utils.resFlowSession.resDoorObj.construction.construction['claddingoverlays'];

        this.loaded = true;

        if (this.utils.resFlowSession.resDoorObj.product.product['item_id'] == 9) {
            this.showVinyl = true;
            this.showgroove = true;
            let vinylOptions = this.utils.resFlowSession.resDoorObj.construction.construction['vinyls'];
            this.vinylOptions = _.uniqBy(vinylOptions, 'item_name');
            this.selectedVinyl = 0;

            // this.grooves = [];
            this.grooves = this.utils.resFlowSession.resDoorObj.construction.construction['centergrooves'];
            // .concat([{
            //     centergrooveconfig: "CNONE",
            //     isdefault: false,
            //     item_description: null,
            //     item_id: 84,
            //     item_name: "No Center Groove",
            //     item_price: 0,
            //     item_thumbnail: null,
            //     nogrooves: 0

            // }], [this.utils.resFlowSession.resDoorObj.construction.construction['centergrooves'][0]]);
            this.selectedGroove = 0;
        }

        if (resObj.product && resObj.product.product['item_id'] == 30 &&
            resObj.product.product['productline'] == 'speciality') {
            this.showcladding = true;
        }
    }

    showOverlay = false;
    setParams() {

        let utils = this.utils.utilities;
        var resDoorObj = this.utils.resFlowSession.resDoorObj;
       var modelBasedProductId =   this.setProductID();
        return {
            "dtype": 'RES',
            "productid": modelBasedProductId,
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

    setProductID() {
        let utils = this.utils.utilities;
        var resDoorObj = this.utils.resFlowSession.resDoorObj;
        var selectedClopayModelNumber = resDoorObj.construction.construction['ClopayModelNumber'];
        var modelBasedProductId = resDoorObj.product.product['item_id'];
        if (!resDoorObj.QPB) {
            if (selectedClopayModelNumber == "HDS" || selectedClopayModelNumber == "HDSL") {
                modelBasedProductId = '14'
            }
            else if (selectedClopayModelNumber == "HDB" || selectedClopayModelNumber == "HDB4" || selectedClopayModelNumber == "HDBL") {
                modelBasedProductId= '24'
            }

        }
        return modelBasedProductId;
    }


    errorMsg;
    nextBtn(path, warning?) {
        ga('send', { hitType: 'event', eventCategory: 'Click', eventAction: 'Construction ', eventLabel: 'gdoGoTo' });
        let resObj = this.utils.resFlowSession.resDoorObj;
        if (this.utils.resFlowSession.resDoorObj.product.product['item_id'] == 9) {
            this.utils.resFlowSession.resDoorObj.construction.vinyl = this.vinylOptions[+this.selectedVinyl];
            this.utils.resFlowSession.resDoorObj.construction.groove = this.grooves[+this.selectedGroove];
        }
        
        if (this.claddings && this.claddings.length > 1) {
            this.utils.resFlowSession.resDoorObj.construction.cladding = this.claddings[0];
        }

        if (resObj.product && resObj.product.product['item_id'] == 30 &&
            resObj.product.product['productline'] == 'speciality') {
            this.utils.resFlowSession.resDoorObj.construction.cladding = this.selectedCladding;
        }
        this.utils.resFlowSession.resDetails.color.claddingName = '';
        if (this.claddings && this.claddings.length > 1) {
            if (this.selectedCladding !== "-1") {
                this.utils.resFlowSession.resDoorObj.construction.cladding = this.claddings[+this.selectedCladding];
                this.utils.resFlowSession.resDetails.color.claddingName = this.claddings[+this.selectedCladding].item_name;
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
            if (this.utils.resFlowSession.resDoorObj.product.product['item_id'] == 16) {
                this.navComponent.clearDisabledSteps();
                this.navComponent.addDisabledStep(7);
                this.navComponent.addDisabledStep(8);
                this.route.navigateByUrl('config/hardware');
            } else {
                this.dataService.getTopSection(params).subscribe(res => {
                    this.dataStore.topSection = res;
                    this.utils.resFlowSession.resDoorObj.windows.apiData = res;
                    this.route.navigateByUrl('config/topSection');
                },
                    err => {
                        this.dataService.handleError();
                    });
            }
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
        this.utils.resFlowSession.resDoorObj.construction.vinyl = this.vinylOptions[+this.selectedVinyl];
        this.utils.resFlowSession.resDoorObj.construction.groove = this.grooves[+this.selectedGroove];
        this.app.updatePrice();
    }

    showcladding = false;
    colors = [];
    claddingUpdated() {
        var resObj = this.utils.resFlowSession.resDoorObj;
        if (this.selectedCladding && this.claddings[this.selectedCladding]) {
            let coloravailable = this.claddings[this.selectedCladding]['coloravailable'];
            let colors = this.colors;
            let colorsFiltered = [];
            let availablecolors = coloravailable.split(',');
            availablecolors = _.uniq(availablecolors);
            availablecolors.forEach(c => {
                let colorFilter = this.colors.filter(f => {
                    if (f.item_id == c) {
                        return true;
                    }
                    return false;
                });
                if (colorFilter.length > 0) {
                    colorsFiltered.push(colorFilter[0]);
                }
            });

            this.data = _.chunk(colorsFiltered, 6);
        }
    }
}
