import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUtilities } from "../shared/appUtilities";
import { AppComponent } from "../app.component";
import { NavService } from "../nav/nav-service";
import { NavComponent } from "../nav/nav.component";
import { CollectionData } from "../collection/collection-data";
import { GdoConfigComponent } from "../gdo-config/gdo-config.component";
import { CollectionService } from "../shared/data.service";

// import { QuerySocialService } from 'social-share-ng2';
declare var $: any;
declare var _: any;

@Component({
    selector: 'app-door-configuration',
    templateUrl: './door-configuration.component.html',
    styleUrls: ['./door-configuration.component.less']
})
export class DoorConfigurationComponent implements OnInit {
    directFlow = false;

    pageNo;
    isGdo = this.utils.utilities.isGDO;
    store = this.dataStore.store;
    gdoOpenerTxt = this.utils.utilities.gdoOpenerText;
    gdoOpenerSelected = this.dataStore.gdoOpenerAccessories;
    showEmailMsg = false;
    showGDoEmail;

    // t = _.sumBy(this.gdoOpenerSelected, function(o){ return o.price * o.count });
    itemPrice;
    qty = this.utils.utilities.gdoOpenerQty;
    itmPrice = this.utils.utilities.itmPrice;
    showDistancePrice = false;
    distance = this.utils.utilities.distance;
    distancePrice = this.utils.utilities.distancePrice;
    accessories;
    gdodirectquestions = this.dataStore.gdoDirectQuestions;
    gdodirect;
    showDirectText = this.utils.utilities.directFlow;
    shareEmailTxt;
    emailMsg;

    gdoOpeners = [];



    // for gdo the pageNo will be 4
    // for residential the pageNo will be 

    constructor(private utils: AppUtilities
        , private route: Router
        , private appComp: AppComponent
        , private navComp: NavService
        , private navComponent: NavComponent
        , private dataStore: CollectionData
        , private dataService: CollectionService
        , private gdoConfig: GdoConfigComponent) {
    }

