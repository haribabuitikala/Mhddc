import {Component, OnInit, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {LangEnglishService} from "../shared/english";
import {AppComponent} from "../app.component";
import {ToastrService} from 'toastr-ng2';
import {AppUtilities} from "../shared/appUtilities";
import {CollectionService} from "../shared/data.service";
import {CollectionData} from "../collection/collection-data";

declare var $: any;

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.less']
})
export class BannerComponent implements OnInit {
    zip: any;
    zipCode: any;
    lang: any;


    constructor(private appComponent: AppComponent
        , private route: Router
        , private toastr: ToastrService
        , private localize: LangEnglishService
        , private dataService: CollectionService
        , private dataStore: CollectionData
        , private utils: AppUtilities) {
    }
    save(form, event) {
        event.preventDefault();
        $('body').addClass('loader');
        let len = form.value.zip.length;
        this.dataService.getZipResults(form.value.zip)
            .subscribe(
            res => {
                this.dataStore.zipResults = res;
                $('body').removeClass('loader');
                let resDetails = this.utils.resFlowSession.resDetails;
                resDetails.zip = form.value.zip;
                resDetails.windcode = res.windcode;
                resDetails.county = res.county;
                this.utils.utilities.winCode = res.windcode;
                this.route.navigate(['/zipResults', form.value.zip]);
                this.utils.utilities.zipCode = form.value.zip;

                //  this is for orderobj
                let orderObj = this.utils.resFlowSession.orderObj;
                orderObj.windcode = res.windcode;
                orderObj.zipcode = res.zip;
                orderObj.locale = res;               

            },
            error => {
                alert("No Stores Found, Please Check Your Zip Code & Try Again");
                //this.toastr.error(`${form.value.zip} is not correct, try with another one`);
                $('body').removeClass('loader');
            });
    }
    ngOnChanges() {
        console.log('changed');
    }

    ngOnInit() {
        this.appComponent.currScreen = 0;
        this.lang = this.localize.getBanner();

        this.appComponent.showStepIndicator = false;
    }
    onlyNumberKey(event) {
        let len = event.currentTarget.value.length;
        if (len === 0) $('.show-zip-results').prop('disabled', true);
        if (len > 4) {
            event.preventDefault();
        }
        if (len === 4) {
            $('.show-zip-results').removeAttr('disabled');
        } else
            $('.show-zip-results').prop('disabled', true);
        // return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;

    }

}