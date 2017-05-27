import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../app.component";
import { Router } from '@angular/router';
import { ConfigComponent } from "../config/config.component";
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-hardware',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.less']
})
export class HardwareComponent implements OnInit {

  constructor(private appComponent: AppComponent
    , private config: ConfigComponent
    , private navComponent: NavComponent
    , private route: Router) {
  }


  ngOnInit() {
    this.navComponent.renderNav({
      flowType: 'res',
      flowActiveStep: 9,
      currentStepUrl: '/config/hardware',
      showStepIndicator: true,
      nextStepFn: () => {

      }
    });
    this.config.pageTitle = '9.Choose Your Hardware';
  }
  navigateTo(path) {
    // this.appComponent.currScreen = this.appComponent.navElems.indexOf(path);
    this.route.navigateByUrl(path);
  }
}



