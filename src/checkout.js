// JavaScript Document
/// JS CHECK OUT HDDC ///
// New to Eliminate EX4
var _orderHeader = "";
var _orderItems = "";
var _lineItems = "";
var _orderPO = "";
var _newLine = "\n";
var _xmlDoc;
var xmlOutline
var _sendMe = true;
var fiveSixtyAdd = false;
var opnerCatch = false;
var topSectionEx1 = ["302"]; // Top Section Exception for Impact Glass
var topSectionEx2 = ["309", "310", "311", "312", "313", "314"];
var topSectionEx3 = ["305", "306", "307", "308"];
var packDIYModels = ["C124", "C125", "C224", "B178", "B278", "B378"];
var _augustChange = true;
var orderObj;
var $promoIsEnable = false;

function CheckOut(subTotal, taxRate, estimatedTax, grandTotal, _orderObj) {
    orderObj = _orderObj;
    _sendMe = true;
    _orderHeader = "";
    _orderItems = "";
    _lineItems = "";
    _orderPO = "";
    _newLine = "\n";

    try {
        var tempCart = new Array();
        for (var iq = 0; iq < orderObj.cart.length; iq++) {
            if (orderObj.cart[iq].INSTALLTYPE != "") {
                if (orderObj.cart[iq].isPurchase) {
                    tempCart.push(orderObj.cart[iq]);
                }
            }
        }

        orderObj.cart = tempCart;
    }
    catch (e) { }

    try {
        var cart = orderObj.cart
        //// What is the Order
        var firstItem = cart[0]; // First Item Determines OrderType
        var it = firstItem;
        var type = it.TYPE
        var orderType = "unknown";
    } catch (e) { }


    switch (type) {
        case 'RES':
            // ResDoor
            //trace("Door Order");
            try {
                console.log('type:-------------------------' + type);
                if (it.INSTALLTYPE != 'Installed') {
                    orderType = "DIY";
                }
                else {
                    orderType = "INSTALLED";
                }
            }
            catch (e) {
                orderType = "INSTALLED";
            }
            break;
        case 'COM':
            // COMDoor
            try {

                orderType = "DIY";

            }
            catch (e) {
                orderType = "DIY";
            }
            break;
        case 'GDO':
            //OpenerOnly
            orderType = "GDO";
            var cORg = (orderObj.cart[0].opener.opener.brand);
            if (String(cORg).toLowerCase() != 'genie') {
                orderType = "GDO";
                opnerCatch = true;
            }
            else {
                orderType = "GENIE";
                opnerCatch = true;
            }
            break;
    }
    ///////////////// DEFINE XML
    writeHeader(subTotal, taxRate, estimatedTax, grandTotal, orderType, orderObj);
    writeItem(orderType);
    checkXML(xmlOutline);
}

