import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { CollectionData } from "../collection/collection-data";
import { ConfigComponent } from "../config/config.component";
import { NavComponent } from "../nav/nav.component";
import { AppUtilities } from "../shared/appUtilities";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { CollectionService } from "../shared/data.service";

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
        , private navComponent: NavComponent
        , private dataService: CollectionService) {

    }

    number: number = 6;
    folder = 'construction';
    category = 'colors';
    data;
    showUpsell: boolean = false;
    upSellData;
    upSellShowCollection = [11, 12, 13, 14, 24, 170];
    upSellImage;
    loaded = false;
    className = '';
    isCoreAssortment = true;

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

    resetConstruction() {
        this.utils.resFlowSession.resDoorObj.resetconstruction();
        this.utils.resFlowSession.resDoorObj.construction.construction = this.utils.resFlowSession.resDoorObj.design.dsgn["constructions"][0];
        this.utils.resFlowSession.resDoorObj.construction.apiData = this.utils.resFlowSession.resDoorObj.design.dsgn["constructions"];
    }

    startProcess() {
        // let res = this.dataStore.constructions;
        let res = this.utils.resFlowSession.resDoorObj.construction.apiData;
        // this is for loading construction name in details popup
        this.config.details.constructionName = res[0]['item_name'];
        let newData = [];
        if (res.length > 4) {
            if (newData.length <= 3) {
                for (let i = 1; i <= 4; i++) {
                    newData.push(_.find(res, ['best_order', i]))
                }
                let t = {
                    item_thumbnail: 'btnOtherConGallery.png',
                    action: 'add',
                    clickAction: () => {
                        this.data.length = 0;
                        this.data = _.chunk(res, 2);
                        this.isCoreAssortment = false;
                    }
                }
                newData.push(t)
                this.data = _.chunk(newData, 2)
            }
        } else {
            this.data = _.chunk(res, 2);

            // for (var i = 0; i < this.data.length; i++) {
            //     res[i]['itemClick'] = function() {
            //         console.log('hi')
            //     }
            // }
        }

        this.utils.resFlowSession.resDoorObj.construction.construction = res[0];

        this.loaded = true;
    }


    nextBtn(path, upsellModal) {
        // if (this.utils.resFlowSession.collection.selectedCollection.item_id == 11 || 12 || 13 || 170) {
        //     upsellModal.open();
        // } else {
        //     this.route.navigateByUrl(path);
        // }
        // windcode: this.utils.utilities.winCode,

        let params = {
            "NatMarketID": this.utils.utilities.natmarketid,
            "model": this.utils.resFlowSession.resDoorObj.construction.construction['ClopayModelNumber'],//"HDB",//
            "dheightFt": this.utils.utilities.hf,
            "dheightIn": this.utils.utilities.hi,
            "dwidthFt": this.utils.utilities.wf,
            "dwidthIn": this.utils.utilities.wi,
            "dtype": this.utils.utilities.dtype,
            "windcode": this.utils.utilities.winCode,
            "isCoreAssortment": this.isCoreAssortment
        }
        if (_.includes(this.upSellShowCollection, this.utils.resFlowSession.resDoorObj.product.product['item_id']) && this.utils.resFlow.isUpsellSet) {
            this.upSellImage = this.utils.resFlowSession.resDoorObj.construction.construction['item_thumbnail'];
            this.dataService.getUpsellData(params)
                .subscribe(
                res => {
                    console.log('updell length ', res);
                    if (res.length > 0) {
                        this.upSellData = res;
                        upsellModal.open();
                    } else {
                        this.route.navigateByUrl(path);
                    }
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
        this.upsell.close();
        this.route.navigateByUrl('config/color');
        // this.goToHome(this.selected);
        
    }

    getModelPriceUpsell(updata) {
        var currentConstruction = this.utils.resFlowSession.resDoorObj.construction.construction;
        var filtermodel = window['cObj'].construction.apiData.filter(c => { console.log(c.design_id, c.id); return c.XMLCOI == updata.upgrade_model; });
        if (filtermodel.length > 0) {
            filtermodel = filtermodel[0];
            return (filtermodel.item_price - ((15 * filtermodel.item_price) / 100)) - (currentConstruction['item_price'] - ((15 * currentConstruction['item_price']) / 100));
        }
        return 0;
    }

    updateWithUpsellPrice(data){
        this.utils.resFlowSession.resDetails.upsellPrice = this.getModelPriceUpsell(data);
        this.config.calculatePrice();
        this.moveNext();
    }

}
