import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUtilities } from "../shared/appUtilities";
import { AppComponent } from "../app.component";
import { NavService } from "../nav/nav-service";
import { NavComponent } from "../nav/nav.component";
import { CollectionData } from "../collection/collection-data";
import { GdoConfigComponent } from "../gdo-config/gdo-config.component";

// import { QuerySocialService } from 'social-share-ng2';
declare var $: any;
declare var _: any;

@Component({
    selector: 'app-door-configuration',
    templateUrl: './door-configuration.component.html',
    styleUrls: ['./door-configuration.component.less']
})
export class DoorConfigurationComponent implements OnInit {
    directFlow = false;

    pageNo;
    isGdo = this.utils.utilities.isGDO;
    store = this.dataStore.store;
    gdoOpenerTxt = this.utils.utilities.gdoOpenerText;
    gdoOpenerSelected = this.dataStore.gdoOpenerAccessories;

    // t = _.sumBy(this.gdoOpenerSelected, function(o){ return o.price * o.count });
    itemPrice;
    qty = this.utils.utilities.gdoOpenerQty;
    itmPrice = this.utils.utilities.itmPrice;
    showDistancePrice = false;
    distance = this.utils.utilities.distance;
    distancePrice = this.utils.utilities.distancePrice;
    accessories;
    gdodirectquestions = this.dataStore.gdoDirectQuestions;
    gdodirect;
    showDirectText = this.utils.utilities.directFlow;

    gdoOpeners = [];



    // for gdo the pageNo will be 4
    // for residential the pageNo will be 

    constructor(private utils: AppUtilities
        , private route: Router
        , private appComp: AppComponent
        , private navComp: NavService
        , private navComponent: NavComponent
        , private dataStore: CollectionData
        , private gdoConfig: GdoConfigComponent) {
    }

    setNavComponent() {
        this.navComponent.renderNav({
            flowType: 'gdo',
            flowActiveStep: 4,
            currentStepUrl: '/gdoConfig/doorConfiguration',
            showStepIndicator: true,
            nextStepFn: () => {
                this.nextBtn('/shoppingCart');
            }
        });
    }
    ngOnInit() {
        this.directFlow = this.utils.utilities.directFlow;
        this.itemPrice = this.utils.calculateTotalPrice();
        this.pageNo = this.utils.utilities.currPage;

        $('body').removeClass('loader');
        // this.appComponent.next = 'Add To Cart';
        this.navComp.activateIcon();
        this.distancePrice > 0 ? this.showDistancePrice = true : this.showDistancePrice = false;
        this.gdoOpenerSelected.length ? this.accessories = true : this.accessories = false;
        // this.gdodirectquestions.length ? this.gdodirect = true : this.gdodirect = false;
        this.gdodirect = this.utils.utilities.directFlow;
        this.gdoConfig.showDetails = false;
        $('.gdoCofigDetails').hide();


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

        var k = this.pageNo + '.Your Opener Configuration';
        $('#visualize-header').html(k);


        this.setNavComponent();
    }
    updateQuantity(flow) {
        // this.utils.updateQty will call calculate total amount internally
        this.itemPrice = this.utils.updateQty(flow, this.utils.utilities.gdoOpenerQty);
        this.qty = this.utils.utilities.gdoOpenerQty;
    }

    nextBtn(path) {
        $('body').addClass('loader');
        if (this.utils.utilities.flow === 'gdoNavElems') {
            this.utils.setUtils(5, 1);
            $('.shop-count').text('1');
            this.goTo(path)
        } else {
            this.goTo(path)
        }
    }
    showSocial = false;

    shareIt() {
this.showSocial = true;
    }

    prevBtn(path) {
        if (this.utils.utilities.flow === 'gdoNavElems') {
            this.utils.setUtils(3, 0);
            this.utils.utilities.itemsCount = 1;
            console.log('door ', path);
            this.goTo('/gdoConfig' + path);

        } else {
            this.goTo(path)
        }
        this.appComp.currScreen = 2;
    }

    goTo(path) {
        this.route.navigateByUrl(path)
    }

}
