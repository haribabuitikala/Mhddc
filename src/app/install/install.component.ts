import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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

declare var _: any;
declare var $: any;

@Component({
    selector: 'app-install',
    templateUrl: './install.component.html',
    styleUrls: ['./install.component.less']
})
export class InstallComponent implements OnInit, AfterViewInit {

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

    installSize: string;
    wincode: string;
    itemName: string;
    doorDesign: string;
    doorModel: string; doorModelPrice: string;
    construction: string;
    color: string; colorPrice: string;
    topSection: string;
    hardware = [];
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

 

    hideDIY = false;
    noDIYs = [30, 16, 9];

    ngOnInit() {
        this.widthFeets = this.sizes.getWidthFeets();
        this.lang = this.language.getDoorSize();
 
        if (this.navComponent.flowType === 'res') {
            this.navComponent.renderNav({
                flowType: 'res',
                flowActiveStep: 10,
                currentStepUrl: '/config/install',
                showStepIndicator: true,
                nextStepFn: () => {

                }
            });
            this.config.pageTitle = '10.Choose Installed vs. DIY';
        } else {
            this.navComponent.renderNav({
                flowType: 'resquick',
                flowActiveStep: 6,
                currentStepUrl: '/config/install',
                showStepIndicator: true,
                nextStepFn: () => {

                }
            });
            this.config.pageTitle = '6.Choose Installed vs. DIY';
        }
 
        this.installSize = this.utils.utilities.wf + "'0 \"(W) X " + this.utils.utilities.hf + "'0 \"(h)";
        this.wincode = this.utils.utilities.winCode;
        this.itemName = this.utils.resFlowSession.resDoorObj.product.product['item_name'];
        this.doorDesign = this.utils.resFlowSession.resDoorObj.design.dsgn['item_name']
        this.doorModel = this.utils.resFlowSession.resDoorObj.construction.construction['ClopayModelNumber'];
        this.doorModelPrice = this.utils.resFlowSession.resDoorObj.construction.construction['item_price'];
        this.construction = this.utils.resFlowSession.resDoorObj.construction.construction['item_name'];
        this.color = this.utils.resFlowSession.resDoorObj.color.base['item_name'];
        this.colorPrice = this.utils.resFlowSession.resDoorObj.color.base['item_price'];
        this.topSection = this.utils.resFlowSession.resDoorObj.windows.topsection['item_name'];

        if (this.utils.resFlowSession.resDoorObj.hardware.handle != "") {
            this.hardware.push('Handles: ' + this.utils.resFlowSession.resDoorObj.hardware.handle['item_name']);

        }
        if (this.utils.resFlowSession.resDoorObj.hardware.stepplate != "") {
            this.hardware.push('Step Plate: ' + this.utils.resFlowSession.resDoorObj.hardware.stepplate['item_name']);
        }
        if (this.utils.resFlowSession.resDoorObj.hardware.hinge != "") {
            this.hardware.push('Hinges: ' + this.utils.resFlowSession.resDoorObj.hardware.hinge['item_name']);
        }


        if (this.utils.resFlowSession.resDoorObj.product.product && this.noDIYs.indexOf(this.utils.resFlowSession.resDoorObj.product.product['id']) >= 0) {
             this.hideDIY = true;
        }
       

        var priceData = this.config.getDoorPrice();
        this.installPrice = priceData.install;
        this.diyPrice = priceData.diy;
    }


    ngAfterViewInit() {
        $('#diyDoorVis').DoorVisualization({
            NAME: 'configView',
            consolereporting: false,
            MAXHEIGHT: 280,
            MAXWIDTH: 315,
            VIEW: 'door'
        });
    }
    checkType(txt) {
        this.appComponent.selectedInstallDiy = txt;
        if (txt == 'diy') {
            this.doorDimensionFound = false;
            this.config.renderCanvas(window['cObj'], 'doorVis', '#diyDoorVis');
            this.exactDoorsize.open();
        }
        if (txt == 'install') {
            this.doorDimensionFound = false;
            this.config.renderCanvas(window['cObj'], 'doorVis', '#diyDoorVis');
            this.exactDoorsize.open();
        }
    }

    navigateTo(path) {
        // this.appComponent.currScreen = this.appComponent.navElems.indexOf(path);
        this.route.navigateByUrl(path);
    }


