import {Component, OnInit} from '@angular/core';
import {CollectionData} from "./collection-data";
import {Router} from '@angular/router';
import {AppUtilities} from "../shared/appUtilities";
import {NavService} from "../nav/nav-service";
import {CollectionService} from "../shared/data.service";
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
        , private dataService:CollectionService) {
    }

    collections;
    specialCollections;
    popularCollections;

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

        this.navComp.activateIcon();
    }

    goToHome(speciality) {
        this.dataService.getHomes()
            .subscribe(res=> {
                let result = res.homes.home;
                result = _.filter(result, ['_size', this.utils.utilities.homeSize]);
                this.data.homeImages = result;
                this.route.navigateByUrl('/home');
            })
    }

    quickShip() {
        //   user should be redirected to design page
        console.log('hi');
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
        this.utils.utilities.natmarketid = null;
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
