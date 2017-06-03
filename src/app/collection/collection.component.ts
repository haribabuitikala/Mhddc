import { Component, OnInit } from '@angular/core';
import { CollectionData } from "./collection-data";
import { Router } from '@angular/router';
import { AppUtilities } from "../shared/appUtilities";
import { NavService } from "../nav/nav-service";
import { CollectionService } from "../shared/data.service";
import { NavComponent } from "../nav/nav.component";
import { AppComponent } from "../app.component";
declare var $: any;
declare var _: any;
@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.less']
})
export class CollectionComponent implements OnInit {

    // showVideo:boolean = false;
    // showPlayIcon:boolean = true;
    // showImageIcon:boolean = false;

    specialityBtn = true;
    popularBtn = false;
    speciality = false;
    popular = true;
    pageNo;
    quickFlow = false;

    showSpeciality() {
        this.specialityBtn = false;
        this.popularBtn = true;
        this.speciality = true;
        this.popular = false;
    }

    showPopular() {
        this.specialityBtn = true;
        this.popularBtn = false;
        this.speciality = false;
        this.popular = true;
    }


    constructor(private data: CollectionData
        , private route: Router
        , private utils: AppUtilities
        , private navComp: NavService
        , private dataService: CollectionService
        , private navComponent: NavComponent
        , private appComponent: AppComponent) {
    }

    collections;
    specialCollections;
    popularCollections;
    selected;
    loaded = false;
    loadStockGroups() {
        let utils = this.utils.utilities;
        let dataParams = {
            "dwidthFt": +this.utils.resFlowSession.resDoorObj.size.width.wf,
            "dwidthIn": utils.wi || 0,
            "dheightFt": +this.utils.resFlowSession.resDoorObj.size.height.hf,
            "dheightIn": utils.hi || 0,
            'storeid': +utils.storenumber,
            'windcode': utils.winCode
        };
        this.dataService.getStockGroup(dataParams).subscribe(res => {
            var stockStore = res[0];
            if (stockStore) {
                this.utils.quickStockInfo.stockgroupid = stockStore.stockgroupid;
                this.utils.quickStockInfo.storenumber = stockStore.storenumber;
                this.utils.quickStockInfo.productids = stockStore.productids;

                if (stockStore.productids != '') {
                    this.quickFlow = true;
                }
            }
        });
    }
    ngOnInit() {
        this.makeNull();
        this.collections = this.data.data;
        this.pageNo = this.utils.utilities.currPage;

        $.each(this.data.data, function (idx, value) {
            switch (value.item_thumbnail) {
                case "dtreserve.jpg":
                    value.imageUrl = "btnCollectionReserveSC.png";
                    value.popupImg = "collectionpopupReserve.png";
                    break;
                case "dtavante.jpg":
                    value.imageUrl = "btnCollectionAvante.png";
                    value.popupImg = "collectionpopupAvante.png";
                    break;
                case "dtcypress.jpg":
                    value.imageUrl = "btnCollectionModernSteel.png";
                    value.popupImg = "collectionpopupModernSteel.png";
                    break;
                case "dtgallery.jpg":
                    value.imageUrl = "btnCollectionGallery.png";
                    value.popupImg = "collectionpopupgallery.png";
                    break;
                case "dtcoachman.jpg":
                    value.imageUrl = "btnCollectionCoachman.png";
                    value.popupImg = "collectionpopupCoachman.png";
                    break;
                case "dtCanyonRidge.jpg":
                    let t = value.item_name;
                    if (t === 'Canyon Ridge&#174; Limited Edition Collection') {
                        value.imageUrl = "btnCollectionCanyonRidgeLE.png";
                    } else {
                        value.imageUrl = "btnCollectionCanyonRidgeUG.png";
                    }
                    value.popupImg = "collectionpopupCanyonRidge.png";
                    break;
                case "dtpremium.jpg":
                    value.imageUrl = "btnCollectionClassic.png";
                    value.popupImg = "collectionpopuppremium.png";
                    break;
            }

        });

        this.specialCollections = _.filter(this.collections, ['productline', 'speciality']);
        this.popularCollections = _.filter(this.collections, ['productline', 'popular']);

        this.navComp.activateIcon();

        this.navComponent.renderNav({
            flowType: 'res',
            flowActiveStep: 2,
            currentStepUrl: '/collection',
            showStepIndicator: true,
            nextStepFn: () => {
                if (this.selected) {
                    this.goToHome(this.selected);
                }
            }
        });

        //this.selected = this.popular ? this.popularCollections[0] : this.specialCollections[0];

        this.loaded = true;
        this.loadStockGroups();
    }

    isSelected(itm) {
        return (this.selected && this.selected.item_id === itm.item_id) ? true : false;
    }

