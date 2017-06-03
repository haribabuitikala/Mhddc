import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { AppUtilities } from "../shared/appUtilities";
import { Router } from '@angular/router';
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { NavService, Step } from "./nav-service";
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
    @Input() flowType;

    showNav: boolean = false;
    currElem: any;
    menuArray;

    gdoFlowSteps: Array<Step> = [];
    resFlowSteps: Array<Step> = [];
    constructor(private app: AppUtilities
        , private route: Router
        , private navComp: NavService) {
        this.gdoFlowSteps = navComp.gdoFlowSteps;
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

    openModal() {
        this.modal.open();
    }

    goToHome() {
        this.modal.close();
        if (this.changeSubscribers) {
            this.changeSubscribers({ showStepIndicator: false });
        }
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

    }





    flowActiveStep = -1;
    changeSubscribers;
    appContext;
    subscribeMe(fn, context) {
        this.changeSubscribers = fn;
        this.appContext = context;
    }
    gdoVisistedSteps = [];
    resVisistedSteps = [];

    goToStep(step, checkNextStep) {
        if (checkNextStep) {
            let currentStep = this.steps.filter(s => { return s.active === true; });
            if (currentStep.length > 0) {
                if (step.No === currentStep[0].No + 1) {
                    if (currentStep[0].callFn) {
                        currentStep[0].callFn();
                    }
                }
            }
        } else {
            let currentStep = this.steps.filter(s => { return s.active === true; });
            if (currentStep.length > 0) {
                if (step.No === currentStep[0].No + 1) {
                    if (currentStep[0].callFn) {
                        currentStep[0].callFn();
                    }
                } else {
                    this.route.navigateByUrl(step.url);
                }
            } else {
                this.route.navigateByUrl(step.url);
            }
        }
    }

    subFlow = false;
    resSubFlow;
    resDisableSteps = [];
    setNavFlow(flowType, subFlow?) {
        this.gdoVisistedSteps = [];
        this.subFlow = subFlow ? true : false;
        this.flowType = flowType ? flowType : this.flowType;
        if (flowType === 'res') {
            this.resSubFlow = subFlow;
        }
    }

    clearDisabledSteps() {
        this.resDisableSteps = [];
    }

    addDisabledStep(sNo) {
        this.resDisableSteps.push(sNo);
    }
    renderNav(obj) {
        let steps = [];
        if (obj.flowType === 'gdo') {
            this.gdoFlowSteps.forEach((s, i) => {
                s.visited = false;
                s.disabled = false;
                if (s.No == obj.flowActiveStep) {
                    s.active = true;
                    s['url'] = obj.currentStepUrl;
                    if (obj.nextStepFn) {
                        s.callFn = obj.nextStepFn;
                    }
                } else {
                    s.active = false;
                }
                if (this.gdoVisistedSteps.indexOf(s.No) >= 0 && s.No != obj.flowActiveStep) {
                    s.visited = true;
                }
                if (this.gdoVisistedSteps.indexOf(obj.flowActiveStep) < 0) {
                    this.gdoVisistedSteps.push(obj.flowActiveStep);
                }

                if (this.subFlow && (s.No === 1 || s.No === 2)) {
                    s.disabled = true;
                }

                if (s.No > obj.flowActiveStep) {
                    s.visited = false;
                }

                steps.push(s);
            });

        } else if (obj.flowType === 'res') {
            this.navComp.resFlowSteps.forEach(s => {
                s.visited = false;
                s.disabled = false;
                if (s.No == obj.flowActiveStep) {
                    s.active = true;
                    s['url'] = obj.currentStepUrl;
                    if (obj.nextStepFn) {
                        s.callFn = obj.nextStepFn;
                    }
                } else {
                    s.active = false;
                }
                if (this.resVisistedSteps.indexOf(s.No) >= 0 && s.No != obj.flowActiveStep) {
                    s.visited = true;
                }
                if (this.resVisistedSteps.indexOf(obj.flowActiveStep) < 0) {
                    this.resVisistedSteps.push(obj.flowActiveStep);
                }

                if (s.No > obj.flowActiveStep) {
                    s.visited = false;
                }

                if (this.resSubFlow === 'hideglass' && s.No === 8) {
                    s.disabled = true;
                }

                if(this.resDisableSteps.indexOf(s.No) >= 0) {
                    s.disabled = true;
                }

                steps.push(s);
            });
        } else if (obj.flowType === 'resquick') {
            this.navComp.resQuickFlowSteps.forEach(s => {
                s.visited = false;
                s.disabled = false;
                if (s.No == obj.flowActiveStep) {
                    s.active = true;
                    s['url'] = obj.currentStepUrl;
                    if (obj.nextStepFn) {
                        s.callFn = obj.nextStepFn;
                    }
                } else {
                    s.active = false;
                }
                if (this.resVisistedSteps.indexOf(s.No) >= 0 && s.No != obj.flowActiveStep) {
                    s.visited = true;
                }
                if (this.resVisistedSteps.indexOf(obj.flowActiveStep) < 0) {
                    this.resVisistedSteps.push(obj.flowActiveStep);
                }

                if (s.No > obj.flowActiveStep) {
                    s.visited = false;
                }

                if (this.resSubFlow === 'hideglass' && s.No === 8) {
                    s.disabled = true;
                }

                

                if (s.No == 1) {
                    s.visited = true;
                    s.url = '/doorSize';
                }
                if (s.No == 2) {
                    s.visited = true;
                    s.url = '/collection';
                }
                steps.push(s);
            });
           
        }

        if (this.changeSubscribers) {
            this.changeSubscribers({ showStepIndicator: obj.showStepIndicator, flowType: obj.flowType, steps: steps, activeStep: obj.flowActiveStep });
        }
    }
}
