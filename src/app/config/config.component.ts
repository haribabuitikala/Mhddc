import { Component, OnInit, AfterViewInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { AppComponent } from "../app.component";
import { Location } from '@angular/common';
import { AppUtilities } from "../shared/appUtilities";
import { NavComponent } from "../nav/nav.component";
declare var $: any;
declare var _: any;
@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.less']
})
export class ConfigComponent implements OnInit, AfterViewInit, AfterViewChecked {

    constructor(private appComponent: AppComponent
        , private location: Location
        , public navComponent: NavComponent
        , private cdref: ChangeDetectorRef
        , private utils: AppUtilities) {

        appComponent.subscribeToPrice(() => {
            this.calculatePrice();
        });

    }

    homeImage;
    pageTitle;
    loaded = false;
    itemPriceInstall;
    itemPriceDY;
    isDIY = false;
    quantity = 1;
    details;
    whdata;
    openerName;
    showDetailTxt = true;
    showType:string = '';
    detailsInfo = {
        construction: false,
        baseName: false,
        overlayName: false,
        topSection: false,
        Hardware: false,
        color: false,
        overlayColor: false,
        glassType: false,
        Opener: false
    }

    isDoor = true;
    quickFlow = false;
    basep;

    ngAfterViewChecked() {
        this.cdref.detectChanges();
        this.pageTitle = this.navComponent.flowActiveStep + '.' + this.navComponent.pageTitle;        
        this.showDetailTxt = window.location.hash.indexOf('doorConfiguration') !== -1 ? false : true;
        if (this.utils.resFlowSession.cart.length === 0) {
            if ([10, 11, 12, 13].indexOf(this.appComponent.activeStep) !== -1) {
                if (this.utils.resFlowSession.resDoorObj.INSTALLTYPE === 'Installed') {
                    this.itemPriceDY = 0;
                    this.itemPriceInstall = this.utils.utilities.itemPriceInstall;
                } else {
                    this.itemPriceInstall = 0;
                    this.itemPriceDY = this.utils.utilities.itemPriceDY;
                }
            }
            if ([31, 30, 9, 16].indexOf(this.utils.resFlowSession.resDoorObj.product.product['item_id'] || 0) !== -1) {
                this.showType = 'Installed';
            }
        } else {
            if (this.utils.resFlowSession.resDoorObj.INSTALLTYPE === 'Installed') {
                this.showType = 'Installed';
            } else {
                this.showType = 'DIY';
            }
            this.itemPriceDY = this.utils.utilities.itemPriceDY;
            this.itemPriceInstall = this.utils.utilities.itemPriceInstall;
        }

        if (this.navComponent.flowType == 'resquick') {
            $('.home-switcher').hide();
        } else {
            $('.home-switcher').show();
        }
    }

