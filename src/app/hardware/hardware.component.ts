import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../app.component";
import { Router } from '@angular/router';
import { ConfigComponent } from "../config/config.component";
import { CollectionService } from "../shared/data.service";
import { NavComponent } from "../nav/nav.component";
import { AppUtilities } from "../shared/appUtilities";

declare var _: any;

@Component({
  selector: 'app-hardware',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.less']
})
export class HardwareComponent implements OnInit {

  constructor(private appComponent: AppComponent
    , private config: ConfigComponent
    , private utils: AppUtilities
    , private dataService: CollectionService
    , private navComponent: NavComponent
    , private route: Router) {
  }

  isLoaded = false;
  yourHandles = [];
  yourHandlersNumber = 4;

  yourStepPlates = [];
  youStepPlatesNumber = 6;

  yourStepHinge = [];
  youStephingeNumber = 6;

  yourLocks = [];


  countManager = {
    handle: 1,
    stepplate: 1,
    hinge: 1
  };

  updateCount(type, isincrement) {
    if (!isincrement && this.countManager[type] > 0 && this.countManager[type] > 1) {
      this.countManager[type] = this.countManager[type] - 1;
    } else if(isincrement && this.countManager[type] > 0 && this.countManager[type] < 6) {
      this.countManager[type] = this.countManager[type] + 1;
    }

    this.utils.resFlowSession.resDoorObj.hardware.handle['count'] = this.countManager.handle;
    this.utils.resFlowSession.resDoorObj.hardware.stepplate['count'] = this.countManager.stepplate;
    this.utils.resFlowSession.resDoorObj.hardware.hinge['count'] = this.countManager.hinge;




    // this.utils.utilities.handlePrice = this.utils.resFlowSession.resDoorObj.hardware[type].item_price * this.countManager[type];

    this.config.itemPriceInstall = this.utils.calculateTotalPrice(this.utils.utilities.itemPriceInstall);
    this.config.itemPriceDY = this.utils.calculateTotalPrice(this.utils.utilities.itemPriceDY);

    this.config.renderCanvas();
  }
  hardwarePriceTot(price) {
    let resHard = this.utils.resFlowSession.resDoorObj.hardware;
    let utils = this.utils.utilities;
    if (resHard.handle['count'] > 0) {
      utils.handlePrice = resHard.handle['count'] * resHard.handle['item_installed_price'];
    } else {
      utils.handlePrice = 0
    }
    if (resHard.stepplate['count'] > 0) {
      utils.stepPlatePrice = resHard.stepplate['count'] * resHard.stepplate['item_installed_price'];
    } else {
      utils.stepPlatePrice = 0
    }

    if (resHard.hinge['count'] > 0) {
      utils.hingePrice = resHard.hinge['count'] * resHard.hinge['item_installed_price'];
    } else {
      utils.hingePrice = 0
    }

    utils.hardwarePrice = utils.handlePrice + utils.stepPlatePrice + utils.hingePrice;
  }
  updateLock(obj, event: any) {
    if (obj.item_price > 0) {
      this.utils.utilities.lockPrice = obj.item_price;
      // this.config.itemPrice = this.utils.calculateTotalPrice();
    }
  }
  loadData() {
    var resDoorObj = this.utils.resFlowSession.resDoorObj;
    var params = {
      productid: resDoorObj.product.product['item_id'],
      natmarketid: this.utils.utilities.natmarketid,
      windcode: resDoorObj.product.product['windcode'],
      designid: resDoorObj.design.dsgn['item_id'],
      drows: resDoorObj.design.dsgn['Rows'],
      dcolumns: resDoorObj.design.dsgn['Columns'],
      lang: 'en',
      marketid: this.utils.utilities.localmarketid,
      localmarketid: this.utils.utilities.localmarketid,
      clopaymodelnumber: resDoorObj.construction.construction['ClopayModelNumber'],
      doorsize: +this.utils.utilities.homeSize,
      dwidthFt: this.utils.utilities.wf,
      dwidthIn: this.utils.utilities.wi,
      dheightFt: this.utils.utilities.hf,
      dheightIn: this.utils.utilities.hi
    };


    this.dataService.getHardware(params).subscribe(
      res => {
        this.utils.resFlowSession.resDoorObj.hardware.apiData = res;
        let yourHandlesData = res[0]['LHDKS'];
        yourHandlesData = _.uniqBy(yourHandlesData, 'item_id');
        this.yourHandles = _.chunk(yourHandlesData, 3);

        let stepPlates = res[0]['StepPlates'];
        this.yourStepPlates = _.chunk(stepPlates, 4);

        let stepHinges = res[0]['StrapHinges'];
        stepHinges = _.uniqBy(stepHinges, 'item_id');
        this.yourStepHinge = _.chunk(stepHinges, 4);
        this.isLoaded = true;

        let yourLocksData = res[0]['Locks'];
        this.yourLocks = yourLocksData;
      }
    );
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

    this.loadData();
  }
  navigateTo(path) {
    // this.appComponent.currScreen = this.appComponent.navElems.indexOf(path);
    this.route.navigateByUrl(path);
  }



  nextBtn(path) {
    this.navigateTo('/config/install');
  }

  prevBtn() {
    this.navigateTo('/config/topSection');
  }
}



