/*
 *  Project: MyDoor Visualize Door
 *  Description: Returns a Image OBJ
 *  Author: VIEWSOURCE INC.
 *  License: RESTRICTED 
 */
// the semi-colon before function invocation is a safety net against concatenated 
// scripts and/or other plugins which may not be closed properly.
;




(function ($) {
    // Detect touch support
    $.support.touch = 'ontouchend' in document;
    // Ignore browsers without touch support
    if (!$.support.touch) {
        return;
    }
    var mouseProto = $.ui.mouse.prototype,
        _mouseInit = mouseProto._mouseInit,
        touchHandled;

    function simulateMouseEvent(event, simulatedType) { //use this function to simulate mouse event
        // Ignore multi-touch events
        if (event.originalEvent.touches.length > 1) {
            return;
        }
        event.preventDefault(); //use this to prevent scrolling during ui use

        var touch = event.originalEvent.changedTouches[0],
            simulatedEvent = document.createEvent('MouseEvents');
        // Initialize the simulated mouse event using the touch event's coordinates
        simulatedEvent.initMouseEvent(
            simulatedType,    // type
            true,             // bubbles                    
            true,             // cancelable                 
            window,           // view                       
            1,                // detail                     
            touch.screenX,    // screenX                    
            touch.screenY,    // screenY                    
            touch.clientX,    // clientX                    
            touch.clientY,    // clientY                    
            false,            // ctrlKey                    
            false,            // altKey                     
            false,            // shiftKey                   
            false,            // metaKey                    
            0,                // button                     
            null              // relatedTarget              
        );

        // Dispatch the simulated event to the target element
        event.target.dispatchEvent(simulatedEvent);
    }
    mouseProto._touchStart = function (event) {
        var self = this;
        // Ignore the event if another widget is already being handled
        if (touchHandled || !self._mouseCapture(event.originalEvent.changedTouches[0])) {
            return;
        }
        // Set the flag to prevent other widgets from inheriting the touch event
        touchHandled = true;
        // Track movement to determine if interaction was a click
        self._touchMoved = false;
        // Simulate the mouseover event
        simulateMouseEvent(event, 'mouseover');
        // Simulate the mousemove event
        simulateMouseEvent(event, 'mousemove');
        // Simulate the mousedown event
        simulateMouseEvent(event, 'mousedown');
    };

    mouseProto._touchMove = function (event) {
        // Ignore event if not handled
        if (!touchHandled) {
            return;
        }
        // Interaction was not a click
        this._touchMoved = true;
        // Simulate the mousemove event
        simulateMouseEvent(event, 'mousemove');
    };
    mouseProto._touchEnd = function (event) {
        // Ignore event if not handled
        if (!touchHandled) {
            return;
        }
        // Simulate the mouseup event
        simulateMouseEvent(event, 'mouseup');
        // Simulate the mouseout event
        simulateMouseEvent(event, 'mouseout');
        // If the touch interaction did not move, it should trigger a click
        if (!this._touchMoved) {
            // Simulate the click event
            simulateMouseEvent(event, 'click');
        }
        // Unset the flag to allow other widgets to inherit the touch event
        touchHandled = false;
    };
    mouseProto._mouseInit = function () {
        var self = this;
        // Delegate the touch handlers to the widget's element
        self.element
            .on('touchstart', $.proxy(self, '_touchStart'))
            .on('touchmove', $.proxy(self, '_touchMove'))
            .on('touchend', $.proxy(self, '_touchEnd'));

        // Call the original $.ui.mouse init method
        _mouseInit.call(self);
    };
})(jQuery);

