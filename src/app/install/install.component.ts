import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../app.component";
import { Router } from '@angular/router';
import { ConfigComponent } from "../config/config.component";
import { NavComponent } from "../nav/nav.component";

@Component({
    selector: 'app-install',
    templateUrl: './install.component.html',
    styleUrls: ['./install.component.less']
})
export class InstallComponent implements OnInit {

    constructor(private appComponent: AppComponent
        , private navComponent: NavComponent
        , private config: ConfigComponent
        , private route: Router) {
    }




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
