import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../app.component";
import { AppUtilities } from "../shared/appUtilities";
import { CollectionData } from "../collection/collection-data";
import { ConfigComponent } from "../config/config.component";
import { NavComponent } from "../nav/nav.component";
import { Router } from '@angular/router';

declare var _: any;
declare var ga:Function; 

@Component({
  selector: 'app-non-classic',
  templateUrl: './non-classic.component.html',
  styleUrls: ['./non-classic.component.less']
})
export class NonClassicComponent implements OnInit {

  data = [];
  loaded = false;
  number = 4;
  folder = 'glass';

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
    let detailsInfo = this.config.detailsInfo;
    detailsInfo.Hardware = false;
    detailsInfo.glassType = true;
    detailsInfo.Opener = false;


    this.navComponent.renderNav({
      flowType: 'res',
      flowActiveStep: 8,
      currentStepUrl: '/config/nonClassic',
      showStepIndicator: true,
      pageTitle: 'Choose Your Glass Type',
      nextStepFn: () => {

      }
    });
    this.loadData();
  }

  nextBtn() {
    ga('send', { hitType: 'event', eventCategory: 'Click', eventAction: 'glass Type Choosed ', eventLabel: 'nextBtn' });
    this.route.navigateByUrl('/config/hardware');
  }

  prevBtn() {
    this.route.navigateByUrl('/config/topSection');
  }

}
