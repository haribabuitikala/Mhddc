import {Component, OnInit, Input} from '@angular/core';
import {AppComponent} from "../app.component";
import {Router} from '@angular/router';
import {AppUtilities} from "../shared/appUtilities";

declare var $:any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
    showhamburger:boolean = false;

    @Input() count:any;
    @Input() showHamburger:boolean = false;
    itemsCount = this.utils.utilities.itemsCount;

    constructor(private appComponent:AppComponent
        , private route:Router
        , private utils:AppUtilities) {
    }

    homePage(path) {
        this.appComponent.currScreen = 0;
        this.appComponent.showStepIndicator = false;
        this.route.navigateByUrl(path);
    }

    ngOnInit() {
        $('li span').hide();
        this.humberger();
        this.humbergerCollapse();
    }

    humberger() {
        $('.nav-component').animate({width: '185px'}, function () {
            $('.nav-component li span').removeClass('hide');
            $('.collapse-humberger').removeClass('hide');
            $('.hamburger').addClass('hide');
        });
    }

    humbergerCollapse() {
        $('.nav-component li span').addClass('hide');
        $('.nav-component').animate({width: '16.66666667%'}, function () {
            $('.collapse-humberger').addClass('hide');
            $('.hamburger').removeClass('hide');
        });
    }

}
