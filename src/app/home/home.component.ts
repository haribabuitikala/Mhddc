import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUtilities } from "../shared/appUtilities";
import { NavService } from "../nav/nav-service";
import { NavComponent } from "../nav/nav.component";
import { CollectionData } from "../collection/collection-data";
import { ConfigComponent } from "../config/config.component";
import { AppComponent } from "../app.component";
declare var $: any;
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, AfterViewInit {
    pageNo;
    homes;
    selected;

    constructor(private utils: AppUtilities
        , private navComp: NavService
        , private route: Router
        , private navComponent: NavComponent
        , private dataStore: CollectionData
        , private app: AppComponent) {
    }

    ngOnInit() {
        $('body').addClass('loader');
        this.pageNo = this.utils.utilities.currPage;
        this.navComp.activateIcon();
        this.homes = this.dataStore.homeImages;
        $('body').removeClass('loader');

        this.navComponent.renderNav({
            flowType: 'res',
            flowActiveStep: 3,
            currentStepUrl: '/home',
            showStepIndicator: true,
            nextStepFn: () => {
                this.nextBtn(null, '/config/design');
            }
        });

        window['selectedHome'] = this.homes[0];
        this.utils.resFlowSession.resDoorObj.resetsize();
        //this.app.updatePrice();
    }

    ngAfterViewInit() {
        $('.stock div:nth-child(2) img').addClass('selected');
        this.utils.resFlow.selectedHome = this.homes[1]._imagelg;
        $('body').removeClass('loader');
    }

    selectHome(itm, evt) {
        $('.stock img').removeClass('selected');
        evt.target.classList = 'selected';
        this.utils.resFlow.selectedHome = itm._imagelg;
        this.selected = itm;

        this.utils.resFlowSession.home['selectedHomeImg'] = itm._imagelg;
        this.utils.resFlowSession.home['selectedHome'] = itm;
        window['selectedHome'] = itm;

    }

    prevBtn(curr, path) {
        this.utils.setUtils(2, 0);
        this.route.navigateByUrl(path)
    }

    nextBtn(curr, path) {
        this.utils.setUtils(4, 1);
        this.route.navigateByUrl(path);
    }

    uploadFile(event, homeImageModal) {
        this.bindMoveListener();
        homeImageModal.open();
        this.handleImage(event);
    }



    setDoorSize = () => {
        this.doors.forEach(d => {
            if (d.$resizer) {
                var leftToMinus = $('.customer-home').offset().left;
                var topToMinus = $('.customer-home').offset().top;
                d.$elem.css({
                    'width': (d.$resizer.offset().left - (d.$elem.offset().left - 25)) + 'px',
                    'height': (d.$resizer.offset().top - (d.$elem.offset().top - 25)) + 'px'
                });
            }
        });
    };
    getDoor = ({ w = 100, h = 100, l = 50, t = 50 }) => {
        var $door = $('<div class="door"/>');
        $door.css({
            'width': w + 'px',
            'height': h + 'px',
            'left': l + 'px',
            'top': t + 'px'
        });

        return $door;
    };
    setResizer = () => {
        this.doors.forEach(d => {
            if (d.$resizer) {
                var leftToMinus = $('.customer-home').offset().left;
                var topToMinus = $('.customer-home').offset().top;
                d.$resizer.css({
                    'left': (d.$elem.offset().left + d.$elem.width() - leftToMinus - 25) + 'px',
                    'top': (d.$elem.offset().top + d.$elem.height() - topToMinus - 25) + 'px'
                });

            }
        });
    }
    getResizer = (d) => {
        var $resizer = $('<div class="resizer"/>');
        var leftToMinus = $('.customer-home').offset().left;
        var topToMinus = $('.customer-home').offset().top;
        $resizer.css({
            'left': (d.$elem.offset().left + d.$elem.width() - leftToMinus - 20) + 'px',
            'top': (d.$elem.offset().top + d.$elem.height() - topToMinus - 20) + 'px'
        });

        return $resizer;
    };

    doors = [new Door(100, 100, 50, 50)];
    drawDoors() {
        this.doors.forEach(d => {
            var $d = this.getDoor(d);
            d.$elem = $d;
            $('.customer-home').append($d);
            d.$resizer = this.getResizer(d);
            $('.customer-home').append(d.$resizer);
        });

        this.bindEvents();
    }
    dragElem;
    resizeElem;
    mx;
    my;
    rx;
    ry;
    touchX;
    touchY;

    bindEvents = function () {
        var $that = this;
        $('.door').on('touchstart', function (e) {
            $that.dragElem = e.target;
            $that.mx = $that.touchX;
            $that.my = $that.touchY;
        });

        $('.door').on('touchend', function (e) {
            $that.dragElem = null;
        });

        $('.resizer').on('touchstart', function (e) {
            $that.resizeElem = e.target;
            $that.rx = $that.touchX;
            $that.ry = $that.touchY;

        });

        $('.resizer').on('touchend', function (e) {
            $that.resizeElem = null;
        });
    };

    bindMoveListener() {
        var $that = this;
        $(document).on('touchmove', function (e) {
            $that.touchX = e.touches[0].clientX;
            $that.touchY = e.touches[0].clientY;
            if (e.touches.length > 0) {
                if ($that.dragElem) {
                    var offsetToSet = $($that.dragElem).width() / 2;
                    $($that.dragElem).css({
                        'left': ($that.touchX - offsetToSet) + 'px',
                        'top': ($that.touchY - $('.customer-home').offset().top - offsetToSet) + 'px'
                    });

                    $that.setResizer();
                } else if ($that.resizeElem) {
                    var offsetToSet = 15;
                    $($that.resizeElem).css({
                        'left': ($that.touchX - offsetToSet) + 'px',
                        'top': ($that.touchY - $('.customer-home').offset().top - offsetToSet) + 'px'
                    });

                    $that.setDoorSize();
                }
            }
        });
    }

    handleImage(e) {
        var reader = new FileReader();
        var $that = this;
        reader.onload = function (event) {
            var img = new Image();
            img.onload = function () {
                var canvasTags = $('<canvas/>');
                var canvas = canvasTags[0];
                let w = $(window).width();
                let h = $(window).width();

                $that.uploadSelectedHome._imgwidth = w;
                $that.uploadSelectedHome._imgheight = h;

                canvas.setAttribute('width', w);
                canvas.setAttribute('height', h);
                var nCanvas2d = canvas.getContext('2d');
                nCanvas2d.drawImage(img, 0, 0, w, h);
                nCanvas2d.save();
                $('.customer-home').html('').append(canvas);
                $that.uploadSelectedHome.canvas = canvas;
                $that.drawDoors();
            }
            img.src = event.target['result'];
            e.target.value = null;
        }
        reader.readAsDataURL(e.target.files[0]);
    }


    uploadSelectedHome = {
        dcoords:
        {
            point: []
        },
        canvas: null,
        _imgwidth: "700",
        _imgheight: "500",
        _upload: true
    };

    setSelectedHome(homeImageModal, isSave, currScreen) {
        if (isSave) {
            this.doors.forEach(d => {
                let x = d.$elem.offset().left - $('.customer-home').offset().left;
                let y = d.$elem.offset().top - $('.customer-home').offset().top;
                let w = d.$elem.width();
                let h = d.$elem.height();

                let ul = x + ',' + y;
                let ur = (x + w) + ',' + y;
                let ll = x + ',' + (y + h);
                let lr = (x + w) + ',' + (y + h);
                let point = new Point(ul, ur, ll, lr);
                this.uploadSelectedHome.dcoords.point.push(point);
            });
            window['selectedHome'] = this.uploadSelectedHome;
            homeImageModal.close();
            this.nextBtn(currScreen,'/config/design');
        } else{
            homeImageModal.close();
        }

    }
}


export class Door {
    w;
    h;
    l;
    t;

    $elem;
    $resizer;

    constructor(w, h, l, t) {
        this.w = w;
        this.h = h;
        this.l = l;
        this.t = t;
        this.$elem = null;
        this.$resizer = null;
    }
}


export class Point {
    _UL;
    _UR;
    _LR;
    _LL;

    constructor(ul, ur, ll, lr) {
        this._UL = ul;
        this._UR = ur;
        this._LL = ll;
        this._LR = lr;
    }
}