    nextBtn(path) {
         if (this.appComponent.selectedInstallDiy == undefined || this.appComponent.selectedInstallDiy == 'install') {
            this.appComponent.selectedInstallDiy = "install";
            this.leadTest.open();
        }
        //this.navigateTo('/config/opener');
    }

    prevBtn() {
        this.navigateTo('/config/hardware');
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
            this.navigateTo('/config/opener');
        }
    }
    learMoreClose() {
        this.learnMore.close();
        this.epa.open();
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
    getWidthInches(itm) {
        this.widthInches = this.sizes.getInches(itm, this.selectedWidthFeet);
        this.selectedwidth = "width_" + this.selectedWidthFeet + "_0";
        this.heightFeets = this.sizes.getHeightFeets(this.selectedwidth);
        // this.heightInches = this.sizes.getInches('height', this.heightFeets[0]);
        this.utils.utilities.wi = this.widthInches[0];
        this.utils.utilities.wf = +this.selectedWidthFeet;

        this.resDetails.widthF = this.widthInches[0];
        this.resDetails.widthI = +this.selectedWidthFeet;

        // this.utils.utilities.hf = this.heightFeets[0];
        // this.utils.utilities.hi = this.heightInches[0];
    }

    getHeightInches(itm) {
        this.heightInches = this.sizes.getInches(itm, this.selectedHeightFeet);
        // this.selectedHeight = "height_" + this.selectedHeightFeet + "_0";
        this.utils.utilities.hf = +this.selectedHeightFeet;
        this.utils.utilities.hi = this.heightInches[0];

        this.resDetails.heightF = this.widthInches[0];
        this.resDetails.heightI = this.heightInches[0];
    }

    getWidth() {
        // this.heightFeets = this.sizes.getHeightFeets(this.selectedwidth);
        this.utils.utilities.wi = +this.selectedWidthInches;
        this.resDetails.widthI = +this.selectedWidthInches;
    }

    getHeight() {
        this.utils.utilities.hi = +this.selectedHeightInches;
        this.resDetails.heightI = +this.selectedHeightInches;
    }

    doorDimensionFound = false;
    getDoorDimentions() {
        this.doorDimensionFound = false;
        console.log(this.selectedWidthFeet);
        console.log(this.selectedWidthInches);
        console.log(this.selectedHeightFeet + ' -INCHES: ' + this.selectedHeightInches);

        console.log('Width ', this.selectedWidthFeet, this.selectedHeightFeet, this.selectedWidthInches, this.selectedHeightInches);
        this.getProducts();


    }

    reportDataNotMatched() {
        alert('Data Not Matched');
    }

    getProducts() {
        var cData = this.utils.resDiyData.resDoorObj;
        var rData = this.utils.resFlowSession.resDoorObj;
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
                        alert('you selected product is not matched');
                    }
                } else {
                    alert('Your selected size is  not matched');
                }
            },
            error => {
                console.log(error.statusText);
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
                        console.log('desings ', cData, rData);
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

                            console.log('isMatched ', isMatched);
                            if (isMatched) {
                                this.getWindows(cData, rData);
                            } else {
                                this.reportDataNotMatched();
                            }

                        } else {
                            this.reportDataNotMatched();
                        }

                    }, err => {

                    });
                }
            })
    }


    settopParams(cData) {

        let utils = this.utils.utilities;
        var resDoorObj = this.utils.resFlowSession.resDoorObj;
        return {
            "dtype": 'RES',
            "productid": resDoorObj.product.product['item_id'],
            "windcode": resDoorObj.product.product['windcode'],
            "NatMarketID": +utils.natmarketid,
            "doorcolumns": resDoorObj.design.dsgn['Columns'],
            'colorconfig': resDoorObj.color.base['colorconfig'],
            "clopaymodelnumber": resDoorObj.construction.construction['ClopayModelNumber'],
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
                console.log('top section matched ', isMatched);
                if (isMatched) {
                    this.doorDimensionFound = true;
                    window['rObj'] = cData;
                    this.config.renderCanvas(window['rObj'], 'doorVis', '#diyDoorVis');
                }
            }
        });
    }

    getHardware() {

    }


    confirmDIY() {
        this.utils.resFlowSession.resDoorObj = window['rObj'];
        window['cObj'] = window['rObj'];
        this.navigateTo('/config/opener');
    }


}
