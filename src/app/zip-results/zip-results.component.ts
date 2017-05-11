import {Component, OnInit} from '@angular/core';
import {ZipResults} from "../shared/zipresults";
import {ActivatedRoute, Router} from '@angular/router';
import {Izip} from "./Izip";
import {LangEnglishService} from "../shared/english";
import {AppUtilities} from "../shared/appUtilities";

@Component({
    selector: 'app-zip-results',
    templateUrl: './zip-results.component.html',
    styleUrls: ['./zip-results.component.less']
})
export class ZipResultsComponent implements OnInit {

    lang;
    results:Izip;

    constructor(private route:ActivatedRoute
        , private language:LangEnglishService
        , private router:Router
        , private utils:AppUtilities) {
    }

    navigateTo(item, path) {
        this.utils.utilities.isService = item.isService;
        this.utils.utilities.productlayout = item.productlayout;
        this.utils.utilities.natmarketid = item.natmarketid;

        // setting double door height and width
        this.utils.utilities.doubleDoorHeight = item.DoubleDoorHeight;
        this.utils.utilities.doubleDoorWidth = item.DoubleDoorWidth;

        // setting single door height and width
        this.utils.utilities.singleDoorHeight = item.SingleDoorHeight;
        this.utils.utilities.singleDoorWidth = item.SingleDoorWidth;


        this.router.navigateByUrl(path);
    }

    ngOnInit() {
        let stores = this.route.snapshot.data['results'];
        this.results = stores.Stores;
        this.utils.utilities.winCode = stores.windcode;
        this.lang = this.language.getzipResults();
    }


}
