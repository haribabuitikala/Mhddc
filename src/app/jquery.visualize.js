/*
 *  Project: MyDoor Visualize Door
 *  Description: Returns a Image OBJ
 *  Author: VIEWSOURCE INC.
 *  License: RESTRICTED
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
var exprtElm
var newBuild = true;
var cloneElm
var imageObj;
var glassSections = 0;

(function ($, window, undefined) {
	// Create the defaults once
	var pluginName = 'DoorVisualization',
		document = window.document,
		defaults = {
			NAME: "name",
			BUILD: null,
			HOMEDATA: null,
			MAXHEIGHT: 440,
			MAXWIDTH: 440,
			VIEW: 'door',
			cancelXhr: true,
			ENABLE: true,
			consolereporting: false
		};
	var hasSlab = [11, 16, 9, 30];
	var maxConnections = 6;
	var errorBuild = false;

	/////////////////////////////////////////////////////////////
	// PRIVATE Methods (not accessible outside this instance) //
	///////////////////////////////////////////////////////////
	// The actual plugin constructor
	// Initialization logic

	function Plugin(element, options) {
		var $this = this;
		$this.element = element;
		//parentElement = this.element
		$this.options = $.extend({}, defaults, options);
		$this._defaults = defaults;
		$this._name = pluginName;
		$this._nogo = 0;
		$this.apiCalls = [];
		$this.timers = [];
		$this.buildObj = {
			EnvTree: [0, 'G', 0],
			EnvWindows: 'gray',
			EnvShadow: [0, 0, 0, 0],
			MYTARG: 0,
			bitData: [0, 1],
			productid: 0,
			designimage: "",
			designmask: "",
			doorcolumns: 0,
			doorrows: 0,
			constructionmodel: "",
			constructionswaprule: "",
			constructioncolor: "",
			claddingswap: "",
			centergrooves: 0,
			colorcode: "",
			glaz: 0,
			colorswaprule: "",
			overlaycolor: "",
			topsectionimage: "",
			topsectionmask: "",
			topsectionrow: 0,
			hardwarehinge: "",
			handleplacement: "",
			hardwarehandle: "",
			hingeplacement: "",
			hardwarestepplate: "",
			stepplateplacement: ""
		};
		// SET INITAIL VISUAL LAYERS
		$this._dHome = ["", ""] //Home [elem, data] !NOT PART OF visualLayers!
		$this._dSlab = ["", ""] //SLAB[elem, data]
		$this._dSlabClr = ["", ""] //SLAB COLOR[elem, data]
		$this._dOverlay = ["", ""] //OVERLAY [elem, data]
		$this._dOverlayClr = ["", ""] //OVERLAY COLOR [elem, data]
		$this._dWindow = ["", ""] //WINDOW [elem, data]
		$this._dTop = ["", ""] //TOPSECTION [elem, data]
		$this._dTopColor = ["", ""] //TOPSECTION COLOR[elem, data]
		$this._dHandle = ["", ""] //HARDWARE HANDLE [elem, data]
		$this._dHinge = ["", ""] //HARDWARE HINGE [elem, data]
		$this._dSplate = ["", ""] //HARDWARE STEP PLATE [elem, data]
		$this._dGroove = ["", ""] //CENTER GROOVE
		$this.cN = 0;
		$this.hLoop = 0;
		$this.hLoopOn = false;
		//VISUAL LAYERS CONTAINER
		$this.visualLayers = [];
		logprint("Initialize", $this);
		$this.element.bind('rebuildNeeded', function () {
			// $this.updateVisLayers();
			// $this.updateElem();
		});
		$this.element.bind('invalidBuild', function (e, params) {
			if ($this.options.ENABLE) {
				logprint("update BuildObj", $this);
				$this.updateBuildobj(params);
			}
			else {
				logprint("Disabled", $this);
			}
		});
		$this.element.bind('viewChange', function (e, params) {
			$this.options.VIEW = params;
		});
		$this.element.bind('cancelXhr', function (e, params) {
			$this.options.cancelXhr = params;
		});
		$this.element.bind('enableChange', function (e, params) {
			$this.options.ENABLE = params;
		});
		$(document).bind('destroy', function (e, params) {
			// alert('REMOVED!')
			$this.element.unbind('viewChange')
			$this.element.unbind('invalidBuild')
			$this.element.unbind('destroy')
			$this.element.unbind('viewChange')
			$this.element.unbind('rebuildNeeded')
			$this.element.unbind('homeComplete');
			$('#VS-configHome').unbind('homeComplete');
			$this.element.empty();
			$this.buildObj = null
			$this._dHome = ["", ""] //Home [elem, data] !NOT PART OF visualLayers!
			$this._dSlab = ["", ""] //SLAB[elem, data]
			$this._dSlabClr = ["", ""] //SLAB COLOR[elem, data]
			$this._dOverlay = ["", ""] //OVERLAY [elem, data]
			$this._dOverlayClr = ["", ""] //OVERLAY COLOR [elem, data]
			$this._dWindow = ["", ""] //WINDOW [elem, data]
			$this._dTop = ["", ""] //TOPSECTION [elem, data]
			$this._dTopColor = ["", ""] //TOPSECTION COLOR[elem, data]
			$this._dHandle = ["", ""] //HARDWARE HANDLE [elem, data]
			$this._dHinge = ["", ""] //HARDWARE HINGE [elem, data]
			$this._dSplate = ["", ""] //HARDWARE STEP PLATE [elem, data]
			$this._dGroove = ["", ""]
			$this.cN = 0;
			$this.tempCount = 0;
			$this.targCount = 0;
			$this.prevCount = 0;
			//VISUAL LAYERS CONTAINER
			$this.visualLayers = [];
		});
		$this.element.bind('changeMxSz', function (e, params) {
			logprint("Update MaxSize = " + params, $this);
			var wH = params.split(',')
			$this.options.MAXHEIGHT = wH[0];
			$this.options.MAXWIDTH = wH[1];
			$this.updateBuildobj($this.options.build);
		});
		$this.element.bind('consoleIO', function (e, params) {
			$this.options.consolereporting = params;
		})
		$this.element.bind('buildComplete', function (e, params) {
			logprint("BuildComplete", $this);
		})
		$('#ahomeVis').bind('homeComplete', function (e, params) {
			//$($this.element).empty()
			var homeXml = $(params);
			$this.options.HOMEDATA = homeXml;
			$this._dHome = [$this.newCanvas(false, homeXml.attr('imgwidth'), homeXml.attr('imgheight')), 0]
			if (homeXml.attr('upload') == 'true' || homeXml.attr('imagelg') == true) {
				canvasLoader($this, true, $this.buildObj, $this._dHome[0], uploadFolder + '/' + homeXml.attr('imagelg'), 0, 0, true, false);
			}
			else {
				canvasLoader($this, true, $this.buildObj, $this._dHome[0], "homeimages/" + homeXml.attr('imagelg'), 0, 0, true, false);
			}
			if ($this.buildObj != null) {
				if ($this.options.ENABLE) {
					logprint("Start Build", $this);
					//console.log($this.options.HOMEDATA)


					var homeXml = $(orderObj.homedata);
					$this.cN = (homeXml == $this.options.HOMEDATA) ? $this.cN : -99
					$this.options.HOMEDATA = homeXml;
					$this.buildDoor();
					//		$this.updateBuildobj($this.options.build);
					//console.log($this.options.HOMEDATA)
				}
				else {
					logprint("Disabled", $this);
				}
			}
			else {
				logprint("Awaiting Door Object", $this);
			}
		});
		$this.setupDOM();
		if ($this.options.build != null) {
			if ($this.options.ENABLE) {
				logprint("Start Build", $this);
				$this.updateBuildobj($this.options.build);
			}
			else {
				logprint("Disabled", $this);
			}
		}
		else {
			logprint("Awaiting Door Object", $this);
		}
	};
	//Create all DOM elements
	Plugin.prototype.setupDOM = function () {
		var $this = this;
		$this._dSlab = [$this.newCanvas(), 0]
		$this._dSlabClr = [$this.newCanvas(), 0]
		$this._dOverlay = [$this.newCanvas(), 0]
		$this._dOverlayClr = [$this.newCanvas(), 0]
		$this._dWindow = [$this.newCanvas(), 0]
		$this._dTop = [$this.newCanvas(), 0]
		$this._dTopColor = [$this.newCanvas(), 0]
		$this._dHandle = [$this.newCanvas(), 0]
		$this._dHinge = [$this.newCanvas(), 0]
		$this._dSplate = [$this.newCanvas(), 0]
		$this._dGroove = [$this.newCanvas(), 0]
		try {
			$this._eShadows = [$this.newCanvas(false, $this.options.HOMEDATA.attr('imgwidth'), $this.options.HOMEDATA.attr('imgheight')), 0]
			$this._eShrubs = [$this.newCanvas(false, $this.options.HOMEDATA.attr('imgwidth'), $this.options.HOMEDATA.attr('imgheight')), 0]
		} catch (e) { }

	}
	Plugin.prototype.updateVisLayers = function () {
		var $this = this;
		$this.visualLayers = [];
		$this.visualLayers = [$this._dSlab, $this._dSlabClr, $this._dOverlay, $this._dOverlayClr, $this._dWindow, $this._dTop, $this._dTopColor, $this._dHandle, $this._dHinge, $this._dSplate, $this._dGroove];
		$this.evoLayers = [];
		$this.evoLayers = [$this._eShadows, $this._eShrubs];
	}
	// Update BuildOBJ
	Plugin.prototype.updateBuildobj = function ($obj) {
		var $this = this;
		////console.log($this.options.HOMEDATA)
		$this.cN = 0;
		errorBuild = false;

		if ($this.buildObj != $obj) {

			if ($this.options.cancelXhr) {
				for (var i = 0; i < $this.apiCalls.length; i++) {
					var xhr = $this.apiCalls[i]
					if (xhr && xhr.readystate != 4) {
						xhr.abort();
					}
				}
				for (var i = 0; i < $this.timers.length; i++) {
					clearInterval($this.timers[i])
				}
			} else {
				$this.setupDOM();
			}
			$this.apiCalls.length = 0;
			$this.timers.length = 0;
			//$this.options.HOMEDATA = orderObj.homedata;
			$this.cN = ($this.buildObj.hardwarestepplate == $obj.hardwarestepplate) ? $this.cN : 0
			$this.cN = ($this.buildObj.stepplateplacement == $obj.stepplateplacement) ? $this.cN : 0
			$this.cN = ($this.buildObj.hingeplacement == $obj.hingeplacement) ? $this.cN : 0
			$this.cN = ($this.buildObj.hardwarehinge == $obj.hardwarehinge) ? $this.cN : 0
			$this.cN = ($this.buildObj.handleplacement == $obj.handleplacement) ? $this.cN : 0
			$this.cN = ($this.buildObj.hardwarehandle == $obj.hardwarehandle) ? $this.cN : 0
			$this.cN = ($this.buildObj.topsectionimage == $obj.topsectionimage) ? $this.cN : 0
			$this.cN = ($this.buildObj.topsectionmask == $obj.topsectionmask) ? $this.cN : 0
			$this.cN = ($this.buildObj.topsectionrow == $obj.topsectionrow) ? $this.cN : 0
			$this.cN = ($this.buildObj.EnvWindows == $obj.EnvWindows) ? $this.cN : 0
			$this.cN = ($this.buildObj.centergrooves == $obj.centergrooves) ? $this.cN : 0
			$this.cN = ($this.buildObj.designimage == $obj.designimage) ? $this.cN : 0
			$this.cN = ($this.buildObj.slab == $obj.slab) ? $this.cN : 0
			$this.cN = ($this.buildObj.constructionswaprule == $obj.constructionswaprule) ? $this.cN : 0
			$this.cN = ($this.buildObj.colorswaprule == $obj.colorswaprule) ? $this.cN : 0
			$this.cN = ($this.buildObj.claddingswap == $obj.claddingswap) ? $this.cN : 0
			$this.cN = ($this.buildObj.colorcode == $obj.colorcode) ? $this.cN : 0
			$this.cN = ($this.buildObj.overlaycolor == $obj.overlaycolor) ? $this.cN : 0
			$this.cN = ($this.buildObj.doorrows == $obj.doorrows) ? $this.cN : 0
			$this.cN = ($this.buildObj.productid == $obj.productid) ? $this.cN : 0


			if (!$this.options.cancelXhr) {

				$this.cN = 0
			}

			if ($this.options.VIEW == 'home') {


				$this.cN = (orderObj.homedata == $this.options.HOMEDATA) ? $this.cN : -99

				$this.options.HOMEDATA = orderObj.homedata;


				// $($this.element).empty()
			}

			// Rebuild Enviromental Layers
			//	$this.cN = ($this.buildObj.EnvTree[2] == $obj.EnvTree[2]) ? $this.cN : 99
			//$this.cN = ($this.buildObj.EnvTree[1] == $obj.EnvTree[1]) ? $this.cN : 99
			//	$this.cN = ($this.buildObj.EnvShadow[1] == $obj.EnvShadow[1]) ? $this.cN : 99
			//	$this.cN = ($this.buildObj.EnvShadow[2] == $obj.EnvShadow[2]) ? $this.cN : 99
			//	$this.cN = ($this.buildObj.EnvShadow[3] == $obj.EnvShadow[3]) ? $this.cN : 99
			if (!$('.homeCNVS1', $this.element).length && !$('.homeCNVS', $this.element).length) {

				//	$this.cN = -99
			}


		}

		$.extend(true, $this.buildObj, $obj);
		$this.buildDoor();
	};
	Plugin.prototype.buildDoor = function () {

		if (!errorBuild) {
			var $this = this;
			// console.log('Build ' + $this.cN)

			//console.log($this.cN)

			switch ($this.cN) {
				case -99: {
					$this.cN = 0;




					var homeXml = $this.options.HOMEDATA;

					if (homeXml != '' && homeXml != null) {
						if (homeXml.attr('imagelg') == undefined) {
							$this.cN = 0;
							$this.buildDoor();
						}
						$this._dHome = [$this.newCanvas(false, homeXml.attr('imgwidth'), homeXml.attr('imgheight')), 0]
						if (homeXml.attr('upload') == 'true' || homeXml.attr('imagelg') == true) {
							canvasLoader($this, true, $this.buildObj, $this._dHome[0], uploadFolder + '/' + homeXml.attr('imagelg'), 0, 0, true, false);
						}
						else {
							canvasLoader($this, true, $this.buildObj, $this._dHome[0], "homeimages/" + homeXml.attr('imagelg'), 0, 0, true, false);
						}


					} else {
						$this.cN = 0;
						$this.buildDoor();
					}
					break;
				}
				case 99:
					{ //HANDLES HARDWARE - "BUILDHARDWARE"
						logprint("Eviro", $this);
						$this._nogo = 1;
						$this.setupeDOM();
						if ($this.buildObj.EnvShadow[0] != 0) {
							logprint("Shadow", $this); /** SHADOWING LAYER**/
							var shadowID = "ShadowLayer",
								shadowUrl = uploadFolder + '/' + $this.options.HOMEDATA.attr('imagelg'),
								shadowImg = new Image(),
								shadowImage;
							shadowImg.onload = function () {
								shadowImage = new ShadowImage($($this._eShadows[0]), this, $this.buildObj.EnvShadow[2]);
								shadowImage.blackremoval($this.buildObj.EnvShadow[3] / 2)
								shadowImage.threshold($this.buildObj.EnvShadow[1]);
								shadowImage.blur(2);
								shadowImage.dumpColor(">", [190, 190, 190]);
								shadowImage.blur(3);
							};
							shadowImg.crossOrigin = ''; // no credentials flag.
							shadowImg.src = shadowUrl;
						}
						if ($this.buildObj.EnvTree[0] != 0) {
							logprint("Tree", $this); /** Tree LAYER**/
							var treeID = "TreeLayer",
								treeUrl = uploadFolder + '/' + $this.options.HOMEDATA.attr('imagelg'),
								treeImg = new Image(),
								treeImage;
							treeImg.onload = function () {
								treeImage = new TreeSaverImage($($this._eShrubs[0]), this);
								treeImage.replaceTrees($this.buildObj.EnvTree[2], $this.buildObj.EnvTree[1]);
								treeImage.blur(2);
							};
							treeImg.crossOrigin = ''; // no credentials flag.
							treeImg.src = treeUrl;
						}
						//logprint("EviroDone", $this);


						$this.cN = 0;
						$this.buildDoor();
						break;
					}
				case 0:
					{ //Clear All Size has Changed
						$this.setupDOM();



					}
				case 1:
					{ // SLAB - "BUILDSLAB"
						if ($.inArray($this.buildObj.productid, hasSlab) != -1) {
							if ($this.buildObj.designimage != "") {
								var sName = $this.getSlab($this.buildObj.designimage);
								canvasLoader($this, true, $this.buildObj, $this._dSlab[0], sName);
								// console.log('CN1')
								$this.cN++
							}
						}
						else {
							// console.log('CN1')
							$this.cN++;
							//console.log('bd1')
							$this.buildDoor();

						}
						break;
					}
				case 2:
					{ // OVERLAY  - "BUILDSLABFRAME"

						if ($this.buildObj.designimage != "") {
							canvasLoader($this, true, $this.buildObj, this._dOverlay[0], $this.getDsgn($this.buildObj.designimage));
							// console.log('CN2')
							$this.cN++;
						}
						else {
							// console.log('CN2')
							$this.cN++;
							// console.log('bd2')
							$this.buildDoor();
						}
						break;
					}
				case 3:
					{ // Color Slab - "BUILDSLABMASK"

						if ($.inArray($this.buildObj.productid, hasSlab) != -1) {
							if ($this.buildObj.overlaycolor != "") {
								var sName = $this.getSlab($this.buildObj.designimage);
								//alert('ad')
								canvasColr($this, $this.buildObj, $this._dSlabClr[0], sName, $this.buildObj.overlaycolor)
								$this.cN = 4;
							}
							else {
								$this.cN = 4;
								//console.log('bd3')
								$this.buildDoor();
							}
						}
						else {
							$this.cN = 4;
							//                         console.log('bd4')
							$this.buildDoor();
						}
						break;
					}
				case 4:
					{ // Color Overlay - "COLORDOOR"
						if ($this.buildObj.colorcode != "") {

							canvasColr($this, $this.buildObj, $this._dOverlayClr[0], $this.getDsgn($this.buildObj.designimage), $this.buildObj.colorcode)
							// console.log('CN3')
							$this.cN++
						}
						else {
							// console.log('CN3')
							$this.cN++;

							$this.buildDoor();
						}
						break;
					}
				case 5:
					{ // Windows & Topsection
						$this._dWindow = [$this.newCanvas(), 0]
						if ($this.buildObj.topsectionimage != "") {
							var topy = 0
							if (Number($this.buildObj.topsectionrow) > 0) {
								topy = Number(Number($this.buildObj.doorrows) - Number($this.buildObj.topsectionrow)) * 100
							}


							var prodid = $this.buildObj.productid;
							var size = '21'

							if (Number(prodid) == 9 || Number(prodid) == 10) {
								size = '24'
								topy = 8
							}

							if ($this.buildObj.glaz != 0 && $this.buildObj.glaz != "GLAZ-SOL") {
								canvasLoader($this, true, $this.buildObj, $this._dWindow[0], $this.buildObj.doorcolumns + "C_" + size + "_" + $this.buildObj.EnvWindows + ".png", 0, topy);
								// console.log('CN4')
								$this.cN++
							} else if (Number(prodid) == 10 && $this.buildObj.topsectionimage.toLowerCase().indexOf("rletop8") < 0) {

								//clip design
								var sName = 'TOP-' + $this.getSlab($this.buildObj.designimage);

								sName = sName.replace("3r-", "");
								sName = sName.replace("4r-", "");
								sName = sName.replace("5r-", "");
								sName = sName.replace("6r-", "");
								sName = sName.replace("7r-", "");
								sName = sName.replace("8r-", "");
								sName = sName.replace("9r-", "");
								sName = sName.replace("10r-", "");
								sName = sName.replace("3R-", "");
								sName = sName.replace("4R-", "");
								sName = sName.replace("5R-", "");
								sName = sName.replace("6R-", "");
								sName = sName.replace("7R-", "");
								sName = sName.replace("8R-", "");
								sName = sName.replace("9R-", "");
								sName = sName.replace("10R-", "");

								canvasLoader($this, true, $this.buildObj, $this._dWindow[0], sName, 0, 0);
								// console.log('CN4')
								$this.cN++

							}
							else {
								// console.log('CN4')
								$this.cN++;
								$this.buildDoor();
							}
						}
						else {
							// console.log('CN4')
							$this.cN++;

							$this.buildDoor();
						}
						break;
					}
				case 6:
					{
						// Windows SLAB COLOR
						$this._dWindowClr = [$this.newCanvas(), 0]
						if ($this.buildObj.topsectionimage != "" && $this.buildObj.glaz == "GLAZ-SOL" && $this.buildObj.topsectionimage.toLowerCase().indexOf("rletop8") < 0) {
							var prodid = $this.buildObj.productid;
							if (Number(prodid) == 10 && $this.buildObj.glaz == "GLAZ-SOL") {
								var sName = 'TOP-' + $this.getSlab($this.buildObj.designimage);


								sName = sName.replace("3r-", "");
								sName = sName.replace("4r-", "");
								sName = sName.replace("5r-", "");
								sName = sName.replace("6r-", "");
								sName = sName.replace("7r-", "");
								sName = sName.replace("8r-", "");
								sName = sName.replace("9r-", "");
								sName = sName.replace("10r-", "");
								sName = sName.replace("3R-", "");
								sName = sName.replace("4R-", "");
								sName = sName.replace("5R-", "");
								sName = sName.replace("6R-", "");
								sName = sName.replace("7R-", "");
								sName = sName.replace("8R-", "");
								sName = sName.replace("9R-", "");
								sName = sName.replace("10R-", "");

								canvasColr($this, $this.buildObj, $this._dWindowClr[0], sName, $this.buildObj.overlaycolor)
								$this.cN++
							} else {
								$this.cN++;
								$this.buildDoor();
							}
						}
						else {
							$this.cN++;
							$this.buildDoor();
						}
						break;
					}
				case 7:
					{
						// Windows & Topsection
						$this._dTop = [$this.newCanvas(), 0]
						if ($this.buildObj.topsectionimage != "") {
							var topy = 0
							if (Number($this.buildObj.topsectionrow) > 0) {
								topy = Number(Number($this.buildObj.doorrows) - Number($this.buildObj.topsectionrow)) * 100
							}
							canvasLoader($this, true, $this.buildObj, $this._dTop[0], $this.getDsgn($this.buildObj.topsectionimage), 0, topy);
							$this.cN++
						}
						else {
							$this.cN++;
							//console.log('bd8')
							$this.buildDoor();
						}
						break;
					}
				case 8:
					{
						// Windows & Topsection
						$this._dTopColor = [$this.newCanvas(), 0]
						if ($this.buildObj.topsectionimage != "" && $this.buildObj.colorcode != '') {
							var topy = 0
							if (Number($this.buildObj.topsectionrow) > 0) {
								topy = Number(Number($this.buildObj.doorrows) - Number($this.buildObj.topsectionrow)) * 100
							}
							canvasColr($this, $this.buildObj, $this._dTopColor[0], $this.getDsgn($this.buildObj.topsectionimage), $this.buildObj.colorcode, 0, topy)
							$this.cN++
						}
						else {
							$this.cN++;
							//                         console.log('bd9')
							$this.buildDoor();
						}
						break;
					}
				case 9:
					{ //HANDLES HARDWARE - "BUILDHARDWARE"
						//$this._dHandle = [$this.newCanvas(), 0]
						if ($this.buildObj.hardwarehandle != "") {
							if ($this.buildObj.handleplacement != "") {
								var p0 = $this.buildObj.handleplacement;
								var a0 = p0.split(':');
								var a1 = a0[1].split('|');
								var that = $this;
								$this.tempCount = 0;
								$this.targCount = a1.length;
								$this.prevCount = 9;
								//$this.cN = 9;
								if (!$this.hLoopOn) {
									$this.hLoop = 0
									$this._dHandle = [$this.newCanvas(), 0]
									$this.hLoopOn = true
								}

								$.each(a1, function (index, value) {
									var plc = a1[index].split(',');
									var plc1 = plc[0].slice(1);
									var pid = $this.buildObj.productid;
									// if (pid == 30) { plc1 = plc1 - 2; }
									if ($this.hLoop == index) {

										if (index + 1 == a1.length) {
											$this.cN++
											$this.hLoopOn = false
											$this.hLoop = 0
										}

										canvasLoader($this, true, $this.buildObj, that._dHandle[0], that.buildObj.hardwarehandle, Number(plc1 / 100 * that._dSlab[0][0].width), Number(plc[1] / 100 * that._dSlab[0][0].height), false, false);
									}
								});

							} else {
								$this.cN++;
								$this.buildDoor();
							}

						}
						else {
							$this.cN++;
							$this.buildDoor();
						}
						break;
					}
				case 10:
					{ //HINGE HARDWARE - "BUILDHARDWARE"
						//	$this._dHinge = [$this.newCanvas(), 0]
						if ($this.buildObj.hardwarehinge != "") {
							if ($this.buildObj.hingeplacement != "") {
								var rImg = $this.buildObj.hardwarehinge.split(".").join("-R.");
								var p0 = $this.buildObj.hingeplacement;
								var a0 = p0.split(':');
								var a1 = a0[1].split('|');
								var that = this;
								$this.prevCount = 10;
								//$this.cN = 10;
								$this.tempCount = 10;
								$this.targCount = a1.length;
								if (!$this.hLoopOn) {
									$this.hLoop = 0
									$this._dHinge = [$this.newCanvas(), 0]
									$this.hLoopOn = true
								}
								$.each(a1, function (index, value) {

									var letterFirst = value.slice(0, 1);
									var plc = a1[index].split(',');
									var plc1 = plc[0].slice(1);



									var pid = $this.buildObj.productid;
									if (pid == 30 && plc[1] > 50) {
										plc[1] = plc[1] - 4;
									}

									if (plc1 > 50) {
										plc1 = plc1 - 3;

									}

									if (letterFirst.toLowerCase() == 'r' && plc1 > 50) {
										plc1 = plc1 + 4;
									}

									// console.log($this.hLoop + '==' + index)

									if ($this.hLoop == index) {

										// console.log(index + 1 + '==' + a1.length)
										if (index + 1 == a1.length) {
											$this.cN++
											$this.hLoopOn = false;
											$this.hLoop = 0
										}
										if (letterFirst.toLowerCase() == 'l') {
											canvasLoader($this, true, $this.buildObj, that._dHinge[0], that.buildObj.hardwarehinge, Number(plc1 / 100 * that._dSlab[0][0].width), Number(plc[1] / 100 * that._dSlab[0][0].height), false, false);
										}
										else {
											canvasLoader($this, true, $this.buildObj, that._dHinge[0], rImg, Number(plc1 / 100 * that._dSlab[0][0].width) - 5, Number(plc[1] / 100 * that._dSlab[0][0].height), false, false);
										}
									}
								});
							}
							else {
								$this.cN++;
								$this.buildDoor();
							}
						}
						else {
							$this.cN++;
							$this.buildDoor();
						}
						break;
					}
				case 11:
					{ //STEP PLATES HARDWARE - "BUILDHARDWARE"
						//$this._dSplate = [$this.newCanvas(), 0]
						if ($this.buildObj.hardwarestepplate != "") {
							if ($this.buildObj.stepplateplacement != "") {
								var p0 = $this.buildObj.stepplateplacement;
								var a0 = p0.split(':');
								var a1 = a0[1].split('|');
								var that = $this;
								$this.tempCount = 0;
								$this.targCount = a1.length;
								$this.prevCount = 11;
								//	$this.cN = 11;
								if (!$this.hLoopOn) {
									$this.hLoop = 0
									$this.hLoopOn = true
									$this._dSplate = [$this.newCanvas(), 0]
								}
								$.each(a1, function (index, value) {



									var plc = a1[index].split(',');
									var plc1 = plc[0].slice(1);
									// console.log($this.hLoop + '==' + index)
									if ($this.hLoop == index) {

										// console.log(index + 1 + '==' + a1.length)
										if (index + 1 == a1.length) {
											$this.cN++
											$this.hLoopOn = false
											$this.hLoop = 0
										}
										canvasLoader($this, true, $this.buildObj, that._dSplate[0], that.buildObj.hardwarestepplate, Number(plc1 / 100 * that._dSlab[0][0].width), Number(plc[1] / 100 * that._dSlab[0][0].height) - 5, false, false);
									}
								});
							}
							else {
								$this.cN++;
								$this.buildDoor();
							}
						}
						else {
							$this.cN++;
							$this.buildDoor();
						}
						break;

					}
				case 12:
					{ //CENTER GROOVE

						if ($this.buildObj.centergrooves != "") {
							if ($this.buildObj.centergrooves != 0) {

								var pos = [[50], [25, 75], [25, 50, 75]]

								var tarPos = pos[0]

								switch ($this.buildObj.centergrooves) {
									case 1: {
										tarPos = pos[0]
										break;
									}
									case 2: {
										tarPos = pos[1]
										break;
									}
									case 3: {
										tarPos = pos[2]
										break;
									}
								}

								// console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
								// console.log(tarPos)
								if (!$this.hLoopOn) {
									$this.hLoop = 0
									$this.hLoopOn = true
									//$this._dGroove = [$this.newCanvas(), 0]
								}


								var cgn = "RCenterGroove-R";
								cgn += String($this.buildObj.doorrows);
								try {
									if ($this.buildObj.colorswaprule == "Natural,Paint") {
										cgn += "-WH";
									}
								} catch (e) { }
								cgn += ".png";


								var a1 = Number($this.buildObj.centergrooves)

								for (var i = 0; i < a1; i++) {

									if ($this.hLoop == i) {

										if (i + 1 == a1) {
											$this.cN++
											$this.hLoopOn = false
											$this.hLoop = 0
										}

										var posX = Number(tarPos[i] / 100) * $this._dSlab[0][0].width
										canvasLoader($this, true, $this.buildObj, $this._dGroove[0], cgn, posX - 2, 0, false);

									}

								};

							}
							else {
								$this.cN++;
								$this._dGroove = [$this.newCanvas(), 0]
								$this.buildDoor();
							}
						}
						else {
							$this.cN++;
							$this.buildDoor();
						}
						break;

					}

				case -20:
					{ //nothing sit and wait
						break;
					}
				default:
					{
						//$this.cN = -20;
						$this.buildDone();
						break;
					}
			}
		}
		else {
			buildError();
		}
	}
	Plugin.prototype.buildDone = function () {
		var $this = this;
		$this.updateVisLayers();


		// console.log($this.cN + 'CALLED FOR BUILD COMPLETE')
		$this.updateElem();
		logprint("done Build ready for Complete", $this);
		$('#SidebarLoader').hide(); 		// custom change to show sidebar loader
		//alert('update')
		//$('body').removeClass('loader');
	}
	// Console loggin for debugging & reporting

	function logprint(str, $obj) {
		if (window.console && window.console.log && $obj.options.consolereporting) window.console.log($obj.options.NAME + '.log || ' + str);
	};

	function buildError() { }
	Plugin.prototype.getDsgn = function (str) {
		var $this = this;
		var prodid = $this.buildObj.productid;
		str = str.toLowerCase();
		if ($this.buildObj.constructionswaprule != "") {
			var constructionSwap = String($this.buildObj.constructionswaprule).toLowerCase();
			var constructionSplit = constructionSwap.split(',');
			str = str.replace(constructionSplit[0], constructionSplit[1]);
		}

		if ($this.buildObj.colorswaprule != "") {
			var colorSwap = String($this.buildObj.colorswaprule).toLowerCase();
			var colorSplit = colorSwap.split(',');
			str = str.replace(colorSplit[0], colorSplit[1]);
		}

		switch (prodid) {
			case 12:
			case 13:
				{
					if (colorSwap == "blk") {
						str = str.replace(".jpg", "-blk.png");
					}
					break;
				}
			case 16:
				{
					// Avante always black frame, color swap will take care of the rest
					str = 'AblackFR-' + $this.buildObj.doorrows + 'R-' + $this.buildObj.doorcolumns + 'C.png'
					break;
				}
			case 9:
				{
					// reserve

					str = str.replace("natural", "cd");
					str = str.replace("redwood", "rw");
					str = str.replace("cedar", "cd");
					str = str.replace("hemlock", "hs");
					str = str.replace("stain", "hs");
					str = str.replace("hp", "hs");
					str = str.replace("groove-cd", "hg");
					str = str.replace("groove-paint", "hswh");
					str = str.replace("groove-natural", "hg");
					//str = str.replace("paint", "wh");
					try {
						if ($this.buildObj.constructionmodel == "RH") {
							str = str.split("cd").join("hs");
						}
						var index = String($this.buildObj.constructionmodel).indexOf("P");
						if (index != -1) {
							str = str.split("hs").join("hp");
						}
					}
					catch (err) { }
					break;

					break;
				}
			case 30:
				{
					try {
						if (doorContainer['Cladding'] != '') {
							var cladswap = doorContainer['Cladding']; // for Gallery - Ultra Grain
							var cladSplit = cladswap.split(',');
							str = str.replace(cladSplit[0], cladSplit[1]);
						}
					}
					catch (err) {
						// no swaps availible
					}
					str = str.split("pc-cc").join("cc");
					str = str.split("pc-mo").join("mo");
					str = str.split("pc-mh").join("mh");
					str = str.split("cc-cc").join("cc");
					str = str.split("cc-mo").join("mo");
					str = str.split("mh-cc").join("cc");
					str = str.split("cc-mh").join("mh");
					str = str.split("mh-mh").join("mh");
					str = str.split("nn-mm").join("mh");
					str = str.split("nn-cc").join("cc");
					str = str.split("mo-pc").join("mo-cc");
					str = str.split("ug-cc").join("cc");
					break;
				}
		}
		return str
	}
	Plugin.prototype.getSlab = function (str) {
		var $this = this;
		var prodid = $this.buildObj.productid;
		str = str.toLowerCase();
		if ($this.buildObj.constructionswaprule != "") {
			var constructionSwap = String($this.buildObj.constructionswaprule).toLowerCase();
			var constructionSplit = constructionSwap.split(',');
			str = str.replace(constructionSplit[0], constructionSplit[1]);
		}

		if ($this.buildObj.colorswaprule != "") {
			var colorSwap = String($this.buildObj.colorswaprule).toLowerCase();
			var colorSplit = colorSwap.split(',');
			str = str.replace(colorSplit[0], colorSplit[1]);
		}

		switch (prodid) {
			case 9:
				{
					// reserve
					//str = str.replace("paint", "wh");

					str = str.replace("groove-cd", "hg");
					str = str.replace("groove-natural", "hg");
					str = str.replace("groove-paint", "hgwh");



					str = str.replace("natural", "cd");
					str = str.replace("redwood", "rw");
					str = str.replace("cedar", "cd");
					str = str.replace("hemlock", "hs");
					str = str.replace("stain", "hs");

					str = str.replace("r1-", "");
					str = str.replace("r2-", "");
					str = str.replace("r3-", "");
					str = str.replace("r4-", "");
					str = str.replace("r5-", "");
					str = str.replace("r6-", "");




					try {
						if ($this.buildObj.constructionmodel == "RH") {
							str = str.split("cd").join("hs");
						}



						var index = String($this.buildObj.constructionmodel).indexOf("P");
						if (index != -1) {
							str = str.split("hs").join("hp");
						}
					}
					catch (err) { }

					var index = String($this.buildObj.colorswaprule).toLowerCase().indexOf("paint");
					if (index != -1) {
						str = str.split("cd").join("paint");
					}

					break;
				}
			case 11:
				{
					// coachman
					var dR = $this.buildObj.doorrows
					var dC = $this.buildObj.doorcolumns
					str = String("coach-" + dR + "R-" + dC + "C.png");
					break;
				}
			case 30:
				{
					try {
						if (doorContainer['Cladding'] != '') {
							var cladswap = doorContainer['Cladding']; // for Gallery - Ultra Grain
							var cladSplit = cladswap.split(',');
							str = str.replace(cladSplit[0], cladSplit[1]);
						}
					}
					catch (err) {
						// no swaps availible
					}
					var contentArray = str.split("-");
					contentArray.splice(0, 1)
					str = contentArray.join("-");
					str = str.split("pc-cc").join("pc");
					str = str.split("pc-mo").join("pc");
					str = str.split("pc-mh").join("pc");
					str = str.split("cc-cc").join("cc");
					str = str.split("cc-mo").join("cc");
					str = str.split("mh-cc").join("mh");
					str = str.split("cc-mh").join("cc");
					str = str.split("mh-mh").join("mh");
					str = str.split("nn-mm").join("ug");
					str = str.split("nn-cc").join("ug");
					str = str.split("ug-cc").join("ug");
					break;
				}
			case 16:
				{
					break;
				}
			default:
				{
					str = 'none';
				}
		}
		return str
	}
	/////////////////////////////////////////////////////
	// updateElem: Uudates plugin output image //
	///////////////////////////////////////////////////
	Plugin.prototype.updateElem = function () {		
		// console.log('callout')
		var $this = this;
		var ratio = 1;
		var maxWidth = this.options.MAXWIDTH;
		var maxHeight = this.options.MAXHEIGHT
		var upload = false;
		var leftAmmount = 0;
		var topAmmount = 0;
		var maxHeight2 = Number(this.options.MAXHEIGHT) - 25
		//var apiImg
		var y1


		$($this.element).empty()


		exprtElm = $this.newCanvas(false, $this._dSlab[0][0].width, $this._dSlab[0][0].height);
		var exprtCtx = exprtElm[0].getContext('2d');

		var zoomControl = $('<div id="visZoom" style="position:relative; float: right; left: 0px; top: ' + maxHeight2 + 'px; "></div>');
		var enviroControl = $('<div id="visTools"  style="position:relative; float: right; left: 0px; top: ' + maxHeight2 + 'px; "></div>').click(function () {
			if (!upload) {
				$(this).trigger('doorVisToolsUp')
			}
			else {
				$(this).trigger('doorVisTools')
			}
		});


		var homeControl = $('<div id="visTools"  style="position:relative; float: right; left: 0px; top: ' + maxHeight2 + 'px; "></div>').click(function () {
			if (upload) {
				$(this).trigger('doorVisToolsUp')
			}
			else {
				$(this).trigger('doorVisTools')
			}
		});

 

		$('#visZoom', $($this.element).parent()).remove();
		$('#visTools', $($this.element).parent()).remove();
 
		var BuildObject = $this.newCanvas();
		var bCtx = BuildObject[0].getContext('2d');

		for (var i = 0; i < $this.visualLayers.length; i++) {
			bCtx.drawImage(($this.visualLayers[i][0][0]), 0, 0);
			//$('body').append($this.visualLayers[i][0][0])
		}


		var imageData = BuildObject[0].toDataURL()
		//  cArr[$this.buildObj.bitData[0]][$this.buildObj.bitData[1]].VISIMG = imageData
		//	console.log(	cArr[$this.buildObj.bitData[0]][$this.buildObj.bitData[1]])

		if ($this.options.VIEW != 'home') {
			$($this.element).css('left', '0px')
			$($this.element).css('left', '10px')
			$('.homeCNVS', $this.element).remove();
			$('.homeCNVS1', $this.element).remove();

			$("[class^=homedoor-]", $this.element).remove();
			$($this.element).append($(BuildObject[0]).attr('class', 'vsDoor'));
			$('.vsDoor :not(:last)', $this.element).remove();

			if ($this._dSlab[0][0] != undefined) {
				if ($this._dSlab[0][0].width > maxWidth) ratio = (maxWidth - 10) / $this._dSlab[0][0].width;
				if (($this._dSlab[0][0].height * ratio) > maxHeight) ratio = (maxHeight - 10) / $this._dSlab[0][0].height;
			}
 
			leftAmmount = (maxWidth / 2) - (($this._dSlab[0][0].width * ratio) / 2) + 15
			topAmmount = (maxHeight / 2) - (($this._dSlab[0][0].height * ratio) / 2) + 20

		} else {
			// HOME VIEW

			$($this.element).css('left', '10px')
			var mydorPos = 1
			var upload = false;

			if (this.options.HOMEDATA != null) {
				if (this.options.HOMEDATA.attr('upload') == "true" || this.options.HOMEDATA.attr('upload') == true) {
					upload = true;
				}
			}

			var doorElm = $this.newCanvas(false, $this.options.HOMEDATA.attr('imgwidth'), $this.options.HOMEDATA.attr('imgheight'));
			var ctx = doorElm[0].getContext("2d");
			var Dlen = $(this.options.HOMEDATA).find('point').length

			var pnts = $(this.options.HOMEDATA).find('point')

			if ($(this.options.HOMEDATA).find('dcoords').attr('flip') == 'true' || $(this.options.HOMEDATA).find('dcoords').attr('flip') == true) {
				pnts = $($(this.options.HOMEDATA).find('point').get().reverse())
			}

			$(pnts).each(function (index, value) {
				var mpass = true
 
				if (mpass) {
					var apiImg = new Image();
					var point = $(value)


					var point1 = $(value)
					var y2 = point.attr('y2')

					y1 = point.attr('y1')
					if (point.attr('arcy') != 0) { y1 = point.attr('arcy') }
					else if (point.attr('ang1y') != 0) { y1 = point.attr('ang1y') }

					if (point.attr('arcy') != 0) { y2 = point.attr('arcy') }
					else if (point.attr('ang2y') != 0) { y2 = point.attr('ang2y') }

					if (y1 == 'undefined' || y1 == undefined) { y1 = point.attr('y1') }
					if (y2 == 'undefined' || y2 == undefined) { y = point.attr('y2') }


					var doorElm2 = $this.newCanvas(false, $this.options.HOMEDATA.attr('imgwidth'), $this.options.HOMEDATA.attr('imgheight'));
					var ctx2 = doorElm2[0].getContext("2d");

					apiImg.onload = function () {

						var p1 = point1
 
						// Image came back
						if (upload) {
							//Cliping mask
							ctx2.beginPath();
							ctx2.moveTo(point1.attr('x1'), point1.attr('y1'));
							ctx2.save();
							if (point1.attr('arcx') != 0) {
								ctx2.quadraticCurveTo(point1.attr('arcx'), point1.attr('arcy'), point1.attr('x2'), point1.attr('y2'));
							}
							else if (point1.attr('ang1x') != 0) {
								ctx2.lineTo(point1.attr('ang1x'), point1.attr('ang1y'));
								ctx2.lineTo(point1.attr('ang2x'), point1.attr('ang2y'));
								ctx2.lineTo(point1.attr('x2'), point1.attr('y2'));
							}
							else {
								ctx2.lineTo(point.attr('x2'), point.attr('y2'));
							}
							ctx2.lineTo(point1.attr('x2'), point1.attr('y3'));
							ctx2.lineTo(point1.attr('x3'), point1.attr('y3'));
							ctx2.lineTo(point1.attr('x4'), point1.attr('y4'));
							ctx2.closePath();
							// Clip to the current path
							ctx2.clip();
							//console.log(point)
							if (Number(y2) < Number(y1)) {
								y1 = y2;
							}
							ctx2.drawImage(apiImg, point.attr('x1'), y1, point.attr('w'), point.attr('h'));
							ctx.drawImage(doorElm2[0], 0, 0);
							//apiImg = null
							ctx.save();
							ctx.globalCompositeOperation = 'source-atop';
							try {
								ctx.drawImage($($this._eShadows[0])[0], 0, 0);
								ctx.drawImage($($this._eShrubs[0])[0], 0, 0);
							}
							catch (e) { }
							ctx.restore()

							//       if ($('.homedoor-' +  point.attr('x1'), $this.element).length) {


							//			 alert(point.attr('x1'))
							//$('.homedoor-' +  point.attr('x1'), $this.element).replaceWith($(doorElm).attr('class', 'homedoor-' +  point.attr('x1')).css('position', 'absolute'))
							//}else{
							// alert(point.attr('x1'))
							$($this.element).append($(doorElm).attr('class', 'homedoor-' + point.attr('x1')).css('position', 'absolute'));
							//}





						}
						else {
							ctx.save();
							// alert('go3 '+ point.attr('x2'))
							ctx.drawImage(apiImg, point.attr('x'), point.attr('y'), point.attr('w'), point.attr('h'));
							//apiImg = null
							ctx.restore();

							if ($('.homedoor-' + point.attr('x2'), $this.element).length) {
								$('.homedoor-' + point.attr('x2'), $this.element).replaceWith($(doorElm).attr('class', 'homedoor-' + point.attr('x2')).css('position', 'absolute'))
							} else {
								$($this.element).prepend($(doorElm).attr('class', 'homedoor-' + point.attr('x2')).css('position', 'absolute'));
							}

							//  if(Dlen > Number($this.buildObj.MYTARG))
							//$(document).trigger('buildAdditonalHomeDoor')
							// clearInterval(ajTimer)
							//  }
							//  }, 500);
						}
					}



				};


				var canvas = document.createElement('canvas');
				canvas.width = BuildObject[0].width / 2;
				canvas.height = BuildObject[0].height / 2;
				var canvasCtx = canvas.getContext("2d");
				canvasCtx.drawImage(BuildObject[0], 0, 0, BuildObject[0].width / 2, BuildObject[0].height / 2);
				var cD = canvas.toDataURL("image/png");

				if ($this._dHome[0][0] != undefined) {
					if ($this._dHome[0][0].width > maxWidth) ratio = (maxWidth) / $this._dHome[0][0].width;
					if (($this._dHome[0][0].height * ratio) > maxHeight) ratio = (maxHeight) / $this._dHome[0][0].height;
					leftAmmount = (maxWidth / 2) - (($this._dHome[0][0].width * ratio) / 2)
					topAmmount = (maxHeight / 2) - (($this._dHome[0][0].height * ratio) / 2)
				}
				//var ajTimer = setInterval(function () {
				//	if (manageAJAX($this.apiCalls, maxConnections)) {

				var divide = 1
				if (!upload) { divide = 2 }
				if (point != undefined) {
					var uri = '?x1=' + point.attr('x1') + '&y1=' + y1 + '&x2=' + Number(point.attr('x2')) / divide + '&y2=' + Number(y2) / divide + '&x3=' + Number(point.attr('x3')) / divide + '&y3=' + Number(point.attr('y3')) / divide + '&x4=' + Number(point.attr('x4')) / divide + '&y4=' + Number(point.attr('y4')) / divide;
					jQuery.support.cors = true;
					var apiCall = $.ajax({
						type: 'POST',
						crossDomain: true,
						url: imgSkewURL + uri,
						data: 'data=' + encodeURIComponent(cD),
						success: function (responseData, textStatus, jqXHR) {
							var tt = responseData + '';
							apiImg.src = "data:image/png;base64," + tt;
						},
						error: function (responseData, textStatus, errorThrown) { }
					});

					//$this.apiCalls.push(apiCall)
					// clearInterval(ajTimer)
				}
				//}

				//}, 100);

				//$this.timers.push(ajTimer)
			})
			if (upload) {
				$('.vsDoor', $this.element).remove();
				if (!$('.homeCNVS', $this.element).length) {
					$($this.element).prepend($($this._dHome[0]).attr('class', 'homeCNVS1'));
					$($this.element).prepend($($this._dHome[0]).attr('class', 'homeCNVS'));
				}
				//  alert(mydorPos)
				$('.CNVS', $this.element).remove();




			}
			else {
				$('.CNVS', $this.element).remove();
				if (y1 != undefined) {




					$($this.element).append($($this._dHome[0]).attr('class', 'homeCNVS1'));
					$('.vsDoor', $this.element).remove();
					if (!$('.homeCNVS1', $this.element).length) {

						$($this.element).append($($this._dHome[0]).attr('class', 'homeCNVS1'));
					}

				}
			}







		}


		if ($this.options.VIEW == 'home') { leftAmmount += 16; topAmmount += -10 }
		

		BuildObject = null;
		// console.log($this.element)
		$($this.element).css('top', topAmmount + 'px')
		$($this.element).css('left', leftAmmount + 'px !important')
		$($this.element).css('text-width', $this.options.MAXHEIGHT + 'px')
		$($this.element).css('text-align', 'center')
		$($this.element).css('position', 'absolute !important')
		// $($this.element).css('transform', 'scale(' + ratio + ',' + ratio + ')');
		// $($this.element).css('-moz-transform-origin', '0 0');
		// $($this.element).css('-moz-transform', 'scale(' + ratio + ',' + ratio + ')');
		// $($this.element).css('-ms-transform', 'scale(' + ratio + ',' + ratio + ')');
		// $($this.element).css('-webkit-transform', 'scale(' + ratio + ',' + ratio + ')');
		$($this.element).css('-o-transform', 'scale(' + ratio + ',' + ratio + ')');
		$($this.element).children().css('position', 'absolute');




		zoomControl.click(function () {
			if ($this.options.VIEW == 'home') {
				cloneElm = $this.newCanvas(false, $this.options.HOMEDATA.attr('imgwidth'), $this.options.HOMEDATA.attr('imgheight'));
			}

			else {
				cloneElm = $this.newCanvas(false, $this._dSlab[0][0].width, $this._dSlab[0][0].height);
			}

			var destCtx = cloneElm[0].getContext('2d');
			$("canvas", $this.element).each(function (index, value) {
				// console.log(value)
				// $('body').prepend(value)
				destCtx.drawImage(value, 0, 0);
			});

			try {
				if ($this.options.VIEW == 'home') {
					$(document).trigger('doorVisZoom', cloneElm[0], $this.options.HOMEDATA.attr('imgwidth'), $this.options.HOMEDATA.attr('imgheight'));
					$(document).trigger('doorVisZoom', cloneElm[0], $this.options.HOMEDATA.attr('imgwidth'), $this.options.HOMEDATA.attr('imgheight'));
					destCtx = null
					cloneElm = null
				}
				else {
					$(document).trigger('doorVisZoom', cloneElm[0], $this._dSlab[0][0].width, $this._dSlab[0][0].height);
					$(document).trigger('doorVisZoom', cloneElm[0], $this.options.HOMEDATA.attr('imgwidth'), $this.options.HOMEDATA.attr('imgheight'));
					destCtx = null
					cloneElm = null
				}
			}
			catch (e) { }

		});


		
		if ($this.options.doneCallback) {
			$this.options.doneCallback();
		}
	}
	/////////////////////////////////////////////////////
	// canvasLoader: Loads images onto canvas element //
	///////////////////////////////////////////////////

	function canvasLoader(el, needRebuild, buildObj, canvas, dataURL, targX, targY, clr, SWAP) {
		$('body').addClass('loader');
		// console.log('CVSLoad')
		$('#SidebarLoader').show();
		SWAP = typeof SWAP !== 'undefined' ? SWAP : true;
		var ctx = canvas[0].getContext("2d");
		imageObj = new Image();
		var url = "";
		var tempUrl = "";
		var index = String(dataURL).indexOf("http://");
		url = dataURL
		url = url.replace("gray", "bbbb");
		url = url.replace(".png", ".####");
		url = url.replace(".gif", ".@@@@");
		url = url.replace(".jpg", ".!!!!");
		if (buildObj.constructionswaprule != "" && SWAP) {
			//			console.log(url)
			var constructionSwap = String(buildObj.constructionswaprule).toLowerCase();
			//			console.log(constructionSwap)
			var constructionSplit = constructionSwap.split(',');
			url = url.replace(constructionSplit[0], constructionSplit[1]);
			//			console.log(url)
		}

		if (buildObj.colorswaprule != "" && SWAP) {
			var colorSwap = String(buildObj.colorswaprule).toLowerCase();
			var colorSplit = colorSwap.split(',');
			if (buildObj.colorswaprule != "BLK" && buildObj.productid != 170) {
				url = url.replace(colorSplit[0], colorSplit[1]);
			}

		}
		url = url.replace("bbbb", "gray");
		url = url.replace(".####", ".PNG");
		url = url.replace(".@@@@", ".gif");
		url = url.replace(".!!!!", ".jpg");
		url = url.replace("ou-d", "");
		url = url.replace("ou-m", "");
		url = url.replace("ou-d", "");
		url = url.replace("ou-m", "");


		if (index == -1) {
			if (buildObj.productid != 16 && buildObj.productid != '16') {
				url = url.replace(".jpg", ".png");
			}
			url = imgFolder + "/" + url;
		}
		else {
			url = dataURL
		}
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
			ctx.drawImage(this, targX, targY);
			if (needRebuild) {
				// console.log(url)
				// console.log('buildh2')
				el.hLoop++;
				el.buildDoor();
			}
		};
		imageObj.onerror = function () {
			errorBuild = true;
			// console.log('errBD10')
			$('#SidebarLoader').hide(); 
			$('body').removeClass('loader');		// custom change to show sidebar loader
			if (needRebuild) {
				el.hLoop++;
				el.buildDoor();
			}
			buildError();
		}
		if (url != '../../content/pimages/homeimages/undefined') {
			imageObj.crossOrigin = '';
			imageObj.src = url;
		}
	}
	// Color Image

	// Color Image

	function canvasColr(el, buildObj, canvas, dataURL, colorCode, targX, targY, clr) {

		var ctx = canvas[0].getContext("2d");
		var imageObj = new Image();
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
			ctx.drawImage(this, targX, targY);
			glassSections = Number(buildObj.glassSection) - 1;
			//alert(glassSections);
			if (glassSections > 0) {
				for (var ii = 1; ii <= glassSections; ii++) {
					ctx.drawImage(this, targX, targY + (ii * 100));
				}
			}
			if (buildObj.colorswaprule != "" && buildObj.colorswaprule != "NULL" && buildObj.colorswaprule != "G,G" && buildObj.colorswaprule != "null" && buildObj.productid != '9') {
				colrImg(el, canvas, colorCode, 180);
			}
			else if (buildObj.productid == '9') {
				// console.log(colorCode)
				// console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
				colrImg(el, canvas, colorCode, 170, false);
			}
			else {
				colrImg(el, canvas, colorCode);
			}
		}
		imageObj.onerror = function () {
			errorBuild = true;
			buildError();
		}
		var url = dataURL.replace(".jpg", ".png");
		if (buildObj.constructionswaprule != "") {
			var constructionSwap = String(buildObj.constructionswaprule).toLowerCase();
			var constructionSplit = constructionSwap.split(',');
			url = url.replace(constructionSplit[0], constructionSplit[1]);
		}
		if (buildObj.colorswaprule != "") {
			var colorSwap = String(buildObj.colorswaprule).toLowerCase();
			var colorSplit = colorSwap.split(',');
			if (buildObj.colorswaprule != "BLK" && buildObj.productid != 170) {
				url = url.replace(colorSplit[0], colorSplit[1]);
			}
		}
		url = imgFolder + "/" + url;
		url = url.replace("ou-d", "");
		url = url.replace("ou-m", "");
		imageObj.crossOrigin = '';
		imageObj.src = url;
	};

	function colrImg(el, canvas, colorCode, opac, blend) {
		//el._nogo ++


		if (typeof (opac) === 'undefined') {
			blend = true;
		}

		var ctx = canvas[0].getContext('2d');
		if (!blend) {
			var imgPixels = ctx.getImageData(0, 0, canvas[0].width, canvas[0].height);
			for (var y = 0; y < imgPixels.height; y++) {
				for (var x = 0; x < imgPixels.width; x++) {
					var i = (y * 4) * imgPixels.width + x * 4;
					var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3 - 50;
					imgPixels.data[i] = avg;
					imgPixels.data[i + 1] = avg;
					imgPixels.data[i + 2] = avg;
				}
			}
			ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);

		}


		_color = new Array();
		_color = colorCode.split(',');
		_color[3] = Math.round(_color[3] * 255);
		if (typeof (opac) === 'undefined') {
			opac = _color[3]
			_color[0] = Math.round(_color[0] * 255);
			_color[1] = Math.round(_color[1] * 255);
			_color[2] = Math.round(_color[2] * 255);
		}
		else {
			if (colorCode != 'none') {
				_color[0] = _color[0] * 2
				_color[1] = _color[1] * 2
				_color[2] = _color[2] * 2
			}
			else {
				opac = _color[3]
			}
		}

		var imdg = ctx.getImageData(0, 0, canvas[0].width, canvas[0].height);
		var pix = imdg.data;



		if (blend) {
			for (var i = 0, n = pix.length; i < n; i += 4) {
				if (pix[i + 3] > 155) {
					pix[i] = _color[0] * pix[i] / 255;
					pix[i + 1] = _color[1] * pix[i + 1] / 255;
					pix[i + 2] = _color[2] * pix[i + 2] / 255;
					pix[i + 3] = opac;
				}
			}

		} else {
			for (var i = 0, n = pix.length; i < n; i += 4) {
				if (pix[i + 3] > 155) {
					pix[i] = _color[0] * pix[i] - (_color[0] * .25);
					pix[i + 1] = _color[1] * pix[i + 1] - (_color[1] * .25);
					pix[i + 2] = _color[2] * pix[i + 2] - (_color[2] * .25);
					pix[i + 3] = opac;
				}
			}

		}

		ctx.putImageData(imdg, 0, 0);
		// console.log('bd11')
		el.buildDoor();

		try { }
		catch (e) { }
		pix = null
		color = null;

	}
	// Create & Returns Canvas
	Plugin.prototype.newCanvas = function (spewidth, w, h) {
		//function newCanvas(){
		spewidth = typeof spewidth !== 'undefined' ? spewidth : true;
		var pixLen = 110
		var pixTall = 96



		try {
			if (this.buildObj.productid != 9) {
				if (this.buildObj.doorcolumns == 3) { pixLen = 138 }
				// sufiya wo: 687813 for cypress
				if (this.buildObj.productid != 15) {
					if (this.buildObj.doorrows == 3) { pixTall = 110 }
				}
				///
				if (this.buildObj.doorrows == 5 && $.inArray(this.buildObj.productid, hasSlab) != -1) { pixTall = 99 }
			} else {
				pixTall = 126
				if (this.buildObj.doorrows == 4) { pixTall = 110 }
			}
		}
		catch (e) { }
		var imgW = this.buildObj.doorcolumns * pixLen;
		var imgH = this.buildObj.doorrows * pixTall;
		var $ctx = ""
		if (spewidth) {
			$ctx = $('<canvas style="position: absolute;"/>', {
				width: imgW,
				height: imgH
			});
			$ctx[0].setAttribute('width', imgW);
			$ctx[0].setAttribute('height', imgH);
		}
		else {
			$ctx = $('<canvas />', {
				width: w,
				height: h
			});
			$ctx[0].setAttribute('width', w);
			$ctx[0].setAttribute('height', h);
		}
		return $ctx;
	}
	// End Private Methods
	/////////////////////////////////////////////////////////////
	// PUBLIC Methods (accessible from outside this instance) //
	///////////////////////////////////////////////////////////
	var methods = {
		update: function (ths, arg) {
			$(ths).trigger('invalidBuild', arg);
		},
		view: function (ths, arg) {
			var view = arg;
			if (view == "door" || view == "home") {
				$(ths).trigger('viewChange', arg);
			}
		},
		disable: function (ths, arg) {
			$(ths).trigger('enableChange', false);
		},
		cancelXhr: function (ths, arg) {
			$(ths).trigger('cancelXhr', arg);
		},
		destroy: function (ths, arg) {
			$(ths).trigger('destroy', false);
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
		updateHome: function (ths, parms) {
			var $this = $(ths)

			var homeXml = $(params);
			$this.options.HOMEDATA = homeXml;
			$this._dHome = [$this.newCanvas(false, homeXml.attr('imgwidth'), homeXml.attr('imgheight')), 0]
			if (homeXml.attr('upload') == 'true' || homeXml.attr('imagelg') == true) {
				canvasLoader($this, false, $this.buildObj, $this._dHome[0], uploadFolder + '/' + homeXml.attr('imagelg'), 0, 0, true, false);
			}
			else {
				canvasLoader($this, false, $this.buildObj, $this._dHome[0], "homeimages/" + homeXml.attr('imagelg'), 0, 0, true, false);
			}
			if ($this.options.build != null) {
				if ($this.options.ENABLE) {
					$this.cN = (homeXml == $this.options.HOMEDATA) ? $this.cN : -99
					$this.options.HOMEDATA = homeXml;
					$this.buildDoor();
				}
				else {
					logprint("Disabled", $this);
				}
			}
			else {
				logprint("Awaiting Door Object", $this);
			}
		}
	};
	// End Public Methods
	// encapsulate all of methods in the plugin's parent closure above
	$.fn.DoorVisualization = function (method) {
		var args = arguments;
		var $this = this;
		if (methods[method]) {
			return methods[method]($this, Array.prototype.slice.call(arguments, 1));
		}
		else if (typeof method === 'object' || !method) {
			if (!$.data($this, 'plugin_' + pluginName)) {
				$.data($this, 'plugin_' + pluginName, new Plugin($this, method));
			}
		}
		else {
			$.error('Method ' + method + ' does not exist on jQuery.plugin');
		}
	};
	// Enviromental tools
	// Shadow /////////////////////////////////////////////////////////////////
	var ShadowImage = function (element, image, opac) {
		this.image = $(image)[0];
		this.opac = (opac + 100) * .00035
		this.element = $(element)[0];
		this.element.width = this.image.width;
		this.element.height = this.image.height;
		this.context = this.element.getContext("2d");
		this.context.globalAlpha = this.opac
		this.context.drawImage(this.image, 0, 0);
	};
	ShadowImage.prototype = {
		/**
		 * Runs a BlackRemoval filter over the image to remove windows. *
		 * @param {int} passes balckout limit.
		 */
		blackremoval: function (limit) {
			var pixels = this.context.getImageData(0, 0, this.element.width, this.element.height);
			var d = pixels.data;
			for (var i = 0; i < d.length; i += 4) {
				var r = d[i];
				var g = d[i + 1];
				var b = d[i + 2];
				if (r < limit && g < limit && b < limit) {
					var v = 150;
					d[i] = d[i + 1] = d[i + 2] = v;
				}
			}
			this.context.clearRect(0, 0, this.element.width, this.element.height);
			this.context.globalAlpha = this.opac
			this.context.putImageData(pixels, 0, 0);
		},
		/**
		 * Runs a Threshold filter over the image.
		 *
		 * @param {int} passes threshold limit.
		 */
		threshold: function (limit) {
			var pixels = this.context.getImageData(0, 0, this.element.width, this.element.height);
			var d = pixels.data;
			for (var i = 0; i < d.length; i += 4) {
				var r = d[i];
				var g = d[i + 1];
				var b = d[i + 2];
				var v = (0.2126 * r + 0.7152 * g + 0.0722 * b >= limit) ? 255 : 0;
				d[i] = d[i + 1] = d[i + 2] = v
			}
			this.context.globalAlpha = this.opac
			this.context.putImageData(pixels, 0, 0);
		},
		/**
		 * Runs a blur filter over the image.
		 *
		 * @param {int} passes Number of times the blur filter should run.
		 */
		blur: function (passes) {
			var i, x, y;
			this.context.globalAlpha = this.opac * .25
			// Loop for each blur pass.
			for (i = 1; i <= passes; i += 1) {
				for (y = -1; y < 3; y += 1) {
					for (x = 0; x < 3; x += 1) {
						this.context.drawImage(this.element, x, y);
					}
				}
			}
		},
		/**
		 * Applys Layer Mode to Canvas.
		 */
		dumpColor: function (mode, color) {
			switch (mode) {
				case '>':
					var pixels = this.context.getImageData(0, 0, this.element.width, this.element.height);
					var d = pixels.data;
					for (var i = 0; i < d.length; i += 4) {
						if (d[i] > color[0] && d[i + 1] > color[1] && d[i + 2] > color[2]) {
							d[i + 3] = 0;
						}
					}
					this.context.globalAlpha = this.opac
					this.context.putImageData(pixels, 0, 0);
					break;
				case '<':
					var pixels = this.context.getImageData(0, 0, this.element.width, this.element.height);
					var d = pixels.data;
					for (var i = 0; i < d.length; i += 4) {
						if (d[i] < color[0] && d[i + 1] < color[1] && d[i + 2] < color[2]) {
							d[i + 3] = 0;
						}
					}
					this.context.globalAlpha = this.opac
					this.context.putImageData(pixels, 0, 0);
					break;
				case '=':
					var pixels = this.context.getImageData(0, 0, this.element.width, this.element.height);
					var d = pixels.data;
					for (var i = 0; i < d.length; i += 4) {
						if (d[i] == color[0] && d[i + 1] == color[1] && d[i + 2] == color[2]) {
							d[i + 3] = 0;
						}
					}
					this.context.globalAlpha = this.opac
					this.context.putImageData(pixels, 0, 0);
					break;
			}
		}
		//END
	};
	// TREE SAVER //////////////////////////////////////////
	var TreeSaverImage = function (element, image) {
		this.image = $(image)[0];
		this.element = $(element)[0];
		this.element.width = this.image.width;
		this.element.height = this.image.height;
		this.context = this.element.getContext("2d");
		this.context.drawImage(this.image, 0, 0);
	};
	TreeSaverImage.prototype = {
		/**
		 * Puts Trees back into image
		 */
		replaceTrees: function (tolernce, clr) {
			var pixels = this.context.getImageData(0, 0, this.element.width, this.element.height);
			var d = pixels.data;
			for (var i = 0; i < d.length; i += 4) {
				var r = d[i];
				var g = d[i + 1];
				var b = d[i + 2];
				if (clr != 'R') {
					if (g > tolernce) {
						d[i + 3] = 0;
					}
					else {
						// keep other colors from appearing
						if (b > (g * 1.15) || r > g) {
							d[i + 3] = 0;
						}
					}
				}
				else {
					if (r > tolernce) {
						d[i + 3] = 0;
					}
					else {
						// keep other colors from appearing
						if (b > (r * 1.15) || g > r) {
							d[i + 3] = 0;
						}
					}
				}
			}
			this.context.clearRect(0, 0, this.element.width, this.element.height);
			this.context.putImageData(pixels, 0, 0);
		},
		/**
		 * Runs a blur filter over the image.
		 *
		 * @param {int} passes Number of times the blur filter should run.
		 */
		blur: function (passes) {
			var i, x, y;

			this.context.globalAlpha = 0.125;
			// Loop for each blur pass.
			for (i = 1; i <= passes; i += 1) {
				for (y = -1; y < 1; y += 1) {
					for (x = -1; x < 1; x += 1) {
						this.context.drawImage(this.element, x, y);
					}
				}
			}
			this.context.globalAlpha = 1.0;
		},
		//END
	};

	function manageAJAX(ajArr, mXc) {
		var ready = false;
		iQue = 0; // incomplete count
		var que = ajArr.length
		if (que > mXc) {
			for (var i = 0; i < que; i++) {
				var xhr = ajArr[i];
				if (xhr && xhr.readystate != 4) {
					iQue++
				}
				if (iQue > mXc) {
					ready = false;
					break;

				}
			}
		}
		else {
			ready = true; //not enough que to limit
		}
		return ready
	}


	function manageAJAXD(ajArr, mXc) {
		var ready = true;

		var que = ajArr.length

		for (var i = 0; i < que; i++) {
			var xhr = ajArr[i];
			if (xhr && xhr.readystate != 4) {
				ready = false;
			}
		}


		return ready
	}

}(jQuery, window));