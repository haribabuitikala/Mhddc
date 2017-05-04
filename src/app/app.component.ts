import {Component, OnInit, AfterViewInit, OnChanges} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {AppUtilities} from "./shared/appUtilities";
import {NavComponent} from "./nav/nav.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [NavComponent]
})
export class AppComponent implements OnInit {

    constructor(private route:Router
        , private location:Location
        , private app:AppUtilities
        , private nav:NavComponent) {
    }

    prev:string = 'Prev';
    next:string = 'Next';

    ngOnChanges(){
        this.currScreen = this.app.utilities.currScreen;
    }

    currScreen;
    navElems = [
        "/banner",
        "/zipResults",
        "/category",
        "/doorSize",
        "/collection",
        "/home",
        "/config",
        "/config/construction",
        "/config/color",
        "/config/topSection",
        "/config/glassType",
        "/config/nonClassic",
        "/config/lock",
        "/config/install",
        "/installQuestion",
        "/installAnswer",
        "/config/diy",
        "/config/opener",
        "/config/openerSelected",
        "/config/additionalOptions",
        "/config/doorConfiguration",
        "/thankyou"
    ];


    // this is for checking whether Install or Diy selected for routing to appropriate screen
    selectedInstallDiy:string;

    ngOnInit() {
        this.currScreen = this.navElems.indexOf(this.location.path());
        this.location.path() === '/thankyou' ? this.currScreen = 2 : this.currScreen = this.navElems.indexOf(this.location.path());
    }

    nextBtn(id):void {
        if (this.navElems[id + 1] !== undefined) {
            this.currScreen = id + 1;
            if (this.selectedInstallDiy === 'diy') {
                this.currScreen = id + 2
            }
            this.app.utilities.currPage = this.currScreen - 2;
            this.app.utilities.currScreen = this.app.utilities.currScreen;
            this.app.utilities.clicked = 1;
            this.toRoute(this.currScreen);
        }
    }

    prevBtn(id):void {

        this.currScreen = id - 1;
        if (this.location.path() === '/config/opener') {
            this.currScreen = this.navElems.indexOf('/config/install');
        }
        this.app.utilities.currPage = this.app.utilities.currPage -1;
        this.app.utilities.currScreen = this.currScreen;
        this.app.utilities.clicked = 0;
        this.toRoute(this.currScreen)
    }

    toRoute(path) {
        let link:any = this.navElems[path];
        this.route.navigateByUrl(link);
    }

}
