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
    @ViewChild('noSize') noSize: ModalComponent;
    showMeasure: boolean = false;
    lang;

    collectionData;
    isValid = true;
    isRequired = false;
    isChecked = false;
    checkboxFlag = false;
    navigateErorFlag = false;


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
    currScreen;

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
        this.utils.resFlowSession.resDoorObj.resetsize();
        if (this.utils.resFlowSession.cart.length > 0) {
            if (this.utils.resFlowSession.cart[0].isDIY) {
                this.utils.resFlowSession.resDoorObj.INSTALLTYPE = 'DIY';
            } else {
                this.utils.resFlowSession.resDoorObj.INSTALLTYPE = 'Installed';
            }
        } else {
            this.utils.resFlowSession.resDoorObj.INSTALLTYPE = 'Installed';
        }
        this.appComponent.currScreen = 3;
        this.lang = this.language.getDoorSize();
        this.widthFeets = this.sizes.getWidthFeets();
        this.makeNull();
        this.navComp.activateIcon();
        this.navComponent.clearDisabledSteps();
        this.navComponent.clearVisitedSteps();
        this.navComponent.setNavFlow('res');
        //defaulting to dtype as 'res' in door-size due to landing from card page
        this.utils.utilities.dtype = 'res';
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
        this.navigateErorFlag = false;
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

        this.utils.resFlow.wf = +this.utils.utilities[door + 'Width'];
        this.utils.resFlow.hf = +this.utils.utilities[door + 'Height'];
        this.utils.resFlow.wi = 0;
        this.utils.resFlow.hi = 0;

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
        this.utils.setLoader();
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
                this.utils.removeLoader();
            },
            error => {
                this.utils.removeLoader();
                this.noSize.open();
            }
        );
    }

    resDetails = this.utils.resFlowSession.resDetails;

    getWidthInches(itm) {
        this.widthInches = this.sizes.getInches(itm, this.selectedWidthFeet);
        this.selectedwidth = "width_" + this.selectedWidthFeet + "_0";
        this.heightFeets = this.sizes.getHeightFeets(this.selectedwidth);
        this.heightFeets = this.heightFeets.filter(function (hf) { return hf <= 12 });
        this.resetWidthAndHeights();

        this.utils.utilities.wi = this.widthInches[0];
        this.utils.utilities.wf = +this.selectedWidthFeet;

        this.utils.resFlow.wf = +this.selectedWidthFeet;
        this.utils.resFlow.wi = this.widthInches[0];

        this.resDetails.widthF = this.widthInches[0];
        this.resDetails.widthI = +this.selectedWidthFeet;

    }

    getHeightInches(itm) {
        this.heightInches = ["0"];
        let selectedWfWi = "width_" + this.selectedWidthFeet + "_" + this.selectedWidthInches;
        if (this.selectedHeightFeet) {
            this.heightInches = this.sizes.getHeightInches(selectedWfWi, this.selectedHeightFeet);
        }

        if (!this.heightInches) {
            this.heightInches = ["0"];
        }

        this.selectedHeightInches = 0;
        if (this.selectedHeightFeet && this.selectedHeightFeet > 0) {
            this.utils.utilities.hf = +this.selectedHeightFeet;
            this.utils.resFlow.hf = +this.selectedHeightFeet;
        }
        else {
            this.utils.utilities.hf = null;
            this.utils.resFlow.hf = null;
        }
        this.utils.utilities.hi = this.heightInches[0];


        this.utils.resFlow.hi = this.heightInches[0];

        this.resDetails.heightF = this.widthInches[0];
        this.resDetails.heightI = this.heightInches[0];
    }

    getWidth() {

        this.heightInches = ["0"];
        this.utils.utilities.hf = null;
        if (this.selectedWidthInches) {
            this.utils.utilities.wi = +this.selectedWidthInches;
            this.utils.resFlow.wi = +this.selectedWidthInches;
            this.resDetails.widthI = +this.selectedWidthInches;
        }
        this.selectedHeightFeet = 0;
    }

    getHeight() {
        if (this.selectedHeightInches) {
            this.utils.utilities.hi = +this.selectedHeightInches;
            this.utils.resFlow.hi = +this.selectedHeightInches;
            this.resDetails.heightI = +this.selectedHeightInches;
        }
    }

    resetWidthAndHeights() {
        this.heightInches = ["0"];
        this.selectedWidthInches = 0;
        this.selectedHeightFeet = 0;
        this.selectedHeightInches = 0;
        this.utils.utilities.hf = null;
    }

    //  check for florida to open the popup
    checkFlorida(isValid) {
        if (this.data.zipResults.state == 'FL') {
            this.showMeasure = true;
            this.isChecked = false;
            if (isValid == true) {
                this.isValid = false;
                this.isRequired = true;
            } else {
                this.isValid = true;
                this.showMeasure = false;
                this.isRequired = true;
            }
            let winCode = +this.utils.utilities.winCode.slice(1);
            if (winCode >= 6) {
                this.checkboxFlag = false; // if user checked the checkbox and returned again
                this.isChecked = true;
                this.modal1.open();
            }
        } else {
            this.showMeasure = !this.showMeasure;
        }
    }
    setFloridaConfirmValue(event) {
        if (event.currentTarget.checked) {
            this.isChecked = false;
        } else {
            this.isChecked = true;
        }
    }

    floridaClose() {
        if (this.isChecked) {
            return false;
        } else {
            this.isChecked = false;
            this.showMeasure = true;
            this.modal1.close();
        }

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

    nextBtn(curr, path?) {

        if (this.utils.utilities.wf != null && this.utils.utilities.wi != null && this.utils.utilities.hf != null && this.utils.utilities.hi != null &&
            this.utils.utilities.hf != 0) {

            this.dataParams.dwidthFt = this.utils.utilities.wf;
            this.dataParams.dwidthIn = this.utils.utilities.wi;
            this.dataParams.dheightFt = this.utils.utilities.hf;
            this.dataParams.dheightIn = this.utils.utilities.hi;

            this.utils.resFlowSession.resDoorObj.size.width['wf'] = this.utils.utilities.wf + '';
            this.utils.resFlowSession.resDoorObj.size.width['wi'] = this.utils.utilities.wi + '';

            this.utils.resFlowSession.resDoorObj.size.height['hf'] = this.utils.utilities.hf + '';
            this.utils.resFlowSession.resDoorObj.size.height['hi'] = this.utils.utilities.hi + '';

            let dimension = (this.utils.utilities.wf * 12) + this.utils.utilities.wi;

            dimension > 120 ? this.setHomeSize("2", false) : this.setHomeSize("1", true);
            // this.utils.utilities.homeSize = this.homeSize;
            console.log(this.utils.utilities.wf,
                this.utils.utilities.wi,
                this.utils.utilities.hf,
                this.utils.utilities.hi);

            if (this.isRequired) {
                if ((this.selectedHeightFeet && this.selectedHeightFeet > 0) && this.selectedWidthFeet > 0) {
                    this.navigateTo(this.dataParams);
                }
            } else {
                this.navigateTo(this.dataParams);
            }

        } else {
            this.navigateErorFlag = true;
            //alert("Please enter your name!");
        }
    }
    setHomeSize(num, door) {
        let utils = this.utils.utilities;
        utils.homeSize = num;
        utils.singleDoor = door;
    }

    prevBtn(curr, path?) {
        this.navComponent.openModal();
    }

    makeNull() {
        this.utils.utilities.wf = null;
        this.utils.utilities.wi = null;
        this.utils.utilities.hf = null;
        this.utils.utilities.hi = null;
    }

    closeNavigationError() {
        if (!this.navigateErorFlag) {
            return true;
        } else {
            this.navigateErorFlag = false;
        }

    }
}
