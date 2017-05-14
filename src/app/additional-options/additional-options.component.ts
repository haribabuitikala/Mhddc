import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";
import {AppUtilities} from "../shared/appUtilities";

@Component({
    selector: 'app-additional-options',
    templateUrl: './additional-options.component.html',
    styleUrls: ['./additional-options.component.less']
})
export class AdditionalOptionsComponent implements OnInit {
    pageNo;
    showMenu;

    constructor(private appComponent:AppComponent
        , private utils:AppUtilities) {
    }

    ngOnInit() {
        this.appComponent.next = 'Next';
        this.pageNo = this.utils.utilities.currPage;
        this.showMenu = this.utils.utilities.showNav;
    }

}
