import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppUtilities} from "../shared/appUtilities";
import {AppComponent} from "../app.component";
import {NavService} from "../nav/nav-service";
import {CollectionData} from "../collection/collection-data";
import {GdoConfigComponent} from "../gdo-config/gdo-config.component";
declare var $:any;

@Component({
    selector: 'app-door-configuration',
    templateUrl: './door-configuration.component.html',
    styleUrls: ['./door-configuration.component.less']
})
export class DoorConfigurationComponent implements OnInit {

    pageNo;
    isGdo = this.utils.utilities.isGDO;
    store = this.dataStore.store;
    gdoOpenerTxt = this.utils.utilities.gdoOpenerText;
    gdoOpenerSelected = this.dataStore.gdoOpenerAccessories;
    itemPrice = this.utils.utilities.item_price;
    qty = this.utils.utilities.gdoOpenerQty;
    itmPrice = this.utils.utilities.itmPrice;
    showDistancePrice = false;
    distance = this.utils.utilities.distance;
    distancePrice = this.utils.utilities.distancePrice;
    accessories;
    gdodirectquestions = this.dataStore.gdoDirectQuestions;
    gdodirect;


    // for gdo the pageNo will be 4
    // for residential the pageNo will be 

    constructor(private utils:AppUtilities
        , private route:Router
        , private appComp:AppComponent
        , private navComp:NavService
        , private dataStore:CollectionData
        , private gdoConfig:GdoConfigComponent) {
    }

    ngOnInit() {
        this.pageNo = this.utils.utilities.currPage;
        // this.appComponent.next = 'Add To Cart';
        this.navComp.activateIcon();
        this.gdoConfig.showDetails = false;
        this.distancePrice > 0 ? this.showDistancePrice = true : this.showDistancePrice = false;
        this.gdoOpenerSelected.length ? this.accessories = true : this.accessories = false;
        this.gdodirectquestions.length ? this.gdodirect = true : this.gdodirect = false;
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

    nextBtn(path) {
        if (this.utils.utilities.flow === 'gdoNavElems') {
            this.utils.setUtils(5, 1);
            $('.shop-count').text('1');
            this.goTo(path)
        } else {
            this.goTo(path)
        }
    }

    prevBtn(path) {
        if (this.utils.utilities.flow === 'gdoNavElems') {
            this.utils.setUtils(3, 0);
            this.utils.utilities.itemsCount = 1;
            this.goTo(path);

        } else {
            this.goTo(path)
        }
        this.appComp.currScreen = 2;
    }

    goTo(path) {
        this.route.navigateByUrl(path)
    }

}
