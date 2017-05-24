import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {Router} from '@angular/router';
import {LangEnglishService} from "../shared/english";
import {AppUtilities} from "../shared/appUtilities";
import {AppComponent} from "../app.component";
import {CollectionService} from "../shared/data.service";
import {CollectionData} from "../collection/collection-data";
import { NavComponent } from "../nav/nav.component";
declare var $:any;

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

    constructor(private language:LangEnglishService
        , private route:Router
        , private utilities:AppUtilities
        , private appComponent:AppComponent
        , private navComp:NavComponent
        , private dataService:CollectionService
        , private dataStore:CollectionData) {
    }

    ngOnInit() {
        this.lang = this.language.getCategory();
        this.isService = this.utilities.utilities.isService;
        this.appComponent.currScreen = 2;
        let utils = this.utilities.utilities; 
    }

    navigateTo(path, flow, count) {
        this.utilities.utilities.flow = flow;
        flow === 'residentialNavElems' ? this.utilities.utilities.dtype = 'res' : this.utilities.utilities.dtype = 'gdo';
        this.utilities.utilities.navCount = count;
        if (flow === 'residentialNavElems') {
            this.utilities.utilities.currPage = 1;
            this.utilities.utilities.currScreen += 1;
            this.navComp.setNavFlow('res');
            this.route.navigateByUrl(path);
        } else {
            let zipCode = this.utilities.utilities.zipCode;
            let storeNum = this.utilities.utilities.storenumber;
            let arr = JSON.stringify(this.utilities.gdoCheck);
         arr.indexOf(zipCode) !== -1 || arr.indexOf(storeNum) !== -1 ? this.gdoGoTo('/gdoDoorSize', 'size') : this.gdo.open();
        }
    }

    serviceRepair() {
        window.location.href = 'http://hdservices.homedepot.com/services/garage-door-opener-repair/';
    }

    showModal() {
        this.modal.open();
    }

    gdoGoTo(path, id) {
        this.utilities.utilities.isGDO = true;
        if (id === 'size') {
            this.utilities.utilities.currPage = 3;
            this.utilities.utilities.clicked = null;
            this.utilities.utilities.showNav = true;
            this.utilities.utilities.ProductType = 'gdo';
            this.utilities.utilities.visualizeHeader = true;
            this.utilities.utilities.directFlow = false;
            this.navComp.setNavFlow('gdo');
            this.route.navigateByUrl(path);
        } else {
// this is for additional options screen
            let utils = this.utilities.utilities;
            this.utilities.utilities.visualizeHeader = false;
            let dataparams = {
                lang: utils.lang,
                localmarketid: utils.localmarketid,
                NatMarketID: utils.natmarketid,
                isGDO: true,
                ProductType: 'gdo',
                isinstall: true,
                openertype: utils.gdoStore
            };
            this.dataService.getGdoAdditionalDirect(dataparams)
                .subscribe(
                    res => {
                        this.utilities.utilities.directFlow = true;
                        this.dataStore.gdoAdditionalDirect = res;
                        this.navComp.setNavFlow('gdo', true);
                        this.route.navigateByUrl(path);
                    }
                );

        }
    }


}
