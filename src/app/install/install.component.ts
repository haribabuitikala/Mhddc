import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../app.component";
import { Router } from '@angular/router';
import { ConfigComponent } from "../config/config.component";
import { NavComponent } from "../nav/nav.component";
import { AppUtilities } from "../shared/appUtilities";

@Component({
    selector: 'app-install',
    templateUrl: './install.component.html',
    styleUrls: ['./install.component.less']
})
export class InstallComponent implements OnInit {

    constructor(private appComponent: AppComponent
        , private navComponent: NavComponent
        , private config: ConfigComponent
        , private route: Router
        , private utils: AppUtilities) {
    }

    installSize: string;
    wincode: string;
    collection: string;
    doorDesign: string;
    doorModel: string; doorModelPrice: string;
    construction: string;
    color: string; colorPrice: string;
    topSection: string;
    hardware = [];


    ngOnInit() {

        this.navComponent.renderNav({
            flowType: 'res',
            flowActiveStep: 10,
            currentStepUrl: '/config/install',
            showStepIndicator: true,
            nextStepFn: () => {

            }
        });
        this.config.pageTitle = '10.Choose Installed vs. DIY';
        
        this.installSize = this.utils.utilities.wf + "'0 \"(W) X " + this.utils.utilities.hf + "'0 \"(h)";
        this.wincode = this.utils.utilities.winCode;
        this.collection = this.utils.resFlowSession.resDoorObj.product.product['item_name'];
        this.doorDesign = this.utils.resFlowSession.resDoorObj.design.dsgn['item_name']
        this.doorModel = this.utils.resFlowSession.resDoorObj.construction.construction['ClopayModelNumber'];
        this.doorModelPrice = this.utils.resFlowSession.resDoorObj.construction.construction['item_price'];
        this.construction = this.utils.resFlowSession.resDoorObj.construction.construction['item_name'];
        this.color = this.utils.resFlowSession.resDoorObj.color.base['item_name'];
        this.colorPrice = this.utils.resFlowSession.resDoorObj.color.base['item_price'];
        this.topSection = this.utils.resFlowSession.resDoorObj.windows.topsection['item_name'];

        if (this.utils.resFlowSession.resDoorObj.hardware.handle != "") {
            this.hardware.push('Handles: ' + this.utils.resFlowSession.resDoorObj.hardware.handle['item_name']);

        }
        if (this.utils.resFlowSession.resDoorObj.hardware.stepplate != "") {
            this.hardware.push('Step Plate: ' + this.utils.resFlowSession.resDoorObj.hardware.stepplate['item_name']);
        }
        if (this.utils.resFlowSession.resDoorObj.hardware.hinge != "") {
            this.hardware.push('Hinges: ' + this.utils.resFlowSession.resDoorObj.hardware.hinge['item_name']);
        }
    }

    checkType(txt) {
        this.appComponent.selectedInstallDiy = txt;
    }

    navigateTo(path) {
        // this.appComponent.currScreen = this.appComponent.navElems.indexOf(path);
        this.route.navigateByUrl(path);
    }
    nextBtn(path) {
        this.navigateTo('/config/opener');
    }

    prevBtn() {
        this.navigateTo('/config/hardware');
    }

}