function writeItem(orderType) {
    console.log('writeItem ---------------------------')
    // FOR EACH ITEM IN CART
    // _orderItems = "";

    for (var iq = 0; iq < orderObj.cart.length; iq++) {


        console.log(orderObj.cart[iq].isPurchase)
        if (orderObj.cart[iq].isPurchase) {

            var hwInstallPrice = 0;
            var emptyStr = " ";
            var itemTemp = "";
            var addlTemp = "";
            var usp = 0;
            var cs = orderObj.cart[iq]
            var itemType = cs.TYPE;
            var itemArr = cs;
            var di = 0;

            if (orderType == "INSTALLED") {
                di = 1;
            }
            // Throw in FIR for F&D
            _workingItem = i;
            itemTemp = "\t\t" + "<ITEM>" + _newLine;
            _lineItems = "\t\t\t" + "<LINEITEMS>" + _newLine;
            // alert(itemType)
            switch (itemType) {
                case 'COM':
                    // COMDoor
                    if (!fiveSixtyAdd) {
                        fiveSixtyAdd = true;
                        //addLineItem("FIR560", "FIR560", "1", "0.00"); ;// Satya Commented as per #868538
                    }
                    var pid = cs.product.product.item_id
                    var mp = '999999'
                    var mod = getDesign(cs.construction.construction.ClopayModelNumber, cs.construction.construction)
                    var dsg = String(cs.construction.construction.XMLDSGN).replace('vvv', '').replace('VVV', '')
                    itemTemp += "\t\t\t" + "<ORDERED_ITEM>" + cs.construction.construction.XMLCOI + "</ORDERED_ITEM>" + _newLine;
                    itemTemp += "\t\t\t" + "<ITEM_TYPE>" + "COM" + "</ITEM_TYPE>" + _newLine;
                    if (pid != 116) {
                        itemTemp += "\t\t\t" + "<DESCRIPTION>" + mod + "</DESCRIPTION>" + _newLine;
                    }
                    else {
                        itemTemp += "\t\t\t" + "<DESCRIPTION>" + mod + "</DESCRIPTION>" + _newLine;
                    }
                    itemTemp += "\t\t\t" + "<QUANTITY>" + cs.QTY + "</QUANTITY>" + _newLine;
                    var pp = getDoorPrice(cs, false, false, true)

                    if (di == 1) {
                        usp += Number(pp[0]) //* Number(cs.QTY)
                        var labor = cP(cs, cs.construction.construction, 'Labor');
                        console.log(labor)
                        usp -= Number(labor.install)
                        console.log(labor.install)
                    }
                    else {
                        usp += pp[1] //* Number(cs.QTY)
                    }

                    itemTemp += "\t\t\t" + "<UNIT_SELLING_PRICE>xxxUSPxx</UNIT_SELLING_PRICE>" + _newLine;
                    // Options
                    mod = mod.replace('MODL-', '')
                    itemTemp += "\t\t\t" + "<OPTIONS>" + _newLine;
                    itemTemp += "\t\t\t\t" + "<MODL>MODL-" + mod + "</MODL>" + _newLine;
                    itemTemp += "\t\t\t\t" + "<ATTRIBUTES";
                    itemTemp += " ASSY=" + '"ASSY-CD"';
                    itemTemp += " WD_FT=" + '"' + cs.size.width.wf + '"';
                    itemTemp += " WD_IN=" + '"' + cs.size.width.wi + '"';
                    itemTemp += " HT_FT=" + '"' + cs.size.height.hf + '"';
                    itemTemp += " HT_IN=" + '"' + cs.size.height.hi + '"';
                    itemTemp += " COLR=" + '"' + cs.color.base.colorconfig + '"';
                    itemTemp += " INSL=" + '"' + cs.construction.construction.insulationconfig + '"';

                    if (orderObj.windcode != 'W0') {
                        itemTemp += " WIND=" + '"' + "WIND-" + orderObj.windcode + '"';
                    }
                    if (cs.design.dsgn != '') {
                        itemTemp += " DSGN=" + '"' + getDesign(cs.construction.construction.XMLDSGN, cs.construction.construction) + '"';
                    }

                    try {
                        if (cs.windows.glasstype != '') {
                            if (cs.windows.topsection != '') {
                                itemTemp += " GLAZ=" + '"' + cs.windows.glasstype.Config + '"';

                                if (cs.windows.glasstypeSection != '' && cs.windows.glasstype.Config != "GLAZ-SOL") {
                                    var tempGLoc = cs.windows.glasstypeSection;
                                    tempGLoc = tempGLoc.replace("Sections", "Rows");
                                    itemTemp += " GLOC=" + '"' + "GLOC-" + tempGLoc + '"';
                                }

                                if (cs.windows.selectedTopSection.Config != "FRAM-FV" && cs.windows.glasstype.Config != "GLAZ-SOL") {
                                    var tempRows = Number(cs.windows.selectedGlassSection);
                                    var sectionRows = "";
                                    for (i = 1; i <= tempRows; i++) {
                                        sectionRows = sectionRows + "" + (i + 1);
                                    }
                                    itemTemp += " GSEC=" + '"' + "GSEC-" + sectionRows + '"';
                                }

                                var fram = cs.windows.topsection.Config;
                                var framTest = fram.substr(0, 4);
                                var nRows = Number(cs.design.rows);
                                if (framTest != "GLAZ") {
                                    if (cs.windows.glasstype.Config == "FRAM-FV") {
                                        itemTemp += " GSEC=" + '"' + "GSEC-FV";
                                        itemTemp += " FRAM=" + '"' + fram + '"'; //Need to Check
                                    }
                                    else {
                                        itemTemp += " FRAM=" + '"' + fram + '"';
                                    }


                                }


                            }
                        }
                    }
                    catch (e) { }

                    try {
                        if (cs.hardware.lock != '') {

                            var li = cs.hardware.lock.item_name;
                            var lockstr = li.toLowerCase();
                            if (lockstr != "none") {
                                var lockFIRCharge = (cP(cs, cs.hardware.lock).install - cP(cs, cs.hardware.lock).diy);
                                var lockLessFIR = (cP(cs, cs.hardware.lock).install - lockFIRCharge);
                                var lockINSPrice = cP(cs, cs.hardware.lock, 'Hardware').diy

                                hwInstallPrice += (lockFIRCharge);
                                usp = Number(usp) + Number(lockINSPrice);
                            }
                            else {
                                itemTemp += " LOCK=LOCK-9";
                            }

                        }

                        if (cs.springs != '') {
                            itemTemp += " SPRG=" + '"' + cs.springs.springtype + '"';
                            itemTemp += " TSIZE=" + '"TSIZ-' + cs.springs.tracksize + '"';
                            itemTemp += " TLFT=" + '"' + cs.springs.lifttype + '"';
                            itemTemp += " TMNT=" + '"' + cs.springs.trackmount + '"';

                            if (cs.springs.roofpitch != '') {

                            }

                            if (cs.springs.trackradius != '') {
                                itemTemp += " TRAD=" + '"TRAD-' + cs.springs.trackradius + '"';
                            }

                            var springPrice = cP(cs, cs.springs.spring, 'Hardware');
                        }

                        var doorWidth = Number((cs.size.width.wf) * 12) + Number(cs.size.width.wi);
                        var doorWidthInches = Number((cs.size.width.wf) * 12) + Number(cs.size.width.wi);
                        var doorHeightInches = Number((cs.size.height.hf) * 12) + Number(cs.size.height.hi);

                        if (doorWidthInches <= 120) {
                            if (doorHeightInches <= 96) {
                                addLineItem("FIC730", "Commercial Delivery up to 8' Single", "1", "0");
                            }
                            else if (doorHeightInches <= 144) {
                                // Height under 12'
                                addLineItem("FIC745", "Commercial Delivery up to 12' Single", "1", "0");
                            }
                            else {
                                // Height under 16'
                                addLineItem("FIC765", "Commercial Delivery up to 12' Single", "1", "0");
                            }
                        }
                        else if (doorWidthInches > 120) {
                            if (doorHeightInches <= 96) {
                                addLineItem("FIC735", "Commercial Delivery up to 8' Double", "1", "0");
                            }
                            else if (doorHeightInches <= 144) {
                                // Height under 12'
                                addLineItem("FIC755", "Commercial Delivery up to 12' Double", "1", "0");
                            }
                            else {
                                // Height under 16'
                                addLineItem("FIC775", "Commercial Delivery up to 12' Double", "1", "0");
                            }
                        }
                    }
                    catch (e) { }

                    //Openers
                    try {
                        if (cs.opener.opener != '') {
                            addLineItem(cs.opener.opener.Config, cs.opener.opener.item_name, cs.opener.opener.QTY, cs.opener.opener.item_price, 1);

                            if (cs.opener.items != '') {
                                for (var oq = 0; oq < cs.opener.items.length; oq++) {
                                    if (Number(cs.opener.items[oq].QTY) > 0) {
                                        addLineItem(cs.opener.items[oq].Config, cs.opener.items[oq].item_name, cs.opener.items[oq].QTY, cs.opener.items[oq].item_price, 1);
                                    }
                                }
                            }
                        }
                    }
                    catch (e) { }

                    try {
                        if (orderObj.extendedShaft) {
                            var shaftCost = (((1 + Number(cs.size.width.wf)) * Number(8.21)) + Number(10.92));
                            if (lng == "ca" || lng == "fr")
                                shaftCost = (((1 + Number(cs.size.width.wf)) * Number(11.80)) + Number(11.80));

                            if (addlTemp.length > 0) {
                                addlTemp += ","
                            }
                            addlTemp += "ADDL-XSHFT";
                            shaftCost = shaftCost.toFixed(2);
                            usp = Number(usp) + Number(shaftCost);
                        }

                    }
                    catch (e) { }

                    try {
                        if (orderObj.jambtype == 'Steel') {
                            addLineItem('251', 'Steel Jamb Mounting Plates', 1, '30.00', 'need');
                        }
                    }
                    catch (e) { }

                    try {
                        $.each(cs.additional.items, function (index, value) {
                            if (value.useranswer != '' && value.item_id == 1) {
                                addLineItem(value.useranswer.heightpartid, 'Weather Seal - ' + value.useranswer.item_name, value.useranswer.heightqty, value.useranswer.heightitem_price);
                                addLineItem(value.useranswer.widthpartid, 'Weather Seal - ' + value.useranswer.item_name, value.useranswer.widthqty, value.useranswer.widthitem_price);
                            }

                            if (value.useranswer != '' && value.item_id == 10) {
                                addLineItem(value.useranswer.config, value.item_name, value.useranswer.QTY, value.useranswer.item_price);
                            }

                            if (value.useranswer != '' && value.item_id == 9) {
                                addLineItem(value.useranswer.config, value.item_name, cs.design.rows, value.useranswer.item_price);
                            }

                            if (value.useranswer != '' && value.item_id == 8) {
                                addLineItem(value.useranswer.fir[0].config, 'Mileage 30+', Number(value.useranswer.qty) - 30, value.useranswer.item_price);
                            }

                        });
                    }
                    catch (e) { }


                    console.log(usp)
                    if (addlTemp.length != '') {
                        var aitm = ' ADDL="' + addlTemp + '"';
                        itemTemp += aitm;
                    }
                    itemTemp += " />" + _newLine;
                    itemTemp += "\t\t\t" + "</OPTIONS>" + _newLine;


                    _lineItems += "\t\t\t" + "</LINEITEMS>";
                    itemTemp += _lineItems + _newLine;
                    itemTemp += "\t\t" + "</ITEM>" + _newLine;
                    //_orderItems += itemTemp;
                    var r = /xxxUSPxx/gi;
                    console.log(usp)
                    console.log(itemTemp);
                    _orderItems += itemTemp.replace(r, Number(usp).toFixed(2));


                    break;
                //End of COmmercialDoor
                case 'RES':
                    // ResDoor
                    if (!fiveSixtyAdd) {
                        fiveSixtyAdd = true;
                        //addLineItem("FIR560", "FIR560", "1", "0.00"); ;// Satya Commented as per #868538
                    }
                    var pid = cs.product.product.item_id
                    var mp = '999999'
                    //Added by shankar below line, change ClopayModelNumber as DisplayModelNumber
                    var mod = getDesign(cs.construction.construction.ClopayModelNumber, cs.construction.construction)
                    var dsg = String(cs.construction.construction.XMLDSGN).replace('vvv', '').replace('VVV', '')
                    // shankar added In below line DisplayModelNumber is added with the replace of XMLCOI
                    itemTemp += "\t\t\t" + "<ORDERED_ITEM>" + cs.construction.construction.XMLCOI + "</ORDERED_ITEM>" + _newLine;
                    itemTemp += "\t\t\t" + "<ITEM_TYPE>" + "RES" + "</ITEM_TYPE>" + _newLine;
                    if (pid != 116) {
                        itemTemp += "\t\t\t" + "<DESCRIPTION>" + mod + "</DESCRIPTION>" + _newLine;
                    }
                    else {
                        itemTemp += "\t\t\t" + "<DESCRIPTION>" + mod + "</DESCRIPTION>" + _newLine;
                    }
                    itemTemp += "\t\t\t" + "<QUANTITY>" + cs.QTY + "</QUANTITY>" + _newLine;
                    var pp = getDoorPrice(cs, false, false, true)

                    if (di == 1) {
                        usp += Number(pp[0]) //* Number(cs.QTY)
                        var labor = cP(cs, cs.construction.construction, 'Labor');
                        console.log(labor)
                        usp -= Number(labor.install)
                        console.log(labor.install)
                    }
                    else {
                        usp += pp[1] //* Number(cs.QTY)
                    }

                    itemTemp += "\t\t\t" + "<UNIT_SELLING_PRICE>xxxUSPxx</UNIT_SELLING_PRICE>" + _newLine;
                    // Options
                    mod = mod.replace('MODL-', '')
                    itemTemp += "\t\t\t" + "<OPTIONS>" + _newLine;
                    itemTemp += "\t\t\t\t" + "<MODL>MODL-" + mod + "</MODL>" + _newLine;
                    itemTemp += "\t\t\t\t" + "<ATTRIBUTES";
                    itemTemp += " ASSY=" + '"ASSY-CD"';
                    itemTemp += " WD_FT=" + '"' + cs.size.width.wf + '"';
                    itemTemp += " WD_IN=" + '"' + cs.size.width.wi + '"';
                    itemTemp += " HT_FT=" + '"' + cs.size.height.hf + '"';
                    itemTemp += " HT_IN=" + '"' + cs.size.height.hi + '"';

                    //Overlay Color
                    itemTemp += " COLR=" + '"' + cs.color.base.colorconfig + '"';
                    if (pid == 11) {
                        var cnf = cs.color.overlay.colorconfig;
                        cnf = cnf.replace('COLR', 'ADDL');
                        cnf += "OVL"
                        if (addlTemp.length > 0) {
                            addlTemp += ","
                        }
                        addlTemp += cnf;
                    }
                    //End of Add per Trackit 566494
                    itemTemp += " INSL=" + '"' + cs.construction.construction.insulationconfig + '"';
                    // Defualts - Spring | Track | Lock | Packaging
                    // First Check For Single or Double Door

                    try {
                        if (cs.hardware.lock.Config == undefined) {
                            cs.hardware.lock.Config = cs.hardware.lock.config

                        }
                        // Below if condition is added by shankar, for lock value in DB
                        if (cs.hardware.lock.Config == "Inside Slide Lock") {
                            cs.hardware.lock.Config = "LOCK-2";
                        }
                        if (cs.hardware.lock.config == 'LOCK2') { cs.hardware.lock.Config = 'LOCK-2' }
                        if (cs.hardware.lock.config == 'LOCK3') { cs.hardware.lock.Config = 'LOCK-3' }

                    }
                    catch (e) { }




                    var doorsz = 1; // Single Door;
                    var doorht = 0; //  under 7'3";
                    var singleMax = 120 // 10' 0"
                    var overSixteen = 192 // 16' 0"
                    var heightMax = 87 // 7' 3"
                    var sprngType = "NON";
                    if (orderObj.windcode != 'W0') { // WINDCODE Single is 9' 10"
                        singleMax = 118;
                    }
                    var doorWidth = Number((cs.size.width.wf) * 12) + Number(cs.size.width.wi);
                    if (Number(doorWidth) > singleMax) // door in inches
                        doorsz = 2; // Double
                    if (Number(doorWidth) > heightMax) // door in inches
                        doorht = 1; // Over 7'3"
                    if (Number(doorWidth) >= 96) // door in inches
                        doorht = 2; // Over8 "
                    if (Number(doorWidth) > overSixteen) // door in inches
                        doorsz = 3; // Double
                    // itemTemp += " TRAD=" + '"' + a[9][0].@Track  + '"'; TRACK RADIUS IS HANDLED IN TEH SUMMARY LOOP
                    var a = cs.product.product.productdefault
                    if (orderType == "INSTALLED" || packDIYModels.indexOf(mod) >= 0) {
                        if (doorsz == 1) {
                            itemTemp += " SPRG=" + '"' + a.SingleSpring + '"';
                            sprngType = a.SingleSpring;
                            var packArray = String(a.SinglePackaging).split(',');
                            itemTemp += " PACK=" + '"' + packArray[0] + '"';
                            itemTemp += " TSIZ=" + '"TSIZ-' + packArray[1] + '"';
                            if (cs.hardware.lock != '') {
                                if (cs.hardware.lock.Config == "LOCK-1" || cs.hardware.lock.Config == "LOCK-3") {
                                    itemTemp += " LOCK=" + '"' + a.SingleLock + '"';
                                }
                            }
                        }
                        else {
                            itemTemp += " SPRG=" + '"' + a.DoubleSpring + '"';
                            sprngType = a.DoubleSpring;
                            var packArray = String(a.DoublePackaging).split(',');
                            itemTemp += " PACK=" + '"' + packArray[0] + '"';
                            itemTemp += " TSIZ=" + '"TSIZ-' + packArray[1] + '"';
                            if (cs.hardware.lock != '') {
                                if (cs.hardware.lock.Config == "LOCK-1" || cs.hardware.lock.Config == "LOCK-3") {
                                    itemTemp += " LOCK=" + '"' + a.DoubleLock + '"';
                                }
                            }
                        }
                    }
                    else {
                        if (doorsz == 1) {
                            itemTemp += " SPRG=" + '"' + a.DIYSingleSpring + '"';
                            sprngType = a.DIYSingleSpring;
                            var packArray = String(a.DIYSinglePackaging).split(',');
                            if (doorht == 0) {
                                itemTemp += " TSIZ=" + '"TSIZ-' + packArray[1] + '"';
                                itemTemp += " PACK=" + '"' + packArray[0] + '"';
                            }
                            else {
                                var packArray2 = String(a.DIYSinglePackaging).split(',');
                                itemTemp += " PACK=" + '"' + packArray2[0] + '"';
                                itemTemp += " TSIZ=" + '"TSIZ-' + packArray2[1] + '"';
                            }
                            if (cs.hardware.lock != '') {
                                if (cs.hardware.lock.Config == "LOCK-1" || cs.hardware.lock.Config == "LOCK-3") {
                                    itemTemp += " LOCK=" + '"' + a.DIYSingleLock + '"';
                                }
                            }
                        }
                        else if (doorht == 1) {
                            trace("Defualts - INSTALLDIY:::2:");
                            itemTemp += " SPRG=" + '"' + a.DIYDoubleSpring + '"';
                            sprngType = a.DIYDoubleSpring;
                            var packArray = [];
                            if (doorsz != 3) {
                                packArray = String(a.DIYDoublePackaging).split(',');
                            }
                            else {
                                packArray = String(a.DoublePackaging).split(',');
                            }
                        }
                        else {
                            var packArray = new Array;
                            if (doorsz != 3) {
                                packArray = String(a.DIYDoublePackaging).split(',');
                            }
                            else {
                                packArray = String(a.DoublePackaging).split(',');
                            }
                            if (doorht == 2) {
                                itemTemp += " SPRG=" + '"' + a.DIYDoubleSpring + '"';
                                sprngType = a.DIYDoubleSpring;
                                //itemTemp += " SPRG=" + '"SPRG-G"';
                                //sprngType = 'SPRG-G';
                            }
                            if (doorht == 0) {
                                itemTemp += " SPRG=" + '"' + a.DIYDoubleSpring + '"';
                                sprngType = a.DIYDoubleSpring;
                                itemTemp += " PACK=" + '"' + packArray[0] + '"';
                                itemTemp += " TSIZ=" + '"TSIZ-' + packArray[1] + '"';
                            }
                            else {
                                var packArray2 = String(a.DIYDoublePackaging).split(',');
                                itemTemp += " PACK=" + '"' + packArray2[0] + '"';
                                itemTemp += " TSIZ=" + '"TSIZ-' + packArray2[1] + '"';
                            }
                            if (cs.hardware.lock != '') {
                                try {
                                    if (cs.hardware.lock.Config == "LOCK-1" || cs.hardware.lock.Config == "LOCK-3") {
                                        itemTemp += " LOCK=" + '"' + a.DIYDoubleLock + '"';
                                    }
                                } catch (e) { }
                            }
                        }
                        if (pid == 9) if (addlTemp.length > 0) {
                            addlTemp += ","
                        }
                        if (cs.construction.groove.centergrooveconfig != 'CNONE') {
                            // Below line commented by shankar for ADDL value is coming undefined in DATABASE, fot that line commented.
                            //addlTemp += cs.construction.groove.centergrooveconfig;
                        }
                    }
                    try {
                        if (pid == 16) {
                            itemTemp += " FRAM=" + '"' + "FRAM-FVALL" + '"';
                        }
                    }
                    catch (e) { }
                    if (cs.windows.glasstype != '') {
                        if (cs.windows.topsection != '') {
                            var fram = cs.windows.topsection.Config;
                            var framTest = fram.substr(0, 4);
                            if (framTest != "GLAZ") {
                                if (cs.windows.glasstype.Config == "GLAZ-IR8L") {
                                    if (topSectionEx1.indexOf(cs.windows.glasstype.item_id) > -1) {
                                        itemTemp += " FRAM=" + '"' + "FRAM-F9RO" + '"';
                                    }
                                    else if (topSectionEx2.indexOf(String(cs.windows.topsection.item_id)) > -1) {
                                        itemTemp += " FRAM=" + '"' + "FRAM-OS501" + '"';
                                    }
                                    else if (topSectionEx3.indexOf(String(cs.windows.topsection.item_id)) > -1) {
                                        itemTemp += " FRAM=" + '"' + "FRAM-OCAT" + '"';
                                    }
                                    else {
                                        itemTemp += " FRAM=" + '"' + fram + '"';
                                    }
                                }
                                else {
                                    itemTemp += " FRAM=" + '"' + fram + '"';
                                }
                            }
                            itemTemp += " GLAZ=" + '"' + cs.windows.glasstype.Config + '"';
                            if (cs.windows.placement != '' && cs.windows.glasstype.Config != "GLAZ-SOL") {
                                itemTemp += " GSEC=" + '"' + "GSEC-" + cs.windows.placement.Config + '"';
                            }
                        }
                    }
                    if (orderObj.windcode != 'W0') {
                        itemTemp += " WIND=" + '"' + "WIND-" + orderObj.windcode + '"';
                    }
                    if (cs.design.dsgn != '') {
                        if (pid != 30 && pid != 16) {
                            itemTemp += " DSGN=" + '"' + getDesign(cs.construction.construction.XMLDSGN, cs.construction.construction) + '"';
                        }
                        else if (pid == 16) {
                            itemTemp += " DSGN=" + '"' + cs.construction.construction.XMLDSGN + '"';
                        }
                        else {
                            itemTemp += " DSGN=" + '"' + cs.construction.cladding.CladdingOverlayconfig + '"';
                        }
                    }
                    if (cs.hardware.lock != '') {
                        try {
                            var li = cs.hardware.lock.item_name;
                            var lockstr = li.toLowerCase();
                            if (lockstr != "none") {
                                var lockFIRCharge = (cP(cs, cs.hardware.lock).install - cP(cs, cs.hardware.lock).diy);
                                var lockLessFIR = (cP(cs, cs.hardware.lock).install - lockFIRCharge);
                                var lockINSPrice = cP(cs, cs.hardware.lock, 'Hardware').diy

                                hwInstallPrice += (lockFIRCharge);
                                usp = Number(usp) + Number(lockINSPrice);

                                if (orderObj.windcode != 'W0' && cs.hardware.lock.Config == "LOCK-2") {
                                    itemTemp += " LOCK=" + '"' + cs.hardware.lock.Config + 'A"';
                                }
                                else if (cs.hardware.lock.Config != "LOCK-1" && cs.hardware.lock.Config != "LOCK-3") {
                                    //lock 1 & 3 are handled with Defaults
                                    itemTemp += " LOCK=" + '"' + cs.hardware.lock.Config + '"';
                                }
                            }
                            else {
                                itemTemp += " LOCK=" + '"' + cs.hardware.lock.Config + '"';
                            }
                        } catch (e) { }
                    }
                    try { }
                    catch (e) { }
                    //RESERVE VINYL
                    try {
                        if (pid == 9) {
                            var vs = cs.construction.vinyl;
                            if (vs.heightpartid != "") {
                                addLineItem(vs.heightpartid, "Vinyl  seal - " + vs.item_name, vs.heightqty, "0");
                                addLineItem(vs.widthpartid, "Vinyl  seal - " + vs.item_name, vs.widthqty, "0");
                            }
                        }
                    }
                    catch (e) { }
                    //HARDWARE
                    //SPRING EXCEPTION FOR RES
                    var marketArray = ["10", "15", "20", "34", "39", "43", "65", "66", "68", "86", "93", "111", "112", "116", "177", "191", "260", "268", "272", "340", "357", "364", "375", "376", "403", "479"];
                    var mrkGO = false;
                    var proArray = ["12", "13", "14", "24", "27"];
                    var proGO = false;
                    for (var mrk1 = 0; mrk1 < marketArray.length; mrk1++) {
                        if (marketArray[mrk1] == orderObj.store.marketid) {
                            mrkGO = true;
                            break;
                        }
                    }
                    if (mrkGO) {
                        for (var pro1 = 0; pro1 < proArray.length; pro1++) {
                            if (proArray[pro1] == pid) {
                                proGO = true;
                                break;
                            }
                        }
                    }
                    if (proGO && mrkGO) {
                        var doorWidth = Number((cs.size.width.wf) * 12) + Number(cs.size.width.wi);
                        if (doorWidth < 121) {
                            //itemTemp += " SPRG=" + '"' + "SPRG-E" + '"';

                        }
                    }
                    //HANDLE
                    try {
                        if (cs.hardware.handle != '') {
                            var hai = cs.hardware.handle.item_name;
                            var handlestr = hai.toLowerCase();
                            if (handlestr != "none" && cs.hardware.handle.numofKits != "0") {
                                var HandleQuant = Number(cs.hardware.handle.numofKits) * cs.QTY;
                                var doorWidth = Number((cs.size.width.wf) * 12) + Number(cs.size.width.wi);
                                var tenFoot = false;
                                if (doorWidth > 120) {
                                    tenFoot = true;
                                }
                                switch (String(cs.hardware.handle.Config).toUpperCase()) {
                                    case "LOCK-L":
                                        {
                                            itemTemp += " LOCK=" + '"LOCK-L"';
                                            if (addlTemp.length > 0) {
                                                addlTemp += ","
                                            }
                                            if (tenFoot) {
                                                if (_augustChange) {
                                                    addlTemp += "ADDL-4ESCU";
                                                }
                                                else {
                                                    addlTemp += "ADDL-2ESCU";
                                                    addLineItem("Escutcheoun Plate", "0125103", "2", "0.00");
                                                }
                                            }
                                            else {
                                                addlTemp += "ADDL-2ESCU";
                                            }

                                            var dumPrice = cP(cs, cs.hardware.handle).install;
                                            if (di != 1) {
                                                dumPrice = cP(cs, cs.hardware.handle).diy;
                                            }
                                            dumPrice = Number(cs.hardware.handle.numofKits) * dumPrice;
                                            usp = Number(usp) + Number(dumPrice);
                                            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! - 2')
                                            console.log(usp)
                                        }
                                        break;
                                    case "LOCK-LDUM":
                                        {
                                            if (addlTemp.length > 0) {
                                                addlTemp += ","
                                            }
                                            addlTemp += "ADDL-L";
                                            if (orderObj.windcode != 'W0') {
                                                itemTemp += " LOCK=" + '"LOCK-2A"';
                                            }
                                            else {
                                                itemTemp += " LOCK=" + '"LOCK-2"';
                                            }
                                            if (addlTemp.length > 0) {
                                                addlTemp += ","
                                            }
                                            if (tenFoot) {
                                                if (_augustChange) {
                                                    addlTemp += "ADDL-4ESCU";
                                                }
                                                else {
                                                    addlTemp += "ADDL-2ESCU";
                                                    addLineItem("Escutcheoun Plate", "0125103", "2", "0.00");
                                                }
                                            }
                                            else {
                                                addlTemp += "ADDL-2ESCU";
                                            }
                                            var dumPrice = cP(cs, cs.hardware.handle).install
                                            if (di != 1) {
                                                dumPrice = cP(cs, cs.hardware.handle).diy //cs.hardware.handle.item_price;
                                            }
                                            dumPrice = HandleQuant * dumPrice;
                                            usp = Number(usp) + Number(dumPrice);
                                            console.log(dumPrice)
                                            console.log(usp)
                                        }
                                        break;
                                    default:
                                        {
                                            //Gallery Decorative Hardware Change - Start
                                            var pid = cs.product.product.item_id;
                                            var widthFt = Number(cs.size.width.wf) * 12;
                                            var widthIn = Number(cs.size.width.wi);
                                            var uWidth = Number(widthFt) + Number(widthIn);
                                            var handleInstallPrice = cP(cs, cs.hardware.handle).install;
                                            var handleDIYPrice = cP(cs, cs.hardware.handle).diy;
                                            if (cs.hardware.handle.item_id == 14) {
                                                if (HandleQuant > 0 && pid == 12 && uWidth >= 178 && uWidth <= 228) {
                                                    HandleQuant = HandleQuant - 1;
                                                }
                                                else if (HandleQuant > 0 && pid == 12 && uWidth < 178) {
                                                    //HandleQuant = 0;
                                                    handleInstallPrice = "0.00";
                                                    handleDIYPrice = "0.00";
                                                }
                                            }

                                            //else {
                                            if (HandleQuant != 0) {
                                                if (di == 1) {
                                                    //var handleINSPrice = cP(cs, cs.hardware.handle).install;
                                                    addLineItem(cs.hardware.handle.Config, pid + "-" + cs.hardware.handle.item_name, HandleQuant, handleInstallPrice);
                                                    hwInstallPrice += 1;
                                                }
                                                else {
                                                    addLineItem(cs.hardware.handle.Config, pid + "-" + cs.hardware.handle.item_name, HandleQuant, handleDIYPrice);
                                                }
                                            }

                                            //}

                                        }
                                }
                            }
                        }
                    }
                    catch (e) { }
                    //STEP PLATE
                    try {
                        if (cs.hardware.stepplate != '') {
                            var hai = cs.hardware.stepplate.item_name;
                            var handlestr = hai.toLowerCase();
                            if (handlestr != "none" && cs.hardware.stepplate.numofKits != "0") {
                                var HandleQuant = Number(cs.hardware.stepplate.numofKits) * cs.QTY;
                                var doorWidth = Number((cs.size.width.wf) * 12) + Number(cs.size.width.wi);
                                var tenFoot = false;
                                if (doorWidth > 120) {
                                    tenFoot = true;
                                }
                                switch (String(cs.hardware.stepplate.Config).toUpperCase()) {
                                    default:
                                        {
                                            var pid = cs.product.product.item_id;
                                            var widthFt = Number(cs.size.width.wf) * 12;
                                            var widthIn = Number(cs.size.width.wi);
                                            var uWidth = Number(widthFt) + Number(widthIn);
                                            var stepPlateInstallPrice = cP(cs, cs.hardware.stepplate).install;
                                            var stepPlateDIYPrice = cP(cs, cs.hardware.stepplate).diy;
                                            if (cs.hardware.stepplate.item_id == 17) {
                                                if (HandleQuant > 0 && pid == 12 && uWidth >= 178 && uWidth <= 238) {
                                                    HandleQuant = HandleQuant - 1;
                                                }
                                                else if (HandleQuant > 0 && pid == 12 && uWidth < 178) {
                                                    //HandleQuant = 0;
                                                    stepPlateInstallPrice = "0.00";
                                                    stepPlateDIYPrice = "0.00";
                                                }
                                            }

                                            //else {
                                            if (HandleQuant != 0) {
                                                if (di == 1) {
                                                    //var handleINSPrice = cP(cs, cs.hardware.stepplate).install
                                                    addLineItem(cs.hardware.stepplate.Config, cs.product.product.item_id + '-' + cs.hardware.stepplate.item_name, HandleQuant, stepPlateInstallPrice);
                                                    hwInstallPrice += 1;
                                                }
                                                else {
                                                    addLineItem(cs.hardware.stepplate.Config, cs.product.product.item_id + '-' + cs.hardware.stepplate.item_name, HandleQuant, stepPlateDIYPrice);
                                                }
                                            }

                                            //}
                                            //Gallery Decorative Hardware Change - End
                                        }
                                }
                            }
                        }
                    }
                    catch (e) { }
                    try {
                        //HINGE
                        if (cs.hardware.hinge != '') {
                            var hai = cs.hardware.hinge.item_name;
                            var handlestr = hai.toLowerCase();
                            if (handlestr != "none" && cs.hardware.hinge.numofKits != "0") {
                                //var HandleQuant = Number(cs.hardware.hinge.numofKits) * cs.QTY * 2;
                                var numofKits = cs.hardware.hinge.numofKits;
                                if (String(numofKits).indexOf('B') > -1) {
                                    numofKits = Number(String(numofKits).substr(0, 1));
                                }
                                var HandleQuant = Number(numofKits) * cs.QTY * 2;
                                var doorWidth = Number((cs.size.width.wf) * 12) + Number(cs.size.width.wi);
                                var tenFoot = false;
                                if (doorWidth > 120) {
                                    tenFoot = true;
                                }
                                switch (String(cs.hardware.hinge.Config).toUpperCase()) {
                                    default:
                                        {
                                            if (di == 1) {
                                                var hingeINSPrice = cP(cs, cs.hardware.hinge).install
                                                addLineItem(cs.hardware.hinge.Config, cs.product.product.item_id + '-' + cs.hardware.hinge.item_name, HandleQuant, Number(hingeINSPrice / 2).toFixed(2));
                                                hwInstallPrice += 1;
                                            }
                                            else {
                                                addLineItem(cs.hardware.hinge.Config, cs.product.product.item_id + '-' + cs.hardware.hinge.item_name, HandleQuant, Number(cP(cs, cs.hardware.hinge).diy / 2).toFixed(2));
                                            }
                                        }
                                }
                            }
                        }
                    }
                    catch (e) { }
                    // FIR
                    if (di == 1) {
                        var fir550 = '<FIR550 clopayconfig="FIR550" />';
                        //WO-689581 - Start - Changed Laborcodeprice to Exlaborcodeprice in below lines
                        var laborPrice = cs.construction.construction.Exlaborcodeprice
                        if (String(cs.construction.construction.EXlaborcode).length > 1) {
                            addLineItem(cs.construction.construction.EXlaborcode, cs.construction.construction.EXlaborcode, cs.QTY, cs.construction.construction.Exlaborcodeprice);
                        }

                        else {
                            var doorWidth = Number((cs.size.width.wf) * 12) + Number(cs.size.width.wi);
                            if (doorWidth <= 120) {

                                if (orderObj.windcode != 'W0') {
                                    addLineItem(cs.product.product.singleinstallcodew, cs.product.product.singleinstallcodew, cs.QTY, cs.construction.construction.laborcodeprice);
                                }


                                else {
                                    //shankar added for labor promo apply
									try{
                                    if ($promoIsEnable == true && lng != 'en') {
                                        addLineItem(cs.product.product.singleinstallcode, cs.product.product.singleinstallcode, cs.QTY, Number(labor.install));
                                    } else {
                                        addLineItem(cs.product.product.singleinstallcode, cs.product.product.singleinstallcode, cs.QTY, cs.construction.construction.laborcodeprice);
                                    }
									}catch(e){}
                                }
                            }
                            else if (doorWidth > 120) {
                                if (orderObj.windcode != 'W0') {
                                    addLineItem(cs.product.product.doubleinstallcodew, cs.product.product.doubleinstallcodew, cs.QTY, cs.construction.construction.laborcodeprice);
                                }
                                else {
                                    //addLineItem(cs.product.product.doubleinstallcode, cs.product.product.doubleinstallcode, cs.QTY, cs.construction.construction.laborcodeprice);
                                    //shankar added for labor promo apply
                                    if ($promoIsEnable == true && lng != 'en') {
                                        addLineItem(cs.product.product.doubleinstallcode, cs.product.product.doubleinstallcode, cs.QTY, Number(labor.install));
                                    } else {
                                        addLineItem(cs.product.product.doubleinstallcode, cs.product.product.doubleinstallcode, cs.QTY, cs.construction.construction.laborcodeprice);
                                    }
                                }
                            }
                        }
                        if (hwInstallPrice > 0) {
                            //var hwprice:Number = hwInstallPrice,fir550, "hardware", 1);
                            //addLineItem("FIR550","FIR550","1",hwprice.toString());
                            addLineItem("FIR550", "FIR550", "1", "0.00");
                        }
                    }
                    else {
                        // shankar added for FIR codes reference as 1099298
                        var doorWidth = Number((cs.size.width.wf) * 12) + Number(cs.size.width.wi);
                        var doorHeight = Number((cs.size.height.hf) * 12) + Number(cs.size.height.hi);
                        if (doorWidth <= 120) {
                            if (doorHeight < 99) {
                                addLineItem("FIR800", "SINGLE CAR DOOR DELIVERY CHARGE", "1", "0");
                            } else {
                                // Extended Height over 8' 3"
                                addLineItem("FIR920", "SINGLE CAR DOOR DELIVERY CHARGE", "1", "0");
                            }
                        }
                        else if (doorWidth > 120) {
                            if (doorHeight < 99) {
                                addLineItem("FIR670", "DOUBLE CAR DOOR DELIVERY CHARGE", "1", "0");
                            } else {
                                // Extended Height over 8' 3"
                                addLineItem("FIR930", "DOUBLE CAR DOOR DELIVERY CHARGE", "1", "0");
                            }
                        }
                    }

                    //OPENER
                    if (di == 1) {
                        if (cs.opener.opener != '') {
                            addLineItem(cs.opener.opener.Config, cs.opener.opener.item_name, cs.opener.QTY, cs.opener.opener.item_price, 1);
                            if (cs.opener.opener.Config != "FIR270") {
                                addLineItem("FIR500", "GDO INSTALLATION - WITH DOOR AND OPENER PURCHASE", cs.opener.QTY, "0", 1);
                            }
                            if (cs.opener.opener.railextenderconfig != "") {
                                addLineItem(cs.opener.opener.railextenderconfig, cs.opener.opener.railextendertext, cs.QTY, cs.opener.opener.railextenderprice);
                            }
                            //  addLineItem("FIR500", "GDO INSTALLATION - WITH DOOR AND OPENER PURCHASE", cs.opener.QTY, "0");
                            for (var i = 0; i < cs.opener.items.length; i++) {
                                var it = cs.opener.items[i];
                                if (it.QTY > 0) {
                                    addLineItem(it.Config, it.item_name, it.QTY, it.item_price, 1);
                                }
                            }
                        }
                    }

                    console.log(usp)
                    try {
                        //SUMMARY
                        $.each(cs.additional.items, function (index, value) {
                            switch (value.item_id) {
                                case 1:
                                    {
                                        if (value.useranswer != '' && value.useranswer.config != '0') {
                                            var vs = value.useranswer;
                                            if (vs.heightpartid != "" && vs.item_price != 0) {
                                                addLineItem(vs.heightpartid, "Weather seal - " + vs.item_name, Number(vs.heightqty) * cs.QTY, vs.heightitem_price);
                                                addLineItem(vs.widthpartid, "Weather seal - " + vs.item_name, Number(vs.widthqty) * cs.QTY, vs.widthitem_price);
                                            } else {
                                                addLineItem(vs.heightpartid, "Weather seal - " + vs.item_name, Number(vs.heightqty) * cs.QTY, '0');
                                                addLineItem(vs.widthpartid, "Weather seal - " + vs.item_name, Number(vs.widthqty) * cs.QTY, '0');

                                            }
                                        }
                                        break
                                    }
                                case 2:
                                    {
                                        if (value.useranswer != '') {
                                            if (Number(value.useranswer.config) != 0) {

                                                var orbPrice = 0;
                                                for (var orbCount = 0; orbCount < value.useranswer.orbData.length; orbCount++) {
                                                    var orbQuantity = Number(value.useranswer.orbData[orbCount].quantity);
                                                    orbPrice += (Number(value.useranswer.orbData[orbCount].item_price) * Number(orbQuantity));
                                                    addLineItem(value.useranswer.orbData[orbCount].clopayHardwareId, value.useranswer.orbData[orbCount].item_name, orbQuantity * cs.QTY, value.useranswer.orbData[orbCount].item_price, 1);
                                                }

                                                //if (value.useranswer.QTY == undefined) {
                                                //    value.useranswer.QTY = 1;
                                                //}
                                                //addLineItem(value.useranswer.config, value.item_name, value.useranswer.QTY * cs.QTY, value.useranswer.item_price, 1);
                                            }
                                        }
                                        break;
                                    }
                                case 5:
                                    {
                                        if (value.useranswer != '' && value.qty > 30) {
                                            $.each(value.useranswer.fir, function (index, value) {
                                                if (value.QTY == undefined) {
                                                    value.QTY = 1;
                                                }
                                                var tn = value.item_name
                                                tn = tn.replace('1TO', '0-')
                                                tn = tn.replace('31PLUS', '30+')
                                                tn = tn.replace('51PLUS', '50+')
                                                addLineItem(value.config, 'Mileage ' + tn, value.QTY, value.item_price, 1);
                                            });
                                        }
                                        break;
                                    }
                                case 7:
                                    {
                                        if (value.useranswer != '') {
                                            if (value.useranswer.config != '0') {
                                                if (value.useranswer.QTY == undefined) {
                                                    value.useranswer.QTY = 1;
                                                }
                                                //shankar added for apply promo to medallion hardware
                                                if ($promoIsEnable == true && lng != 'en') {
                                                    var MH = Number(Number(value.useranswer.item_price * 0.85).toFixed(2));
                                                    usp += MH;
                                                } else {
                                                    usp += value.useranswer.item_price;
                                                }
                                                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! - 4')
                                                console.log(usp)
                                                if (addlTemp.length > 0) {
                                                    addlTemp += ","
                                                }
                                                addlTemp += value.useranswer.config;
                                            }
                                        }
                                        break;
                                    }
                                case 4:
                                    {
                                        // Low Headroom Conversion Kit
                                        //if (value.useranswer != '') {
                                        if (Number(value.useranswer.config) != 0 && value.useranswer.config != undefined) {
                                            // shankar added config value is coming undefined, when we are not selecting any one of the options in quesion no.4,i.e i added value.useranswer.config != undefined in condition.
                                            var cl = value.useranswer
                                            var s5 = value.useranswer.item_price
                                            if (sprngType == "SPRG-E" || sprngType == "SPRG-EC" || sprngType == "SPRG-ECE" || sprngType == "SPRG-ES") {
                                                itemTemp += " TLFT=" + '"TLFT-LHR"';
                                            }
                                            else {
                                                itemTemp += " TLFT=" + '"TLFT-LHRF"';
                                            }
                                            itemTemp += " TRAD=" + '"' + "TRAD-0" + '"';
                                            console.log(usp)
                                            usp = Number(usp) + Number(value.useranswer.item_price);
                                            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! - 5')
                                            console.log(usp)
                                            if (di == 1) {
                                                addLineItem("FIR290", "FIR290", cs.QTY, "0.00");
                                            }
                                        }
                                        else {
                                            //itemTemp += " TRAD=" + '"' + a[9][0].@Track  + '"';
                                            //added shankar for TRAD value is not coming in DATABASE
                                            itemTemp += " TRAD=" + '"' + cs.product.product.productdefault.TrackRadius + '"';
                                        }
                                        //}
                                    }
                                    break;
                                case 999:
                                    {
                                        if (value.useranswer != '') {
                                            if (Number(value.useranswer.config) != 0) {
                                                if (value.useranswer.QTY == undefined) {
                                                    value.useranswer.QTY = 1;
                                                }
                                                addLineItem(value.useranswer.config, 'Lead Testing', value.useranswer.QTY, value.useranswer.item_price, 1);
                                            }
                                        }
                                        break;
                                    }
                                case 12:
                                    {
                                        if (value.useranswer != '') {
                                            if (Number(value.useranswer.config) != 0) {
                                                if (value.useranswer.QTY == undefined) {
                                                    value.useranswer.QTY = 1;
                                                }
                                                if (orderType == 'INSTALLED') {

                                                    addLineItem(value.useranswer.config, value.item_name, value.useranswer.QTY * cs.QTY, value.useranswer.firPrice, 1);
                                                }
                                                addLineItem(value.useranswer.seals[0].config, value.useranswer.seals[0].item_name, value.useranswer.QTY * cs.QTY, value.useranswer.seals[0].item_price, 1);
                                            }
                                        }
                                        break;
                                    }
                                default:
                                    {
                                        if (value.useranswer != '') {
                                            if (Number(value.useranswer.config) != 0) {
                                                if (value.useranswer.QTY == undefined) {
                                                    value.useranswer.QTY = 1;
                                                }
                                                addLineItem(value.useranswer.config, value.item_name, value.useranswer.QTY * cs.QTY, value.useranswer.item_price, 1);
                                            }
                                        }
                                    }
                            }
                        });
                    }
                    catch (e) { }
                    try {
                        if (orderObj.leadTest) {
                            addLineItem('LEADTEST CONFIG', "Lead Testing", "1", 'LEAD PRICE');
                        }
                    }
                    catch (e) { }

                    try {
                        if (orderObj.cart[iq].stopMold.items.length > 0 && di == 1) {
                            var stopMoldItems = orderObj.cart[iq].stopMold.items;
                            addLineItem(stopMoldItems[0].partId, "Stop Mold-" + stopMoldItems[0].color + "-" + stopMoldItems[0].partId, stopMoldItems[0].qty, 0);
                            addLineItem(stopMoldItems[1].partId, "Stop Mold-" + stopMoldItems[1].color + "-" + stopMoldItems[1].partId, stopMoldItems[1].qty, 0);

                        }
                    }
                    catch (e) { }

                    if (addlTemp.length != '') {
                        var aitm = ' ADDL="' + addlTemp + '"';
                        itemTemp += aitm;
                    }
                    itemTemp += " />" + _newLine;
                    itemTemp += "\t\t\t" + "</OPTIONS>" + _newLine;


                    _lineItems += "\t\t\t" + "</LINEITEMS>";
                    itemTemp += _lineItems + _newLine;
                    itemTemp += "\t\t" + "</ITEM>" + _newLine;
                    //_orderItems += itemTemp;
                    var r = /xxxUSPxx/gi;
                    console.log(usp)
                    console.log(itemTemp);
                    _orderItems += itemTemp.replace(r, Number(usp).toFixed(2));



                    break;
                case 'GENIE': { }
                case 'GDO':
                    //OpenerOnly

                    if (!fiveSixtyAdd) {
                        fiveSixtyAdd = true;
                        //addLineItem("FIR560", "FIR560", "1", "0.00");// Satya Commented as per #868538
                    }


                    itemTemp += "\t\t\t" + "<ORDERED_ITEM>" + cs.opener.opener.Config + "</ORDERED_ITEM>" + _newLine;
                    itemTemp += "\t\t\t" + "<ITEM_TYPE>" + "OPENR" + "</ITEM_TYPE>" + _newLine;
                    itemTemp += "\t\t\t" + "<DESCRIPTION>" + cs.opener.opener.item_name + "</DESCRIPTION>" + _newLine;
                    itemTemp += "\t\t\t" + "<QUANTITY>" + cs.QTY + "</QUANTITY>" + _newLine;
                    itemTemp += "\t\t\t" + "<UNIT_SELLING_PRICE>" + cs.opener.opener.item_price + "</UNIT_SELLING_PRICE>" + _newLine;
                    addLineItem("FIR490", "GDO INSTALLATION - OPENER ONLY INSTALLATION", cs.QTY, "0");
                    if (cs.opener.opener.railextenderconfig != "") {
                        addLineItem(cs.opener.opener.railextenderconfig, cs.opener.opener.railextendertext, cs.QTY, cs.opener.opener.railextenderprice);
                        addLineItem("FIR580", "FIR580", cs.QTY, "0.00");
                    }
                    for (var i = 0; i < cs.opener.items.length; i++) {
                        var it = cs.opener.items[i];
                        if (it.QTY > 0) {
                            //Commented below line for WO# 688398
                            addLineItem(it.Config, it.item_name, Number(it.QTY * cs.QTY), it.item_price, 1);
                            //addLineItem(it.Config, it.item_name, Number(it.QTY), it.item_price, 1);
                        }
                    }
                    $.each(cs.additional.items, function (index, value) {
                        if (value.useranswer != '') {
                            if (Number(value.useranswer.config) != 0) {
                                if (value.useranswer.QTY == undefined) {
                                    value.useranswer.QTY = 1;
                                }

                                if (value.item_id != 56) {
                                    //Commented below line for WO# 688398
                                    //addLineItem(value.useranswer.config, value.item_name, value.useranswer.QTY * cs.QTY, value.useranswer.item_price, 1);
                                    addLineItem(value.useranswer.config, value.item_name, value.useranswer.QTY, value.useranswer.item_price, 1);
                                }
                                else {

                                    //addLineItem(value.useranswer.config, value.item_name, value.useranswer.QTY, value.useranswer.item_price, 1);  -- commented nuphani - 07/19/2013 Trackit # 685250

                                    // Added nuphani - 07/19/2013	 Trackit # 685250
                                    for (var i = 0; i < value.useranswer.fir.length; i++) {
                                        addLineItem(value.useranswer.fir[i].config, value.item_name + " " + value.useranswer.fir[i].item_name, value.useranswer.fir[i].QTY, value.useranswer.fir[i].item_price, 1);
                                    }
                                    // Added nuphani - 07/19/2013	 Trackit # 685250
                                }
                            }
                        }
                        //}
                    });



                    _lineItems += "\t\t\t" + "</LINEITEMS>";
                    itemTemp += _lineItems + _newLine;
                    itemTemp += "\t\t" + "</ITEM>" + _newLine;
                    //_orderItems += itemTemp;
                    var r = /xxxUSPxx/gi;
                    console.log(usp)
                    if ((r.test(itemTemp)) != false) {
                        _orderItems += itemTemp.replace(r, Number(usp).toFixed(2));
                    } else {
                        _orderItems += itemTemp;
                    }

                    break;
            }
        }

        else {
            //itemTemp = itemTemp.replace('undefined', '');
            //itemTemp = itemTemp.replace('ADDL=",', 'ADDL="');
            //  _orderItems += itemTemp;
        }
    }
}

