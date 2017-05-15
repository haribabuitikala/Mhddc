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

    ngOnInit() {
        this.appComponent.currScreen = 3;
        this.itemPrice = this.utils.utilities.item_price;
    }


}
