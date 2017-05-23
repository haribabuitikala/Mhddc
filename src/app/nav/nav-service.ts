import {Injectable} from '@angular/core';
import {AppUtilities} from "../shared/appUtilities";

declare var $:any;
declare var _:any;


@Injectable()

export class NavService {

    constructor(private utils:AppUtilities) {
    }
    CP; // cuurent page
    VP; // visited page
    NVP; // non visited page
    current:string = 'current';
    menuCount = this.utils.utilities.navCount;
    currentActiveEl;

    activateIcon() {
        // $("li").removeClass('current');
        // let li = $("li:eq(" + this.utils.utilities.currPage + ")");
        // let src = li.find('img').attr('src');

        // let clicked = this.utils.utilities.clicked;

        // // case 0 = prev
        // // case 1 = next

        // switch (clicked) {
        //     case 0:
        //         this.CP = _.replace(src, "VP", "CP");
        //         this.VP = _.replace(li.next().find('img').attr('src'), "CP", "NVP");
        //         li.next().find('img').attr('src', this.VP);
        //         break;
        //     case 1:
        //         this.CP = _.replace(src, "NVP", "CP");
        //         this.VP = _.replace(li.prev().find('img').attr('src'), "CP", "VP");
        //         li.prev().addClass('visited').find('img').attr('src', this.VP);
        //         break;
        //     case null:
        //         this.CP = _.replace(src, "NVP", "CP");
        //         this.VP = _.replace(li.prevAll().removeClass('current').find('img').attr('src',"NVP","VP"));
        //         li.attr('src', this.CP);
        // }
        // li.removeClass('visited').addClass('current').find('img').attr('src', this.CP);
    }

    
    subscribeChange(){

    }
}