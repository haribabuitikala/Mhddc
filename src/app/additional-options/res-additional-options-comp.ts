import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from "../app.component";
import { AppUtilities } from "../shared/appUtilities";
import { NavService } from "../nav/nav-service";
import { NavComponent } from "../nav/nav.component";
import { CollectionData } from "../collection/collection-data";
import { CollectionService } from "../shared/data.service";
import { ConfigComponent } from "../config/config.component";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
declare var $: any;
declare var _: any;


@Component({
    selector: 'app-res-additional-options',
    templateUrl: './res-additional-options-comp.html',
    styleUrls: ['./additional-options.component.less']
})
export class ResAdditionalOptionsComponent implements OnInit {
    //install

    @ViewChild('resInstallFlowMed') resInstallFlowMed: ModalComponent;
    @ViewChild('resInstallFlowMiles') resInstallFlowMiles: ModalComponent;
    @ViewChild('resInstallFlowHeadRoom') resInstallFlowHeadRoom: ModalComponent;
    @ViewChild('resFlowReleaseKit') resFlowReleaseKit: ModalComponent;
    //diy 
    @ViewChild('resDiyFlowHeadRoom') resDiyFlowHeadRoom: ModalComponent;
    @ViewChild('resDiyFlowMiles') resDiyFlowMiles: ModalComponent;
    @ViewChild('resDiyPerimeterSeal') resDiyPerimeterSeal: ModalComponent;
    @ViewChild('resDiyHangerKit') resDiyHangerKit: ModalComponent;
    @ViewChild('resDiyReleaseKit') resDiyReleaseKit: ModalComponent;
    @ViewChild('resDiyBottomWeatherSeal') resDiyBottomWeatherSeal: ModalComponent;
    @ViewChild('resDiyReinforcement') resDiyReinforcement: ModalComponent;


    showMiles = true;
    pageNo;
    showMenu;
    data;
    questions;
    gdoFlow = this.utils.utilities.isGDO;
    distance: any;
    distancePrice;
    showDistancePrice;
    directFlow = this.utils.utilities.directFlow;
    hidePrev = false;
    singleDrop = false;
    doubleDrop = false;
    gdoFlowManualDoorInfo = false;
    gdoFlowPowerHeadInfo = false;
    gdoOpenerSelected = this.dataStore.gdoOpenerAccessories;
    installOrDiy;
    resAdditionalQuestions;
    resDiyQuestions;
    resInstallQuestions;
    showMedImg;
    showInstallMiles;
    defaultMiles: any = 31;
    moreMiles;
    updatedMiles;
    defaultMilesDiy: any;
    vinyls;
    installMed;
    installMiles;
    installHeadRoom;
    installReleaseKit;
    aditionalDiyPrice;
    flow = 'res';
    singleOpener = 0;
    doubleOpener = 0;
    mileOpenPr = 0;
    qty = this.utils.utilities.gdoOpenerQty;
    directDoorVal = 1;
    singleDropVal;
    doubleDropVal;
    itmObj;
    globalPrice = 0;
    stopMods;
    selectedVinyl = {
        heightitem_price: 0,
        heightpartid: "",
        heightqty: 0,
        isdefault: false,
        item_description: null,
        item_id: 0,
        item_name: "",
        item_price: 0,
        item_thumbnail: null,
        widthitem_price: 0,
        widthpartid: null,
        widthqty: 0
    };


    // options
    medallion = true;
    milesAway = true;
    conversionKit = true;
    emergencyKit = true;
    showORB = false;

    t = _.sumBy(this.gdoOpenerSelected, function (o) {
        return o.price * o.count
    });

    selectedLock = '';
    selectedDIYLock = '';

    // for gdo the pageNo will be 3
    // for residential the pageNo will be
    constructor(private appComponent: AppComponent
        , private utils: AppUtilities
        , private route: Router
        , private navComp: NavService
        , private dataStore: CollectionData
        , private activeRoute: ActivatedRoute
        , private config: ConfigComponent
        , private navComponent: NavComponent
        , private dataService: CollectionService) {
    }

