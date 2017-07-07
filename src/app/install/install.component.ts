import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { AppComponent } from "../app.component";
import { Router } from '@angular/router';
import { ConfigComponent } from "../config/config.component";
import { NavComponent } from "../nav/nav.component";
import { AppUtilities } from "../shared/appUtilities";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
/** DIY */
import { SizeList } from "../door-size/sizesList";
import { LangEnglishService } from "../shared/english";
import { CollectionData } from "../collection/collection-data";
import { CollectionService } from "../shared/data.service";
import { EscapeHtmlPipe } from "../shared/html-entitiy";

declare var _: any;
declare var $: any;

@Component({
    selector: 'app-install',
    templateUrl: './install.component.html',
    styleUrls: ['./install.component.less']
})
export class InstallComponent implements OnInit, AfterViewInit, AfterViewChecked {

    constructor(private appComponent: AppComponent
        , private navComponent: NavComponent
        , private config: ConfigComponent
        , private route: Router
        , private utils: AppUtilities
        , private sizes: SizeList
        , private language: LangEnglishService
        , private data: CollectionData
        , private collection: CollectionService) {
    }
    @ViewChild('exactDoorsize') exactDoorsize: ModalComponent;
    @ViewChild('leadTest') leadTest: ModalComponent;
    @ViewChild('epa') epa: ModalComponent;
    @ViewChild('learnMore') learnMore: ModalComponent;
    @ViewChild('florida') modal1: ModalComponent;

    installSize: string;
    wincode: string;
    itemName: string;
    doorDesign: string;
    doorModel: string; doorModelPrice: string;
    construction: string;
    color: string; colorPrice: string;
    topSection: string;
    hardware = [];
    glasstype: string;
    glassTypePrice = 0;
    lang;

    /** DIY POPUP */
    widthFeets;
    widthInches;
    selectedWidthFeet;
    selectedWidthInches;
    selectedwidth;

    heightFeets;
    heightInches;
    selectedHeightFeet;
    selectedHeightInches;
    selectedHeight;

    installPrice = 0;
    diyPrice = 0;
    isChecked = false;
    checkboxFlag = false;


    hideDIY = false;
    noDIYs = [30, 16, 9];
    showType: string = '';

    flowType = 'res';

    ngAfterViewChecked() {
        this.installPrice = this.utils.utilities.itemPriceInstall;
        this.diyPrice = this.utils.utilities.itemPriceDY;
    }

    isStepVisible(stepName) {
        let show = true;
        var topsection = this.utils.resFlowSession.resDoorObj.windows.topsection;
        if (stepName === 'topSection' || stepName === 'glasstype') {
            if (this.navComponent.flowType === 'resquick') {
                return false;
            }

            if (this.utils.resFlowSession.resDoorObj.product.product['item_id'] == 16) {
                return false;
            }

            if (stepName === 'glasstype' && topsection['glasstypes'] && (topsection['glasstypes'][0].item_price <= 0 || topsection['Config'] == 'GLAZ-SOL' || topsection['glasstypes'][0]['Config'] == 'GLAZ-SOL')) {
                 return false;
            }
        }
        return show;
    }

    gotoGlassStep () {
        if (this.utils.resFlowSession.resDoorObj.product.product['item_id'] == 13 ||
        this.utils.resFlowSession.resDoorObj.product.product['item_id'] == 14 ||
        this.utils.resFlowSession.resDoorObj.product.product['item_id'] == 24) {
            this.route.navigateByUrl('/config/glassType');
        } else {
            this.route.navigateByUrl('/config/nonClassic');
        }
    }

