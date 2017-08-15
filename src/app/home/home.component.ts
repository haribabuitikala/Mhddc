import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUtilities } from "../shared/appUtilities";
import { NavService } from "../nav/nav-service";
import { NavComponent } from "../nav/nav.component";
import { CollectionData } from "../collection/collection-data";
import { ConfigComponent } from "../config/config.component";
import { AppComponent } from "../app.component";
declare var $: any;
declare var _: any;
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, AfterViewInit {
    pageNo;
    homes;
    selected;

    doors = [];
    cornerWidth = 40;
    canvasState = {
        width: 0,
        height: 0
    };
    selectedDoor = null;
    startX;
    startY;

    uploadSelectedHome = {
        dcoords:
        {
            point: [],
            points: []
        },
        canvas: null,
        imgSrc: null,
        _imgwidth: 700,
        _imgheight: 500,
        _upload: true
    };

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
        //  this.utils.resFlowSession.resDoorObj.resetsize();
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
        homeImageModal.open();
        this.handleImage(event);
    }



    setStyles = (elem, styles) => {
        Object.keys(styles).forEach(function (key) {
            elem.style[key] = styles[key];
        });
    }
    drawCorner = (p) => {
        var point = $('<div/>');
        point.addClass('drag-point');

        point.css({
            width: this.cornerWidth,
            height: this.cornerWidth,
            backgroundColor: '#f1f1f1',
            position: 'absolute',
            left: p.x - this.cornerWidth / 2,
            top: p.y - this.cornerWidth / 2,
            borderRadius: '25px',
            border: '4px solid black',
            opacity: '0.7'
        });

        point.attr('order', p.order);

        point.bind('touchmove', (evt) => {
            if (evt.touches.length === 1) {
                const rect = $('.home-canvas-editor').offset();
                const mX = evt.touches[0].clientX - rect.left,
                    mY = evt.touches[0].clientY - rect.top;
                const nX = (mX - this.cornerWidth / 2);
                const nY = (mY - this.cornerWidth / 2);
                if (nX > 0 && nX < (this.canvasState.width - this.cornerWidth) &&
                    nY > 0 && nY < this.canvasState.height - this.cornerWidth) {
                    point.css('left', nX);
                    point.css('top', nY);
                    p.x = mX;
                    p.y = mY;
                    this.drawDoors();
                }

            }
            if (evt.preventDefault) {
                evt.preventDefault();
            }
            if (evt.stopPropagation) {
                evt.stopPropagation();
            }
        });

        return point;

    }
    drawCorners = (d) => {
        $('.drag-layer').html('');
        d.points.forEach((p) => {
            $('.drag-layer').append(this.drawCorner(p));
        });
    }
    drawDoor = (d, ctx) => {
        ctx.beginPath();
        d.points.forEach((p, index) => {
            if (parseInt(p.order) === 1) {
                ctx.moveTo(p.x, p.y);
            } else {
                if (parseInt(p.type) === 2 && (parseInt(p.order) === 2 || parseInt(p.order) === 3)) {
                    if (parseInt(p.order) === 2) {
                        var p2 = d.points[index + 1];
                        ctx.quadraticCurveTo(p.x, p.y - 15, p2.x, p2.y);
                    }
                } else {
                    ctx.lineTo(p.x, p.y);
                }
            }
        });
        ctx.closePath();
        ctx.lineWidth = 1;
        if (d.selected) {
            ctx.lineWidth = 10;
        }
        ctx.stroke();

        ctx.fillStyle = '#cecece';
        ctx.fill();
    }

    drawDoors = (updateCorners?) => {
        var ctx = this.canvasState['ctx'];
        ctx.clearRect(0, 0, this.canvasState.width, this.canvasState.height);
        this.doors.forEach((d) => {
            this.drawDoor(d, ctx);
        });

        if (this.selectedDoor && updateCorners) {
            this.drawCorners(this.selectedDoor);
        }
    }

    drawCanvasLayer = () => {
        var canvas = document.createElement('CANVAS');
        canvas['width'] = this.canvasState.width;
        canvas['height'] = this.canvasState.height;

        this.setStyles(canvas, {
            position: 'absolute',
            left: 0,
            top: 0
        });

        this.canvasState['ctx'] = canvas['getContext']('2d');
        this.canvasState['canvas'] = canvas;

        $('.home-canvas-editor').append(canvas);
        this.drawDoors();
    }

    setDoorType(toType) {
        if (this.selectedDoor && this.selectedDoor.type !== toType) {
            let door = this.selectedDoor;
            door.type = toType;
            if (toType === 2) {
                let points = [];
                let p0 = door.points[0];
                let x = p0.x + (50);
                let y = p0.y - (50);

                door.points.forEach((p, idx) => {
                    if (points.length === 1) {
                        points.push({
                            x: x,
                            y: y,
                            order: 2,
                            type: toType
                        });
                    }
                    p.type = toType;
                    p.order = points.length + 1;
                    if (p.pin) {
                        points.push(p);
                    }
                });

                door.points = points;
            } else if (toType === 3) {
                let points = [];
                let p0 = door.points[0];
                let x1 = p0.x + (25);
                let y1 = p0.y - (25);

                let p1 = door.points.filter((p) => { return p.pin === true; })[1];
                let x2 = p1.x - (25);
                let y2 = p1.y - (25);

                door.points.forEach((p, idx) => {
                    if (points.length === 1) {
                        points.push({
                            x: x1,
                            y: y1,
                            order: 2,
                            type: toType
                        });

                        points.push({
                            x: x2,
                            y: y2,
                            order: 3,
                            type: toType
                        });
                    }
                    p.type = toType;
                    p.order = points.length + 1;
                    if (p.pin) {
                        points.push(p);
                    }
                });

                door.points = points;
            } else {
                let points = [];
                door.points.forEach((p, idx) => {
                    p.type = toType;
                    p.order = points.length + 1;
                    if (p.pin) {
                        points.push(p);
                    }
                });

                door.points = points;
            }

            this.drawDoors(true);
        }

    }
    addDoor = (n?) => {
        const door = {
            id: this.doors.length,
            selected: true,
            zindex: 1,
            type: 1,
            points: [{
                x: 100,
                y: 100,
                order: 1,
                type: 1,
                pin: true
            }, {
                x: 200,
                y: 100,
                order: 2,
                type: 1,
                pin: true
            }, {
                x: 200,
                y: 200,
                order: 3,
                type: 1,
                pin: true
            }, {
                x: 100,
                y: 200,
                order: 4,
                type: 1,
                pin: true
            }]
        };
        this.doors.push(door);
        this.selectedDoor = door;
        this.drawDoors(true);
    }

    detectDoor = function (x, y) {
        var doorFound = false,
            doorIndex = null;
        for (let i = 0, len = this.doors.length; i < len; i++) {
            var d = this.doors[i];
            var points = d.points;
            var ul = points.filter((p) => {
                return p.order === 1;
            });
            ul = ul.length > 0 ? ul[0] : null;
            var lr = points.filter((p) => {
                if (p.type === 2) {
                    return p.order === 4;
                } else if (p.type === 3) {
                    return p.order === 5;
                } else {
                    return p.order === 3;
                }
            });

            lr = lr.length > 0 ? lr[0] : null;
            this.doors[i].selected = false;
            if (ul.x < x && ul.y < y && lr.x > x && lr.y > y) {
                doorFound = true;
                this.doors[i].selected = true;
                this.selectedDoor = this.doors[i];
                this.drawCorners(this.doors[i]);
            }
        };

        if (doorFound) {
            this.drawDoors();
        } else {
            this.selectedDoor = false;
        }
    }

    moveDoor = (x, y) => {
        if (this.selectedDoor) {
            const xMax = this.canvasState.width;
            const yMax = this.canvasState.height;
            let xPoints = [];
            let yPoints = [];
            xPoints = this.selectedDoor.points.reduce((a, b) => { return [].concat(a, b.x); }, []);
            yPoints = this.selectedDoor.points.reduce((a, b) => { return [].concat(a, b.y); }, []);
            const isLeftAllowed = (_.min(xPoints) + x) - (this.cornerWidth / 2) >= 0;
            const isRightAllowed = (_.max(xPoints) + x) + (this.cornerWidth / 2) < xMax;

            const isTopAllowed = (_.min(yPoints) + y) - (this.cornerWidth / 2) >= 0;
            const isBottomtAllowed = (_.max(yPoints) + y) + (this.cornerWidth / 2) < yMax;

            if (isLeftAllowed && isRightAllowed && isTopAllowed && isBottomtAllowed) {
                this.selectedDoor.points.forEach((p) => {
                    var newX = parseInt(p.x) + x;
                    var newY = parseInt(p.y) + y;
                    p.x = newX;
                    p.y = newY;
                });
                this.drawDoors(true);
            }
        }
    }

    drawDragLayer = () => {
        var maskLayer = $('<div/>');
        maskLayer.addClass('drag-layer');
        maskLayer.css({
            position: 'absolute',
            top: 0,
            left: 0,
            width: this.canvasState.width,
            height: this.canvasState.height
        });

        maskLayer.bind('touchstart', (evt) => {
            if (evt.touches.length === 1) {
                if (!$(evt.target).hasClass('drag-point')) {
                    const rect = $('.home-canvas-editor').offset();
                    this.startX = evt.touches[0].clientX;
                    this.startY = evt.touches[0].clientY;
                    this.detectDoor(this.startX - rect.left, this.startY - rect.top);
                }
            }
        });

        maskLayer.bind('touchmove', (evt) => {
            if (evt.touches.length === 1) {
                if (!$(evt.target).hasClass('drag-point')) {
                    const rect = $('.home-canvas-editor').offset();
                    var cX = evt.touches[0].clientX;
                    var cY = evt.touches[0].clientY;
                    var xMove = cX - this.startX;
                    var yMove = cY - this.startY;
                    this.moveDoor(xMove, yMove);
                    this.startX = cX;
                    this.startY = cY;
                }
            }
        });
        $('.home-canvas-editor').append(maskLayer);
    }
    handleImage(e) {
        $('.home-canvas-editor').html('');
        var reader = new FileReader();
        var $that = this;
        $that.uploadSelectedHome.imgSrc = '';
        reader.onload = function (event) {
            var img = new Image();
            img.onload = function () {
                if (window.innerWidth > window.innerHeight) {
                    img.width = window.innerHeight;
                } else {
                    // portrait
                    if (img.height > img.width) {
                        // image is portrait
                        const occupiedHeight = $('.canvas-toolbar').height() + $('.logo-header').height() + 100;
                        img.height = window.innerHeight - occupiedHeight;
                        // img.height = window.innerWidth;
                    } else {
                        img.width = window.innerWidth;
                    }
                }
                $('.home-canvas-editor').append(img);

                const imgstyles = getComputedStyle(img, 'false');
                $that.canvasState.width = parseInt(imgstyles.width);
                $that.canvasState.height = parseInt(imgstyles.height);

                $that.doors = [];
                const door = {
                    id: $that.doors.length,
                    selected: false,
                    zindex: 1,
                    type: 1,
                    points: [{
                        x: 100,
                        y: 100,
                        order: 1,
                        type: 1,
                        pin: true
                    }, {
                        x: 200,
                        y: 100,
                        order: 2,
                        type: 1,
                        pin: true
                    }, {
                        x: 200,
                        y: 200,
                        order: 3,
                        type: 1,
                        pin: true
                    }, {
                        x: 100,
                        y: 200,
                        order: 4,
                        type: 1,
                        pin: true
                    }]
                };
                $that.doors.push(door);
                $that.drawCanvasLayer();
                $that.drawDragLayer();
            };
            img.src = event.target['result'];
            $that.uploadSelectedHome.imgSrc = event.target['result'];
            e.target.value = null;
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    removeDoor() {
        if (this.selectedDoor) {
            this.selectedDoor.removed = true;
            let doors = [];
            this.doors.forEach((d) => {
                if (!d.removed) {
                    doors.push(d);
                }
            });
            this.doors = doors;
            this.selectedDoor = null;
            $('.drag-layer').html('');
            this.drawDoors(true);
        }
    }



    setSelectedHome(homeImageModal, isSave, currScreen) {
        var $that = this;
        if (isSave) {
            this.doors.forEach((d) => {
                let ul = d.points[0].x + ',' + d.points[0].y;
                let idx = 0,
                    arch,
                    angle1,
                    angle2;
                let ur = d.points[idx + 1].x + ',' + d.points[idx + 1].y;
                if (d.type === 2) {
                    arch = d.points[idx + 1].x + ',' + (d.points[idx + 1].y);
                    idx = 1;
                    ur = d.points[idx + 1].x + ',' + d.points[idx + 1].y;
                } else if (d.type === 3) {
                    angle1 = d.points[idx + 1].x + ',' + (d.points[idx + 1].y);
                    angle2 = d.points[idx + 2].x + ',' + (d.points[idx + 2].y);
                    idx = 2;
                    ur = d.points[idx + 1].x + ',' + d.points[idx + 1].y;
                }
                let lr = d.points[idx + 2].x + ',' + d.points[idx + 2].y;
                let ll = d.points[idx + 3].x + ',' + d.points[idx + 3].y;
                const point = new Point(ul, ur, lr, ll, d.type, { arch, angle1, angle2 });
                $that.uploadSelectedHome.dcoords.point.push(point);
            });
            this.uploadSelectedHome._imgwidth = this.canvasState.width;
            this.uploadSelectedHome._imgheight = this.canvasState.height;
            window['selectedHome'] = this.uploadSelectedHome;
            homeImageModal.close();
            this.nextBtn(currScreen, '/config/design');
        } else {
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
    type;

    arch;
    angle1;
    angle2;

    constructor(ul, ur, lr, ll, type?, opts?) {
        this._UL = ul;
        this._UR = ur;
        this._LL = ll;
        this._LR = lr;
        this.type = type;

        this.arch = opts['arch'];
        this.angle1 = opts['angle1'];
        this.angle2 = opts['angle2'];
    }
}