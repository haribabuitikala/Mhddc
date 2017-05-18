import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppComponent} from "../app.component";
import {AppUtilities} from "../shared/appUtilities";
import {NavService} from "../nav/nav-service";
import {CollectionData} from "../collection/collection-data";
import {CollectionService} from "../shared/data.service";

@Component({
    selector: 'app-additional-options',
    templateUrl: './additional-options.component.html',
    styleUrls: ['./additional-options.component.less']
})
export class AdditionalOptionsComponent implements OnInit {
    pageNo;
    showMenu;
    data;
    questions;
    gdoFlow = this.utils.utilities.isGDO;
    distance:any;
    distancePrice;
    showDistancePrice;
    directFlow = this.utils.utilities.directFlow;

    // for gdo the pageNo will be 3
    // for residential the pageNo will be

    constructor(private appComponent:AppComponent
        , private utils:AppUtilities
        , private route:Router
        , private navComp:NavService
        , private dataStore:CollectionData
        , private dataService:CollectionService) {
    }

    ngOnInit() {
        this.appComponent.next = 'Next';
        this.pageNo = this.utils.utilities.currPage;
        this.showMenu = this.utils.utilities.showNav;
        this.navComp.activateIcon();
        this.data = this.dataStore.gdoAdditional;
        // this.dataService.getJsonData(this.utils.utilities.openerType)
        //     .subscribe(
        //         res => {
        //             console.log(res)
        //         }
        //     )
    }

    nextBtn(path) {
        if (this.utils.utilities.flow === 'gdoNavElems') {
            this.utils.setUtils(4, 1);
            this.goTo('/gdoConfig' + path)
        } else {
            this.goTo('/config' + path)
        }
    }

    prevBtn(path) {
        if (this.utils.utilities.flow === 'gdoNavElems') {
            this.utils.setUtils(2, 0);
            this.goTo('/gdoConfig' + path);
        } else {
            this.goTo('/config' + path)
        }
    }

    goTo(path) {
        this.route.navigateByUrl(path)
    }

    showDistance(itm) {
        if (itm.srcElement.checked === false) {
            this.distance = 31;
            this.utils.utilities.distance = 31;
            this.utils.utilities.distancePrice = 51;
            this.distancePrice = 51;
        } else {
            this.distance = '';
        }
        this.showDistancePrice = true;
    }

    updateDistance(itm, flow) {
        this.utils.utilities.distance = +itm.target.value;
        let miles = +itm.target.value;
        if(flow === 'direct'){
            if (miles > 31) {
                let t = miles - 31;
                this.distancePrice = (t * 2.50) + 2.50;
            }
        } else {
            if (miles > 50) {
                let t = miles - 50;
                this.distancePrice = (t * 3) + 50;
            }
            this.utils.utilities.distancePrice = this.distancePrice;
        }
    }

}