    ngOnInit() {
        console.log('install init ');
        this.widthFeets = this.sizes.getWidthFeets();
        this.lang = this.language.getDoorSize();

        if (this.navComponent.flowType === 'res') {
            this.navComponent.renderNav({
                flowType: 'res',
                flowActiveStep: 10,
                currentStepUrl: '/config/install',
                showStepIndicator: true,
                pageTitle: 'Choose Installed vs. DIY',
                nextStepFn: () => {

                }
            });
        } else {
            this.navComponent.renderNav({
                flowType: 'resquick',
                flowActiveStep: 6,
                currentStepUrl: '/config/install',
                showStepIndicator: true,
                pageTitle: 'Choose Installed vs. DIY',
                nextStepFn: () => {

                }
            });
        }

        this.flowType = this.navComponent.flowType;
        this.installPrice = this.utils.utilities.itemPriceInstall;
        this.diyPrice = this.utils.utilities.itemPriceDY;

        if (this.utils.resFlowSession.cart.length > 0) {
            if (this.utils.resFlowSession.resDoorObj.INSTALLTYPE === 'Installed') {
                this.showType = 'Installed';
                this.utils.resFlowSession.resDetails.isDIY = false;
                this.selectedType = 'Installed';
                this.appComponent.selectedInstallDiy = 'Installed';
                this.checkType('Installed');
            } else {
                this.showType = 'DIY';
                this.utils.resFlowSession.resDetails.isDIY = true;
                this.selectedType = 'DIY';
                this.appComponent.selectedInstallDiy = 'DIY';
                this.checkType('DIY');
            }
        } else {
            this.utils.resFlowSession.resDoorObj.INSTALLTYPE = 'Installed'
            this.utils.resFlowSession.resDetails.isDIY = false;
            this.selectedType = 'Installed';
            this.appComponent.selectedInstallDiy = 'Installed';
            if (this.noDIYs.indexOf(this.utils.resFlowSession.resDoorObj.product.product['item_id']) >= 0) {
                this.hideDIY = true;
            }
            this.checkType('Installed');
        }

        this.dataParams = {
            dtype: this.utils.utilities.dtype,
            windcode: this.utils.utilities.winCode,
            dwidthFt: this.utils.utilities.wf, // width feet
            dwidthIn: this.utils.utilities.wi, // width inches
            dheightFt: this.utils.utilities.hf, // height feet
            dheightIn: this.utils.utilities.hi, // height inches
            lang: 'en',
            NatMarketID: this.utils.utilities.natmarketid,
            localmarketid: this.utils.utilities.localmarketid,
            productlayout: this.utils.utilities.productlayout
        };
        this.resDetails = this.utils.resFlowSession.resDetails;
    }


    ngAfterViewInit() {
        $('#diyDoorVis').DoorVisualization({
            NAME: 'configView',
            consolereporting: false,
            MAXHEIGHT: 280,
            MAXWIDTH: 315,
            VIEW: 'door',
            doneCallback: () => {
                $('body').removeClass('loader');
            }
        });
    }

    selectedType = 'Installed';
    checkType(txt) {
        this.selectedType = txt;
        this.appComponent.selectedInstallDiy = txt;
        if (txt == 'DIY') {
            this.utils.resFlowSession.resDoorObj.INSTALLTYPE = "DIY";
            this.utils.resFlowSession.resDetails.INSTALLTYPE = "DIY";
            this.utils.resFlowSession.resDetails.isDIY = true;
            // this.doorDimensionFound = false;
            // this.config.renderCanvas(window['cObj'], 'doorVis', '#diyDoorVis');
            // this.exactDoorsize.open();
        }
        if (txt == 'Installed') {
            this.utils.resFlowSession.resDoorObj.INSTALLTYPE = "Installed";
            this.utils.resFlowSession.resDetails.INSTALLTYPE = "Installed";
            this.utils.resFlowSession.resDetails.isDIY = false;
            // this.doorDimensionFound = false;
            // this.config.renderCanvas(window['cObj'], 'doorVis', '#diyDoorVis');
            // this.exactDoorsize.open();
        }
    }

    navigateTo(path) {
        // this.appComponent.currScreen = this.appComponent.navElems.indexOf(path);
        this.route.navigateByUrl(path);
    }


    nextBtn(path) {
        //Best place to set collection name in quickship flow
        if (this.appComponent.flowType == 'resquick') {
            let construction = this.utils.resFlowSession.resDoorObj.construction.construction;
            if (construction) {
                this.utils.resFlowSession.resDetails.collectionName = construction['product_name'];
            }
        }
        if (this.selectedType == 'Installed') {
            this.utils.resFlowSession.orderObj.orderInstallType = "Installed";
            if (this.data.zipResults.state == "KS" || this.data.zipResults.state == "CA" || this.data.zipResults.state == "RI") {
                this.navigateTo('/config/opener');
            } else {
                this.leadTest.open();
            }

        } else {
            let winCode = +this.utils.utilities.winCode.slice(1);
            this.utils.resFlowSession.orderObj.orderInstallType = "DIY";
            if (this.data.zipResults.state == 'FL' && winCode >= 6) {
                this.checkboxFlag = false; // if user checked the checkbox and returned again
                this.isChecked = true;
                this.modal1.open();
            } else {
                this.gotoNext();
            }
        }
    }
    setFloridaConfirmValue(event) {
        if (event.currentTarget.checked) {
            this.isChecked = false;
        } else {
            this.isChecked = true;
        }
    }
    gotoNext() {
        this.SizeMotMatched = false;
        this.readyToNextStep = false;
        this.setOldValues();
        this.config.renderCanvas(window['cObj'], 'doorVis', '#diyDoorVis');
        // lines are only for DIY logic less scope of regression - TM
        if (!this.utils.utilities.isCustomSize) {
            this.exactDoorsize.open();
        } else {
            this.navigateTo('/config/additionalOptions');
        }
    }