    setNavComponent() {
        if (this.navComponent.flowType === 'res') {
            this.navComponent.renderNav({
                flowType: 'res',
                flowActiveStep: 12,
                currentStepUrl: '/config/additionalOptions',
                showStepIndicator: true,
                pageTitle: 'Additional Options',
                nextStepFn: () => {

                }
            });

        } else {
            this.navComponent.renderNav({
                flowType: 'resquick',
                flowActiveStep: 8,
                currentStepUrl: '/config/additionalOptions',
                showStepIndicator: true,
                pageTitle: 'Additional Options',
                nextStepFn: () => {

                }
            });
        }
    }

    ngOnInit() {
        if (this.utils.resFlowSession.cart && this.utils.resFlowSession.cart.length > 0) {
            for (let m = 0; m < this.utils.resFlowSession.cart.length; m++) {
                let moreThan32Miles = _.findIndex(this.utils.resFlowSession.cart[m].additionalOptions.items, { id: 5 });
                if (moreThan32Miles !== -1) {
                    this.showMiles = false;
                    break;
                }
            }
        }
        this.utils.resFlowSession.resDoorObj.resetadditional();
        this.installOrDiy = this.utils.resFlowSession.resDetails.isDIY ? 'DIY' : 'Installed';

        this.appComponent.next = 'Next';
        this.pageNo = this.utils.utilities.currPage;
        this.setNavComponent();
        let resDoorObj = this.utils.resFlowSession.resDoorObj;
        let dataParams = {
            "NatMarketID": this.utils.utilities.natmarketid,
            "localmarketid": parseInt(this.utils.utilities.localmarketid),
            "productid": resDoorObj.product.product['item_id'],
            "dwidthFt": this.utils.utilities.wf,
            "dwidthIn": this.utils.utilities.wi,
            "dheightFt": this.utils.utilities.hf,
            "dheightIn": this.utils.utilities.hi,
            "clopaymodelnumber": resDoorObj.construction.construction['ClopayModelNumber'],
            "dtype": _.upperCase(this.utils.resFlowSession.orderObj.QPB ? 'qpb' : this.utils.utilities.dtype),
            "storeNumber": this.utils.utilities.storenumber,
            "colorConfig": resDoorObj.color.base['colorconfig'],
            "lang": this.utils.utilities.lang
        }
        this.dataService.getInstallDiyq(dataParams).subscribe(res => {
            this.resAdditionalQuestions = res;
            this.resDiyQuestions = _.filter(this.resAdditionalQuestions, ['item_type', 'DIY']);
            let resInstallQuestions = _.filter(this.resAdditionalQuestions, ['item_type', 'INSTALL']);
            if (this.utils.resFlowSession.resDoorObj.product.product['item_id'] !== 9) {
                this.resInstallQuestions = _.filter(resInstallQuestions, (itm) => {
                    return itm['item_id'] !== 6;
                });
            } else {
                this.resInstallQuestions = resInstallQuestions;
            }
            this.stopMods = _.filter(this.resAdditionalQuestions, ['item_id', 99]);
            this.UpdateStopMods(this.stopMods[0], this.utils.resFlowSession.resDoorObj);
            //ORB - Operator Reinforcement Bracket(additional Option)
            let arrDonotShowORB = JSON.stringify(this.utils.allowMods);
            let selectedModel = resDoorObj.construction.construction['ClopayModelNumber'];
            this.showORB = arrDonotShowORB.indexOf(selectedModel) !== -1 ? true : false;
            if (!this.showORB) {
                //  this.resDiyQuestions
                //  this.resDiyQuestions.splice(indexValueOfArray,1);
                var data = $.grep(this.resDiyQuestions, function (e) {
                    return e.item_id != 2;
                });

                this.resDiyQuestions = data;
            }
            if (this.resInstallQuestions) {
                let lockQuestion = _.filter(this.resInstallQuestions, {
                    item_id: 13
                });
                if (lockQuestion.length > 0) {
                    if (lockQuestion[0].Answers.length > 0 && lockQuestion[0].Answers[0].isdefault) {
                        this.selectedLock = lockQuestion[0].Answers[0];
                    }
                }
            }
            if (this.resDiyQuestions) {
                let lockQuestion = _.filter(this.resDiyQuestions, {
                    item_id: 13
                });
                if (lockQuestion.length > 0) {
                    if (lockQuestion[0].Answers.length > 0 && lockQuestion[0].Answers[0].isdefault) {
                        this.selectedDIYLock = lockQuestion[0].Answers[0];
                    }
                }
            }
            //console.log("one"+JSON.stringify(this.resDiyQuestions[2].Answers[1].vinyls));
            this.vinyls = _.uniqBy(this.resDiyQuestions[1].Answers[1].vinyls, function (o) {
                return o.item_name;
            });
            this.selectedVinyl = this.vinyls[this.vinyls.length - 1];
            if (!this.utils.resFlowSession.resDetails.isDIY && this.utils.resFlowSession.resDoorObj.product.product['item_id'] !== 16) {
                this.installQuestionsOptions(true, this.resInstallQuestions[0]);
                this.appComponent.updatePrice();
            }
        },
            error => {
                this.utils.removeLoader();
                this.dataService.handleError();
            }
        );
        if (this.installOrDiy == 'Installed') {
            this.showMedImg = true;
        }
    }

