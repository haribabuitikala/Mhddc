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
        this.pageNo = 3;
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
        $('.stock div:nth-child(1) img').addClass('selected');
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

    resetDoorText() {
      $('.door').each(function(i) {
        $(this).html(i + 1);
      });
    }

    doors = [new Door(100, 100, 50, 50)];
    doorCount = 1;
    drawDoors() {
      var d = new Door(100, 100, 50, 50);
      var $d = this.getDoor(d);
      d.$elem = $d;
      $('.customer-home').find('.door, .resizer').remove();
      $('.customer-home').append($d.addClass('door-' + this.doorCount).attr('doorid', this.doorCount));
      // this line must be here due to html tag rendering issue
      d.$resizer = this.getResizer(d);
      $('.customer-home').append(d.$resizer.addClass('door-' + this.doorCount).attr('doorid', this.doorCount));

      this.resetDoorText();
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

    elemToRemove = null;
    bindEvents = function () {
        var $that = this;
        $('.door').on('touchstart', function (e) {
            $that.dragElem = e.target;
            $that.elemToRemove = e.target;
            $that.mx = $that.touchX;
            $that.my = $that.touchY;
            $('.door, .resizer').removeClass('active');
            let doorid = $($that.dragElem).attr('doorid');
            if (doorid) {
              $('.door-' + doorid).addClass('active');
            }
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
                    let doorid = $($that.dragElem).attr('doorid');
                    var $resizerToSet = $('.resizer.door-' + doorid);
                    var leftToMinus = $('.customer-home').offset().left;
                    var topToMinus = $('.customer-home').offset().top;
                    $resizerToSet.css({
                      'left': ($($that.dragElem).offset().left + $($that.dragElem).width() - leftToMinus - 25) + 'px',
                      'top': ($($that.dragElem).offset().top + $($that.dragElem).height() - topToMinus - 25) + 'px'
                    });
                } else if ($that.resizeElem) {
                    var offsetToSet = 15;
                    let doorid = $($that.resizeElem).attr('doorid');
                    $($that.resizeElem).css({
                        'left': ($that.touchX - offsetToSet) + 'px',
                        'top': ($that.touchY - $('.customer-home').offset().top - offsetToSet) + 'px'
                    });
                    var $doorToSet = $('.door.door-' + doorid);
                    $doorToSet.css({
                      'width': (($that.touchX - offsetToSet) - ($doorToSet.offset().left - 25)) + 'px',
                      'height': (($that.touchY) - ($doorToSet.offset().top)) + 'px'
                    });

                }
            }
        });
    }

    handleImage(e) {
        var reader = new FileReader();
        var $that = this;
        $that.uploadSelectedHome.imgSrc = '';
        reader.onload = function (event) {
            var img = new Image();
            img.onload = function () {
                // To set the uploaded image as aspect ratio in canvas
                $that.uploadSelectedHome._imgwidth = img.width;
                $that.uploadSelectedHome._imgheight = img.height;

                let $homeCore = document.querySelector('.home-image-core');
                if ($homeCore && img['src']) {
                    document.querySelector('.home-image-core')['src'] = img['src'];
                    $that.uploadSelectedHome.imgSrc = img['src'];
                }
                $that.doorCount = 1;
                $that.doors = [new Door(100, 100, 50, 50)];
                $that.drawDoors();
            }
            img.src = event.target['result'];
            e.target.value = null;
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    addDoor() {
        let d = new Door(100, 100, 50, 50);
        this.doors.push(d);
        this.doorCount = this.doorCount + 1;
        var $d = this.getDoor(d);
        d.$elem = $d;
        $('.customer-home').append($d.addClass('door-' + this.doorCount).attr('doorid', this.doorCount));
        // this line must be here due to html tag rendering issue
        d.$resizer = this.getResizer(d);
        $('.customer-home').append(d.$resizer.addClass('door-' + this.doorCount).attr('doorid', this.doorCount));
        this.resetDoorText();
        this.bindEvents();
    }

    removeDoor() {
      let $that = this;
      let $activeDoors = $('.customer-home').find('.door.active');
      if ($activeDoors.length > 0) {
        var doorid = $($activeDoors[0]).attr('doorid');
        if (doorid) {
            this.doors.pop();
            $('.door-' + doorid).remove();
            this.resetDoorText();
        }
      }
    }


    uploadSelectedHome = {
        dcoords:
        {
            point: []
        },
        canvas: null,
        imgSrc: null,
        _imgwidth: 700,
        _imgheight: 500,
        _upload: true
    };

    setSelectedHome(homeImageModal, isSave, currScreen) {
        var $that = this;
        if (isSave) {
            // refactoring must
            $('.customer-home').find('.door').each(function(i, n) {
                var $elem = $(this);
                let x = $elem.offset().left - $('.customer-home').offset().left;
                let y = $elem.offset().top - $('.customer-home').offset().top;
                let w = $elem.width();
                let h = $elem.height();

                let ul = x + ',' + y;
                let ur = (x + w) + ',' + y;
                let ll = x + ',' + (y + h);
                let lr = (x + w) + ',' + (y + h);
                let point = new Point(ul, ur, ll, lr);
                $that.uploadSelectedHome.dcoords.point.push(point);
            });
            this.uploadSelectedHome._imgwidth = $('.home-image-core').width();
            this.uploadSelectedHome._imgheight = $('.home-image-core').height();
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