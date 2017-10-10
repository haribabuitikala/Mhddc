import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { CollectionData } from "../collection/collection-data";
import { ConfigComponent } from "../config/config.component";
import { NavComponent } from "../nav/nav.component";
import { AppUtilities } from "../shared/appUtilities";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { CollectionService } from "../shared/data.service";

declare var _: any;
declare var ga:Function;
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
        , private navComponent: NavComponent
        , private dataService: CollectionService) {

    }

    number: number = 6;
    folder = 'construction';
    category = 'colors';
    data;
    showUpsell: boolean = false;
    upSellData;
    currentModel;
    currentModelName;
    upSellShowCollection = [11, 12, 13, 14, 24, 170];
    upSellImage;
    loaded = false;
    className = '';
    isCoreAssortment = false;

    @ViewChild('upsell') upsell: ModalComponent;

    ngOnInit() {
        this.resetConstruction();
        this.startProcess();
        if (this.navComponent.flowType === 'res') {
            this.navComponent.renderNav({
                flowType: 'res',
                flowActiveStep: 5,
                currentStepUrl: '/config/construction',
                showStepIndicator: true,
                pageTitle: 'Choose Your Construction',
                nextStepFn: () => {

                }
            });

        } else {
            this.navComponent.renderNav({
                flowType: 'resquick',
                flowActiveStep: 4,
                currentStepUrl: '/config/construction',
                showStepIndicator: true,
                pageTitle: 'Choose Your Construction',
                nextStepFn: () => {

                }
            });
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

    resetConstruction() {
        this.utils.resFlowSession.resDoorObj.resetconstruction();
        this.utils.resFlowSession.resDoorObj.construction.construction = this.utils.resFlowSession.resDoorObj.design.dsgn["constructions"][0];
        this.utils.resFlowSession.resDoorObj.construction.apiData = this.utils.resFlowSession.resDoorObj.design.dsgn["constructions"];
    }

    startProcess() {

        // setting the details info
        this.config.detailsInfo = {
            construction: true,
            baseName: false,
            overlayName: false,
            topSection: false,
            Hardware: false,
            color: false,
            overlayColor: false,
            glassType: false,
            Opener: false
        }

        // let res = this.dataStore.constructions;
        let res = this.utils.resFlowSession.resDoorObj.construction.apiData;
        // this is for loading construction name in details popup
        this.config.details.constructionName = res[0]['item_name'];
        let newData = [];
        if (res.length > 4) {
            this.isCoreAssortment = true;
            
            if (newData.length <= 3) {              
                let defaultindex = 0;
                for (let i = 1; i <= 4; i++) {
                    let y = _.find(res, ['best_order', i]);
                    if (y) {
                        newData.push(y);
                    } else {
                        let g = _.filter(res, function (r) {
                            return r.best_order == 0;
                        });
                        if (g.length > 0) {
                            newData.push(g[defaultindex]);
                            defaultindex = defaultindex + 1;
                        }
                    }
                }
                let t = {
                    item_thumbnail: 'btnOtherConGallery.png',
                    action: 'add',
                    clickAction: () => {
                        ga('send', { hitType: 'event', eventCategory: 'Click', eventAction: 'ConstructionScreen-OtherOptions-GD', eventLabel: 'Other Construction' }); 
                        this.data.length = 0;
                        this.data = _.chunk(res, 2);
                        this.isCoreAssortment = false;
                    }
                }
                newData.push(t)
                this.data = _.chunk(newData, 2)
            }
        } else {
        //for modern steel
            if(this.utils.resFlowSession.resDetails.collectionName === "Modern Steel Collection" && res.length === 4 )
            {   
                this.isCoreAssortment = true;                    
                let defaultindex = 0;
                res = this.arraymove(res,3,2);
                for (let i = 1; i <= 3; i++) {
                    let y = _.find(res, ['best_order', i]);
                    if (y) {
                        newData.push(y);
                    } else {
                        let g = _.filter(res, function (r) {
                            return r.best_order == 0;
                        });
                        if (g.length > 0) {
                            newData.push(g[defaultindex]);
                            defaultindex = defaultindex + 1;
                        }
                    }
                }
                let t = {
                    item_thumbnail: 'btnOtherConGallery.png',
                    action: 'add',
                    clickAction: () => {
                        ga('send', { hitType: 'event', eventCategory: 'Click', eventAction: 'ConstructionScreen-OtherOptions-GD', eventLabel: 'Other Construction' }); 
                        this.data.length = 0;
                        this.data = _.chunk(res, 2);
                        this.isCoreAssortment = false;
                    }
                }
                newData.push(t)
                this.data = _.chunk(newData, 2);            
            }
            else
            {
              this.data = _.chunk(res, 2);
            }                  
        }

        this.utils.resFlowSession.resDoorObj.construction.construction = res[0];
        this.loaded = true;
    }



arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
    return arr;
}

    nextBtn(path, upsellModal) {
          ga('send', { hitType: 'event', eventCategory: 'Click', eventAction:'NextStep-Construction-GD', eventLabel: 'nextBtn' }); 
        let coreAssortment = this.isCoreAssortment;
        if (this.utils.resFlowSession.resDoorObj.product.product['item_id'] == '11') {
            coreAssortment = false;
        }
        let params = {
            "NatMarketID": this.utils.utilities.natmarketid,
            "model": this.utils.resFlowSession.resDoorObj.construction.construction['ClopayModelNumber'],//"HDB",//
            "dheightFt": this.utils.utilities.hf,
            "dheightIn": this.utils.utilities.hi,
            "dwidthFt": this.utils.utilities.wf,
            "dwidthIn": this.utils.utilities.wi,
            "dtype": this.utils.utilities.dtype,
            "windcode": this.utils.utilities.winCode,
            "isCoreAssortment": coreAssortment
        }
        if (_.includes(this.upSellShowCollection, this.utils.resFlowSession.resDoorObj.product.product['item_id']) && this.utils.resFlow.isUpsellSet) {
            this.upSellImage = this.utils.resFlowSession.resDoorObj.construction.construction['item_thumbnail'];
            this.dataService.getUpsellData(params)
                .subscribe(
                res => {
                    console.log('updell length ', res);
                    if (res.length > 0) {
                        this.upSellData = res;                       
                        this.currentModelName = this.getDisplayModelNumber(this.upSellData[0].current_model);
                        this.currentModel = 'upsell-' + this.currentModelName + '-1.png';
                        upsellModal.open();
                    } else {
                        this.route.navigateByUrl(path);
                    }
                },
                err => {
                    this.dataService.handleError();
                });

            console.log(this.upSellData);
        } else {
            this.route.navigateByUrl(path);
        }

    }

    prevBtn() {
        this.utils.resFlowSession.resDoorObj.resetFromStep(3);
        this.route.navigateByUrl('/config/design');
    }

    moveNext() {
        ga('send', { hitType: 'event', eventCategory: 'Click', eventAction:'ProactiveUpsell-NoThanks-Continue', eventLabel: 'nextBtn' }); 
        this.upsell.close();
        this.route.navigateByUrl('config/color');
    }

    getModelPriceUpsell(updata) {
        var currentConstruction = this.utils.resFlowSession.resDoorObj.construction.construction;
        var filtermodel = window['cObj'].construction.apiData.filter(c => { return c.ClopayModelNumber == updata.upgrade_model; });
        if (filtermodel.length > 0) {
            filtermodel = filtermodel[0];
            return (filtermodel.item_price - currentConstruction['item_price']);
        }
        return 0;
    }

    updateWithUpsellPrice(data) {  
        ga('send', { hitType: 'event', eventCategory: 'Click', eventAction:'ProactiveUpsell-Upgrade'+data.upgrade_model, eventLabel: 'updateWithUpsellPrice' });    
        var filtermodel = window['cObj'].construction.apiData.filter(c => { return c.ClopayModelNumber == data.upgrade_model; });
        if (filtermodel.length > 0) {
            filtermodel = filtermodel[0];
            this.utils.resFlowSession.resDoorObj.construction.construction = filtermodel;
        }
        this.config.calculatePrice();
        this.moveNext();
    }
    getDisplayModelNumber(clopayNumber) {
        var filterItem = window['cObj'].design.dsgn.constructions.filter(c => { return c.ClopayModelNumber == clopayNumber });
        filterItem = filterItem[0];
        return filterItem.DisplayModelNumber;
    }

}
