import {Component, OnInit, OnChanges} from '@angular/core';
import {AppComponent} from "../app.component";
import {AppUtilities} from "../shared/appUtilities";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {CollectionData} from "../collection/collection-data";

@Component({
    selector: 'app-gdo-config',
    templateUrl: './gdo-config.component.html',
    styleUrls: ['../config/config.component.less', '../details/details.component.less', './gdo-config.component.less']
})
export class GdoConfigComponent implements OnInit, OnChanges {

    constructor(private appComponent:AppComponent
        , private utils:AppUtilities
        , private dataStore:CollectionData) {
    }

    data;
    itemPrice;
    itmPrice; // this is for holding the single quantity price
    gdoBanner;
    quantity = 1;
    showDetails = true;
    visualizeHeader;
    calulateAmt;
    openerTxt = this.utils.utilities.item_name;
    detailObj = this.dataStore.zipResults;
    storeName= this.dataStore.store;

    ngOnChanges() {
        console.log('changed');
    }

    ngOnInit() {
        this.appComponent.currScreen = 3;
        this.calulateAmt = this.utils.utilities.gdoSingleDoor + this.utils.utilities.gdoDoubleDoor + this.utils.utilities.distance;
        this.itemPrice = this.utils.utilities.item_price + this.calulateAmt;
        this.itmPrice = this.utils.utilities.item_price;
        this.utils.utilities.itmPrice = this.itmPrice;
        this.gdoBanner = this.toPng(this.utils.utilities.gdoBanner);
        this.utils.utilities.gdoOpenerQty = this.quantity;
        this.visualizeHeader = this.utils.utilities.visualizeHeader;

        this.utils.utilities.directFlow === false ? this.showDetails = true : this.showDetails = false;

    }

    toPng(itm) {
        let t = itm.split('.')[0];
        return t + '.png';
    }


    singlep;
    doublep;
    milep;

    updateQuantity(flow) {
        // if (flow === 1 && this.quantity < 6) {
        //     this.quantity++
        // }
        // else if (flow === 0 && this.quantity > 1) {
        //     this.quantity--;
        // }
        // this.singlep === undefined ? this.singlep = 0 : this.singlep = this.singlep;
        // this.doublep === undefined ? this.doublep = 0 : this.doublep = this.doublep;
        // this.milep === undefined ? this.milep = 0 : this.milep = this.milep;

        // this.itemPrice = (this.utils.utilities.item_price * this.quantity) + this.singlep + this.doublep + this.milep;
        this.itemPrice = this.utils.updateQty(flow, this.utils.utilities.gdoOpenerQty);
        // this.itmPrice * this.quantity) +
        // (this.utils.utilities.gdoDoubleDoor + this.utils.utilities.gdoSingleDoor + this.utils.utilities.distancePrice);
        // this.utils.utilities.item_price = this.itemPrice;
        // this.utils.utilities.gdoOpenerQty = this.quantity;
        this.quantity = this.utils.utilities.gdoOpenerQty;
    }


}
