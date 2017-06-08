import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { Router } from '@angular/router';
import { AppUtilities } from "../shared/appUtilities";
import { NavService } from "../nav/nav-service";
import { CollectionData } from "../collection/collection-data";
import { CollectionService } from "../shared/data.service";
import { GdoConfigComponent } from "../gdo-config/gdo-config.component";
import { NavComponent } from '../nav/nav.component'
declare var _: any;
declare var $: any;

@Component({
    selector: 'app-opener',
    templateUrl: './opener.component.html',
    styleUrls: ['./opener.component.less']
})
export class OpenerComponent implements OnInit {
    @ViewChild('gdoOponerAccessories') gdoOponerAccessories: ModalComponent;

    constructor(private utils: AppUtilities
        , private navComp: NavService
        , private navComponent: NavComponent
        , private route: Router
        , private dataStrorage: CollectionData
        , private dataService: CollectionService
        , private gdoConfig: GdoConfigComponent) {
    }

    pageNo;
    data;
    number: number;
    gdoOpenertext;
    gdoOpenerObj;
    quantity = 0;

    dataParams = {
        NatMarketID: this.utils.utilities.natmarketid,
        lang: this.utils.utilities.lang,
        openerid: null
    };

    // for gdo flow the pageNo will be 2


    setNavComponent() {
        this.navComponent.renderNav({
            flowType: 'gdo',
            flowActiveStep: 2,
            currentStepUrl: '/gdoConfig/opener',
            nextStepFn: () => {
                this.nextBtn('');
            },
            showStepIndicator: true
        });

        // this.navComponent.renderNav({
        //     flowType: 'res',
        //     flowActiveStep: 2,
        //     currentStepUrl: '/gdoConfig/opener',
        //     nextStepFn: () => {
        //         this.nextBtn('/');
        //     },
        //     showStepIndicator: true
        // });
    }

    ngOnInit() {
        this.pageNo = this.utils.utilities.currPage;
        this.navComp.activateIcon();
        this.data = this.dataStrorage.gdoOpener;
        this.gdoOpenertext = this.data[0].item_description;
        this.dataParams.openerid = this.data[0].item_id;
        this.utils.utilities.openerType = this.data[0].brand;

        // this is for gdo shopping cart
        this.utils.gdoFlowSession.cart.opener.opener = this.data[0];

        this.data = _.chunk(this.data, 2);
        this.number = 6;
        this.gdoOpenerObj = this.dataStrorage.gdoAdditional;


        //  reseting the values
        this.utils.utilities.distancePrice = 0;
        this.utils.utilities.singlep = 0;
        this.utils.utilities.doublep = 0;
        this.utils.utilities.milesp = 0;
        // this.utils.utilities.kPrice = 0;
        this.utils.utilities.distancePrice = 0;

        var k = this.pageNo + '.Choose an Opener';
        $('#visualize-header').html(k);
        $('body').removeClass('loader');
        this.setNavComponent();
    }

    nextBtn(path) {
        $('body').addClass('loader');
        if (this.utils.utilities.flow === 'gdoNavElems') {
            this.utils.setUtils(3, 1);
            this.utils.utilities.gdoOpenerText = this.gdoOpenertext;
            this.dataService.getGdoAdditional(this.dataParams)
                .subscribe(
                res => {
                    // this.route.navigateByUrl(path);
                    this.gdoOpenerObj = res;
                    this.utils.gdoFlowSession.cart.opener.apiData = res;
                    $('body').removeClass('loader');
                    this.gdoOponerAccessories.open();
                    // this.goTo('gdoConfig' + path)
                }
                )


        } else {
            $('body').removeClass('loader');
            this.goTo('config' + path)
        }
    }


    accessoriesModalClose() {
        this.dataStrorage.gdoOpenerAccessories = [];
        this.gdoOponerAccessories.close();
    }

    accessoriesModalNext() {
        $('body').addClass('loader');
        this.route.navigateByUrl('/gdoConfig/additionalOptions');
    }

    // selectedGdoCount(obj, event, i) {
    //     let k = i;
    //     let t = [];
    //     k = {
    //         name: obj.item_name,
    //         price: obj.item_price,
    //         count: +event.srcElement.value,
    //         totalPrice: obj.item_price * +event.srcElement.value
    //     };
    //     this.dataStrorage.gdoOpenerAccessories.splice(i, 1);
    //     this.dataStrorage.gdoOpenerAccessories.push(k);
    // }

    updateQuantity(obj, flow) {
        if (flow === 1 && this.quantity < 6) {
            this.quantity++
        }
        else if (flow === 0 && this.quantity > 1) {
            this.quantity--;
        }

        let k = flow;
        let t = [];
        k = {
            name: obj.item_name,
            price: obj.item_price,
            count: this.quantity,
            totalPrice: obj.item_price * this.quantity
        };
        this.dataStrorage.gdoOpenerAccessories.splice(flow, 1);
        this.dataStrorage.gdoOpenerAccessories.push(k);
        this.utils.utilities.gdoOpenerQty = this.quantity;
        this.utils.utilities.kPrice = this.utils.sumBy(this.dataStrorage.gdoOpenerAccessories);
        this.gdoConfig.itemPrice = this.utils.calculateTotalPrice()


        // this.itemPrice = (this.itmPrice * this.quantity) +
        //     (this.utils.utilities.gdoDoubleDoor + this.utils.utilities.gdoSingleDoor + this.utils.utilities.distancePrice);
        // this.utils.utilities.item_price = this.itemPrice;
        // this.utils.utilities.gdoOpenerQty = this.quantity;
    }

    getOpenerId(data) {
        this.dataParams.openerid = data.item_id;
        this.utils.utilities.openerType = data.brand;
        this.gdoOpenertext = data.item_name;
        this.gdoConfig.openerTxt = data.item_name;
        // this.gdoOpenerObj = null;
        // this.gdoOpenerObj = data;
    }

    prevBtn(path) {
        if (this.utils.utilities.flow === 'gdoNavElems') {
            this.utils.setUtils(1, 0);
            this.goTo(path)
        } else {
            this.goTo('/config' + path)
        }
        this.resetPrice();
        this.utils.resFlowSession.resDoorObj.resetFromStep(8);
    }

    goTo(path) {
        this.route.navigateByUrl(path);
    }

    resetPrice() {
        this.utils.resFlowSession.resDoorObj.opener.opener = null;
        this.utils.resFlowSession.resDoorObj.opener.items = [];
    }

}
