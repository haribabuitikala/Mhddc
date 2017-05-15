import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {Router} from '@angular/router';
import {LangEnglishService} from "../shared/english";
import {AppUtilities} from "../shared/appUtilities";
import {AppComponent} from "../app.component";
import {CollectionService} from "../shared/data.service";
import {CollectionData} from "../collection/collection-data";

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.less']
})
export class CategoryComponent implements OnInit {
    @ViewChild('modal') modal:ModalComponent;
    @ViewChild('gdo') gdo:ModalComponent;
    lang;
    isService:boolean;
    dataParams;

    constructor(private language:LangEnglishService
        , private route:Router
        , private utilities:AppUtilities
        , private appComponent:AppComponent
        , private dataService:CollectionService
        , private dataStore:CollectionData) {
    }

    ngOnInit() {
        this.lang = this.language.getCategory();
        this.isService = this.utilities.utilities.isService;
        this.appComponent.currScreen = 2;

    }

    navigateTo(path, flow, count) {
        this.utilities.utilities.flow = flow;
        flow === 'residentialNavElems' ? this.utilities.utilities.dtype = 'res' : this.utilities.utilities.dtype = 'gdo';
        this.utilities.utilities.navCount = count;
        if (flow === 'residentialNavElems') {
            this.utilities.utilities.currPage = 1;
            this.utilities.utilities.currScreen += 1;
            this.route.navigateByUrl(path);
        } else {
            this.gdo.open();
        }
    }

    serviceRepair() {
        window.location.href = 'http://hdservices.homedepot.com/services/garage-door-opener-repair/';
    }

    showModal() {
        this.modal.open();
    }

    gdoGoTo(path, id) {
        if (id === 'size') {
            this.utilities.utilities.currPage = 3;
            this.utilities.utilities.clicked = null;
            this.utilities.utilities.showNav = true;
            this.utilities.utilities.isGDO = true;
            this.utilities.utilities.ProductType = 'gdo';
            this.route.navigateByUrl(path);
        } else {
            this.dataParams = {
                NatMarketID: +this.utilities.utilities.natmarketid,
                openerid: this.utilities.utilities.openerid = 2,
                lang: this.utilities.utilities.lang
            };

            this.dataService.getGdoAdditional(this.dataParams)
                .subscribe(
                    res => {
                        this.dataStore.gdoAdditional = res;
                        this.route.navigateByUrl(path);
                    }
                )

        }
    }


}
