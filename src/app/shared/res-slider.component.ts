import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { AppUtilities } from "./appUtilities";
import { CollectionData } from "../collection/collection-data";
import { ConfigComponent } from "../config/config.component";
import { AppComponent } from "../app.component";
import { DetailsComponent } from "../details/details.component";
declare var $: any;
declare var _: any;

@Component({
    selector: 'app-res-slider',
    template: `
    <div class="_slider-container m20-top">
      <div class="_slider-wrapper">
        <div class="_slider unique-{{uniqueId}}" [style.width.px]="sliderWidth" [style.left.px]="sliderLeft">
          <div class="_slide" [style.width.px]="slideWidth" *ngFor="let slide of data; let k = index">
            <div class="_slide-items">
              <div class="inner-item col-xs-{{number}}" 
                *ngFor="let slideitem of slide; let i=index" 
                [ngClass]="{ 'current' : isSeleted(slideitem, k, i)}"
                (click)="openerSelected(slideitem, $event)">
                <img (error)="onImageLoadError(slideitem, folder)" 
                    src="http://hddchtml.clopay.com/Content/en/images/{{slideitem.item_thumbnail.replace('.jpg', '.png')}}"
                     [attr.data-id]="slideitem.item_id">
              </div>
            </div>
          </div>
        </div>
        <!-- Left and right controls -->
        <a class="left carousel-control" *ngIf="slideIndex > 0" id="prev" (click)="moveSlider()" href="javascript:void(0)" role="button" data-slide="prev">
          <span class="helper"></span><img style=" transform: rotate(-180deg);" class="left-arrow" src="../../assets/images/ch-left-arrow.png" alt="">
        </a>
        <a class="right carousel-control" *ngIf="slideIndex < slideCount - 1" id="next" (click)="moveSlider(true)" href="javascript:void(0)" role="button" data-slide="next">
          <span class="helper"></span><img class="right-arrow" src="../../assets/images/ch-right-arrow.png" alt="">
        </a>
    
      </div>
    </div>

`,
    styleUrls: ['./slider-component/slider-component.component.less']
})
export class ResSliderComponent implements OnInit {

    myElement;
    constructor(private utils: AppUtilities
        , private dataStore: CollectionData
        , private myElem: ElementRef
        , private app: AppComponent
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
    @Input() cname:string;

    sliderRows;

    // @Output() notify = new EventEmitter<GdoOpener>();

    ngOnInit() {
        if (this.data) {
            this.sliderRows = _.times(this.data.length, _.constant(null));
            this.slideCount = this.data ? this.data.length : 0;
        }
        this.renderSlider();

        let selectedIndex = 0, itemIndex = 0;
        for (let i = 0, len = this.data.length; i < len; i++) {
            var innerItems = this.data[i];
            for (let j = 0, jlen = innerItems.length; j < jlen; j++) {
                if (innerItems[j].item_id == this.utils.utilities.gdoOpenerSelectedItm) {
                    selectedIndex = i;
                    itemIndex = j;
                }
            }
        }
        this.slideIndex = selectedIndex;
        this.sliderLeft = -(this.slideIndex * this.slideWidth);
    }

    isSeleted(opener, index, itemIndex) {
        if (this.utils.resFlow.selectedImg && opener.item_id == this.utils.utilities.gdoOpenerSelectedItm) {
            return true;
        } else if (this.utils.resFlow.selectedImg === null && index === 0 && itemIndex === 0) {
            return true;
        }
        return false;
    }

    sliderWidth = 0;
    slideWidth = 0;
    slideCount = this.data ? this.data.length : 0;
    sliderLeft = 0;
    touchStart = false;
    slideIndex = 0;
    touchX = 0;
    oldX = 0;

    itm;

    renderSlider() {
        this.slideWidth = $('._slider-container').width();
        this.sliderWidth = (this.data.length * this.slideWidth) + this.slideWidth;
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
        // this.utils.utilities.gdoOpenerSelectedItm = obj.item_id;
        // this.notify.emit(obj);
        switch (this.cname) {
            case 'topsection':
                this.utils.resFlowSession.resDoorObj.windows.topsection = obj;
                break;
            case 'handles':
                this.utils.resFlowSession.resDoorObj.hardware.handle = obj;
                break;
            case 'stepplates':
                this.utils.resFlowSession.resDoorObj.hardware.stepplate = obj;
                break;
            case 'stephinges':
                this.utils.resFlowSession.resDoorObj.hardware.hinge = obj;
                break;
            case 'openers':
                this.utils.resFlowSession.resDoorObj.opener.opener = obj;
                break;
            case 'design':
                this.utils.resFlowSession.resDoorObj.design.dsgn = obj;
                this.utils.resFlowSession.resDoorObj.construction.construction = obj['constructions'][0];
                break;
            default:
                break;
        }

        this.app.updatePrice();

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
