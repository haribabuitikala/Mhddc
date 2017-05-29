import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../app.component";
import { AppUtilities } from "../shared/appUtilities";
import { CollectionData } from "../collection/collection-data";
import { ConfigComponent } from "../config/config.component";
import { NavComponent } from "../nav/nav.component";
import { Router } from '@angular/router';

declare var _: any;

@Component({
  selector: 'app-non-classic',
  templateUrl: './non-classic.component.html',
  styleUrls: ['./non-classic.component.less']
})
export class NonClassicComponent implements OnInit {

  data = [];
  loaded = false;
  number = 4;
  folder = '';

  constructor(private utils: AppUtilities
    , private dataStore: CollectionData
    , private navComponent: NavComponent
    , private app: AppComponent
    , private config: ConfigComponent
    , private route: Router) { }


  loadData() {
    var topsection = this.utils.resFlowSession.resDoorObj.windows.topsection;
    if (topsection && topsection['glasstypes']) {
      var data = topsection['glasstypes']
      if (data) {
        this.data = _.chunk(data, 6);
      }
    }
    this.loaded = true;
  }

  ngOnInit() {
    this.navComponent.renderNav({
      flowType: 'res',
      flowActiveStep: 8,
      currentStepUrl: '/config/nonClassic',
      showStepIndicator: true,
      nextStepFn: () => {

      }
    });
    this.config.pageTitle = '8.Choose Your Glass Type';
    this.loadData();
  }

  nextBtn() {
    this.route.navigateByUrl('/config/hardware');
  }

  prevBtn() {
    this.route.navigateByUrl('/config/topSection');
  }

}