    UpdateStopMods(cs, cObj) {
        $.each(cs.Answers[1].stopMolds, function (index, value) {
            var sm = {
                storeNumber: value.storeNumber,
                partId: value.partId,
                color: value.color,
                dimension: value.dimension,
                qty: value.qty
            }

            cObj.stopMold.items.push(sm)
        });
    }

    nextBtn(path) {
        this.route.navigateByUrl('/config/doorConfiguration');
    }

    prevBtn(path) {
        this.resetPrice();
        this.utils.resFlowSession.resDoorObj.resetFromStep(8);
        if (this.utils.resFlowSession.resDoorObj.INSTALLTYPE === 'DIY') {
            this.route.navigateByUrl('/config/install');
        } else {
            this.route.navigateByUrl('/config/opener');
        }
    }

    resetPrice() {
        this.utils.resFlowSession.resDoorObj.additional.items = [];
    }

    installQuestionsPopup(installQuestions) {
        if (installQuestions.item_id == 7) {
            this.resInstallFlowMed.open();
        } else if (installQuestions.item_id == 5) {
            this.resInstallFlowMiles.open();
        } else if (installQuestions.item_id == 4) {
            this.resInstallFlowHeadRoom.open();
        } else if (installQuestions.item_id == 11) {
            this.resFlowReleaseKit.open();
        }
    }

    diyQuestionsPopup(diyQuestions) {
        if (diyQuestions.item_id == 5) {
            this.resDiyFlowMiles.open();
        } else if (diyQuestions.item_id == 1) {
            this.resDiyPerimeterSeal.open();
        } else if (diyQuestions.item_id == 4) {
            this.resDiyFlowHeadRoom.open();
        } else if (diyQuestions.item_id == 3) {
            this.resDiyHangerKit.open();
        } else if (diyQuestions.item_id == 11) {
            this.resDiyReleaseKit.open();
        } else if (diyQuestions.item_id == 12) {
            this.resDiyBottomWeatherSeal.open();
        } else if (diyQuestions.item_id == 2) {
            this.resDiyReinforcement.open();
        }

    }

    installQuestionsOptions(itm, obj, event?) {
        this.itmObj = this.utils.resFlowSession.resDoorObj.additional;
        let k = {
            id: obj.item_id,
            name: obj.item_name,
            price: obj.Answers[1].item_price,
            objVal: obj,
            selectedMiles: this.defaultMiles
        }
        let n: any;
        if (obj.item_id === 13) {
            if (!event) {
                itm = false;
            } else if (event && event.item_id === 32) {
                itm = false;
            }
        } else {
            if(itm && obj.item_id === 6){
                k.price = 79;
            }
            n = obj.item_list_text.split('<span class="text-orange">').join('').split('</span>').join('').replace('?', '').replace('$' + k.price, '').trim();
        }

        if (itm) {
            switch (obj.item_id) {
                case 7:
                case 4:
                case 11:
                    obj.item_list_text = n + '<span class="text-orange"> $' + k.price + '</span>?';
                    this.itmObj.items.push(k);
                    break;
                case 5:
                    this.removeItmOptions(obj.item_id);
                    break;
                case 6:
                    this.removeItmOptions(obj.item_id);
                    this.itmObj.items.push(k);
                    break;    
                case 13:
                    this.removeItmOptions(obj.item_id);
                    this.itmObj.items.push(k);
                    break;
            }
        } else {
            switch (obj.item_id) {
                case 7:
                case 4:
                case 11:
                    obj.item_list_text = n + '?';
                    this.removeItmOptions(obj.item_id);
                    break;
                case 5:
                    this.defaultMiles = 31;
                    k.price = this.calculateMilesPrice();
                    this.itmObj.items.push(k);
                    break;
                case 6:
                    this.removeItmOptions(obj.item_id);
                    break;    
                case 13:
                    this.removeItmOptions(obj.item_id);
                    break;
            }
        }
        this.appComponent.updatePrice();
    }

