import {Component, OnInit, Input} from '@angular/core';
import {AppComponent} from "../app.component";
import {Router} from '@angular/router';

declare var $:any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
    showhamburger:boolean = false;

    @Input() count:any;

    constructor(private appComponent:AppComponent
        , private route:Router) {
    }

    homePage(path) {
        this.appComponent.currScreen = 0;
        this.route.navigateByUrl(path);
    }

    ngOnInit() {
        $('li span').hide();
        this.humberger();
        this.humbergerCollapse();
    }

    humberger(){
        $('.nav-component').animate({width:'185px'}, function () {
            $('li span').show();
            $('.collapse-humberger').removeClass('hide');
            $('.hamburger').addClass('hide');
        });
    }
    humbergerCollapse() {
        $('li span').hide();
        $('.nav-component').animate({width:'16.66666667%'}, function () {
            $('.collapse-humberger').addClass('hide');
            $('.hamburger').removeClass('hide');
        });
    }

}
