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
        if(itm.srcElement.checked === true) {
            this.distance = 31;
            this.utils.utilities.distance = 31;
        } else {
            this.distance = '';
        }
    }
    updateDistance(itm){
        this.utils.utilities.distance = +itm.target.value;
    }

}