(function ($, window, undefined) {
    // Create the defaults once
    var pluginName = 'DoorVisualization',
        document = window.document,
        defaults = {
            NAME: "name",
            DOORSIZE: 0,
            // GALLERYXML1: "http://mydoordevapi.clopay.com/visplug/homes1.xml",
            // GALLERYXML2: "http://mydoordevapi.clopay.com/visplug/homes2.xml",
            // GALLERYXML3: "http://mydoordevapi.clopay.com/visplug/homes3.xml",
            GALLERYXML1: "xml/homes.xml",
            // GALLERYXML2: "xml/vhome-double.xml",
            // GALLERYXML3: "http://mydoor.viewsource.local/homes3.xml",
        };
    var hasSlab = [11, 16, 30];
    var errorBuild = false;
    var imgFolder = 'homeimages'
    var pointrad = 10;
    var rectFill = 'rgba(137, 210, 255, .85)';
    var rectStroke = 'rgba(10, 106, 204, 1)';
    var pointFill = 'rgba(145, 145, 145, .35)';
    var pointStroke = 'rgba(0, 0, 0, .85)';
    var ipadFingerOffset = 30;
    var imgWidth = 0;
    var imgHeight = 0;

    var fName;
    var drawMe = [true, true, true]
    /////////////////////////////////////////////////////////////
    // PRIVATE Methods (not accessible outside this instance) //
    ///////////////////////////////////////////////////////////
    // The actual plugin constructor
    // Initialization logic 

    function Plugin(element, options) {
        var $this = this;
        $this.element = element;
        $this.options = $.extend({}, defaults, options);
        $this._defaults = defaults;
        $this._name = pluginName;
        $this._galleryXML = "";
        $this._selectedXML = "";
        // Drawing Specific
        $this.canvas = null;
        $this.width = null;
        $this.height = null;
        $this.ctx = null;
        $this.element.empty();
        var html = document.body.parentNode;
        this.htmlTop = html.offsetTop;
        this.htmlLeft = html.offsetLeft;
        // **** Keep track of state! ****
        this.valid = true; // when set to false, the canvas will redraw everything
        this.shapes = []; // the collection of things to be drawn
        this.dragging = false; // Keep track of when we are dragging
        this.draggingPoint = false; // Keep track of when we are dragging
        // the current selected object. In the future we could turn this into an array for multiple selection
        this.selection = null;
        this.dragoffx = 0; // See mousedown and mousemove events for explanation
        this.dragoffy = 0;
        // **** Then events! ****
        var myState = $this;
        // **** Options! ****
        this.selectionColor = '#CC0000';
        this.selectionWidth = 2;
        this.interval = 30;
        // Build Elements
        $(".ui-dialog-title").text('Apply Home Image')

        logprint("Building Home Gallery", $this);




        if (lng == 'en' || lng == 'ca')
            $('<a id="close" title="Close" class="close" style="margin-top: 10px;">Close [X]</a><br><br>').appendTo($this.element)
        if (lng == 'fr')
            $('<a id="close" title="Close" class="close" style="margin-top: 10px;">Fermer [X]</a><br><br>').appendTo($this.element)


        $("<div id='gPlugPage1' />").appendTo($this.element)
        $("<div id='gPlugPage2' />").appendTo($this.element)
        $("<div id='hPlugULoad' />").appendTo($('#gPlugPage1'))
        $("<div id='hPlugGall' />").appendTo($('#gPlugPage1'))
        $("<div id='hPlugDraw' />").appendTo($('#gPlugPage2'))
        $("<div id='hPlugDrawTools' />").appendTo($('#hPlugDraw'))
        $('#gPlugPage2').hide();
        $this.loadGallery();
        $this.loadUpload();
    };
    //base functions

    function Shape(pts, fill) {
        this.points = pts || [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
    }
    // Draws this shape to a given context
    Shape.prototype.draw = function (ctx, nD) {
        ctx.fillStyle = rectFill;
        var len = this.points.length;
        for (i = 0; i < len; i++) {
            var pts = this.points[i];
            switch (i) {
                case 0:
                    {
                        ctx.beginPath();
                        ctx.moveTo(pts[0], pts[1]);
                        if (len == 6) {
                            ctx.lineTo(this.points[4][0], this.points[4][1]);
                            ctx.lineTo(this.points[5][0], this.points[5][1]);
                        }
                        break;
                    }
                case 1:
                    {
                        if (len == 5) {
                            ctx.quadraticCurveTo(this.points[4][0], this.points[4][1], pts[0], pts[1]);
                        } else {
                            ctx.lineTo(pts[0], pts[1]);
                        }
                        break;
                    }
                case 2:
                    {
                        ctx.lineTo(pts[0], pts[1]);
                        break;
                    }
                case 3:
                    {
                        ctx.lineTo(pts[0], pts[1]);
                        ctx.closePath();
                        ctx.fill();
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = rectStroke;
                        ctx.stroke();
                    }
            }
        };

        var ceWi = ((this.points[0][0] + this.points[1][0]) / 2)
        var ceHi = ((this.points[3][1] + this.points[1][1]) / 2)
        ctx.save();
        ctx.fillStyle = "black";
        ctx.font = "bold 36px Arial";
        ctx.fillText(nD, ceWi - 12, ceHi + 15);
        ctx.restore();
    }
    //Create all DOM elements
    Plugin.prototype.loadGallery = function () {
        var $this = this;
        var $el = $('#hPlugGall');
        if (lng == 'en' || lng == 'ca')
            $el.append("<h2 style='text-align:center; width:100%; color: #000'>Or Choose a Sample Below</h2><br/>");
        if (lng == 'fr')
            $el.append("<h2 style='text-align:center; width:100%; color: #000'>Ou choisissez un échantillon ci-dessous</h2><br/>");

        $el.append("<div class='viewHomeWindow'/>");

        var url = $this.options.GALLERYXML1

        if (cObj.TYPE == "RES") {
            if (cObj != "") {
                url = $this.options.GALLERYXML1

                var doorInch = Number(cObj.size.width.wf * 12) + Number(cObj.size.width.wi)


                if (doorInch > 120) {
                    $this.options.DOORSIZE = 2;
                } else {
                    $this.options.DOORSIZE = 1;
                }
            }
        }


        $.ajax({
            type: "GET",
            url: url,
            dataType: "xml",
            error: function (data) {
                logprint("ERROR - Cannot Open Galley XML: " + data.errorThrown, $this);
            },
            success: function (xml) {
                logprint("Gallery XML Loaded", $this);
                $(xml).find('home').each(function (index, value) {
                    var btnImage = $(this).attr('btnimage');
                    var myClass = 'HomeBtn'

                    $(value).find('point').each(function (index, val) {

                        var xy = $(val).attr('XY').split(',')
                        var ul = $(val).attr('UL').split(',')
                        var ur = $(val).attr('UR').split(',')
                        var lr = $(val).attr('LR').split(',')
                        var ll = $(val).attr('LL').split(',')

                        var x = ul[0]
                        var y = ul[1]
                        var w = ur[0] - ul[0]
                        var h = ll[1] - ul[1]
                        var x1 = "0"
                        var y1 = "0"
                        var x2 = ur[0]
                        var y2 = ur[1]
                        var x3 = lr[0]
                        var y3 = lr[1]
                        var x4 = 0
                        var y4 = ll[1]



                        $(val).attr('x', x)
                        $(val).attr('y', y)
                        $(val).attr('w', w)
                        $(val).attr('h', h)
                        $(val).attr('x1', x1)
                        $(val).attr('x2', x2)
                        $(val).attr('x3', x3)
                        $(val).attr('x4', x4)
                        $(val).attr('y1', y1)
                        $(val).attr('y2', y2)
                        $(val).attr('y3', y3)

                        $(val).attr('y4', y4)



                    });
                    //<home homeid="10" btnimage="DIShomeSngl03_btn.png" imagelg="DIShomeSngl03.png"  window="lights" title="Single3">
                    // <dcoords>
                    //   <point width="8" height="7" XY="0,0" UL="171,290" UR="233,285" LR="233,378" LL="171,374"/>
                    // <point width="8" height="7" XY="0,0" UL="259,284" UR="344,279" LR="345,385" LL="261,380"/>
                    // <point width="8" height="7" XY="0,0" UL="377,276" UR="495,270" LR="496,393" LL="378,387"/>
                    //</dcoords>
                    //</home>

                    //Needs to Turn into
                    //<home width="16" height="7" homeid="10" btnimage="DIShomeDbl02_btn.png" imagelg="DIShomeDbl02.png"  window="gray" title="Double2" imgwidth="360" imgheight="253" upload="false" size='2'>
                    //  <dcoords>
                    //  <point x="184" y="132" w="117" h="49" x1="0" y1="0" x2="66" y2="0" x3="67" y3="50" x4="0" y4="50"/>
                    // </dcoords>
                    //</home> 
                    var $data = $(this)

                    //console.log($data)
                    if (Number($(this).attr('size')) == $this.options.DOORSIZE) {
                        $("<div class='" + myClass + "' style='background-image:url(http://mydoortest.clopay.com/content/pimages/homeimages/" + btnImage + ")' ></div>").appendTo($('.viewHomeWindow', $el)).click(function () {
                            $('#SidebarLoader').show();
                            $this._selectedXML = $data
                            $this.homeComplete();
                        }).data('myData', $(this))
                    }
                })

            }
        })
    }
    Plugin.prototype.loadUpload = function () {
        var $this = this;
        var $el = $('#hPlugULoad');
        var uid = Math.floor(Math.random() * 9001)

        if (lng == 'en' || lng == 'ca') {
            $el.append("<h2 style='text-align:center; width:100%; color: #000'>View Door Designs on My Home</h2>");
            $el.append($('<div id="yourhome"><button type="submit" class="btn dynamic_btn orange_btn">Upload Your Own Photo</button><div id="yourloading"  style="display:none"><br/><img src="../content/images/ajax-loader.gif" ></div></div><form action="' + uploadUrl + '?uid=' + uid + '" enctype="multipart/form-data" method="post" style="position: relative; left:-9000px;" id="pictureupload"><input type="file" name="file" id="asd"></form>'))
        } else {
            $el.append("<h2 style='text-align:center; width:100%; color: #000'>Voir les dessins de porte sur ma maison</h2>");
            $el.append($('<div id="yourhome"><button type="submit" class="btn dynamic_btn orange_btn">Téléchargez votre photo</button><div id="yourloading"  style="display:none"><br/><img src="../content/images/ajax-loader.gif" ></div></div><form action="' + uploadUrl + '?uid=' + uid + '" enctype="multipart/form-data" method="post" style="position: relative; left:-9000px;" id="pictureupload"><input type="file" name="file" id="asd"></form>'))
        }


        $('#yourhome').click(function () {
            $('#asd').trigger('click');
        });
        $('#asd').change(function () {


            // var tt = $('#pictureupload')

            // var formData = new FormData($('#pictureupload'));
            var data = new FormData();
            jQuery.each($('#asd')[0].files, function (i, file) {
                data.append('file-' + i, file);
            });
            $.ajax({
                url: uploadUrl + '?uid=' + uid,
                type: 'POST',
                beforeSend: function () { $('#yourloading').show(); $('#hPlugGall').hide() },
                success: function () {

                    fName = $('#asd').val().replace("C:\\fakepath\\", "");
                    fName = uid + fName;
                    $this.loadP2()
                },
                // Form data
                data: data,
                //Options to tell JQuery not to process data or worry about content-type
                cache: false,
                contentType: false,
                processData: false
            });
        });
    }
    Plugin.prototype.progressHandlingFunction = function (e) {
        if (e.lengthComputable) { }
    }
    Plugin.prototype.beforeSendHandler = function (e) {
        console.log('send');
    }
    Plugin.prototype.errorHandler = function (e) {
        console.log(e.message);
        $(':button').attr("disabled", "false");
    }
    Plugin.prototype.loadP2 = function () {
        var $this = this;
        $('#gPlugPage1').hide();
        $('#gPlugPage2').show();
        var $el = $('#hPlugDraw');
        var $t_el = $('#hPlugDrawTools');
        $('#VS-configHome').css('height', '500px');
        $('#VS-configHome').closest('.ui-dialog').css('height', '550px');
        $('#VS-configHome').closest('.ui-dialog').css('width', '790px');
        $('#VS-configHome').closest('.ui-dialog').css('top', '30px');
        $('#VS-configHome').closest('.ui-dialog').css('lefty', '30px');
        $('#VS-configHome').css('overflow-y', 'scroll');
        //  $el.append("<h2 style='text-align:center; width:100%; color: #fff'>Or Choose a Sample Below</h2>");  

        var toolelms = '<div id="drawHomeTools"  style="float: left; width: 120px; margin: 25px 0px; background-color: white; text-align: center; margin-right: 8px; border: #CCC solid 2px;">' + '<img src="../content/images/sqDoor.png" id="sqDoor" border="0" alt="Square" />' + '<br/><img src="../content/images/crDoor.png" id="cvDoor" border="0" alt="Arched" />' + '<br/><img src="../content/images/anDoor.png" id="anDoor" border="0" alt="Angled" />' + '' + '<br/><br/><div id="addDoor"  style= "cursor: pointer; text-align: center;font-size: 11px;font-weight: bold;text-decoration: underline;color: #232323;display: block;">Add a Door</div><br><div  style= "cursor: pointer;text-align: center;font-size: 11px;font-weight: bold;text-decoration: underline;color: #232323;display: block;"id="delDoor">Remove a Door</div><br></div>';
        $el.append(toolelms);

        var imgHold = '<div id="img_divContainer" style="float: left; text-align: center;">' + '<div style="height=400px;"><canvas id="imgDraw" width="600" height="300" style="position: absolute;  z-index: 190;"></canvas>' + '<canvas id="imgUser" width="600" height="300" style="position: absolute; z-index: 100;"></canvas></div>'
        $el.append(imgHold);
        // Load Users image from Upload Function	
        cvs = $('#imgUser');

        // load tools before draw functions

        var dCount = 1;



        /*
                 if(cObj != ""){
                   dCount ++
                   doorsizeelms += '<span style="margin-right:10px; font-weight: bold; font-size: 14px;">Door 1</span>' 
                   doorsizeelms += '<span style="margin-left:5px;">Width</span>' 
                   doorsizeelms += "<span style='margin-left:10px;'>"+cObj.size.width.wf+"'"
                   doorsizeelms += cObj.size.width.wi+'"' + '</span>'
                   doorsizeelms += '<span style="margin-left:5px;">Height</span>' 
                   doorsizeelms += "<span style='margin-left:10px;'>"+cObj.size.height.hf+"'"
                   doorsizeelms += cObj.size.height.hi+'"' + '</span>'
                    //doorsizeelms += "<span style='margin-left:15px;font-size: 11px;' class='noMap'><span class='mapoff'><span style='font-weight: bold;'>x&nbsp;</span> don't map on photo</span><span class='mapon' style='display: none'>map this door on photo</span></span>" 
        
               }
               */
        var doorsizeelms = '<br><br clear="all">Click and drag the area to resize the door on photo<br/><br/>'

        doorsizeelms += '<br/><br/><button type="submit" id="completeDraw" class="btn">Finished</button>'

        $t_el.append(doorsizeelms);

        $('.noMap').click(function (e) {
            var mapon = $('.mapon', this)
            var mapoff = $('.mapoff', this)

            console.log(mapon)

            if (drawMe[$('.noMap').index(this)]) {
                drawMe[$('.noMap').index(this)] = false;
                mapoff.hide();
                mapon.show()
                $this.selection = null
                $this.valid = false;
            } else {
                drawMe[$('.noMap').index(this)] = true;
                mapon.hide();
                mapoff.show();
                $this.selection = null
                $this.valid = false;
            }

        });

        for (var i = 0; i < dCount; i++) {

            $this.addShape(new Shape([
                [80, 20],
                [220, 20],
                [220, 90],
                [80, 90]
            ]));


        }
        $('#delDoor').hide()
        $('#addDoor').click(function () {
            $this.addShape(new Shape([
                [80, 20],
                [220, 20],
                [220, 90],
                [80, 90]
            ]));
            if ($this.shapes.length > 1) {
                $('#delDoor').show()
            }
        });


        $('#delDoor').click(function () {

            console.log($this.shapes)
            $this.shapes.pop();
            $this.selection = null
            $this.valid = false;

            if ($this.shapes.length < 2) {
                $('#delDoor').hide()
            }

        });


        $('#sqDoor').click(function () {

            if ($this.selection.points.length > 4) {
                try {
                    $this.selection.points.splice(5, 1)
                } catch (e) { }

                try {
                    $this.selection.points.splice(4, 1)
                } catch (e) { }
            }
            console.log($this)
            $this.valid = false;
            $this.draw();

        });
        $('#cvDoor').click(function () {

            if ($this.selection.points.length > 4) {
                try {
                    $this.selection.points.splice(5, 1)
                } catch (e) { }

                try {
                    $this.selection.points.splice(4, 1)
                } catch (e) { }
            }

            $this.selection.points.push([($this.selection.points[1][0]) - ($this.selection.points[0][0] / 2), $this.selection.points[0][1] - 10])
            $this.valid = false;
            $this.draw();

        });
        $('#anDoor').click(function () {

            if ($this.selection.points.length > 4) {
                try {
                    $this.selection.points.splice(5, 1)
                } catch (e) { }

                try {
                    $this.selection.points.splice(4, 1)
                } catch (e) { }
                $this.valid = false;
                $this.draw();
            }

            $this.selection.points.push([($this.selection.points[0][0]) + 10, $this.selection.points[0][1] - 10])
            $this.selection.points.push([($this.selection.points[1][0]) - 10, $this.selection.points[1][1] - 10])
            $this.valid = false;
            $this.draw();

        });
        $('#completeDraw').click(function () {
            $this.completeUserDraw();
        });
        this.imgLoader(cvs, fName);
    }
    Plugin.prototype.completeUserDraw = function () {
        var $this = this;
        $this.selection = null;
        $this.valid = false;

        var int = self.setInterval(function () {
            var canvas = document.getElementById('imgDraw');
            var canvas1 = document.getElementById('imgUser');

            var canv = document.createElement('canvas');
            canv.width = 290
            canv.height = 290
            canv.id = 'uploadTemp';
            var canvCtx = canv.getContext("2d");


            canvCtx.save();
            canvCtx.drawImage(canvas1, 0, 0, 290, 290 * canvas1.height / canvas1.width);

            canvCtx.drawImage(canvas, 0, 0, 290, 290 * canvas1.height / canvas1.width);
            canvCtx.restore();
            var tempDoor1 = ''
            //tempDoor1 = canv.toDataURL()              
            try {

            } catch (e) { }



            $('#homeImage').empty();
            $('#homeImage').append(canv);



            var xml = String('<home width="16" bitmap="' + tempDoor1 + '" height="7" imagelg="' + fName + '" imgwidth="' + imgWidth + '" imgheight="' + imgHeight + '" upload="true">');
            xml += '<dcoords>';
            var l = $this.shapes.length;
            for (var i = l - 1; i >= 0; i--) {
                var me = $this.shapes[i].points;
                var topPoint = me[0][1];

                if (me[0][1] > me[1][1])
                    topPoint = me[1][1]

                if (me.length == 5) {
                    topPoint = me[4][1];
                } else if (me.length == 6) {
                    if (me[4][1] > me[5][1]) {
                        topPoint = me[0][1];
                    } else {
                        topPoint = me[4][1];
                    }
                }


                var botPoint = me[2][1];

                if (me[3][1] > me[2][1])
                    botPoint = me[3][1]

                xml += '<point drawMe="' + drawMe[i] + '"  x="' + 0 + '" y="' + 0 + '" w="' + Number(me[1][0] - me[0][0]) + '" h="' + Number(botPoint - topPoint) + '" x1="' + me[0][0] + '" y1="' + me[0][1] + '" x2="' + me[1][0] + '" y2="' + me[1][1] + '" x3="' + me[2][0] + '" y3="' + me[2][1] + '" x4="' + me[3][0] + '" y4="' + me[3][1]
                if (me.length == 5) {

                    xml += '" arcx="' + me[4][0] + '" arcy="' + me[4][1] + '" ang1x="0" ang1y="0" ang2x="0" ang2y="0"'
                } else if (me.length == 6) {

                    xml += '"  arcx="' + 0 + '" arcy="' + 0 + '" ang1x="' + me[4][0] + '" ang1y="' + me[4][1] + '" ang2x="' + me[5][0] + '" ang2y="' + me[5][1] + '"'
                } else {

                    xml += '" arcx="' + 0 + '" arcy="' + 0 + '" ang1x="' + 0 + '" ang1y="' + 0 + '" ang2x="' + 0 + '" ang2y="' + 0 + '"'
                }
                xml += '/>'
            }
            xml += '</dcoords></home>'
            console.log(xml);
            //   uView = 'home';


            $($this.element).trigger('homeComplete', xml);
            window.clearInterval(int)
        }, 1000);


    }
    Plugin.prototype.createDrawObj = function () {
        var $this = this;
        var canvas = $('#imgDraw');
        this.canvas = canvas[0];
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = canvas[0].getContext('2d');
        var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
        if (document.defaultView && document.defaultView.getComputedStyle) {
            this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(this.canvas, null)['paddingLeft'], 10) || 0;
            this.stylePaddingTop = parseInt(document.defaultView.getComputedStyle(this.canvas, null)['paddingTop'], 10) || 0;
            this.styleBorderLeft = parseInt(document.defaultView.getComputedStyle(this.canvas, null)['borderLeftWidth'], 10) || 0;
            this.styleBorderTop = parseInt(document.defaultView.getComputedStyle(this.canvas, null)['borderTopWidth'], 10) || 0;
        }
        this.canvas.addEventListener('selectstart', function (e) {
            e.preventDefault();
            return false;
        }, false);

        canvas.bind('touchstart mousedown', function (e) {
            $this.interactStart(e)
        });
        canvas.bind('touchend mouseup', function (e) {
            $this.interactEnd(e)
        });
        canvas.bind('touchmove', function (e) {
            e.preventDefault();
            $this.interactMove(e, true)
        });
        canvas.bind('mousemove', function (e) {
            $this.interactMove(e, false)
        });
        setInterval(function () {
            $this.draw();
        }, this.interval);
    }
    Plugin.prototype.interactStart = function (e) {
        var $this = this;
        var mouse = $this.getMouse(e);
        var mx = mouse.x;
        var my = mouse.y;
        var shapes = $this.shapes;
        var l = shapes.length;

        for (var i = l - 1; i >= 0; i--) {
            var pts = shapes[i].points;
            var ptslen = shapes[i].points.length;
            for (var ii = ptslen - 1; ii >= 0; ii--) {
                if (mx > (pts[ii][0] - pointrad * 1.5) && mx < (pts[ii][0] + pointrad * 1.5) && my > (pts[ii][1] - pointrad * 1.5) && my < (pts[ii][1] + pointrad * 1.5)) {
                    var mySel = shapes[i];
                    $this.dragoffx = 0;
                    $this.dragoffy = 0;
                    $this.pnts = pts;
                    $this.pointClick = ii;
                    $this.dragging = false;
                    $this.draggingPoint = true;
                    $this.selection = mySel;
                    $this.valid = false;
                    return;
                }
            }
            if (mx > (pts[0][0] + (pointrad * 1)) && mx < (pts[1][0] - (pointrad * 1)) && my > (pts[0][1] + (pointrad * 1)) && my < (pts[2][1] - (pointrad * 1))) {
                var mySel = shapes[i];
                $this.dragoffx = mx - pts[0][0];
                $this.dragoffy = my - pts[0][1];
                $this.pnts = pts;
                $this.dragging = true;
                $this.draggingPoint = false;
                $this.selection = mySel;
                $this.valid = false;
                return;
            }
        }
        if ($this.selection) {
            $this.selection = null;
            $this.valid = false;
        }
    }
    Plugin.prototype.interactMove = function (e, touch) {
        var $this = this;
        //		console.log($this.dragging);
        if ($this.pointClick != 'undefined' && $this.draggingPoint) {
            var mouse = $this.getMouse(e);
            var mx = mouse.x - $this.pnts[$this.pointClick][0];
            var my = mouse.y - $this.pnts[$this.pointClick][1];
            var toc = 0;
            if (touch) toc = ipadFingerOffset
            $this.selection.points[$this.pointClick][0] += mx - toc;
            $this.selection.points[$this.pointClick][1] += my - toc;
            $this.valid = false; // Something's dragging so we must redraw
        } else if ($this.dragging) {
            var mouse = $this.getMouse(e);
            var mx = mouse.x - $this.pnts[0][0];
            var my = mouse.y - $this.pnts[0][1];
            $this.selection.points[0][0] += mx - $this.dragoffx;
            $this.selection.points[0][1] += my - $this.dragoffy;
            $this.selection.points[1][0] += mx - $this.dragoffx;
            $this.selection.points[1][1] += my - $this.dragoffy;
            $this.selection.points[2][0] += mx - $this.dragoffx;
            $this.selection.points[2][1] += my - $this.dragoffy;
            $this.selection.points[3][0] += mx - $this.dragoffx;
            $this.selection.points[3][1] += my - $this.dragoffy;
            try {
                $this.selection.points[4][0] += mx - $this.dragoffx;
                $this.selection.points[4][1] += my - $this.dragoffy;
                $this.selection.points[5][0] += mx - $this.dragoffx;
                $this.selection.points[5][1] += my - $this.dragoffy;
            } catch (err) { }
            $this.valid = false; // Something's dragging so we must redraw
        }
    };
    Plugin.prototype.interactEnd = function (e) {
        var $this = this;
        console.log('end')
        $this.dragging = false;
        $this.draggingPoint = false;
    };
    Plugin.prototype.getMouse = function (e) {
        var element = this.canvas,
            offsetX = 0,
            offsetY = 0,
            mx, my;
        // Compute the total offset
        if (element.offsetParent !== undefined) {
            do {
                offsetX += element.offsetLeft;
                offsetY += element.offsetTop;
            } while ((element = element.offsetParent));
        }

        offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
        offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;
        var endCoords = ''
        try {
            endCoords = e.originalEvent.targetTouches[0];
        } catch (e) { }
        if (endCoords != '') {
            mx = Number(endCoords.pageX) - offsetX;
            my = Number(endCoords.pageY) - offsetY;
        } else {
            mx = Number(e.pageX) - offsetX;
            my = Number(e.pageY) - offsetY;
        }




        console.log(offsetX + ' <-- offset Left')
        console.log(mx)
        console.log(my)


        // We return a simple javascript object (a hash) with x and y defined
        return {
            x: mx,
            y: my
        };
    }
    Plugin.prototype.clear = function () {
        try {
            this.canvas.width = this.canvas.width;
            this.ctx.save();
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.restore();
        } catch (eer) { }
    }
    Plugin.prototype.addShape = function (shape) {
        this.shapes.push(shape);
        this.valid = false;
    }
    Plugin.prototype.draw = function () {
        if (!this.valid) {
            var ctx = this.ctx;
            var shapes = this.shapes;
            this.clear();
            // draw shapes
            var l = shapes.length;
            var nD = 0;
            for (var i = 0; i < l; i++) {


                if (drawMe[i]) {

                    var shape = shapes[i];
                    nD = i + 1
                    myX = shape.points[0][0];
                    myY = shape.points[0][1];
                    if (myX > shape.points[1][0]) myX = shape.points[1][0]
                    if (myX > shape.points[1][1]) myX = shape.points[1][1]
                    if (myX > shape.points[1][1]) myX = shape.points[1][1]
                    if (shape.points[0][0] > shape.points[1][0]) {
                        myW = shape.points[0][0] - shape.points[1][0];
                    } else {
                        myW = shape.points[1][0] - shape.points[0][0];
                    }
                    if (shape.points[0][1] > shape.points[1][1]) {
                        myH = shape.points[0][1] - shape.points[1][1];
                    } else {
                        myH = shape.points[1][1] - shape.points[0][1];
                    }
                    if (myX > this.width || myY > this.height || myW < 0 || myH < 0) continue;
                    shapes[i].draw(ctx, nD);

                }
            }
            // right now this is just a stroke along the edge of the selected Shape
            if (this.selection != null) {
                ctx.strokeStyle = rectFill;
                var mySel = this.selection;
                var len = mySel.points.length;
                for (i = 0; i < len; i++) {
                    ctx.save();
                    ctx.fillStyle = pointFill;
                    ctx.strokeStyle = pointStroke;
                    ctx.lineWidth = 4;
                    ctx.beginPath();
                    ctx.arc(mySel.points[i][0], mySel.points[i][1], pointrad * 2, 0, 2 * Math.PI);
                    ctx.stroke();
                    ctx.fill();

                    ctx.restore();
                }


            }
            this.valid = true;
        }
    }
    Plugin.prototype.homeComplete = function () {
        var $this = this;
        logprint("HomeDone evtTrigger", $this);
        $($this.element).trigger('homeComplete', $this._selectedXML);
    }
    Plugin.prototype.creatIco = function (data) {
        var $data = data;
        $("<div class='" + myClass + "' ><img src='pImages/" + btnImage + "'></div>").appendTo('#DsgnGallery').data('myData', $(this))
    }
    /////////////////////////////////////////////////////
    // canvasLoader: Loads images onto canvas element //
    ///////////////////////////////////////////////////
    Plugin.prototype.imgLoader = function (canvas, dataURL, targX, targY, clr) {
        var ctx = canvas[0].getContext("2d");
        var $this = this
        var imageObj = new Image();
        imageObj.crossOrigin = "anonymous";

        var url = uploadFolder + "/" + dataURL;
        clr = typeof clr !== 'undefined' ? clr : true;
        // clear canvas for redraw
        if (clr) {
            canvas[0].width = canvas[0].width;
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
        }
        // X & Y  default to '0'
        targX = typeof targX !== 'undefined' ? targX : 0;
        targY = typeof targY !== 'undefined' ? targY : 0;
        // Draw Image
        imageObj.onload = function () {




            var canvas = document.getElementById('imgDraw');
            canvas.width = imageObj.width;
            canvas.height = imageObj.height;

            var canvas1 = document.getElementById('imgUser');
            canvas1.width = imageObj.width;
            canvas1.height = imageObj.height;

            $('#hPlugDrawTools').css('top', imageObj.height + 10)

            ctx.drawImage(this, targX, targY);
            imgWidth = imageObj.width;
            imgHeight = imageObj.height;
            $this.valid = false;
            $this.createDrawObj()
        };
        imageObj.onerror = function () {
            errorBuild = true;
            buildError();
        }
        imageObj.src = url;
    }
    // Console loggin for debugging & reporting

    function logprint(str, $obj) {
        if (window.console && window.console.log && $obj.options.consolereporting) window.console.log($obj.options.NAME + '.log || ' + str);
    };
    // End Private Methods
    /////////////////////////////////////////////////////////////
    // PUBLIC Methods (accessible from outside this instance) //
    ///////////////////////////////////////////////////////////
    var methods = {
        update: function (ths, arg) {
            $(ths).trigger('invalidBuild', arg);
        },
        view: function (ths, arg) {
            var view = arg.toLowerCase();
            if (view == "door" || view == "home") {
                $(ths).trigger('viewChange', arg);
            }
        },
        disable: function (ths, arg) {
            $(ths).trigger('enableChange', false);
        },
        enable: function (ths, arg) {
            $(ths).trigger('enableChange', true);
        },
        maxSize: function (ths, arg) {
            $(ths).trigger('changeMxSz', arg);
        },
        consolereporting: function (ths, arg) {
            $(ths).trigger('consoleIO', arg);
        },
    };
    // End Public Methods
    // encapsulate all of methods in the plugin's parent closure above
    $.fn.HomeLoader = function (method) {
        var args = arguments;
        var $this = this;
        if (methods[method]) {
            return methods[method]($this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            if (!$.data($this, 'plugin_' + pluginName)) {
                $.data($this, 'plugin_' + pluginName, new Plugin($this, method));
            }
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.plugin');
        }
    };



    try {
        canvas.addEventListener('touchstart', function (e) {
            var mouse = myState.getMouse(e);
            var mx = mouse.x;
            var my = mouse.y;
            var shapes = myState.shapes;
            var l = shapes.length;
            for (var i = l - 1; i >= 0; i--) {
                var pts = shapes[i].points;

                var ptslen = shapes[i].points.length;

                for (var ii = ptslen - 1; ii >= 0; ii--) {
                    if (mx > (pts[ii][0] - pointrad * 1.5) && mx < (pts[ii][0] + pointrad * 1.5) && my > (pts[ii][1] - pointrad * 1.5) && my < (pts[ii][1] + pointrad * 1.5)) {
                        //POINT Click
                        var mySel = shapes[i];
                        myState.dragoffx = 0;
                        myState.dragoffy = 0;
                        myState.pnts = pts;
                        myState.pointClick = ii;
                        myState.dragging = false;
                        myState.draggingPoint = true;
                        myState.selection = mySel;
                        myState.valid = false;
                        return;
                    }
                }

                if (mx > (pts[0][0] + (pointrad * 1)) && mx < (pts[1][0] - (pointrad * 1)) && my > (pts[0][1] + (pointrad * 1)) && my < (pts[2][1] - (pointrad * 1))) {

                    var mySel = shapes[i];
                    myState.dragoffx = mx - pts[0][0];
                    myState.dragoffy = my - pts[0][1];
                    myState.pnts = pts;
                    myState.dragging = true;
                    myState.draggingPoint = false;
                    myState.selection = mySel;
                    myState.valid = false;
                    return;
                }



            }
            // havent returned means we have failed to select anything.
            // If there was an object selected, we deselect it
            if (myState.selection) {
                myState.selection = null;
                myState.valid = false; // Need to clear the old selection border
            }
        }, true);



        canvas.addEventListener('touchmove', function (e) {
            event.preventDefault();
            if (myState.pointClick != 'undefined' && myState.draggingPoint) {

                var mouse = myState.getMouse(e);
                var mx = mouse.x - myState.pnts[myState.pointClick][0];
                var my = mouse.y - myState.pnts[myState.pointClick][1];

                myState.selection.points[myState.pointClick][0] += mx - ipadFingerOffset;
                myState.selection.points[myState.pointClick][1] += my - ipadFingerOffset;
                myState.valid = false; // Something's dragging so we must redraw

            } else if (myState.dragging) {

                var mouse = myState.getMouse(e);

                var mx = mouse.x - myState.pnts[0][0];
                var my = mouse.y - myState.pnts[0][1];

                myState.selection.points[0][0] += mx - myState.dragoffx;
                myState.selection.points[0][1] += my - myState.dragoffy;

                myState.selection.points[1][0] += mx - myState.dragoffx;
                myState.selection.points[1][1] += my - myState.dragoffy;

                myState.selection.points[2][0] += mx - myState.dragoffx;
                myState.selection.points[2][1] += my - myState.dragoffy;

                myState.selection.points[3][0] += mx - myState.dragoffx;
                myState.selection.points[3][1] += my - myState.dragoffy;


                try {
                    myState.selection.points[4][0] += mx - myState.dragoffx;
                    myState.selection.points[4][1] += my - myState.dragoffy;

                    myState.selection.points[5][0] += mx - myState.dragoffx;
                    myState.selection.points[5][1] += my - myState.dragoffy;
                } catch (err) { }

                myState.valid = false; // Something's dragging so we must redraw
            }
        }, true);

        canvas.addEventListener('touchend', function (e) {
            myState.dragging = false;
            myState.draggingPoint = false;
        }, true);

    } catch (e) { }

}(jQuery, window));