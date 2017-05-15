import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppUtilities} from "../shared/appUtilities";
import {NavService} from "../nav/nav-service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
    pageNo;

    constructor(private utils:AppUtilities
        , private navComp:NavService
        , private route:Router) {
    }

    ngOnInit() {
        this.pageNo = this.utils.utilities.currPage;
        this.navComp.activateIcon();
    }

    prevBtn(curr, path) {
        this.utils.setUtils(2,0);
        this.route.navigateByUrl(path)
    }

    nextBtn(curr, path) {
        this.utils.setUtils(4,1);
        this.route.navigateByUrl(path)
    }

}
