import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppComponent} from "../app.component";
import {AppUtilities} from "../shared/appUtilities";
import {NavService} from "../nav/nav-service";
import {CollectionData} from "../collection/collection-data";

@Component({
    selector: 'app-additional-options',
    templateUrl: './additional-options.component.html',
    styleUrls: ['./additional-options.component.less']
})
export class AdditionalOptionsComponent implements OnInit {
    pageNo;
    showMenu;
    data;

    // for gdo the pageNo will be 3
    // for residential the pageNo will be

    constructor(private appComponent:AppComponent
        , private utils:AppUtilities
        , private route:Router
        , private navComp:NavService
        , private dataService:CollectionData) {
    }

    ngOnInit() {
        this.appComponent.next = 'Next';
        this.pageNo = this.utils.utilities.currPage;
        this.showMenu = this.utils.utilities.showNav;
        this.navComp.activateIcon();
        this.data = this.dataService.gdoAdditional;
    }

    nextBtn(path) {
        if (this.utils.utilities.flow === 'gdoNavElems') {
            this.utils.setUtils(4, 1);
            this.goTo('/gdoConfig' + path)
        } else {
            this.goTo('/config' + path)
        }
    }

    prevBtn(path) {
        if (this.utils.utilities.flow === 'gdoNavElems') {
            this.utils.setUtils(2, 0);
            this.goTo('/gdoConfig' + path);
        } else {
            this.goTo('/config' + path)
        }
    }

    goTo(path) {
        this.route.navigateByUrl(path)
    }

}