    calculateMilesPrice() {
        //this.stopMods = _.filter(this.resAdditionalQuestions, ['item_id', 99]);
        var additionalMileage = _.filter(this.utils.resFlowSession.resDoorObj.additional.items, ['id', 5]);
        if (additionalMileage) {
            additionalMileage.selectedMiles = this.defaultMiles;
        }
        if (this.utils.resFlowSession.resDoorObj.TYPE === "RES") {
            //Bug ID : 5782
            if (this.utils.resFlowSession.resDoorObj.INSTALLTYPE === 'DIY') {
                if (this.defaultMiles < 31) {
                    return 0;
                } else if (this.defaultMiles == 31) {
                    return 3;
                } else if (this.defaultMiles > 31) {
                    return (3 + ((this.defaultMiles - 31) * 3));
                }
            }
            else {
                if (this.defaultMiles < 31) {
                    return 0;
                } else if (this.defaultMiles >= 31 && this.defaultMiles < 51) {
                    return 51;
                } else if (this.defaultMiles > 50) {
                    return 51 + (this.defaultMiles - 50) * 3;
                }
            }

        } else {
            if (this.defaultMiles < 31) {
                return 0;
            } else if (this.defaultMiles > 31) {
                return (this.defaultMiles - 31) * 3;
            }
        }
    }

    updatePrice() {
        let k = _.findIndex(this.itmObj.items, { id: 5 });
        this.itmObj.items[k].price = this.calculateMilesPrice();
        this.appComponent.updatePrice();
    }

    removeItmOptions(id) {
        this.itmObj.items = this.itmObj.items.filter(function (el) {
            return el.id != id;
        });
    }

