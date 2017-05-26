import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppUtilities} from "../shared/appUtilities";
import {NavService} from "../nav/nav-service";
import {NavComponent} from "../nav/nav.component";
import {CollectionData} from "../collection/collection-data";
import {ConfigComponent} from "../config/config.component";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
    pageNo;
    homes;

    constructor(private utils:AppUtilities
        , private navComp:NavService
        , private route:Router
        , private navComponent: NavComponent
        , private dataStore:CollectionData) {
    }

    ngOnInit() {
        this.pageNo = this.utils.utilities.currPage;
        this.navComp.activateIcon();
        this.homes = this.dataStore.homeImages;

        this.navComponent.renderNav({
            flowType: 'res',
            flowActiveStep: 3,
            currentStepUrl: '/home',
            showStepIndicator: true,
            nextStepFn: () => {
                this.nextBtn(null, '/config/design');
            }
        });
    }

    selectHome(itm) {
        console.log(itm);
        this.utils.resFlow.selectedHome = itm._imagelg;

    }

    prevBtn(curr, path) {
        this.utils.setUtils(2, 0);
        this.route.navigateByUrl(path)
    }

    nextBtn(curr, path) {
        this.utils.setUtils(4, 1);
        this.route.navigateByUrl(path);
    }

}