    private fitToContainer() {
        var canvas = document.querySelector('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.position = 'initial';
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }


    drawDoors(selectedHome, nCanvas2d) {
		
		var query = window.matchMedia("(orientation:landscape)");
		var points;
			if (query.matches){
				//points = $.makeArray(selectedHome.dcoords.pointland);
				points = $.makeArray(selectedHome.dcoords.point);
			}else{
				points = $.makeArray(selectedHome.dcoords.point);
			}
		     points.forEach(p => {
            var x1 = +p._UL.split(',')[0];
            var y1 = +p._UL.split(',')[1];

            var x2 = +p._UR.split(',')[0];
            var y2 = +p._UR.split(',')[1];

            var x3 = +p._LL.split(',')[0];
            var y3 = +p._LL.split(',')[1];

            var x4 = +p._LR.split(',')[0];
            var y4 = +p._LR.split(',')[1];

            var w = x2 - (x1);
            var h = y3 - (y1);

            var sConvas = document.querySelector('.vsDoor');
            nCanvas2d.drawImage(sConvas, x1, y1, w, h);
            nCanvas2d.save();
        });

    }

    generateDoorWithHome() {
        return new Promise((res, rej) => {
            let selectedHome = window['selectedHome'];
            if (selectedHome) {
                var nCanvas = $('<canvas/>');
				var query = window.matchMedia("(orientation:landscape)");
                if (query.matches) {
					//nCanvas[0].setAttribute('width', selectedHome._landimgwidth);
					//nCanvas[0].setAttribute('height', selectedHome._landimgheight);
				nCanvas[0].setAttribute('width', selectedHome._imgwidth);
                nCanvas[0].setAttribute('height', selectedHome._imgheight);
					
				}else{
				nCanvas[0].setAttribute('width', selectedHome._imgwidth);
                nCanvas[0].setAttribute('height', selectedHome._imgheight);
				}
                var nCanvas2d = nCanvas[0].getContext('2d');
                var himg = new Image();
                himg.onload = () => {
                    if (selectedHome._upload && selectedHome._upload == true) {
                        nCanvas2d.drawImage(himg, 0, 0);
                        nCanvas2d.save();
                        this.drawDoors(selectedHome, nCanvas2d);
                    } else {
                        this.drawDoors(selectedHome, nCanvas2d);
                        nCanvas2d.drawImage(himg, 0, 0);
                        nCanvas2d.save();
                    }
                    res({ canvas: nCanvas[0] });
                };

                himg.onerror = () => {
                    res({});
                };
				
				var query = window.matchMedia("(orientation:landscape)");
                if (selectedHome._upload && selectedHome._upload == true) {
                    himg.src = selectedHome.canvas.toDataURL();
                } else if(query.matches){
						 
						 //himg.src = window['imgFolder'] + '/homeimages/' + selectedHome._imagelgland;
						  himg.src = window['imgFolder'] + '/homeimages/portrait/' + selectedHome._imagelg
						
					}else{
						 himg.src = window['imgFolder'] + '/homeimages/portrait/' + selectedHome._imagelg;
					}
            }
        });

    }

    
    ngAfterViewInit() {
        $('#doorVis').DoorVisualization({
            NAME: 'configView',
            consolereporting: false,
            MAXHEIGHT: 280,
            MAXWIDTH: 315,
            VIEW: 'door',
            doneCallback: () => {
                if (this.navComponent.flowType == 'resquick') {
                    this.isDoor = true;
                     $('body').removeClass('loader');
                    $('#doorVis').removeClass('default-canvas-hide');
                } else {
                    this.generateDoorWithHome().then(({ canvas }) => {
                        if (canvas) {
                            this.utils.setLoader();
                            $('#homeVis').html('').append(canvas);
                            $('#homeVis').find('canvas').css({
                                height: '90%',
                                width: '90%'
                            });
                            //this.utils.removeLoader();
                            
                            //this.utils.removeLoader();
                            if ($('#homeVis').hasClass('default-canvas-hide')) {
                                //_this.isDoor
                                $('#homeVis')
                                this.isDoor = false;
                                console.log("45678")
                                setTimeout(function () {
                                    $('body').removeClass('loader');
                                    $('#homeVis , #doorVis').removeClass('default-canvas-hide');
                                }, 100)
                            } else {
                                $('body').removeClass('loader');
                            }
                        } else {
                             $('body').removeClass('loader');
                        }
                        
                    });
                }
                
            }
        });
    }

    ngOnInit() {
        // set the curr screen
        this.basep = 0;
        if (this.utils.resFlowSession.resDoorObj.design.apiData) {
            this.basep = this.utils.resFlowSession.resDoorObj.design.apiData[0]['constructions'][0].item_price;
        }
        let path = this.location.path();
        path === "/config/design" ? path = "/config" : path = this.location.path();
        // this.appComponent.currScreen = this.appComponent.navElems.indexOf(path);
        this.calculatePrice();
       // $('.switcher-box').css({ right: 28 });
		$('.switcher-box').css({ right: 48 });

        this.homeImage = this.utils.resFlow.selectedHome;


        var $this = this;
        $('.switcher-box').on('click tap', function () {
            $(this).hide();
            $('.switcher-box-home').show().removeClass('hide').animate({ 'right': '48', 'animation-duration': '2s' });
            $('.switcher-image').addClass('homeImage');
			$('#homeVis , #doorVis').addClass('default-canvas-hide')
			setTimeout(function () {
								$('#homeVis , #doorVis').removeClass('default-canvas-hide')								
							}, 5)
            $this.isDoor = false;
        });

        $('.switcher-box-home').on('click tap', function () {
            $(this).hide();
            $('.switcher-box').show().removeClass('hide').animate({ 'right': '28', 'animation-duration': '2s' });
            $('.switcher-image').removeClass('homeImage');
			$('#homeVis , #doorVis').addClass('default-canvas-hide')
			setTimeout(function () {
								$('#homeVis , #doorVis').removeClass('default-canvas-hide')								
							}, 5)
            $this.isDoor = true;
        });

        let selectedHome = window['selectedHome'];
        if (selectedHome) {
            if (selectedHome._upload && selectedHome._upload == true) {
                $('.switcher-box-home').show().removeClass('hide').animate({ right: 48 });
                $('.switcher-image').addClass('homeImage');
                $('.switcher-box').addClass('hide').animate({ right: 35 });
                $this.isDoor = false;
            }
        }

        this.detailsModal();

        this.openerName = this.details.opener.name + (this.details.opener.items.length);
        this.quickFlow = this.navComponent.flowType == 'resquick' ? true : false;
        
    }

    renderCanvas(obj?, targ?, elemSelector?) {
        this.utils.setLoader();
        this.getVisUpdate(obj, targ, elemSelector);
    }

    getVisUpdate(obj?, targ?, elemSelector?) {
        if (typeof (targ) === 'undefined') targ = 'doorVis';
        if (typeof (obj) === 'undefined') obj = this.utils.resFlowSession.resDoorObj;

        var viewD = 'door'

        if (targ == 'doorVis') {
            targ = $('#doorVis');
        } else {
            viewD = 'home'
            targ = $('#homeVis');
        }

        if (elemSelector) {
            targ = $(elemSelector);
        }


        var buildObj = {
            centergrooves: 0,
            claddingswap: "",
            colorcode: "",
            colorswaprule: "",
            constructionmodel: "",
            constructionswaprule: "",
            designimage: "",
            doorcolumns: 0,
            doorrows: 0,
            glaz: "",
            handleplacement: "",
            hardwarehandle: "",
            hardwarehinge: "",
            hardwarestepplate: "",
            hingeplacement: "",
            overlaycolor: "",
            productid: 0,
            stepplateplacement: "",
            topsectionimage: "",
            topsectionrow: "0",
            callBack: () => {
                this.utils.removeLoader();
                console.log('rendering done!!!!!!');
            }
        };

        var dor = obj

        if (dor.TYPE != "GDO") {
            if (dor.product.product && dor.product.product != '') buildObj.productid = Number(dor.product.product.item_id);
            if (dor.design != '') {
                buildObj.designimage = dor.design.dsgn.visimage;
                buildObj.doorcolumns = Number(dor.design.columns);
                if (buildObj.productid === 13) {
                    buildObj.doorcolumns = Number(dor.design.dsgn.Columns);
                }
                buildObj.doorrows = Number(dor.design.rows);

                if (this.navComponent.flowType === 'resquick') {
                    buildObj.doorcolumns = Number(dor.design.dsgn.Columns);
                    buildObj.doorrows = Number(dor.design.dsgn.Rows);
                }
            }


            if (dor.construction.construction != '') {
                buildObj.constructionswaprule = dor.construction.construction.constructionswaprule;
            }

            if (dor.construction.cladding != '') {
                buildObj.constructionswaprule = dor.construction.cladding.imageswaprule;
            }
            try {
                if (dor.construction.groove != '') {
                    buildObj.centergrooves = dor.construction.groove.nogrooves;
                }
            } catch (e) { }

            if (dor.color.base && dor.color.base != '' && dor.color.base['colorcode']) {
                buildObj.colorcode = dor.color.base.colorcode;
                buildObj.overlaycolor = ".94,.94,.94,1,25,25,25,0";

            }
            if (dor.color.base && dor.color.base != '' && dor.color.base['colorcode']) {
                buildObj.colorswaprule = dor.color.base.colorswaprule;
            }

            if (dor.product.product.item_id == 11) {
                buildObj.overlaycolor = dor.color.base.colorcode;
                buildObj.colorcode = ".94,.94,.94,1,25,25,25,0";
                if (dor.color.overlay != '') {
                    buildObj.colorcode = dor.color.overlay.colorcode;
                }


            }


            if (dor.product.product.item_id == 9) {
                buildObj.overlaycolor = dor.color.base.colorcode;
                buildObj.colorcode = dor.color.base.colorcode;
                if (dor.color.overlay != '') {
                    buildObj.colorcode = dor.color.base.colorcode;
                }
            }


            if (Number(dor.product.product.item_id) == 30) {
                buildObj.overlaycolor = '';
            }

            if (dor.windows.topsection && dor.windows.topsection != '') {
                buildObj.topsectionimage = dor.windows.topsection.visimage;
                try {
                    if (dor.windows.glasstype.Config == undefined) {
                        if (dor.windows.topsection.glasstypes == undefined) {
                            buildObj['glaz'] = 'GLAZ-SOL'
                        }
                        else {
                            buildObj.glaz = dor.windows.topsection.glasstypes[0].Config;
                        }
                    }
                    else {
                        buildObj.glaz = dor.windows.glasstype.Config;
                    }
                }
                catch (e) { }
            }

            if (this.navComponent.flowType === 'resquick') {
                buildObj.topsectionimage = dor.construction.construction.Topsections[0].visimage;
                if (buildObj.topsectionimage.toLowerCase().indexOf('0c') > 0) {
                    buildObj.topsectionimage = buildObj.topsectionimage.replace('0C', buildObj.doorcolumns + 'C');
                }
                try {
                    if (dor.windows.glasstype.Config == undefined) {
                        if (dor.construction.construction.Topsections[0].glasstypes == undefined) {
                            buildObj['glaz'] = dor.construction.construction.Topsections[0].Config;
                        }
                        else {
                            buildObj.glaz = dor.construction.construction.Topsections[0].glasstypes[0].Config;
                        }
                    }
                    else {
                        buildObj.glaz = dor.windows.glasstype.Config;
                    }

                }
                catch (e) { }
            }


            buildObj['glassSection'] = dor.windows.selectedGlassSection;
            //shankar added this, for restopsection placement
            if (dor.windows.placement && dor.windows.placement != '') {
                buildObj.topsectionrow = dor.windows.placement.item_id;
            }
            //if (dor.windows.placement != '') buildObj.topsectionrow = dor.windows.placement;
            if (dor.TYPE == "COM") {
                // shankar added this, for comtopsection placement
                if (dor.windows.placement != '') {
                    buildObj.topsectionrow = dor.windows.placement;
                    if (dor.windows.placement['item_id']) {
                        buildObj.topsectionrow = dor.windows.placement['item_id'];
                    }
                }
                if (dor.windows.glasstypePlacement != "") {
                    var separators = ['th', 'rd', 'nd'];
                    var placement = dor.windows.glasstypePlacement;
                    var res = placement.split("-");
                    res = res[1].split(new RegExp('[' + separators.join('') + ']', 'g'));
                    //buildObj.topsectionrow = res[0]; //added shankar for comtopsection placement
                }
            }


            try {
                if (dor.hardware.hinge != '') {
                    buildObj.hardwarehinge = dor.hardware.hinge.visimage;
                    buildObj.hingeplacement = dor.hardware.hinge.placement;
                }

            } catch (e) { }


            if (dor.hardware.stepplate != '') {
                buildObj.hardwarestepplate = dor.hardware.stepplate.visimage;
                buildObj.stepplateplacement = dor.hardware.stepplate.placement;
            }
            if (dor.hardware.handle != '') {
                buildObj.hardwarehandle = dor.hardware.handle.visimage;
                buildObj.handleplacement = dor.hardware.handle.placement;
            }


            if (buildObj['overlay'] != undefined) {
                buildObj['overlay'] = '';
            }
        }
        else {
            if (dor.opener.opener != '') {
                buildObj.productid = Number(dor.opener.opener.item_id);
                buildObj.designimage = dor.opener.opener.item_thumbnail;
            }
        }

        targ.DoorVisualization('view', viewD)
        targ.DoorVisualization('update', buildObj)
    }


    getDoorPrice(cData?) {
        cData = cData || this.utils.resFlowSession.resDoorObj;
        var priceObj = { install: 0, diy: 0 };
        try {
            var itemId = cData.product.product['item_id'];
            var count = cData.QTY;
            if (itemId) {
                let cObj = cData;
                let price = window['getDoorPrice'](cObj);
                priceObj.install = parseFloat(price[0].replace(/ /g, '').replace('$', '')) * count;
                this.isDIY = false;
                if (this.appComponent.noDIYs.indexOf(itemId) < 0) {
                    this.isDIY = true;
                    priceObj.diy = parseFloat(price[1].replace(/ /g, '').replace('$', '')) * count;
                }
            }

        } catch (g) {

        }

        return priceObj;
    }


    /** Details **/


    calculatePrice() {
        try {
            this.isDIY = false;
            var itemId = this.utils.resFlowSession.resDoorObj.product.product['item_id'];
            if (this.appComponent.noDIYs.indexOf(itemId) < 0) {
                this.isDIY = true;
            }
            this.utils.resFlowSession.resCalculatePrice();
            this.itemPriceInstall = this.utils.utilities.itemPriceInstall;
            this.itemPriceDY = this.utils.utilities.itemPriceDY;
        } catch (g) {
        }
    }

    detailsModal() {

        this.details = this.utils.resFlowSession.resDetails;

    }

    openDetailsModal(detailsModal) {
        var pos = $('.res-config').offset();
        var linearhgt = $('.res-config').outerHeight();
        var header = $('.logo-header').outerHeight();
        var width = $('.res-config').outerWidth();
        // var hgt;
        var detailshgt = $('.inner-router').height();
        var bodyWdt = $('body').width();

        this.details.widthF = this.utils.resFlow.wf;
        this.details.widthI = this.utils.resFlow.wi;
        this.details.heightF = this.utils.resFlow.hf;
        this.details.heightI = this.utils.resFlow.hi;
        // switch (bodyWdt) {
        //     case 414:
        //         detailshgt = "18vh";
        //         break;
        //     default:
        //         detailshgt = "19vh";
        //         break;
        // }
        // if (detailshgt > 200) {
        //     detailshgt = 220;
        //     linearhgt = 218;
        // }
        // $('.details-modal').css({
        //     "margin-top": linearhgt,
        //     "width": width,
        //     "left": pos.left,
        //     "max-height": detailshgt
        // })
        // this.details['designName'] = this.utils.resFlowSession.resDoorObj.design.dsgn['item_name'];
        detailsModal.open();
    }

    updateQuantity(isIncrement?) {
        let count = this.utils.resFlowSession.resDoorObj.QTY;
        if (isIncrement && count < 6) {
            this.utils.resFlowSession.resDoorObj.QTY = count + 1;
        } else if (count > 1 && count !== 6) {
            this.utils.resFlowSession.resDoorObj.QTY = count - 1;
        }
        this.quantity = this.utils.resFlowSession.resDoorObj.QTY;
        this.calculatePrice();
    }
}
