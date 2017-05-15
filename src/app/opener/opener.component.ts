import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppUtilities} from "../shared/appUtilities";
import {NavService} from "../nav/nav-service";
import {CollectionData} from "../collection/collection-data";
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
        , private dataStrorage:CollectionData) {
    }

    pageNo;
    data;
    number:number;

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
            this.goTo('gdoConfig' + path)
        } else {
            this.goTo('config' + path)
        }
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
        this.route.navigateByUrl(path)
    }

}
