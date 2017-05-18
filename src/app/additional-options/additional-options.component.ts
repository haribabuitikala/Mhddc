import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppComponent} from "../app.component";
import {AppUtilities} from "../shared/appUtilities";
import {NavService} from "../nav/nav-service";
import {CollectionData} from "../collection/collection-data";
import {CollectionService} from "../shared/data.service";
import {GdoConfigComponent} from "../gdo-config/gdo-config.component";

declare var _:any;

@Component({
    selector: 'app-additional-options',
    templateUrl: './additional-options.component.html',
    styleUrls: ['./additional-options.component.less']
})
export class AdditionalOptionsComponent implements OnInit {
    pageNo;
    showMenu;
    data;
    questions;
    gdoFlow = this.utils.utilities.isGDO;
    distance:any;
    distancePrice;
    showDistancePrice;
    directFlow = this.utils.utilities.directFlow;
    singleDrop = false;
    doubleDrop = false;
    gdoOpenerSelected = this.dataStore.gdoOpenerAccessories;

    t = _.sumBy(this.gdoOpenerSelected, function(o){ return o.price * o.count });

    // for gdo the pageNo will be 3
    // for residential the pageNo will be

    constructor(private appComponent:AppComponent
        , private utils:AppUtilities
        , private route:Router
        , private navComp:NavService
        , private dataStore:CollectionData
        , private dataService:CollectionService
        , private gdoConfig:GdoConfigComponent) {
    }

    ngOnInit() {
        this.appComponent.next = 'Next';
        this.pageNo = this.utils.utilities.currPage;
        this.showMenu = this.utils.utilities.showNav;
        this.navComp.activateIcon();
        if(this.utils.utilities.directFlow) {
            this.data = this.dataStore.gdoAdditionalDirect;
            this.gdoConfig.itemPrice = this.data.item_price;
            this.gdoConfig.itmPrice = this.data.item_price;
            this.utils.utilities.item_price = this.data.item_price;
            this.utils.utilities.itmPrice = this.data.item_price;
        } else {
            this.gdoConfig.itemPrice = this.utils.utilities.item_price + this.utils.utilities.distancePrice + this.t;
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

    showDistance(itm, flow) {
        if (itm.srcElement.checked === false) {
            this.distance = 31;
            this.utils.utilities.distance = 31;
            if (flow === 'direct') {
                this.utils.utilities.distancePrice = 2.5;
                this.distancePrice = 2.5;
            }
            else {
                this.utils.utilities.distancePrice = 51;
                this.distancePrice = 51;
            }
            this.showDistancePrice = false;
        } else {
            this.distance = '';
            this.showDistancePrice = false;
        }
    }

    showSingle(itm) {
        if (itm.srcElement.checked === true) {
            this.singleDrop = true;
        } else {
            this.singleDrop = false;
        }
    }

    showDouble(itm) {
        if (itm.srcElement.checked === true) {
            this.doubleDrop = true;
        } else {
            this.doubleDrop = false;
        }
    }

    directDoor(event, flow) {
        let val = +event.target.value;
        let k = flow;
        if (flow === 0) {
            k = {
                name: "Single Door New Opener Installation Kit. This is required when no Opener is currently installed on door less than 10' wide.",
                price: 50 * val,
                count: val
            };
            this.utils.utilities.gdoSingleDoor = k.price;
        } else {
            k = {
                name: "Double Door New Opener Installation Kit. This is required when no Opener is currently installed on door less than 10' wide.",
                price: 65 * val,
                count: val
            };
            this.utils.utilities.gdoDoubleDoor = k.price;
        }
        this.gdoConfig.itemPrice += k.price;
        this.dataStore.gdoDirectQuestions.splice(flow, 1);
        this.dataStore.gdoDirectQuestions.push(k);
    }

    updateDistance(itm, flow) {
        this.utils.utilities.distance = +itm.target.value;
        let miles = +itm.target.value;
        if (flow === 'direct') {
            if (miles >= 31) {
                let k = miles - 31;
                k === 0 ? this.distancePrice = 2.5 : this.distancePrice = (k * 2.50) + 2.50;
                this.gdoConfig.itemPrice += this.distancePrice +this.t;
            }
        } else {
            if (miles >= 51) {
                let k = miles - 50;
                k === 0 ? this.distancePrice = 50 : this.distancePrice = (k * 3) + 50;
                this.gdoConfig.itemPrice += this.distancePrice +this.t;
            }
            this.utils.utilities.distancePrice = this.distancePrice + this.t;
        }
        this.utils.utilities.distancePrice = this.distancePrice;
    }

}
