import {Component, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from "../app.component";
import {Router} from '@angular/router';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {LangEnglishService} from "../shared/english";
import {SizeList} from "./sizesList";
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
        , private sizes:SizeList) {
    }

    // private navComponent:NavComponent
    ngOnInit() {
        this.appComponent.currScreen = 3;
        this.lang = this.language.getDoorSize();
        this.widthFeets = this.sizes.getWidthFeets();
    }

    getWidthInches(itm) {
        this.widthInches = this.sizes.getInches(itm, this.selectedWidthFeet);
    }
    getHeightInches(itm) {
        this.heightInches = this.sizes.getInches(itm, this.selectedHeightFeet);
    }

    selectedWidth() {
        this.selectedwidth = "width_" + this.selectedWidthFeet + "_" + this.selectedWidthInches;
        this.heightFeets = this.sizes.getHeightFeets(this.selectedwidth);
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
