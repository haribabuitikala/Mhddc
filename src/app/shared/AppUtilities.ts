import {Injectable} from '@angular/core';

@Injectable()
export class AppUtilities {
    utilities = {
        currPage: 1,
        clicked: 1,
        currScreen: 1,
        navElems: [
            "/banner",
            "/zipResults",
            "/category",
            "/doorSize",
            "/collection",
            "/home",
            "/config",
            "/config/construction",
            "/config/color",
            "/config/topSection",
            "/config/glassType",
            "/config/nonClassic",
            "/config/lock",
            "/config/install",
            "/installQuestion",
            "/installAnswer",
            "/config/diy",
            "/config/opener",
            "/config/openerSelected",
            "/config/additionalOptions",
            "/config/doorConfiguration",
            "/thankyou"
        ]
    }
}