    setNavComponent() {
        this.navComponent.renderNav({
            flowType: 'gdo',
            flowActiveStep: 4,
            currentStepUrl: '/gdoConfig/doorConfiguration',
            showStepIndicator: true,
            nextStepFn: () => {
                this.nextBtn('/shoppingCart');
            }
        });
    }
    ngOnInit() {
        this.directFlow = this.utils.utilities.directFlow;
        if (!this.utils.utilities.directFlow) {
            this.itemPrice = this.utils.calculateTotalPrice();
        } else {
            let data = this.dataStore.gdoAdditionalDirect;
            this.itemPrice = data['item_price'];
        }
        this.pageNo = this.utils.utilities.currPage;
        this.showGDoEmail = this.utils.utilities.showGDoEmail;

        $('body').removeClass('loader');
        // this.appComponent.next = 'Add To Cart';
        this.navComp.activateIcon();
        this.distancePrice > 0 ? this.showDistancePrice = true : this.showDistancePrice = false;
        this.gdoOpenerSelected.length ? this.accessories = true : this.accessories = false;
        // this.gdodirectquestions.length ? this.gdodirect = true : this.gdodirect = false;
        this.gdodirect = this.utils.utilities.directFlow;
        this.gdoConfig.showDetails = false;
        $('.gdoCofigDetails').hide();


        this.gdoOpenerSelected.forEach((gdoItem) => {
            var addedItems = this.gdoOpeners.filter(g => { return g.name === gdoItem.name; });
            if (addedItems.length > 0) {
                if (addedItems[0].count < gdoItem.count) {
                    addedItems[0].count = gdoItem.count;
                }
                if (addedItems[0].totalPrice < gdoItem.totalPrice) {
                    addedItems[0].totalPrice = gdoItem.totalPrice;
                }
            } else {
                this.gdoOpeners.push(gdoItem);
            }
        });

        var k = this.pageNo + '.Your Opener Configuration';
        $('#visualize-header').html(k);


        this.setNavComponent();
        if (this.utils.resFlowSession.resDoorObj.INSTALLTYPE === 'DIY') {
            this.utils.resFlowSession.resDetails.totalPrice = this.utils.utilities.itemPriceDY;
        } else {
            this.utils.resFlowSession.resDetails.totalPrice = this.utils.utilities.itemPriceInstall;
        }
    }
    updateQuantity(flow) {
        // this.utils.updateQty will call calculate total amount internally
        this.itemPrice = this.utils.updateQty(flow, this.utils.utilities.gdoOpenerQty);
        this.gdoConfig.itemPrice = this.itemPrice;
        this.qty = this.utils.utilities.gdoOpenerQty;
    }
    emailBody = this.utils.gdoFlowSession;
    genItems(j, obj) {
        for (var i = 0; i < j.length; i++) {
            var itm = 'itm' + i;
            var itmPrice = 'itm' + i + 'Price';
            var itmDisplay = 'itm' + i + 'Display';
            itmDisplay = 'none';
            if (obj.items[0].QTY) {
                itm = obj.items[i].item_name
                itmPrice = '$' + (obj.items[0].item_price * obj.items[0].QTY).toFixed(2);
                itmDisplay = 'block';
            }
        }
    }
    shareEmail() {
        if (this.shareEmailTxt !== undefined) {
            var data = this.emailBody;
            var windcode = data.windcode;
            var opener = data.cart[0].opener.opener['item_name'];
            var openerPrice = '$' + (data.cart[0].opener.opener['item_price']).toFixed(2);
            var items = this.utils.gdoFlowSession.cart[0].opener.items.length;
            var itm0, itm1, itm2, itm0Price, itm1Price, itm2Price;
            var itm0Display = 'none';
            var itm1Display = 'none';
            var itm2Display = 'none';
            let accesories = this.utils.gdoFlowSession.cart[0].opener;
            switch (items) {
                case 1:
                    if (accesories.items[0].QTY) {
                        itm0 = accesories.items[0].item_name + '(x' + accesories.items[0].QTY + ')';
                        itm0Price = '$' + (accesories.items[0].item_price * accesories.items[0].QTY).toFixed(2);
                        itm0Display = 'block';
                    }
                    break;
                case 2:
                    if (accesories.items[0].QTY && accesories.items[1].QTY) {
                        itm0 = accesories.items[0].item_name + '(x' + accesories.items[0].QTY + ')';
                        itm0Price = '$' + (accesories.items[0].item_price * accesories.items[0].QTY).toFixed(2);
                        itm0Display = 'block';
                        itm1 = accesories.items[1].item_name + '(x' + accesories.items[1].QTY + ')';
                        itm1Price = '$' + (accesories.items[1].item_price * accesories.items[1].QTY).toFixed(2);
                        itm1Display = 'block';
                    }
                    break;
                case 3:
                    if (accesories.items[0].QTY && accesories.items[1].QTY && accesories.items[2].QTY) {
                        itm0 = accesories.items[0].item_name + '(x' + accesories.items[0].QTY + ')';
                        itm0Price = '$' + (accesories.items[0].item_price * accesories.items[0].QTY).toFixed(2);
                        itm0Display = 'block';
                        itm1 = accesories.items[1].item_name + '(x' + accesories.items[1].QTY + ')';
                        itm1Price = '$' + (accesories.items[1].item_price * accesories.items[1].QTY).toFixed(2);
                        itm1Display = 'block';
                        itm2 = accesories.items[2].item_name + '(x' + accesories.items[2].QTY + ')';
                        itm2Price = '$' + (accesories.items[2].item_price * accesories.items[2].QTY).toFixed(2);
                        itm2Display = 'block';
                    }
                    break;
            }
            var itemPrice = this.gdoConfig.itemPrice;

            var body = `
          
          <table style="border-collapse: collapse;width:100%">
            <tr style="border-bottom: 1px solid #ccc">
                <td style="color: #f96302;padding:5px">
                Opener:
                </td>
                <td style="padding:5px">${opener}</td>
                <td>
                 ${openerPrice}
                </td>
            </tr>
            <tr style="border-bottom: 1px solid #ccc" >
                <td style="color: #f96302;padding:5px;display: ${itm0Display}">
                Opener Items:
                </td>
                <td style="padding:5px">
                   <div style="display: ${itm0Display}">${itm0}</div>
                   <div style="display: ${itm1Display}">${itm1}</div>
                   <div style="display: ${itm2Display}">${itm2}</div>
                </td>
                <td style="padding:5px">
                   <div style="display: ${itm0Display}">${itm0Price}</div>
                   <div style="display: ${itm1Display}">${itm1Price}</div>
                   <div style="display: ${itm2Display}">${itm2Price}</div>
                </td>
            </tr><tr>
                <td></td>
                <td>
                <div style="text-align:right;color: #f96302;padding-right:40px">Sub Total:</div>
                </td>
                <td>${'$' + itemPrice.toFixed(2)}</td>
            </tr>
          </table>
        `
            this.showEmailMsg = true;
            this.emailMsg = 'Mail Send Successfully';
            let obj = {
                ToEmail: this.shareEmailTxt,
                Subject: 'Gdo Configuration',
                Body: body
            }
            this.dataService.sendMail(obj)
                .subscribe(res => {
                    console.log('sent mail')
                },
                err => {
                    this.dataService.handleError();
                })
        }
    }

    nextBtn(path) {
        if (this.utils.resFlowSession.resDoorObj.INSTALLTYPE === 'DIY') {
            // this.utils.resFlowSession.resDetails.totalPrice = this.utils.utilities.itemPriceDY;
        } else {
            // this.utils.resFlowSession.resDetails.totalPrice = this.utils.utilities.itemPriceInstall;
        }

        if (this.utils.utilities.flow === 'gdoNavElems') {
            this.utils.setUtils(5, 1);
            $('.shop-count').text('1');
            this.utils.gdoFlowSession.added = true;
            this.goTo(path)
        } else {
            this.goTo(path)
        }
    }
    showSocial = false;

    shareIt() {
        this.showSocial = true;
    }

    prevBtn(path) {
        if (this.utils.utilities.flow === 'gdoNavElems') {
            this.utils.setUtils(3, 0);
            this.utils.utilities.itemsCount = 1;
            this.gdoConfig.quantity = 1;
            this.utils.utilities.gdoOpenerQty = 1;
            this.gdoConfig.itemPrice = this.utils.calculateTotalPrice();
            this.goTo('/gdoConfig' + path);

        } else {
            this.goTo(path)
        }
        this.appComp.currScreen = 2;
        this.utils.resetCalc();
    }

    goTo(path) {
        this.route.navigateByUrl(path)
    }

}
