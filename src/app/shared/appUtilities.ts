import {Injectable} from '@angular/core';

@Injectable()
export class AppUtilities {
    utilities = {
        currPage: 1,
        clicked: 1,
        currScreen: 1,
        navCount: 13,
        isService: false,
        wf: null, // width feet
        wi: null, // width inches
        hf: null, // height feet
        hi: null, // height inches
        winCode: "",
        doubleDoorHeight: "",
        doubleDoorWidth: "",
        singleDoorHeight: "",
        singleDoorWidth: "",
        doubleDoor: false,
        singleDoor: false,
        natmarketid: null,
        localmarketid:null,
        productlayout: true,
        lang:null,
        dtype: null,
        flow: 'residentialNavElems',
        residentialNavElems: [
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
            "/config/lock",
            "/config/install",
            "/installQuestion",
            "/installAnswer",
            "/config/diy",
            "/config/opener",
            "/config/openerSelected",
            "/config/additionalOptions",
            "/config/doorConfiguration",
            "/shoppingCart",
            "/thankyou"
        ],
        gdoNavElems: [
            "/banner",
            "/doorSize",
            "/config/opener",
            "/config/doorConfiguration",
            "/shoppingCart"
        ],
        showNav:false,
        productid:null,
        dealerid:null,
        doorsize:null,
        stockgroupid:null,
        laborcode:null
        // flow of GDO: Home, Size , Openers, Order Details, Shopping Cart
    };
    setUtils(curr, clicked){
        this.utilities.currPage = curr;
        this.utilities.clicked = clicked;
    }
}