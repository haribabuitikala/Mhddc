import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { AppComponent } from "../app.component";
import { Router } from '@angular/router';
import { AppUtilities } from "../shared/appUtilities";

declare var $: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less', '../install//install.component.less']
})
export class HeaderComponent implements OnInit, AfterViewChecked {
    showhamburger: boolean = false;

    @Input() count: any;
    @Input() showHamburger: boolean = false;
    itemsCount;
    data;

    constructor(private appComponent: AppComponent
        , private route: Router
        , private utils: AppUtilities) {
    }

    homePage(path) {
        this.appComponent.currScreen = 0;
        this.appComponent.showStepIndicator = false;
        this.route.navigateByUrl(path);
    }
    
    ngAfterViewChecked() {
        this.itemsCount = this.utils.resFlowSession.cart.length;
        this.data = this.utils.resFlowSession.resDetails;
    }

    ngOnInit() {
        this.itemsCount = this.utils.resFlowSession.cart.length;
        this.data = this.utils.resFlowSession.resDetails;
        $('li span').hide();
        this.humberger();
        this.humbergerCollapse();
        this.bindDocumentClick();
    }

    bindDocumentClick() {
        $(document).click(function(){
            if ($('.menu-collapse').is(":visible")) {
                $('.nav-component li span').addClass('hide');
                $('.nav-component').animate({ width: '60px' }, function () {
                    $('.collapse-humberger').addClass('hide');
                    $('.hamburger').removeClass('hide');
                    $('body').removeClass('menu-open');
                });
            }
        });
    }

    humberger() {
        if (!$('.menu-collapse').is(":visible")) {
            $('.nav-component').animate({ width: '220px' }, function () {
                $('.nav-component li span').removeClass('hide');
                $('.collapse-humberger').removeClass('hide');
                $('.hamburger').addClass('hide');
                $('body').addClass('menu-open');
            });
        }
    }

    humbergerCollapse() {
        if ($('.menu-collapse').is(":visible")) {
            $('.nav-component li span').addClass('hide');
            $('.nav-component').animate({ width: '60px' }, function () {
                $('.collapse-humberger').addClass('hide');
                $('.hamburger').removeClass('hide');
                $('body').removeClass('menu-open');
            });
        }
    }
}
