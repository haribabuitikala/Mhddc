import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { AppUtilities } from "../shared/appUtilities";
import { CollectionData } from "../collection/collection-data";
import { ConfigComponent } from "../config/config.component";
import { NavComponent } from '../nav/nav.component'
import { AppComponent } from "../app.component";
 
import { CollectionService } from "../shared/data.service";

declare var $: any;
declare var _: any;

@Component({
    selector: 'app-res-slider',
    templateUrl: './res-slider.component.html',
    styleUrls: ['./slider-component.component.less']
})
export class ResSliderComponent implements OnInit, AfterViewInit {

    myElement;
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

    sliderRows;

    // construction details page
    cObj = this.utils.resFlowSession.resDoorObj;
    collectionName = this.cObj.product.product;
    construction = this.cObj.construction.construction;
    constructionInfo;

    imageUrl = location.href.indexOf('localhost:4200') >= 0 ? 'http://localhost:3435/images' : '';
    modelCategory;
    // @Output() notify = new EventEmitter<GdoOpener>();

    ngOnInit() {

        if (this.data) {
            if (this.navComponent.flowType == 'resquick') {
                if (this.cname != 'openers') {
                    if (this.data.length > 0 && this.data[0].length > 0) {
                        this.saveSelected(this.data[0][0]);
                    }
                }
            } else {
                if (this.data.length > 0 && this.data[0].length > 0) {
                    this.saveSelected(this.data[0][0]);
                }
            }
            this.sliderRows = _.times(this.data.length, _.constant(null));
            this.slideCount = this.data ? this.data.length : 0;
        }
        this.dataService.getModelInfo(this.construction)
            .subscribe(
            res => this.constructionInfo = res
            )
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

    isSeleted(item, index, itemIndex) {
        let isSeleted = false;
        switch (this.cname) {
            case 'design':
                if (this.utils.resFlowSession.resDoorObj.design.dsgn) {
                    if (this.utils.resFlowSession.resDoorObj.design.dsgn['item_id'] === item['item_id']) {
                        isSeleted = true;
                    }
                }
                break;
            case 'construction':
                if (this.utils.resFlowSession.resDoorObj.construction.construction) {
                    if (this.utils.resFlowSession.resDoorObj.construction.construction['item_id'] === item['item_id']) {
                        isSeleted = true;
                    }
                }
                break;
            case 'color':
                if (this.utils.resFlowSession.resDoorObj.color.base) {
                    if (this.utils.resFlowSession.resDoorObj.color.base['item_id'] === item['item_id']) {
                        isSeleted = true;
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
                    }
                }
                break;
            case 'handles':
                if (this.utils.resFlowSession.resDoorObj.hardware.handle) {
                    if (this.utils.resFlowSession.resDoorObj.hardware.handle['item_id'] === item['item_id']) {
                        isSeleted = true;
                    }
                }
                break;
            case 'stepplates':
                if (this.utils.resFlowSession.resDoorObj.hardware.stepplate) {
                    if (this.utils.resFlowSession.resDoorObj.hardware.stepplate['item_id'] === item['item_id']) {
                        isSeleted = true;
                    }
                }
                break;
            case 'stephinges':
                if (this.utils.resFlowSession.resDoorObj.hardware.hinge) {
                    if (this.utils.resFlowSession.resDoorObj.hardware.hinge['item_id'] === item['item_id']) {
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
        this.sliderWidth = (this.data.length * this.slideWidth) + this.slideWidth - 20;
    }

    ngAfterViewInit() {
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
                if (obj['glasstype'] && obj['glasstype'].length > 0) {
                    this.utils.resFlowSession.resDoorObj.windows.glasstype = obj['glasstype'][0];
                }
                break;
            case 'glasstype':
                this.utils.resFlowSession.resDoorObj.windows.glasstype = obj;
                break;
            case 'handles':
                this.utils.resFlowSession.resDoorObj.hardware.handle = obj;
                this.utils.resFlowSession.resDoorObj.hardware.handle['count'] = 1;
                this.utils.resFlowSession.resDoorObj.hardware.handle['placement'] = obj['placement'] ? obj['placement'] : obj['placementlist'];
                break;
            case 'stepplates':
                this.utils.resFlowSession.resDoorObj.hardware.stepplate = obj;
                this.utils.resFlowSession.resDoorObj.hardware.stepplate['count'] = 1;
                this.utils.resFlowSession.resDoorObj.hardware.stepplate['placement'] = obj['placement'] ? obj['placement'] : obj['placementlist'];
                break;
            case 'stephinges':
                this.utils.resFlowSession.resDoorObj.hardware.hinge = obj;
                this.utils.resFlowSession.resDoorObj.hardware.hinge['count'] = 1;
                this.utils.resFlowSession.resDoorObj.hardware.hinge['placement'] = obj['placement'] ? obj['placement'] : obj['placementlist'];
                break;
            case 'openers':
                this.utils.resFlowSession.resDoorObj.opener.opener = obj;
                break;
            case 'design':
                this.utils.resFlowSession.resDoorObj.design.dsgn = obj;
                if (obj['constructions']) {
                    this.utils.resFlowSession.resDoorObj.construction.apiData = obj['constructions'];
                    this.utils.resFlowSession.resDoorObj.construction.construction = obj['constructions'][0];
                }
                let stockdoorconstructions = obj['stockdoorconstructions'];
                if (stockdoorconstructions && stockdoorconstructions.length > 0) {
                    this.utils.resFlowSession.resDoorObj.construction.apiData = stockdoorconstructions;
                    this.utils.resFlowSession.resDoorObj.construction.construction = stockdoorconstructions[0];
                    let colors = stockdoorconstructions[0]['colors'];
                    if (colors && colors.length > 0) {

                        this.utils.resFlowSession.resDoorObj.color.overlay = colors[0];
                        this.utils.resFlowSession.resDoorObj.color.base = colors[0];
                    }
                }
                break;
            case 'color':
                this.utils.resFlowSession.resDoorObj.color.base = obj;
                this.utils.resFlowSession.resDoorObj.color.overlay = obj;
                break
            case 'construction':
                this.utils.resFlowSession.resDoorObj.construction.construction = obj;
                if (obj['colors'] && obj['colors'].length > 0) {
                    this.utils.resFlowSession.resDoorObj.color.base = obj['colors'][0];
                    this.utils.resFlowSession.resDoorObj.color.overlay = obj['colors'][0];
                }
                break;
            default:
                break;
        }
        this.app.updatePrice();
        this.config.renderCanvas();
    }
    openerSelected(obj, event) {
        //$('._slide-items img', this.myElem.nativeElement).removeClass('current');
        // this.gdoConfig.itemPrice = obj.item_price * this.utils.utilities.gdoOpenerQty;
        // this.utils.utilities.item_price = obj.item_price;
        // let t = obj.item_thumbnail.split('.')[0];
        // this.gdoConfig.gdoBanner = t + '.png';
        //event.currentTarget.classList.add('current');
        let utils = this.utils;
        utils.resFlow.selectedImg = obj.item_id;
        // this.details.itemPrice = obj.item_price;
        if (this.category === 'color') {
            this.utils.resFlow.colorconfig = obj.colorconfig;
        }
        if (this.category === 'color' || this.category === 'constructions' || this.category === undefined)
            this.config.homeImage = obj.item_thumbnail;
        this.dataStore[this.category] = obj[this.category];

        // this.details.details.designName = obj.item_name;
        // this.utils.utilities.gdoOpenerSelectedItm = obj.item_id;
        // this.notify.emit(obj);
        this.saveSelected(obj);


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


}
