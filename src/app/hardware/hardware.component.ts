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
    , private route: Router
    , private app: AppComponent) {
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
    handle: 0,
    stepplate: 0,
    hinge: 0
  };

  handlePlacementArr = [1];
  stepplatePlacementArr = [1];
  hingesPlacementArr = [1];

  handlePlacements = [];
  stepplatePlacements = [];
  hingePlacements = [];

  setHardwareMinMax(cname?) {
    let hardware = this.utils.resFlowSession.resDoorObj.hardware;
    if (!cname) {
      this.handlePlacementArr = [];
      this.handlePlacements = [];
      let handle = this.yourHandles[0][0];
      if (handle && handle != '') {
        if (handle['placementlist']) {
          let placements = handle['placementlist'].split(';');
          let arr1 = [];
          placements.forEach(h => {
            arr1.push(h.split(':')[0]);
            this.handlePlacements.push(h);
          });
          this.handlePlacementArr = arr1;
          this.countManager.handle = 0;
        }
      }

      this.stepplatePlacementArr = [];
      this.stepplatePlacements = [];
      let stepplate = this.yourStepPlates[0][0];
      if (stepplate && stepplate != '') {
        if (stepplate['placementlist']) {
          let placements = stepplate['placementlist'].split(';');
          let arr2 = [];
          placements.forEach(h => {
            arr2.push(h.split(':')[0]);
            this.stepplatePlacements.push(h);
          });
          this.stepplatePlacementArr = arr2;
          this.countManager.stepplate = 0;
        }
      }

      this.hingesPlacementArr = [];
      this.hingePlacements = [];
      let hinge = this.yourStepHinge[0][0];
      if (hinge && hinge != '') {
        if (hinge['placementlist']) {
          let placements = hinge['placementlist'].split(';');
          let arr3 = [];
          placements.forEach(h => {
            arr3.push(h.split(':')[0]);
            this.hingePlacements.push(h);
          });
          this.hingesPlacementArr = arr3;
          this.countManager.hinge = 0;
        }
      }

    } else {
      switch (cname) {
        case 'handles':
          this.handlePlacementArr = [];
          this.handlePlacements = [];
          if (hardware.handle && hardware.handle != '') {
            if (hardware.handle['placementlist']) {
              let placements = hardware.handle['placementlist'].split(';');
              let arr1 = [];
              placements.forEach(h => {
                arr1.push(h.split(':')[0]);
                this.handlePlacements.push(h);
              });
              this.handlePlacementArr = arr1;
              this.countManager.handle = 0;
            }
            this.utils.resFlowSession.resDoorObj.hardware.handle['count'] = this.countManager.handle;
            this.utils.resFlowSession.resDoorObj.hardware.handle['placement'] = this.handlePlacements[this.countManager.handle];
          }
          break;
        case 'stepplates':
          this.stepplatePlacementArr = [];
          this.stepplatePlacements = [];
          if (hardware.stepplate && hardware.stepplate != '') {
            if (hardware.stepplate['placementlist']) {
              let placements = hardware.stepplate['placementlist'].split(';');
              let arr2 = [];
              placements.forEach(h => {
                arr2.push(h.split(':')[0]);
                this.stepplatePlacements.push(h);
              });
              this.stepplatePlacementArr = arr2;
              this.countManager.stepplate = 0;
              this.utils.resFlowSession.resDoorObj.hardware.stepplate['count'] = this.countManager.stepplate;
              this.utils.resFlowSession.resDoorObj.hardware.stepplate['placement'] = this.stepplatePlacements[this.countManager.stepplate];
            }
          }
          break;
        case 'stephinges':
          this.hingesPlacementArr = [];
          this.hingePlacements = [];
          if (hardware.hinge && hardware.hinge != '') {
            if (hardware.hinge['placementlist']) {
              let placements = hardware.hinge['placementlist'].split(';');
              let arr3 = [];
              placements.forEach(h => {
                arr3.push(h.split(':')[0]);
                this.hingePlacements.push(h);
              });
              this.hingesPlacementArr = arr3;
              this.countManager.hinge = 0;

              //this.utils.resFlowSession.resDoorObj.hardware.hinge['count'] = this.countManager.hinge;
              //this.utils.resFlowSession.resDoorObj.hardware.hinge['placement'] = this.hingePlacements[this.countManager.hinge];
            }
          }
          break;
        default:
          break;
      }
    }

  }
  onHardwareSelected($event) {
    if ($event.subname) {
      this.setHardwareMinMax($event.subname);
    }
  }

  actionOnUpdateCount() {
    this.utils.resFlowSession.resDoorObj.hardware.handle['count'] = this.countManager.handle;
    this.utils.resFlowSession.resDoorObj.hardware.handle['placement'] = this.handlePlacements[this.countManager.handle];
    this.utils.resFlowSession.resDoorObj.hardware.stepplate['count'] = this.countManager.stepplate;
    this.utils.resFlowSession.resDoorObj.hardware.stepplate['placement'] = this.stepplatePlacements[this.countManager.stepplate];
    if (this.utils.resFlowSession.resDoorObj.hardware.hinge) {
      this.utils.resFlowSession.resDoorObj.hardware.hinge['count'] = this.countManager.hinge;
      this.utils.resFlowSession.resDoorObj.hardware.hinge['placement'] = this.hingePlacements[this.countManager.hinge];
    }

    let hardware = this.utils.resFlowSession.resDoorObj.hardware;
    hardware.items[0].count = this.countManager.handle;
    hardware.items[1].count = this.countManager.stepplate;
    hardware.items[2].count = this.countManager.hinge;

    this.app.updatePrice();
    this.config.renderCanvas();
  }

  updateCount(type, isincrement) {
    if (!isincrement) {
      switch (type) {
        case 'handle':
          if (this.countManager[type] > 0) {
            this.countManager[type] = this.countManager[type] - 1;
            this.actionOnUpdateCount();
          }
          break;
        case 'stepplate':
          if (this.countManager[type] > 0) {
            this.countManager[type] = this.countManager[type] - 1;
            this.actionOnUpdateCount();
          }
          break;
        case 'hinge':
          if (this.countManager[type] > 0) {
            this.countManager[type] = this.countManager[type] - 1;
            this.actionOnUpdateCount();
          }
          break;
        default:
          break;
      }
    } else if (isincrement) {
      switch (type) {
        case 'handle':
          if (this.countManager[type] < this.handlePlacementArr.length - 1) {
            this.countManager[type] = this.countManager[type] + 1;
            this.actionOnUpdateCount();
          }
          break;
        case 'stepplate':
          if (this.countManager[type] < this.stepplatePlacementArr.length - 1) {
            this.countManager[type] = this.countManager[type] + 1;
            this.actionOnUpdateCount();
          }
          break;
        case 'hinge':
          if (this.countManager[type] < this.hingesPlacementArr.length - 1) {
            this.countManager[type] = this.countManager[type] + 1;
            this.actionOnUpdateCount();
          }
          break;
        default:
          break;
      }
    }
  }

  hardwarePriceTot(price) {
    let resHard = this.utils.resFlowSession.resDoorObj.hardware;
    let utils = this.utils.utilities;
    if (resHard.handle && resHard.handle['count'] > 0) {
      utils.handlePrice = resHard.handle['count'] * resHard.handle['item_installed_price'];
    } else {
      utils.handlePrice = 0
    }
    if (resHard.stepplate && resHard.stepplate['count'] > 0) {
      utils.stepPlatePrice = resHard.stepplate['count'] * resHard.stepplate['item_installed_price'];
    } else {
      utils.stepPlatePrice = 0
    }

    if (resHard.hinge && resHard.hinge['count'] > 0) {
      utils.hingePrice = resHard.hinge['count'] * resHard.hinge['item_installed_price'];
    } else {
      utils.hingePrice = 0
    }

    utils.hardwarePrice = utils.handlePrice + utils.stepPlatePrice + utils.hingePrice;
  }
  updateLock(obj, event: any) {
    if (obj.item_price > 0) {
      this.utils.utilities.lockPrice = obj.item_price;
      //this.config.itemPrice = this.utils.calculateTotalPrice();
    } else {
      this.utils.utilities.lockPrice = 0;
    }
    this.utils.resFlowSession.resDoorObj.hardware.lock = obj;
    this.app.updatePrice();
  }

  isLockSelected(obj, isfirst) {
    var lockSelected = this.utils.resFlowSession.resDoorObj.hardware.lock;
    if (lockSelected && lockSelected['item_id'] == obj.item_id) {
      return true;
    } else if (isfirst && !lockSelected) {
      return true;
    }
    return false;
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
        let hardware = this.utils.resFlowSession.resDoorObj.hardware;

        hardware.apiData = res;

        let yourHandlesData = res[0]['LHDKS'];
        yourHandlesData = _.uniqBy(yourHandlesData, 'item_id');
        this.yourHandles = _.chunk(yourHandlesData, 3);
        this.hardwareItems(res[0]['LHDKS'], 0);

        // this.hardwareItems();
        let stepPlates = res[0]['StepPlates'];
        this.yourStepPlates = _.chunk(stepPlates, 4);
        this.hardwareItems(res[0]['StepPlates'], 1);

        let stepHinges = res[0]['StrapHinges'];
        this.hardwareItems(stepHinges, 2);
        stepHinges = _.uniqBy(stepHinges, 'item_id');
        this.yourStepHinge = _.chunk(stepHinges, 4);
        this.isLoaded = true;

        let yourLocksData = res[0]['Locks'];
        this.yourLocks = yourLocksData;
        if (yourLocksData && yourLocksData.length > 0) {
          this.hardwareItems(yourLocksData[0], 0);
        }

        this.setHardwareMinMax();
      }
    );
  }
  hardwareItems(obj, id) {
    if (obj[0]) {
      let hardware = this.utils.resFlowSession.resDoorObj.hardware;
      id = {
        name: obj[0].item_name,
        price: obj[0].item_price,
        count: 1
      }
      hardware.items.push(id);

    }
  }
  ngOnInit() {
    this.utils.resFlowSession.resDoorObj.resethardware();
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
    // this.hardwareItems();
  }
  navigateTo(path) {
    // this.appComponent.currScreen = this.appComponent.navElems.indexOf(path);
    this.route.navigateByUrl(path);
  }



  nextBtn(path) {
    this.navigateTo('/config/install');
  }

  prevBtn() {
    this.resetPrice();
    this.utils.resFlowSession.resDoorObj.resetFromStep(6);
    this.navigateTo('/config/topSection');
  }

  resetPrice() {
    this.utils.resFlowSession.resDoorObj.hardware.handle = null;
    this.utils.resFlowSession.resDoorObj.hardware.stepplate = null;
    this.utils.resFlowSession.resDoorObj.hardware.hinge = null;
  }
}



