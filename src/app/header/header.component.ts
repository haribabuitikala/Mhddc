import { Component, OnInit, Input, AfterViewChecked, ViewChild } from '@angular/core';
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { AppComponent } from "../app.component";
import { Router, NavigationEnd } from '@angular/router';
import { AppUtilities } from "../shared/appUtilities";
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

declare var $: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less', '../install//install.component.less']
})
export class HeaderComponent implements OnInit, AfterViewChecked {
    @ViewChild('modal') modal: ModalComponent;
    @ViewChild('shoppingCart') shoppingCartComp: ShoppingCartComponent;
    showhamburger: boolean = false;

    @Input() count: any;
    @Input() showHamburger: boolean = false;

    itemsCount;

    constructor(private appComponent: AppComponent
        , private route: Router
        , private utils: AppUtilities) {
        route.events.subscribe(r => {
            if (r instanceof NavigationEnd) {
                this.showCartIcon = true;
                if (window.location.href.indexOf('banner') >= 0) {
                    this.showCartIcon = false;
                }

                if (window.location.href.indexOf('zipResults') >= 0) {
                    this.showCartIcon = false;
                }
            }
        })
    }

    homePage(path) {
        this.appComponent.currScreen = 0;
        this.appComponent.showStepIndicator = false;
        this.route.navigateByUrl(path);
    }

    ngAfterViewChecked() {
        this.itemsCount = this.utils.resFlowSession.cart.length;
    }

    showCartIcon = true;
    ngOnInit() {
        this.itemsCount = this.utils.resFlowSession.cart.length;
        $('li span').hide();
        this.humberger();
        this.humbergerCollapse();
        this.bindDocumentClick();
    }
    cartIcon(modal?) {
        if(window.location.hash.indexOf('shoppingCart') == -1) {
            this.shoppingCartComp.getItemPrice();
            $('.content').addClass('shoppingCart');
            // if(this.shoppingCartComp.resFlowSession.cart.length > 0) {
            //     this.shoppingCartComp.toggleSection(this.shoppingCartComp.resFlowSession.cart.length - 1);
            // }
            modal.open();
        }
    }

    bindDocumentClick() {
        $(document).click(function () {
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

    closeDialog() {
        this.modal.close();
    }
}
