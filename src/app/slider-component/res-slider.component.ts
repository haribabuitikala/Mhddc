import { Component, OnInit, OnChanges, Input, Output, EventEmitter, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { AppUtilities } from "../shared/appUtilities";
import { CollectionData } from "../collection/collection-data";
import { ConfigComponent } from "../config/config.component";
import { NavComponent } from '../nav/nav.component'
import { AppComponent } from "../app.component";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { CollectionService } from "../shared/data.service";

declare var $: any;
declare var _: any;

@Component({
    selector: 'app-res-slider',
    templateUrl: './res-slider.component.html',
    styleUrls: ['./slider-component.component.less']
})
export class ResSliderComponent implements OnInit, AfterViewInit {

    @ViewChild('contructionDetails') contructionDetails: ModalComponent;
    lang; myElement;
    constructor(private utils: AppUtilities
        , private dataStore: CollectionData
        , private myElem: ElementRef
        , private app: AppComponent
        , private dataService: CollectionService
        , private navComponent: NavComponent
        , private config: ConfigComponent) {
        this.myElement = myElem;
    }

    @Input() data: any;
    @Input() count: any;
    @Input() number: any;
    @Input() selectedIdx;
    @Input() selectedVal;
    @Input() folder: any;
    @Input() category: any;
    @Input() uniqueId: number;
    @Input() cname: string;
    @Input() className: string;
    @Input() subname: string;
    @Input() issub: string;
    @Output() onSelected = new EventEmitter();

    sliderRows;
    showGlassDetails;

    // construction details page
    cObj = this.utils.resFlowSession.resDoorObj;
    collectionName = this.cObj.product.product;
    construction = this.cObj.construction.construction;
    constructionInfo;

    imageUrl = location.href.indexOf('localhost:4200') >= 0 ? 'http://localhost:3435/images' : '';
    modelCategory;
    // @Output() notify = new EventEmitter<GdoOpener>();

    ngOnInit() {
        this.startProcess();
        this.detailsInfo(this.cObj.construction.construction['DisplayModelNumber']);
        this.showGlassDetails = false;
    }

    startProcess() {
        if (this.data) {
            if (this.navComponent.flowType == 'resquick') {
                if (this.cname != 'opener') {
                    if (this.data.length > 0 && this.data[0].length > 0) {
                        this.saveSelected(this.data[0][0]);
                    }
                }
            } else {
                if (this.cname != 'opener') {
                    if (this.utils.resFlowSession.resDoorObj.product.product['item_id'] == 16 && this.cname === 'color') {
                        this.saveSelected(this.data[0][3]);
                    } else {
                        if (this.data.length > 0 && this.data[0].length > 0) {
                            let k = _.filter(this.data[0], ['isdefault', true]);
                            if(k.length > 0) {
                                this.saveSelected(k[0]);    
                            } else {
                                this.saveSelected(this.data[0][0]);
                            }
                        }
                    }
                }
            }
            this.sliderRows = _.times(this.data.length, _.constant(null));
            this.slideCount = this.data ? this.data.length : 0;
        }
        this.renderSlider();
        this.imageUrl = location.href.indexOf('localhost:4200') >= 0 ? 'http://localhost:3435/images/' + this.folder : '../../assets/images/' + this.folder;
        this.getModelCategory(this.construction);
    }

    getModelCategory(obj) {
        switch (obj.best_order) {
            case 0:
                this.modelCategory = 'Basic(Other Constructions)'
                break
            case 1:
                this.modelCategory = 'Best'
                break
            case 2:
                this.modelCategory = 'Better'
                break
            default:
                this.modelCategory = 'Good'
        }
    }

    designSelected = null;
    isSeleted(item, index, itemIndex) {
        let isSeleted = false;
        switch (this.cname) {
            case 'design':
                if (this.utils.resFlowSession.resDoorObj.design.dsgn) {
                    if (this.navComponent.flowType == 'resquick') {
                        if (this.designSelected == item['item_thumbnail']) {
                            isSeleted = true;
                        }

                    } else {
                        if (this.utils.resFlowSession.resDoorObj.design.dsgn['item_id'] === item['item_id']) {
                            this.utils.resFlowSession.resDoorObj.design.dsgn['constructions'][0]['isdefault'] = true;
                            isSeleted = true;
                        }
                    }
                }
                break;
            case 'construction':
                if (this.utils.resFlowSession.resDoorObj.construction.construction) {
                    if (this.utils.resFlowSession.resDoorObj.construction.construction['item_id'] === item['item_id']) {
                        this.utils.resFlowSession.resDoorObj.construction.construction['isdefault'] = true;
                        isSeleted = true;
                    }
                }
                break;
            case 'color':
                if (this.issub) {
                    if (this.utils.resFlowSession.resDoorObj.color.base && this.subname == 'base') {
                        if (this.utils.resFlowSession.resDoorObj.color.base['item_id'] === item['item_id']) {
                            isSeleted = true;
                        }
                    }

                    if (this.utils.resFlowSession.resDoorObj.color.overlay && this.subname == 'overlay') {
                        if (this.utils.resFlowSession.resDoorObj.color.overlay['item_id'] === item['item_id']) {
                            isSeleted = true;
                        }
                    }
                } else {
                    if (this.utils.resFlowSession.resDoorObj.color.base) {
                        if (this.utils.resFlowSession.resDoorObj.color.base['item_id'] === item['item_id']) {
                            isSeleted = true;
                        }
                    }
                }

                break;
            case 'hardware':
                if (this.issub) {
                    if (this.utils.resFlowSession.resDoorObj.hardware.hinge && this.subname == 'stephinges') {
                        if (this.utils.resFlowSession.resDoorObj.hardware.hinge['item_id'] === item['item_id']) {
                            isSeleted = true;
                        }
                    }

                    if (this.utils.resFlowSession.resDoorObj.hardware.stepplate && this.subname == 'stepplates') {
                        if (this.utils.resFlowSession.resDoorObj.hardware.stepplate['item_id'] === item['item_id']) {
                            isSeleted = true;
                        }
                    }
                    if (this.utils.resFlowSession.resDoorObj.hardware.handle && this.subname == 'handles') {
                        if (this.utils.resFlowSession.resDoorObj.hardware.handle['item_id'] === item['item_id']) {
                            isSeleted = true;
                        }
                    }
                }
                break;
            case 'topsection':
                if (this.utils.resFlowSession.resDoorObj.windows.topsection) {
                    if (this.utils.resFlowSession.resDoorObj.windows.topsection['item_id'] === item['item_id']) {
                        isSeleted = true;
                    }
                }
                break;
            case 'glasstype':
                if (this.utils.resFlowSession.resDoorObj.windows.glasstype) {
                    if (this.utils.resFlowSession.resDoorObj.windows.glasstype['item_id'] === item['item_id']) {
                        isSeleted = true;
                        this.showGlassDetails = true;
                    }
                }
                break;
            case 'opener':
                if (this.utils.resFlowSession.resDoorObj.opener.opener) {
                    if (this.utils.resFlowSession.resDoorObj.opener.opener['item_id'] === item['item_id']) {
                        isSeleted = true;
                    }
                }
                break;
            default:
                break;
        }

        return isSeleted;
    }

    sliderWidth = 0;
    slideWidth = 0;
    slideCount = this.data ? this.data.length : 0;
    sliderLeft = 0;
    touchStart = false;
    slideIndex = 0;
    touchX = 0;
    oldX = 0;
    slideHeight = 0;

    itm;

    renderSlider() {
        this.slideWidth = $('._slider-container').width();
        this.sliderWidth = (this.data.length * this.slideWidth) + this.slideWidth;
    }

    ngOnChanges() {
        if (this.cname === 'construction') {
            this.renderSlider();
            this.slideCount = this.data ? this.data.length : 0;
        }
    }

    ngAfterViewInit() {
        $('.choose-design .inner-item > img').css({ 'height': 89 }); //chnaged from 108 to 89
        $('.constructionSlider .inner-item > img').css({ 'height': 140 }); //changed height from 150 to 140
        $('.colorSlider .inner-item > img').css({ 'height': 72 });
        $('.topSectionSlider .inner-item > img').css({ 'height': 37 });
        $('.glass-carousel .inner-item > img').css({ 'height': 75 });
        $('.hardware_screen .inner-item > img').css({ 'height': 52 })
        if ((this.folder === 'design' || this.folder === 'topsection') && this.slideCount > 1) {
            this.slideWidth = this.slideWidth - 20;
        }
        $('._slider', this.myElem.nativeElement).on('touchstart', (e) => {
            this.touchStart = true;
            this.touchX = e.touches[0].clientX;
            this.oldX = this.sliderLeft;
        });
        $(document).on('touchmove', (e) => {
            var dir = this.touchX - e.touches[0].clientX;
            if (dir > 0) {
                if (Math.abs(this.sliderLeft) <= (this.sliderWidth - (2 * this.slideWidth))) {
                    this.sliderLeft = -(Math.abs(this.oldX) + dir);
                }
            } else {
                if (this.sliderLeft < 0) {
                    this.sliderLeft = -(Math.abs(this.oldX) + dir);
                }
            }
        });
        $('._slider', this.myElem.nativeElement).on('touchend', (e) => {
            this.touchStart = false;
            this.touchX = 0;
            this.setSlide();
        });
    }


    setSlide() {
        this.slideIndex = Math.round(Math.abs(this.sliderLeft) / this.slideWidth);
        this.sliderLeft = -(this.slideIndex * this.slideWidth);
    }

    saveSelected(obj) {
        switch (this.cname) {
            case 'topsection':
                this.utils.resFlowSession.resDoorObj.windows.topsection = obj;
                if (obj['glasstypes'] && obj['glasstypes'].length > 0) {
                    let res = obj.glasstypes.filter(function (el) {
                        return el.isdefault == true
                    })
                    this.utils.resFlowSession.resDoorObj.windows.glasstype = res[0]
                }
                break;
            case 'glasstype':
                this.utils.resFlowSession.resDoorObj.windows.glasstype = obj;
                break;
            case 'hardware':
                if (this.issub) {
                    if (this.subname == 'handles') {
                        this.utils.resFlowSession.resDoorObj.hardware.handle = obj;
                        this.utils.resFlowSession.resDoorObj.hardware.handle['count'] = 1;
                        if (obj['placementlist'] && obj['placementlist'].split(';').length > 0) {
                            this.utils.resFlowSession.resDoorObj.hardware.handle['placement'] = obj['placementlist'].split(';')[0];
                            var defaultCount = parseInt(obj.defaultkit);
                            if (defaultCount == 2 && obj['placementlist'].split(';').length > 1) {
                                this.utils.resFlowSession.resDoorObj.hardware.handle['placement'] = obj['placementlist'].split(';')[1];
                            }
                        }
                        // this.utils.resFlowSession.resDoorObj.hardware.handle['placement'] = obj['placement'] ? obj['placement'] : obj['placementlist'];
                    } else if (this.subname == 'stepplates') {
                        this.utils.resFlowSession.resDoorObj.hardware.stepplate = obj;
                        this.utils.resFlowSession.resDoorObj.hardware.stepplate['count'] = 1;
                        if (obj['placementlist'] && obj['placementlist'].split(';').length > 0) {
                            this.utils.resFlowSession.resDoorObj.hardware.stepplate['placement'] = obj['placementlist'].split(';')[0];
                            var defaultCount = parseInt(obj.defaultkit);
                            if (defaultCount == 2 && obj['placementlist'].split(';').length > 1) {
                                this.utils.resFlowSession.resDoorObj.hardware.stepplate['placement'] = obj['placementlist'].split(';')[1];
                            }
                        }
                    } else {
                        this.utils.resFlowSession.resDoorObj.hardware.hinge = obj;
                        this.utils.resFlowSession.resDoorObj.hardware.hinge['count'] = 1;
                        this.utils.resFlowSession.resDoorObj.hardware.hinge['placement'] = obj['placement'] ? obj['placement'] : obj['placementlist'];
                        if (obj['placementlist'] && obj['placementlist'].split(';').length > 0) {
                            this.utils.resFlowSession.resDoorObj.hardware.hinge['placement'] = obj['placementlist'].split(';')[0];
                            var defaultCount = parseInt(obj.defaultkit);
                            if (defaultCount == 2 && obj['placementlist'].split(';').length > 1) {
                                this.utils.resFlowSession.resDoorObj.hardware.hinge['placement'] = obj['placementlist'].split(';')[1];
                            }
                        }
                    }
                }
                break;
            case 'opener':
                this.utils.resFlowSession.resDoorObj.opener.opener = obj;
                break;
            case 'design':
                this.utils.resFlowSession.resDoorObj.design.dsgn = obj;
                this.utils.resFlowSession.resDetails.designName = obj.item_name;
                if (obj['constructions']) {
                    this.utils.resFlowSession.resDoorObj.construction.apiData = obj['constructions'];
                    this.utils.resFlowSession.resDoorObj.construction.construction = obj['constructions'][0];
                    this.utils.resFlowSession.resDoorObj.construction.construction['isdefault'] = true;
                    let construction = obj['constructions'][0];
                    if (construction && construction['colors'] && construction['colors'].length > 0) {
                        this.utils.resFlowSession.resDoorObj.color.overlay = construction['colors'][0];
                        this.utils.resFlowSession.resDoorObj.color.base = construction['colors'][0];

                        if (this.utils.resFlowSession.resDoorObj.product.product['item_id'] == 16) {
                            this.utils.resFlowSession.resDoorObj.color.overlay = construction['colors'][3];
                            this.utils.resFlowSession.resDoorObj.color.base = construction['colors'][3];
                        }
                    }
                }
                let stockdoorconstructions = obj['stockdoorconstructions'];
                if (stockdoorconstructions && stockdoorconstructions.length > 0) {
                    this.utils.resFlowSession.resDoorObj.design.columns = obj['Columns'];
                    this.utils.resFlowSession.resDoorObj.design.rows = obj['Rows'];
                    this.utils.resFlowSession.resDoorObj.construction.apiData = stockdoorconstructions;
                    this.utils.resFlowSession.resDoorObj.construction.construction = stockdoorconstructions[0];
                    this.utils.resFlowSession.resDoorObj.construction.construction['isdefault'] = true;
                    let colors = stockdoorconstructions[0]['colors'];
                    if (colors && colors.length > 0) {

                        this.utils.resFlowSession.resDoorObj.color.overlay = colors[0];
                        this.utils.resFlowSession.resDoorObj.color.base = colors[0];
                    }
                }

                this.designSelected = obj['item_thumbnail'];
                break;
            case 'color':
                if (this.issub) {
                    if (this.subname == 'base') {
                        this.utils.resFlowSession.resDoorObj.color.base = obj;
                    } else {
                        this.utils.resFlowSession.resDoorObj.color.overlay = obj;
                    }

                } else {
                    this.utils.resFlowSession.resDoorObj.color.base = obj;
                    //this.utils.resFlowSession.resDoorObj.color.overlay = obj;
                }

                break;
            case 'construction':
                this.utils.resFlowSession.resDoorObj.construction.construction = obj;
                if (obj['colors'] && obj['colors'].length > 0) {
                    this.utils.resFlowSession.resDoorObj.color.base = obj['colors'][0];
                    this.utils.resFlowSession.resDoorObj.color.overlay = obj['colors'][0];

                    if (this.utils.resFlowSession.resDoorObj.product.product['item_id'] == 16 && obj['colors'].length > 3) {
                        this.utils.resFlowSession.resDoorObj.color.overlay = obj['colors'][3];
                        this.utils.resFlowSession.resDoorObj.color.base = obj['colors'][3];
                    }
                }
                break;
            default:
                break;
        }
        this.app.updatePrice();
        this.config.renderCanvas();

    }
    openerSelected(obj, event) {
        this.utils.setLoader();
        if (obj.clickAction) {
            obj.clickAction();
        } else {
            //$('._slide-items img', this.myElem.nativeElement).removeClass('current');
            // this.gdoConfig.itemPrice = obj.item_price * this.utils.utilities.gdoOpenerQty;
            // this.utils.utilities.item_price = obj.item_price;
            // let t = obj.item_thumbnail.split('.')[0];
            // this.gdoConfig.gdoBanner = t + '.png';
            //event.currentTarget.classList.add('current');
            let utils = this.utils;
            utils.resFlow.selectedImg = obj.item_id;
            // this.utils.utilities.itemPriceInstall = obj.item_price;
            // this.details.itemPrice = obj.item_price;
            if (this.category === 'color') {
                this.utils.resFlow.colorconfig = obj.colorconfig;
            }
            if (this.category === 'color' || this.category === 'constructions' || this.category === undefined) {
                this.config.homeImage = obj.item_thumbnail;
            }
            if (this.cname === 'construction') {
                this.detailsInfo(obj.ClopayModelNumber);
            }
            this.dataStore[this.category] = obj[this.category];

            // this.details.details.designName = obj.item_name;
            // this.utils.utilities.gdoOpenerSelectedItm = obj.item_id;
            // this.notify.emit(obj);
            this.saveSelected(obj);
        }
        this.onSelected.next({ event: event, obj: obj, subname: this.subname });
        this.utils.removeLoader();
    }


    moveSlider(isNext) {
        if (isNext) {
            this.slideIndex = this.slideIndex + 1;
        } else {
            this.slideIndex = this.slideIndex - 1;
        }
        this.sliderLeft = -(this.slideIndex * this.slideWidth);
    }


    onImageLoadError(item, folder) {
        console.log('item, folder');
    }

    detailsInfo(id, contructionDetails?) {
        this.dataService.getModelInfo(id)
            .subscribe(res => {
                if (contructionDetails) {
                    this.constructionInfo = res
                    contructionDetails.open();
                } else {
                    if (res && res.length > 0) {
                        let t = res[2].modeldescription ? parseFloat(res[2].modeldescription.split(' ')[0]) : 19;
                        if (t < 18.4) {
                            this.utils.resFlow.isUpsellSet = true;
                        }
                    }
                }
            });
    }
}
