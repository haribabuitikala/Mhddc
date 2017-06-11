import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from "../app.component";
import { AppUtilities } from "../shared/appUtilities";
import { CollectionService } from "../shared/data.service";
import { CollectionData } from "../collection/collection-data";
import { NavComponent } from '../nav/nav.component'
import { NavService } from "../nav/nav-service";
declare var $: any;

@Component({
    selector: 'app-gdo-door-size',
    templateUrl: './gdo-door-size.component.html',
    styleUrls: ['./gdo-door-size.component.less']
})
export class GdoDoorSizeComponent implements OnInit {

    garageDoorHgt;

    constructor(private appComponent: AppComponent
        , private route: Router
        , private utils: AppUtilities
        , private dataService: CollectionService
        , private dataStorage: CollectionData
        , private navComp: NavService, private navComponent: NavComponent) {
    }


    setNavComponent() {
        this.navComponent.setNavFlow('gdo');
        this.navComponent.renderNav({
            flowType: 'gdo',
            flowActiveStep: 1,
            currentStepUrl: '/gdoDoorSize',
            showStepIndicator: true
        });
    }

    ngOnInit() {
        this.appComponent.currScreen = 3;
        this.navComp.activateIcon();
        $('body').removeClass('loader');
        this.utils.utilities.gdoOpenerSelectedItm = null;
        this.setNavComponent();
    }

    dataParams = {
        dheightFt: null,
        lang: this.utils.utilities.lang,
        isGDO: this.utils.utilities.isGDO,
        localmarketid: this.utils.utilities.localmarketid,
        NatMarketID: this.utils.utilities.natmarketid,
        ProductType: this.utils.utilities.ProductType,
        openertype: this.utils.utilities.gdoStore
    };

    goTo(itm) {
        if (itm > 0) {
            this.utils.utilities.currPage = 2;
            this.utils.utilities.clicked = 1;
            // this is for gdo shopping cart
            this.utils.gdoFlowSession.cart[0].size.height.hf = itm;
            this.dataParams.dheightFt = +itm;

            $('body').addClass('loader');
            this.dataService.getGdoOpener(this.dataParams)
                .subscribe(
                res => {
                    this.dataStorage.gdoOpener = res;
                    this.utils.utilities.item_price = res[0].item_price;
                    this.utils.utilities.gdoBanner = res[0].item_thumbnail;
                    this.utils.utilities.item_name = res[0].item_name;
                    // this is for getting the details of the first opener itm
                    let params = {
                        NatMarketID: this.utils.utilities.natmarketid,
                        lang: this.utils.utilities.lang,
                        openerid: res[0].item_id
                    };
                    this.dataService.getGdoAdditional(params)
                        .subscribe(
                        res => {
                            // this.route.navigateByUrl(path);
                            console.log(res);
                            $('body').removeClass('loader');
                            this.dataStorage.gdoAdditional = res;
                            this.route.navigateByUrl('/gdoConfig/opener');
                        }
                        // this.goTo('gdoConfig' + path)
                        )
                }
                );
        }
    }
}