function writeHeader(subTotal, taxRate, estimatedTax, grandTotal, orderType, orderObj) {
    console.log('writeHeader ----------------------------------')
    //var b=VsObj.userInfoArray;
    var city = orderObj.locale.city;
    var county = orderObj.locale.county
    var st = orderObj.locale.state
    var zip = orderObj.locale.zip
    var mid;
    var ustoreTax;
    mid = orderObj.store.marketid;
    if (orderObj.store.storetax == '') {
        ustoreTax = 0;
    }
    else {
        ustoreTax = orderObj.store.storetax;
    }
    //////////////////////////////////////////
    // XML //////////////////////////////////
    //START Order Header
    var assocID = "none";
    try {
        assocID = orderObj.associateId
    }
    catch (e) { }
    var storeNum = "0";
    try {
        storeNum = orderObj.store.storenumber
    }
    catch (e) { }
    if (assocID == undefined) {
        assocID = ''
    }
    _orderHeader = "\t" + "<ORDER_HEADER>" + _newLine;
    _orderHeader += "\t\t" + "<INSTALLED>" + orderType + "</INSTALLED>" + _newLine;
    _orderHeader += "\t\t" + "<SUBTOTAL>" + subTotal + "</SUBTOTAL>" + _newLine;
    _orderHeader += "\t\t" + "<TAXRATE>" + taxRate + "</TAXRATE>" + _newLine;
    _orderHeader += "\t\t" + "<ESTIMATEDTAX>" + estimatedTax + "</ESTIMATEDTAX>" + _newLine;
    _orderHeader += "\t\t" + "<TOTAL>" + grandTotal + "</TOTAL>" + _newLine;
    _orderHeader += "\t\t" + "<MARKETID>" + mid + "</MARKETID>" + _newLine;
    // Order Header - Store Info
    _orderHeader += "\t\t" + "<STORE_DETAILS>" + _newLine;
    _orderHeader += "\t\t\t" + "<STORE_NAME>" + "The Home Depot" + "</STORE_NAME>" + _newLine;
    _orderHeader += "\t\t\t" + "<STORE_NUMBER>" + storeNum + "</STORE_NUMBER>" + _newLine;
    _orderHeader += "\t\t\t" + "<STORE_ASSOC_ID>" + assocID + "</STORE_ASSOC_ID>" + _newLine;

    var joe = 'Joe'

    try {
        if (orderObj.QPB) { joe = 'QPB' }

    } catch (e) { }

    _orderHeader += "\t\t\t" + "<STORE_ASSOC_NAME>" + joe + "</STORE_ASSOC_NAME>" + _newLine;
    _orderHeader += "\t\t\t" + "<STORE_TAX_RATE>" + (ustoreTax * .01) + "</STORE_TAX_RATE>" + _newLine;
    _orderHeader += "\t\t" + "</STORE_DETAILS>" + _newLine;
    // Order Header - Coustomer Details
    _orderHeader += "\t\t" + "<CUSTOMER_DETAILS>" + _newLine;
    _orderHeader += "\t\t\t" + "<CITY>" + city + "</CITY>" + _newLine;
    _orderHeader += "\t\t\t" + "<COUNTY>" + county + "</COUNTY>" + _newLine;
    _orderHeader += "\t\t\t" + "<STATE>" + st + "</STATE>" + _newLine;
    _orderHeader += "\t\t\t" + "<ZIP>" + zip + "</ZIP>" + _newLine;
    _orderHeader += "\t\t\t" + "<COUNTRY>" + "US" + "</COUNTRY>" + _newLine;
    _orderHeader += "\t\t" + "</CUSTOMER_DETAILS>" + _newLine;
    _orderHeader += "\t" + "</ORDER_HEADER>" + _newLine;
    _orderHeader = _orderHeader.replace('undefined', '');
}

