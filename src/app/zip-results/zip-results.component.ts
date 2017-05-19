import {Component, OnInit} from '@angular/core';
import {ZipResults} from "../shared/zipresults";
import {ActivatedRoute, Router} from '@angular/router';
import {Izip} from "./Izip";
import {LangEnglishService} from "../shared/english";
import {AppUtilities} from "../shared/appUtilities";
import {CollectionData} from "../collection/collection-data";
import {CollectionService} from "../shared/data.service";
import {ToastrService} from "toastr-ng2/toastr-service";
declare var $:any;

@Component({
    selector: 'app-zip-results',
    templateUrl: './zip-results.component.html',
    styleUrls: ['./zip-results.component.less']
})
export class ZipResultsComponent implements OnInit {

    lang;
    results;
    zip;

    constructor(private route:ActivatedRoute
        , private language:LangEnglishService
        , private router:Router
        , private utils:AppUtilities
        , private dataService:CollectionService
        , private toastr:ToastrService
        , private dataStore:CollectionData) {
    }

    navigateTo(item, path) {
        this.utils.utilities.isService = item.isService;
        this.utils.utilities.productlayout = item.productlayout;
        this.utils.utilities.natmarketid = item.natmarketid;
        this.utils.utilities.localmarketid = item.marketid;
        this.utils.utilities.storenumber = +item.storenumber;

        // setting double door height and width
        this.utils.utilities.doubleDoorHeight = item.DoubleDoorHeight;
        this.utils.utilities.doubleDoorWidth = item.DoubleDoorWidth;

        // setting single door height and width
        this.utils.utilities.singleDoorHeight = item.SingleDoorHeight;
        this.utils.utilities.singleDoorWidth = item.SingleDoorWidth;

        this.dataStore.store = item;

        this.router.navigateByUrl(path);
    }

    ngOnInit() {
        this.zip = location.pathname.split('/')[2];
         //this.getData();
        this.lang = this.language.getzipResults();
        this.results=this.dataStore.zipResults;
        
    }


//    getData() {
//        return this.dataService.getZipResults(this.zip)
//            .subscribe(
//                res => {
//                    res = res;
//                    this.utils.utilities.winCode = res.windcode;
//                    this.results = res.Stores;
//                    $('body').removeClass('loader');
//                },
//                error => {
//                    this.toastr.error(`${this.zip} is not correct, try with another one`);
//                    this.router.navigateByUrl('/banner');
//                    $('body').removeClass('loader');
//                }
//            );
//
//
//        // this.utils.utilities.winCode = this.results.windcode;
//    }


}
