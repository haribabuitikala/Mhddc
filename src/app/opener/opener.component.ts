import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppUtilities} from "../shared/appUtilities";
import {NavService} from "../nav/nav-service";

@Component({
    selector: 'app-opener',
    templateUrl: './opener.component.html',
    styleUrls: ['./opener.component.less']
})
export class OpenerComponent implements OnInit {

    constructor(private utils:AppUtilities
        , private navComp:NavService
        , private route:Router) {
    }

    pageNo;

    // for gdo flow the pageNo will be 2

    ngOnInit() {
        this.pageNo = this.utils.utilities.currPage;
        this.navComp.activateIcon();
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