function addLineItem(itemID, desc, quanty, price, opener) {
    var quant = 0;
    quant = Number(quanty);
	/*if (isNaN(quanty)) {
		quant = 1
	}*/
    // shankar added below lines are added, wrong quantity FIR codes.
    if (!opnerCatch) {
        quant = Number(cObj.QTY); // * Number(quanty) //VsObj.getNumOfHDDC(_workingItem)
    } else {
        quant = Number(quanty);
    }
    if (opener == 1) {
        quant = Number(quanty);
    }
    if (itemID == "FIR330" || itemID == "FIR340") {
        quant = Number(quanty);
    }
    var p = Number(price);

    var po = p.toFixed(2);
    if (itemID != "0") {
        _lineItems += "\t\t\t\t" + "<LINEITEM>" + _newLine;
        _lineItems += "\t\t\t\t\t" + "<ITEM_ID>" + itemID + "</ITEM_ID>" + _newLine;
        _lineItems += "\t\t\t\t\t" + "<DESCRIPTION>" + desc + "</DESCRIPTION>" + _newLine;
        _lineItems += "\t\t\t\t\t" + "<QUANTITY>" + quant.toString() + "</QUANTITY>" + _newLine;
        _lineItems += "\t\t\t\t\t" + "<UNIT_SELLING_PRICE>" + po.toString() + "</UNIT_SELLING_PRICE>" + _newLine;
        _lineItems += "\t\t\t\t" + "</LINEITEM>" + _newLine;
    }
}