    prevBtn() {
        if (this.appComponent.flowType === 'resquick') {
            this.navigateTo('/config/color');
        } else {
            this.navigateTo('/config/hardware');
        }
    }
    leadTestValue(buttonValue) {
        if (buttonValue == "YES") {
            this.epa.open();

        } else {
            this.leadTest.close();
            this.navigateTo('/config/opener');
        }
    }
    epaValue(epaStatus) {
        if (epaStatus == 'learn') {
            this.leadTest.close();
            this.epa.close();
            this.learnMore.open();

        } else if (epaStatus == 'back') {
            this.epa.close();
            this.leadTest.open();
        } else {
            if (this.checkValue == true) {
                this.utils.resFlowSession.resDoorObj.isEPA = true;
                this.navigateTo('/config/opener');
            } else {
                this.utils.resFlowSession.resDoorObj.isEPA = false;
            }
        }
    }
    learMoreClose() {
        this.learnMore.close();
        this.epa.open();
    }
    checkValue;
    checkboxValue(event) {

        this.checkValue = event.currentTarget.checked;
    }
    /** DIY */
    dataParams = {
        dtype: this.utils.utilities.dtype,
        windcode: this.utils.utilities.winCode,
        dwidthFt: this.utils.utilities.wf, // width feet
        dwidthIn: this.utils.utilities.wi, // width inches
        dheightFt: this.utils.utilities.hf, // height feet
        dheightIn: this.utils.utilities.hi, // height inches
        lang: 'en', //this.utils.utilities.lang,
        NatMarketID: this.utils.utilities.natmarketid,
        localmarketid: this.utils.utilities.localmarketid, // we are not getting
        productlayout: this.utils.utilities.productlayout //
    };
    resDetails = this.utils.resFlowSession.resDetails;

    exactDiyObject = {
        wf: 0,
        wi: 0,
        hf: 0,
        hi: 0
    };
    readyToNextStep = false;


    compareOldValues() {
        let utils = this.utils.utilities;
        if (this.selectedHeightFeet == utils.hf &&
            this.selectedHeightInches == utils.hi &&
            this.selectedWidthFeet == utils.wf &&
            this.selectedWidthInches == utils.wi) {
            this.readyToNextStep = true;
        } else {
            this.readyToNextStep = false;
        }


    }
    setOldValues() {
        this.selectedWidthFeet = this.utils.utilities.wf;
        this.getWidthInches('width');
        this.selectedWidthInches = this.utils.utilities.wi;
        this.getWidth();
        this.selectedHeightFeet = this.utils.utilities.hf;
        this.getHeightInches('height');
        this.selectedHeightInches = this.utils.utilities.hi;

        this.readyToNextStep = true;
    }


    getWidthInches(itm) {
        this.widthInches = this.sizes.getInches(itm, this.selectedWidthFeet);
        this.selectedwidth = "width_" + this.selectedWidthFeet + "_0";
        this.heightFeets = this.sizes.getHeightFeets(this.selectedwidth);
        this.heightInches = [];
        this.compareOldValues();
    }

    getHeightInches(itm) {
        this.heightInches = this.sizes.getInches(itm, this.selectedHeightFeet);
        this.selectedHeight = "height_" + this.selectedHeightFeet + "_0";
        this.compareOldValues();
    }

    getWidth() {

        this.heightFeets = this.sizes.getHeightFeets(this.selectedwidth);
        this.selectedHeightFeet = null;

        this.heightInches = [];

        this.compareOldValues();
    }

    getHeight() {
        this.compareOldValues();
    }

