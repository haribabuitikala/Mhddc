import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppComponent } from "../app.component";
import { Location } from '@angular/common';
import { AppUtilities } from "../shared/appUtilities";
import { NavComponent } from "../nav/nav.component";
declare var $: any;
@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.less']
})
export class ConfigComponent implements OnInit, AfterViewInit {

    constructor(private appComponent: AppComponent
        , private location: Location
        , public navComponent: NavComponent
        , private utils: AppUtilities) {



    }

    homeImage;

    pageTitle;
    loaded = false;
    ngAfterViewInit() {
        $('#doorVis').DoorVisualization({
            NAME: 'configView',
            consolereporting: true,
            MAXHEIGHT: 280,
            MAXWIDTH: 315,
            VIEW: 'door'
        });
    }
    ngOnInit() {
        // set the curr screen
        let path = this.location.path();
        path === "/config/design" ? path = "/config" : path = this.location.path();
        // this.appComponent.currScreen = this.appComponent.navElems.indexOf(path);

        $('.switcher-box').css({ right: 45 });

        this.homeImage = this.utils.resFlow.selectedHome;
        $('.switcher-box').on('click tap', function () {
            $(this).hide();
            $('.switcher-box-home').show().removeClass('hide').animate({ right: 80 });
            $('.switcher-image').addClass('homeImage');
        });

        $('.switcher-box-home').on('click tap', function () {
            $(this).hide();
            $('.switcher-box').show().removeClass('hide').animate({ right: 45 });
            $('.switcher-image').removeClass('homeImage');
        });
    }

    renderCanvas() {
        this.getVisUpdate();
    }

    getVisUpdate(obj?, targ?) {

        if (typeof (targ) === 'undefined') targ = 'doorVis';
        if (typeof (obj) === 'undefined') obj = this.utils.resFlowSession.resDoorObj;

        var viewD = 'door'

        if (targ == 'doorVis') {
            targ = $('#doorVis');
        } else {
            viewD = 'home'
            targ = $('#homeVis');
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
            topsectionrow: "0"
        };

        var dor = obj

        if (dor.TYPE != "GDO") {
            if (dor.product.product != '') buildObj.productid = Number(dor.product.product.item_id);
            if (dor.design != '') {
                buildObj.designimage = dor.design.dsgn.visimage;
                buildObj.doorcolumns = Number(dor.design.columns);
                buildObj.doorrows = Number(dor.design.rows);
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

            if (dor.color.base != '') {
                buildObj.colorcode = dor.color.base.colorcode;
                buildObj.overlaycolor = ".94,.94,.94,1,25,25,25,0";

            }
            if (dor.color.base != '') {
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

            if (dor.windows.topsection != '') {
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
            buildObj['glassSection'] = dor.windows.selectedGlassSection;
            //shankar added this, for restopsection placement
            if (dor.windows.placement != '') buildObj.topsectionrow = dor.windows.placement.item_id;
            //if (dor.windows.placement != '') buildObj.topsectionrow = dor.windows.placement;
            if (dor.TYPE == "COM") {
                // shankar added this, for comtopsection placement
                if (dor.windows.placement != '') buildObj.topsectionrow = dor.windows.placement;
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
}
