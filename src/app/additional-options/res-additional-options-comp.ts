import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from "../app.component";
import { AppUtilities } from "../shared/appUtilities";
import { NavService } from "../nav/nav-service";
import { NavComponent } from "../nav/nav.component";
import { CollectionData } from "../collection/collection-data";
import { CollectionService } from "../shared/data.service";
import { ConfigComponent } from "../config/config.component";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
declare var $: any;
declare var _: any;

@Component({
    selector: 'app-res-additional-options',
    templateUrl: './res-additional-options-comp.html',
    styleUrls: ['./additional-options.component.less']
})
export class ResAdditionalOptionsComponent implements OnInit {
    @ViewChild('gdoFlowManualDoor') gdoFlowManualDoor: ModalComponent;
    @ViewChild('gdoFlowPowerHead') gdoFlowPowerHead: ModalComponent;

    pageNo;
    showMenu;
    data;
    questions;
    gdoFlow = this.utils.utilities.isGDO;
    distance: any;
    distancePrice;
    showDistancePrice;
    directFlow = this.utils.utilities.directFlow;
    hidePrev = false;
    singleDrop = false;
    doubleDrop = false;
    gdoFlowManualDoorInfo = false;
    gdoFlowPowerHeadInfo = false;
    gdoOpenerSelected = this.dataStore.gdoOpenerAccessories;

    t = _.sumBy(this.gdoOpenerSelected, function (o) {
        return o.price * o.count
    });

    // for gdo the pageNo will be 3
    // for residential the pageNo will be

    constructor(private appComponent: AppComponent
        , private utils: AppUtilities
        , private route: Router
        , private navComp: NavService
        , private dataStore: CollectionData
        , private activeRoute: ActivatedRoute
        , private config:ConfigComponent
        , private navComponent: NavComponent
        , private dataService: CollectionService) {
    }


    setNavComponent() {
        this.navComponent.renderNav({
            flowType: 'res',
            flowActiveStep: 12,
            currentStepUrl: '/config/additionalOptions',
            showStepIndicator: true,
            nextStepFn: () => {

            }
        });

        this.config.pageTitle = '12. Additional Options';
    }


    ngOnInit() {
        this.appComponent.next = 'Next';
        this.pageNo = this.utils.utilities.currPage;
        this.setNavComponent();
    }

    nextBtn(path) {
        this.route.navigateByUrl('/config/doorConfiguration');
    }

    prevBtn(path) {
        
    }
 

    flow = 'res';

    singleOpener = 0;
    doubleOpener = 0;
    mileOpenPr = 0;
    qty = this.utils.utilities.gdoOpenerQty;

     

    showManual(itm) {
        if (itm.srcElement.checked === true) {
            this.gdoFlowManualDoorInfo = false;

        } else {
            this.gdoFlowManualDoorInfo = true;
        }
    }

    showPowerHead(itm) {
        if (itm.srcElement.checked === true) {
            this.gdoFlowPowerHeadInfo = false;
        } else {

            this.gdoFlowPowerHeadInfo = true;
        }
    }

    directDoorVal = 1;

    directDoor(event, flow) {
        let val = +event.target.value;
        this.directDoorVal = +event.target.value;
        let k = flow;
        if (flow === 0) {
            this.singleOpener = 0;
            this.singleOpener = 50 * (val);
            k = {
                name: "Single Door New Opener Installation Kit. This is required when no Opener is currently installed on door less than 10' wide.",
                price: this.singleOpener,
                id: 0,
                count: val //=== 1 ? val = 1 : val - 1
            };
            this.utils.utilities.gdoSingleDoor = k.price;
            this.utils.utilities.singlep = 0;
        } else {
            this.doubleOpener = 0;
            this.doubleOpener = 65 * (val);
            k = {
                name: "Double Door New Opener Installation Kit. This is required when no Opener is currently installed on door less than 10' wide.",
                price: this.doubleOpener,
                id: 1,
                count: val //=== 1 ? val = 1 : val - 1
            };
            this.utils.utilities.gdoDoubleDoor = k.price;
            this.utils.utilities.doublep = 0;
        }
        // this.gdoConfig.itemPrice += k.price;
        // this.dataStore.gdoDirectQuestions.splice(flow, 1);
        this.dataStore.gdoDirectQuestions = this.dataStore.gdoDirectQuestions.filter(function (el) {
            return el.id != flow;
        });
        this.dataStore.gdoDirectQuestions.push(k);
        let kPrice = _.sumBy(this.dataStore.gdoDirectQuestions, function (o) {
            return o.price;
        });
        this.utils.utilities.kPrice = kPrice;
    }

    removeItm(flow) {
        // flow = 0 ? this.utils.utilities.singlep = 0 : this.utils.utilities.doublep = 0;
        this.dataStore.gdoDirectQuestions = this.dataStore.gdoDirectQuestions.filter(function (el) {
            return el.id != flow;
        });
        this.utils.utilities.doublep = 0;
        this.utils.utilities.singlep = 0;
        let kPrice = _.sumBy(this.dataStore.gdoDirectQuestions, function (o) {
            return o.price;
        });
        return kPrice;
    }

    singleDropVal;
    doubleDropVal;


    globalPrice = 0;


    updateDistance(itm, flow) {
        this.utils.utilities.distance = +itm.target.value;

        let miles = +itm.target.value;
        if (flow === 'direct') {
            let k = miles - 31;
            if (k >= 0) {
                this.distancePrice = (k * 2.50) + 2.50;
                // this.mileOpenPr = this.distancePrice;
            }
            else {
                this.distancePrice = 0;
            }

            // this.gdoConfig.itemPrice = this.calculateTotalPrice(this.utils.utilities.item_price, this.singleOpener, this.doubleOpener, this.mileOpenPr, this.qty);
        } else {
            let k = miles - 50;

            if (k >= 0) {
                this.distancePrice = (k * 3) + 51;
                // this.mileOpenPr = this.distancePrice;
            } else {
                this.distancePrice = 0;
                // this.mileOpenPr = this.distancePrice;
            }

        }
        this.mileOpenPr = this.distancePrice;
        this.utils.utilities.distancePrice = this.distancePrice;
    }

}