    doorDimensionFound = false;
    notmatchdoorsize = null;
    exactDoorsizeModal = null;
    SizeMotMatched = false;
    getDoorDimentions(notmatchdoorsize, exactDoorsize) {
        //Need to refactor
        $('body').append('<div class="exact-size-loader">Please wait while we are validating the new Dimensions</div>');

        this.readyToNextStep = false;
        this.notmatchdoorsize = notmatchdoorsize;
        this.exactDoorsizeModal = exactDoorsize;
        this.SizeMotMatched = false;
        this.getProducts();
    }

    reportDataNotMatched() {
        this.SizeMotMatched = true;
        $('.exact-size-loader').remove();
    }

    getProducts() {
        let cData = this.utils.resDiyData.resDoorObj;
        cData.INSTALLTYPE = 'DIY';
        let rData = this.utils.resFlowSession.resDoorObj;
        this.dataParams.dwidthFt = this.selectedWidthFeet;
        this.dataParams.dwidthIn = this.selectedWidthInches | 0;
        this.dataParams.dheightFt = this.selectedHeightFeet;
        this.dataParams.dheightIn = this.selectedHeightInches | 0;

        cData.size.width.wf = this.selectedWidthFeet;
        cData.size.width.wi = this.selectedWidthInches;
        cData.size.height.hf = this.selectedHeightFeet;
        cData.size.height.hi = this.selectedHeightInches;

        this.getCollectionData(this.dataParams, cData, rData);
    }


    getCollectionData(data, cData, rData) {
        this.collection.getCollection(data).subscribe(
            res => {
                let products = res;
                if (products && products.length > 0) {
                    let selectedProducts = products.filter(p => {
                        return p.item_id == this.utils.resFlowSession.resDoorObj.product.product['item_id'];
                    });
                    if (selectedProducts.length > 0) {
                        cData.product.apiData = res;
                        cData.product.product = selectedProducts[0];
                        this.getDesigns(cData, rData);
                    } else {
                        this.reportDataNotMatched();
                    }
                } else {
                    this.reportDataNotMatched();
                }
            },
            error => {
                console.log(error.statusText);
                this.reportDataNotMatched();
                this.collection.handleError();
            }
        );
    }

    setParams(obj, cData) {
        let dataParams;
        let utils = this.utils.utilities;
        this.utils.checkDoor();

        return dataParams = {
            "ProductID": obj.item_id,
            "dtype": utils.dtype,
            "Windcode": utils.winCode,
            "NatMarketID": +utils.natmarketid,
            "wf": +cData.size.width.wf,
            "WidthFt": +cData.size.width.wf,
            "wi": cData.size.width.wi || 0,
            "hf": +cData.size.height.hf,
            "HeightFt": +cData.size.height.hf,
            "hi": +cData.size.height.hi || 0,
            "lang": "en",
            "localmarketid": +utils.localmarketid,
            "doorsize": +utils.homeSize,
            "LaborCode": obj.singleinstallcode,
            "isCRLE": false,
            "productlayout": true,
            "doorwidth": +cData.size.width.wf,
            "doorheight": +cData.size.height.hf
        };
    }


    getDesigns(cData, rData) {
        this.collection.getHomes()
            .then(res => {
                let result = res['homes'].home;
                result = _.filter(result, ['_size', this.utils.utilities.homeSize]);
                this.data.homeImages = result;
                let speciality = cData.product.product;
                if (speciality) {
                    let params = this.setParams(speciality, cData);
                    this.collection.getDesign(params).subscribe(res => {
                        var isMatched = false;
                        if (res && res.length > 0) {
                            var filterDesigns = res.filter(d => {
                                return rData.design.dsgn.item_id == d.item_id;
                            });
                            if (filterDesigns.length > 0) {
                                cData.design.apiData = res;
                                cData.design.dsgn = filterDesigns[0];
                                cData.design.columns = speciality['Columns'];
                                cData.design.rows = speciality['Rows'];
                                if (cData.design.dsgn && cData.design.dsgn.constructions) {
                                    let construction = cData.design.dsgn.constructions.filter(c => {
                                        return c.item_id == rData.construction.construction.item_id;
                                    });

                                    construction = construction[0];
                                    if (construction) {
                                        cData.construction.apiData = cData.design.dsgn.constructions;
                                        cData.construction.construction = construction;

                                        let color = construction.colors.filter(y => {
                                            return y.item_id == rData.color.base.item_id;
                                        });

                                        color = color[0];
                                        if (color) {
                                            cData.color.base = color;
                                            cData.color.overlay = color;
                                            cData.color.apiData = construction.colors;

                                            isMatched = true;
                                        }
                                    }
                                }
                            }

                            if (isMatched) {
                                this.getWindows(cData, rData);
                            } else {
                                this.reportDataNotMatched();
                            }

                        } else {
                            this.reportDataNotMatched();
                        }

                    }, err => {
                        this.collection.handleError();
                    });
                }
            })
    }


