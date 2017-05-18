import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";
import {AppUtilities} from "../shared/appUtilities";

@Component({
    selector: 'app-gdo-config',
    templateUrl: './gdo-config.component.html',
    styleUrls: ['../config/config.component.less', '../details/details.component.less', './gdo-config.component.less']
})
export class GdoConfigComponent implements OnInit {

    constructor(private appComponent:AppComponent
        , private utils:AppUtilities) {
    }

    data;
    itemPrice;
    itmPrice; // this is for holding the single quantity price
    gdoBanner;
    quantity = 1;
    showDetails = true;
    visualizeHeader;


    ngOnInit() {
        this.appComponent.currScreen = 3;
        this.itemPrice = this.utils.utilities.item_price;
        this.itmPrice = this.utils.utilities.item_price;
        this.utils.utilities.itmPrice = this.itmPrice;
        this.gdoBanner = this.utils.utilities.gdoBanner;
        this.utils.utilities.gdoOpenerQty = this.quantity;
        this.visualizeHeader = this.utils.utilities.visualizeHeader;

    }

    updateQuantity(flow) {
        if (flow === 1 && this.quantity < 6) {
            this.quantity++
        }
        else if (flow === 0 && this.quantity > 1) {
            this.quantity--;
        }
        this.itemPrice = this.itmPrice * this.quantity;
        this.utils.utilities.item_price = this.itemPrice;
        this.utils.utilities.gdoOpenerQty = this.quantity;
    }


}
