import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUtilities } from "../shared/appUtilities";
import { AppComponent } from "../app.component";
import { NavService } from "../nav/nav-service";
import { NavComponent } from "../nav/nav.component";
import { CollectionData } from "../collection/collection-data";
import { ConfigComponent } from "../config/config.component";
import { CollectionService } from "../shared/data.service";
import { ShareButton, ShareProvider, ShareArgs } from 'ngx-sharebuttons';
declare var $: any;
declare var _: any;

@Component({
    selector: 'res-door-configuration',
    templateUrl: './res-door-configuration.comp.html',
    styleUrls: ['./door-configuration.component.less']
})
export class ResDoorConfigurationComponent implements OnInit {
    googlebtn;
    facebookbtn;
    pintbtn;
    twitterbtn;
    instagrambtn;
    houzzbtn;
    imgSrc = 'https://raw.githubusercontent.com/MurhafSousli/ngx-sharebuttons/master/demo/src/assets/img/pinExample.jpg';
    imageSrc = 'https://dev-mhddc.clopay.com/emailimages/res-1498118638696.jpeg';
    title = "";
    description = "";

    pageNo;
    isGdo = this.utils.utilities.isGDO;
    store = this.dataStore.store;
    gdoOpenerTxt = this.utils.utilities.gdoOpenerText;
    gdoOpenerSelected = this.dataStore.gdoOpenerAccessories;

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

    gdoOpeners = [];
    showShare = false;
    itmTotalPrice;

    socialImageUrl = "";
    doorWithHome = "";
    doorWithHomeUrl = "";

    // for gdo the pageNo will be 4
    // for residential the pageNo will be 

    constructor(private utils: AppUtilities
        , private route: Router
        , private appComp: AppComponent
        , private navComp: NavService
        , private navComponent: NavComponent
        , private dataStore: CollectionData
        , private dataService: CollectionService
        , private config: ConfigComponent) {
    }

    setNavComponent() {
        if (this.navComponent.flowType === 'res') {
            this.navComponent.renderNav({
                flowType: 'res',
                flowActiveStep: 13,
                currentStepUrl: '/config/doorConfiguration',
                showStepIndicator: true,
                pageTitle: 'Your Door Construction',
                nextStepFn: () => {

                }
            });

        } else {
            this.navComponent.renderNav({
                flowType: 'resquick',
                flowActiveStep: 9,
                currentStepUrl: '/config/doorConfiguration',
                showStepIndicator: true,
                pageTitle: 'Your Door Construction',
                nextStepFn: () => {

                }
            });
        }
    }
    data;
    shareEmail: any;
    emailMsg;
    showEmailMsg = false;

    ngOnInit() {
        this.setNavComponent();
        this.data = this.utils.resFlowSession.resDoorObj;
        this.getPrice();
        // this.googlebtn = new ShareButton(ShareProvider.GOOGLEPLUS, '<i class="fa fa-google"></i>',
        //     'google-plus');
        this.facebookbtn = new ShareButton(ShareProvider.FACEBOOK, '<i class="fa fa-facebook"></i>',
            'facebook');
        this.twitterbtn = new ShareButton(ShareProvider.TWITTER, '<i class="fa fa-twitter"></i>',
            'twitter');
        this.pintbtn = new ShareButton(ShareProvider.PINTEREST, '<i class="fa fa-pinterest-p"></i>',
            'pinterest');
        this.doorWithHome = document.querySelector('#homeVis canvas')['toDataURL']();
        this.socialshare();
    }
    notify(event) {
        this.itmTotalPrice = event.totalPrice;
    }
    getPrice() {
        if (this.utils.resFlowSession.resDoorObj.INSTALLTYPE === 'DIY') {
            this.utils.resFlowSession.resDetails.totalPrice = this.utils.utilities.itemPriceDY;
            this.itmTotalPrice = this.utils.utilities.itemPriceDY;
        } else {
            this.utils.resFlowSession.resDetails.totalPrice = this.utils.utilities.itemPriceInstall;
            this.itmTotalPrice = this.utils.utilities.itemPriceInstall;
        }
    }
    shareBtn() {
        this.showShare = !this.showShare;

    }

