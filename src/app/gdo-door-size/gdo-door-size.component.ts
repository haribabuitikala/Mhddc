import {Component, OnInit} from '@angular/core';
import{Router} from '@angular/router';
import {AppComponent} from "../app.component";
import {AppUtilities} from "../shared/appUtilities";

@Component({
    selector: 'app-gdo-door-size',
    templateUrl: './gdo-door-size.component.html',
    styleUrls: ['./gdo-door-size.component.less']
})
export class GdoDoorSizeComponent implements OnInit {

    garageDoorHgt;

    constructor(private appComponent:AppComponent
        , private route:Router
    ,private utils: AppUtilities) {
    }

    ngOnInit() {
        this.appComponent.currScreen = 3;
    }

    goTo(itm) {
        this.utils.utilities.currPage = 1;
        this.route.navigateByUrl('/gdoConfig/opener')
    }

}
