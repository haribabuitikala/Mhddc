import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {AppComponent} from "../app.component";
import {Router} from '@angular/router';
import {NavService} from "../nav/nav-service";
import {AppUtilities} from "../shared/appUtilities";
import {CollectionData} from "../collection/collection-data";
declare var $:any;
declare var _:any;

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.less']
})
export class ShoppingCartComponent implements OnInit {
    @ViewChild('continue') continue:ModalComponent;
    pageNo;
    gdoOpenerTxt = this.utils.utilities.gdoOpenerText;
    gdoOpenerSelected = this.dataStore.gdoOpenerAccessories;
    openerType = this.utils.utilities.openerType;
    qty = this.utils.utilities.gdoOpenerQty;
    showDistancePrice = false;
    distance = this.utils.utilities.distance;
    distancePrice = this.utils.utilities.distancePrice;
    accessories;
    showDirect;
    directItm = this.dataStore.gdoDirectQuestions;

    itemPrice = this.utils.calculateTotalPrice();
    itmPrice = this.utils.utilities.itmPrice;
    baseItmPrice = this.utils.utilities.item_price * this.utils.utilities.gdoOpenerQty;

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
        this.gdoOpenerSelected.length ? this.accessories = true : this.accessories = false;
        let directObj = Object.keys(this.directItm);
        this.showDirect = this.utils.utilities.directFlow;
    }

    removeItem() {
        this.utils.utilities.gdoOpenerText = '';
        this.utils.utilities.item_price = 0;
        this.utils.utilities.openerType = null;
        this.utils.utilities.gdoOpenerQty = 1;
        this.utils.utilities.distance = 0;
        this.utils.utilities.distancePrice = 0;
        $('.shop-count').text('0');
        this.dataStore.gdoOpenerAccessories = [];
        this.dataStore.gdoDirectQuestions = [];
        this.continue.close();

        this.route.navigateByUrl('/category');

    }

    updateQuantity(flow) {
        this.itemPrice = this.utils.updateQty(flow, this.utils.utilities.gdoOpenerQty);
        this.qty = this.utils.utilities.gdoOpenerQty;
        this.baseItmPrice = this.utils.utilities.item_price * this.utils.utilities.gdoOpenerQty;
    }

}
