import {Component, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from "../app.component";
import {Router} from '@angular/router';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {LangEnglishService} from "../shared/english";
import {SizeList} from "./sizesList";
import {AppUtilities} from "../shared/appUtilities";
// import {NavComponent} from "../nav/nav.component";

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

    getWidthInches(itm) {
        this.widthInches = this.sizes.getInches(itm, this.selectedWidthFeet);
        this.selectedwidth = "width_" + this.selectedWidthFeet + "_0";
        this.heightFeets = this.sizes.getHeightFeets(this.selectedwidth);
        this.heightInches = this.sizes.getInches('height', this.heightFeets[0]);
        this.utils.utilities.width = this.selectedwidth;
    }

    getHeightInches(itm) {
        this.heightInches = this.sizes.getInches(itm, this.selectedHeightFeet);
        // this.selectedHeight = "height_" + this.selectedHeightFeet + "_0";
        this.utils.utilities.height = "height_" + this.selectedHeightFeet + "_0";
    }

    getWidth() {
        this.selectedwidth = "width_" + this.selectedWidthFeet + "_" + this.selectedWidthInches;
        this.heightFeets = this.sizes.getHeightFeets(this.selectedwidth);
        this.utils.utilities.width = this.selectedwidth;
    }

    getHeight() {
        this.selectedHeight = "height_" + this.selectedHeightFeet + "_" + this.selectedHeightInches;
        this.utils.utilities.height = this.selectedHeight;
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

}
