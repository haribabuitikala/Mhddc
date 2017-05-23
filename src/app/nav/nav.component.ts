import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { AppUtilities } from "../shared/appUtilities";
import { Router } from '@angular/router';
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { NavService } from "./nav-service";
declare var $: any;
declare var _: any;

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {
    @ViewChild('home') modal: ModalComponent;
    @Input() screen: number;

    @Input() steps = [];
    @Input() activeStep;
    showNav: boolean = false;
    currElem: any;
    menuArray;

    constructor(private app: AppUtilities
        , private route: Router
        , private navComp: NavService) {
    }

    CP; // cuurent page
    VP; // visited page
    NVP; // non visited page
    current: string = 'current';
    menuCount = this.app.utilities.navCount;
    pathName;

    ngOnChanges() {
        this.menuArray = this.buildMenu();
    }

    buildMenu() {
        let t = _.times(this.app.utilities.navCount, _.constant(null));
        return t.map(function (x, i) {
            return i + 1
        });
    }

    goToHome() {
        this.modal.close();
        this.route.navigateByUrl('/banner');
    }

    visited(id) {
        let li = $('li:eq(' + id + ')');
        let src = li.find('img').attr('src');
        if (li.hasClass('visited')) {
            li.removeClass('visited').addClass('current').find('img').attr('src', _.replace(src, "VP", "CP"));
            $('li:gt(' + id + ')')
                .removeClass('current visited')
                .find('img')
                .each(function (img) {
                    $(this).attr('src', _.replace(this.src, 'CP', 'NVP'));
                    $(this).attr('src', _.replace(this.src, 'onVP', 'onNVP'));
                });
            this.app.utilities.currPage = id;
            let path = this.app.utilities.currScreen - (id + 1);
            this.app.utilities.currScreen = path;

            let t = this.app.utilities.flow;
            if (this.app.utilities.flow === 'residentialNavElems')
                this.pathName = this.app.utilities[t][id + 2];

            this.route.navigateByUrl(this.pathName);
        }
    }

    isVisisted(step) {
        console.log('');
        if (this.gdoVisistedSteps.indexOf(step.No) >= 0) {
            return true;
        }
        return false;
    }

    ngOnInit() {
        $('li span').hide();
        this.screen > 2 ? this.showNav = true : this.showNav = false;
        this.menuArray = _.times(this.menuCount, _.constant(null));
        this.menuArray = this.menuArray.map(function (x, i) {
            return i + 1
        });
        // this.navComp.activateIcon();

        console.log('stesp ', this.steps, this.flowType);
    }


    flowType;
    gdoFlowSteps = [
        {
            No: 0,
            Name: 'Home',
            active: false,
            visited: false,
            callFn: null
        },
        {
            No: 1,
            Name: 'Size',
            active: false,
            visited: false,
            url: '',
            callFn: null
        },
        {
            No: 2,
            Name: 'Step 2',
            active: false,
            visited: false,
            url: '',
            callFn: null
        },
        {
            No: 3,
            Name: 'Step 3',
            active: false,
            visited: false,
            url: '',
            callFn: null
        },
        {
            No: 4,
            Name: 'Step 4',
            active: false,
            visited: false,
            url: '',
            callFn: null
        },
        {
            No: 5,
            Name: 'Step 5',
            active: false,
            visited: false,
            url: '',
            callFn: null
        }
    ];
    flowActiveStep = -1;
    changeSubscribers;
    appContext;
    subscribeMe(fn, context) {
        this.changeSubscribers = fn;
        this.appContext = context;
    }
    gdoVisistedSteps = [];

    goToStep(step) {
        if (step.callFn) {
            step.callFn();
        } else if (step.url) {
            this.route.navigateByUrl(step.url);
        }
    }
    resetNav(obj) {
        var showStepIndicator = false;
        if (obj.flowType === 'gdo') {
            showStepIndicator = true;
            this.gdoFlowSteps.forEach((s, i) => {
                s.visited = false;
                s.callFn = null;
                if (obj.resetNav) {
                    this.gdoVisistedSteps = [];
                    if (s.No == obj.flowActiveStep) {
                        s.active = true;
                        s['url'] = obj.currentStepUrl;
                    } else {
                        s.active = false;
                    }
                    s.visited = false;
                } else {
                    if (s.No == obj.flowActiveStep) {
                        s.active = true;
                        s['url'] = obj.currentStepUrl;
                        if (obj.nextStepFn) {
                            this.gdoFlowSteps[i + 1].callFn = obj.nextStepFn;
                        }
                    } else {
                        s.active = false;
                    }
                    if (this.gdoVisistedSteps.indexOf(s.No) >= 0 && s.No != obj.flowActiveStep) {
                        s.visited = true;
                    }
                }
                if (this.gdoVisistedSteps.indexOf(obj.flowActiveStep) < 0) {
                    this.gdoVisistedSteps.push(obj.flowActiveStep);
                }
            });

            console.log('gdo ', this.gdoFlowSteps);
        }
        this.changeSubscribers({ showStepIndicator: obj.showStepIndicator, steps: this.gdoFlowSteps, activeStep: obj.flowActiveStep });
    }

}
