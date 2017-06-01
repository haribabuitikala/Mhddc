import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from "../app.component";
import { Router } from '@angular/router';
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { LangEnglishService } from "../shared/english";
import { SizeList } from "./sizesList";
import { AppUtilities } from "../shared/appUtilities";
import { CollectionService } from "../shared/data.service";
import { CollectionData } from "../collection/collection-data";
import { ToastrService } from "toastr-ng2/toastr-service";
import { NavService } from "../nav/nav-service";
import { NavComponent } from "../nav/nav.component";
declare var $: any;

@Component({
    selector: 'app-door-size',
    templateUrl: './door-size.component.html',
    styleUrls: ['./door-size.component.less']
})
export class DoorSizeComponent implements OnInit {

    @ViewChild('florida') modal1: ModalComponent;
    showMeasure: boolean = false;
    lang;

    collectionData;
    isValid = true;
    isRequired = false;


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

    // if user did'nt selected door size the default widths should be singleDoorWidth, singleDoorHeight, doubleDoorWidth and doubleDoorHeight
    // based on the selection either single car door or double car door

    constructor(private appComponent: AppComponent
        , private route: Router
        , private language: LangEnglishService
        , private sizes: SizeList
        , private utils: AppUtilities
        , private collection: CollectionService
        , private data: CollectionData
        , private navComponent: NavComponent
        , private toastr: ToastrService
        , private navComp: NavService) {
        utils.clearResFlow();
    }

    // private navComponent:NavComponent
    ngOnInit() {
        this.appComponent.currScreen = 3;
        this.lang = this.language.getDoorSize();
        this.widthFeets = this.sizes.getWidthFeets();
        this.makeNull();
        this.navComp.activateIcon();

        this.navComponent.setNavFlow('res');
        this.navComponent.renderNav({
            flowType: 'res',
            flowActiveStep: 1,
            currentStepUrl: '/doorSize',
            showStepIndicator: true,
            nextStepFn: () => {

            }
        });
    }

    homeSize = "0";
    // set door
    setDoor(door, event) {
        $('.select-door').removeClass('current');
        this.utils.utilities.singleDoor = false;
        this.utils.utilities.doubleDoor = false;
        this.utils.utilities[door] = true;

        // this if for getting the home screen from the json

        this.utils.utilities.singleDoor ? this.homeSize = "1" : this.homeSize = "2";
        this.utils.utilities.homeSize = this.homeSize;

        event.currentTarget.classList.add('current');
        this.utils.utilities.currScreen += 1;

        this.dataParams.dwidthFt = +this.utils.utilities[door + 'Width'];
        this.dataParams.dwidthIn = 0;
        this.dataParams.dheightFt = +this.utils.utilities[door + 'Height'];
        this.dataParams.dheightIn = 0;

 
        this.utils.utilities.wf = this.dataParams.dwidthFt;
        this.utils.utilities.wi = this.dataParams.dwidthIn;
        this.utils.utilities.hf = this.dataParams.dheightFt;
        this.utils.utilities.hi = this.dataParams.dheightIn;
 
        this.utils.resFlowSession.resDoorObj.size.width['wf'] = this.utils.utilities[door + 'Width'];
        this.utils.resFlowSession.resDoorObj.size.height['hf'] = this.utils.utilities[door + 'Height'];
 

        this.utils.resFlowSession.doorSize.door = door;

         console.log(this.utils.utilities.wf,
                this.utils.utilities.wi,
                this.utils.utilities.hf,
                this.utils.utilities.hi);


        this.navigateTo(this.dataParams);
    }

    navigateTo(data) {
        $('body').addClass('loader');
        this.collection.getCollection(data).subscribe(
            res => {
                this.data.data = res;
                this.utils.resFlowSession.doorSize.doorDimensions = data;
                this.utils.resFlowSession.collections = res;
                this.utils.resFlowSession.resDoorObj.product.apiData = res;
                // this.utils.utilities.currPage = 2;
                // this.utils.utilities.clicked = 1;
                this.utils.setUtils(2, 1);
                this.route.navigateByUrl('/collection');
                $('body').removeClass('loader');
            },
            error => {
                this.toastr.error(error.statusText);

            }
        );
    }

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

    //  check for florida to open the popup
    checkFlorida(isValid) {
        if (this.data.zipResults.state == 'FL') {
            this.showMeasure = true;
            if (isValid == true) {
                this.isValid = false;
                this.isRequired = true;
            } else {
                this.isValid = true;
                this.showMeasure = false;
                this.isRequired = true;
            }
            // let winCode = +this.utils.utilities.winCode.slice(1);
            // if (winCode >= 6) {
            this.modal1.open();
            // }
        } else {
            this.showMeasure = true;
        }
    }

    floridaClose() {
        this.showMeasure = true;
        this.modal1.close();
    }

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

    nextBtn(curr, path) {
        if (this.utils.utilities.wf != null && this.utils.utilities.wi != null && this.utils.utilities.hf != null && this.utils.utilities.hi != null) {
            this.dataParams.dwidthFt = this.utils.utilities.wf;
            this.dataParams.dwidthIn = this.utils.utilities.wi;
            this.dataParams.dheightFt = this.utils.utilities.hf;
            this.dataParams.dheightIn = this.utils.utilities.hi;

            this.utils.resFlowSession.resDoorObj.size.width['wf'] = this.utils.utilities.wf + '';
            this.utils.resFlowSession.resDoorObj.size.width['wi'] = this.utils.utilities.wi + '';
 
            this.utils.resFlowSession.resDoorObj.size.height['hf'] = this.utils.utilities.hf + '';
            this.utils.resFlowSession.resDoorObj.size.height['hi'] = this.utils.utilities.hi + ''; 
 

            let dimension = (this.utils.utilities.wf * 12) + this.utils.utilities.wi;

            dimension > 120 ? this.homeSize = "2" : this.homeSize = "1";
            this.utils.utilities.homeSize = this.homeSize;

            console.log(this.utils.utilities.wf,
                this.utils.utilities.wi,
                this.utils.utilities.hf,
                this.utils.utilities.hi);

            if (this.isRequired) {
                if (this.selectedHeightFeet > 0 && this.selectedWidthFeet > 0) {
                    this.navigateTo(this.dataParams);
                }
            } else {
                this.navigateTo(this.dataParams);
            }

        }
    }

    prevBtn(curr, path) {
        this.navComponent.openModal();
    }

    makeNull() {
        this.utils.utilities.wf = null;
        this.utils.utilities.wi = null;
        this.utils.utilities.hf = null;
        this.utils.utilities.hi = null;
    }


}
