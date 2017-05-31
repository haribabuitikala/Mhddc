import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from "../app.component";
import { AppUtilities } from "../shared/appUtilities";
import { CollectionService } from "../shared/data.service";
import { CollectionData } from "../collection/collection-data";
import { ConfigComponent } from "../config/config.component";
import { NavComponent } from "../nav/nav.component";
declare var _: any;
declare var $: any;

@Component({
    selector: 'app-design',
    templateUrl: './design.component.html',
    styleUrls: ['./design.component.less']
})
export class DesignComponent implements OnInit {

    constructor(private utils: AppUtilities
        , private dataStore: CollectionData
        , private navComponent: NavComponent
        , private dataService: CollectionService
        , private app: AppComponent
        , private config: ConfigComponent
        , private route: Router) {
    }

    data;
    number = 6;
    folder = 'design';
    category = 'constructions';
    loaded = false;

    getHomesXml() {
        let selectedHome = null;
        var $this = this;
        $.ajax({
            type: "GET",
            url: 'http://localhost:3435/homes.xml',
            dataType: "xml",
            error: function (data) {

            },
            success: function (xml) {

                $(xml).find('home').each(function (index, value) {
                    var btnImage = $(this).attr('btnimage');
                    var myClass = 'HomeBtn';

                    $(value).find('point').each(function (index, val) {

                        var xy = $(val).attr('XY').split(',')
                        var ul = $(val).attr('UL').split(',')
                        var ur = $(val).attr('UR').split(',')
                        var lr = $(val).attr('LR').split(',')
                        var ll = $(val).attr('LL').split(',')

                        var x = ul[0]
                        var y = ul[1]
                        var w = ur[0] - ul[0]
                        var h = ll[1] - ul[1]
                        var x1 = "0"
                        var y1 = "0"
                        var x2 = ur[0]
                        var y2 = ur[1]
                        var x3 = lr[0]
                        var y3 = lr[1]
                        var x4 = 0
                        var y4 = ll[1]



                        $(val).attr('x', x)
                        $(val).attr('y', y)
                        $(val).attr('w', w)
                        $(val).attr('h', h)
                        $(val).attr('x1', x1)
                        $(val).attr('x2', x2)
                        $(val).attr('x3', x3)
                        $(val).attr('x4', x4)
                        $(val).attr('y1', y1)
                        $(val).attr('y2', y2)
                        $(val).attr('y3', y3)

                        $(val).attr('y4', y4)



                    });

                    var $data = $(this)

                    // console.log('[XML] ', $data);
                    window['selectedHomeData'] = $data;
                });
                window['orderObj'].homedata = window['selectedHomeData'][0];
                $this.config.renderCanvas(window['selectedHomeData'][0]);
            }
        });
    }

    ngOnInit() {
        this.startProcess();
        $('#visualize-header').html('5 Choose Your Design');

        this.getHomesXml();
    }


    startProcess() {
        let utils = this.utils;
        let data = this.dataStore.designs;
        this.config.homeImage = data[0].item_thumbnail;
        if (utils.utilities.singleDoor === true) {
            this.number = 6;
            this.data = _.chunk(data, 2);
        } else {
            this.number = 12;
            this.data = _.chunk(data, 1);
        }

        this.navComponent.renderNav({
            flowType: 'res',
            flowActiveStep: 4,
            currentStepUrl: '/config/design',
            showStepIndicator: true,
            nextStepFn: () => {

            }
        });

        this.config.pageTitle = '4.Choose Your Door Design';

        this.utils.resFlowSession.resDoorObj.design.dsgn = data[0];
        this.utils.resFlowSession.resDoorObj.construction.apiData = data[0].constructions;
        this.utils.resFlowSession.resDoorObj.construction.construction = data[0].constructions[0];
        var constructionSelected = this.utils.resFlowSession.resDoorObj.construction.construction;
        if (constructionSelected && constructionSelected['colors']) {
            if (constructionSelected['colors'].length > 0) {
                this.utils.resFlowSession.resDoorObj.color.base = constructionSelected['colors'][0];
                this.utils.resFlowSession.resDoorObj.color.overlay = constructionSelected['colors'][0];
                this.app.updatePrice();
            }
        }

        this.loaded = true;

        // this.config.renderCanvas();
    }

    nextBtn(path) {
        this.route.navigateByUrl(path);
    }
    prevBtn(path) {
        this.route.navigateByUrl('/home');
    }

}
