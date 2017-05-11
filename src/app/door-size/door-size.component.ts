import {Component, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from "../app.component";
import {Router} from '@angular/router';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {LangEnglishService} from "../shared/english";
import {SizeList} from "./sizesList";
import {AppUtilities} from "../shared/appUtilities";
// import {NavComponent} from "../nav/nav.component";
declare var $:any;

@Component({
    selector: 'app-door-size',
    templateUrl: './door-size.component.html',
    styleUrls: ['./door-size.component.less']
})
export class DoorSizeComponent implements OnInit {

    @ViewChild('florida') modal1:ModalComponent;
    showMeasure:boolean = false;
    lang;

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

    constructor(private appComponent:AppComponent
        , private route:Router
        , private language:LangEnglishService
        , private sizes:SizeList
        , private utils:AppUtilities) {
    }

    // private navComponent:NavComponent
    ngOnInit() {
        this.appComponent.currScreen = 3;
        this.lang = this.language.getDoorSize();
        this.widthFeets = this.sizes.getWidthFeets();
    }

    // set door
    setDoor(door, event) {
        $('.select-door').removeClass('current');
        this.utils.utilities.singleDoor = false;
        this.utils.utilities.doubleDoor = false;
        this.utils.utilities[door] = true;
        event.currentTarget.classList.add('current');
    }

    getWidthInches(itm) {
        this.widthInches = this.sizes.getInches(itm, this.selectedWidthFeet);
        this.selectedwidth = "width_"+this.selectedWidthFeet+"_0";
        this.heightFeets = this.sizes.getHeightFeets(this.selectedwidth);
        this.heightInches = this.sizes.getInches('height', this.heightFeets[0]);
        this.utils.utilities.wi = this.widthInches[0];
        this.utils.utilities.wf = this.selectedWidthFeet;
        this.utils.utilities.hf = this.heightFeets[0];
        this.utils.utilities.hi = this.heightInches[0];
    }

    getHeightInches(itm) {
        this.heightInches = this.sizes.getInches(itm, this.selectedHeightFeet);
        // this.selectedHeight = "height_" + this.selectedHeightFeet + "_0";
        this.utils.utilities.hi = this.selectedHeightFeet;
    }

    getWidth() {
        this.heightFeets = this.sizes.getHeightFeets(this.selectedwidth);
        this.utils.utilities.wf = this.selectedWidthFeet;
    }

    getHeight() {
        this.utils.utilities.hf = this.selectedHeightFeet;
    }

    //  check for florida to open the popup
    checkFlorida() {
        let winCode = +this.utils.utilities.winCode.slice(1);
        if (winCode >= 6) {
            this.modal1.open();
        }
        this.showMeasure = true;
    }

    navigateTo(path) {
        //this.appComponent.currScreen = this.appComponent.navElems.indexOf(path); 
        // this.route.navigateByUrl(path);
        this.appComponent.currScreen = 3;
    }

    floridaClose() {
        this.showMeasure = true;
        this.modal1.close();
    }

    dataParams = {
        dtype: '',
        wincode: this.utils.utilities.winCode,
        wf: this.utils.utilities.wf, // width feet
        wi: this.utils.utilities.wi, // width inches
        hf: this.utils.utilities.hf, // height feet
        hi: this.utils.utilities.hi, // height inches
        natmarketid: this.utils.utilities.natmarketid,
        localmarketid: null, // we are not getting
        productlayout: this.utils.utilities.productlayout //
    };

}
