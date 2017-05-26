import {Component, OnInit} from '@angular/core';
import {CollectionData} from "../collection/collection-data";
import {Router} from '@angular/router';
import {CollectionService} from "../shared/data.service";
import {NavComponent} from "../nav/nav.component";

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
    }

    setParams() {
        return {
            "NatMarketID": 6000,
            "marketID": 75,
            "productid": 12,
            "dheightFt": 7,
            "dheightIn": 0,
            "dwidthFt": 16,
            "dwidthIn": 0,
            "dtype": "res",
            "windcode": "w0",
            "lang": "en",
            "clopaymodelnumber": "GR2LU",
            "colorconfig": "COLR-DO"
        }
    }

    nextBtn(path) {
        let params = this.setParams();
        this.dataService.getTopSection(params)
            .subscribe(
                res => {
                    this.dataStore.topSection = res;
                    this.route.navigateByUrl(path);
                }
            )
    }

}
