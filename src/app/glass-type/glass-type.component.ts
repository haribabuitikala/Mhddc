import { Component, OnInit } from '@angular/core';
import { ConfigComponent } from "../config/config.component";
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-glass-type',
  templateUrl: './glass-type.component.html',
  styleUrls: ['./glass-type.component.less']
})
export class GlassTypeComponent implements OnInit {

  constructor(private config: ConfigComponent
    , private navComponent: NavComponent) {

  }

  ngOnInit() {

    this.navComponent.renderNav({
      flowType: 'res',
      flowActiveStep: 8,
      currentStepUrl: '/config/glassType',
      showStepIndicator: true,
      nextStepFn: () => {
        
      }
    });
    this.config.pageTitle = '8.Choose Your Glass Type';
  }

}