function checkXML(xml) {
    _xmlDoc = xml;
    webTest();
}


function getGLOC(wp, rows) {
    var winLoc = "";
    for (var i = 1; i <= rows; i++) {
        if (i == wp) {
            winLoc += "G";
        }
        else {
            winLoc += "S";
        }
    }

    return winLoc;
}

function webTest() {
    var _date = new Date();
    var month = _date.getUTCMonth() + 1;
    var day = _date.getUTCDate();
    var year = _date.getUTCFullYear();
    if (month < 10) {
        month = "" + _date.getUTCMonth();
    }
    if (day < 10) {
        day = "0" + _date.getUTCDate();
    }

    // added urls 
    var _CheckOutURL = 'https://test-hddcpgate.clopay.com/mCheckOut.aspx';
    var _WSURL = 'https://test-hddccsr.clopay.com/FlashService/FlashService.asmx';

    //ASSEMBLE PO
    _orderPO = "<DOCUMENT>" + _newLine;
    _orderPO += "\t" + "<FAX_HDR_DATE>" + month + "/" + day + "/" + year + "</FAX_HDR_DATE>" + _newLine;
    _orderPO += "\t" + "<DOCUMENT_TYPE>" + "FlashPO" + "</DOCUMENT_TYPE>" + _newLine;
    _orderPO += _orderHeader;
    _orderPO += "\t" + "<ITEMS>" + _newLine;
    _orderPO += _orderItems;
    _orderPO += "\t" + "</ITEMS>" + _newLine;;
    _orderPO += "</DOCUMENT>" + _newLine;
    _orderPO = _orderPO.replace('ADDL="undefined"', '')
    jQuery.support.cors = true;
    var soapEnv = '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://schemas.xmlsoap.org/soap/envelope/"> <soap12:Body> <FlashSendPurchaseOrder xmlns="http://www.Hddcadmin.clopay.com/"> <FlashPOXML>'
    var soapEnv2 = '</FlashPOXML> </FlashSendPurchaseOrder> </soap12:Body> </soap12:Envelope>'
    var soapMessage = '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://schemas.xmlsoap.org/soap/envelope/"> <soap12:Body> <FlashSendPurchaseOrder xmlns="http://www.Hddcadmin.clopay.com/"> <FlashPOXML>' +
      getFixedHTML(_orderPO) + '</FlashPOXML> </FlashSendPurchaseOrder> </soap12:Body> </soap12:Envelope>';
      console.log(_orderPO);
    if (_sendMe) {
        $.ajax({
            type: "POST",
            url: _WSURL,
            dataType: "xml",
            data: soapMessage,
            async: false,
            processData: false,
            contentType: "text/xml; charset=\"utf-8\"",
            complete: function (response, status, xhr) {
                var poIDXML = $.parseXML(response.responseText)
                var poID = $(poIDXML).find('FlashSendPurchaseOrderResult').text()
                if (poID.toLowerCase().indexOf("error") >= 0) {
                    alert('Check Out Error')
                }
                else {
                    $(window).unbind('beforeunload');
					/*if (inStore)
					{
						window.location.href = _eSVSCheckoutURL + '?CheckOutCode=' + poID
						console.log(_orderPO)
					}
					else
					{
					   window.location.href = _CheckOutURL + '?CheckOutCode=' + poID
						console.log(_orderPO)
					}*/
                    window.location.href = _CheckOutURL + '?CheckOutCode=' + poID
                }

            }
        })

    }
}

function getFixedHTML(s) {
    var r = /</gi;
    var a = /&/gi;
    var t = />/gi;
    if ((a.test(s)) != false) {
        s = s.replace(a, "&amp;");
    }
    if ((r.test(s)) != false) {
        s = s.replace(r, "&lt;");
    }
    if ((t.test(s)) != false) {
        s = s.replace(t, "&gt;");
    }
    return s
}

function getDesign(s, a) {
    var r = /YYYY/gi;
    var q = /VVV/gi;
    var t = /ZZZ-/gi;
    var r1 = /MODL-/gi;
    var r2 = /vvv/gi;
    var c = a;
    if ((t.test(s)) != false) {
        s = c.XMLMODL;
        //s += " - ";
        //s += c.XMLDSGN;
    }
    if ((r1.test(s)) != false) {
        s = s.replace(r1, "");
    }
    if ((r2.test(s)) != false) {
        s = s.replace(r2, "");
    }
    return s
}
