import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AppComponent} from "../app.component";
import {AppUtilities} from "../shared/appUtilities";
import {NavService} from "../nav/nav-service";
import {CollectionData} from "../collection/collection-data";
import {CollectionService} from "../shared/data.service";
import {GdoConfigComponent} from "../gdo-config/gdo-config.component";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
declare var $: any;
declare var _: any;

@Component({
    selector: 'app-additional-options',
    templateUrl: './additional-options.component.html',
    styleUrls: ['./additional-options.component.less']
})
export class AdditionalOptionsComponent implements OnInit {
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
        , private dataService: CollectionService
        , private gdoConfig: GdoConfigComponent) {
    }

    ngOnInit() {
        this.appComponent.next = 'Next';
        this.pageNo = this.utils.utilities.currPage;
        this.showMenu = this.utils.utilities.showNav;
        this.navComp.activateIcon();
        if (this.utils.utilities.directFlow) {
            this.data = this.dataStore.gdoAdditionalDirect;
            this.gdoConfig.itemPrice = this.data.item_price;
            this.gdoConfig.itmPrice = this.data.item_price;
            this.utils.utilities.item_price = this.data.item_price;
            this.utils.utilities.itmPrice = this.data.item_price;
            $('.inner-router').css({'margin-top': 0});
            $('.showDetails').hide();

        } else {
            this.gdoConfig.itemPrice = this.utils.calculateTotalPrice();
            $('.showDetails').hide();
        }

    }

    nextBtn(path) {
        if (this.utils.utilities.flow === 'gdoNavElems') {
            this.utils.setUtils(4, 1);
            this.goTo('/gdoConfig' + path)
        } else {
            this.goTo('/config' + path)
        }
    }

    prevBtn(path) {
        if (this.utils.utilities.flow === 'gdoNavElems') {
            this.utils.setUtils(2, 0);
            this.goTo('/gdoConfig' + path);
        } else {
            this.goTo('/config' + path)
        }
    }

    goTo(path) {
        this.route.navigateByUrl(path)
    }

    flow = 'non-direct';

    showDistance(itm, flow) {

        if (itm.srcElement.checked === false) {
            this.distance = 31;
            this.utils.utilities.distance = 31;
            if (flow === 'direct') {
                this.flow = 'direct';
                this.utils.utilities.distancePrice = 2.5;
                this.distancePrice = 2.5;
                // this.gdoConfig.itemPrice = this.gdoConfig.itemPrice + 2.50;
            }
            else {
                this.flow = 'non-direct';
                this.utils.utilities.distancePrice = 51;
                this.distancePrice = 51;
                // this.gdoConfig.itemPrice = this.gdoConfig.itemPrice + 51;
            }
            $('.gdoDistance').removeAttr('disabled');
            this.showDistancePrice = false;
        } else {
            this.distance = '';
            this.utils.utilities.distancePrice = 0;
            this.showDistancePrice = false;
            this.mileOpenPr = 0;
            $('.gdoDistance').prop('disabled', 'disabled');
        }
        this.gdoConfig.itemPrice = this.utils.calculateTotalPrice(); //this.calculateTotalPrice(this.utils.utilities.item_price, this.singleOpener, this.doubleOpener, this.mileOpenPr, this.qty);
    }

    singleOpener = 0;
    doubleOpener = 0;
    mileOpenPr = 0;
    qty = this.utils.utilities.gdoOpenerQty;

    showSingle(itm) {
        if (itm.srcElement.checked === true) {
            this.singleDrop = true;
            this.singleOpener = 50;
            this.gdoConfig.itemPrice = this.calculateTotalPrice(this.utils.utilities.item_price, this.singleOpener, this.doubleOpener, this.mileOpenPr, this.qty);
        } else {
            this.singleDrop = false;
            this.singleOpener = 0;
            this.gdoConfig.itemPrice = this.calculateTotalPrice(this.utils.utilities.item_price, this.singleOpener, this.doubleOpener, this.mileOpenPr, this.qty);
        }
    }

    showDouble(itm) {
        if (itm.srcElement.checked === true) {
            this.doubleDrop = true;
            this.doubleOpener = 65;
            this.gdoConfig.itemPrice = this.calculateTotalPrice(this.utils.utilities.item_price, this.singleOpener, this.doubleOpener, this.mileOpenPr, 1);
        } else {
            this.doubleDrop = false;
            this.doubleOpener = 0;
            this.gdoConfig.itemPrice = this.calculateTotalPrice(this.utils.utilities.item_price, this.singleOpener, this.doubleOpener, this.mileOpenPr, 1);
        }
    }
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
                count: val //=== 1 ? val = 1 : val - 1
            };
            this.utils.utilities.gdoSingleDoor = k.price;
        } else {
            this.doubleOpener = 0;
            this.doubleOpener = 65 * (val);
            k = {
                name: "Double Door New Opener Installation Kit. This is required when no Opener is currently installed on door less than 10' wide.",
                price: this.doubleOpener,
                count: val //=== 1 ? val = 1 : val - 1
            };
            this.utils.utilities.gdoDoubleDoor = k.price;
        }
        // this.gdoConfig.itemPrice += k.price;
        this.dataStore.gdoDirectQuestions.splice(flow, 1);
        this.dataStore.gdoDirectQuestions.push(k);
        let kPrice = _.sumBy(this.dataStore.gdoDirectQuestions, function (o) {
            return o.price;
        });
        this.utils.utilities.kPrice = kPrice;
        this.gdoConfig.itemPrice = this.calculateTotalPrice(this.utils.utilities.item_price, this.singleOpener, this.doubleOpener, this.mileOpenPr, 1);
        // this.localPrice = this.gdoConfig.itemPrice + kPrice;
    }

    singleDropVal;
    doubleDropVal;


    globalPrice = 0;

    calculateTotalPrice(basep, singlep, doublep, milep, qty) {
        this.gdoConfig.singlep = singlep;
        this.gdoConfig.doublep = doublep;
        this.gdoConfig.milep = milep;
        return ((basep * this.utils.utilities.gdoOpenerQty) + singlep + doublep + milep);
    }

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
        this.gdoConfig.itemPrice = this.utils.calculateTotalPrice();
    }

}
