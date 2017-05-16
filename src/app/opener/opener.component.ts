import {Component, OnInit} from '@angular/core';
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

    constructor(private utils:AppUtilities
        , private navComp:NavService
        , private route:Router
        , private dataStrorage:CollectionData
        , private dataService:CollectionService) {
    }

    pageNo;
    data;
    number:number;

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
        this.data = _.chunk(this.data, 2);
        this.number = 6;
        
    }

    nextBtn(path) {
        if (this.utils.utilities.flow === 'gdoNavElems') {
            this.utils.setUtils(3, 1);
            this.dataService.getGdoAdditional(this.dataParams)
                .subscribe(
                    res => {
                        // this.route.navigateByUrl(path);
                        console.log(res);
                        this.goTo('gdoConfig' + path)
                    }
                )

        } else {
            this.goTo('config' + path)
        }
    }
    getOpenerId(data){
        this.dataParams.openerid = data.item_id;
        this.utils.utilities.openerType = data.brand;
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
