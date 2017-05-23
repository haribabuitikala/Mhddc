import { Injectable } from '@angular/core';
import { AppUtilities } from "../shared/appUtilities";

declare var $: any;
declare var _: any;


@Injectable()

export class NavService {

    constructor(private utils: AppUtilities) {
    }
    CP; // cuurent page
    VP; // visited page
    NVP; // non visited page
    current: string = 'current';
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

    gdoFlowSteps = [
        new Step({
            No: 0,
            Name: 'Home',
            active: false,
            visited: false,
            callFn: null
        }),
        new Step({
            No: 1,
            Name: 'Size',
            active: false,
            visited: false,
            url: '',
            callFn: null
        }),
        new Step({
            No: 2,
            Name: 'Step 2',
            active: false,
            visited: false,
            url: '',
            callFn: null
        }),
        new Step({
            No: 3,
            Name: 'Step 3',
            active: false,
            visited: false,
            url: '',
            callFn: null
        }),
        new Step({
            No: 4,
            Name: 'Step 4',
            active: false,
            visited: false,
            url: '',
            callFn: null
        }),
        new Step({
            No: 5,
            Name: 'Step 5',
            active: false,
            visited: false,
            url: '',
            callFn: null
        })
    ];
    subscribeChange() {

    }
}


export class Step {
    No: Number = 0;
    Name: String = '';
    active: boolean = false;
    visited: boolean = false;
    url: string = '';
    callFn: any = null;
    disabled: boolean = false;

    constructor(data) {
        this.No = data.No || this.No;
        this.Name = data.Name || this.Name;
        this.active = data.active || this.active;
        this.visited = data.visited || this.visited;
        this.url = data.url || this.url;
        this.callFn = data.callFn || this.callFn;
        this.disabled = data.disabled || this.disabled;
    }
}