    emailData = this.utils.resFlowSession.resDetails;
    genItems(j, resObj) {
        for (var i = 0; i < j; i++) {
            var itm = 'itm' + i;
            var itmPrice = 'itm' + i + 'Price';
            var itmDisplay = 'itm' + i + 'display';
            var itm = resObj.opener.items[i].item_name + '(x' + resObj.opener.items[i].count + ')';
            var itmPrice = '$' + (resObj.opener.items[i].item_price * resObj.opener.items[i].count).toFixed(2);
            var itmDisplay = 'block';
        }
    };

    covertToUSD(iPrice)
    {
        if(iPrice)
        {
        return Number(iPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        }
        else
        {
            return "";
        }

    };

    buildBodyFromColor(resData)
    {
var itemHead ="";
var itemValue = "";
var itemPrice = "";
var coachman = this.utils.resFlowSession.resDoorObj.product.product['item_id'] === 11 ? true : false;
 var temptr = ` <tr style="border-bottom: 1px solid #ccc">
                    <td style="color: #f96302;padding:5px">${itemHead}</td>
                    <td>${itemValue}</td>
                    <td>${itemPrice}</td>
                </tr>`;
       
    var fromColorBody = "";
    if(resData.color.overlay.name !== '' && coachman)
    {
        itemHead = "Overlay Color";
        itemValue = resData.color.overlay.name;
        itemPrice = this.covertToUSD(resData.color.overlay.price * resData.color.overlay.qty);

         temptr = ` <tr style="border-bottom: 1px solid #ccc">
                    <td style="color: #f96302;padding:5px">${itemHead}</td>
                    <td>${itemValue}</td>
                    <td>${itemPrice}</td>
                </tr>`;

        fromColorBody += temptr;
    }

     if( coachman)
    {
        itemHead = "Base Color";
        itemValue = resData.color.base.name;
        itemPrice = this.covertToUSD(resData.color.base.price * resData.color.base.qty);

         temptr = ` <tr style="border-bottom: 1px solid #ccc">
                    <td style="color: #f96302;padding:5px">${itemHead}</td>
                    <td>${itemValue}</td>
                    <td>${itemPrice}</td>
                </tr>`;

        fromColorBody += temptr;
    }

    if( !coachman)
    {
        itemHead = "Color";
        itemValue = resData.color.base.name;
        itemPrice = this.covertToUSD(resData.color.base.price * resData.color.base.qty);

         temptr = ` <tr style="border-bottom: 1px solid #ccc">
                    <td style="color: #f96302;padding:5px">${itemHead}</td>
                    <td>${itemValue}</td>
                    <td>${itemPrice}</td>
                </tr>`;

        fromColorBody += temptr;
    }

     if(resData.topSection.name !== '')
    {
        itemHead = " Top Section";
        itemValue = resData.topSection.name;
        itemPrice = this.covertToUSD(resData.topSection.glassType.price * resData.topSection.glassType.qty);

         temptr = ` <tr style="border-bottom: 1px solid #ccc">
                    <td style="color: #f96302;padding:5px">${itemHead}</td>
                    <td>${itemValue}</td>
                    <td>${itemPrice}</td>
                </tr>`;

        fromColorBody += temptr;
    }

    if(resData.topSection.name !== '')
    {
        itemHead = "Glass Type";
        itemValue = resData.topSection.glassType.name;
        itemPrice = this.covertToUSD(resData.topSection.glassType.price * resData.topSection.glassType.qty);

         temptr = ` <tr style="border-bottom: 1px solid #ccc">
                    <td style="color: #f96302;padding:5px">${itemHead}</td>
                    <td>${itemValue}</td>
                    <td>${itemPrice}</td>
                </tr>`;

        fromColorBody += temptr;
    }
//Hardware
        if(resData.hardware.lock.qty == 0 && (resData.hardware.handle.qty > 0 || resData.hardware.stepPlate.qty > 0 || resData.hardware.hinge.qty > 0 ))
        {
         itemHead = "Hardware";
          temptr = ` <tr style="border-bottom: 1px solid #ccc">
                    <td style="color: #f96302;padding:5px">${itemHead}</td>
                    <td></td>
                    <td></td>
                </tr>`;
            fromColorBody += temptr;

            if(resData.hardware.handle.qty > 0)
            {
             itemHead = "Handles";
        itemValue = resData.hardware.handle.name + ' (x' + resData.hardware.handle.qty + ' Per Door)';
        itemPrice = this.covertToUSD((resData.isDIY ? resData.hardware.handle.diy_price : resData.hardware.handle.install_price) * resData.hardware.handle.qty);
           temptr = ` <tr style="border-bottom: 1px solid #ccc">
                    <td style="color: #f96302;padding:5px">${itemHead}</td>
                    <td>${itemValue}</td>
                    <td>${itemPrice}</td>
                </tr>`;

                  fromColorBody += temptr;
            }

             if(resData.hardware.stepPlate.qty > 0)
            {
             itemHead = "Step Plate";
        itemValue = resData.hardware.stepPlate.name + ' (x' + resData.hardware.stepPlate.qty + ' Per Door)';
        itemPrice = this.covertToUSD((resData.isDIY ? resData.hardware.stepPlate.diy_price : resData.hardware.stepPlate.install_price) * resData.hardware.stepPlate.qty);
           temptr = ` <tr style="border-bottom: 1px solid #ccc">
                    <td style="color: #f96302;padding:5px">${itemHead}</td>
                    <td>${itemValue}</td>
                    <td>${itemPrice}</td>
                </tr>`;

                  fromColorBody += temptr;
            }

             if(resData.hardware.hinge.price !== 0 && resData.hardware.hinge.name !== 'None')
            {
             itemHead = "Hinge";
        itemValue = resData.hardware.hinge.name + ' (x' + resData.hardware.hinge.qty + ' Per Door)';
        itemPrice = this.covertToUSD((resData.isDIY ? resData.hardware.hinge.diy_price : resData.hardware.hinge.install_price) * resData.hardware.hinge.qty);
           temptr = ` <tr style="border-bottom: 1px solid #ccc">
                    <td style="color: #f96302;padding:5px">${itemHead}</td>
                    <td>${itemValue}</td>
                    <td>${itemPrice}</td>
                </tr>`;

                  fromColorBody += temptr;
            }
        }

    if(resData.hardware.lock.qty > 0)
    {
        itemHead = "Hardware";
        itemValue = resData.hardware.lock.name + ' (x' + resData.hardware.lock.qty + ')';
        itemPrice = this.covertToUSD(resData.hardware.lock.price * resData.hardware.lock.qty );

         temptr = ` <tr style="border-bottom: 1px solid #ccc">
                    <td style="color: #f96302;padding:5px">${itemHead}</td>
                    <td>${itemValue}</td>
                    <td>${itemPrice}</td>
                </tr>`;

        fromColorBody += temptr;
    }

    if(resData.isEPA)
    {
        itemHead = "Lead Paint Test";
        itemValue = "Required";
        itemPrice = this.covertToUSD(20);

         temptr = ` <tr style="border-bottom: 1px solid #ccc">
                    <td style="color: #f96302;padding:5px">${itemHead}</td>
                    <td>${itemValue}</td>
                    <td>${itemPrice}</td>
                </tr>`;

        fromColorBody += temptr;
    }
//opener
    if(resData.opener.QTY !== 0 && resData.opener.price !== 0)
    {
        itemHead = "Opener";
        itemValue = resData.opener.name;
        itemPrice = this.covertToUSD(resData.opener.price);

         temptr = ` <tr style="border-bottom: 1px solid #ccc">
                    <td style="color: #f96302;padding:5px">${itemHead}</td>
                    <td>${itemValue}</td>
                    <td>${itemPrice}</td>
                </tr>`;

        fromColorBody += temptr;
    }

    //opener accessories
      if(resData.opener.items.length > 0)
    {
        itemHead = "Opener Accessories";
        itemValue = "";
        itemPrice = "";
         temptr = ` <tr style="border-bottom: 1px solid #ccc">
                    <td style="color: #f96302;padding:5px">${itemHead}</td>
                    <td>${itemValue}</td>
                    <td>${itemPrice}</td>
                </tr>`;

        fromColorBody += temptr;


        $.each( resData.opener.items, function( arrayID, openerItem  ) {
//  alert( key + ": " + value );

        itemHead = "";
        itemValue = openerItem.name;
        itemPrice =   Number(openerItem.price ).toLocaleString('en-US', { style: 'currency', currency: 'USD' });         
         temptr = ` <tr style="border-bottom: 1px solid #ccc">
                    <td style="color: #f96302;padding:5px">${itemHead}</td>
                    <td>${itemValue}</td>
                    <td>${itemPrice}</td>
                </tr>`;

        fromColorBody += temptr;


});
    }


    //Additional options
      if(resData.additionalOptions.items.length > 0)
    {
        itemHead = "Additional Options";
        itemValue = "";
        itemPrice = "";
         temptr = ` <tr style="border-bottom: 1px solid #ccc">
                    <td style="color: #f96302;padding:5px">${itemHead}</td>
                    <td>${itemValue}</td>
                    <td>${itemPrice}</td>
                </tr>`;

        fromColorBody += temptr;


        $.each( resData.additionalOptions.items, function( arrayID, additionalOption ) {
//  alert( key + ": " + value );

        itemHead = "";
        itemValue = additionalOption.name;
        itemPrice =  Number(additionalOption.price * additionalOption.qty).toLocaleString('en-US', { style: 'currency', currency: 'USD' });       
         temptr = ` <tr style="border-bottom: 1px solid #ccc">
                    <td style="color: #f96302;padding:5px">${itemHead}</td>
                    <td>${itemValue}</td>
                    <td>${itemPrice}</td>
                </tr>`;

        fromColorBody += temptr;


});

//Sub Total

};


return fromColorBody;
    };


    renderTotalDiv(resData)
    {
        var totalPrice = this.covertToUSD(resData.totalPrice);
        var promoprice = this.utils.utilities.promoSaving;
        var temptrp = "";
        var temptr = `<div class="sub-total"><strong>Sub-Total${totalPrice}</strong><br/>
                     <i>Tax not included if applicable</i>
                      </div>`;


        if(this.utils.utilities.isPromoEnabled && promoprice && promoprice > 0 )              
        {
            var itemPromo = this.covertToUSD(promoprice);
            var endDt = this.utils.promoObject.enddate;
          //  <p>Your price includes a promotional discount of </p>

             temptrp = `<p> Your price includes a promotional discount of ${itemPromo} </p> <br/>
            Hurry! Promotional price only valid through - ${endDt} `;
        }

        return (temptr + temptrp);
    };

    renderPromoDiv()
    {
        if(this.utils.utilities.isPromoEnabled) 
        {
        var promorText = this.utils.promoObject.bullet0;
        var temptr = `<p> Current Promotion </p>${promorText}`;
        return temptr;
       }
        else
        {
            return "";
        }
    };


    

    renderEmailBody(imageUrl) {
        var resData = this.utils.resFlowSession.resDetails;
        var data = this.emailData;
        var resObj = this.utils.resFlowSession.resDoorObj;
        var product = resObj.product.product['item_name'];
        var size = this.utils.resFlow
        var collectionName = data.collectionName;
        var constructionMdlNo = data.construction.modelNumber;
        var constructionPrice = '$' + data.construction.price.toFixed(2);
        if(!resData.isDIY)
        {            
          constructionPrice = Number( (resData.construction.price + resData.construction.laborcost) * resData.construction.qty).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        }
        if(resData.isDIY)
        {
         constructionPrice =   Number(resData.construction.price * resData.construction.qty ).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        }
        var doorLen = data.construction.qty;

        var imgSrc = this.utils.resFlow.imgSrc;

        var widthF = size.wf;
        var widthI = size.wi;
        var heightF = size.hf;
        var heightI = size.hi;
        var WindCode = data.windcode;
        var doorDesign = data.designName;
        var doorConstruction = data.construction.name;
        var color = data.color.base.name;
        var topSection = data.topSection.name;
        var placement = resObj.windows.placement;
        var handle = data.hardware.handle.name;
        var hardware = resObj.hardware.lock;
        var hinge = data.hardware.hinge.name;
        var stepPlate = data.hardware.stepPlate.name;
        var opener = data.opener.name;
        var openerPrice = '$' + data.opener.price.toFixed(2)
        var items = resObj.opener.items;
        var itemLen = items.length;
        var doorSelectedImage = this.socialImageUrl;  

        //  lead Test
        var leadTest = resObj.LEADTEST === true ? 'Required' : 'Not Required';
        var leadPrice = resObj.LEADTEST === true ? '$20.00' : "";
        var medalian = true;
        var itemPrice = resObj.INSTALLTYPE === 'Installed' ? this.utils.utilities.itemPriceInstall : this.utils.utilities.itemPriceDY;
        var doorInstallType = resObj.INSTALLTYPE;
     //   var fromColorBody ;
       var fromColorBody = this.buildBodyFromColor(resData);
       var promoBodyText = this.renderPromoDiv();
       var totalBody  = this.renderTotalDiv(resData);
        var appInstance = "http://dev-mhddc.clopay.com";
        var body = `
		 <style type="text/css">

body {
            color: #000;
            font-family: Helvetica, Arial, sans-serif;
            font-size: 15px;
            width: 100%;
        }
		
		.div70 {
    float: left;
    width: 70%;
}

.div30 {
    float: right;
    width: 260px;
    height: 130px;
    border: 1px solid #ccc;
    display: block;
    overflow: hidden;
    padding: 10px;		
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

 </style>		
		
            <div style="text-align: center; break-after: page;">
                        <a href="#">
                            <img src="${appInstance}/assets/images/ClopayLogo.png" width="180" height="93">
                             </a>                            
						</div>
            <div style="background: #fff;">               
                <div style=' width: 676px; height: 250px; position: relative; display:inline-block'>
                    <img id='printIMG' src="${doorSelectedImage}" style='max-width: 280px' >
                    <!-- Canvas image - URL -->	
                    <img id='printHomeIMG' style='margin-left: 10px; max-width: 280px' src="${imageUrl}">
                 </div>

                 <br />
                    Thanks for your interest in purchasing a Clopay garage door through The Home Depot. Below is some basic information on the door you designed, what our program includes, and how our program works. We look forward to serving you in the near future.
                    <hr />
                    <br />
					<div class="div70">
					<div id="ourCfg" style="padding: 0px 0px 3px 8px; border-bottom: thin solid #bbb;">YOUR DOOR CONFIGURATION</div>
                <div style="" id="selName"> ${product}  (${doorInstallType})</div>
                <table style="border-collapse: collapse;width:100%;position:relative;">
                <tr style="border-bottom: 1px solid #ccc">
                    <td style="color: #f96302;padding:5px">Door Model</td>
                    <td>${constructionMdlNo}</td>
                    <td>${constructionPrice}</td>
                </tr>
                <tr style="border-bottom: 1px solid #ccc">
                    <td style="color: #f96302;padding:5px">Size</td>
                    <td>${widthF}'${widthI}"(w) x ${heightF}'${heightI}"(h)</td>
                    <td></td>
                </tr>
                <tr style="border-bottom: 1px solid #ccc">
                    <td style="color: #f96302;padding:5px">WindCode</td>
                    <td>${WindCode}</td>
                    <td></td>
                </tr>
                <tr style="border-bottom: 1px solid #ccc">
                    <td style="color: #f96302;padding:5px">Door Design</td>
                    <td>${doorDesign}</td>
                    <td></td>
                </tr>
                <tr style="border-bottom: 1px solid #ccc">
                    <td style="color: #f96302;padding:5px">Door Construction</td>
                    <td>${doorConstruction}</td>
                    <td></td>
                </tr>  
                ${fromColorBody}              		
                </table> ${totalBody}</div>
				<div class="div30">${promoBodyText}</div>
                
				
            </div>
            
            <div class='installCnt printPage' style="clear: both; width: 676px; height: 860px; position:relative;margin-top: 130px;page-break-inside:avoid;">
            <br/>
                    <h2 style="color: #f96302;">Your professionally installed garage door includes:</h2>  
                    <ul>
                    <li>A pre-installation site inspection  </li>
                    <li>Delivery of new garage door up to 30 "drive" miles from the store  </li>
                    <li>Take down existing garage door  </li>
                    <li>Haul-Away of existing garage door (additional charges apply in some markets) </li>
                    <li>Installation of new garage door </li>
                    <li>Installation of vinyl perimeter/weather seal  <br />
                    <li>Reconnect existing UL approved garage door opener (only when replacing existing sectional garage door) </li>
                    <li>Reinforcement of top garage door section for attachment of garage door opener per manufacturer's specifications  </li>
                    <li>Final cleanup and inspection of finished job with customer</li>
                    <li>One year labor warranty  </li>
                    </ul>
                    <br />
                    <h2 style="color: #f96302;">How to buy:</h2>
                    <ul>
                    <li>Click "Add to Cart" to purchase your door online right now </li>
                    <li>Print this page and call 1-800-HOMEDEPOT  </li>
                    <li>Print this page and take it to your local Home Depot store  </li>
                    </ul>
                    <br />
                    <h2 style="color: #f96302;">What to expect once we receive your order:</h2> 
                    <ul>
                    <li>You will be contacted by an installer within two business days to schedule a site inspection.  </li>
                    <li>Based on your availability the site inspection should be completed within 1 to 5 days.  </li>
                    <li>The installer will measure your opening to verify that the right size door was ordered.  </li>
                    <li>The installer will also determine if any additional work is needed to complete your installation. (Examples of additional work include Low Headroom kit, jamb replacement,etc... )  </li>
                    <li>If additional work is needed we will call you after the site inspection to go over changes.  </li>
                    <li>Once the installer has completed the site inspection he will be able to give you an estimated lead-time based upon door availability in your market.</li>
                    </ul>



            </div>

        `;
        return body;
    }
    sendMail(email) {
        if (this.shareEmail !== '') {
            var imageUrl;
            var d = new Date();
            var timeStamp = d.getTime();
            let params = {
                base64String: this.doorWithHome,
                imagename: 'res-' + timeStamp,
                imageformat: 'jpeg'
            }      

            if (this.doorWithHomeUrl) {
                imageUrl = this.doorWithHomeUrl;
                var shareImage = `<img src="${imageUrl}" width="300" height="200" />`;
                let body = this.renderEmailBody(imageUrl || '');
                let obj = {
                    ToEmail: this.shareEmail,
                    Body: body,
                    MailType: "Residential",
                    Subject: "Thank You For Your Interest In Clopay",
                    base64String: this.utils.resFlow.selectedImg,
                    imagename: 'res-' + timeStamp,
                    imageformat: 'jpeg'
                }
                this.emailMsg = 'Mail Sent Successfully';
                this.showEmailMsg = true;
                this.dataService.sendMail(obj)
                    .subscribe(res => {
                        console.log('sent mail');
                    })

                err => {
                    this.dataService.handleError();
                };
            } else {

                this.dataService.getImageUrl(params)
                    .subscribe(
                    res => {
                        this.doorWithHomeUrl = res;
                        imageUrl = res;
                        var shareImage = `<img src="${imageUrl}" width="300" height="200" />`;
                        let body = this.renderEmailBody(imageUrl || '');
                        let obj = {
                            ToEmail: this.shareEmail,
                            Body: body,
                            MailType: "Residential",
                            Subject: "Thank You For Your Interest In Clopay",
                            base64String: this.utils.resFlow.selectedImg,
                            imagename: 'res-' + timeStamp,
                            imageformat: 'jpeg'
                        }

                        this.emailMsg = 'Mail Sent Successfully';
                        this.showEmailMsg = true;
                        this.dataService.sendMail(obj)
                            .subscribe(res => {
                                console.log('sent mail');
                            })
                    },
                    err => {
                        this.dataService.handleError();
                    });
            }
        }
    };

    updateQuantity(flow) {
    };

    nextBtn(path) {
        this.utils.resFlowSession.addToCart();
        $('#shop-count').text(this.utils.resFlowSession.cart.length);
        this.route.navigateByUrl(path)
    }

    prevBtn(path) {
        this.route.navigateByUrl('/config/additionalOptions');
    }

    socialshare() {  console.log("calling social share method");
        var imageUrl;
        var d = new Date();
        var timeStamp = d.getTime();

        let params = {
            base64String:this.doorWithHome,//this.utils.resFlow.imgSrc,
            imagename: 'SocialShare-' + timeStamp,
            imageformat: 'jpeg'
        }
        this.dataService.getImageUrl(params)
            .subscribe(
            res => {
                this.socialImageUrl = res;
                this.title = "";
                this.description = "My Clopay Garage Door design! Door shown is a Clopay "+ this.utils.resFlowSession.resDetails.windcode +", "+ this.utils.resFlowSession.resDoorObj.construction.construction['ClopayModelNumber'] +". Design your door today!";
            },
            err => {
                this.dataService.handleError();
            });
    }


}
