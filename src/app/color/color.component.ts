import {Component, OnInit} from '@angular/core';
import {CollectionData} from "../collection/collection-data";
import {Router} from '@angular/router';
import {CollectionService} from "../shared/data.service";
import {ConfigComponent} from "../config/config.component";
import {NavComponent} from "../nav/nav.component";
import { AppUtilities } from "../shared/appUtilities";

declare var _:any;

@Component({
    selector: 'app-color',
    templateUrl: './color.component.html',
    styleUrls: ['./color.component.less']
})
export class ColorComponent implements OnInit {

    constructor(private dataStore:CollectionData
        , private route:Router
        , private navComponent:NavComponent
        , private utils:AppUtilities
        , private config:ConfigComponent
        , private dataService:CollectionService) {
    }

    data;
    number = 6;
    folder = 'color';

    ngOnInit() {
        this.startProcess();
    }

    startProcess() {
        let res = this.dataStore.colors;
        this.data = _.chunk(res, 6);

        this.navComponent.renderNav({
            flowType: 'res',
            flowActiveStep: 6,
            currentStepUrl: '/config/color',
            showStepIndicator: true,
            nextStepFn: () => {

            }
        });

        this.config.pageTitle = '6.Choose Your Color';

        this.utils.resFlowSession.resDoorObj.color.apiData = res;
        this.utils.resFlowSession.resDoorObj.color.base = res[0];
        this.utils.resFlowSession.resDoorObj.color.overlay = res[0];
    }

    setParams() {
        // return {
        //     "NatMarketID": 6000,
        //     "marketID": 75,
        //     "productid": 12,
        //     "dheightFt": 7,
        //     "dheightIn": 0,
        //     "dwidthFt": 16,
        //     "dwidthIn": 0,
        //     "dtype": "res",
        //     "windcode": "w0",
        //     "lang": "en",
        //     "clopaymodelnumber": "GR2LU",
        //     "colorconfig": "COLR-DO"
        // };

        let utils = this.utils.utilities;
        var resDoorObj = this.utils.resFlowSession.resDoorObj;
        return {
            "dtype": 'RES',
            "productid": resDoorObj.product.product['item_id'],
            "windcode": "W0",
            "NatMarketID": +utils.natmarketid,
            "doorcolumns": resDoorObj.design.dsgn['Columns'],
            'colorconfig': resDoorObj.color.base['colorconfig'],
            "clopaymodelnumber": resDoorObj.construction.construction['ClopayModelNumber'],
            "dwidthFt": utils.wf,
            "dwidthIn": utils.wi || 0,
            "dheightFt": utils.hf,
            "dheightIn": utils.hi || 0,
            "lang":"en",
            "marketID": +utils.localmarketid,
            "doorsize": +utils.homeSize
        };
    }

    nextBtn(path) {
        let params = this.setParams();
        this.dataService.getTopSection(params)
            .subscribe(
                res => {
                    this.dataStore.topSection = res;
                    this.utils.resFlowSession.resDoorObj.windows.apiData = res;
                    this.route.navigateByUrl(path);
                }
            )
    }

}
