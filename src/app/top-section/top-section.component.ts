import { Component, OnInit } from '@angular/core';
import { CollectionData } from "../collection/collection-data";
import { Router } from '@angular/router';
import { CollectionService } from "../shared/data.service";
import { NavComponent } from "../nav/nav.component";
import { ConfigComponent } from "../config/config.component";
import { AppUtilities } from "../shared/appUtilities";
import { AppComponent } from '../app.component';


declare var _: any;
declare var ga:Function;
@Component({
  selector: 'app-top-section',
  templateUrl: './top-section.component.html',
  styleUrls: ['./top-section.component.less']
})
export class TopSectionComponent implements OnInit {

  constructor(private dataStore: CollectionData
    , private route: Router
    , private config: ConfigComponent
    , private utils: AppUtilities
    , private app: AppComponent
    , private navComponent: NavComponent
    , private dataService: CollectionService) {
  }

  data;
  number = 6;
  folder = 'top-section/slider';

  ngOnInit() {
    this.utils.resFlowSession.resDoorObj.resetwindows();
    this.startProcess();
  }

  startProcess() {


    // setting the details info
    let detailsInfo = this.config.detailsInfo;
    detailsInfo.topSection = true;
    detailsInfo.Hardware = false;
    detailsInfo.glassType = false;
    detailsInfo.Opener = false;
    let res = this.dataStore.topSection;
    this.data = _.chunk(res, 6);

    this.navComponent.renderNav({
      flowType: 'res',
      flowActiveStep: 7,
      currentStepUrl: '/config/topSection',
      showStepIndicator: true,
      pageTitle: 'Choose Your Top Section',
      nextStepFn: () => {

      }
    });

    this.utils.resFlowSession.resDoorObj.windows.topsection = res[0];
  }

  nextBtn(path?, longPanel?) {
     ga('send', { hitType: 'event', eventCategory: 'Click', eventAction: 'NextStep-TopSection-GD', eventLabel: 'nextBtn' });
    this.navComponent.setNavFlow('res', '');
    var topsection = this.utils.resFlowSession.resDoorObj.windows.topsection;
    if (topsection && topsection['glasstypes']) {
      if (topsection['glasstypes'][0].item_price <= 0 || topsection['Config'] == 'GLAZ-SOL' || topsection['glasstypes'][0]['Config'] == 'GLAZ-SOL') {
        this.navComponent.setNavFlow('res', 'hideglass');
        this.app.configSteps[10].enabled = false;
        this.app.configSteps[11].enabled = false;
        this.route.navigateByUrl('/config/hardware');
      } else {
        var modelString = "HDP20, HDP13,HDG,2050,HDS,HDB,HDB4";
        var modelNumber = this.utils.resFlowSession.resDoorObj.construction.construction['ClopayModelNumber'];
        var modelIndex = modelString.indexOf(modelNumber);
        var topName = topsection['item_name'];
        topName = topName.toLowerCase();
        var topId = topsection['item_id'];
        let pid = this.utils.resFlowSession.resDoorObj.product.product['item_id'];
        if ((pid == 13 || pid == 14 || pid == 24) && (modelIndex > -1) && (topName.indexOf("long") > -1 || topId == "315" || topId == "316"
          || topId == "317" || topId == "318" || topId == "393" || topId == "394" || topId == "319" || topId == "320" || topId == "1506" || topId == "1507" || topId == "1508")) {
          longPanel.open();
        } else {
          this.nextPage();
        }


      }
    } else {
      this.app.configSteps[11].enabled = true;
      this.route.navigateByUrl('/config/nonClassic');
    }
  }

  prevBtn() {
    this.resetPrice();
    this.utils.resFlowSession.resDoorObj.resetFromStep(5);
    this.route.navigateByUrl('/config/color');
  }

  nextPage() {
    if (this.utils.resFlowSession.resDoorObj.product.product['item_id'] == 13 ||
      this.utils.resFlowSession.resDoorObj.product.product['item_id'] == 14 ||
      this.utils.resFlowSession.resDoorObj.product.product['item_id'] == 24) {
        this.app.configSteps[10].enabled = true;
        this.route.navigateByUrl('/config/glassType');
    } else {
      this.app.configSteps[11].enabled = true;
      this.route.navigateByUrl('/config/nonClassic');
    }
  }

  resetPrice() {
    this.utils.resFlowSession.resDoorObj.windows.glasstype = null;
  }
}
