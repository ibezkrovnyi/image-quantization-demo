/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../lib/webix/webix.d.ts"/>
var ui_1 = __webpack_require__(0);
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

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
            palette = paletteQuantizer.quantizeSync();
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
            image = imageQuantizer.quantizeSync(pointBuffer, palette);
        });
        time = Date.now() - time;
        var ssim = iq.quality.ssim(originalPointBuffer, pointBuffer);
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
                return new iq.distance.EuclideanBT709NoAlpha();
            case 7:
                return new iq.distance.EuclideanBT709();
            case 8:
                return new iq.distance.ManhattanBT709();
            case 9:
                return new iq.distance.CMetric();
            case 10:
                return new iq.distance.PNGQuant();
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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

(function() { module.exports = window["image-q"]; }());

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ui_1 = __webpack_require__(0);
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
                { id: 4, value: "CIE94 Textiles" },
                { id: 5, value: "CIE94 GraphicArts" },
                { id: 6, value: "Euclidean BT709 NoAlpha <-- default for RGBQuant" },
                { id: 7, value: "Euclidean BT709" },
                { id: 8, value: "Manhattan BT709" },
                { id: 9, value: "CMetric" },
                { id: 10, value: "PNGQuant" },
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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var imageList_1 = __webpack_require__(7);
var ui_1 = __webpack_require__(0);
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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var clickToCompare_1 = __webpack_require__(9);
var originalVsQuantized_1 = __webpack_require__(10);
var Controller = __webpack_require__(0);
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


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2M1YTc4MzM0MTQ0YzFiMjM1NjEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXIvdWkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbGxlci91c2FnZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJpbWFnZS1xXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2xlZnRQYW5lbC9sZWZ0UGFuZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2xlZnRQYW5lbC9jb25maWdGb3JtLnRzIiwid2VicGFjazovLy8uL3NyYy91aS9sZWZ0UGFuZWwvaW1hZ2VGaWxlRXhwbG9yZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RhdGEvaW1hZ2VMaXN0LnRzIiwid2VicGFjazovLy8uL3NyYy91aS9yaWdodFBhbmVsL3JpZ2h0UGFuZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL3JpZ2h0UGFuZWwvY2xpY2tUb0NvbXBhcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL3JpZ2h0UGFuZWwvb3JpZ2luYWxWc1F1YW50aXplZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REEscUNB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a0I7NEJBQ3pCLElBQUksRUFBRyxVQUFVO3lCQUNqQjtxQkFDRDtpQkFDRDthQUNEO1NBQ0Q7S0FFRDtJQUVELG1CQUFtQjtDQUNuQixDQUFDOzs7Ozs7Ozs7O0FDMUNTLHlDQUFpQyxHQUFHO0lBQzlDLEVBQUUsRUFBSyxxQkFBcUI7SUFDNUIsSUFBSSxFQUFHO1FBQ047WUFDQyxFQUFFLEVBQU8sdUJBQXVCO1lBQ2hDLElBQUksRUFBSyxVQUFVO1lBQ25CLE1BQU0sRUFBRyxFQUFFO1NBQ1g7UUFDRDtZQUNDLElBQUksRUFBRztnQkFDTjtvQkFDQyxJQUFJLEVBQUc7d0JBQ047NEJBQ0MsSUFBSSxFQUFPLFFBQVE7NEJBQ25CLFFBQVEsRUFBRyxTQUFTO3lCQUNwQjt3QkFDRDs0QkFDQyxFQUFFLEVBQU0sb0JBQW9COzRCQUM1QixLQUFLLEVBQUcsR0FBRzs0QkFDWCxJQUFJLEVBQUksVUFBVTt5QkFDbEI7cUJBQ0Q7aUJBQ0Q7Z0JBQ0Q7b0JBQ0MsSUFBSSxFQUFHO3dCQUNOOzRCQUNDLElBQUksRUFBTyxRQUFROzRCQUNuQixRQUFRLEVBQUcsZ0JBQWdCO3lCQUMzQjt3QkFDRDs0QkFDQyxFQUFFLEVBQUssMkJBQTJCOzRCQUNsQyxJQUFJLEVBQUcsVUFBVTt5QkFDakI7cUJBQ0Q7aUJBQ0Q7Z0JBQ0Q7b0JBQ0MsSUFBSSxFQUFHO3dCQUNOOzRCQUNDLElBQUksRUFBTyxRQUFROzRCQUNuQixRQUFRLEVBQUcsaUJBQWlCO3lCQUM1Qjt3QkFDRDs0QkFDQyxFQUFFLEVBQUssNEJBQTRCOzRCQUNuQyxJQUFJLEVBQUcsVUFBVTt5QkFDakI7cUJBQ0Q7aUJBQ0Q7YUFDRDtTQUNEO0tBQ0Q7Q0FDRCxDQUFDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDdjNWE3ODMzNDE0NGMxYjIzNTYxIiwiaW1wb3J0IHtRdWFudGl6YXRpb25Vc2FnZX0gZnJvbSBcIi4vdXNhZ2VcIjtcblxudmFyIHF1YW50aXplUmVzdWx0ID0gbnVsbDtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG5cdGRvY3VtZW50LmJvZHkub25kcm9wID0gZXZlbnQ9PiB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdHZhciBmaWxlcyA9IGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcztcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRwcm9jZXNzRHJhZyhmaWxlc1sgaSBdKTtcblx0XHR9XG5cdFx0Ly9yZWFkZmlsZXMoZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzKTtcblx0XHRjb25zb2xlLmxvZyhldmVudCk7XG5cdH07XG5cblx0ZG9jdW1lbnQuYm9keS5vbmRyYWdvdmVyID0gZXZlbnQ9PiB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZShxdWFudGl6ZSA6IGJvb2xlYW4pIHtcblx0aWYgKHF1YW50aXplKSB7XG5cdFx0dmFyIGltYWdlRm9sZGVyc0NvbnRyb2wgPSAoPHdlYml4LnVpLmdyb3VwbGlzdD4kJChcImltYWdlXCIpKTtcblx0XHR2YXIgc2VsZWN0ZWRJZCAgICAgICAgICA9IGltYWdlRm9sZGVyc0NvbnRyb2wuZ2V0U2VsZWN0ZWRJZCh0cnVlKTtcblx0XHRpZiAoc2VsZWN0ZWRJZC5sZW5ndGggPiAwKSB7XG5cdFx0XHR2YXIgbm9kZSA9IGltYWdlRm9sZGVyc0NvbnRyb2wuZ2V0SXRlbU5vZGUoc2VsZWN0ZWRJZFsgMCBdKTtcblx0XHRcdGlmIChub2RlKSB7XG5cdFx0XHRcdHZhciBpbWcgOiBIVE1MSW1hZ2VFbGVtZW50ID0gKDxhbnk+bm9kZSkuZmlyc3RFbGVtZW50Q2hpbGQ7XG5cblx0XHRcdFx0aWYgKGltZy50YWdOYW1lID09PSBcIklNR1wiKSB7XG5cdFx0XHRcdFx0dmFyIGNvbG9ycyAgICAgICAgICAgICAgICAgPSBwYXJzZUludCgoPHdlYml4LnVpLnJpY2hzZWxlY3Q+JCQoXCJvcHRpb24tY29sb3JzXCIpKS5nZXRWYWx1ZSgpLCAxMCksXG5cdFx0XHRcdFx0XHRwYWxldHRlUXVhbnRpemVyTWV0aG9kID0gcGFyc2VJbnQoKDx3ZWJpeC51aS5yaWNoc2VsZWN0PiQkKFwib3B0aW9uLXBhbGV0dGVcIikpLmdldFZhbHVlKCksIDEwKSxcblx0XHRcdFx0XHRcdGltYWdlUXVhbnRpemVyTWV0aG9kICAgPSBwYXJzZUludCgoPHdlYml4LnVpLnJpY2hzZWxlY3Q+JCQoXCJvcHRpb24taW1hZ2VcIikpLmdldFZhbHVlKCksIDEwKSAtIDIsXG5cdFx0XHRcdFx0XHRjb2xvckRpc3RhbmNlTWV0aG9kICAgID0gcGFyc2VJbnQoKDx3ZWJpeC51aS5yaWNoc2VsZWN0PiQkKFwib3B0aW9uLWRpc3RhbmNlXCIpKS5nZXRWYWx1ZSgpLCAxMCk7XG5cblx0XHRcdFx0XHRxdWFudGl6ZVJlc3VsdCA9IChuZXcgUXVhbnRpemF0aW9uVXNhZ2UoKSkucXVhbnRpemUoaW1nLCBjb2xvcnMsIHBhbGV0dGVRdWFudGl6ZXJNZXRob2QsIGltYWdlUXVhbnRpemVyTWV0aG9kLCBjb2xvckRpc3RhbmNlTWV0aG9kKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmIChxdWFudGl6ZVJlc3VsdCkge1xuXHRcdGZpbGxDbGlja1RvQ29tcGFyZShxdWFudGl6ZVJlc3VsdCk7XG5cdFx0ZmlsbE9yaWdpbmFsVnNRdWFudGl6ZWQocXVhbnRpemVSZXN1bHQpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGZpbGxPcmlnaW5hbFZzUXVhbnRpemVkKHJlc3VsdCkge1xuXHR2YXIgcHJlZml4ID0gXCJpZC1pbWFnZVZpZXcyLVwiO1xuXHQvLyBDTEVBTlVQXG5cdC8vY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cdCQkKFwiaW1hZ2VWaWV3Mi1zdGF0aXN0aWNzXCIpLmdldE5vZGUoKS5maXJzdEVsZW1lbnRDaGlsZC5pbm5lckhUTUwgPSBcIiAoU1NJTTogXCIgKyByZXN1bHQuc3NpbS50b0ZpeGVkKDIpICsgXCIsIFRpbWU6IFwiICsgcmVzdWx0LnRpbWUgKyBcIiApXCI7XG5cblx0Ly8gRFJBVyBPUklHSU5BTCBJTUFHRVxuXHR2YXIgY2FudmFzICAgICAgICAgID0gUXVhbnRpemF0aW9uVXNhZ2UuZHJhd1BpeGVscyhyZXN1bHQub3JpZ2luYWwsIHJlc3VsdC5vcmlnaW5hbC5nZXRXaWR0aCgpKTtcblx0Y2FudmFzLmlkICAgICAgICAgICA9IHByZWZpeCArIFwib3JpZ2luYWwtaW1hZ2VcIjtcblx0Y2FudmFzLmNsYXNzTmFtZSAgICA9IFwiaW1hZ2Utc2VtaS10cmFuc3BhcmVudC1iYWNrZ3JvdW5kXCI7XG5cdC8vY2FudmFzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0dmFyIGNvbnRhaW5lciAgICAgICA9ICQkKFwiaW1hZ2VWaWV3Mi1pbWFnZS1vcmlnaW5hbFwiKS5nZXROb2RlKCkuZmlyc3RFbGVtZW50Q2hpbGQ7XG5cdGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoY2FudmFzKTtcblxuXHQvLyBEUkFXIFJFRFVDRUQvRElUSEVSRUQgSU1BR0Vcblx0Y2FudmFzICAgICAgICAgICAgICA9IFF1YW50aXphdGlvblVzYWdlLmRyYXdQaXhlbHMocmVzdWx0LmltYWdlLCByZXN1bHQuaW1hZ2UuZ2V0V2lkdGgoKSk7XG5cdGNhbnZhcy5pZCAgICAgICAgICAgPSBwcmVmaXggKyBcInJlZHVjZWQtaW1hZ2VcIjtcblx0Y2FudmFzLmNsYXNzTmFtZSAgICA9IFwiaW1hZ2Utc2VtaS10cmFuc3BhcmVudC1iYWNrZ3JvdW5kXCI7XG5cdGNvbnRhaW5lciAgICAgICAgICAgPSAkJChcImltYWdlVmlldzItaW1hZ2UtcXVhbnRpemVkXCIpLmdldE5vZGUoKS5maXJzdEVsZW1lbnRDaGlsZDtcblx0Y29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW52YXMpO1xuXG5cdC8vIERSQVcgUEFMRVRURVxuXHRjYW52YXMgICAgICAgICAgICAgID0gUXVhbnRpemF0aW9uVXNhZ2UuZHJhd1BpeGVscyhyZXN1bHQucGFsZXR0ZS5nZXRQb2ludENvbnRhaW5lcigpLCAxNiwgMTI4KTtcblx0Y29udGFpbmVyICAgICAgICAgICA9ICQkKFwiaW1hZ2VWaWV3Mi1wYWxldHRlXCIpLmdldE5vZGUoKS5maXJzdEVsZW1lbnRDaGlsZDtcblx0Y29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW52YXMpO1xufVxuXG5mdW5jdGlvbiBmaWxsQ2xpY2tUb0NvbXBhcmUocmVzdWx0KSB7XG5cdHZhciBwcmVmaXggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gXCJpZC1pbWFnZVZpZXcyLVwiO1xuXHQvLyBDTEVBTlVQXG5cdCQkKFwiaW1hZ2VWaWV3MS1zdGF0aXN0aWNzXCIpLmdldE5vZGUoKS5maXJzdEVsZW1lbnRDaGlsZC5pbm5lckhUTUwgPSBcIiAoU1NJTTogXCIgKyByZXN1bHQuc3NpbS50b0ZpeGVkKDIpICsgXCIsIFRpbWU6IFwiICsgcmVzdWx0LnRpbWUgKyBcIiApXCI7XG5cblx0Ly8gRFJBVyBPUklHSU5BTCBJTUFHRVxuXHR2YXIgY2FudmFzT3JpZ2luYWwgICAgICAgICAgID0gUXVhbnRpemF0aW9uVXNhZ2UuZHJhd1BpeGVscyhyZXN1bHQub3JpZ2luYWwsIHJlc3VsdC5vcmlnaW5hbC5nZXRXaWR0aCgpKTtcblx0Y2FudmFzT3JpZ2luYWwuaWQgICAgICAgICAgICA9IHByZWZpeCArIFwib3JpZ2luYWwtaW1hZ2VcIjtcblx0Y2FudmFzT3JpZ2luYWwuY2xhc3NOYW1lICAgICA9IFwiaW1hZ2Utc2VtaS10cmFuc3BhcmVudC1iYWNrZ3JvdW5kXCI7XG5cdGNhbnZhc09yaWdpbmFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0dmFyIGNvbnRhaW5lciAgICAgICAgICAgICAgICA9ICQkKFwiaW1hZ2VWaWV3MS1pbWFnZVwiKS5nZXROb2RlKCkuZmlyc3RFbGVtZW50Q2hpbGQ7XG5cdGNvbnRhaW5lci5pbm5lckhUTUwgICAgICAgICAgPSBcIlwiO1xuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoY2FudmFzT3JpZ2luYWwpO1xuXG5cdC8vIERSQVcgUkVEVUNFRC9ESVRIRVJFRCBJTUFHRVxuXHR2YXIgY2FudmFzUmVkdWNlZCAgICAgICA9IFF1YW50aXphdGlvblVzYWdlLmRyYXdQaXhlbHMocmVzdWx0LmltYWdlLCByZXN1bHQuaW1hZ2UuZ2V0V2lkdGgoKSk7XG5cdGNhbnZhc1JlZHVjZWQuaWQgICAgICAgID0gcHJlZml4ICsgXCJyZWR1Y2VkLWltYWdlXCI7XG5cdGNhbnZhc1JlZHVjZWQuY2xhc3NOYW1lID0gXCJpbWFnZS1zZW1pLXRyYW5zcGFyZW50LWJhY2tncm91bmRcIjtcblx0Y29udGFpbmVyICAgICAgICAgICAgICAgPSAkJChcImltYWdlVmlldzEtaW1hZ2VcIikuZ2V0Tm9kZSgpLmZpcnN0RWxlbWVudENoaWxkO1xuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoY2FudmFzUmVkdWNlZCk7XG5cblx0Ly8gQWRkIENvbnRhaW5lciBoYW5kbGVyc1xuXHRjb250YWluZXIub25tb3VzZWRvd24gPSAoKSA9PiB7XG5cdFx0Y2FudmFzT3JpZ2luYWwuc3R5bGUuZGlzcGxheSA9IFwiXCI7XG5cdFx0Y2FudmFzUmVkdWNlZC5zdHlsZS5kaXNwbGF5ICA9IFwibm9uZVwiO1xuXHR9O1xuXHRjb250YWluZXIub25tb3VzZXVwICAgPSAoKSA9PiB7XG5cdFx0Y2FudmFzT3JpZ2luYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdGNhbnZhc1JlZHVjZWQuc3R5bGUuZGlzcGxheSAgPSBcIlwiO1xuXHR9O1xuXG5cdC8vIERSQVcgUEFMRVRURVxuXHR2YXIgY2FudmFzUGFsZXR0ZSAgID0gUXVhbnRpemF0aW9uVXNhZ2UuZHJhd1BpeGVscyhyZXN1bHQucGFsZXR0ZS5nZXRQb2ludENvbnRhaW5lcigpLCAxNiwgMTI4KTtcblx0Y29udGFpbmVyICAgICAgICAgICA9ICQkKFwiaW1hZ2VWaWV3MS1wYWxldHRlXCIpLmdldE5vZGUoKS5maXJzdEVsZW1lbnRDaGlsZDtcblx0Y29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW52YXNQYWxldHRlKTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0RyYWcoZmlsZSkge1xuXHR2YXIgcmVhZGVyICAgID0gbmV3IEZpbGVSZWFkZXIoKTtcblx0cmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdCg8d2ViaXgudWkuZ3JvdXBsaXN0PiQkKFwiaW1hZ2VcIikpLmFkZCh7XG5cdFx0XHRpZCAgICAgIDogJ2ltYWdlLScgKyBmaWxlLm5hbWUsXG5cdFx0XHRkYXRhVXJsIDogKDxhbnk+ZXZlbnQudGFyZ2V0KS5yZXN1bHRcblx0XHR9KTtcblx0fTtcblxuXHRyZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250cm9sbGVyL3VpLnRzIiwiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vbGliL3dlYml4L3dlYml4LmQudHNcIi8+XG5pbXBvcnQge2luaXRpYWxpemV9IGZyb20gXCIuL2NvbnRyb2xsZXIvdWlcIjtcbmltcG9ydCB7bGVmdFBhbmVsfSBmcm9tIFwiLi91aS9sZWZ0UGFuZWwvbGVmdFBhbmVsXCI7XG5pbXBvcnQge3JpZ2h0UGFuZWx9IGZyb20gXCIuL3VpL3JpZ2h0UGFuZWwvcmlnaHRQYW5lbFwiO1xuXG53ZWJpeC5yZWFkeShmdW5jdGlvbiAoKSB7XG5cblx0d2ViaXgudWkoe1xuXHRcdHR5cGUgOiBcImxpbmVcIixcblx0XHRjb2xzIDogW1xuXHRcdFx0e1xuXHRcdFx0XHR3aWR0aCAgOiA1MDAsXG5cdFx0XHRcdGhlYWRlciA6IFwiU2V0dGluZ3MgJiBGb2xkZXJzXCIsIGhlYWRlckhlaWdodCA6IDQ1LFxuXHRcdFx0XHRib2R5ICAgOiBsZWZ0UGFuZWxcblx0XHRcdH0sXG5cdFx0XHR7IHZpZXcgOiBcInJlc2l6ZXJcIiB9LFxuXHRcdFx0cmlnaHRQYW5lbFxuXHRcdF1cblx0fSk7XG5cblx0aW5pdGlhbGl6ZSgpO1xuXG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAudHMiLCJpbXBvcnQgKiBhcyBpcSBmcm9tIFwiaW1hZ2UtcVwiO1xuXG5leHBvcnQgY2xhc3MgUXVhbnRpemF0aW9uVXNhZ2Uge1xuXHRzdGF0aWMgZHJhd1BpeGVscyhwb2ludENvbnRhaW5lciwgd2lkdGgwLCB3aWR0aDE/IDogbnVtYmVyKSB7XG5cdFx0dmFyIGlkeGk4ICA9IHBvaW50Q29udGFpbmVyLnRvVWludDhBcnJheSgpLFxuXHRcdFx0aWR4aTMyID0gbmV3IFVpbnQzMkFycmF5KGlkeGk4LmJ1ZmZlcik7XG5cblx0XHR3aWR0aDEgPSB3aWR0aDEgfHwgd2lkdGgwO1xuXG5cdFx0dmFyIGNhbiAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLFxuXHRcdFx0Y2FuMiAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiksXG5cdFx0XHRjdHggOiBhbnkgID0gY2FuLmdldENvbnRleHQoXCIyZFwiKSxcblx0XHRcdGN0eDIgOiBhbnkgPSBjYW4yLmdldENvbnRleHQoXCIyZFwiKTtcblxuXHRcdGNhbi53aWR0aCAgID0gd2lkdGgwO1xuXHRcdGNhbi5oZWlnaHQgID0gTWF0aC5jZWlsKGlkeGkzMi5sZW5ndGggLyB3aWR0aDApO1xuXHRcdGNhbjIud2lkdGggID0gd2lkdGgxO1xuXHRcdGNhbjIuaGVpZ2h0ID0gTWF0aC5jZWlsKGNhbi5oZWlnaHQgKiB3aWR0aDEgLyB3aWR0aDApO1xuXG5cdFx0Y3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGN0eC5tb3pJbWFnZVNtb290aGluZ0VuYWJsZWQgPSBjdHgud2Via2l0SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gY3R4Lm1zSW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cdFx0Y3R4Mi5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBjdHgyLm1vekltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGN0eDIud2Via2l0SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gY3R4Mi5tc0ltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXG5cdFx0dmFyIGltZ2QgPSBjdHguY3JlYXRlSW1hZ2VEYXRhKGNhbi53aWR0aCwgY2FuLmhlaWdodCk7XG5cblx0XHRpZiAoUXVhbnRpemF0aW9uVXNhZ2UuX3R5cGVPZihpbWdkLmRhdGEpID09IFwiQ2FudmFzUGl4ZWxBcnJheVwiKSB7XG5cdFx0XHR2YXIgZGF0YSA9IGltZ2QuZGF0YTtcblx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSBkYXRhLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG5cdFx0XHRcdGRhdGFbIGkgXSA9IGlkeGk4WyBpIF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dmFyIGJ1ZjMyID0gbmV3IFVpbnQzMkFycmF5KGltZ2QuZGF0YS5idWZmZXIpO1xuXHRcdFx0YnVmMzIuc2V0KGlkeGkzMik7XG5cdFx0fVxuXG5cdFx0Y3R4LnB1dEltYWdlRGF0YShpbWdkLCAwLCAwKTtcblxuXHRcdGN0eDIuZHJhd0ltYWdlKGNhbiwgMCwgMCwgY2FuMi53aWR0aCwgY2FuMi5oZWlnaHQpO1xuXG5cdFx0cmV0dXJuIGNhbjI7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBfdHlwZU9mKHZhbCkge1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKS5zbGljZSg4LCAtMSk7XG5cdH1cblxuXHRwcml2YXRlIF90aW1lTWFyayh0aXRsZSwgY2FsbGJhY2spIHtcblx0XHR2YXIgc3RhcnQgPSBEYXRlLm5vdygpO1xuXHRcdGNhbGxiYWNrKCk7XG5cdFx0Y29uc29sZS5sb2codGl0bGUgKyBcIjogXCIgKyAoRGF0ZS5ub3coKSAtIHN0YXJ0KSk7XG5cdH1cblxuXHRwcml2YXRlIF9iYXNlTmFtZShzcmMpIHtcblx0XHRyZXR1cm4gc3JjLnNwbGl0KFwiL1wiKS5wb3AoKS5zcGxpdChcIi5cIik7XG5cdH1cblxuXHRwdWJsaWMgcXVhbnRpemUoaW1nIDogSFRNTEltYWdlRWxlbWVudCwgb3B0aW9uQ29sb3JzLCBvcHRpb25QYWxldHRlUXVhbnRpemVyLCBvcHRpb25JbWFnZURpdGhlcmluZywgb3B0aW9uQ29sb3JEaXN0YW5jZSkgOiB7cGFsZXR0ZSA6IGlxLnV0aWxzLlBhbGV0dGUsIGltYWdlIDogaXEudXRpbHMuUG9pbnRDb250YWluZXIsIHRpbWUgOiBudW1iZXIsIHNzaW0gOiBudW1iZXIsIG9yaWdpbmFsIDogaXEudXRpbHMuUG9pbnRDb250YWluZXJ9IHtcblx0XHR2YXIgcG9pbnRCdWZmZXIgOiBpcS51dGlscy5Qb2ludENvbnRhaW5lcixcblx0XHRcdG9yaWdpbmFsUG9pbnRCdWZmZXIgOiBpcS51dGlscy5Qb2ludENvbnRhaW5lcixcblx0XHRcdHBhbGV0dGVRdWFudGl6ZXIgOiBpcS5wYWxldHRlLkFic3RyYWN0UGFsZXR0ZVF1YW50aXplcixcblx0XHRcdGlkID0gdGhpcy5fYmFzZU5hbWUoaW1nLnNyYylbIDAgXSxcblx0XHRcdHBhbGV0dGUgOiBpcS51dGlscy5QYWxldHRlLFxuXHRcdFx0aW1hZ2UgOiBpcS51dGlscy5Qb2ludENvbnRhaW5lcjtcblxuXHRcdHBvaW50QnVmZmVyICAgICAgICAgPSBpcS51dGlscy5Qb2ludENvbnRhaW5lci5mcm9tSFRNTEltYWdlRWxlbWVudChpbWcpO1xuXHRcdG9yaWdpbmFsUG9pbnRCdWZmZXIgPSBwb2ludEJ1ZmZlci5jbG9uZSgpO1xuXG5cdFx0dmFyIHRpbWUgPSBEYXRlLm5vdygpO1xuXG5cdFx0Y29uc29sZS5sb2coXCJpbWFnZSA9IFwiICsgaWQpO1xuXHRcdHRoaXMuX3RpbWVNYXJrKFwiLi4uc2FtcGxlXCIsICgpID0+IHtcblx0XHRcdHZhciBkaXN0YW5jZSA6IGlxLmRpc3RhbmNlLkFic3RyYWN0RGlzdGFuY2VDYWxjdWxhdG9yID0gdGhpcy5fZ2V0Q29sb3JEaXN0YW5jZUNhbGN1bGF0b3Iob3B0aW9uQ29sb3JEaXN0YW5jZSk7XG5cblx0XHRcdHN3aXRjaCAob3B0aW9uUGFsZXR0ZVF1YW50aXplcikge1xuXHRcdFx0XHRjYXNlIDE6XG5cdFx0XHRcdFx0cGFsZXR0ZVF1YW50aXplciA9IG5ldyBpcS5wYWxldHRlLk5ldVF1YW50KGRpc3RhbmNlLCBvcHRpb25Db2xvcnMpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDI6XG5cdFx0XHRcdFx0cGFsZXR0ZVF1YW50aXplciA9IG5ldyBpcS5wYWxldHRlLlJHQlF1YW50KGRpc3RhbmNlLCBvcHRpb25Db2xvcnMpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDM6XG5cdFx0XHRcdFx0cGFsZXR0ZVF1YW50aXplciA9IG5ldyBpcS5wYWxldHRlLld1UXVhbnQoZGlzdGFuY2UsIG9wdGlvbkNvbG9ycyk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgNDpcblx0XHRcdFx0XHRwYWxldHRlUXVhbnRpemVyID0gbmV3IGlxLnBhbGV0dGUuTmV1UXVhbnRGbG9hdChkaXN0YW5jZSwgb3B0aW9uQ29sb3JzKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdHBhbGV0dGVRdWFudGl6ZXIuc2FtcGxlKHBvaW50QnVmZmVyKTtcblx0XHR9KTtcblxuXHRcdHRoaXMuX3RpbWVNYXJrKFwiLi4ucGFsZXR0ZVwiLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRwYWxldHRlID0gcGFsZXR0ZVF1YW50aXplci5xdWFudGl6ZVN5bmMoKTtcblx0XHR9KTtcblxuXHRcdHRoaXMuX3RpbWVNYXJrKFwiLi4uZGl0aGVyXCIsICgpID0+IHtcblx0XHRcdHZhciBkaXN0YW5jZSA6IGlxLmRpc3RhbmNlLkFic3RyYWN0RGlzdGFuY2VDYWxjdWxhdG9yID0gdGhpcy5fZ2V0Q29sb3JEaXN0YW5jZUNhbGN1bGF0b3Iob3B0aW9uQ29sb3JEaXN0YW5jZSk7XG5cblx0XHRcdHZhciBpbWFnZVF1YW50aXplcjtcblx0XHRcdGlmIChvcHRpb25JbWFnZURpdGhlcmluZyA9PT0gLTEpIHtcblx0XHRcdFx0aW1hZ2VRdWFudGl6ZXIgPSBuZXcgaXEuaW1hZ2UuTmVhcmVzdENvbG9yKGRpc3RhbmNlKTtcblx0XHRcdH0gZWxzZSBpZiAob3B0aW9uSW1hZ2VEaXRoZXJpbmcgPT09IDkpIHtcblx0XHRcdFx0aW1hZ2VRdWFudGl6ZXIgPSBuZXcgaXEuaW1hZ2UuRXJyb3JEaWZmdXNpb25SaWVtZXJzbWEoZGlzdGFuY2UpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aW1hZ2VRdWFudGl6ZXIgPSBuZXcgaXEuaW1hZ2UuRXJyb3JEaWZmdXNpb25BcnJheShkaXN0YW5jZSwgb3B0aW9uSW1hZ2VEaXRoZXJpbmcsIHRydWUsIDAsIGZhbHNlKTtcblx0XHRcdH1cblxuXHRcdFx0aW1hZ2UgPSBpbWFnZVF1YW50aXplci5xdWFudGl6ZVN5bmMocG9pbnRCdWZmZXIsIHBhbGV0dGUpO1xuXHRcdH0pO1xuXG5cdFx0dGltZSAgICAgPSBEYXRlLm5vdygpIC0gdGltZTtcblx0XHR2YXIgc3NpbSA9IGlxLnF1YWxpdHkuc3NpbShvcmlnaW5hbFBvaW50QnVmZmVyLCBwb2ludEJ1ZmZlcik7XG5cblx0XHR0aGlzLl9jaGVja0ltYWdlQW5kUGFsZXR0ZShpbWFnZSwgcGFsZXR0ZSwgb3B0aW9uQ29sb3JzKTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRvcmlnaW5hbCA6IG9yaWdpbmFsUG9pbnRCdWZmZXIsXG5cdFx0XHRpbWFnZSAgICA6IGltYWdlLFxuXHRcdFx0cGFsZXR0ZSAgOiBwYWxldHRlLFxuXHRcdFx0dGltZSAgICAgOiB0aW1lLFxuXHRcdFx0c3NpbSAgICAgOiBzc2ltXG5cdFx0fTtcblx0fVxuXG5cdHByaXZhdGUgX2dldENvbG9yRGlzdGFuY2VDYWxjdWxhdG9yKG9wdGlvbikgOiBpcS5kaXN0YW5jZS5BYnN0cmFjdERpc3RhbmNlQ2FsY3VsYXRvciB7XG5cdFx0c3dpdGNoIChvcHRpb24pIHtcblx0XHRcdGNhc2UgMTpcblx0XHRcdFx0cmV0dXJuIG5ldyBpcS5kaXN0YW5jZS5FdWNsaWRlYW4oKTtcblx0XHRcdGNhc2UgMjpcblx0XHRcdFx0cmV0dXJuIG5ldyBpcS5kaXN0YW5jZS5NYW5oYXR0YW4oKTtcblx0XHRcdGNhc2UgMzpcblx0XHRcdFx0cmV0dXJuIG5ldyBpcS5kaXN0YW5jZS5DSUVERTIwMDAoKTtcblx0XHRcdGNhc2UgNDpcblx0XHRcdFx0cmV0dXJuIG5ldyBpcS5kaXN0YW5jZS5DSUU5NFRleHRpbGVzKCk7XG5cdFx0XHRjYXNlIDU6XG5cdFx0XHRcdHJldHVybiBuZXcgaXEuZGlzdGFuY2UuQ0lFOTRHcmFwaGljQXJ0cygpO1xuXHRcdFx0Y2FzZSA2OlxuXHRcdFx0XHRyZXR1cm4gbmV3IGlxLmRpc3RhbmNlLkV1Y2xpZGVhbkJUNzA5Tm9BbHBoYSgpO1xuXHRcdFx0Y2FzZSA3OlxuXHRcdFx0XHRyZXR1cm4gbmV3IGlxLmRpc3RhbmNlLkV1Y2xpZGVhbkJUNzA5KCk7XG5cdFx0XHRjYXNlIDg6XG5cdFx0XHRcdHJldHVybiBuZXcgaXEuZGlzdGFuY2UuTWFuaGF0dGFuQlQ3MDkoKTtcblx0XHRcdGNhc2UgOTpcblx0XHRcdFx0cmV0dXJuIG5ldyBpcS5kaXN0YW5jZS5DTWV0cmljKCk7XG5cdFx0XHRjYXNlIDEwOlxuXHRcdFx0XHRyZXR1cm4gbmV3IGlxLmRpc3RhbmNlLlBOR1F1YW50KCk7XG5cdFx0XHRjYXNlIDExOlxuXHRcdFx0XHRyZXR1cm4gbmV3IGlxLmRpc3RhbmNlLk1hbmhhdHRhbk5vbW15ZGUoKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9jaGVja0ltYWdlQW5kUGFsZXR0ZShpbWFnZSA6IGlxLnV0aWxzLlBvaW50Q29udGFpbmVyLCBwYWxldHRlIDogaXEudXRpbHMuUGFsZXR0ZSwgY29sb3JzIDogbnVtYmVyKSA6IHZvaWQge1xuXHRcdC8vIGNoZWNrIHBhbGV0dGVcblx0XHRpZiAocGFsZXR0ZS5nZXRQb2ludENvbnRhaW5lcigpLmdldFBvaW50QXJyYXkoKS5sZW5ndGggPiBjb2xvcnMpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlBhbGV0dGUgY29udGFpbnMgbW9yZSBjb2xvcnMgdGhhbiBhbGxvd2VkXCIpO1xuXHRcdH1cblxuXHRcdC8vIGNoZWNrIGltYWdlXG5cdFx0aW1hZ2UuZ2V0UG9pbnRBcnJheSgpLmZvckVhY2goKHBvaW50IDogaXEudXRpbHMuUG9pbnQpID0+IHtcblx0XHRcdGlmICghcGFsZXR0ZS5oYXMocG9pbnQpKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkltYWdlIGNvbnRhaW5zIGNvbG9yIG5vdCBpbiBwYWxldHRlOiBcIiArIHBvaW50LnIgKyBcIixcIiArIHBvaW50LmcgKyBcIixcIiArIHBvaW50LmIgKyBcIixcIiArIHBvaW50LmEpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250cm9sbGVyL3VzYWdlLnRzIiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcImltYWdlLXFcIl07IH0oKSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJpbWFnZS1xXCJcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtjb25maWdGb3JtfSBmcm9tIFwiLi9jb25maWdGb3JtXCI7XG5pbXBvcnQge2ltYWdlRm9sZGVyc1BhbmVsfSBmcm9tIFwiLi9pbWFnZUZpbGVFeHBsb3JlclwiO1xuXG5leHBvcnQgdmFyIGxlZnRQYW5lbCA9IHtcblx0dHlwZSA6IFwibGluZVwiLFxuXHRyb3dzIDogW1xuXHRcdGNvbmZpZ0Zvcm0sXG5cdFx0eyB0eXBlIDogXCJoZWFkZXJcIiwgdGVtcGxhdGUgOiBcIkltYWdlIEZvbGRlclwiIH0sXG5cdFx0aW1hZ2VGb2xkZXJzUGFuZWxcblx0XVxufTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3VpL2xlZnRQYW5lbC9sZWZ0UGFuZWwudHMiLCJpbXBvcnQge3VwZGF0ZX0gZnJvbSBcIi4uLy4uL2NvbnRyb2xsZXIvdWlcIjtcblxuZXhwb3J0IHZhciBjb25maWdGb3JtID0ge1xuXHR2aWV3IDogXCJmb3JtXCIsIGlkIDogXCJteWZvcm1cIiwgd2lkdGggOiAzMDAsIGVsZW1lbnRzIDogW1xuXHRcdHtcblx0XHRcdHZpZXcgICAgICAgOiBcInJpY2hzZWxlY3RcIixcblx0XHRcdGlkICAgICAgICAgOiBcIm9wdGlvbi1jb2xvcnNcIixcblx0XHRcdGxhYmVsICAgICAgOiBcIkNvbG9yc1wiLFxuXHRcdFx0bGFiZWxXaWR0aCA6IDE3NSxcblx0XHRcdHZhbHVlICAgICAgOiBcIjI1NlwiLFxuXHRcdFx0b3B0aW9ucyAgICA6IFtcblx0XHRcdFx0XCIyXCIsXG5cdFx0XHRcdFwiNFwiLFxuXHRcdFx0XHRcIjE2XCIsXG5cdFx0XHRcdFwiNjRcIixcblx0XHRcdFx0XCIxMjhcIixcblx0XHRcdFx0XCIyNTZcIixcblx0XHRcdFx0XCI1MTJcIixcblx0XHRcdFx0XCIxMDI0XCIsXG5cdFx0XHRcdFwiMjA0OFwiLFxuXHRcdFx0XHRcIjgxOTJcIlxuXHRcdFx0XVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0dmlldyAgICAgICA6IFwicmljaHNlbGVjdFwiLFxuXHRcdFx0aWQgICAgICAgICA6IFwib3B0aW9uLWRpc3RhbmNlXCIsXG5cdFx0XHRsYWJlbCAgICAgIDogXCJDb2xvciBEaXN0YW5jZSBFcXVhdGlvblwiLFxuXHRcdFx0bGFiZWxXaWR0aCA6IDE3NSxcblx0XHRcdHZhbHVlICAgICAgOiBcIjJcIixcblx0XHRcdG9wdGlvbnMgICAgOiBbXG5cdFx0XHRcdHsgaWQgOiAxLCB2YWx1ZSA6IFwiRXVjbGlkZWFuXCIgfSxcblx0XHRcdFx0eyBpZCA6IDIsIHZhbHVlIDogXCJNYW5oYXR0YW5cIiB9LFxuXHRcdFx0XHR7IGlkIDogMywgdmFsdWUgOiBcIkNJRURFMjAwMFwiIH0sXG5cdFx0XHRcdHsgaWQgOiA0LCB2YWx1ZSA6IFwiQ0lFOTQgVGV4dGlsZXNcIiB9LFxuXHRcdFx0XHR7IGlkIDogNSwgdmFsdWUgOiBcIkNJRTk0IEdyYXBoaWNBcnRzXCIgfSxcblx0XHRcdFx0eyBpZCA6IDYsIHZhbHVlIDogXCJFdWNsaWRlYW4gQlQ3MDkgTm9BbHBoYSA8LS0gZGVmYXVsdCBmb3IgUkdCUXVhbnRcIiB9LFxuXHRcdFx0XHR7IGlkIDogNywgdmFsdWUgOiBcIkV1Y2xpZGVhbiBCVDcwOVwiIH0sXG5cdFx0XHRcdHsgaWQgOiA4LCB2YWx1ZSA6IFwiTWFuaGF0dGFuIEJUNzA5XCIgfSxcblx0XHRcdFx0eyBpZCA6IDksIHZhbHVlIDogXCJDTWV0cmljXCIgfSxcblx0XHRcdFx0eyBpZCA6IDEwLCB2YWx1ZSA6IFwiUE5HUXVhbnRcIiB9LFxuXHRcdFx0XHR7IGlkIDogMTEsIHZhbHVlIDogXCJNYW5oYXR0YW4gTm9tbXlkZVwiIH1cblx0XHRcdF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdHZpZXcgICAgICAgOiBcInJpY2hzZWxlY3RcIixcblx0XHRcdGlkICAgICAgICAgOiBcIm9wdGlvbi1wYWxldHRlXCIsXG5cdFx0XHRsYWJlbCAgICAgIDogXCJRdWFudGl6YXRpb24gTWV0aG9kXCIsXG5cdFx0XHRsYWJlbFdpZHRoIDogMTc1LFxuXHRcdFx0dmFsdWUgICAgICA6IFwiMVwiLFxuXHRcdFx0b3B0aW9ucyAgICA6IFtcblx0XHRcdFx0eyBpZCA6IDEsIHZhbHVlIDogXCJuZXVxdWFudCAoT3JpZ2luYWwsIEludGVnZXIpXCIgfSxcblx0XHRcdFx0eyBpZCA6IDIsIHZhbHVlIDogXCJyZ2JxdWFudFwiIH0sXG5cdFx0XHRcdHsgaWQgOiAzLCB2YWx1ZSA6IFwid3VxdWFudFwiIH0sXG5cdFx0XHRcdHsgaWQgOiA0LCB2YWx1ZSA6IFwibmV1cXVhbnQgKEZsb2F0aW5nIFBvaW50KVwiIH1cblx0XHRcdF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdHZpZXcgICAgICAgOiBcInJpY2hzZWxlY3RcIixcblx0XHRcdGlkICAgICAgICAgOiBcIm9wdGlvbi1pbWFnZVwiLFxuXHRcdFx0bGFiZWwgICAgICA6IFwiUGFsZXR0ZS10by1JbWFnZSBNZXRob2RcIixcblx0XHRcdGxhYmVsV2lkdGggOiAxNzUsXG5cdFx0XHR2YWx1ZSAgICAgIDogXCIxXCIsXG5cdFx0XHRvcHRpb25zICAgIDogW1xuXHRcdFx0XHR7IGlkIDogMSwgdmFsdWUgOiBcIk5lYXJlc3QgKFNpbXBsZSlcIiB9LFxuXHRcdFx0XHR7IGlkIDogMiwgdmFsdWUgOiBcIkVycm9yRGlmZnVzaW9uOiBBcnJheSAoRmxveWQtU3RlaW5iZXJnKVwiIH0sXG5cdFx0XHRcdHsgaWQgOiA0LCB2YWx1ZSA6IFwiRXJyb3JEaWZmdXNpb246IEFycmF5IChTdHVja2kpXCIgfSxcblx0XHRcdFx0eyBpZCA6IDUsIHZhbHVlIDogXCJFcnJvckRpZmZ1c2lvbjogQXJyYXkgKEF0a2luc29uKVwiIH0sXG5cdFx0XHRcdHsgaWQgOiA2LCB2YWx1ZSA6IFwiRXJyb3JEaWZmdXNpb246IEFycmF5IChKYXJ2aXMpXCIgfSxcblx0XHRcdFx0eyBpZCA6IDcsIHZhbHVlIDogXCJFcnJvckRpZmZ1c2lvbjogQXJyYXkgKEJ1cmtlcylcIiB9LFxuXHRcdFx0XHR7IGlkIDogOCwgdmFsdWUgOiBcIkVycm9yRGlmZnVzaW9uOiBBcnJheSAoU2llcnJhKVwiIH0sXG5cdFx0XHRcdHsgaWQgOiA5LCB2YWx1ZSA6IFwiRXJyb3JEaWZmdXNpb246IEFycmF5IChUd29TaWVycmEpXCIgfSxcblx0XHRcdFx0eyBpZCA6IDEwLCB2YWx1ZSA6IFwiRXJyb3JEaWZmdXNpb246IEFycmF5IChTaWVycmFMaXRlKVwiIH0sXG5cdFx0XHRcdHsgaWQgOiAzLCB2YWx1ZSA6IFwiRXJyb3JEaWZmdXNpb246IEFycmF5IChGYWxzZSBGbG95ZC1TdGVpbmJlcmcpXCIgfSxcblx0XHRcdFx0eyBpZCA6IDExLCB2YWx1ZSA6IFwiRXJyb3JEaWZmdXNpb246IFJpZW1lcnNtYSAoSGlsYmVydCBDdXJ2ZSlcIiB9XG5cdFx0XHRdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHR0eXBlICAgICA6IFwibGluZVwiLFxuXHRcdFx0dmlldyAgICAgOiBcInRvb2xiYXJcIixcblx0XHRcdGVsZW1lbnRzIDogWyB7fSwge1xuXHRcdFx0XHR2aWV3IDogXCJidXR0b25cIiwgdmFsdWUgOiBcIlVwZGF0ZVwiLCB3aWR0aCA6IDkwLCBvbiA6IHtcblx0XHRcdFx0XHRvbkl0ZW1DbGljayA6ICgpID0+IHtcblx0XHRcdFx0XHRcdHVwZGF0ZSh0cnVlKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBdXG5cdFx0fVxuXG5cdF1cbn07XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91aS9sZWZ0UGFuZWwvY29uZmlnRm9ybS50cyIsImltcG9ydCB7aW1hZ2VEYXRhfSBmcm9tIFwiLi4vLi4vZGF0YS9pbWFnZUxpc3RcIjtcbmltcG9ydCB7dXBkYXRlfSBmcm9tIFwiLi4vLi4vY29udHJvbGxlci91aVwiO1xuXG5leHBvcnQgdmFyIGltYWdlRm9sZGVyc1BhbmVsID0ge1xuXHRpZCAgICAgICA6IFwiaW1hZ2VcIixcblx0dmlldyAgICAgOiBcImdyb3VwbGlzdFwiLFxuXHR0eXBlICAgICA6IHtcblx0XHRoZWlnaHQgOiA4NFxuXHR9LFxuXHQvL2F1dG9oZWlnaHQgOiB0cnVlLFxuXHQvL2hlaWdodCA6IDgwMCxcblx0dGVtcGxhdGUgOiBmdW5jdGlvbiAob2JqIDogYW55KSB7XG5cdFx0aWYgKG9iai5kYXRhVXJsKSB7XG5cdFx0XHRyZXR1cm4gXCI8aW1nIHN0eWxlPVxcXCJoZWlnaHQ6IDg0cHhcXFwiIHNyYz1cXFwiXCIgKyBvYmouZGF0YVVybCArIFwiXFxcIi8+XCJcblx0XHR9IGVsc2UgaWYgKG9iai5mb2xkZXIgJiYgb2JqLmZpbGUpIHtcblx0XHRcdHJldHVybiBcIjxpbWcgc3R5bGU9XFxcImhlaWdodDogODRweFxcXCIgc3JjPVxcXCJpbWFnZXMvXCIgKyBvYmouZm9sZGVyICsgXCIvXCIgKyBvYmouZmlsZSArIFwiXFxcIi8+XCJcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIFwiPGRpdiBzdHlsZT1cXFwibGluZS1oZWlnaHQ6IDg0cHhcXFwiPlwiICsgb2JqLnZhbHVlICsgXCI8L2Rpdj5cIjtcblx0XHR9XG5cdH0sXG5cdHNlbGVjdCAgIDogdHJ1ZSxcblx0Ly9zY3JvbGwgOiBmYWxzZSxcblx0ZGF0YSAgICAgOiBpbWFnZURhdGEsXG5cdG9uICAgICAgIDoge1xuXHRcdFwib25hZnRlcnNlbGVjdFwiIDogKGlkKSA9PiB7XG5cdFx0XHR1cGRhdGUodHJ1ZSk7XG5cdFx0fVxuXHR9LFxuXHRyZWFkeSAgICA6IGZ1bmN0aW9uICgpIHsgIC8vc2VsZWN0IFVTQVxuXHRcdC8vdGhpcy5zZWxlY3QoMCk7XG5cdH1cblxuXHQvKlxuXHQgc2VsZWN0OnRydWUsXG5cdCBvbjp7IFwib25hZnRlcnNlbGVjdFwiOmNvdW50cnlfc2VsZWN0ZWQgfSxcblx0IHR5cGU6eyBoZWlnaHQ6IDg0IH0sXG5cdCByZWFkeTpmdW5jdGlvbigpeyAgLy9zZWxlY3QgVVNBXG5cdCB0aGlzLnNlbGVjdCg2KTtcblx0IH1cblx0ICovXG59O1xuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91aS9sZWZ0UGFuZWwvaW1hZ2VGaWxlRXhwbG9yZXIudHMiLCJ2YXIgaW1hZ2VMaXN0ID0ge1xuXHRcImFscGhhXCIgICAgIDogW1xuXHRcdFwiY2hpbGRyZW4tNzQ1Njc0XzE5MjAucG5nXCIsXG5cdFx0XCJhbHBoYS5wbmdcIixcblx0XHRcIkFscGhhQmFsbC5wbmdcIixcblx0XHRcIkFscGhhRWRnZS5wbmdcIixcblx0XHRcImFscGhhdGVzdC5wbmdcIixcblx0XHRcImNoZXJyaWVzLXJlYWxpc3RpYy5wbmdcIixcblx0XHRcImRpY2UtdHJhbnMucG5nXCIsXG5cdFx0XCJwbmdncmFkMTZyZ2JhLnBuZ1wiLFxuXHRcdFwidHVtYmxyX21veXc2MlJ5UW8xczVqanR6bzFfNTAwLnBuZ1wiLFxuXHRcdFwiV2lsYmVyLWh1Z2UtYWxwaGEucG5nXCJcblx0XSxcblx0XCJncmFkaWVudHNcIiA6IFtcblx0XHRcImNvbG9ycGFuMi5wbmdcIixcblx0XHRcImRpdGhncmFkcy5wbmdcIixcblx0XHRcImdyYWRfZGVmYXVsdC5wbmdcIixcblx0XHRcImdyYWQucG5nXCIsXG5cdFx0XCJncmFkNS5wbmdcIixcblx0XHRcImdyYWQ2LnBuZ1wiLFxuXHRcdFwiZ3JhZDcucG5nXCIsXG5cdFx0XCJncmFkOC5wbmdcIixcblx0XHRcInBuZ2dyYWQ4cmdiLnBuZ1wiLFxuXHRcdFwic2N1bHB0bWFwLnBuZ1wiXG5cdF0sXG5cdFwiZ3JhcGhpY3NcIiAgOiBbXG5cdFx0XCJiYXNlYmFsbC5qcGdcIixcblx0XHRcImJlYm9wLmpwZ1wiLFxuXHRcdFwibWluZWNyYWZ0LnBuZ1wiLFxuXHRcdFwicGVuZ3VpbnMucG5nXCIsXG5cdFx0XCJwb29sLnBuZ1wiLFxuXHRcdFwicm9zZS5wbmdcIixcblx0XHRcInNtYjMucG5nXCIsXG5cdFx0XCJzdXBlcjEucG5nXCIsXG5cdFx0XCJzdXBlcjIucG5nXCJcblx0XSxcblx0XCJwaG90b3MxXCIgICA6IFtcblx0XHRcImJpa2luZy5qcGdcIixcblx0XHRcImJsdWZmLmpwZ1wiLFxuXHRcdFwiY2xvdWRwbGFuZS5qcGdcIixcblx0XHRcImNvbXBjdWJlLmpwZ1wiLFxuXHRcdFwiZmlzaGllMi5qcGdcIixcblx0XHRcImtpdHRlaDEuanBnXCIsXG5cdFx0XCJtZWR1c2EuanBnXCIsXG5cdFx0XCJwaGVhc2FudC5qcGdcIixcblx0XHRcInBob3RvbWFuLmpwZ1wiLFxuXHRcdFwicmFpbmJvdy5qcGdcIixcblx0XHRcInJlZHBhbmRhLmpwZ1wiXG5cdF0sXG5cdFwicGhvdG9zMlwiICAgOiBbXG5cdFx0XCJib29rLXNoZWxmLTM0OTkzNF8xOTIwLmpwZ1wiLFxuXHRcdFwiY2hpbGRyZW4tNjAyOTc3XzE5MjAucG5nXCIsXG5cdFx0XCJvbGQtYm9va3MtNDM2NDk4XzE5MjAucG5nXCIsXG5cdFx0XCJwZW5zLTkzMTc3XzE5MjAucG5nXCIsXG5cdFx0XCJiYWJ5LmpwZ1wiLFxuXHRcdFwiY2hvcHN1ZXkuanBnXCIsXG5cdFx0XCJmaXNoLmpwZ1wiLFxuXHRcdFwia2l0dGVoMi5qcGdcIixcblx0XHRcInF1YW50ZnJvZy5wbmdcIixcblx0XHRcInRyZWVmcm9nLmpwZ1wiLFxuXHRcdFwicXVhbnRmcm9nX3NtYWxsLnBuZ1wiXG5cdF1cbn07XG5cbnZhciByZXN1bHQgPSBbXTtcblxuZm9yICh2YXIgZm9sZGVyIGluIGltYWdlTGlzdCkge1xuXHRpZiAoaW1hZ2VMaXN0Lmhhc093blByb3BlcnR5KGZvbGRlcikpIHtcblx0XHR2YXIgZm9sZGVyRGF0YSA9IHtcblx0XHRcdGlkICAgIDogXCJpbWFnZS1saXN0LVwiICsgZm9sZGVyLFxuXHRcdFx0b3BlbiAgOiB0cnVlLFxuXHRcdFx0dmFsdWUgOiBmb2xkZXIsXG5cdFx0XHRkYXRhICA6IFtdXG5cdFx0fTtcblxuXHRcdGltYWdlTGlzdFsgZm9sZGVyIF0uZm9yRWFjaChmaWxlID0+IHtcblx0XHRcdGZvbGRlckRhdGEuZGF0YS5wdXNoKHtcblx0XHRcdFx0ZmlsZSAgIDogZmlsZSxcblx0XHRcdFx0Zm9sZGVyIDogZm9sZGVyLFxuXHRcdFx0XHRpZCAgICAgOiBcImltYWdlLWxpc3QtXCIgKyBmb2xkZXIgKyBcIi1cIiArIGZpbGVcblx0XHRcdH0pXG5cdFx0fSk7XG5cblx0XHRyZXN1bHQucHVzaChmb2xkZXJEYXRhKTtcblx0fVxufVxuXG5leHBvcnQgdmFyIGltYWdlRGF0YSA9IHJlc3VsdDtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RhdGEvaW1hZ2VMaXN0LnRzIiwiaW1wb3J0IHtxdWFudGl6ZWRJbWFnZUNsaWNrVG9Db21wYXJlfSBmcm9tIFwiLi9jbGlja1RvQ29tcGFyZVwiO1xuaW1wb3J0IHtxdWFudGl6ZWRJbWFnZU9yaWdpbmFsVnNRdWFudGl6ZWR9IGZyb20gXCIuL29yaWdpbmFsVnNRdWFudGl6ZWRcIjtcbmltcG9ydCAqIGFzIENvbnRyb2xsZXIgZnJvbSBcIi4uLy4uL2NvbnRyb2xsZXIvdWlcIjtcblxuZXhwb3J0IHZhciByaWdodFBhbmVsID0ge1xuXHR2aWV3ICAgOiBcInRhYnZpZXdcIiwgZ3Jhdml0eSA6IDMsXG5cdHRhYmJhciA6IHtcblx0XHRvcHRpb25XaWR0aCA6IDIwMCwgdmFsdWUgOiBcImNsaWNrVG9Db21wYXJlXCIsIG9wdGlvbnMgOiBbXG5cdFx0XHR7IHZhbHVlIDogJ0NsaWNrLXRvLUNvbXBhcmUnLCBpZCA6ICdjbGlja1RvQ29tcGFyZScgfSxcblx0XHRcdHsgdmFsdWUgOiAnT3JpZ2luYWwtdnMtUXVhbnRpemVkJywgaWQgOiAnb3JpZ2luYWxWc1F1YW50aXplZCcgfVxuXHRcdF0sXG5cdFx0b24gICAgICAgICAgOiB7XG5cdFx0XHRvbkFmdGVyVGFiQ2xpY2sgOiAoaWQpID0+IHtcblx0XHRcdFx0Q29udHJvbGxlci51cGRhdGUoZmFsc2UpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0Y2VsbHMgIDogW1xuXHRcdHF1YW50aXplZEltYWdlQ2xpY2tUb0NvbXBhcmUsXG5cdFx0cXVhbnRpemVkSW1hZ2VPcmlnaW5hbFZzUXVhbnRpemVkLFxuXHRdXG59O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdWkvcmlnaHRQYW5lbC9yaWdodFBhbmVsLnRzIiwiZXhwb3J0IHZhciBxdWFudGl6ZWRJbWFnZUNsaWNrVG9Db21wYXJlID0ge1xuXHRpZCAgIDogXCJjbGlja1RvQ29tcGFyZVwiLFxuXHRyb3dzIDogW1xuXHRcdHtcblx0XHRcdGlkICAgICA6IFwiaW1hZ2VWaWV3MS1zdGF0aXN0aWNzXCIsXG5cdFx0XHR2aWV3ICAgOiBcInRlbXBsYXRlXCIsXG5cdFx0XHRoZWlnaHQgOiAzMFxuXHRcdH0sXG5cblx0XHR7XG5cdFx0XHRjb2xzIDogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cm93cyA6IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dHlwZSAgICAgOiBcImhlYWRlclwiLFxuXHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZSA6IFwiUGFsZXR0ZVwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRpZCAgICA6IFwiaW1hZ2VWaWV3MS1wYWxldHRlXCIsXG5cdFx0XHRcdFx0XHRcdHdpZHRoIDogMTQwLFxuXHRcdFx0XHRcdFx0XHR2aWV3ICA6IFwidGVtcGxhdGVcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJvd3MgOiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHR5cGUgICAgIDogXCJoZWFkZXJcIixcblx0XHRcdFx0XHRcdFx0dGVtcGxhdGUgOiBcIkltYWdlXCJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGlkICAgOiBcImltYWdlVmlldzEtaW1hZ2VcIixcblx0XHRcdFx0XHRcdFx0dmlldyA6IFwidGVtcGxhdGVcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH1cblxuXHRdXG5cblx0Ly92aWV3IDogXCJ0ZW1wbGF0ZVwiXG59O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdWkvcmlnaHRQYW5lbC9jbGlja1RvQ29tcGFyZS50cyIsImV4cG9ydCB2YXIgcXVhbnRpemVkSW1hZ2VPcmlnaW5hbFZzUXVhbnRpemVkID0ge1xuXHRpZCAgIDogXCJvcmlnaW5hbFZzUXVhbnRpemVkXCIsXG5cdHJvd3MgOiBbXG5cdFx0e1xuXHRcdFx0aWQgICAgIDogXCJpbWFnZVZpZXcyLXN0YXRpc3RpY3NcIixcblx0XHRcdHZpZXcgICA6IFwidGVtcGxhdGVcIixcblx0XHRcdGhlaWdodCA6IDMwXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRjb2xzIDogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cm93cyA6IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dHlwZSAgICAgOiBcImhlYWRlclwiLFxuXHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZSA6IFwiUGFsZXR0ZVwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRpZCAgICA6IFwiaW1hZ2VWaWV3Mi1wYWxldHRlXCIsXG5cdFx0XHRcdFx0XHRcdHdpZHRoIDogMTQwLFxuXHRcdFx0XHRcdFx0XHR2aWV3ICA6IFwidGVtcGxhdGVcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJvd3MgOiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHR5cGUgICAgIDogXCJoZWFkZXJcIixcblx0XHRcdFx0XHRcdFx0dGVtcGxhdGUgOiBcIk9yaWdpbmFsIEltYWdlXCJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGlkICAgOiBcImltYWdlVmlldzItaW1hZ2Utb3JpZ2luYWxcIixcblx0XHRcdFx0XHRcdFx0dmlldyA6IFwidGVtcGxhdGVcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJvd3MgOiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHR5cGUgICAgIDogXCJoZWFkZXJcIixcblx0XHRcdFx0XHRcdFx0dGVtcGxhdGUgOiBcIlF1YW50aXplZCBJbWFnZVwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRpZCAgIDogXCJpbWFnZVZpZXcyLWltYWdlLXF1YW50aXplZFwiLFxuXHRcdFx0XHRcdFx0XHR2aWV3IDogXCJ0ZW1wbGF0ZVwiXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fVxuXHRdXG59O1xuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91aS9yaWdodFBhbmVsL29yaWdpbmFsVnNRdWFudGl6ZWQudHMiXSwic291cmNlUm9vdCI6IiJ9