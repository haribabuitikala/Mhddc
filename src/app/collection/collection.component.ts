import {Component, OnInit} from '@angular/core';
import {CollectionData} from "./collection-data";
import {Router} from '@angular/router';
import {AppUtilities} from "../shared/appUtilities";
import {NavService} from "../nav/nav-service";
import {CollectionService} from "../shared/data.service";
import {NavComponent} from "../nav/nav.component";
import {AppComponent} from "../app.component";
declare var $:any;
declare var _:any;
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
    quickShip;

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


    constructor(private data:CollectionData
        , private route:Router
        , private utils:AppUtilities
        , private navComp:NavService
        , private dataService:CollectionService
        , private navComponent:NavComponent
        , private appComponent:AppComponent) {
    }

    collections;
    specialCollections;
    popularCollections;
    selected;
    quickShipObj;

    ngOnInit() {
        this.startProcess();
    }

    startProcess() {
        this.makeNull();
        this.collections = this.data.data;
        this.pageNo = this.utils.utilities.currPage;

        this.quickShipObj = this.collections[0];
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
                    value.imageUrl = "btnCollectionCanyonRidgeUG.png";
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
        let utils = this.utils.utilities;
        if(
            this.utils.resFlow.quickShip > 0 ||
            utils.wf === 9 &&
            utils.wi === 0 &&
            utils.hf === 7 &&
            utils.hi === 0
        ){
            
            this.quickShip = this.utils.resFlow.quickShip;
        }
        
        this.navComp.activateIcon();

        this.navComponent.renderNav({
            flowType: 'res',
            flowActiveStep: 2,
            currentStepUrl: '/collection',
            showStepIndicator: true,
            nextStepFn: () => {
                
            }
        });

    }

    isSelected(itm){
        return this.selected === itm.item_id ? true : false;
    }

    goToHome(speciality) {
        $('body').addClass('loader');
        this.dataService.getHomes()
            .then(res=> {
                let result = res['homes'].home;
                result = _.filter(result, ['_size', this.utils.utilities.homeSize]);
                this.data.homeImages = result;
                // this.setFlow();
                let params = this.setParams(speciality);
                this.dataService.getDesign(params)
                    .subscribe(
                        res => {
                            console.log(res);
                            this.data.designs = res;
                            $('body').removeClass('loader');
                            this.utils.resFlow.quickShip === 1 ? this.route.navigateByUrl('/config') : this.route.navigateByUrl('/home');                            
                        }
                    );
            })
    }

    setParams(obj) {
        let dataParams;
        let utils = this.utils.utilities;
        this.utils.checkDoor();
        return dataParams = {
            "productid": obj.item_id,
            "dtype": utils.dtype,
            "windcode": utils.winCode,
            "natmarketid": +utils.natmarketid,
            "wf": utils.wf,
            "wi": utils.wi,
            "hf": utils.hf,
            "hi": utils.hi,
            "lang": "en",
            "localmarketid": +utils.localmarketid,
            "doorsize": +utils.homeSize
        };
    }

    setFlow() {
        this.navComponent.setNavFlow('res');

        this.navComponent.renderNav({
            flowType: 'res',
            flowActiveStep: 5,
            currentStepUrl: '/collection',
            showStepIndicator: true
        });
    }

    btnquickShip() {
        //   user should be redirected to design page
        //console.log('hi');
        this.goToHome(this.quickShipObj);

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
        this.utils.utilities.wf = null;
        this.utils.utilities.wi = null;
        this.utils.utilities.hf = null;
        this.utils.utilities.hi = null;
        this.utils.utilities.doorsize = null;
        this.utils.utilities.stockgroupid = null;
        this.utils.utilities.laborcode = null;
    }

    nextBtn(curr, path) {
        this.utils.setUtils(3, 1);
        this.route.navigateByUrl(path)
    }

    prevBtn(curr, path) {
        this.makeNull();
        this.utils.setUtils(1, 0);
        this.route.navigateByUrl(path)
    }

}
