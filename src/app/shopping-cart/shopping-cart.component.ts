import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";
import {Router} from '@angular/router';
import {NavService} from "../nav/nav-service";
import {AppUtilities} from "../shared/appUtilities";
import {CollectionData} from "../collection/collection-data";
declare var $:any;

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.less']
})
export class ShoppingCartComponent implements OnInit {
    pageNo;
    gdoOpenerTxt = this.utils.utilities.gdoOpenerText;
    gdoOpenerSelected = this.dataStore.gdoOpenerAccessories;
    itemPrice = this.utils.utilities.item_price;
    itmPrice = this.utils.utilities.itmPrice;
    openerType = this.utils.utilities.openerType;
    qty = this.utils.utilities.gdoOpenerQty;
    showDistancePrice = false;
    distance = this.utils.utilities.distance;
    distancePrice = this.utils.utilities.distancePrice;

    constructor(private appComp:AppComponent
        , private navComp:NavService
        , private utils:AppUtilities
        , private dataStore:CollectionData
        , private route:Router) {
    }

    ngOnInit() {
        this.navComp.activateIcon();
        this.pageNo = this.utils.utilities.currPage;
        this.appComp.currScreen = 0;
        this.distancePrice > 0 ? this.showDistancePrice = true : this.showDistancePrice = false;
    }

    removeItem() {
        this.utils.utilities.gdoOpenerText = null;
        this.dataStore.gdoOpenerAccessories = null;
        this.utils.utilities.item_price = null;
        this.utils.utilities.openerType = null;
        this.utils.utilities.gdoOpenerQty = null;
        this.utils.utilities.distance = null;
        this.utils.utilities.distancePrice = null;
        $('.shop-count').text('0');

        this.route.navigateByUrl('/category');

    }

    updateQuantity(flow) {
        if (flow === 1 && this.qty < 6) {
            this.qty++
        }
        else if (flow === 0 && this.qty > 1) {
            this.qty--;
        }
        this.itemPrice = this.itmPrice * this.qty;
        this.utils.utilities.item_price = this.itemPrice;
        this.utils.utilities.gdoOpenerQty = this.qty;
    }

}
