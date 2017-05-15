import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";
import {NavService} from "../nav/nav-service";
import {AppUtilities} from "../shared/appUtilities";

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.less']
})
export class ShoppingCartComponent implements OnInit {
    pageNo;

    constructor(private appComp:AppComponent
        , private navComp:NavService
        , private utils:AppUtilities) {
    }

    ngOnInit() {
        this.navComp.activateIcon();
        this.pageNo = this.utils.utilities.currPage;
        this.appComp.currScreen = 0;
    }

}
