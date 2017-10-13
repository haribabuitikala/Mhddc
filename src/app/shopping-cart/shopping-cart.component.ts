import { Component, OnInit, ViewChild, Directive, Input, Output, EventEmitter, AfterViewInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { AppComponent } from "../app.component";
import { Router, ActivatedRoute } from '@angular/router';
import { NavService } from "../nav/nav-service";
import { NavComponent } from "../nav/nav.component";
import { AppUtilities } from "../shared/appUtilities";
import { CollectionData } from "../collection/collection-data";

declare var $: any;
declare var _: any;
declare var ga:Function;
@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.less', '../install//install.component.less']
})
export class ShoppingCartComponent implements OnInit, AfterViewChecked {
    @ViewChild('continue') continue: ModalComponent;
    @ViewChild('resShoppingCartTerms') resShoppingCartTerms: ModalComponent;
    @ViewChild('gdoShoppingCartTerms') gdoShoppingCartTerms: ModalComponent;
    @ViewChild('secureRedirectionTerms') secureRedirectionTerms: ModalComponent;
    @ViewChild('installTerms') installTerms: ModalComponent;
    @Input() IsModal: boolean = false;
    @Output() closeModal = new EventEmitter();
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
    showGdo = this.utils.gdoFlowSession.cart.length === 0 ? true : false;
    cartlen = this.utils.gdoFlowSession.cart.length || this.utils.resFlowSession.cart.length;
    showPreTax = this.cartlen > 0 ? true : false;

ngAfterViewChecked() {
    this.cdref.detectChanges();
    this.cartlen = 0;
    if (this.utils.gdoFlowSession.cart.length > 0 && this.utils.gdoFlowSession.added) {
        this.cartlen = this.utils.gdoFlowSession.cart.length;
    }
    if (this.utils.resFlowSession.cart.length > 0) {
        this.cartlen = this.utils.resFlowSession.cart.length;
    }

    this.showPreTax = this.cartlen > 0 ? true : false;
    if (this.utils.resFlowSession.resDoorObj.TYPE !== 'RES') {
        this.getItemPrice();
    } else {
        this.getTotalCartValue();
    }
}

constructor(private appComp: AppComponent
    , private navComp: NavService
    , private utils: AppUtilities
    , private navComponent: NavComponent
    , private dataStore: CollectionData
    , private route: Router
    , private activatedRoute: ActivatedRoute
    , private cdref: ChangeDetectorRef) {
        //route.
}

ngOnInit() {       
    this.navComp.activateIcon();
    window.location.hash.indexOf('shopping') !== -1 ? $('.content').addClass('shoppingCart') : $('.content').removeClass('shoppingCart');
    this.utils.resFlowSession.resDoorObj.TYPE === 'GDO' ? this.resFlow = false : this.resFlow = true;
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

    this.resFlowSession = this.utils.resFlowSession;
    this.data = this.utils.gdoFlowSession.cart[0];
    if (this.utils.resFlowSession.resDoorObj.TYPE !== 'RES') {
        this.getItemPrice();
    } else {
        this.getTotalCartValue();
    }

    if(this.activatedRoute.snapshot.data["openmodal"]) {
        ga('send', { hitType: 'event', eventCategory: 'Click', eventAction: 'F&I-GDO-AddToCart', eventLabel: 'checkout' });
        if (this.utils.utilities.flow == 'residentialNavElems') {
            this.utils.resFlowSession.resDoorObj.INSTALLTYPE === "Installed" ? this.installTerms.open() : this.resShoppingCartTerms.open();
        } else {
            ga('send', { hitType: 'event', eventCategory: 'Click', eventAction: 'Terms&Conditions-Decline-GD', eventLabel: 'checkout' });
            this.gdoShoppingCartTerms.open();
        }
    }
}

redirectToShoppingCart(){
    ga('send', { hitType: 'event', eventCategory: 'Click', eventAction: 'Terms&Conditions-Decline-GD', eventLabel: 'redirectToShoppingCart' }); 
    this.route.navigateByUrl('/shoppingCart');
}
getItemPrice() {
    this.isGdo = true;
    if (!this.utils.utilities.directFlow) {
        this.itemPrice = this.utils.calculateTotalPrice();
        let kPrice = _.sumBy(this.dataStore.gdoOpenerAccessories, function (o) {
            return o.price * o.count;
        });
        this.itemPrice = this.itemPrice + (kPrice * this.utils.utilities.gdoOpenerQty);
    } else {
        // Fix for avoiding binding data on remove item
        if (this.utils.gdoFlowSession.cart.length > 0) {
            this.data = this.dataStore.gdoAdditionalDirect;
        }
        if (this.data) {
            // Better this way to calculate price in direct price to make less regression
            this.itemPrice = (this.data.item_price * this.qty) + (
                this.utils.utilities.singlep +
                this.utils.utilities.doublep +
                this.utils.utilities.kPrice +
                this.utils.utilities.distancePrice
            );
        }
    }
}

ngAfterViewInit() {
    // if(this.resFlowSession.cart.length === 1) {
    //     this.toggleSection(0);
    // } else if(this.resFlowSession.cart.length > 1) {
    //     this.toggleSection(this.resFlowSession.cart.length-1);
    // }
}

getTotalCartValue() {
    let k = 0;
    this.resFlowSession.cart.forEach(function (i) {
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
    if (this.IsModal) {
        this.closeModal.next();
    }
    $('.content').removeClass('shoppingCart');
    this.route.navigateByUrl('/doorSize');
}

removeItem(item, index) {
    this.utils.gdoFlowSession.added = false;
    if (this.resFlow) {
        this.resFlowSession.cart.splice(index, 1);
        this.utils.resFlowSession.cart = this.resFlowSession.cart;
        this.utils.cartItems.splice(index, 1);
        $('.shop-count').text(this.resFlowSession.cart.length);
        this.showPreTax = this.resFlowSession.cart.length > 0 ? true : false;
        this.getTotalCartValue();
    } else {
        // Fix under browser back button functionality possible regression
        //this.utils.gdoFlowSession.cart.splice(index, 1);
        $('.shop-count').text(this.resFlowSession.cart.length);
        //this.dataStore.gdoOpenerAccessories.length = 0;
        this.utils.utilities.gdoOpenerText = '';
        this.showGdo = true;
        this.showPreTax = false;
        //this.route.navigateByUrl('/category');
        this.data = null;
    }
}
gdoContinue() {
    $('.content').removeClass('shoppingCart');
    this.route.navigateByUrl('/category');
}

updateQuantity(flow) {
    this.itemPrice = this.utils.updateQty(flow, this.utils.utilities.gdoOpenerQty);
    //this.baseItmPrice = this.utils.utilities.item_price * this.utils.utilities.gdoOpenerQty;
    this.baseItmPrice = this.utils.utilities.item_price;
    this.qty = this.utils.utilities.gdoOpenerQty;
    this.utils.gdoFlowSession.cart[0].QTY = this.qty;
}

updateQty(item, index, increment?) {
    if (increment) {
        if (item.construction.qty !== 6)
            item.construction.qty = item.construction.qty + 1;
    } else {
        if (item.construction.qty !== 1) {
            item.construction.qty = item.construction.qty - 1;
            if (item.opener.qty > item.construction.qty) {
                item.opener.qty = item.construction.qty;
            }
        }
    }
    this.utils.resFlowSession.cart[index] = this.utils.resFlowSession.resCalculateCartItemPrice(item);
    this.utils.resFlowSession.cart[index] = this.resFlowSession.cart[index];
    if (this.utils.cartItems[index]) {
        this.utils.cartItems[index].qty = item.construction.qty;
        this.utils.cartItems[index].QTY = item.construction.qty;
    }

    this.getTotalCartValue();
}

checkout(install, diy) {
    ga('send', { hitType: 'event', eventCategory: 'Click', eventAction: 'ShoppingCart-CheckOutNow-GD', eventLabel: 'checkout' });
    this.route.navigateByUrl('/shoppingCart/confirm');
  
}

secureRedirection() {
     ga('send', { hitType: 'event', eventCategory: 'Click', eventAction: 'Terms&Conditions-Accept-GD', eventLabel: 'secureRedirection' });
    this.resShoppingCartTerms.close();
    this.resShoppingCartTerms.close();
    this.secureRedirectionTerms.open();
}

goToHome() {
     ga('send', { hitType: 'event', eventCategory: 'Click', eventAction: 'PaymentGateway-Decline-GD ', eventLabel: 'goToHome' });
    this.route.navigateByUrl('/banner');
}

goToCustomerInfo() {
    ga('send', { hitType: 'event', eventCategory: 'Click', eventAction: 'PaymentGateway-OK-GD', eventLabel: 'goToCustomerInfo' });
    // this.route.navigateByUrl('/customer-info');
    this.appComp.getCheckOut(this.itemPrice);
}

toggleSection(i) {
    $('#section-body-' + i).toggleClass('in');
    $('#section-header-' + i).find('.fa').toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
}

continueShopping() {
    if (window.location.href.indexOf('shoppingCart') >= 0) {
        $('.content').removeClass('shoppingCart');
        this.closeModal.next();
        this.utils.utilities.dtype = 'RES';
        this.route.navigateByUrl('/category');
    } else {
        if (this.IsModal) {
            this.closeModal.next();
        }
    }
}
}
