import {Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewChild} from '@angular/core';
import {AppUtilities} from "../shared/appUtilities";
import {Router} from '@angular/router';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {NavService} from "./nav-service";
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
        , private route:Router
        , private navComp:NavService) {
    }

    CP; // cuurent page
    VP; // visited page
    NVP; // non visited page
    current:string = 'current';
    menuCount = this.app.utilities.navCount;
    pathName;

    ngOnChanges() {
        this.menuArray = this.buildMenu();
    }

    buildMenu() {
        let t = _.times(this.app.utilities.navCount, _.constant(null));
        return t.map(function (x, i) {
            return i + 1
        });
    }

    goToHome() {
        this.modal.close();
        this.route.navigateByUrl('/banner');
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
            this.app.utilities.currScreen = path;

            let t = this.app.utilities.flow;
            if (this.app.utilities.flow === 'residentialNavElems')
                this.pathName = this.app.utilities[t][id + 2];

            this.route.navigateByUrl(this.pathName);
        }
    }

    ngOnInit() {
        $('li span').hide();
        this.screen > 2 ? this.showNav = true : this.showNav = false;
        this.menuArray = _.times(this.menuCount, _.constant(null));
        this.menuArray = this.menuArray.map(function (x, i) {
            return i + 1
        });
        // this.navComp.activateIcon();
    }

}
