(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("image-q"));
	else if(typeof define === 'function' && define.amd)
		define("app", ["image-q"], factory);
	else if(typeof exports === 'object')
		exports["app"] = factory(require("image-q"));
	else
		root["app"] = factory(root["image-q"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	///<reference path="../lib/webix/webix.d.ts"/>
	var ui_1 = __webpack_require__(1);
	var leftPanel_1 = __webpack_require__(4);
	var rightPanel_1 = __webpack_require__(8);
	webix.ready(function () {
	    webix.ui({
	        type: "line",
	        cols: [
	            {
	                width: 500,
	                header: "Settings & Folders", headerHeight: 45,
	                body: leftPanel_1.leftPanel
	            },
	            { view: "resizer" },
	            rightPanel_1.rightPanel
	        ]
	    });
	    ui_1.initialize();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var usage_1 = __webpack_require__(2);
	var quantizeResult = null;
	function initialize() {
	    document.body.ondrop = function (event) {
	        event.preventDefault();
	        var files = event.dataTransfer.files;
	        for (var i = 0; i < files.length; i++) {
	            processDrag(files[i]);
	        }
	        //readfiles(event.dataTransfer.files);
	        console.log(event);
	    };
	    document.body.ondragover = function (event) {
	        event.preventDefault();
	    };
	}
	exports.initialize = initialize;
	function update(quantize) {
	    if (quantize) {
	        var imageFoldersControl = $$("image");
	        var selectedId = imageFoldersControl.getSelectedId(true);
	        if (selectedId.length > 0) {
	            var node = imageFoldersControl.getItemNode(selectedId[0]);
	            if (node) {
	                var img = node.firstElementChild;
	                if (img.tagName === "IMG") {
	                    var colors = parseInt($$("option-colors").getValue(), 10), paletteQuantizerMethod = parseInt($$("option-palette").getValue(), 10), imageQuantizerMethod = parseInt($$("option-image").getValue(), 10) - 2, colorDistanceMethod = parseInt($$("option-distance").getValue(), 10);
	                    quantizeResult = (new usage_1.QuantizationUsage()).quantize(img, colors, paletteQuantizerMethod, imageQuantizerMethod, colorDistanceMethod);
	                }
	            }
	        }
	    }
	    if (quantizeResult) {
	        fillClickToCompare(quantizeResult);
	        fillOriginalVsQuantized(quantizeResult);
	    }
	}
	exports.update = update;
	function fillOriginalVsQuantized(result) {
	    var prefix = "id-imageView2-";
	    // CLEANUP
	    //container.innerHTML = "";
	    $$("imageView2-statistics").getNode().firstElementChild.innerHTML = " (SSIM: " + result.ssim.toFixed(2) + ", Time: " + result.time + " )";
	    // DRAW ORIGINAL IMAGE
	    var canvas = usage_1.QuantizationUsage.drawPixels(result.original, result.original.getWidth());
	    canvas.id = prefix + "original-image";
	    canvas.className = "image-semi-transparent-background";
	    //canvas.style.display = "none";
	    var container = $$("imageView2-image-original").getNode().firstElementChild;
	    container.innerHTML = "";
	    container.appendChild(canvas);
	    // DRAW REDUCED/DITHERED IMAGE
	    canvas = usage_1.QuantizationUsage.drawPixels(result.image, result.image.getWidth());
	    canvas.id = prefix + "reduced-image";
	    canvas.className = "image-semi-transparent-background";
	    container = $$("imageView2-image-quantized").getNode().firstElementChild;
	    container.innerHTML = "";
	    container.appendChild(canvas);
	    // DRAW PALETTE
	    canvas = usage_1.QuantizationUsage.drawPixels(result.palette.getPointContainer(), 16, 128);
	    container = $$("imageView2-palette").getNode().firstElementChild;
	    container.innerHTML = "";
	    container.appendChild(canvas);
	}
	function fillClickToCompare(result) {
	    var prefix = "id-imageView2-";
	    // CLEANUP
	    $$("imageView1-statistics").getNode().firstElementChild.innerHTML = " (SSIM: " + result.ssim.toFixed(2) + ", Time: " + result.time + " )";
	    // DRAW ORIGINAL IMAGE
	    var canvasOriginal = usage_1.QuantizationUsage.drawPixels(result.original, result.original.getWidth());
	    canvasOriginal.id = prefix + "original-image";
	    canvasOriginal.className = "image-semi-transparent-background";
	    canvasOriginal.style.display = "none";
	    var container = $$("imageView1-image").getNode().firstElementChild;
	    container.innerHTML = "";
	    container.appendChild(canvasOriginal);
	    // DRAW REDUCED/DITHERED IMAGE
	    var canvasReduced = usage_1.QuantizationUsage.drawPixels(result.image, result.image.getWidth());
	    canvasReduced.id = prefix + "reduced-image";
	    canvasReduced.className = "image-semi-transparent-background";
	    container = $$("imageView1-image").getNode().firstElementChild;
	    container.appendChild(canvasReduced);
	    // Add Container handlers
	    container.onmousedown = function () {
	        canvasOriginal.style.display = "";
	        canvasReduced.style.display = "none";
	    };
	    container.onmouseup = function () {
	        canvasOriginal.style.display = "none";
	        canvasReduced.style.display = "";
	    };
	    // DRAW PALETTE
	    var canvasPalette = usage_1.QuantizationUsage.drawPixels(result.palette.getPointContainer(), 16, 128);
	    container = $$("imageView1-palette").getNode().firstElementChild;
	    container.innerHTML = "";
	    container.appendChild(canvasPalette);
	}
	function processDrag(file) {
	    var reader = new FileReader();
	    reader.onload = function (event) {
	        $$("image").add({
	            id: 'image-' + file.name,
	            dataUrl: event.target.result
	        });
	    };
	    reader.readAsDataURL(file);
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var iq = __webpack_require__(3);
	var QuantizationUsage = /** @class */ (function () {
	    function QuantizationUsage() {
	    }
	    QuantizationUsage.drawPixels = function (pointContainer, width0, width1) {
	        var idxi8 = pointContainer.toUint8Array(), idxi32 = new Uint32Array(idxi8.buffer);
	        width1 = width1 || width0;
	        var can = document.createElement("canvas"), can2 = document.createElement("canvas"), ctx = can.getContext("2d"), ctx2 = can2.getContext("2d");
	        can.width = width0;
	        can.height = Math.ceil(idxi32.length / width0);
	        can2.width = width1;
	        can2.height = Math.ceil(can.height * width1 / width0);
	        ctx.imageSmoothingEnabled = ctx.mozImageSmoothingEnabled = ctx.webkitImageSmoothingEnabled = ctx.msImageSmoothingEnabled = false;
	        ctx2.imageSmoothingEnabled = ctx2.mozImageSmoothingEnabled = ctx2.webkitImageSmoothingEnabled = ctx2.msImageSmoothingEnabled = false;
	        var imgd = ctx.createImageData(can.width, can.height);
	        if (QuantizationUsage._typeOf(imgd.data) == "CanvasPixelArray") {
	            var data = imgd.data;
	            for (var i = 0, len = data.length; i < len; ++i) {
	                data[i] = idxi8[i];
	            }
	        }
	        else {
	            var buf32 = new Uint32Array(imgd.data.buffer);
	            buf32.set(idxi32);
	        }
	        ctx.putImageData(imgd, 0, 0);
	        ctx2.drawImage(can, 0, 0, can2.width, can2.height);
	        return can2;
	    };
	    QuantizationUsage._typeOf = function (val) {
	        return Object.prototype.toString.call(val).slice(8, -1);
	    };
	    QuantizationUsage.prototype._timeMark = function (title, callback) {
	        var start = Date.now();
	        callback();
	        console.log(title + ": " + (Date.now() - start));
	    };
	    QuantizationUsage.prototype._baseName = function (src) {
	        return src.split("/").pop().split(".");
	    };
	    QuantizationUsage.prototype.quantize = function (img, optionColors, optionPaletteQuantizer, optionImageDithering, optionColorDistance) {
	        var _this = this;
	        var pointBuffer, originalPointBuffer, paletteQuantizer, id = this._baseName(img.src)[0], palette, image;
	        pointBuffer = iq.utils.PointContainer.fromHTMLImageElement(img);
	        originalPointBuffer = pointBuffer.clone();
	        var time = Date.now();
	        console.log("image = " + id);
	        this._timeMark("...sample", function () {
	            var distance = _this._getColorDistanceCalculator(optionColorDistance);
	            switch (optionPaletteQuantizer) {
	                case 1:
	                    paletteQuantizer = new iq.palette.NeuQuant(distance, optionColors);
	                    break;
	                case 2:
	                    paletteQuantizer = new iq.palette.RGBQuant(distance, optionColors);
	                    break;
	                case 3:
	                    paletteQuantizer = new iq.palette.WuQuant(distance, optionColors);
	                    break;
	                case 4:
	                    paletteQuantizer = new iq.palette.NeuQuantFloat(distance, optionColors);
	                    break;
	            }
	            paletteQuantizer.sample(pointBuffer);
	        });
	        this._timeMark("...palette", function () {
	            palette = paletteQuantizer.quantize();
	        });
	        this._timeMark("...dither", function () {
	            var distance = _this._getColorDistanceCalculator(optionColorDistance);
	            var imageQuantizer;
	            if (optionImageDithering === -1) {
	                imageQuantizer = new iq.image.NearestColor(distance);
	            }
	            else if (optionImageDithering === 9) {
	                imageQuantizer = new iq.image.ErrorDiffusionRiemersma(distance);
	            }
	            else {
	                imageQuantizer = new iq.image.ErrorDiffusionArray(distance, optionImageDithering, true, 0, false);
	            }
	            image = imageQuantizer.quantize(pointBuffer, palette);
	        });
	        time = Date.now() - time;
	        var ssim = new iq.quality.SSIM().compare(originalPointBuffer, pointBuffer);
	        this._checkImageAndPalette(image, palette, optionColors);
	        return {
	            original: originalPointBuffer,
	            image: image,
	            palette: palette,
	            time: time,
	            ssim: ssim
	        };
	    };
	    QuantizationUsage.prototype._getColorDistanceCalculator = function (option) {
	        switch (option) {
	            case 1:
	                return new iq.distance.Euclidean();
	            case 2:
	                return new iq.distance.Manhattan();
	            case 3:
	                return new iq.distance.CIEDE2000();
	            case 4:
	                return new iq.distance.CIE94Textiles();
	            case 5:
	                return new iq.distance.CIE94GraphicArts();
	            case 6:
	                return new iq.distance.EuclideanRGBQuantWOAlpha();
	            case 7:
	                return new iq.distance.EuclideanRGBQuantWithAlpha();
	            case 8:
	                return new iq.distance.ManhattanSRGB();
	            case 9:
	                return new iq.distance.CMETRIC();
	            case 10:
	                return new iq.distance.PNGQUANT();
	            case 11:
	                return new iq.distance.ManhattanNommyde();
	        }
	    };
	    QuantizationUsage.prototype._checkImageAndPalette = function (image, palette, colors) {
	        // check palette
	        if (palette.getPointContainer().getPointArray().length > colors) {
	            throw new Error("Palette contains more colors than allowed");
	        }
	        // check image
	        image.getPointArray().forEach(function (point) {
	            if (!palette.has(point)) {
	                throw new Error("Image contains color not in palette: " + point.r + "," + point.g + "," + point.b + "," + point.a);
	            }
	        });
	    };
	    return QuantizationUsage;
	}());
	exports.QuantizationUsage = QuantizationUsage;


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var configForm_1 = __webpack_require__(5);
	var imageFileExplorer_1 = __webpack_require__(6);
	exports.leftPanel = {
	    type: "line",
	    rows: [
	        configForm_1.configForm,
	        { type: "header", template: "Image Folder" },
	        imageFileExplorer_1.imageFoldersPanel
	    ]
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var ui_1 = __webpack_require__(1);
	exports.configForm = {
	    view: "form", id: "myform", width: 300, elements: [
	        {
	            view: "richselect",
	            id: "option-colors",
	            label: "Colors",
	            labelWidth: 175,
	            value: "256",
	            options: [
	                "2",
	                "4",
	                "16",
	                "64",
	                "128",
	                "256",
	                "512",
	                "1024",
	                "2048",
	                "8192"
	            ]
	        },
	        {
	            view: "richselect",
	            id: "option-distance",
	            label: "Color Distance Equation",
	            labelWidth: 175,
	            value: "2",
	            options: [
	                { id: 1, value: "Euclidean" },
	                { id: 2, value: "Manhattan" },
	                { id: 3, value: "CIEDE2000" },
	                { id: 4, value: "CIE94Textiles" },
	                { id: 5, value: "CIE94GraphicArts" },
	                { id: 6, value: "RgbQuant Euclidean (w/o ALPHA)" },
	                { id: 7, value: "RgbQuant Euclidean (with Alpha)" },
	                { id: 8, value: "Manhattan (with sRGB coefficients)" },
	                { id: 9, value: "CMETRIC" },
	                { id: 10, value: "PNGQUANT" },
	                { id: 11, value: "Manhattan Nommyde" }
	            ]
	        },
	        {
	            view: "richselect",
	            id: "option-palette",
	            label: "Quantization Method",
	            labelWidth: 175,
	            value: "1",
	            options: [
	                { id: 1, value: "neuquant (Original, Integer)" },
	                { id: 2, value: "rgbquant" },
	                { id: 3, value: "wuquant" },
	                { id: 4, value: "neuquant (Floating Point)" }
	            ]
	        },
	        {
	            view: "richselect",
	            id: "option-image",
	            label: "Palette-to-Image Method",
	            labelWidth: 175,
	            value: "1",
	            options: [
	                { id: 1, value: "Nearest (Simple)" },
	                { id: 2, value: "ErrorDiffusion: Array (Floyd-Steinberg)" },
	                { id: 4, value: "ErrorDiffusion: Array (Stucki)" },
	                { id: 5, value: "ErrorDiffusion: Array (Atkinson)" },
	                { id: 6, value: "ErrorDiffusion: Array (Jarvis)" },
	                { id: 7, value: "ErrorDiffusion: Array (Burkes)" },
	                { id: 8, value: "ErrorDiffusion: Array (Sierra)" },
	                { id: 9, value: "ErrorDiffusion: Array (TwoSierra)" },
	                { id: 10, value: "ErrorDiffusion: Array (SierraLite)" },
	                { id: 3, value: "ErrorDiffusion: Array (False Floyd-Steinberg)" },
	                { id: 11, value: "ErrorDiffusion: Riemersma (Hilbert Curve)" }
	            ]
	        },
	        {
	            type: "line",
	            view: "toolbar",
	            elements: [{}, {
	                    view: "button", value: "Update", width: 90, on: {
	                        onItemClick: function () {
	                            ui_1.update(true);
	                        }
	                    }
	                }]
	        }
	    ]
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var imageList_1 = __webpack_require__(7);
	var ui_1 = __webpack_require__(1);
	exports.imageFoldersPanel = {
	    id: "image",
	    view: "grouplist",
	    type: {
	        height: 84
	    },
	    //autoheight : true,
	    //height : 800,
	    template: function (obj) {
	        if (obj.dataUrl) {
	            return "<img style=\"height: 84px\" src=\"" + obj.dataUrl + "\"/>";
	        }
	        else if (obj.folder && obj.file) {
	            return "<img style=\"height: 84px\" src=\"images/" + obj.folder + "/" + obj.file + "\"/>";
	        }
	        else {
	            return "<div style=\"line-height: 84px\">" + obj.value + "</div>";
	        }
	    },
	    select: true,
	    //scroll : false,
	    data: imageList_1.imageData,
	    on: {
	        "onafterselect": function (id) {
	            ui_1.update(true);
	        }
	    },
	    ready: function () {
	        //this.select(0);
	    }
	    /*
	     select:true,
	     on:{ "onafterselect":country_selected },
	     type:{ height: 84 },
	     ready:function(){  //select USA
	     this.select(6);
	     }
	     */
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var imageList = {
	    "alpha": [
	        "children-745674_1920.png",
	        "alpha.png",
	        "AlphaBall.png",
	        "AlphaEdge.png",
	        "alphatest.png",
	        "cherries-realistic.png",
	        "dice-trans.png",
	        "pnggrad16rgba.png",
	        "tumblr_moyw62RyQo1s5jjtzo1_500.png",
	        "Wilber-huge-alpha.png"
	    ],
	    "gradients": [
	        "colorpan2.png",
	        "dithgrads.png",
	        "grad_default.png",
	        "grad.png",
	        "grad5.png",
	        "grad6.png",
	        "grad7.png",
	        "grad8.png",
	        "pnggrad8rgb.png",
	        "sculptmap.png"
	    ],
	    "graphics": [
	        "baseball.jpg",
	        "bebop.jpg",
	        "minecraft.png",
	        "penguins.png",
	        "pool.png",
	        "rose.png",
	        "smb3.png",
	        "super1.png",
	        "super2.png"
	    ],
	    "photos1": [
	        "biking.jpg",
	        "bluff.jpg",
	        "cloudplane.jpg",
	        "compcube.jpg",
	        "fishie2.jpg",
	        "kitteh1.jpg",
	        "medusa.jpg",
	        "pheasant.jpg",
	        "photoman.jpg",
	        "rainbow.jpg",
	        "redpanda.jpg"
	    ],
	    "photos2": [
	        "book-shelf-349934_1920.jpg",
	        "children-602977_1920.png",
	        "old-books-436498_1920.png",
	        "pens-93177_1920.png",
	        "baby.jpg",
	        "chopsuey.jpg",
	        "fish.jpg",
	        "kitteh2.jpg",
	        "quantfrog.png",
	        "treefrog.jpg",
	        "quantfrog_small.png"
	    ]
	};
	var result = [];
	for (var folder in imageList) {
	    if (imageList.hasOwnProperty(folder)) {
	        var folderData = {
	            id: "image-list-" + folder,
	            open: true,
	            value: folder,
	            data: []
	        };
	        imageList[folder].forEach(function (file) {
	            folderData.data.push({
	                file: file,
	                folder: folder,
	                id: "image-list-" + folder + "-" + file
	            });
	        });
	        result.push(folderData);
	    }
	}
	exports.imageData = result;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var clickToCompare_1 = __webpack_require__(9);
	var originalVsQuantized_1 = __webpack_require__(10);
	var Controller = __webpack_require__(1);
	exports.rightPanel = {
	    view: "tabview", gravity: 3,
	    tabbar: {
	        optionWidth: 200, value: "clickToCompare", options: [
	            { value: 'Click-to-Compare', id: 'clickToCompare' },
	            { value: 'Original-vs-Quantized', id: 'originalVsQuantized' }
	        ],
	        on: {
	            onAfterTabClick: function (id) {
	                Controller.update(false);
	            }
	        }
	    },
	    cells: [
	        clickToCompare_1.quantizedImageClickToCompare,
	        originalVsQuantized_1.quantizedImageOriginalVsQuantized,
	    ]
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.quantizedImageClickToCompare = {
	    id: "clickToCompare",
	    rows: [
	        {
	            id: "imageView1-statistics",
	            view: "template",
	            height: 30
	        },
	        {
	            cols: [
	                {
	                    rows: [
	                        {
	                            type: "header",
	                            template: "Palette"
	                        },
	                        {
	                            id: "imageView1-palette",
	                            width: 140,
	                            view: "template"
	                        }
	                    ]
	                },
	                {
	                    rows: [
	                        {
	                            type: "header",
	                            template: "Image"
	                        },
	                        {
	                            id: "imageView1-image",
	                            view: "template"
	                        }
	                    ]
	                }
	            ]
	        }
	    ]
	    //view : "template"
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.quantizedImageOriginalVsQuantized = {
	    id: "originalVsQuantized",
	    rows: [
	        {
	            id: "imageView2-statistics",
	            view: "template",
	            height: 30
	        },
	        {
	            cols: [
	                {
	                    rows: [
	                        {
	                            type: "header",
	                            template: "Palette"
	                        },
	                        {
	                            id: "imageView2-palette",
	                            width: 140,
	                            view: "template"
	                        }
	                    ]
	                },
	                {
	                    rows: [
	                        {
	                            type: "header",
	                            template: "Original Image"
	                        },
	                        {
	                            id: "imageView2-image-original",
	                            view: "template"
	                        }
	                    ]
	                },
	                {
	                    rows: [
	                        {
	                            type: "header",
	                            template: "Quantized Image"
	                        },
	                        {
	                            id: "imageView2-image-quantized",
	                            view: "template"
	                        }
	                    ]
	                }
	            ]
	        }
	    ]
	};


/***/ }
/******/ ])
});
;
//# sourceMappingURL=app.js.map