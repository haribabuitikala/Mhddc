import { Component, Input, OnInit, OnChanges, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AppUtilities } from "./shared/appUtilities";
import { NavComponent } from "./nav/nav.component";
declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [NavComponent]
})
export class AppComponent implements OnInit, AfterViewChecked, OnChanges {

    showStepIndicator = false;
    steps = [];
    activeStep = -1;
    flowType;

    noDIYs = [30, 16, 9];

    constructor(private route: Router
        , private location: Location
        , private app: AppUtilities
        , private nav: NavComponent
        , private activeRoute: ActivatedRoute
        , private cdref: ChangeDetectorRef) {
        route.events.subscribe(r => {
            if (r instanceof NavigationEnd) {
                console.log('flow Data ', app.resFlowSession.resDoorObj);
                window['cObj'] = app.resFlowSession.resDoorObj;
            }
        })

    }

    prev: string = 'Prev';
    next: string = 'Next';

    flow: string = this.app.utilities.flow;
    currScreen;
    // this is for checking whether Install or Diy selected for routing to appropriate screen
    selectedInstallDiy: string;



    ngOnChanges() {
        this.currScreen = this.app.utilities.currScreen;
    }

    ngAfterViewChecked() {
        this.cdref.detectChanges();
    }

    ngOnInit() {
        $('body').removeClass('loader');
        if (!this.app.utilities.zipCode && this.location.path() !== '/banner') {
            this.route.navigateByUrl('/');
        }
        this.currScreen = this.app.utilities[this.flow].indexOf(this.location.path());
        this.location.path() === '/thankyou' ? this.currScreen = 2 : this.currScreen = this.app.utilities[this.flow].indexOf(this.location.path());

        this.nav.subscribeMe((obj) => {
            this.showStepIndicator = obj.showStepIndicator;
            this.steps = obj.steps;
            this.activeStep = obj.activeStep;
            this.flowType = obj.flowType;
        }, this);

        window.onbeforeunload = function (event) {
            return "Navigating to Home Page will discard<br>all available Cart Items.";
        };
    }

    nextBtn(id): void {
        if (this.app.utilities[this.flow][id + 1] !== undefined) {
            this.currScreen = id + 1;
            if (this.selectedInstallDiy === 'diy') {
                this.currScreen = id + 2
            }
            this.app.utilities.currPage = this.currScreen - 2;
            this.app.utilities.currScreen = this.app.utilities.currScreen;
            this.app.utilities.clicked = 1;
            this.toRoute(this.currScreen);
        }
    }

    prevBtn(id): void {
        this.currScreen = id - 1;
        let path = this.location.path();
        switch (path) {
            case "/config/opener":
                // this.currScreen = this.app.utilities.residentialNavElems.indexOf('/config/install');
                break;
            default:
                this.app.utilities.currPage = this.app.utilities.currPage - 1;
        }
        // if (this.location.path() === '/config/opener') {
        //     // this.currScreen = this.app.utilities.residentialNavElems.indexOf('/config/install');
        // }

        this.app.utilities.currScreen = this.currScreen;
        this.app.utilities.clicked = 0;
        this.toRoute(this.currScreen)
    }

    toRoute(path) {
        let link: any = this.app.utilities[this.app.utilities.flow][path];
        this.route.navigateByUrl(link);
    }



    priceListener;
    updatePrice() {
        if (this.priceListener) {
            this.priceListener();
        }
    }
    subscribeToPrice(fn) {
        this.priceListener = fn;
    }

    detailsUpdateFn;
    sunscribeToDetailsUpdate(fn) {
        this.detailsUpdateFn = fn;
    }

    updateResDetails() {
        if (this.detailsUpdateFn) {
            this.detailsUpdateFn();
        }
    }

    setLoader(show?) {
        if (show) {
            // $('body').addClass('loader');
        } else {
            // $('body').removeClass('loader');
        }
    }

    getCheckOut(price) {
        let resObj = this.app.resFlowSession.orderObj.cart.push(this.app.resFlowSession.resDoorObj);
        let gdoObj = this.app.gdoFlowSession;
        let Obj = this.app.utilities.isGDO === true ? gdoObj : resObj;

        // let price = ;
        try {
            if (window['CheckOut']) {
                var ttt = window['CheckOut'](price, 0, 0, price, Obj);

                console.log('ttt ', ttt);
            }
        } catch (r) {
            //swallow
        }

    }

}
