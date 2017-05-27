import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppUtilities} from "../shared/appUtilities";
import {NavService} from "../nav/nav-service";
import {NavComponent} from "../nav/nav.component";
import {CollectionData} from "../collection/collection-data";
import {ConfigComponent} from "../config/config.component";
declare var $:any;
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, AfterViewInit {
    pageNo;
    homes;
    selected;

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

    ngAfterViewInit(){
        $('.stock div:first-child img').addClass('selected');
        this.utils.resFlow.selectedHome = this.homes[0]._imagelg;
    }
    
    selectHome(itm, evt) {
        $('.stock img').removeClass('selected');
        evt.target.classList = 'selected';
        this.utils.resFlow.selectedHome = itm._imagelg;

        this.utils.resFlowSession.home['selectedHomeImg'] = itm._imagelg;
        this.utils.resFlowSession.home['selectedHome'] = itm;

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
