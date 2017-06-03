import { Component, OnInit } from '@angular/core';
import { CollectionData } from "../collection/collection-data";
import { Router } from '@angular/router';
import { CollectionService } from "../shared/data.service";
import { NavComponent } from "../nav/nav.component";
import { ConfigComponent } from "../config/config.component";
import { AppUtilities } from "../shared/appUtilities";


declare var _: any;

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
    , private navComponent: NavComponent
    , private dataService: CollectionService) {
  }

  data;
  number = 6;
  folder = 'top-section/slider';

  ngOnInit() {
    this.startProcess();
  }

  startProcess() {
    let res = this.dataStore.topSection;
    this.data = _.chunk(res, 6);

    this.navComponent.renderNav({
      flowType: 'res',
      flowActiveStep: 7,
      currentStepUrl: '/config/topSection',
      showStepIndicator: true,
      nextStepFn: () => {

      }
    });

    this.config.pageTitle = '7.Choose Your Top Section';

    this.utils.resFlowSession.resDoorObj.windows.topsection = res[0];
  }

  nextBtn(path?, longPanel?) {
    this.navComponent.setNavFlow('res', '');
    var topsection = this.utils.resFlowSession.resDoorObj.windows.topsection;
    if (topsection && topsection['glasstypes']) {
      if (topsection['glasstypes'][0].item_price <= 0 || topsection['Config'] == 'GLAZ-SOL') {
        this.navComponent.setNavFlow('res', 'hideglass');
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
      this.route.navigateByUrl('/config/nonClassic');
    }
  }

  prevBtn() {
    this.route.navigateByUrl('/config/color');
  }

  nextPage() {
    if (this.utils.resFlowSession.resDoorObj.product.product['item_id'] == 13 ||
      this.utils.resFlowSession.resDoorObj.product.product['item_id'] == 14 ||
      this.utils.resFlowSession.resDoorObj.product.product['item_id'] == 24) {
      this.route.navigateByUrl('/config/glassType');
    } else {
      this.route.navigateByUrl('/config/nonClassic');
    }
  }
}
