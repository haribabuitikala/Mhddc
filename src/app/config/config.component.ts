import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";
import {Location} from '@angular/common';
import {AppUtilities} from "../shared/appUtilities";
declare var $:any;
@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.less']
})
export class ConfigComponent implements OnInit {

    constructor(private appComponent:AppComponent
        , private location:Location
        , private utils:AppUtilities) {

    }

    homeImage;

    ngOnInit() {
        // set the curr screen
        let path = this.location.path();
        path === "/config/design" ? path = "/config" : path = this.location.path();
        // this.appComponent.currScreen = this.appComponent.navElems.indexOf(path);

        $('.switcher-box').css({right: 64});

        this.homeImage = this.utils.resFlow.selectedHome;
        $('.switcher-box').on('click tap', function () {
            $(this).hide();
            $('.switcher-box-home').show().removeClass('hide').animate({right: 93});
            $('.switcher-image').addClass('homeImage');
        });

        $('.switcher-box-home').on('click tap', function () {
            $(this).hide();
            $('.switcher-box').show().removeClass('hide').animate({right: 64});
            $('.switcher-image').removeClass('homeImage');
        });
    }

     getVisUpdate(cObj, targ) {

        if (typeof (targ) === 'undefined') targ = 'doorVis';
        //if (typeof (obj) === 'undefined') obj = cObj;

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
            colorswaprule: "MO,MO",
            constructionmodel: "",
            constructionswaprule: "",
            designimage: "",
            doorcolumns: 0,
            doorrows: 0,
            glaz: 0,
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
            glassSection: '',
            overlay: ''

        };

        let dor = cObj;
        var residential = this.utils.resFlow;
        let product = residential.collection;
        let design = residential.design;
        let topsection = null;
        let color = null;
        let glasstype = null;
        let type = "Res";

        // window.imgFolder = '../../assets/images/pImages';

        if (type != "GDO") {
            if (product != '') buildObj.productid = product.item_id;
            if (design != '') {
                buildObj.designimage = design.visimage;
                buildObj.doorcolumns = design.Columns;
                buildObj.doorrows = design.Rows;
            }


            // if (dor.construction.construction != '') {
            //     buildObj.constructionswaprule = dor.construction.construction.constructionswaprule;
            // }

            // if (dor.construction.cladding != '') {
            //     buildObj.constructionswaprule = dor.construction.cladding.imageswaprule;
            // }
            // try {
            //     if (dor.construction.groove != '') {
            //         buildObj.centergrooves = dor.construction.groove.nogrooves;
            //     }
            // } catch (e) { }

            // if (dor.color.base != '') {
            //     buildObj.colorcode = dor.color.base.colorcode;
            //     buildObj.overlaycolor = ".94,.94,.94,1,25,25,25,0";

            // }
            // if (dor.color.base != '') {
            //     buildObj.colorswaprule = dor.color.base.colorswaprule;
            // }

            // if (product.item_id == 11) {
            //     //buildObj.overlaycolor = dor.color.base.colorcode;
            //     buildObj.colorcode = ".94,.94,.94,1,25,25,25,0";
            //     // if (dor.color.overlay != '') {
            //     //     buildObj.colorcode = dor.color.overlay.colorcode;
            //     // }


            // }


            // if (product.item_id == 9) {
            //     buildObj.overlaycolor = dor.color.base.colorcode;
            //     buildObj.colorcode = dor.color.base.colorcode;
            //     if (dor.color.overlay != '') {
            //         buildObj.colorcode = dor.color.base.colorcode;
            //     }
            // }


            // if (Number(dor.product.product.item_id) == 30) {
            //     buildObj.overlaycolor = '';
            // }

            // if (dor.windows.topsection != '') {
            //     buildObj.topsectionimage = dor.windows.topsection.visimage;
            //     try {
            //         if (dor.windows.glasstype.Config == undefined) {
            //             if (dor.windows.topsection.glasstypes == undefined) {
            //                 buildObj.glaz = 'GLAZ-SOL'
            //             }
            //             else {
            //                 buildObj.glaz = dor.windows.topsection.glasstypes[0].Config;
            //             }
            //         }
            //         else {
            //             buildObj.glaz = dor.windows.glasstype.Config;
            //         }
            //     }
            //     catch (e) { }
            // }
            // buildObj.glassSection = dor.windows.selectedGlassSection;
            // // shankar added this, for restopsection placement
            // if (dor.windows.placement != '') buildObj.topsectionrow = dor.windows.placement.item_id;
            // //if (dor.windows.placement != '') buildObj.topsectionrow = dor.windows.placement;



            // try {
            //     if (dor.hardware.hinge != '') {
            //         buildObj.hardwarehinge = dor.hardware.hinge.visimage;
            //         buildObj.hingeplacement = dor.hardware.hinge.placement;
            //     }

            // } catch (e) { }

            // if (dor.hardware.stepplate != '') {
            //     buildObj.hardwarestepplate = dor.hardware.stepplate.visimage;
            //     buildObj.stepplateplacement = dor.hardware.stepplate.placement;
            // }
            // if (dor.hardware.handle != '') {
            //     buildObj.hardwarehandle = dor.hardware.handle.visimage;
            //     buildObj.handleplacement = dor.hardware.handle.placement;
            // }


            // if (buildObj.overlay != undefined) {
            //     buildObj.overlay = ''
            // }

            targ.DoorVisualization('view', viewD)
            targ.DoorVisualization('update', buildObj)
        }
        else {
            if (dor.opener.opener != '') {
                buildObj.productid = Number(dor.opener.opener.item_id);
                buildObj.designimage = dor.opener.opener.item_thumbnail;
            }
        }






    }

}
