import {Component, OnInit} from '@angular/core';
import{Router} from '@angular/router';
import {AppComponent} from "../app.component";
import {AppUtilities} from "../shared/appUtilities";
import {CollectionService} from "../shared/data.service";
import {CollectionData} from "../collection/collection-data";

@Component({
    selector: 'app-gdo-door-size',
    templateUrl: './gdo-door-size.component.html',
    styleUrls: ['./gdo-door-size.component.less']
})
export class GdoDoorSizeComponent implements OnInit {

    garageDoorHgt;

    constructor(private appComponent:AppComponent
        , private route:Router
        , private utils:AppUtilities
        , private dataService:CollectionService
        , private dataStorage:CollectionData) {
    }

    ngOnInit() {
        this.appComponent.currScreen = 3;
    }

    dataParams = {
        dheightFt: null,
        lang: this.utils.utilities.lang,
        isGDO: this.utils.utilities.isGDO,
        localmarketid: this.utils.utilities.localmarketid,
        NatMarketID: this.utils.utilities.natmarketid,
        ProductType: this.utils.utilities.ProductType
    }

    goTo(itm) {
        this.utils.utilities.currPage = 2;
        this.utils.utilities.clicked = 1;
        this.dataParams.dheightFt = +this.garageDoorHgt;
        this.dataService.getGdoOpener(this.dataParams)
            .subscribe(
                res => {
                    this.dataStorage.gdoOpener = res;
                    this.route.navigateByUrl('/gdoConfig/opener');
                }
            );
    }


}
