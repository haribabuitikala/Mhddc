import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";
import {Location} from '@angular/common';
import {AppUtilities} from "../shared/appUtilities";
import {NavComponent} from "../nav/nav.component";
declare var $:any;
@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.less']
})
export class ConfigComponent implements OnInit {

    constructor(private appComponent:AppComponent
        , private location:Location
        , public navComponent:NavComponent
        , private utils:AppUtilities) {
            
    }

    homeImage;

    pageTitle;

    ngOnInit() {
        // set the curr screen
        let path = this.location.path();
        path === "/config/design" ? path = "/config" : path = this.location.path();
        // this.appComponent.currScreen = this.appComponent.navElems.indexOf(path);

        $('.switcher-box').css({right: 36});

        this.homeImage = this.utils.resFlow.selectedHome;
        $('.switcher-box').on('click tap', function () {
            $(this).hide();
            $('.switcher-box-home').show().removeClass('hide').animate({right: 68});
            $('.switcher-image').addClass('homeImage');
        });

        $('.switcher-box-home').on('click tap', function () {
            $(this).hide();
            $('.switcher-box').show().removeClass('hide').animate({right: 36});
            $('.switcher-image').removeClass('homeImage');
        });
    }

}