    settopParams(cData) {
        let utils = this.utils.utilities;
        return {
            "dtype": 'RES',
            "productid": cData.product.product['item_id'],
            "windcode": cData.product.product['windcode'],
            "NatMarketID": +utils.natmarketid,
            "doorcolumns": cData.design.dsgn['Columns'],
            'colorconfig': cData.color.base['colorconfig'],
            "clopaymodelnumber": cData.construction.construction['ClopayModelNumber'],
            "dwidthFt": +cData.size.width.wf,
            "dwidthIn": +cData.size.width.wi || 0,
            "dheightFt": +cData.size.height.hf,
            "dheightIn": +cData.size.width.hi || 0,
            "lang": "en",
            "marketID": +utils.localmarketid,
            "doorsize": +utils.homeSize
        };
    }


    getWindows(cData, rData) {
        let params = this.settopParams(cData);
        this.collection.getTopSection(params).subscribe(res => {
            if (res && res.length > 0) {
                let topsection = res.filter(y => {
                    return y.item_id == rData.windows.topsection.item_id;
                });

                let isMatched = false;
                topsection = topsection[0];

                if (topsection) {
                    cData.windows.apiData = res;
                    cData.windows.topsection = topsection;
                    if (rData.windows.glasstype && rData.windows.glasstype.item_id) {
                        if (topsection.glasstypes && topsection.glasstypes instanceof Array) {
                            let glassType = topsection.glasstypes.filter(g => {
                                return g.item_id == rData.windows.glasstype.item_id;
                            });
                            glassType = glassType[0];
                            if (glassType) {
                                cData.windows.glasstype = glassType;
                                if (rData.windows.placement) {
                                    if (topsection.SectionsAllowed) {
                                        if (topsection.SectionsAllowed.split(',').indexOf(rData.windows.placement.item_id) >= 0) {
                                            isMatched = true;
                                        }
                                    }
                                } else {
                                    isMatched = true;
                                }
                            }
                        }
                    } else {
                        isMatched = true;
                    }
                }
                if (isMatched) {
                    this.getHardware(cData, rData);
                } else {
                    this.reportDataNotMatched();
                }
            }
        },
            err => {
                this.collection.handleError();
            });
    }

