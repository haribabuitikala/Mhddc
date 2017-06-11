import {Component, OnInit, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
import {GdoConfigComponent} from "../gdo-config/gdo-config.component";
import {GdoOpener} from "../opener/gdoOpener";
import {AppUtilities} from "../shared/appUtilities";
declare var $: any;
declare var _: any;

@Component({
    selector: 'app-slider-component',
    templateUrl: './slider-component.component.html',
    styleUrls: ['./slider-component.component.less']
})
export class SliderComponentComponent implements OnInit {

    constructor(private gdoConfig: GdoConfigComponent
        , private utils: AppUtilities) {
    }

    @Input() data: any;
    @Input() count: any;
    @Input() number: any;

    sliderRows;

    @Output() notify = new EventEmitter<GdoOpener>();

    ngOnInit() {
        console.log(this.data);
        if (this.data) {
            this.sliderRows = _.times(this.data.length, _.constant(null));
            this.slideCount = this.data ? this.data.length : 0;
        }
        this.renderSlider();
        this.slectedItm = this.data[0][0].item_id;

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
        //this.sliderLeft = -(this.slideIndex * this.slideWidth);

        // reseting the itemPrice
        this.gdoConfig.itemPrice = this.data[0][0].item_price;
        this.gdoConfig.openerTxt = this.data[0][0].item_name;
        this.gdoConfig.quantity = 1;
    }

    slectedItm;

    isSeleted(opener, index, itemIndex) {

        // if (this.utils.utilities.gdoOpenerSelectedItm && opener.item_id == this.utils.utilities.gdoOpenerSelectedItm) {
        //     return true;
        // } else if (this.utils.utilities.gdoOpenerSelectedItm === null && index === 0 && itemIndex === 0) {
        //     return true;
        // }
        if (this.slectedItm && opener.item_id == this.slectedItm) {
            return true;
        } else if (this.slectedItm === null && index === 0 && itemIndex === 0) {
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

        $('._slider').on('touchstart', (e) => {
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
        $('._slider').on('touchend', (e) => {
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
        this.utils.gdoFlowSession.cart[0].opener.opener = obj;
        this.gdoConfig.gdoOpeners.length = 0;
        this.gdoConfig.openerTxt = obj.item_name;
        this.gdoConfig.itemPrice = obj.item_price * this.utils.utilities.gdoOpenerQty;
        this.utils.utilities.item_price = obj.item_price;
        let t = obj.item_thumbnail.split('.')[0];
        this.gdoConfig.gdoBanner = t + '.png';
        this.slectedItm = obj.item_id;
        this.utils.utilities.gdoOpenerSelectedItm = obj.item_id;
        this.notify.emit(obj);
    }

    moveSlider(isNext) {
        if (isNext) {
            this.slideIndex = this.slideIndex + 1;
        } else {
            this.slideIndex = this.slideIndex - 1;
        }
        this.sliderLeft = -(this.slideIndex * this.slideWidth);
    }


}
