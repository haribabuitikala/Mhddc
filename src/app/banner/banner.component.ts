import {Component, OnInit, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {LangEnglishService} from "../shared/english";
import {AppComponent} from "../app.component";
import {CollectionService} from "../shared/data.service";
import {CollectionData} from "../collection/collection-data";

import {ToastrService} from 'toastr-ng2';
declare var $:any;
@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.less']
})
export class BannerComponent implements OnInit {
    zip:any;

    zipCode:any;
    lang:any;

    constructor(private appComponent:AppComponent
        , private route:Router
        , private localize:LangEnglishService
        , private dataService:CollectionService
        , private data:CollectionData) {
    }

    save(form, event) {
        event.preventDefault();
        $('body').addClass('loader');
        this.route.navigate(['/zipResults', form.value.zip])
    }

    ngOnChanges() {
        console.log('changed');
    }

    ngOnInit() {
        this.appComponent.currScreen = 0;
        this.lang = this.localize.getBanner();
    }

}
