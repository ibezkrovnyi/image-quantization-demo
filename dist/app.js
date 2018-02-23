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

module.exports = image-q;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmNhNmYyMjlhOWI0NTk5OTk0NzciLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRyb2xsZXIvdWkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbGxlci91c2FnZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJpbWFnZS1xXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2xlZnRQYW5lbC9sZWZ0UGFuZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2xlZnRQYW5lbC9jb25maWdGb3JtLnRzIiwid2VicGFjazovLy8uL3NyYy91aS9sZWZ0UGFuZWwvaW1hZ2VGaWxlRXhwbG9yZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RhdGEvaW1hZ2VMaXN0LnRzIiwid2VicGFjazovLy8uL3NyYy91aS9yaWdodFBhbmVsL3JpZ2h0UGFuZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL3JpZ2h0UGFuZWwvY2xpY2tUb0NvbXBhcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL3JpZ2h0UGFuZWwvb3JpZ2luYWxWc1F1YW50aXplZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REEscUNB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QUcsVUFBVTt5QkFDakI7cUJBQ0Q7aUJBQ0Q7YUFDRDtTQUNEO0tBRUQ7SUFFRCxtQkFBbUI7Q0FDbkIsQ0FBQzs7Ozs7Ozs7OztBQzFDUyx5Q0FBaUMsR0FBRztJQUM5QyxFQUFFLEVBQUsscUJBQXFCO0lBQzVCLElBQUksRUFBRztRQUNOO1lBQ0MsRUFBRSxFQUFPLHVCQUF1QjtZQUNoQyxJQUFJLEVBQUssVUFBVTtZQUNuQixNQUFNLEVBQUcsRUFBRTtTQUNYO1FBQ0Q7WUFDQyxJQUFJLEVBQUc7Z0JBQ047b0JBQ0MsSUFBSSxFQUFHO3dCQUNOOzRCQUNDLElBQUksRUFBTyxRQUFROzRCQUNuQixRQUFRLEVBQUcsU0FBUzt5QkFDcEI7d0JBQ0Q7NEJBQ0MsRUFBRSxFQUFNLG9CQUFvQjs0QkFDNUIsS0FBSyxFQUFHLEdBQUc7NEJBQ1gsSUFBSSxFQUFJLFVBQVU7eUJBQ2xCO3FCQUNEO2lCQUNEO2dCQUNEO29CQUNDLElBQUksRUFBRzt3QkFDTjs0QkFDQyxJQUFJLEVBQU8sUUFBUTs0QkFDbkIsUUFBUSxFQUFHLGdCQUFnQjt5QkFDM0I7d0JBQ0Q7NEJBQ0MsRUFBRSxFQUFLLDJCQUEyQjs0QkFDbEMsSUFBSSxFQUFHLFVBQVU7eUJBQ2pCO3FCQUNEO2lCQUNEO2dCQUNEO29CQUNDLElBQUksRUFBRzt3QkFDTjs0QkFDQyxJQUFJLEVBQU8sUUFBUTs0QkFDbkIsUUFBUSxFQUFHLGlCQUFpQjt5QkFDNUI7d0JBQ0Q7NEJBQ0MsRUFBRSxFQUFLLDRCQUE0Qjs0QkFDbkMsSUFBSSxFQUFHLFVBQVU7eUJBQ2pCO3FCQUNEO2lCQUNEO2FBQ0Q7U0FDRDtLQUNEO0NBQ0QsQ0FBQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyY2E2ZjIyOWE5YjQ1OTk5OTQ3NyIsImltcG9ydCB7UXVhbnRpemF0aW9uVXNhZ2V9IGZyb20gXCIuL3VzYWdlXCI7XG5cbnZhciBxdWFudGl6ZVJlc3VsdCA9IG51bGw7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuXHRkb2N1bWVudC5ib2R5Lm9uZHJvcCA9IGV2ZW50PT4ge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHR2YXIgZmlsZXMgPSBldmVudC5kYXRhVHJhbnNmZXIuZmlsZXM7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0cHJvY2Vzc0RyYWcoZmlsZXNbIGkgXSk7XG5cdFx0fVxuXHRcdC8vcmVhZGZpbGVzKGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcyk7XG5cdFx0Y29uc29sZS5sb2coZXZlbnQpO1xuXHR9O1xuXG5cdGRvY3VtZW50LmJvZHkub25kcmFnb3ZlciA9IGV2ZW50PT4ge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUocXVhbnRpemUgOiBib29sZWFuKSB7XG5cdGlmIChxdWFudGl6ZSkge1xuXHRcdHZhciBpbWFnZUZvbGRlcnNDb250cm9sID0gKDx3ZWJpeC51aS5ncm91cGxpc3Q+JCQoXCJpbWFnZVwiKSk7XG5cdFx0dmFyIHNlbGVjdGVkSWQgICAgICAgICAgPSBpbWFnZUZvbGRlcnNDb250cm9sLmdldFNlbGVjdGVkSWQodHJ1ZSk7XG5cdFx0aWYgKHNlbGVjdGVkSWQubGVuZ3RoID4gMCkge1xuXHRcdFx0dmFyIG5vZGUgPSBpbWFnZUZvbGRlcnNDb250cm9sLmdldEl0ZW1Ob2RlKHNlbGVjdGVkSWRbIDAgXSk7XG5cdFx0XHRpZiAobm9kZSkge1xuXHRcdFx0XHR2YXIgaW1nIDogSFRNTEltYWdlRWxlbWVudCA9ICg8YW55Pm5vZGUpLmZpcnN0RWxlbWVudENoaWxkO1xuXG5cdFx0XHRcdGlmIChpbWcudGFnTmFtZSA9PT0gXCJJTUdcIikge1xuXHRcdFx0XHRcdHZhciBjb2xvcnMgICAgICAgICAgICAgICAgID0gcGFyc2VJbnQoKDx3ZWJpeC51aS5yaWNoc2VsZWN0PiQkKFwib3B0aW9uLWNvbG9yc1wiKSkuZ2V0VmFsdWUoKSwgMTApLFxuXHRcdFx0XHRcdFx0cGFsZXR0ZVF1YW50aXplck1ldGhvZCA9IHBhcnNlSW50KCg8d2ViaXgudWkucmljaHNlbGVjdD4kJChcIm9wdGlvbi1wYWxldHRlXCIpKS5nZXRWYWx1ZSgpLCAxMCksXG5cdFx0XHRcdFx0XHRpbWFnZVF1YW50aXplck1ldGhvZCAgID0gcGFyc2VJbnQoKDx3ZWJpeC51aS5yaWNoc2VsZWN0PiQkKFwib3B0aW9uLWltYWdlXCIpKS5nZXRWYWx1ZSgpLCAxMCkgLSAyLFxuXHRcdFx0XHRcdFx0Y29sb3JEaXN0YW5jZU1ldGhvZCAgICA9IHBhcnNlSW50KCg8d2ViaXgudWkucmljaHNlbGVjdD4kJChcIm9wdGlvbi1kaXN0YW5jZVwiKSkuZ2V0VmFsdWUoKSwgMTApO1xuXG5cdFx0XHRcdFx0cXVhbnRpemVSZXN1bHQgPSAobmV3IFF1YW50aXphdGlvblVzYWdlKCkpLnF1YW50aXplKGltZywgY29sb3JzLCBwYWxldHRlUXVhbnRpemVyTWV0aG9kLCBpbWFnZVF1YW50aXplck1ldGhvZCwgY29sb3JEaXN0YW5jZU1ldGhvZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpZiAocXVhbnRpemVSZXN1bHQpIHtcblx0XHRmaWxsQ2xpY2tUb0NvbXBhcmUocXVhbnRpemVSZXN1bHQpO1xuXHRcdGZpbGxPcmlnaW5hbFZzUXVhbnRpemVkKHF1YW50aXplUmVzdWx0KTtcblx0fVxufVxuXG5mdW5jdGlvbiBmaWxsT3JpZ2luYWxWc1F1YW50aXplZChyZXN1bHQpIHtcblx0dmFyIHByZWZpeCA9IFwiaWQtaW1hZ2VWaWV3Mi1cIjtcblx0Ly8gQ0xFQU5VUFxuXHQvL2NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXHQkJChcImltYWdlVmlldzItc3RhdGlzdGljc1wiKS5nZXROb2RlKCkuZmlyc3RFbGVtZW50Q2hpbGQuaW5uZXJIVE1MID0gXCIgKFNTSU06IFwiICsgcmVzdWx0LnNzaW0udG9GaXhlZCgyKSArIFwiLCBUaW1lOiBcIiArIHJlc3VsdC50aW1lICsgXCIgKVwiO1xuXG5cdC8vIERSQVcgT1JJR0lOQUwgSU1BR0Vcblx0dmFyIGNhbnZhcyAgICAgICAgICA9IFF1YW50aXphdGlvblVzYWdlLmRyYXdQaXhlbHMocmVzdWx0Lm9yaWdpbmFsLCByZXN1bHQub3JpZ2luYWwuZ2V0V2lkdGgoKSk7XG5cdGNhbnZhcy5pZCAgICAgICAgICAgPSBwcmVmaXggKyBcIm9yaWdpbmFsLWltYWdlXCI7XG5cdGNhbnZhcy5jbGFzc05hbWUgICAgPSBcImltYWdlLXNlbWktdHJhbnNwYXJlbnQtYmFja2dyb3VuZFwiO1xuXHQvL2NhbnZhcy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdHZhciBjb250YWluZXIgICAgICAgPSAkJChcImltYWdlVmlldzItaW1hZ2Utb3JpZ2luYWxcIikuZ2V0Tm9kZSgpLmZpcnN0RWxlbWVudENoaWxkO1xuXHRjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cblx0Ly8gRFJBVyBSRURVQ0VEL0RJVEhFUkVEIElNQUdFXG5cdGNhbnZhcyAgICAgICAgICAgICAgPSBRdWFudGl6YXRpb25Vc2FnZS5kcmF3UGl4ZWxzKHJlc3VsdC5pbWFnZSwgcmVzdWx0LmltYWdlLmdldFdpZHRoKCkpO1xuXHRjYW52YXMuaWQgICAgICAgICAgID0gcHJlZml4ICsgXCJyZWR1Y2VkLWltYWdlXCI7XG5cdGNhbnZhcy5jbGFzc05hbWUgICAgPSBcImltYWdlLXNlbWktdHJhbnNwYXJlbnQtYmFja2dyb3VuZFwiO1xuXHRjb250YWluZXIgICAgICAgICAgID0gJCQoXCJpbWFnZVZpZXcyLWltYWdlLXF1YW50aXplZFwiKS5nZXROb2RlKCkuZmlyc3RFbGVtZW50Q2hpbGQ7XG5cdGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoY2FudmFzKTtcblxuXHQvLyBEUkFXIFBBTEVUVEVcblx0Y2FudmFzICAgICAgICAgICAgICA9IFF1YW50aXphdGlvblVzYWdlLmRyYXdQaXhlbHMocmVzdWx0LnBhbGV0dGUuZ2V0UG9pbnRDb250YWluZXIoKSwgMTYsIDEyOCk7XG5cdGNvbnRhaW5lciAgICAgICAgICAgPSAkJChcImltYWdlVmlldzItcGFsZXR0ZVwiKS5nZXROb2RlKCkuZmlyc3RFbGVtZW50Q2hpbGQ7XG5cdGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbn1cblxuZnVuY3Rpb24gZmlsbENsaWNrVG9Db21wYXJlKHJlc3VsdCkge1xuXHR2YXIgcHJlZml4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IFwiaWQtaW1hZ2VWaWV3Mi1cIjtcblx0Ly8gQ0xFQU5VUFxuXHQkJChcImltYWdlVmlldzEtc3RhdGlzdGljc1wiKS5nZXROb2RlKCkuZmlyc3RFbGVtZW50Q2hpbGQuaW5uZXJIVE1MID0gXCIgKFNTSU06IFwiICsgcmVzdWx0LnNzaW0udG9GaXhlZCgyKSArIFwiLCBUaW1lOiBcIiArIHJlc3VsdC50aW1lICsgXCIgKVwiO1xuXG5cdC8vIERSQVcgT1JJR0lOQUwgSU1BR0Vcblx0dmFyIGNhbnZhc09yaWdpbmFsICAgICAgICAgICA9IFF1YW50aXphdGlvblVzYWdlLmRyYXdQaXhlbHMocmVzdWx0Lm9yaWdpbmFsLCByZXN1bHQub3JpZ2luYWwuZ2V0V2lkdGgoKSk7XG5cdGNhbnZhc09yaWdpbmFsLmlkICAgICAgICAgICAgPSBwcmVmaXggKyBcIm9yaWdpbmFsLWltYWdlXCI7XG5cdGNhbnZhc09yaWdpbmFsLmNsYXNzTmFtZSAgICAgPSBcImltYWdlLXNlbWktdHJhbnNwYXJlbnQtYmFja2dyb3VuZFwiO1xuXHRjYW52YXNPcmlnaW5hbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdHZhciBjb250YWluZXIgICAgICAgICAgICAgICAgPSAkJChcImltYWdlVmlldzEtaW1hZ2VcIikuZ2V0Tm9kZSgpLmZpcnN0RWxlbWVudENoaWxkO1xuXHRjb250YWluZXIuaW5uZXJIVE1MICAgICAgICAgID0gXCJcIjtcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGNhbnZhc09yaWdpbmFsKTtcblxuXHQvLyBEUkFXIFJFRFVDRUQvRElUSEVSRUQgSU1BR0Vcblx0dmFyIGNhbnZhc1JlZHVjZWQgICAgICAgPSBRdWFudGl6YXRpb25Vc2FnZS5kcmF3UGl4ZWxzKHJlc3VsdC5pbWFnZSwgcmVzdWx0LmltYWdlLmdldFdpZHRoKCkpO1xuXHRjYW52YXNSZWR1Y2VkLmlkICAgICAgICA9IHByZWZpeCArIFwicmVkdWNlZC1pbWFnZVwiO1xuXHRjYW52YXNSZWR1Y2VkLmNsYXNzTmFtZSA9IFwiaW1hZ2Utc2VtaS10cmFuc3BhcmVudC1iYWNrZ3JvdW5kXCI7XG5cdGNvbnRhaW5lciAgICAgICAgICAgICAgID0gJCQoXCJpbWFnZVZpZXcxLWltYWdlXCIpLmdldE5vZGUoKS5maXJzdEVsZW1lbnRDaGlsZDtcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGNhbnZhc1JlZHVjZWQpO1xuXG5cdC8vIEFkZCBDb250YWluZXIgaGFuZGxlcnNcblx0Y29udGFpbmVyLm9ubW91c2Vkb3duID0gKCkgPT4ge1xuXHRcdGNhbnZhc09yaWdpbmFsLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuXHRcdGNhbnZhc1JlZHVjZWQuc3R5bGUuZGlzcGxheSAgPSBcIm5vbmVcIjtcblx0fTtcblx0Y29udGFpbmVyLm9ubW91c2V1cCAgID0gKCkgPT4ge1xuXHRcdGNhbnZhc09yaWdpbmFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRjYW52YXNSZWR1Y2VkLnN0eWxlLmRpc3BsYXkgID0gXCJcIjtcblx0fTtcblxuXHQvLyBEUkFXIFBBTEVUVEVcblx0dmFyIGNhbnZhc1BhbGV0dGUgICA9IFF1YW50aXphdGlvblVzYWdlLmRyYXdQaXhlbHMocmVzdWx0LnBhbGV0dGUuZ2V0UG9pbnRDb250YWluZXIoKSwgMTYsIDEyOCk7XG5cdGNvbnRhaW5lciAgICAgICAgICAgPSAkJChcImltYWdlVmlldzEtcGFsZXR0ZVwiKS5nZXROb2RlKCkuZmlyc3RFbGVtZW50Q2hpbGQ7XG5cdGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoY2FudmFzUGFsZXR0ZSk7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NEcmFnKGZpbGUpIHtcblx0dmFyIHJlYWRlciAgICA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cdHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHQoPHdlYml4LnVpLmdyb3VwbGlzdD4kJChcImltYWdlXCIpKS5hZGQoe1xuXHRcdFx0aWQgICAgICA6ICdpbWFnZS0nICsgZmlsZS5uYW1lLFxuXHRcdFx0ZGF0YVVybCA6ICg8YW55PmV2ZW50LnRhcmdldCkucmVzdWx0XG5cdFx0fSk7XG5cdH07XG5cblx0cmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udHJvbGxlci91aS50cyIsIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uL2xpYi93ZWJpeC93ZWJpeC5kLnRzXCIvPlxuaW1wb3J0IHtpbml0aWFsaXplfSBmcm9tIFwiLi9jb250cm9sbGVyL3VpXCI7XG5pbXBvcnQge2xlZnRQYW5lbH0gZnJvbSBcIi4vdWkvbGVmdFBhbmVsL2xlZnRQYW5lbFwiO1xuaW1wb3J0IHtyaWdodFBhbmVsfSBmcm9tIFwiLi91aS9yaWdodFBhbmVsL3JpZ2h0UGFuZWxcIjtcblxud2ViaXgucmVhZHkoZnVuY3Rpb24gKCkge1xuXG5cdHdlYml4LnVpKHtcblx0XHR0eXBlIDogXCJsaW5lXCIsXG5cdFx0Y29scyA6IFtcblx0XHRcdHtcblx0XHRcdFx0d2lkdGggIDogNTAwLFxuXHRcdFx0XHRoZWFkZXIgOiBcIlNldHRpbmdzICYgRm9sZGVyc1wiLCBoZWFkZXJIZWlnaHQgOiA0NSxcblx0XHRcdFx0Ym9keSAgIDogbGVmdFBhbmVsXG5cdFx0XHR9LFxuXHRcdFx0eyB2aWV3IDogXCJyZXNpemVyXCIgfSxcblx0XHRcdHJpZ2h0UGFuZWxcblx0XHRdXG5cdH0pO1xuXG5cdGluaXRpYWxpemUoKTtcblxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwLnRzIiwiaW1wb3J0ICogYXMgaXEgZnJvbSBcImltYWdlLXFcIjtcblxuZXhwb3J0IGNsYXNzIFF1YW50aXphdGlvblVzYWdlIHtcblx0c3RhdGljIGRyYXdQaXhlbHMocG9pbnRDb250YWluZXIsIHdpZHRoMCwgd2lkdGgxPyA6IG51bWJlcikge1xuXHRcdHZhciBpZHhpOCAgPSBwb2ludENvbnRhaW5lci50b1VpbnQ4QXJyYXkoKSxcblx0XHRcdGlkeGkzMiA9IG5ldyBVaW50MzJBcnJheShpZHhpOC5idWZmZXIpO1xuXG5cdFx0d2lkdGgxID0gd2lkdGgxIHx8IHdpZHRoMDtcblxuXHRcdHZhciBjYW4gICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSxcblx0XHRcdGNhbjIgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLFxuXHRcdFx0Y3R4IDogYW55ICA9IGNhbi5nZXRDb250ZXh0KFwiMmRcIiksXG5cdFx0XHRjdHgyIDogYW55ID0gY2FuMi5nZXRDb250ZXh0KFwiMmRcIik7XG5cblx0XHRjYW4ud2lkdGggICA9IHdpZHRoMDtcblx0XHRjYW4uaGVpZ2h0ICA9IE1hdGguY2VpbChpZHhpMzIubGVuZ3RoIC8gd2lkdGgwKTtcblx0XHRjYW4yLndpZHRoICA9IHdpZHRoMTtcblx0XHRjYW4yLmhlaWdodCA9IE1hdGguY2VpbChjYW4uaGVpZ2h0ICogd2lkdGgxIC8gd2lkdGgwKTtcblxuXHRcdGN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBjdHgubW96SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gY3R4LndlYmtpdEltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGN0eC5tc0ltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXHRcdGN0eDIuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gY3R4Mi5tb3pJbWFnZVNtb290aGluZ0VuYWJsZWQgPSBjdHgyLndlYmtpdEltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGN0eDIubXNJbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuXHRcdHZhciBpbWdkID0gY3R4LmNyZWF0ZUltYWdlRGF0YShjYW4ud2lkdGgsIGNhbi5oZWlnaHQpO1xuXG5cdFx0aWYgKFF1YW50aXphdGlvblVzYWdlLl90eXBlT2YoaW1nZC5kYXRhKSA9PSBcIkNhbnZhc1BpeGVsQXJyYXlcIikge1xuXHRcdFx0dmFyIGRhdGEgPSBpbWdkLmRhdGE7XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gZGF0YS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuXHRcdFx0XHRkYXRhWyBpIF0gPSBpZHhpOFsgaSBdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHZhciBidWYzMiA9IG5ldyBVaW50MzJBcnJheShpbWdkLmRhdGEuYnVmZmVyKTtcblx0XHRcdGJ1ZjMyLnNldChpZHhpMzIpO1xuXHRcdH1cblxuXHRcdGN0eC5wdXRJbWFnZURhdGEoaW1nZCwgMCwgMCk7XG5cblx0XHRjdHgyLmRyYXdJbWFnZShjYW4sIDAsIDAsIGNhbjIud2lkdGgsIGNhbjIuaGVpZ2h0KTtcblxuXHRcdHJldHVybiBjYW4yO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgX3R5cGVPZih2YWwpIHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkuc2xpY2UoOCwgLTEpO1xuXHR9XG5cblx0cHJpdmF0ZSBfdGltZU1hcmsodGl0bGUsIGNhbGxiYWNrKSB7XG5cdFx0dmFyIHN0YXJ0ID0gRGF0ZS5ub3coKTtcblx0XHRjYWxsYmFjaygpO1xuXHRcdGNvbnNvbGUubG9nKHRpdGxlICsgXCI6IFwiICsgKERhdGUubm93KCkgLSBzdGFydCkpO1xuXHR9XG5cblx0cHJpdmF0ZSBfYmFzZU5hbWUoc3JjKSB7XG5cdFx0cmV0dXJuIHNyYy5zcGxpdChcIi9cIikucG9wKCkuc3BsaXQoXCIuXCIpO1xuXHR9XG5cblx0cHVibGljIHF1YW50aXplKGltZyA6IEhUTUxJbWFnZUVsZW1lbnQsIG9wdGlvbkNvbG9ycywgb3B0aW9uUGFsZXR0ZVF1YW50aXplciwgb3B0aW9uSW1hZ2VEaXRoZXJpbmcsIG9wdGlvbkNvbG9yRGlzdGFuY2UpIDoge3BhbGV0dGUgOiBpcS51dGlscy5QYWxldHRlLCBpbWFnZSA6IGlxLnV0aWxzLlBvaW50Q29udGFpbmVyLCB0aW1lIDogbnVtYmVyLCBzc2ltIDogbnVtYmVyLCBvcmlnaW5hbCA6IGlxLnV0aWxzLlBvaW50Q29udGFpbmVyfSB7XG5cdFx0dmFyIHBvaW50QnVmZmVyIDogaXEudXRpbHMuUG9pbnRDb250YWluZXIsXG5cdFx0XHRvcmlnaW5hbFBvaW50QnVmZmVyIDogaXEudXRpbHMuUG9pbnRDb250YWluZXIsXG5cdFx0XHRwYWxldHRlUXVhbnRpemVyIDogaXEucGFsZXR0ZS5BYnN0cmFjdFBhbGV0dGVRdWFudGl6ZXIsXG5cdFx0XHRpZCA9IHRoaXMuX2Jhc2VOYW1lKGltZy5zcmMpWyAwIF0sXG5cdFx0XHRwYWxldHRlIDogaXEudXRpbHMuUGFsZXR0ZSxcblx0XHRcdGltYWdlIDogaXEudXRpbHMuUG9pbnRDb250YWluZXI7XG5cblx0XHRwb2ludEJ1ZmZlciAgICAgICAgID0gaXEudXRpbHMuUG9pbnRDb250YWluZXIuZnJvbUhUTUxJbWFnZUVsZW1lbnQoaW1nKTtcblx0XHRvcmlnaW5hbFBvaW50QnVmZmVyID0gcG9pbnRCdWZmZXIuY2xvbmUoKTtcblxuXHRcdHZhciB0aW1lID0gRGF0ZS5ub3coKTtcblxuXHRcdGNvbnNvbGUubG9nKFwiaW1hZ2UgPSBcIiArIGlkKTtcblx0XHR0aGlzLl90aW1lTWFyayhcIi4uLnNhbXBsZVwiLCAoKSA9PiB7XG5cdFx0XHR2YXIgZGlzdGFuY2UgOiBpcS5kaXN0YW5jZS5BYnN0cmFjdERpc3RhbmNlQ2FsY3VsYXRvciA9IHRoaXMuX2dldENvbG9yRGlzdGFuY2VDYWxjdWxhdG9yKG9wdGlvbkNvbG9yRGlzdGFuY2UpO1xuXG5cdFx0XHRzd2l0Y2ggKG9wdGlvblBhbGV0dGVRdWFudGl6ZXIpIHtcblx0XHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRcdHBhbGV0dGVRdWFudGl6ZXIgPSBuZXcgaXEucGFsZXR0ZS5OZXVRdWFudChkaXN0YW5jZSwgb3B0aW9uQ29sb3JzKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHRcdHBhbGV0dGVRdWFudGl6ZXIgPSBuZXcgaXEucGFsZXR0ZS5SR0JRdWFudChkaXN0YW5jZSwgb3B0aW9uQ29sb3JzKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRcdHBhbGV0dGVRdWFudGl6ZXIgPSBuZXcgaXEucGFsZXR0ZS5XdVF1YW50KGRpc3RhbmNlLCBvcHRpb25Db2xvcnMpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDQ6XG5cdFx0XHRcdFx0cGFsZXR0ZVF1YW50aXplciA9IG5ldyBpcS5wYWxldHRlLk5ldVF1YW50RmxvYXQoZGlzdGFuY2UsIG9wdGlvbkNvbG9ycyk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRwYWxldHRlUXVhbnRpemVyLnNhbXBsZShwb2ludEJ1ZmZlcik7XG5cdFx0fSk7XG5cblx0XHR0aGlzLl90aW1lTWFyayhcIi4uLnBhbGV0dGVcIiwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cGFsZXR0ZSA9IHBhbGV0dGVRdWFudGl6ZXIucXVhbnRpemUoKTtcblx0XHR9KTtcblxuXHRcdHRoaXMuX3RpbWVNYXJrKFwiLi4uZGl0aGVyXCIsICgpID0+IHtcblx0XHRcdHZhciBkaXN0YW5jZSA6IGlxLmRpc3RhbmNlLkFic3RyYWN0RGlzdGFuY2VDYWxjdWxhdG9yID0gdGhpcy5fZ2V0Q29sb3JEaXN0YW5jZUNhbGN1bGF0b3Iob3B0aW9uQ29sb3JEaXN0YW5jZSk7XG5cblx0XHRcdHZhciBpbWFnZVF1YW50aXplcjtcblx0XHRcdGlmIChvcHRpb25JbWFnZURpdGhlcmluZyA9PT0gLTEpIHtcblx0XHRcdFx0aW1hZ2VRdWFudGl6ZXIgPSBuZXcgaXEuaW1hZ2UuTmVhcmVzdENvbG9yKGRpc3RhbmNlKTtcblx0XHRcdH0gZWxzZSBpZiAob3B0aW9uSW1hZ2VEaXRoZXJpbmcgPT09IDkpIHtcblx0XHRcdFx0aW1hZ2VRdWFudGl6ZXIgPSBuZXcgaXEuaW1hZ2UuRXJyb3JEaWZmdXNpb25SaWVtZXJzbWEoZGlzdGFuY2UpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aW1hZ2VRdWFudGl6ZXIgPSBuZXcgaXEuaW1hZ2UuRXJyb3JEaWZmdXNpb25BcnJheShkaXN0YW5jZSwgb3B0aW9uSW1hZ2VEaXRoZXJpbmcsIHRydWUsIDAsIGZhbHNlKTtcblx0XHRcdH1cblxuXHRcdFx0aW1hZ2UgPSBpbWFnZVF1YW50aXplci5xdWFudGl6ZShwb2ludEJ1ZmZlciwgcGFsZXR0ZSk7XG5cdFx0fSk7XG5cblx0XHR0aW1lICAgICA9IERhdGUubm93KCkgLSB0aW1lO1xuXHRcdHZhciBzc2ltID0gaXEucXVhbGl0eS5zc2ltKG9yaWdpbmFsUG9pbnRCdWZmZXIsIHBvaW50QnVmZmVyKTtcblxuXHRcdHRoaXMuX2NoZWNrSW1hZ2VBbmRQYWxldHRlKGltYWdlLCBwYWxldHRlLCBvcHRpb25Db2xvcnMpO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdG9yaWdpbmFsIDogb3JpZ2luYWxQb2ludEJ1ZmZlcixcblx0XHRcdGltYWdlICAgIDogaW1hZ2UsXG5cdFx0XHRwYWxldHRlICA6IHBhbGV0dGUsXG5cdFx0XHR0aW1lICAgICA6IHRpbWUsXG5cdFx0XHRzc2ltICAgICA6IHNzaW1cblx0XHR9O1xuXHR9XG5cblx0cHJpdmF0ZSBfZ2V0Q29sb3JEaXN0YW5jZUNhbGN1bGF0b3Iob3B0aW9uKSA6IGlxLmRpc3RhbmNlLkFic3RyYWN0RGlzdGFuY2VDYWxjdWxhdG9yIHtcblx0XHRzd2l0Y2ggKG9wdGlvbikge1xuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRyZXR1cm4gbmV3IGlxLmRpc3RhbmNlLkV1Y2xpZGVhbigpO1xuXHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHRyZXR1cm4gbmV3IGlxLmRpc3RhbmNlLk1hbmhhdHRhbigpO1xuXHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRyZXR1cm4gbmV3IGlxLmRpc3RhbmNlLkNJRURFMjAwMCgpO1xuXHRcdFx0Y2FzZSA0OlxuXHRcdFx0XHRyZXR1cm4gbmV3IGlxLmRpc3RhbmNlLkNJRTk0VGV4dGlsZXMoKTtcblx0XHRcdGNhc2UgNTpcblx0XHRcdFx0cmV0dXJuIG5ldyBpcS5kaXN0YW5jZS5DSUU5NEdyYXBoaWNBcnRzKCk7XG5cdFx0XHRjYXNlIDY6XG5cdFx0XHRcdHJldHVybiBuZXcgaXEuZGlzdGFuY2UuRXVjbGlkZWFuQlQ3MDlOb0FscGhhKCk7XG5cdFx0XHRjYXNlIDc6XG5cdFx0XHRcdHJldHVybiBuZXcgaXEuZGlzdGFuY2UuRXVjbGlkZWFuQlQ3MDkoKTtcblx0XHRcdGNhc2UgODpcblx0XHRcdFx0cmV0dXJuIG5ldyBpcS5kaXN0YW5jZS5NYW5oYXR0YW5CVDcwOSgpO1xuXHRcdFx0Y2FzZSA5OlxuXHRcdFx0XHRyZXR1cm4gbmV3IGlxLmRpc3RhbmNlLkNNZXRyaWMoKTtcblx0XHRcdGNhc2UgMTA6XG5cdFx0XHRcdHJldHVybiBuZXcgaXEuZGlzdGFuY2UuUE5HUXVhbnQoKTtcblx0XHRcdGNhc2UgMTE6XG5cdFx0XHRcdHJldHVybiBuZXcgaXEuZGlzdGFuY2UuTWFuaGF0dGFuTm9tbXlkZSgpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgX2NoZWNrSW1hZ2VBbmRQYWxldHRlKGltYWdlIDogaXEudXRpbHMuUG9pbnRDb250YWluZXIsIHBhbGV0dGUgOiBpcS51dGlscy5QYWxldHRlLCBjb2xvcnMgOiBudW1iZXIpIDogdm9pZCB7XG5cdFx0Ly8gY2hlY2sgcGFsZXR0ZVxuXHRcdGlmIChwYWxldHRlLmdldFBvaW50Q29udGFpbmVyKCkuZ2V0UG9pbnRBcnJheSgpLmxlbmd0aCA+IGNvbG9ycykge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiUGFsZXR0ZSBjb250YWlucyBtb3JlIGNvbG9ycyB0aGFuIGFsbG93ZWRcIik7XG5cdFx0fVxuXG5cdFx0Ly8gY2hlY2sgaW1hZ2Vcblx0XHRpbWFnZS5nZXRQb2ludEFycmF5KCkuZm9yRWFjaCgocG9pbnQgOiBpcS51dGlscy5Qb2ludCkgPT4ge1xuXHRcdFx0aWYgKCFwYWxldHRlLmhhcyhwb2ludCkpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW1hZ2UgY29udGFpbnMgY29sb3Igbm90IGluIHBhbGV0dGU6IFwiICsgcG9pbnQuciArIFwiLFwiICsgcG9pbnQuZyArIFwiLFwiICsgcG9pbnQuYiArIFwiLFwiICsgcG9pbnQuYSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRyb2xsZXIvdXNhZ2UudHMiLCJtb2R1bGUuZXhwb3J0cyA9IGltYWdlLXE7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJpbWFnZS1xXCJcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtjb25maWdGb3JtfSBmcm9tIFwiLi9jb25maWdGb3JtXCI7XG5pbXBvcnQge2ltYWdlRm9sZGVyc1BhbmVsfSBmcm9tIFwiLi9pbWFnZUZpbGVFeHBsb3JlclwiO1xuXG5leHBvcnQgdmFyIGxlZnRQYW5lbCA9IHtcblx0dHlwZSA6IFwibGluZVwiLFxuXHRyb3dzIDogW1xuXHRcdGNvbmZpZ0Zvcm0sXG5cdFx0eyB0eXBlIDogXCJoZWFkZXJcIiwgdGVtcGxhdGUgOiBcIkltYWdlIEZvbGRlclwiIH0sXG5cdFx0aW1hZ2VGb2xkZXJzUGFuZWxcblx0XVxufTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3VpL2xlZnRQYW5lbC9sZWZ0UGFuZWwudHMiLCJpbXBvcnQge3VwZGF0ZX0gZnJvbSBcIi4uLy4uL2NvbnRyb2xsZXIvdWlcIjtcblxuZXhwb3J0IHZhciBjb25maWdGb3JtID0ge1xuXHR2aWV3IDogXCJmb3JtXCIsIGlkIDogXCJteWZvcm1cIiwgd2lkdGggOiAzMDAsIGVsZW1lbnRzIDogW1xuXHRcdHtcblx0XHRcdHZpZXcgICAgICAgOiBcInJpY2hzZWxlY3RcIixcblx0XHRcdGlkICAgICAgICAgOiBcIm9wdGlvbi1jb2xvcnNcIixcblx0XHRcdGxhYmVsICAgICAgOiBcIkNvbG9yc1wiLFxuXHRcdFx0bGFiZWxXaWR0aCA6IDE3NSxcblx0XHRcdHZhbHVlICAgICAgOiBcIjI1NlwiLFxuXHRcdFx0b3B0aW9ucyAgICA6IFtcblx0XHRcdFx0XCIyXCIsXG5cdFx0XHRcdFwiNFwiLFxuXHRcdFx0XHRcIjE2XCIsXG5cdFx0XHRcdFwiNjRcIixcblx0XHRcdFx0XCIxMjhcIixcblx0XHRcdFx0XCIyNTZcIixcblx0XHRcdFx0XCI1MTJcIixcblx0XHRcdFx0XCIxMDI0XCIsXG5cdFx0XHRcdFwiMjA0OFwiLFxuXHRcdFx0XHRcIjgxOTJcIlxuXHRcdFx0XVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0dmlldyAgICAgICA6IFwicmljaHNlbGVjdFwiLFxuXHRcdFx0aWQgICAgICAgICA6IFwib3B0aW9uLWRpc3RhbmNlXCIsXG5cdFx0XHRsYWJlbCAgICAgIDogXCJDb2xvciBEaXN0YW5jZSBFcXVhdGlvblwiLFxuXHRcdFx0bGFiZWxXaWR0aCA6IDE3NSxcblx0XHRcdHZhbHVlICAgICAgOiBcIjJcIixcblx0XHRcdG9wdGlvbnMgICAgOiBbXG5cdFx0XHRcdHsgaWQgOiAxLCB2YWx1ZSA6IFwiRXVjbGlkZWFuXCIgfSxcblx0XHRcdFx0eyBpZCA6IDIsIHZhbHVlIDogXCJNYW5oYXR0YW5cIiB9LFxuXHRcdFx0XHR7IGlkIDogMywgdmFsdWUgOiBcIkNJRURFMjAwMFwiIH0sXG5cdFx0XHRcdHsgaWQgOiA0LCB2YWx1ZSA6IFwiQ0lFOTQgVGV4dGlsZXNcIiB9LFxuXHRcdFx0XHR7IGlkIDogNSwgdmFsdWUgOiBcIkNJRTk0IEdyYXBoaWNBcnRzXCIgfSxcblx0XHRcdFx0eyBpZCA6IDYsIHZhbHVlIDogXCJFdWNsaWRlYW4gQlQ3MDkgTm9BbHBoYSA8LS0gZGVmYXVsdCBmb3IgUkdCUXVhbnRcIiB9LFxuXHRcdFx0XHR7IGlkIDogNywgdmFsdWUgOiBcIkV1Y2xpZGVhbiBCVDcwOVwiIH0sXG5cdFx0XHRcdHsgaWQgOiA4LCB2YWx1ZSA6IFwiTWFuaGF0dGFuIEJUNzA5XCIgfSxcblx0XHRcdFx0eyBpZCA6IDksIHZhbHVlIDogXCJDTWV0cmljXCIgfSxcblx0XHRcdFx0eyBpZCA6IDEwLCB2YWx1ZSA6IFwiUE5HUXVhbnRcIiB9LFxuXHRcdFx0XHR7IGlkIDogMTEsIHZhbHVlIDogXCJNYW5oYXR0YW4gTm9tbXlkZVwiIH1cblx0XHRcdF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdHZpZXcgICAgICAgOiBcInJpY2hzZWxlY3RcIixcblx0XHRcdGlkICAgICAgICAgOiBcIm9wdGlvbi1wYWxldHRlXCIsXG5cdFx0XHRsYWJlbCAgICAgIDogXCJRdWFudGl6YXRpb24gTWV0aG9kXCIsXG5cdFx0XHRsYWJlbFdpZHRoIDogMTc1LFxuXHRcdFx0dmFsdWUgICAgICA6IFwiMVwiLFxuXHRcdFx0b3B0aW9ucyAgICA6IFtcblx0XHRcdFx0eyBpZCA6IDEsIHZhbHVlIDogXCJuZXVxdWFudCAoT3JpZ2luYWwsIEludGVnZXIpXCIgfSxcblx0XHRcdFx0eyBpZCA6IDIsIHZhbHVlIDogXCJyZ2JxdWFudFwiIH0sXG5cdFx0XHRcdHsgaWQgOiAzLCB2YWx1ZSA6IFwid3VxdWFudFwiIH0sXG5cdFx0XHRcdHsgaWQgOiA0LCB2YWx1ZSA6IFwibmV1cXVhbnQgKEZsb2F0aW5nIFBvaW50KVwiIH1cblx0XHRcdF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdHZpZXcgICAgICAgOiBcInJpY2hzZWxlY3RcIixcblx0XHRcdGlkICAgICAgICAgOiBcIm9wdGlvbi1pbWFnZVwiLFxuXHRcdFx0bGFiZWwgICAgICA6IFwiUGFsZXR0ZS10by1JbWFnZSBNZXRob2RcIixcblx0XHRcdGxhYmVsV2lkdGggOiAxNzUsXG5cdFx0XHR2YWx1ZSAgICAgIDogXCIxXCIsXG5cdFx0XHRvcHRpb25zICAgIDogW1xuXHRcdFx0XHR7IGlkIDogMSwgdmFsdWUgOiBcIk5lYXJlc3QgKFNpbXBsZSlcIiB9LFxuXHRcdFx0XHR7IGlkIDogMiwgdmFsdWUgOiBcIkVycm9yRGlmZnVzaW9uOiBBcnJheSAoRmxveWQtU3RlaW5iZXJnKVwiIH0sXG5cdFx0XHRcdHsgaWQgOiA0LCB2YWx1ZSA6IFwiRXJyb3JEaWZmdXNpb246IEFycmF5IChTdHVja2kpXCIgfSxcblx0XHRcdFx0eyBpZCA6IDUsIHZhbHVlIDogXCJFcnJvckRpZmZ1c2lvbjogQXJyYXkgKEF0a2luc29uKVwiIH0sXG5cdFx0XHRcdHsgaWQgOiA2LCB2YWx1ZSA6IFwiRXJyb3JEaWZmdXNpb246IEFycmF5IChKYXJ2aXMpXCIgfSxcblx0XHRcdFx0eyBpZCA6IDcsIHZhbHVlIDogXCJFcnJvckRpZmZ1c2lvbjogQXJyYXkgKEJ1cmtlcylcIiB9LFxuXHRcdFx0XHR7IGlkIDogOCwgdmFsdWUgOiBcIkVycm9yRGlmZnVzaW9uOiBBcnJheSAoU2llcnJhKVwiIH0sXG5cdFx0XHRcdHsgaWQgOiA5LCB2YWx1ZSA6IFwiRXJyb3JEaWZmdXNpb246IEFycmF5IChUd29TaWVycmEpXCIgfSxcblx0XHRcdFx0eyBpZCA6IDEwLCB2YWx1ZSA6IFwiRXJyb3JEaWZmdXNpb246IEFycmF5IChTaWVycmFMaXRlKVwiIH0sXG5cdFx0XHRcdHsgaWQgOiAzLCB2YWx1ZSA6IFwiRXJyb3JEaWZmdXNpb246IEFycmF5IChGYWxzZSBGbG95ZC1TdGVpbmJlcmcpXCIgfSxcblx0XHRcdFx0eyBpZCA6IDExLCB2YWx1ZSA6IFwiRXJyb3JEaWZmdXNpb246IFJpZW1lcnNtYSAoSGlsYmVydCBDdXJ2ZSlcIiB9XG5cdFx0XHRdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHR0eXBlICAgICA6IFwibGluZVwiLFxuXHRcdFx0dmlldyAgICAgOiBcInRvb2xiYXJcIixcblx0XHRcdGVsZW1lbnRzIDogWyB7fSwge1xuXHRcdFx0XHR2aWV3IDogXCJidXR0b25cIiwgdmFsdWUgOiBcIlVwZGF0ZVwiLCB3aWR0aCA6IDkwLCBvbiA6IHtcblx0XHRcdFx0XHRvbkl0ZW1DbGljayA6ICgpID0+IHtcblx0XHRcdFx0XHRcdHVwZGF0ZSh0cnVlKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBdXG5cdFx0fVxuXG5cdF1cbn07XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91aS9sZWZ0UGFuZWwvY29uZmlnRm9ybS50cyIsImltcG9ydCB7aW1hZ2VEYXRhfSBmcm9tIFwiLi4vLi4vZGF0YS9pbWFnZUxpc3RcIjtcbmltcG9ydCB7dXBkYXRlfSBmcm9tIFwiLi4vLi4vY29udHJvbGxlci91aVwiO1xuXG5leHBvcnQgdmFyIGltYWdlRm9sZGVyc1BhbmVsID0ge1xuXHRpZCAgICAgICA6IFwiaW1hZ2VcIixcblx0dmlldyAgICAgOiBcImdyb3VwbGlzdFwiLFxuXHR0eXBlICAgICA6IHtcblx0XHRoZWlnaHQgOiA4NFxuXHR9LFxuXHQvL2F1dG9oZWlnaHQgOiB0cnVlLFxuXHQvL2hlaWdodCA6IDgwMCxcblx0dGVtcGxhdGUgOiBmdW5jdGlvbiAob2JqIDogYW55KSB7XG5cdFx0aWYgKG9iai5kYXRhVXJsKSB7XG5cdFx0XHRyZXR1cm4gXCI8aW1nIHN0eWxlPVxcXCJoZWlnaHQ6IDg0cHhcXFwiIHNyYz1cXFwiXCIgKyBvYmouZGF0YVVybCArIFwiXFxcIi8+XCJcblx0XHR9IGVsc2UgaWYgKG9iai5mb2xkZXIgJiYgb2JqLmZpbGUpIHtcblx0XHRcdHJldHVybiBcIjxpbWcgc3R5bGU9XFxcImhlaWdodDogODRweFxcXCIgc3JjPVxcXCJpbWFnZXMvXCIgKyBvYmouZm9sZGVyICsgXCIvXCIgKyBvYmouZmlsZSArIFwiXFxcIi8+XCJcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIFwiPGRpdiBzdHlsZT1cXFwibGluZS1oZWlnaHQ6IDg0cHhcXFwiPlwiICsgb2JqLnZhbHVlICsgXCI8L2Rpdj5cIjtcblx0XHR9XG5cdH0sXG5cdHNlbGVjdCAgIDogdHJ1ZSxcblx0Ly9zY3JvbGwgOiBmYWxzZSxcblx0ZGF0YSAgICAgOiBpbWFnZURhdGEsXG5cdG9uICAgICAgIDoge1xuXHRcdFwib25hZnRlcnNlbGVjdFwiIDogKGlkKSA9PiB7XG5cdFx0XHR1cGRhdGUodHJ1ZSk7XG5cdFx0fVxuXHR9LFxuXHRyZWFkeSAgICA6IGZ1bmN0aW9uICgpIHsgIC8vc2VsZWN0IFVTQVxuXHRcdC8vdGhpcy5zZWxlY3QoMCk7XG5cdH1cblxuXHQvKlxuXHQgc2VsZWN0OnRydWUsXG5cdCBvbjp7IFwib25hZnRlcnNlbGVjdFwiOmNvdW50cnlfc2VsZWN0ZWQgfSxcblx0IHR5cGU6eyBoZWlnaHQ6IDg0IH0sXG5cdCByZWFkeTpmdW5jdGlvbigpeyAgLy9zZWxlY3QgVVNBXG5cdCB0aGlzLnNlbGVjdCg2KTtcblx0IH1cblx0ICovXG59O1xuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91aS9sZWZ0UGFuZWwvaW1hZ2VGaWxlRXhwbG9yZXIudHMiLCJ2YXIgaW1hZ2VMaXN0ID0ge1xuXHRcImFscGhhXCIgICAgIDogW1xuXHRcdFwiY2hpbGRyZW4tNzQ1Njc0XzE5MjAucG5nXCIsXG5cdFx0XCJhbHBoYS5wbmdcIixcblx0XHRcIkFscGhhQmFsbC5wbmdcIixcblx0XHRcIkFscGhhRWRnZS5wbmdcIixcblx0XHRcImFscGhhdGVzdC5wbmdcIixcblx0XHRcImNoZXJyaWVzLXJlYWxpc3RpYy5wbmdcIixcblx0XHRcImRpY2UtdHJhbnMucG5nXCIsXG5cdFx0XCJwbmdncmFkMTZyZ2JhLnBuZ1wiLFxuXHRcdFwidHVtYmxyX21veXc2MlJ5UW8xczVqanR6bzFfNTAwLnBuZ1wiLFxuXHRcdFwiV2lsYmVyLWh1Z2UtYWxwaGEucG5nXCJcblx0XSxcblx0XCJncmFkaWVudHNcIiA6IFtcblx0XHRcImNvbG9ycGFuMi5wbmdcIixcblx0XHRcImRpdGhncmFkcy5wbmdcIixcblx0XHRcImdyYWRfZGVmYXVsdC5wbmdcIixcblx0XHRcImdyYWQucG5nXCIsXG5cdFx0XCJncmFkNS5wbmdcIixcblx0XHRcImdyYWQ2LnBuZ1wiLFxuXHRcdFwiZ3JhZDcucG5nXCIsXG5cdFx0XCJncmFkOC5wbmdcIixcblx0XHRcInBuZ2dyYWQ4cmdiLnBuZ1wiLFxuXHRcdFwic2N1bHB0bWFwLnBuZ1wiXG5cdF0sXG5cdFwiZ3JhcGhpY3NcIiAgOiBbXG5cdFx0XCJiYXNlYmFsbC5qcGdcIixcblx0XHRcImJlYm9wLmpwZ1wiLFxuXHRcdFwibWluZWNyYWZ0LnBuZ1wiLFxuXHRcdFwicGVuZ3VpbnMucG5nXCIsXG5cdFx0XCJwb29sLnBuZ1wiLFxuXHRcdFwicm9zZS5wbmdcIixcblx0XHRcInNtYjMucG5nXCIsXG5cdFx0XCJzdXBlcjEucG5nXCIsXG5cdFx0XCJzdXBlcjIucG5nXCJcblx0XSxcblx0XCJwaG90b3MxXCIgICA6IFtcblx0XHRcImJpa2luZy5qcGdcIixcblx0XHRcImJsdWZmLmpwZ1wiLFxuXHRcdFwiY2xvdWRwbGFuZS5qcGdcIixcblx0XHRcImNvbXBjdWJlLmpwZ1wiLFxuXHRcdFwiZmlzaGllMi5qcGdcIixcblx0XHRcImtpdHRlaDEuanBnXCIsXG5cdFx0XCJtZWR1c2EuanBnXCIsXG5cdFx0XCJwaGVhc2FudC5qcGdcIixcblx0XHRcInBob3RvbWFuLmpwZ1wiLFxuXHRcdFwicmFpbmJvdy5qcGdcIixcblx0XHRcInJlZHBhbmRhLmpwZ1wiXG5cdF0sXG5cdFwicGhvdG9zMlwiICAgOiBbXG5cdFx0XCJib29rLXNoZWxmLTM0OTkzNF8xOTIwLmpwZ1wiLFxuXHRcdFwiY2hpbGRyZW4tNjAyOTc3XzE5MjAucG5nXCIsXG5cdFx0XCJvbGQtYm9va3MtNDM2NDk4XzE5MjAucG5nXCIsXG5cdFx0XCJwZW5zLTkzMTc3XzE5MjAucG5nXCIsXG5cdFx0XCJiYWJ5LmpwZ1wiLFxuXHRcdFwiY2hvcHN1ZXkuanBnXCIsXG5cdFx0XCJmaXNoLmpwZ1wiLFxuXHRcdFwia2l0dGVoMi5qcGdcIixcblx0XHRcInF1YW50ZnJvZy5wbmdcIixcblx0XHRcInRyZWVmcm9nLmpwZ1wiLFxuXHRcdFwicXVhbnRmcm9nX3NtYWxsLnBuZ1wiXG5cdF1cbn07XG5cbnZhciByZXN1bHQgPSBbXTtcblxuZm9yICh2YXIgZm9sZGVyIGluIGltYWdlTGlzdCkge1xuXHRpZiAoaW1hZ2VMaXN0Lmhhc093blByb3BlcnR5KGZvbGRlcikpIHtcblx0XHR2YXIgZm9sZGVyRGF0YSA9IHtcblx0XHRcdGlkICAgIDogXCJpbWFnZS1saXN0LVwiICsgZm9sZGVyLFxuXHRcdFx0b3BlbiAgOiB0cnVlLFxuXHRcdFx0dmFsdWUgOiBmb2xkZXIsXG5cdFx0XHRkYXRhICA6IFtdXG5cdFx0fTtcblxuXHRcdGltYWdlTGlzdFsgZm9sZGVyIF0uZm9yRWFjaChmaWxlID0+IHtcblx0XHRcdGZvbGRlckRhdGEuZGF0YS5wdXNoKHtcblx0XHRcdFx0ZmlsZSAgIDogZmlsZSxcblx0XHRcdFx0Zm9sZGVyIDogZm9sZGVyLFxuXHRcdFx0XHRpZCAgICAgOiBcImltYWdlLWxpc3QtXCIgKyBmb2xkZXIgKyBcIi1cIiArIGZpbGVcblx0XHRcdH0pXG5cdFx0fSk7XG5cblx0XHRyZXN1bHQucHVzaChmb2xkZXJEYXRhKTtcblx0fVxufVxuXG5leHBvcnQgdmFyIGltYWdlRGF0YSA9IHJlc3VsdDtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RhdGEvaW1hZ2VMaXN0LnRzIiwiaW1wb3J0IHtxdWFudGl6ZWRJbWFnZUNsaWNrVG9Db21wYXJlfSBmcm9tIFwiLi9jbGlja1RvQ29tcGFyZVwiO1xuaW1wb3J0IHtxdWFudGl6ZWRJbWFnZU9yaWdpbmFsVnNRdWFudGl6ZWR9IGZyb20gXCIuL29yaWdpbmFsVnNRdWFudGl6ZWRcIjtcbmltcG9ydCAqIGFzIENvbnRyb2xsZXIgZnJvbSBcIi4uLy4uL2NvbnRyb2xsZXIvdWlcIjtcblxuZXhwb3J0IHZhciByaWdodFBhbmVsID0ge1xuXHR2aWV3ICAgOiBcInRhYnZpZXdcIiwgZ3Jhdml0eSA6IDMsXG5cdHRhYmJhciA6IHtcblx0XHRvcHRpb25XaWR0aCA6IDIwMCwgdmFsdWUgOiBcImNsaWNrVG9Db21wYXJlXCIsIG9wdGlvbnMgOiBbXG5cdFx0XHR7IHZhbHVlIDogJ0NsaWNrLXRvLUNvbXBhcmUnLCBpZCA6ICdjbGlja1RvQ29tcGFyZScgfSxcblx0XHRcdHsgdmFsdWUgOiAnT3JpZ2luYWwtdnMtUXVhbnRpemVkJywgaWQgOiAnb3JpZ2luYWxWc1F1YW50aXplZCcgfVxuXHRcdF0sXG5cdFx0b24gICAgICAgICAgOiB7XG5cdFx0XHRvbkFmdGVyVGFiQ2xpY2sgOiAoaWQpID0+IHtcblx0XHRcdFx0Q29udHJvbGxlci51cGRhdGUoZmFsc2UpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0Y2VsbHMgIDogW1xuXHRcdHF1YW50aXplZEltYWdlQ2xpY2tUb0NvbXBhcmUsXG5cdFx0cXVhbnRpemVkSW1hZ2VPcmlnaW5hbFZzUXVhbnRpemVkLFxuXHRdXG59O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdWkvcmlnaHRQYW5lbC9yaWdodFBhbmVsLnRzIiwiZXhwb3J0IHZhciBxdWFudGl6ZWRJbWFnZUNsaWNrVG9Db21wYXJlID0ge1xuXHRpZCAgIDogXCJjbGlja1RvQ29tcGFyZVwiLFxuXHRyb3dzIDogW1xuXHRcdHtcblx0XHRcdGlkICAgICA6IFwiaW1hZ2VWaWV3MS1zdGF0aXN0aWNzXCIsXG5cdFx0XHR2aWV3ICAgOiBcInRlbXBsYXRlXCIsXG5cdFx0XHRoZWlnaHQgOiAzMFxuXHRcdH0sXG5cblx0XHR7XG5cdFx0XHRjb2xzIDogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cm93cyA6IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dHlwZSAgICAgOiBcImhlYWRlclwiLFxuXHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZSA6IFwiUGFsZXR0ZVwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRpZCAgICA6IFwiaW1hZ2VWaWV3MS1wYWxldHRlXCIsXG5cdFx0XHRcdFx0XHRcdHdpZHRoIDogMTQwLFxuXHRcdFx0XHRcdFx0XHR2aWV3ICA6IFwidGVtcGxhdGVcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJvd3MgOiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHR5cGUgICAgIDogXCJoZWFkZXJcIixcblx0XHRcdFx0XHRcdFx0dGVtcGxhdGUgOiBcIkltYWdlXCJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGlkICAgOiBcImltYWdlVmlldzEtaW1hZ2VcIixcblx0XHRcdFx0XHRcdFx0dmlldyA6IFwidGVtcGxhdGVcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH1cblxuXHRdXG5cblx0Ly92aWV3IDogXCJ0ZW1wbGF0ZVwiXG59O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdWkvcmlnaHRQYW5lbC9jbGlja1RvQ29tcGFyZS50cyIsImV4cG9ydCB2YXIgcXVhbnRpemVkSW1hZ2VPcmlnaW5hbFZzUXVhbnRpemVkID0ge1xuXHRpZCAgIDogXCJvcmlnaW5hbFZzUXVhbnRpemVkXCIsXG5cdHJvd3MgOiBbXG5cdFx0e1xuXHRcdFx0aWQgICAgIDogXCJpbWFnZVZpZXcyLXN0YXRpc3RpY3NcIixcblx0XHRcdHZpZXcgICA6IFwidGVtcGxhdGVcIixcblx0XHRcdGhlaWdodCA6IDMwXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRjb2xzIDogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cm93cyA6IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dHlwZSAgICAgOiBcImhlYWRlclwiLFxuXHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZSA6IFwiUGFsZXR0ZVwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRpZCAgICA6IFwiaW1hZ2VWaWV3Mi1wYWxldHRlXCIsXG5cdFx0XHRcdFx0XHRcdHdpZHRoIDogMTQwLFxuXHRcdFx0XHRcdFx0XHR2aWV3ICA6IFwidGVtcGxhdGVcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJvd3MgOiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHR5cGUgICAgIDogXCJoZWFkZXJcIixcblx0XHRcdFx0XHRcdFx0dGVtcGxhdGUgOiBcIk9yaWdpbmFsIEltYWdlXCJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGlkICAgOiBcImltYWdlVmlldzItaW1hZ2Utb3JpZ2luYWxcIixcblx0XHRcdFx0XHRcdFx0dmlldyA6IFwidGVtcGxhdGVcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJvd3MgOiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHR5cGUgICAgIDogXCJoZWFkZXJcIixcblx0XHRcdFx0XHRcdFx0dGVtcGxhdGUgOiBcIlF1YW50aXplZCBJbWFnZVwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRpZCAgIDogXCJpbWFnZVZpZXcyLWltYWdlLXF1YW50aXplZFwiLFxuXHRcdFx0XHRcdFx0XHR2aWV3IDogXCJ0ZW1wbGF0ZVwiXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fVxuXHRdXG59O1xuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91aS9yaWdodFBhbmVsL29yaWdpbmFsVnNRdWFudGl6ZWQudHMiXSwic291cmNlUm9vdCI6IiJ9