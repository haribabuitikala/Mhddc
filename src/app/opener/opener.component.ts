import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {Router} from '@angular/router';
import {AppUtilities} from "../shared/appUtilities";
import {NavService} from "../nav/nav-service";
import {CollectionData} from "../collection/collection-data";
import {CollectionService} from "../shared/data.service";
declare var _:any;

@Component({
    selector: 'app-opener',
    templateUrl: './opener.component.html',
    styleUrls: ['./opener.component.less']
})
export class OpenerComponent implements OnInit {
    @ViewChild('gdoOponerAccessories') gdoOponerAccessories:ModalComponent;

    constructor(private utils:AppUtilities
        , private navComp:NavService
        , private route:Router
        , private dataStrorage:CollectionData
        , private dataService:CollectionService) {
    }

    pageNo;
    data;
    number:number;
    gdoOpenertext;
    gdoOpenerObj;

    dataParams = {
        NatMarketID: this.utils.utilities.natmarketid,
        lang: this.utils.utilities.lang,
        openerid: null
    };

// for gdo flow the pageNo will be 2

    ngOnInit() {
        this.pageNo = this.utils.utilities.currPage;
        this.navComp.activateIcon();
        this.data = this.dataStrorage.gdoOpener;
        this.gdoOpenertext = this.data[0].item_description;
        this.dataParams.openerid = this.data[0].item_id;
        this.data = _.chunk(this.data, 2);
        this.number = 6;
        this.gdoOpenerObj = this.dataStrorage.gdoAdditional;
    }

    nextBtn(path) {
        if (this.utils.utilities.flow === 'gdoNavElems') {
            this.utils.setUtils(3, 1);
            this.utils.utilities.gdoOpenerText = this.gdoOpenertext;
            this.dataService.getGdoAdditional(this.dataParams)
                .subscribe(
                    res => {
                        // this.route.navigateByUrl(path);
                        this.gdoOpenerObj = res;
                        this.gdoOponerAccessories.open();
                        // this.goTo('gdoConfig' + path)
                    }
                )


        } else {
            this.goTo('config' + path)
        }
    }

    accessoriesModalClose() {
        this.dataStrorage.gdoOpenerAccessories = [];
        this.gdoOponerAccessories.close();
    }

    accessoriesModalNext() {
        this.route.navigateByUrl('/gdoConfig/additionalOptions');
    }

    selectedGdoCount(obj, event, i) {
        let k = i;
        let t = [];
        k = {
            name: obj.item_name,
            price: obj.item_price,
            count: +event.srcElement.value,
            totalPrice: obj.item_price * +event.srcElement.value
        };
        this.dataStrorage.gdoOpenerAccessories.splice(i, 1);
        this.dataStrorage.gdoOpenerAccessories.push(k);
    }

    getOpenerId(data) {
        this.dataParams.openerid = data.item_id;
        this.utils.utilities.openerType = data.brand;
        this.gdoOpenertext = data.item_name;
        // this.gdoOpenerObj = null;
        // this.gdoOpenerObj = data;
    }

    prevBtn(path) {
        if (this.utils.utilities.flow === 'gdoNavElems') {
            this.utils.setUtils(1, 0);
            this.goTo('gdoConfig' + path)
        } else {
            this.goTo('config' + path)
        }
    }

    goTo(path) {
        this.route.navigateByUrl(path);


    }

}
