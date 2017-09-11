import { Component, OnInit, OnChanges, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LangEnglishService } from "../shared/english";
import { AppComponent } from "../app.component";
import { ToastrService } from 'toastr-ng2';
import { AppUtilities } from "../shared/appUtilities";
import { CollectionService } from "../shared/data.service";
import { CollectionData } from "../collection/collection-data";
import { NavComponent } from "../nav/nav.component";

declare var $: any;

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.less']
})
export class BannerComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked {
    zip: any;
    zipCode: any = '';
    lang: any;


    constructor(private appComponent: AppComponent
        , private route: Router
        , private toastr: ToastrService
        , private localize: LangEnglishService
        , private dataService: CollectionService
        , private dataStore: CollectionData
        , private navComponent: NavComponent
        , private elem: ElementRef
        , private utils: AppUtilities) {
    }
    save(form: NgForm) {
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
                this.utils.gdoFlowSession.locale = res;
                this.utils.gdoFlowSession.zipcode = res.zip;

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

    ngAfterViewInit(){
        
    }

    ngAfterViewChecked() {
        $('.logger').html('');
        var value = this.elem.nativeElement.querySelector('.zip-code').value;
        value = value.replace(/[^0-9]/g, '');
        //value = value.substr(0,5);
        this.elem.nativeElement.querySelector('.zip-code').value = value;
    }
    
    ngOnInit() {
        this.utils.gdoFlowSession.cart.length = 0;
        this.utils.resFlowSession.cart.length = 0;
        this.appComponent.currScreen = 0;
        this.lang = this.localize.getBanner();
        this.navComponent.renderNav({
            showStepIndicator: false
        });
        this.getPromo();

        $('.exact-size-loader').remove();
    }

    clearLog() {
        $('.logger').html('');
    }
    onlyNumberKeyDown(event) {
        let value = event.currentTarget.value;
        value = value.replace(/[^0-9]/g, '');
        event.currentTarget.value = value.substring(0,5);
    }
    onlyNumberKey(event, form) {
        let value = this.elem.nativeElement.querySelector('.zip-code').value;
        value = value.replace(/[^0-9]/g, '');
        value = value.substr(0,5);
        this.zipCode = value;
    }
    onPasteZipcode(event) {
        setTimeout(() => {
            let target = event.currentTarget || event.srcElement;
            let value = target.value;
            value = value.replace(/[^0-9]/g, '');
            target.value = value.substr(0, 5);
        }, 0);
    }

    onChange(value) {
        if (!value) {
            //alert("123")
            $(".form-control input").val("")
            $(".form-control input").focus();
            $(".form-control input").setSelectionRange(0, 0)
        }
    }

    getPromo() {

        let id = 0;
        this.dataService.getPromotionsByMarketId(id)
            .subscribe(
            res => {
                if (res && res.length > 0) {
                    var promo = res[0];
                    this.utils.promoObject = res;
                    this.utils.promoObject.promotionid = res.promotionid;
                    //  this.utils.promoObject. = res.promotionid;

                    this.utils.promoObject.bullet0 = promo.bullet0;
                    this.utils.promoObject.bullet1 = promo.bullet1;
                    this.utils.promoObject.dogEarsImageDouble = promo.dogEarsImageDouble;
                    this.utils.promoObject.dogEarsImageSingle = promo.dogEarsImageSingle;
                    this.utils.promoObject.enddate = promo.enddate;
                    this.utils.promoObject.isDogEars = promo.isDogEars;
                    this.utils.promoObject.isHeroGraphic = promo.isHeroGraphic;
                    this.utils.promoObject.promotionid = promo.promotionid;
                    this.utils.promoObject.promotiontype = promo.promotiontype;
                    this.utils.promoObject.storeHeroImage = promo.storeHeroImage;
                    this.utils.promoObject.typeOfPromo = promo.typeOfPromo;

                    this.utils.utilities.isPromoEnabled = true;
                }
                else {
                    this.utils.utilities.isPromoEnabled = false;
                }
                $('body').removeClass('loader');
            },
            error => {
                this.utils.utilities.isPromoEnabled = false;
                $('body').removeClass('loader');
            });
    };

}