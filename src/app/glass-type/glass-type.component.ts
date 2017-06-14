import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../app.component";
import { AppUtilities } from "../shared/appUtilities";
import { CollectionData } from "../collection/collection-data";
import { ConfigComponent } from "../config/config.component";
import { NavComponent } from "../nav/nav.component";
import { Router } from '@angular/router';

declare var _: any;
declare var $: any;

@Component({
  selector: 'app-glass-type',
  templateUrl: './glass-type.component.html',
  styleUrls: ['./glass-type.component.less']
})
export class GlassTypeComponent implements OnInit {

  constructor(private utils: AppUtilities
    , private dataStore: CollectionData
    , private navComponent: NavComponent
    , private app: AppComponent
    , private config: ConfigComponent
    , private route: Router) {

  }

  data = [];
  loaded = false;
  number = 4;
  folder = 'glass';

  imageURl = 'http://localhost:3435/assets/images/buttons';

  ngOnInit() {
this.config.detailsInfo.glassType = true;
    this.navComponent.renderNav({
      flowType: 'res',
      flowActiveStep: 8,
      currentStepUrl: '/config/glassType',
      showStepIndicator: true,
      nextStepFn: () => {

      }
    });
    this.config.pageTitle = '8.Choose Your Glass Type';

    this.loadData();
  }
  selected = 0;
  isSelected(postion) {
    return this.selected === postion;
  }
  loadData() {
    var topsection = this.utils.resFlowSession.resDoorObj.windows.topsection;
    if (topsection && topsection['glasstypes']) {
      var data = topsection['glasstypes']
      if (data) {
        this.data = _.chunk(data, 3);
        this.selected = 4;
      }
    }
    this.loaded = true;
  }

  nextBtn() {
    this.route.navigateByUrl('/config/hardware');
  }

  prevBtn() {
    this.resetPrice();
    this.route.navigateByUrl('/config/topSection');
  }

  setPlacement(position?) {
    let placement = {
      Config: "4",
      isdefualt: "true",
      item_description: "4th Row (TOP)",
      item_id: 4,
      item_name: "4th Row (TOP)",
      item_thumbnail: "btnWinPlace4Rnumber1.png",
    };
    this.selected = 4;
    if (position == 3) {
      this.selected = 3;
      placement = {
        Config: "3",
        isdefualt: "true",
        item_description: "3rd Row",
        item_id: 3,
        item_name: "3rd Row",
        item_thumbnail: "btnWinPlace4Rnumber2.png",
      };
    }

    this.utils.resFlowSession.resDoorObj.windows.placement = placement;
    this.config.renderCanvas();

  }

  resetPrice() {
    this.utils.resFlowSession.resDoorObj.windows.glasstype = null;
  }

}
