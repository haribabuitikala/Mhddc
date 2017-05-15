import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppUtilities} from "../shared/appUtilities";
import {AppComponent} from "../app.component";
import {NavService} from "../nav/nav-service";

@Component({
    selector: 'app-door-configuration',
    templateUrl: './door-configuration.component.html',
    styleUrls: ['./door-configuration.component.less']
})
export class DoorConfigurationComponent implements OnInit {

    pageNo;

    // for gdo the pageNo will be 4
    // for residential the pageNo will be 

    constructor(private utils:AppUtilities
        , private route:Router
        , private appComp:AppComponent
        , private navComp:NavService) {
    }

    ngOnInit() {
        this.pageNo = this.utils.utilities.currPage;
        // this.appComponent.next = 'Add To Cart';
        this.navComp.activateIcon();
    }

    nextBtn(path) {
        if (this.utils.utilities.flow === 'gdoNavElems') {
            this.utils.setUtils(5, 1);
            this.goTo(path)
        } else {
            this.goTo(path)
        }
    }

    prevBtn(path) {
        if (this.utils.utilities.flow === 'gdoNavElems') {
            this.utils.setUtils(3, 0);
            this.goTo(path);
        } else {
            this.goTo(path)
        }
        this.appComp.currScreen = 2;
    }

    goTo(path) {
        this.route.navigateByUrl(path)
    }

}
