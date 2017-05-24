import { Component, Input, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AppUtilities } from "./shared/appUtilities";
import { NavComponent } from "./nav/nav.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [NavComponent]
})
export class AppComponent implements OnInit {

    showStepIndicator = false;
    steps = [];
    activeStep = -1;
    flowType;


    constructor(private route: Router
        , private location: Location
        , private app: AppUtilities
        , private nav: NavComponent
        , private activeRoute: ActivatedRoute) {

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


    ngOnInit() {
        if(!this.app.utilities.zipCode && this.location.path() !== '/banner') {
            this.route.navigateByUrl('/banner');
        }
        this.currScreen = this.app.utilities[this.flow].indexOf(this.location.path());
        this.location.path() === '/thankyou' ? this.currScreen = 2 : this.currScreen = this.app.utilities[this.flow].indexOf(this.location.path());

        this.nav.subscribeMe((obj) => {
            this.showStepIndicator = obj.showStepIndicator;
            this.steps = obj.steps;
            this.activeStep = obj.activeStep;
            this.flowType = obj.flowType;
        }, this);
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

}
