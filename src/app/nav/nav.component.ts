import {Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewChild} from '@angular/core';
import {AppUtilities} from "../shared/appUtilities";
import {Router} from '@angular/router';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
declare var $:any;
declare var _:any;

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {
    @ViewChild('home') modal:ModalComponent;
    @Input() screen:number;
    showNav:boolean = false;
    currElem:any;
    menuArray;

    constructor(private app:AppUtilities
        , private route:Router) {
    }

    CP; // cuurent page
    VP; // visited page
    NVP; // non visited page
    current:string = 'current';
    menuCount = this.app.utilities.navCount;

    ngOnChanges() {
        this.activateIcon();
        this.menuArray = this.buildMenu();
    }

    buildMenu() {
        let t = _.times(this.app.utilities.navCount, _.constant(null));
        return t.map(function (x, i) {
            return i + 1
        });
    }

    home() {
        this.modal.close();
        this.route.navigateByUrl('/banner');
    }

    activateIcon() {
        $("li").removeClass('current');
        let li = $("li:eq(" + this.app.utilities.currPage + ")");
        let src = li.find('img').attr('src');

        let clicked = this.app.utilities.clicked;

        // case 0 = prev
        // case 1 = next

        switch (clicked) {
            case 0:
                this.CP = _.replace(src, "VP", "CP");
                this.VP = _.replace(li.next().find('img').attr('src'), "CP", "NVP");
                li.next().find('img').attr('src', this.VP);
                break;
            case 1:
                this.CP = _.replace(src, "NVP", "CP");
                this.VP = _.replace(li.prev().find('img').attr('src'), "CP", "VP");
                li.prev().addClass('visited').find('img').attr('src', this.VP);
                break;
        }
        li.removeClass('visited').addClass('current').find('img').attr('src', this.CP);
    }

    visited(id) {
        let li = $('li:eq(' + id + ')');
        let src = li.find('img').attr('src');
        if (li.hasClass('visited')) {
            li.removeClass('visited').addClass('current').find('img').attr('src', _.replace(src, "VP", "CP"));
            $('li:gt(' + id + ')')
                .removeClass('current visited')
                .find('img')
                .each(function (img) {
                    $(this).attr('src', _.replace(this.src, 'CP', 'NVP'));
                    $(this).attr('src', _.replace(this.src, 'onVP', 'onNVP'));
                });
            this.app.utilities.currPage = id;
            let path = this.app.utilities.currScreen - (id + 1);
            // this.route.navigateByUrl(this.app.utilities.[path]);
            this.app.utilities.currScreen = path;
        }
    }

    ngOnInit() {
        $('li span').hide();
        this.screen > 2 ? this.showNav = true : this.showNav = false;
        this.menuArray = _.times(this.menuCount, _.constant(null));
        this.menuArray = this.menuArray.map(function (x, i) {
            return i + 1
        });
    }

}
