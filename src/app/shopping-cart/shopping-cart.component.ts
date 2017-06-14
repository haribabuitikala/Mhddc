import {Component, OnInit, ViewChild, Directive} from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {AppComponent} from "../app.component";
import {Router} from '@angular/router';
import {NavService} from "../nav/nav-service";
import {NavComponent} from "../nav/nav.component";
import {AppUtilities} from "../shared/appUtilities";
import {CollectionData} from "../collection/collection-data";

declare var $: any;
declare var _: any;

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.less', '../install//install.component.less']
})
export class ShoppingCartComponent implements OnInit {
    @ViewChild('continue') continue: ModalComponent;
    @ViewChild('resShoppingCartTerms') resShoppingCartTerms: ModalComponent;
    @ViewChild('gdoShoppingCartTerms') gdoShoppingCartTerms: ModalComponent;
    @ViewChild('secureRedirectionTerms') secureRedirectionTerms: ModalComponent;
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

    itemPrice = 0;
    itmPrice = this.utils.utilities.itmPrice;
    baseItmPrice = this.utils.utilities.item_price * this.utils.utilities.gdoOpenerQty;
    data;
    resFlow;
    resFlowSession;
    isGdo;

    constructor(private appComp: AppComponent
        , private navComp: NavService
        , private utils: AppUtilities
        , private navComponent: NavComponent
        , private dataStore: CollectionData
        , private route: Router) {
    }

    ngOnInit() {
        this.navComp.activateIcon();
        this.utils.resFlowSession.resDoorObj.TYPE === 'GDO' ? this.resFlow = false : this.resFlow = true;
        if (this.resFlow) {
            this.qty = 1;
            this.itemPrice = this.getResPrice()
        }

        this.pageNo = this.utils.utilities.currPage;
        this.appComp.currScreen = 0;
        this.distancePrice > 0 ? this.showDistancePrice = true : this.showDistancePrice = false;
        this.gdoOpenerSelected.length ? this.accessories = true : this.accessories = false;
        let directObj = Object.keys(this.directItm);
        this.showDirect = this.utils.utilities.directFlow;

        this.navComponent.renderNav({
            flowType: 'gdo',
            flowActiveStep: -1,
            showStepIndicator: false,
            resetNav: true
        });
        $('body').removeClass('loader');
        this.resFlowSession = this.utils.resFlowSession;
        if(this.utils.resFlowSession.resDoorObj.TYPE !== 'RES') {
            this.itemPrice = this.utils.calculateTotalPrice();
            this.isGdo = true;
        } else {
            this.getTotalCartValue();
        }
    }

    getTotalCartValue() {
        let k = 0;
        this.resFlowSession.cart.forEach(function(i) {
            k = k + i.totalPrice;
        });
        this.itemPrice = k;
    }
    
    getResPrice() {
        return this.utils.resFlowSession.resDoorObj.INSTALLTYPE === "Installed" ? this.utils.utilities.itemPriceInstall : this.utils.utilities.itemPriceDY;
    }

    AddAnother() {
        this.utils.resFlowSession.resDoorObj.resetsize();
        this.navComponent.setNavFlow('res');
        this.utils.resFlowSession.resDoorObj.INSTALLTYPE = "Installed";
        this.utils.resFlowSession.resDoorObj.TYPE = "RES";
        this.route.navigateByUrl('/doorSize');
    }

    removeItem(item, index) {        
        this.resFlowSession.cart.splice(index, 1);
        this.utils.resFlowSession.cart = this.resFlowSession.cart;
        $('.shop-count').text(this.resFlowSession.cart.length);
        this.getTotalCartValue();
    }

    updateQuantity(flow) {
        if (this.resFlow) {
            this.utils.resFlowSession.resCalculatePrice();
            this.itemPrice = this.getResPrice();
            this.qty = this.utils.resFlowSession.resDoorObj.QTY;
        } else {
            this.itemPrice = this.utils.updateQty(flow, this.utils.utilities.gdoOpenerQty);
            this.baseItmPrice = this.utils.utilities.item_price * this.utils.utilities.gdoOpenerQty;
            // this.baseItmPrice = flow === 1 ? this.utils.updateQty(1, this.utils.utilities.gdoOpenerQty) : this.utils.updateQty(0, this.utils.utilities.gdoOpenerQty);
            this.qty = this.utils.utilities.gdoOpenerQty;
        }
    }

    updateQty(item, index, increment?) {
        if(increment) {
            if(item.construction.qty !== 6)
                item.construction.qty = item.construction.qty + 1;
        } else {
            if(item.construction.qty !== 1)
                item.construction.qty = item.construction.qty - 1;
        }
        this.utils.resFlowSession.cart[index]  = this.utils.resFlowSession.resCalculateCartItemPrice(item);
        this.utils.resFlowSession.cart[index] = this.resFlowSession.cart[index];
        this.getTotalCartValue();
    }

    checkout() {
        if (this.utils.utilities.flow == 'residentialNavElems') {
            // this.appComp.getCheckOut(this.itemPrice);
            this.resShoppingCartTerms.open();

        } else {
            // this.appComp.getCheckOut(this.itemPrice);
            this.gdoShoppingCartTerms.open();
        }
    }

    secureRedirection() {
        this.resShoppingCartTerms.close();
        this.resShoppingCartTerms.close();
        this.secureRedirectionTerms.open();
    }

    goToHome() {
        this.route.navigateByUrl('/banner');
    }

    goToCustomerInfo() {
        // this.route.navigateByUrl('/customer-info');
        this.appComp.getCheckOut(this.itemPrice);
    }

    toggleSection(e, i) {
        $('#section-'+i).toggleClass('in');
        $(e.currentTarget).find('.fa').toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
    }
}
