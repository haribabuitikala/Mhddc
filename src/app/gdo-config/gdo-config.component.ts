import { Component, OnInit, OnChanges } from '@angular/core';
import { AppComponent } from "../app.component";
import { AppUtilities } from "../shared/appUtilities";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { CollectionData } from "../collection/collection-data";
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-gdo-config',
    templateUrl: './gdo-config.component.html',
    styleUrls: ['../config/config.component.less', '../details/details.component.less', './gdo-config.component.less']
})
export class GdoConfigComponent implements OnInit, OnChanges {

    constructor(private appComponent: AppComponent
        , private utils: AppUtilities
        , private router: Router
        , private dataStore: CollectionData) {
        router.events.subscribe(s => {
            if (s instanceof NavigationEnd) {
            }
        })
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
    storeName = this.dataStore.store;

    gdoOpenerSelected = this.dataStore.gdoOpenerAccessories;
    gdoOpeners = [];
    gdoOpenersTxt = 'teststes';
    gdoLoaded = false;
    showDistance;
    distancePrice;
    distance;

    ngOnChanges() {
        console.log('changed', this.showDetails);
    }

    ngOnInit() {

        this.appComponent.currScreen = 3;
        this.calulateAmt = this.utils.utilities.gdoSingleDoor + this.utils.utilities.gdoDoubleDoor + this.utils.utilities.distance;
        this.itemPrice = this.utils.utilities.item_price + this.calulateAmt;
        this.itmPrice = this.utils.utilities.item_price;
        this.utils.utilities.itmPrice = this.itmPrice;
        if (this.utils.utilities.directFlow === false)
            this.gdoBanner = this.toPng(this.utils.utilities.gdoBanner);
        this.utils.utilities.gdoOpenerQty = this.quantity;
        this.visualizeHeader = this.utils.utilities.visualizeHeader;

        this.utils.utilities.directFlow === false ? this.showDetails = true : this.showDetails = false;
        console.log('showDetails ', this.showDetails);
        var opnerAddedString = '';
        this.gdoOpenerSelected.forEach((gdoItem) => {
            var addedItems = this.gdoOpeners.filter(g => { return g.name === gdoItem.name; });
            if (addedItems.length > 0) {
                if (addedItems[0].count < gdoItem.count) {
                    addedItems[0].count = gdoItem.count;
                }
                if (addedItems[0].totalPrice < gdoItem.totalPrice) {
                    addedItems[0].totalPrice = gdoItem.totalPrice;
                }
            } else {
                this.gdoOpeners.push(gdoItem);
            }
        });
        var strtt = [];
        this.gdoOpeners.forEach(g => {
            console.log('gdo ', g);
            strtt.push(` ${g.count} - ${g.name} (${g.price} each)`);
        });

        this.gdoOpenersTxt = strtt.join('');
        this.gdoLoaded = true;
		//$('body').removeClass('loader');
    }

    toPng(itm) {
        let t = itm.split('.')[0];
        return t + '.png';
    }

    openShowDetailsmodal(showDetails) {
        var opnerAddedString = '';
        this.gdoOpenerSelected = this.dataStore.gdoOpenerAccessories;
        this.gdoOpenerSelected.forEach((gdoItem) => {
            var addedItems = this.gdoOpeners.filter(g => { return g.name === gdoItem.name; });
            if (addedItems.length > 0) {
                if (addedItems[0].count < gdoItem.count) {
                    addedItems[0].count = gdoItem.count;
                }
                if (addedItems[0].totalPrice < gdoItem.totalPrice) {
                    addedItems[0].totalPrice = gdoItem.totalPrice;
                }
            } else {
                this.gdoOpeners.push(gdoItem);
            }
        });
        this.dataStore.gdoOpenerAccessories = this.gdoOpeners;
        showDetails.open()
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