    goToHome(speciality) {
        // $('.collection-img').removeClass('selected');
        speciality.selected = true;
        this.utils.resFlowSession.resDoorObj.product.product = speciality;
        this.utils.resFlowSession.resDetails.collectionName = speciality.item_name;
        if (speciality.item_id === 31) {
            speciality.item_id = 30
        }
        // event.currentTarget.classList.add('selected');
        this.dataService.getHomes()
            .then(res => {
                let result = res['homes'].home;
                result = _.filter(result, ['_size', this.utils.utilities.homeSize]);
                this.data.homeImages = result;
                // this.setFlow();
                let params = this.setParams(speciality);
                this.dataService.getDesign(params)
                    .subscribe(
                    res => {
                        this.data.designs = res;

                        this.utils.resFlowSession.collection.selectedCollection = speciality;
                        this.utils.resFlowSession.collection['params'] = params;
                        this.utils.resFlowSession.collection['homeImages'] = result;
                        this.utils.resFlowSession.collection['designs'] = res;
                        this.utils.resFlowSession.resDoorObj.design.apiData = res;
                        this.utils.resFlowSession.resDoorObj.design.rows = speciality.Rows;
                        this.utils.resFlowSession.resDoorObj.design.columns = speciality.Columns;
                        this.route.navigateByUrl('/home');
                    },
                    err => {

                    });
            })
    }

    setParams(obj) {
        let dataParams;
        let utils = this.utils.utilities;
        this.utils.checkDoor();
        // return dataParams = {
        //     "productid": obj.item_id,
        //     "dtype": utils.dtype,
        //     "windcode": utils.winCode,
        //     "natmarketid": +utils.natmarketid,
        //     "wf": utils.wf,
        //     "wi": utils.wi,
        //     "hf": utils.hf,
        //     "hi": utils.hi,
        //     "lang": "en",
        //     "localmarketid": +utils.localmarketid,
        //     "doorsize": +utils.homeSize
        // };

        // utils.productid = obj.item_id;

        return dataParams = {
            "ProductID": obj.item_id,
            "dtype": utils.dtype,
            "Windcode": utils.winCode,
            "NatMarketID": +utils.natmarketid,

            "wf": +utils.wf,
            "WidthFt": +utils.wf,
            "wi": utils.wi || 0,
            "hf": +utils.hf,
            "HeightFt": +utils.hf,

            "hi": utils.hi || 0,
            "lang": "en",
            "localmarketid": +utils.localmarketid,
            "doorsize": +utils.homeSize,
            "LaborCode": obj.singleinstallcodew,
            "isCRLE": false,
            "productlayout": false,
            "dealerid": 1,

            "doorwidth": +utils.wf,
            "doorheight": +utils.hf

        };
    }

    quickShip() {
        this.appComponent.setLoader(true);
        let utils = this.utils.utilities;
        let dataParams = {
            "dtype": utils.dtype,
            "Windcode": utils.winCode,
            "NatMarketID": +utils.natmarketid,
            "wf": utils.wf,
            "wi": utils.wi || 0,
            "hf": utils.hf,
            "hi": utils.hi || 0,
            "lang": "en",
            "localmarketid": +utils.localmarketid,
            "doorsize": +utils.homeSize,
            "isCRLE": false,
            "productlayout": true
        };
        this.dataService.getquickDoors(dataParams).subscribe(res => {
            this.utils.resQuickSession.designs = res;
            this.navComponent.setNavFlow('resquick');
            // this.utils.resFlowSession.resDoorObj.product['product'] = {
            //     QPB: true,
            //     doubleinstallcode: "FIR020",
            //     doubleinstallcodew: "FIR021",
            //     item_id: "",
            //     item_name: "",
            //     product_id: "",
            //     productdefault: {
            //         DIYDoublePackaging: "PACK-D,2",
            //         DIYDoubleSpring: "SPRG-GS",
            //         DIYSinglePackaging: "PACK-D,2",
            //         DIYSingleSpring: "SPRG-E",
            //         DoubleLock: "LOCK-1A",
            //         DoublePackaging: "PACK-D,2",
            //         DoubleSpring: "SPRG-COT",
            //         IntDoubleLock: "LOCK-2",
            //         IntSingleLock: "LOCK-2",
            //         SingleLock: "LOCK-1A",
            //         SinglePackaging: "PACK-D,2",
            //         SingleSpring: "SPRG-COT",
            //     },
            //     productid: "",
            //     singleinstallcode: "FIR010",
            //     singleinstallcodew: "FIR011",
            // }
            this.route.navigateByUrl('/config/design');
        });

    }

    dataModel = {
        productid: null,
        dtype: this.utils.utilities.dtype,
        dealerid: 1,
        windcode: this.utils.utilities.winCode,
        NatMarketID: this.utils.utilities.natmarketid,
        wf: this.utils.utilities.wf,
        wi: this.utils.utilities.wi,
        hf: this.utils.utilities.hf,
        hi: this.utils.utilities.hi,
        lang: this.utils.utilities.lang,
        localmarketid: this.utils.utilities.localmarketid,
        doorsize: 1,
        stockgroupid: 131,
        laborcode: null,
        productlayout: this.utils.utilities.productlayout
    };

    makeNull() {
        this.utils.utilities.productid = null;
        this.utils.utilities.dealerid = null;
        // this.utils.utilities.natmarketid = null;
        // this.utils.utilities.wf = null;
        // this.utils.utilities.wi = null;
        // this.utils.utilities.hf = null;
        // this.utils.utilities.hi = null;
        this.utils.utilities.doorsize = null;
        this.utils.utilities.stockgroupid = null;
        this.utils.utilities.laborcode = null;
    }

    nextBtn(curr, path) {
        this.utils.setUtils(3, 1);
        if (this.selected) {
            this.goToHome(this.selected);
        }
    }

    prevBtn(curr, path) {
        this.makeNull();
        this.utils.setUtils(1, 0);
        this.route.navigateByUrl('/doorSize');
    }

}