    getHardware(cData, rData) {
        var hardwareParams = {
            productid: cData.product.product['item_id'],
            natmarketid: this.utils.utilities.natmarketid,
            windcode: cData.product.product['windcode'],
            designid: cData.design.dsgn['item_id'],
            doorrows: cData.design.dsgn['Rows'],
            doorcolumns: cData.design.dsgn['Columns'],
            lang: 'en',
            marketid: this.utils.utilities.localmarketid,
            localmarketid: this.utils.utilities.localmarketid,
            clopaymodelnumber: cData.construction.construction['ClopayModelNumber'],
            dwidthFt: +cData.size.wf,
            dwidthIn: +cData.size.wi,
            dheightFt: +cData.size.hf,
            dheightIn: +cData.size.hi
        };
        let hardware = rData.hardware;
        this.collection.getHardware(hardwareParams).subscribe(res => {
            if (res && res.length > 0) {
                cData.hardware.apiData = res;
                let handles = res[0]['LHDKS'];
                let handleFound = false;
                if (handles && hardware.handle && hardware.handle.item_id) {
                    handles.forEach(h => {
                        if (h.item_id == hardware.handle.item_id) {
                            handleFound = true;
                            cData.hardware.handle = h;
                            
                            let handlePlacements = [];
                            let handlePlacementHash = {};
                            let placements = h['placementlist'].split(';');
                            placements.forEach(placement => {
                                handlePlacements.push(placement);
                                handlePlacementHash[placement.split(':')[0]] = placement;
                            });
                            cData.hardware.handle['placement'] = handlePlacementHash[h.defaultkit];
                            cData.hardware.handle['count'] = parseInt(hardware.handle['placement'].split(':')[0]);
                        }
                    });
                }

                let plates = res[0].StepPlates;
                let plateFound = false;
                if (plates && rData.hardware.stepplate) {
                    plates.forEach(p => {
                        if (p.item_id == rData.hardware.stepplate.item_id) {
                            plateFound = true;
                            cData.hardware.stepplate = p;

                            let stepPlacements = [];
                            let placements = p['placementlist'].split(';');
                            let stepPlacementHash = {};
                            placements.forEach(placement => {
                                stepPlacements.push(placement);
                                stepPlacementHash[placement.split(':')[0]] = placement;
                            });
                            cData.hardware.stepplate['placement'] = stepPlacementHash[p.defaultkit];
                            cData.hardware.stepplate['count'] = parseInt(hardware.stepplate['placement'].split(':')[0]);
                        }
                    });
                }

                let hinges = res[0].StrapHinges;
                let hingeFound = false;
                if (rData.hardware.hinge) {
                    hinges.forEach(p => {
                        if (p.item_id == rData.hardware.hinge.item_id) {
                            hingeFound = true;
                            cData.hardware.hinge = p;

                            let hingePlacements = [];
                            let placements = p['placementlist'].split(';');
                            let hingePlacementHash = {};
                            placements.forEach(placement => {
                                hingePlacements.push(placement);
                                hingePlacementHash[placement.split(':')[0]] = placement;
                            });
                            cData.hardware.hinge['placement'] = hingePlacementHash[p.defaultkit];
                            if (hardware.hinge.placement) {
                                let existingPlacement = hardware.hinge.placement.split(':')[0];
                                if (hingePlacementHash[existingPlacement]) {
                                    cData.hardware.hinge['placement'] = hingePlacementHash[existingPlacement];
                                }
                            }

                            cData.hardware.hinge['count'] = parseInt(hardware.hinge['placement'].split(':')[0]);
                        }
                    });
                }

                // Can be reduced to few lines but its better this way to add more if conditions
                if (rData.product.product.item_id == 13) {
                    let locks = res[0]['Locks'];
                    let lockfound = false;
                    if (locks.length && rData.hardware.lock) {
                        locks.forEach(l => {
                            if (l.item_id == rData.hardware.lock.item_id) {
                                cData.hardware.lock = l;
                                lockfound = true;
                            }
                        });
                    }

                    if (lockfound) {
                        this.readyToNextStep = true;
                        this.rObj = cData;
                        $('.exact-size-loader').remove();
                        this.config.renderCanvas(this.rObj, 'doorVis', '#diyDoorVis');
                    } else {
                        this.reportDataNotMatched();
                    }
                } else {
                    if (handleFound && plateFound && hingeFound) {
                        this.readyToNextStep = true;
                        this.rObj = cData;
                        $('.exact-size-loader').remove();
                        this.config.renderCanvas(this.rObj, 'doorVis', '#diyDoorVis');
                    } else {
                        this.reportDataNotMatched();
                    }
                }

            } else {
                this.reportDataNotMatched();
            }
        },
            err => {
                this.collection.handleError();
            });
    }
    rObj;


    confirmDIY() {
        if (this.rObj) {
            this.utils.resFlowSession.resDoorObj = this.rObj;
            window['cObj'] = this.rObj;
            const size = this.utils.resFlow;
            size.wf = this.rObj.size.width.wf;
            size.wi = this.rObj.size.width.wi;
            size.hf = this.rObj.size.height.hf;
            size.hi = this.rObj.size.height.hi;

            // Not sure about this lines somehow we ended up using utilities sizes instead of resObject
            // Need to refactor the logic
            this.utils.utilities.wf = this.rObj.size.width.wf;
            this.utils.utilities.wi = this.rObj.size.width.wi;
            this.utils.utilities.hf = this.rObj.size.height.hf;
            this.utils.utilities.hi = this.rObj.size.height.hi;

            this.appComponent.updatePrice();
            this.config.renderCanvas();
        }
        this.navComponent.addDisabledStep(11);
        this.utils.resFlowSession.resDoorObj.INSTALLTYPE = 'DIY';
        this.navigateTo('/config/additionalOptions');
    }


    navigateToSize() {
        this.utils.resFlowSession.resDoorObj.resetsize();
        this.navigateTo('/doorSize');
    }

    //  check for florida to open the popup
    checkFlorida() {

    }

    floridaClose() {
        if (this.isChecked) {
            return false;
        } else {
            this.isChecked = false;
            this.modal1.close();
            this.readyToNextStep = false;
            this.setOldValues();
            this.exactDoorsize.open();
            this.config.renderCanvas(window['cObj'], 'doorVis', '#diyDoorVis');
        }
    }
}