    diyQuestionsOptions(itm, obj, event?) {
        this.itmObj = this.utils.resFlowSession.resDoorObj.additional;
        let k = {
            id: obj.item_id,
            name: obj.item_name,
            price: obj.Answers[1].item_price,
            objVal: obj
        }
        if (obj.item_id === 1) {
            if (event) {
                this.selectedVinyl = this.vinyls[this.vinyls.length - 1];
            }
            k.name = this.selectedVinyl.item_name;
            k.price = this.selectedVinyl.item_price;
        }
        let n: any;
        if (obj.item_id === 13) {
            if (!event) {
                itm = false;
            } else if (event && event.item_id === 32) {
                itm = false;
            } else if (event && !event.item_id ) {
                itm = false;
            }
        } else {
            n = obj.item_list_text.split('<span class="text-orange">').join('').split('</span>').join('').replace('?', '').replace('$' + k.price, '').trim().split('$')[0].trim();
        }
        if (itm) {
            switch (obj.item_id) {
                case 1:
                case 2:
                    k.price = this.calculateORBPrice(obj);
                    if (obj.item_id === 1) {
                        k.price = this.selectedVinyl.item_price;
                    }
                    obj.item_list_text = n + '<span class="text-orange"> $' + k.price + '</span>?';
                    this.removeItmOptions(obj.item_id);
                    this.itmObj.items.push(k);
                    break;
                case 3:
                case 4:
                case 11:
                case 12:
                    if (obj.item_id === 12 && obj.Answers[1].seals && obj.Answers[1].seals[0].item_price > 0) {
                        k.price = obj.Answers[1].seals[0].item_price;
                    }
                    obj.item_list_text = n + '<span class="text-orange"> $' + k.price + '</span>?';
                    this.removeItmOptions(obj.item_id);
                    this.itmObj.items.push(k);
                    break;
                case 5:
                    this.removeItmOptions(obj.item_id);
                    break;
                case 13:
                    this.removeItmOptions(obj.item_id);
                    this.itmObj.items.push(k);
                    break;

            }
        } else {
            switch (obj.item_id) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 11:
                case 12:
                    obj.item_list_text = n + '?';
                    this.removeItmOptions(obj.item_id);
                    break;
                case 5:
                    this.defaultMiles = 31;
                    k.price = this.calculateMilesPrice();
                    this.itmObj.items.push(k);
                    break;
                case 13:
                    this.removeItmOptions(obj.item_id);
                    break;

            }
        }
        this.appComponent.updatePrice();
    }

    calculateORBPrice(obj) {
        var orbPrice = 0;
        var orbResult = obj.Answers[1].orbdata;
        if (orbResult.length > 0) {
            for (var orbCount = 0; orbCount < orbResult.length; orbCount++) {
                var orbQuantity = Number(orbResult[orbCount].quantity);
                orbPrice += (Number(orbResult[orbCount].item_price) * Number(orbQuantity));
            }
        }
        else {
            orbPrice = obj.Answers[1].item_price;
        }

        return orbPrice;
    }

    selectedVinyls(vin, diyQuestion) {
        let k = _.findIndex(this.resDiyQuestions, { 'item_id': diyQuestion.item_id });
        if (vin) {
            if (vin.item_id !== -1) {
                this.selectedVinyl = vin;
                this.diyQuestionsOptions(true, this.resDiyQuestions[k]);
            } else {
                this.diyQuestionsOptions(false, this.resDiyQuestions[k]);
                this.selectedVinyl = vin;
            }
        }
    }

    showPowerHead(itm) {
        if (itm.srcElement.checked === true) {
            this.gdoFlowPowerHeadInfo = false;
        } else {

            this.gdoFlowPowerHeadInfo = true;
        }
    }

    directDoor(event, flow) {
        let val = +event.target.value;
        this.directDoorVal = +event.target.value;
        let k = flow;
        if (flow === 0) {
            this.singleOpener = 0;
            this.singleOpener = 50 * (val);
            k = {
                name: "Single Door New Opener Installation Kit. This is required when no Opener is currently installed on door less than 10' wide.",
                price: this.singleOpener,
                id: 0,
                count: val //=== 1 ? val = 1 : val - 1
            };
            this.utils.utilities.gdoSingleDoor = k.price;
            this.utils.utilities.singlep = 0;
        } else {
            this.doubleOpener = 0;
            this.doubleOpener = 65 * (val);
            k = {
                name: "Double Door New Opener Installation Kit. This is required when no Opener is currently installed on door less than 10' wide.",
                price: this.doubleOpener,
                id: 1,
                count: val //=== 1 ? val = 1 : val - 1
            };
            this.utils.utilities.gdoDoubleDoor = k.price;
            this.utils.utilities.doublep = 0;
        }
        // this.gdoConfig.itemPrice += k.price;
        // this.dataStore.gdoDirectQuestions.splice(flow, 1);
        this.dataStore.gdoDirectQuestions = this.dataStore.gdoDirectQuestions.filter(function (el) {
            return el.id != flow;
        });
        this.dataStore.gdoDirectQuestions.push(k);
        let kPrice = _.sumBy(this.dataStore.gdoDirectQuestions, function (o) {
            return o.price;
        });
        this.utils.utilities.kPrice = kPrice;
    }

    removeItm(flow) {
        this.dataStore.gdoDirectQuestions = this.dataStore.gdoDirectQuestions.filter(function (el) {
            return el.id != flow;
        });
        this.utils.utilities.doublep = 0;
        this.utils.utilities.singlep = 0;
        let kPrice = _.sumBy(this.dataStore.gdoDirectQuestions, function (o) {
            return o.price;
        });
        return kPrice;
    }

    updateDistance(itm, flow) {
        this.utils.utilities.distance = +itm.target.value;

        let miles = +itm.target.value;
        if (flow === 'direct') {
            let k = miles - 31;
            if (k >= 0) {
                this.distancePrice = (k * 2.50) + 2.50;
                // this.mileOpenPr = this.distancePrice;
            }
            else {
                this.distancePrice = 0;
            }

            // this.gdoConfig.itemPrice = this.calculateTotalPrice(this.utils.utilities.item_price, this.singleOpener, this.doubleOpener, this.mileOpenPr, this.qty);
        } else {
            let k = miles - 50;

            if (k >= 0) {
                this.distancePrice = (k * 3) + 51;
                // this.mileOpenPr = this.distancePrice;
            } else {
                this.distancePrice = 0;
                // this.mileOpenPr = this.distancePrice;
            }

        }
        this.mileOpenPr = this.distancePrice;
        this.utils.utilities.distancePrice = this.distancePrice;
    }
}
