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
            this.itemPrice = data['item_price'] * this.qty;
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
    };
    toPng(itm) {
        let t = itm.split('.')[0];
        return t + '.png';
    }


    renderAccesoriesDiv() {
        if (this.accessories) {
            var OpnerAcc = "";
            var itemHead = "Opener Accessories";
            var itemValue = "";
            var itemPrice = "";
            var temptr = "";
            temptr = ` <tr style="border-bottom: 1px solid #ccc">
                            <td style="color: #f96302;padding:5px">${itemHead}</td>
                            <td>${itemValue}</td>
                            <td>${itemPrice}</td>
                        </tr>`;

            OpnerAcc += temptr;
            $.each(this.gdoOpeners, function (arrayID, gdoOpener) {
                itemHead = "";
                itemValue = gdoOpener.name + "(" + gdoOpener.count + ")";
                itemPrice = Number(gdoOpener.price * gdoOpener.count).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
                temptr = ` <tr style="border-bottom: 1px solid #ccc">
                            <td style="color: #f96302;padding:5px">${itemHead}</td>
                            <td>${itemValue}</td>
                            <td>${itemPrice}</td>
                        </tr>`;

                OpnerAcc += temptr;
            });

            return OpnerAcc;
        }
        else {
            return "";
        }
    };

    renderDistance() {
        var temptr = "";
        if (this.showDistancePrice) {

            var itemHead = "Additional Options";
            var itemValue = this.distance;
            var itemPrice = Number(this.distancePrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            temptr = ` <tr style="border-bottom: 1px solid #ccc">
                    <td style="color: #f96302;padding:5px">${itemHead}</td>
                    <td>${itemValue} miles from store </td>
                    <td>${itemPrice}</td>
                </tr>`;

            return temptr;
        }
        else {
            return "";
        }

    };

    renderTotalDiv() {
        var totalPrice = Number(this.itemPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        var temptrp = "";
        var temptr = `<div class="sub-total"><strong>Sub-Total ${totalPrice}</strong><br/>
                     <i>Tax not included if applicable</i>
                      </div>`;




        return (temptr);
    };



    shareGDOEmail() {
        if (this.shareEmailTxt !== undefined) {
            var data = this.emailBody;
            var windcode = data.windcode;
            var opener = data.cart[0].opener.opener['item_name'];
            var GdoType: string[] = opener.split(" ");
            var openerPrice = '$' + (data.cart[0].opener.opener['item_price']).toFixed(2);
            var items = this.utils.gdoFlowSession.cart[0].opener.items.length;
            var itm0, itm1, itm2, itm0Price, itm1Price, itm2Price;
            var itm0Display = 'none';
            var itm1Display = 'none';
            var itm2Display = 'none';
            let accesories = this.utils.gdoFlowSession.cart[0].opener;
            var itemPrice = this.gdoConfig.itemPrice;
            var gdoBanner = this.toPng(this.utils.utilities.gdoBanner);
            var opnerAcc = this.renderAccesoriesDiv();
            var distDiv = this.renderDistance();
            var totalBody = this.renderTotalDiv();
            var appInstance = "http://dev-mhddc.clopay.com";
            var body = `
<!DOCTYPE HTML>
<html>
<head>
  <style type="text/css">

body {
            
            font-family: Helvetica, Arial, sans-serif;           
            width: 100%;
            color: #333;
             font-weight: normal;
             font-size: 14px;
        }
		
		.div70 {
    float: left;
    width: 70%;
}

.div30 {
  float: right;
    width: 210px;
    height: 130px;   
    display: block;
    overflow: hidden;
    padding: 10px;
    margin: 30px;		
}

.sub-total {
    float: right;
    text-align: right;
    padding-top: 15px;padding-bottom: 10px;
    width: 100%;
}

.div70 table tr td:last-child {
    text-align: right;


} 

table td {
 color: #333;
 font-weight: normal;
 font-size: 12px!important;
}

 </style>
</head>
   <body style="font-family: Helvetica, Arial, sans-serif;width: 100%; color: #333;  font-weight: normal; font-size: 14px; ">
</body>
</html>

           <div style="text-align: center; break-after: page;">
                        <a href="#">
                            <img src="${appInstance}/assets/images/ClopayLogo.png" width="180" height="93">
                             </a>                            
						</div>
                          <div style="background: #fff;">  
                          <div style='height: 250px; margin:0 auto;'>
                     <img id='printIMG' src='${appInstance}/assets/images/openers/banner${gdoBanner}' style='max-width: 280px; margin:0 auto;' >
                   
                 </div>

                 <br />
                 <p style="padding: 5px;">
                    Thanks for your interest in purchasing a Clopay garage door opener through The Home Depot. Below is some basic information on the door opener 
                    you designed, what our program includes, and how our program works. We look forward to serving you in the near future.
                    </p>
                    <hr />
                    <br />
                    <div class="div70">
                <div id="ourCfg" style="padding:6px; border-bottom: thin solid #bbb;">YOUR OPENER CONFIGURATION</div>
            <table style="border-collapse: collapse;width:100%">          
            <tr style="border-bottom: 1px solid #ccc">
                    <td style="color: #f96302;padding:5px">Opener</td>
                    <td>${opener}</td>
                    <td>${openerPrice}</td>
                </tr>    
                ${opnerAcc}
                ${distDiv}
          </table>${totalBody}
          </div>
          <div class="div30"></div>

    <div style="position: relative; top: 0px; left: 0px; width: 550px; font-family: Arial, Helvetica, sans-serif; color: #555;" id="termsholder">
    <div style="text-align: center; break-after: page;">
        <h3 style="font-size:14px; font-weight: bold;">Terms & Conditions</h3>
        <h4 style="font-weight: bold;color:#f96302;">BASIC INSTALLATION PRICE INCLUDES</h4>
        <ul style="font-size:12px;">
        <li>Delivery of operator (within 30 miles of store)</li>
        <li>Take down and haul away of existing opener</li>
        <li>Installation to manufacturer's specifications of (1) new garage door opener up to 8' from floor and within 3' of 
        ceiling using installer provided angle iron</li>
        <li>Detailed inspection of existing garage door for proper operation</li>
        <li>Install garage door mounting bracket (included with opener)</li>
        <li>Install drawbar plate on all steel doors</li>
        <li>Install extension kit for 8' door (if required)</li>
        <li>Install quick turn brackets for low headroom installs (if required)</li>
        <li>Shorten rail (if required)</li>
        <li>Install push button and safety beam system included with opener</li>
        <li>Install light bulbs in garage door opener unit (provided by homeowner)</li>
        <li>Install emergency release (if required by code)</li>
        <li>Program opener and applicable remote control devices (when included with opener)</li>
        <li>Install wireless keypad (when included with opener)</li>
        <li>Adjust torsion or extension springs for proper balance (if applicable)</li>
        <li>Minor adjustments and lubrication of existing garage door</li>
        <li>Demonstrate new opener and accessories to customer</li>
        <li>Job site clean up</li>
        </ul>


        <h4 style="font-weight: bold;color:#f96302;">WHAT TO EXPECT ONCE WE RECEIVE YOUR ORDER</h4>
        <ul style="font-size:12px;">
        <li>Installer will call customer to schedule appointment</li>
        <li>Once installer arrives at jobsite, he/she will inspect for additional work that may be required</li>
        <li>Installer will notify you of additional work, if required, and any applicable charges</li>
        <li>If you approve additional charges, the installer will complete an authorization form and have you sign with 
        credit card number</li>
        <li>Installer will install opener, make necessary adjustments, and/or agreed upon repairs</li>
        <li>After the opener is installed and repairs/adjustments made, installer will review operating and programming 
        procedures with you to ensure proper operation and remote programming</li>
        <li>Installer will leave operator manual with you as well as GDO trouble-shooting tip sheet</li>
        <li>You must do the following prior to the installation date:</li>
        <li>Clear out the garage a minimum of 10' back from the garage opening</li>
        <li>Arrange so that pets and children are kept away from the installation project area</li>
        <li>Disconnect any alarm systems</li>
        <li>Arrange to have you or a representative (at least 18 years old) home for the entire installation</li>
        <li>Upon completion of the installation you or your representative will be asked to sign a lien waiver verifying 
        service completed</li>
        </ul>
</div>

        <h4 style="font-size:12px; font-weight: bold;" align="center">Special Notes About Your Garage Door Opener Installation</h4>
        <h4 style="font-weight: bold;color:#f96302;">BEFORE YOUR INSTALLATION:</h4>
        <ul style="font-size:12px;">
        <li>THE INSTALLER WILL CALL YOU WITHIN 3 BUSINESS DAYS TO SCHEDULE THE INSTALLATION DATE AND DISCUSS 
        JOBSITE CONDITIONS INCLUDING EXISTING DOOR MEASUREMENTS, TYPE & CONDITION OF DOOR, HEADROOM & 
        ELECTRICAL REQUIREMENTS, ETC...</li>
        <li>FOR A COMPLETE INSTALLATION, THERE SHOULD BE AN APPROVED 110 VOLT ELECTRICAL OUTLET WITHIN 3' OF 
        THE POWER HEAD OF THE OPENER. IF NO OUTLET IS IN PLACE, BUT POWER IS AVAILABLE THROUGH AN 
        EXTENSION CORD, THE INSTALLER WILL USE IT TO TEST AND ADJUST THE OPENER BUT WILL NOT LEAVE THE 
        EXTENSION CORD IN PLACE.</li>
        <li>CUSTOMER IS RESPONSIBLE FOR CLEARING THE GARAGE FLOOR 10' BACK FROM THE OPENING PRIOR TO THE 
        INSTALLATION DATE TO ALLOW AMPLE SPACE FOR INSTALLATION.</li>
        </ul>
        
        
        <h4 style="font-weight: bold;color:#f96302;">DURING THE INSTALLATION:</h4>
        <ul style="font-size:12px;">
        <li>AN ADULT OVER 18 YEARS OF AGE WITH THE AUTHORITY TO MAKE DECISIONS ABOUT YOUR INSTALLATION MUST 
        BE PRESENT DURING THE JOBSITE INSPECTION AND INSTALLATION.</li>
        <li>CHILDREN AND PETS MUST BE KEPT AWAY FROM THE WORK AREA</li>
        <li>THE CUSTOMER WILL BE REQUIRED TO SIGN A WAIVER UPON THE COMPLETION OF THE JOB.
        </li></ul>


        <h4 style="font-weight: bold;color:#f96302;">FACTORS TO CONSIDER:</h4>
        <ul style="font-size:12px;">
        <li>DANGEROUS WEATHER CONDITIONS MAY CAUSE THE INSTALLATION TO BE RE-SCHEDULED.</li>
        <li>CANCELING APPOINTMENTS WITH INSTALLERS WITHOUT 24 HOUR NOTICE OR MISSING SCHEDULED 
        APPOINTMENTS WILL LEAD TO ADDITIONAL TRIP CHARGES</li>
        <li>ONLY THE INSTALLER CAN SCHEDULE AN INSTALLATION DATE.</li>
        <li>HOME DEPOT WILL ONLY INSTALL GARAGE DOOR OPENERS IN RESIDENTIAL BUILDINGS</li>
        <li>IF UNFORESEEN LABOR IS NEEDED (E.G.. REPAIR DAMAGE FROM TERMITES, ELECTRICAL, OR PLUMBING 
        PROBLEMS) THERE WILL BE EXTRA CHARGES. IN SOME CASES, THIS LABOR MAY NOT BE AVAILABLE FROM THE  
        HOME DEPOT, SO THE  CUSTOMER MUST HIRE THEIR OWN REPAIR MAN </li></ul>

        <h4 style="font-weight: bold;color:#f96302;">SERVICE NOT AVAILABLE WITH THIS INSTALLATION PROGRAM:</h4>
        <ul style="font-size:12px;">
        <li>ANY ELECTRICAL WORK (OTHER THAN CONTENTS OF PACKAGED OPENER**) <p style="color:#434343;">
        ** The Model 920EV comes standard with a Remote Light Switch that will need to be installed by a licensed electrician or homeowner, Clopay Installers will not install the Remote Light Switch</p></li>
        <li>COMPLETE TRACK REPLACEMENT</li>
        <li>ANY GARAGE DOOR SECTION ON SITE REPAIR</li>
        <li>STRUCTURAL MODIFICATIONS TO GARAGE</li>
        <li>WORK PERFORMED ON WEEKENDS OR LEGAL HOLIDAY UNLESS OTHERWISE AGREED UPON BY INSTALLER AND 
        CUSTOMER</li></ul>

</div>

        `;

            var sub = "";
            var type = "";
            switch (GdoType[0]) {
                case "Chamberlain":
                    sub = "Thank you email-GDO-Chamberlain"
                    type = "GdoChamberlain";
                    break;
                case "Genie":
                    sub = "Thank you email-GDO-Genie"
                    type = "GdoGenie";
                    break;
            }
            let obj = {
                ToEmail: this.shareEmailTxt,
                Body: body,
                Subject: sub,
                MailType: type
            }
            this.emailMsg = 'Mail Sent Successfully';
            this.showEmailMsg = true;
            this.dataService.sendMail(obj)
                .subscribe(res => {
                    console.log('sent mail');
                }
                )
        }
    };

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
