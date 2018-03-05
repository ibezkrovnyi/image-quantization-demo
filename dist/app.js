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
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: Typescript emitted no output for D:\\projects\\github\\ibezkrovnyi\\image-quantization-demo\\src\\controller\\ui.ts.\n    at successLoader (D:\\projects\\github\\ibezkrovnyi\\image-quantization-demo\\node_modules\\ts-loader\\dist\\index.js:47:15)\n    at Object.loader (D:\\projects\\github\\ibezkrovnyi\\image-quantization-demo\\node_modules\\ts-loader\\dist\\index.js:29:12)");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../lib/webix/webix.d.ts"/>
var ui_1 = __webpack_require__(0);
var leftPanel_1 = __webpack_require__(2);
var rightPanel_1 = __webpack_require__(6);
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
var configForm_1 = __webpack_require__(3);
var imageFileExplorer_1 = __webpack_require__(4);
exports.leftPanel = {
    type: "line",
    rows: [
        configForm_1.configForm,
        { type: "header", template: "Image Folder" },
        imageFileExplorer_1.imageFoldersPanel
    ]
};


/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var imageList_1 = __webpack_require__(5);
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
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var clickToCompare_1 = __webpack_require__(7);
var originalVsQuantized_1 = __webpack_require__(8);
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
/* 7 */
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
/* 8 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmUzMGZmN2VhZjUyMDlkYTRhYmQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvbGVmdFBhbmVsL2xlZnRQYW5lbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvbGVmdFBhbmVsL2NvbmZpZ0Zvcm0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL2xlZnRQYW5lbC9pbWFnZUZpbGVFeHBsb3Jlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGF0YS9pbWFnZUxpc3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL3JpZ2h0UGFuZWwvcmlnaHRQYW5lbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvcmlnaHRQYW5lbC9jbGlja1RvQ29tcGFyZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvcmlnaHRQYW5lbC9vcmlnaW5hbFZzUXVhbnRpemVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQSw4Q0FBOEM7QUFDOUMsa0NBQTJDO0FBQzNDLHlDQUFtRDtBQUNuRCwwQ0FBc0Q7QUFFdEQsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUVYLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDUixJQUFJLEVBQUcsTUFBTTtRQUNiLElBQUksRUFBRztZQUNOO2dCQUNDLEtBQUssRUFBSSxHQUFHO2dCQUNaLE1BQU0sRUFBRyxvQkFBb0IsRUFBRSxZQUFZLEVBQUcsRUFBRTtnQkFDaEQsSUFBSSxFQUFLLHFCQUFTO2FBQ2xCO1lBQ0QsRUFBRSxJQUFJLEVBQUcsU0FBUyxFQUFFO1lBQ3BCLHVCQUFVO1NBQ1Y7S0FDRCxDQUFDLENBQUM7SUFFSCxlQUFVLEVBQUUsQ0FBQztBQUVkLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0FDdEJILDBDQUF3QztBQUN4QyxpREFBc0Q7QUFFM0MsaUJBQVMsR0FBRztJQUN0QixJQUFJLEVBQUcsTUFBTTtJQUNiLElBQUksRUFBRztRQUNOLHVCQUFVO1FBQ1YsRUFBRSxJQUFJLEVBQUcsUUFBUSxFQUFFLFFBQVEsRUFBRyxjQUFjLEVBQUU7UUFDOUMscUNBQWlCO0tBQ2pCO0NBQ0QsQ0FBQzs7Ozs7Ozs7OztBQ1ZGLGtDQUEyQztBQUVoQyxrQkFBVSxHQUFHO0lBQ3ZCLElBQUksRUFBRyxNQUFNLEVBQUUsRUFBRSxFQUFHLFFBQVEsRUFBRSxLQUFLLEVBQUcsR0FBRyxFQUFFLFFBQVEsRUFBRztRQUNyRDtZQUNDLElBQUksRUFBUyxZQUFZO1lBQ3pCLEVBQUUsRUFBVyxlQUFlO1lBQzVCLEtBQUssRUFBUSxRQUFRO1lBQ3JCLFVBQVUsRUFBRyxHQUFHO1lBQ2hCLEtBQUssRUFBUSxLQUFLO1lBQ2xCLE9BQU8sRUFBTTtnQkFDWixHQUFHO2dCQUNILEdBQUc7Z0JBQ0gsSUFBSTtnQkFDSixJQUFJO2dCQUNKLEtBQUs7Z0JBQ0wsS0FBSztnQkFDTCxLQUFLO2dCQUNMLE1BQU07Z0JBQ04sTUFBTTtnQkFDTixNQUFNO2FBQ047U0FDRDtRQUNEO1lBQ0MsSUFBSSxFQUFTLFlBQVk7WUFDekIsRUFBRSxFQUFXLGlCQUFpQjtZQUM5QixLQUFLLEVBQVEseUJBQXlCO1lBQ3RDLFVBQVUsRUFBRyxHQUFHO1lBQ2hCLEtBQUssRUFBUSxHQUFHO1lBQ2hCLE9BQU8sRUFBTTtnQkFDWixFQUFFLEVBQUUsRUFBRyxDQUFDLEVBQUUsS0FBSyxFQUFHLFdBQVcsRUFBRTtnQkFDL0IsRUFBRSxFQUFFLEVBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRyxXQUFXLEVBQUU7Z0JBQy9CLEVBQUUsRUFBRSxFQUFHLENBQUMsRUFBRSxLQUFLLEVBQUcsV0FBVyxFQUFFO2dCQUMvQixFQUFFLEVBQUUsRUFBRyxDQUFDLEVBQUUsS0FBSyxFQUFHLGdCQUFnQixFQUFFO2dCQUNwQyxFQUFFLEVBQUUsRUFBRyxDQUFDLEVBQUUsS0FBSyxFQUFHLG1CQUFtQixFQUFFO2dCQUN2QyxFQUFFLEVBQUUsRUFBRyxDQUFDLEVBQUUsS0FBSyxFQUFHLGtEQUFrRCxFQUFFO2dCQUN0RSxFQUFFLEVBQUUsRUFBRyxDQUFDLEVBQUUsS0FBSyxFQUFHLGlCQUFpQixFQUFFO2dCQUNyQyxFQUFFLEVBQUUsRUFBRyxDQUFDLEVBQUUsS0FBSyxFQUFHLGlCQUFpQixFQUFFO2dCQUNyQyxFQUFFLEVBQUUsRUFBRyxDQUFDLEVBQUUsS0FBSyxFQUFHLFNBQVMsRUFBRTtnQkFDN0IsRUFBRSxFQUFFLEVBQUcsRUFBRSxFQUFFLEtBQUssRUFBRyxVQUFVLEVBQUU7Z0JBQy9CLEVBQUUsRUFBRSxFQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUcsbUJBQW1CLEVBQUU7YUFDeEM7U0FDRDtRQUNEO1lBQ0MsSUFBSSxFQUFTLFlBQVk7WUFDekIsRUFBRSxFQUFXLGdCQUFnQjtZQUM3QixLQUFLLEVBQVEscUJBQXFCO1lBQ2xDLFVBQVUsRUFBRyxHQUFHO1lBQ2hCLEtBQUssRUFBUSxHQUFHO1lBQ2hCLE9BQU8sRUFBTTtnQkFDWixFQUFFLEVBQUUsRUFBRyxDQUFDLEVBQUUsS0FBSyxFQUFHLDhCQUE4QixFQUFFO2dCQUNsRCxFQUFFLEVBQUUsRUFBRyxDQUFDLEVBQUUsS0FBSyxFQUFHLFVBQVUsRUFBRTtnQkFDOUIsRUFBRSxFQUFFLEVBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRyxTQUFTLEVBQUU7Z0JBQzdCLEVBQUUsRUFBRSxFQUFHLENBQUMsRUFBRSxLQUFLLEVBQUcsMkJBQTJCLEVBQUU7YUFDL0M7U0FDRDtRQUNEO1lBQ0MsSUFBSSxFQUFTLFlBQVk7WUFDekIsRUFBRSxFQUFXLGNBQWM7WUFDM0IsS0FBSyxFQUFRLHlCQUF5QjtZQUN0QyxVQUFVLEVBQUcsR0FBRztZQUNoQixLQUFLLEVBQVEsR0FBRztZQUNoQixPQUFPLEVBQU07Z0JBQ1osRUFBRSxFQUFFLEVBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRyxrQkFBa0IsRUFBRTtnQkFDdEMsRUFBRSxFQUFFLEVBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRyx5Q0FBeUMsRUFBRTtnQkFDN0QsRUFBRSxFQUFFLEVBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRyxnQ0FBZ0MsRUFBRTtnQkFDcEQsRUFBRSxFQUFFLEVBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRyxrQ0FBa0MsRUFBRTtnQkFDdEQsRUFBRSxFQUFFLEVBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRyxnQ0FBZ0MsRUFBRTtnQkFDcEQsRUFBRSxFQUFFLEVBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRyxnQ0FBZ0MsRUFBRTtnQkFDcEQsRUFBRSxFQUFFLEVBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRyxnQ0FBZ0MsRUFBRTtnQkFDcEQsRUFBRSxFQUFFLEVBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRyxtQ0FBbUMsRUFBRTtnQkFDdkQsRUFBRSxFQUFFLEVBQUcsRUFBRSxFQUFFLEtBQUssRUFBRyxvQ0FBb0MsRUFBRTtnQkFDekQsRUFBRSxFQUFFLEVBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRywrQ0FBK0MsRUFBRTtnQkFDbkUsRUFBRSxFQUFFLEVBQUcsRUFBRSxFQUFFLEtBQUssRUFBRywyQ0FBMkMsRUFBRTthQUNoRTtTQUNEO1FBQ0Q7WUFDQyxJQUFJLEVBQU8sTUFBTTtZQUNqQixJQUFJLEVBQU8sU0FBUztZQUNwQixRQUFRLEVBQUcsQ0FBRSxFQUFFLEVBQUU7b0JBQ2hCLElBQUksRUFBRyxRQUFRLEVBQUUsS0FBSyxFQUFHLFFBQVEsRUFBRSxLQUFLLEVBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRzt3QkFDbkQsV0FBVyxFQUFHOzRCQUNiLFdBQU0sQ0FBQyxJQUFJLENBQUM7d0JBQ2IsQ0FBQztxQkFDRDtpQkFDRCxDQUFFO1NBQ0g7S0FFRDtDQUNELENBQUM7Ozs7Ozs7Ozs7QUN6RkYseUNBQStDO0FBQy9DLGtDQUEyQztBQUVoQyx5QkFBaUIsR0FBRztJQUM5QixFQUFFLEVBQVMsT0FBTztJQUNsQixJQUFJLEVBQU8sV0FBVztJQUN0QixJQUFJLEVBQU87UUFDVixNQUFNLEVBQUcsRUFBRTtLQUNYO0lBQ0Qsb0JBQW9CO0lBQ3BCLGVBQWU7SUFDZixRQUFRLEVBQUcsVUFBVSxHQUFTO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxvQ0FBb0MsR0FBRyxHQUFHLENBQUMsT0FBTyxHQUFHLE1BQU07UUFDbkUsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sQ0FBQywyQ0FBMkMsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU07UUFDMUYsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsTUFBTSxDQUFDLG1DQUFtQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1FBQ25FLENBQUM7SUFDRixDQUFDO0lBQ0QsTUFBTSxFQUFLLElBQUk7SUFDZixpQkFBaUI7SUFDakIsSUFBSSxFQUFPLHFCQUFTO0lBQ3BCLEVBQUUsRUFBUztRQUNWLGVBQWUsRUFBRyxVQUFDLEVBQUU7WUFDcEIsV0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2QsQ0FBQztLQUNEO0lBQ0QsS0FBSyxFQUFNO1FBQ1YsaUJBQWlCO0lBQ2xCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0NBQ0gsQ0FBQzs7Ozs7Ozs7OztBQ3hDRixJQUFJLFNBQVMsR0FBRztJQUNmLE9BQU8sRUFBTztRQUNiLDBCQUEwQjtRQUMxQixXQUFXO1FBQ1gsZUFBZTtRQUNmLGVBQWU7UUFDZixlQUFlO1FBQ2Ysd0JBQXdCO1FBQ3hCLGdCQUFnQjtRQUNoQixtQkFBbUI7UUFDbkIsb0NBQW9DO1FBQ3BDLHVCQUF1QjtLQUN2QjtJQUNELFdBQVcsRUFBRztRQUNiLGVBQWU7UUFDZixlQUFlO1FBQ2Ysa0JBQWtCO1FBQ2xCLFVBQVU7UUFDVixXQUFXO1FBQ1gsV0FBVztRQUNYLFdBQVc7UUFDWCxXQUFXO1FBQ1gsaUJBQWlCO1FBQ2pCLGVBQWU7S0FDZjtJQUNELFVBQVUsRUFBSTtRQUNiLGNBQWM7UUFDZCxXQUFXO1FBQ1gsZUFBZTtRQUNmLGNBQWM7UUFDZCxVQUFVO1FBQ1YsVUFBVTtRQUNWLFVBQVU7UUFDVixZQUFZO1FBQ1osWUFBWTtLQUNaO0lBQ0QsU0FBUyxFQUFLO1FBQ2IsWUFBWTtRQUNaLFdBQVc7UUFDWCxnQkFBZ0I7UUFDaEIsY0FBYztRQUNkLGFBQWE7UUFDYixhQUFhO1FBQ2IsWUFBWTtRQUNaLGNBQWM7UUFDZCxjQUFjO1FBQ2QsYUFBYTtRQUNiLGNBQWM7S0FDZDtJQUNELFNBQVMsRUFBSztRQUNiLDRCQUE0QjtRQUM1QiwwQkFBMEI7UUFDMUIsMkJBQTJCO1FBQzNCLHFCQUFxQjtRQUNyQixVQUFVO1FBQ1YsY0FBYztRQUNkLFVBQVU7UUFDVixhQUFhO1FBQ2IsZUFBZTtRQUNmLGNBQWM7UUFDZCxxQkFBcUI7S0FDckI7Q0FDRCxDQUFDO0FBRUYsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBRWhCLEdBQUcsQ0FBQyxDQUFDLElBQUksTUFBTSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDOUIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsSUFBSSxVQUFVLEdBQUc7WUFDaEIsRUFBRSxFQUFNLGFBQWEsR0FBRyxNQUFNO1lBQzlCLElBQUksRUFBSSxJQUFJO1lBQ1osS0FBSyxFQUFHLE1BQU07WUFDZCxJQUFJLEVBQUksRUFBRTtTQUNWLENBQUM7UUFFRixTQUFTLENBQUUsTUFBTSxDQUFFLENBQUMsT0FBTyxDQUFDLGNBQUk7WUFDL0IsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3BCLElBQUksRUFBSyxJQUFJO2dCQUNiLE1BQU0sRUFBRyxNQUFNO2dCQUNmLEVBQUUsRUFBTyxhQUFhLEdBQUcsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJO2FBQzVDLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekIsQ0FBQztBQUNGLENBQUM7QUFFVSxpQkFBUyxHQUFHLE1BQU0sQ0FBQzs7Ozs7Ozs7OztBQ3ZGOUIsOENBQThEO0FBQzlELG1EQUF3RTtBQUN4RSx3Q0FBa0Q7QUFFdkMsa0JBQVUsR0FBRztJQUN2QixJQUFJLEVBQUssU0FBUyxFQUFFLE9BQU8sRUFBRyxDQUFDO0lBQy9CLE1BQU0sRUFBRztRQUNSLFdBQVcsRUFBRyxHQUFHLEVBQUUsS0FBSyxFQUFHLGdCQUFnQixFQUFFLE9BQU8sRUFBRztZQUN0RCxFQUFFLEtBQUssRUFBRyxrQkFBa0IsRUFBRSxFQUFFLEVBQUcsZ0JBQWdCLEVBQUU7WUFDckQsRUFBRSxLQUFLLEVBQUcsdUJBQXVCLEVBQUUsRUFBRSxFQUFHLHFCQUFxQixFQUFFO1NBQy9EO1FBQ0QsRUFBRSxFQUFZO1lBQ2IsZUFBZSxFQUFHLFVBQUMsRUFBRTtnQkFDcEIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixDQUFDO1NBQ0Q7S0FDRDtJQUNELEtBQUssRUFBSTtRQUNSLDZDQUE0QjtRQUM1Qix1REFBaUM7S0FDakM7Q0FDRCxDQUFDOzs7Ozs7Ozs7O0FDckJTLG9DQUE0QixHQUFHO0lBQ3pDLEVBQUUsRUFBSyxnQkFBZ0I7SUFDdkIsSUFBSSxFQUFHO1FBQ047WUFDQyxFQUFFLEVBQU8sdUJBQXVCO1lBQ2hDLElBQUksRUFBSyxVQUFVO1lBQ25CLE1BQU0sRUFBRyxFQUFFO1NBQ1g7UUFFRDtZQUNDLElBQUksRUFBRztnQkFDTjtvQkFDQyxJQUFJLEVBQUc7d0JBQ047NEJBQ0MsSUFBSSxFQUFPLFFBQVE7NEJBQ25CLFFBQVEsRUFBRyxTQUFTO3lCQUNwQjt3QkFDRDs0QkFDQyxFQUFFLEVBQU0sb0JBQW9COzRCQUM1QixLQUFLLEVBQUcsR0FBRzs0QkFDWCxJQUFJLEVBQUksVUFBVTt5QkFDbEI7cUJBQ0Q7aUJBQ0Q7Z0JBQ0Q7b0JBQ0MsSUFBSSxFQUFHO3dCQUNOOzRCQUNDLElBQUksRUFBTyxRQUFROzRCQUNuQixRQUFRLEVBQUcsT0FBTzt5QkFDbEI7d0JBQ0Q7NEJBQ0MsRUFBRSxFQUFLLGtCQUFrQjs0QkFDekIsSUFBSSxFQUFHLFVBQVU7eUJBQ2pCO3FCQUNEO2lCQUNEO2FBQ0Q7U0FDRDtLQUVEO0lBRUQsbUJBQW1CO0NBQ25CLENBQUM7Ozs7Ozs7Ozs7QUMxQ1MseUNBQWlDLEdBQUc7SUFDOUMsRUFBRSxFQUFLLHFCQUFxQjtJQUM1QixJQUFJLEVBQUc7UUFDTjtZQUNDLEVBQUUsRUFBTyx1QkFBdUI7WUFDaEMsSUFBSSxFQUFLLFVBQVU7WUFDbkIsTUFBTSxFQUFHLEVBQUU7U0FDWDtRQUNEO1lBQ0MsSUFBSSxFQUFHO2dCQUNOO29CQUNDLElBQUksRUFBRzt3QkFDTjs0QkFDQyxJQUFJLEVBQU8sUUFBUTs0QkFDbkIsUUFBUSxFQUFHLFNBQVM7eUJBQ3BCO3dCQUNEOzRCQUNDLEVBQUUsRUFBTSxvQkFBb0I7NEJBQzVCLEtBQUssRUFBRyxHQUFHOzRCQUNYLElBQUksRUFBSSxVQUFVO3lCQUNsQjtxQkFDRDtpQkFDRDtnQkFDRDtvQkFDQyxJQUFJLEVBQUc7d0JBQ047NEJBQ0MsSUFBSSxFQUFPLFFBQVE7NEJBQ25CLFFBQVEsRUFBRyxnQkFBZ0I7eUJBQzNCO3dCQUNEOzRCQUNDLEVBQUUsRUFBSywyQkFBMkI7NEJBQ2xDLElBQUksRUFBRyxVQUFVO3lCQUNqQjtxQkFDRDtpQkFDRDtnQkFDRDtvQkFDQyxJQUFJLEVBQUc7d0JBQ047NEJBQ0MsSUFBSSxFQUFPLFFBQVE7NEJBQ25CLFFBQVEsRUFBRyxpQkFBaUI7eUJBQzVCO3dCQUNEOzRCQUNDLEVBQUUsRUFBSyw0QkFBNEI7NEJBQ25DLElBQUksRUFBRyxVQUFVO3lCQUNqQjtxQkFDRDtpQkFDRDthQUNEO1NBQ0Q7S0FDRDtDQUNELENBQUMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYmUzMGZmN2VhZjUyMDlkYTRhYmQiLCIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9saWIvd2ViaXgvd2ViaXguZC50c1wiLz5cbmltcG9ydCB7aW5pdGlhbGl6ZX0gZnJvbSBcIi4vY29udHJvbGxlci91aVwiO1xuaW1wb3J0IHtsZWZ0UGFuZWx9IGZyb20gXCIuL3VpL2xlZnRQYW5lbC9sZWZ0UGFuZWxcIjtcbmltcG9ydCB7cmlnaHRQYW5lbH0gZnJvbSBcIi4vdWkvcmlnaHRQYW5lbC9yaWdodFBhbmVsXCI7XG5cbndlYml4LnJlYWR5KGZ1bmN0aW9uICgpIHtcblxuXHR3ZWJpeC51aSh7XG5cdFx0dHlwZSA6IFwibGluZVwiLFxuXHRcdGNvbHMgOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHdpZHRoICA6IDUwMCxcblx0XHRcdFx0aGVhZGVyIDogXCJTZXR0aW5ncyAmIEZvbGRlcnNcIiwgaGVhZGVySGVpZ2h0IDogNDUsXG5cdFx0XHRcdGJvZHkgICA6IGxlZnRQYW5lbFxuXHRcdFx0fSxcblx0XHRcdHsgdmlldyA6IFwicmVzaXplclwiIH0sXG5cdFx0XHRyaWdodFBhbmVsXG5cdFx0XVxuXHR9KTtcblxuXHRpbml0aWFsaXplKCk7XG5cbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC50cyIsImltcG9ydCB7Y29uZmlnRm9ybX0gZnJvbSBcIi4vY29uZmlnRm9ybVwiO1xuaW1wb3J0IHtpbWFnZUZvbGRlcnNQYW5lbH0gZnJvbSBcIi4vaW1hZ2VGaWxlRXhwbG9yZXJcIjtcblxuZXhwb3J0IHZhciBsZWZ0UGFuZWwgPSB7XG5cdHR5cGUgOiBcImxpbmVcIixcblx0cm93cyA6IFtcblx0XHRjb25maWdGb3JtLFxuXHRcdHsgdHlwZSA6IFwiaGVhZGVyXCIsIHRlbXBsYXRlIDogXCJJbWFnZSBGb2xkZXJcIiB9LFxuXHRcdGltYWdlRm9sZGVyc1BhbmVsXG5cdF1cbn07XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91aS9sZWZ0UGFuZWwvbGVmdFBhbmVsLnRzIiwiaW1wb3J0IHt1cGRhdGV9IGZyb20gXCIuLi8uLi9jb250cm9sbGVyL3VpXCI7XG5cbmV4cG9ydCB2YXIgY29uZmlnRm9ybSA9IHtcblx0dmlldyA6IFwiZm9ybVwiLCBpZCA6IFwibXlmb3JtXCIsIHdpZHRoIDogMzAwLCBlbGVtZW50cyA6IFtcblx0XHR7XG5cdFx0XHR2aWV3ICAgICAgIDogXCJyaWNoc2VsZWN0XCIsXG5cdFx0XHRpZCAgICAgICAgIDogXCJvcHRpb24tY29sb3JzXCIsXG5cdFx0XHRsYWJlbCAgICAgIDogXCJDb2xvcnNcIixcblx0XHRcdGxhYmVsV2lkdGggOiAxNzUsXG5cdFx0XHR2YWx1ZSAgICAgIDogXCIyNTZcIixcblx0XHRcdG9wdGlvbnMgICAgOiBbXG5cdFx0XHRcdFwiMlwiLFxuXHRcdFx0XHRcIjRcIixcblx0XHRcdFx0XCIxNlwiLFxuXHRcdFx0XHRcIjY0XCIsXG5cdFx0XHRcdFwiMTI4XCIsXG5cdFx0XHRcdFwiMjU2XCIsXG5cdFx0XHRcdFwiNTEyXCIsXG5cdFx0XHRcdFwiMTAyNFwiLFxuXHRcdFx0XHRcIjIwNDhcIixcblx0XHRcdFx0XCI4MTkyXCJcblx0XHRcdF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdHZpZXcgICAgICAgOiBcInJpY2hzZWxlY3RcIixcblx0XHRcdGlkICAgICAgICAgOiBcIm9wdGlvbi1kaXN0YW5jZVwiLFxuXHRcdFx0bGFiZWwgICAgICA6IFwiQ29sb3IgRGlzdGFuY2UgRXF1YXRpb25cIixcblx0XHRcdGxhYmVsV2lkdGggOiAxNzUsXG5cdFx0XHR2YWx1ZSAgICAgIDogXCIyXCIsXG5cdFx0XHRvcHRpb25zICAgIDogW1xuXHRcdFx0XHR7IGlkIDogMSwgdmFsdWUgOiBcIkV1Y2xpZGVhblwiIH0sXG5cdFx0XHRcdHsgaWQgOiAyLCB2YWx1ZSA6IFwiTWFuaGF0dGFuXCIgfSxcblx0XHRcdFx0eyBpZCA6IDMsIHZhbHVlIDogXCJDSUVERTIwMDBcIiB9LFxuXHRcdFx0XHR7IGlkIDogNCwgdmFsdWUgOiBcIkNJRTk0IFRleHRpbGVzXCIgfSxcblx0XHRcdFx0eyBpZCA6IDUsIHZhbHVlIDogXCJDSUU5NCBHcmFwaGljQXJ0c1wiIH0sXG5cdFx0XHRcdHsgaWQgOiA2LCB2YWx1ZSA6IFwiRXVjbGlkZWFuIEJUNzA5IE5vQWxwaGEgPC0tIGRlZmF1bHQgZm9yIFJHQlF1YW50XCIgfSxcblx0XHRcdFx0eyBpZCA6IDcsIHZhbHVlIDogXCJFdWNsaWRlYW4gQlQ3MDlcIiB9LFxuXHRcdFx0XHR7IGlkIDogOCwgdmFsdWUgOiBcIk1hbmhhdHRhbiBCVDcwOVwiIH0sXG5cdFx0XHRcdHsgaWQgOiA5LCB2YWx1ZSA6IFwiQ01ldHJpY1wiIH0sXG5cdFx0XHRcdHsgaWQgOiAxMCwgdmFsdWUgOiBcIlBOR1F1YW50XCIgfSxcblx0XHRcdFx0eyBpZCA6IDExLCB2YWx1ZSA6IFwiTWFuaGF0dGFuIE5vbW15ZGVcIiB9XG5cdFx0XHRdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHR2aWV3ICAgICAgIDogXCJyaWNoc2VsZWN0XCIsXG5cdFx0XHRpZCAgICAgICAgIDogXCJvcHRpb24tcGFsZXR0ZVwiLFxuXHRcdFx0bGFiZWwgICAgICA6IFwiUXVhbnRpemF0aW9uIE1ldGhvZFwiLFxuXHRcdFx0bGFiZWxXaWR0aCA6IDE3NSxcblx0XHRcdHZhbHVlICAgICAgOiBcIjFcIixcblx0XHRcdG9wdGlvbnMgICAgOiBbXG5cdFx0XHRcdHsgaWQgOiAxLCB2YWx1ZSA6IFwibmV1cXVhbnQgKE9yaWdpbmFsLCBJbnRlZ2VyKVwiIH0sXG5cdFx0XHRcdHsgaWQgOiAyLCB2YWx1ZSA6IFwicmdicXVhbnRcIiB9LFxuXHRcdFx0XHR7IGlkIDogMywgdmFsdWUgOiBcInd1cXVhbnRcIiB9LFxuXHRcdFx0XHR7IGlkIDogNCwgdmFsdWUgOiBcIm5ldXF1YW50IChGbG9hdGluZyBQb2ludClcIiB9XG5cdFx0XHRdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHR2aWV3ICAgICAgIDogXCJyaWNoc2VsZWN0XCIsXG5cdFx0XHRpZCAgICAgICAgIDogXCJvcHRpb24taW1hZ2VcIixcblx0XHRcdGxhYmVsICAgICAgOiBcIlBhbGV0dGUtdG8tSW1hZ2UgTWV0aG9kXCIsXG5cdFx0XHRsYWJlbFdpZHRoIDogMTc1LFxuXHRcdFx0dmFsdWUgICAgICA6IFwiMVwiLFxuXHRcdFx0b3B0aW9ucyAgICA6IFtcblx0XHRcdFx0eyBpZCA6IDEsIHZhbHVlIDogXCJOZWFyZXN0IChTaW1wbGUpXCIgfSxcblx0XHRcdFx0eyBpZCA6IDIsIHZhbHVlIDogXCJFcnJvckRpZmZ1c2lvbjogQXJyYXkgKEZsb3lkLVN0ZWluYmVyZylcIiB9LFxuXHRcdFx0XHR7IGlkIDogNCwgdmFsdWUgOiBcIkVycm9yRGlmZnVzaW9uOiBBcnJheSAoU3R1Y2tpKVwiIH0sXG5cdFx0XHRcdHsgaWQgOiA1LCB2YWx1ZSA6IFwiRXJyb3JEaWZmdXNpb246IEFycmF5IChBdGtpbnNvbilcIiB9LFxuXHRcdFx0XHR7IGlkIDogNiwgdmFsdWUgOiBcIkVycm9yRGlmZnVzaW9uOiBBcnJheSAoSmFydmlzKVwiIH0sXG5cdFx0XHRcdHsgaWQgOiA3LCB2YWx1ZSA6IFwiRXJyb3JEaWZmdXNpb246IEFycmF5IChCdXJrZXMpXCIgfSxcblx0XHRcdFx0eyBpZCA6IDgsIHZhbHVlIDogXCJFcnJvckRpZmZ1c2lvbjogQXJyYXkgKFNpZXJyYSlcIiB9LFxuXHRcdFx0XHR7IGlkIDogOSwgdmFsdWUgOiBcIkVycm9yRGlmZnVzaW9uOiBBcnJheSAoVHdvU2llcnJhKVwiIH0sXG5cdFx0XHRcdHsgaWQgOiAxMCwgdmFsdWUgOiBcIkVycm9yRGlmZnVzaW9uOiBBcnJheSAoU2llcnJhTGl0ZSlcIiB9LFxuXHRcdFx0XHR7IGlkIDogMywgdmFsdWUgOiBcIkVycm9yRGlmZnVzaW9uOiBBcnJheSAoRmFsc2UgRmxveWQtU3RlaW5iZXJnKVwiIH0sXG5cdFx0XHRcdHsgaWQgOiAxMSwgdmFsdWUgOiBcIkVycm9yRGlmZnVzaW9uOiBSaWVtZXJzbWEgKEhpbGJlcnQgQ3VydmUpXCIgfVxuXHRcdFx0XVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0dHlwZSAgICAgOiBcImxpbmVcIixcblx0XHRcdHZpZXcgICAgIDogXCJ0b29sYmFyXCIsXG5cdFx0XHRlbGVtZW50cyA6IFsge30sIHtcblx0XHRcdFx0dmlldyA6IFwiYnV0dG9uXCIsIHZhbHVlIDogXCJVcGRhdGVcIiwgd2lkdGggOiA5MCwgb24gOiB7XG5cdFx0XHRcdFx0b25JdGVtQ2xpY2sgOiAoKSA9PiB7XG5cdFx0XHRcdFx0XHR1cGRhdGUodHJ1ZSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gXVxuXHRcdH1cblxuXHRdXG59O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdWkvbGVmdFBhbmVsL2NvbmZpZ0Zvcm0udHMiLCJpbXBvcnQge2ltYWdlRGF0YX0gZnJvbSBcIi4uLy4uL2RhdGEvaW1hZ2VMaXN0XCI7XG5pbXBvcnQge3VwZGF0ZX0gZnJvbSBcIi4uLy4uL2NvbnRyb2xsZXIvdWlcIjtcblxuZXhwb3J0IHZhciBpbWFnZUZvbGRlcnNQYW5lbCA9IHtcblx0aWQgICAgICAgOiBcImltYWdlXCIsXG5cdHZpZXcgICAgIDogXCJncm91cGxpc3RcIixcblx0dHlwZSAgICAgOiB7XG5cdFx0aGVpZ2h0IDogODRcblx0fSxcblx0Ly9hdXRvaGVpZ2h0IDogdHJ1ZSxcblx0Ly9oZWlnaHQgOiA4MDAsXG5cdHRlbXBsYXRlIDogZnVuY3Rpb24gKG9iaiA6IGFueSkge1xuXHRcdGlmIChvYmouZGF0YVVybCkge1xuXHRcdFx0cmV0dXJuIFwiPGltZyBzdHlsZT1cXFwiaGVpZ2h0OiA4NHB4XFxcIiBzcmM9XFxcIlwiICsgb2JqLmRhdGFVcmwgKyBcIlxcXCIvPlwiXG5cdFx0fSBlbHNlIGlmIChvYmouZm9sZGVyICYmIG9iai5maWxlKSB7XG5cdFx0XHRyZXR1cm4gXCI8aW1nIHN0eWxlPVxcXCJoZWlnaHQ6IDg0cHhcXFwiIHNyYz1cXFwiaW1hZ2VzL1wiICsgb2JqLmZvbGRlciArIFwiL1wiICsgb2JqLmZpbGUgKyBcIlxcXCIvPlwiXG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBcIjxkaXYgc3R5bGU9XFxcImxpbmUtaGVpZ2h0OiA4NHB4XFxcIj5cIiArIG9iai52YWx1ZSArIFwiPC9kaXY+XCI7XG5cdFx0fVxuXHR9LFxuXHRzZWxlY3QgICA6IHRydWUsXG5cdC8vc2Nyb2xsIDogZmFsc2UsXG5cdGRhdGEgICAgIDogaW1hZ2VEYXRhLFxuXHRvbiAgICAgICA6IHtcblx0XHRcIm9uYWZ0ZXJzZWxlY3RcIiA6IChpZCkgPT4ge1xuXHRcdFx0dXBkYXRlKHRydWUpO1xuXHRcdH1cblx0fSxcblx0cmVhZHkgICAgOiBmdW5jdGlvbiAoKSB7ICAvL3NlbGVjdCBVU0Fcblx0XHQvL3RoaXMuc2VsZWN0KDApO1xuXHR9XG5cblx0Lypcblx0IHNlbGVjdDp0cnVlLFxuXHQgb246eyBcIm9uYWZ0ZXJzZWxlY3RcIjpjb3VudHJ5X3NlbGVjdGVkIH0sXG5cdCB0eXBlOnsgaGVpZ2h0OiA4NCB9LFxuXHQgcmVhZHk6ZnVuY3Rpb24oKXsgIC8vc2VsZWN0IFVTQVxuXHQgdGhpcy5zZWxlY3QoNik7XG5cdCB9XG5cdCAqL1xufTtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdWkvbGVmdFBhbmVsL2ltYWdlRmlsZUV4cGxvcmVyLnRzIiwidmFyIGltYWdlTGlzdCA9IHtcblx0XCJhbHBoYVwiICAgICA6IFtcblx0XHRcImNoaWxkcmVuLTc0NTY3NF8xOTIwLnBuZ1wiLFxuXHRcdFwiYWxwaGEucG5nXCIsXG5cdFx0XCJBbHBoYUJhbGwucG5nXCIsXG5cdFx0XCJBbHBoYUVkZ2UucG5nXCIsXG5cdFx0XCJhbHBoYXRlc3QucG5nXCIsXG5cdFx0XCJjaGVycmllcy1yZWFsaXN0aWMucG5nXCIsXG5cdFx0XCJkaWNlLXRyYW5zLnBuZ1wiLFxuXHRcdFwicG5nZ3JhZDE2cmdiYS5wbmdcIixcblx0XHRcInR1bWJscl9tb3l3NjJSeVFvMXM1amp0em8xXzUwMC5wbmdcIixcblx0XHRcIldpbGJlci1odWdlLWFscGhhLnBuZ1wiXG5cdF0sXG5cdFwiZ3JhZGllbnRzXCIgOiBbXG5cdFx0XCJjb2xvcnBhbjIucG5nXCIsXG5cdFx0XCJkaXRoZ3JhZHMucG5nXCIsXG5cdFx0XCJncmFkX2RlZmF1bHQucG5nXCIsXG5cdFx0XCJncmFkLnBuZ1wiLFxuXHRcdFwiZ3JhZDUucG5nXCIsXG5cdFx0XCJncmFkNi5wbmdcIixcblx0XHRcImdyYWQ3LnBuZ1wiLFxuXHRcdFwiZ3JhZDgucG5nXCIsXG5cdFx0XCJwbmdncmFkOHJnYi5wbmdcIixcblx0XHRcInNjdWxwdG1hcC5wbmdcIlxuXHRdLFxuXHRcImdyYXBoaWNzXCIgIDogW1xuXHRcdFwiYmFzZWJhbGwuanBnXCIsXG5cdFx0XCJiZWJvcC5qcGdcIixcblx0XHRcIm1pbmVjcmFmdC5wbmdcIixcblx0XHRcInBlbmd1aW5zLnBuZ1wiLFxuXHRcdFwicG9vbC5wbmdcIixcblx0XHRcInJvc2UucG5nXCIsXG5cdFx0XCJzbWIzLnBuZ1wiLFxuXHRcdFwic3VwZXIxLnBuZ1wiLFxuXHRcdFwic3VwZXIyLnBuZ1wiXG5cdF0sXG5cdFwicGhvdG9zMVwiICAgOiBbXG5cdFx0XCJiaWtpbmcuanBnXCIsXG5cdFx0XCJibHVmZi5qcGdcIixcblx0XHRcImNsb3VkcGxhbmUuanBnXCIsXG5cdFx0XCJjb21wY3ViZS5qcGdcIixcblx0XHRcImZpc2hpZTIuanBnXCIsXG5cdFx0XCJraXR0ZWgxLmpwZ1wiLFxuXHRcdFwibWVkdXNhLmpwZ1wiLFxuXHRcdFwicGhlYXNhbnQuanBnXCIsXG5cdFx0XCJwaG90b21hbi5qcGdcIixcblx0XHRcInJhaW5ib3cuanBnXCIsXG5cdFx0XCJyZWRwYW5kYS5qcGdcIlxuXHRdLFxuXHRcInBob3RvczJcIiAgIDogW1xuXHRcdFwiYm9vay1zaGVsZi0zNDk5MzRfMTkyMC5qcGdcIixcblx0XHRcImNoaWxkcmVuLTYwMjk3N18xOTIwLnBuZ1wiLFxuXHRcdFwib2xkLWJvb2tzLTQzNjQ5OF8xOTIwLnBuZ1wiLFxuXHRcdFwicGVucy05MzE3N18xOTIwLnBuZ1wiLFxuXHRcdFwiYmFieS5qcGdcIixcblx0XHRcImNob3BzdWV5LmpwZ1wiLFxuXHRcdFwiZmlzaC5qcGdcIixcblx0XHRcImtpdHRlaDIuanBnXCIsXG5cdFx0XCJxdWFudGZyb2cucG5nXCIsXG5cdFx0XCJ0cmVlZnJvZy5qcGdcIixcblx0XHRcInF1YW50ZnJvZ19zbWFsbC5wbmdcIlxuXHRdXG59O1xuXG52YXIgcmVzdWx0ID0gW107XG5cbmZvciAodmFyIGZvbGRlciBpbiBpbWFnZUxpc3QpIHtcblx0aWYgKGltYWdlTGlzdC5oYXNPd25Qcm9wZXJ0eShmb2xkZXIpKSB7XG5cdFx0dmFyIGZvbGRlckRhdGEgPSB7XG5cdFx0XHRpZCAgICA6IFwiaW1hZ2UtbGlzdC1cIiArIGZvbGRlcixcblx0XHRcdG9wZW4gIDogdHJ1ZSxcblx0XHRcdHZhbHVlIDogZm9sZGVyLFxuXHRcdFx0ZGF0YSAgOiBbXVxuXHRcdH07XG5cblx0XHRpbWFnZUxpc3RbIGZvbGRlciBdLmZvckVhY2goZmlsZSA9PiB7XG5cdFx0XHRmb2xkZXJEYXRhLmRhdGEucHVzaCh7XG5cdFx0XHRcdGZpbGUgICA6IGZpbGUsXG5cdFx0XHRcdGZvbGRlciA6IGZvbGRlcixcblx0XHRcdFx0aWQgICAgIDogXCJpbWFnZS1saXN0LVwiICsgZm9sZGVyICsgXCItXCIgKyBmaWxlXG5cdFx0XHR9KVxuXHRcdH0pO1xuXG5cdFx0cmVzdWx0LnB1c2goZm9sZGVyRGF0YSk7XG5cdH1cbn1cblxuZXhwb3J0IHZhciBpbWFnZURhdGEgPSByZXN1bHQ7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kYXRhL2ltYWdlTGlzdC50cyIsImltcG9ydCB7cXVhbnRpemVkSW1hZ2VDbGlja1RvQ29tcGFyZX0gZnJvbSBcIi4vY2xpY2tUb0NvbXBhcmVcIjtcbmltcG9ydCB7cXVhbnRpemVkSW1hZ2VPcmlnaW5hbFZzUXVhbnRpemVkfSBmcm9tIFwiLi9vcmlnaW5hbFZzUXVhbnRpemVkXCI7XG5pbXBvcnQgKiBhcyBDb250cm9sbGVyIGZyb20gXCIuLi8uLi9jb250cm9sbGVyL3VpXCI7XG5cbmV4cG9ydCB2YXIgcmlnaHRQYW5lbCA9IHtcblx0dmlldyAgIDogXCJ0YWJ2aWV3XCIsIGdyYXZpdHkgOiAzLFxuXHR0YWJiYXIgOiB7XG5cdFx0b3B0aW9uV2lkdGggOiAyMDAsIHZhbHVlIDogXCJjbGlja1RvQ29tcGFyZVwiLCBvcHRpb25zIDogW1xuXHRcdFx0eyB2YWx1ZSA6ICdDbGljay10by1Db21wYXJlJywgaWQgOiAnY2xpY2tUb0NvbXBhcmUnIH0sXG5cdFx0XHR7IHZhbHVlIDogJ09yaWdpbmFsLXZzLVF1YW50aXplZCcsIGlkIDogJ29yaWdpbmFsVnNRdWFudGl6ZWQnIH1cblx0XHRdLFxuXHRcdG9uICAgICAgICAgIDoge1xuXHRcdFx0b25BZnRlclRhYkNsaWNrIDogKGlkKSA9PiB7XG5cdFx0XHRcdENvbnRyb2xsZXIudXBkYXRlKGZhbHNlKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdGNlbGxzICA6IFtcblx0XHRxdWFudGl6ZWRJbWFnZUNsaWNrVG9Db21wYXJlLFxuXHRcdHF1YW50aXplZEltYWdlT3JpZ2luYWxWc1F1YW50aXplZCxcblx0XVxufTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3VpL3JpZ2h0UGFuZWwvcmlnaHRQYW5lbC50cyIsImV4cG9ydCB2YXIgcXVhbnRpemVkSW1hZ2VDbGlja1RvQ29tcGFyZSA9IHtcblx0aWQgICA6IFwiY2xpY2tUb0NvbXBhcmVcIixcblx0cm93cyA6IFtcblx0XHR7XG5cdFx0XHRpZCAgICAgOiBcImltYWdlVmlldzEtc3RhdGlzdGljc1wiLFxuXHRcdFx0dmlldyAgIDogXCJ0ZW1wbGF0ZVwiLFxuXHRcdFx0aGVpZ2h0IDogMzBcblx0XHR9LFxuXG5cdFx0e1xuXHRcdFx0Y29scyA6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJvd3MgOiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHR5cGUgICAgIDogXCJoZWFkZXJcIixcblx0XHRcdFx0XHRcdFx0dGVtcGxhdGUgOiBcIlBhbGV0dGVcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0aWQgICAgOiBcImltYWdlVmlldzEtcGFsZXR0ZVwiLFxuXHRcdFx0XHRcdFx0XHR3aWR0aCA6IDE0MCxcblx0XHRcdFx0XHRcdFx0dmlldyAgOiBcInRlbXBsYXRlXCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyb3dzIDogW1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0eXBlICAgICA6IFwiaGVhZGVyXCIsXG5cdFx0XHRcdFx0XHRcdHRlbXBsYXRlIDogXCJJbWFnZVwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRpZCAgIDogXCJpbWFnZVZpZXcxLWltYWdlXCIsXG5cdFx0XHRcdFx0XHRcdHZpZXcgOiBcInRlbXBsYXRlXCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9XG5cblx0XVxuXG5cdC8vdmlldyA6IFwidGVtcGxhdGVcIlxufTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3VpL3JpZ2h0UGFuZWwvY2xpY2tUb0NvbXBhcmUudHMiLCJleHBvcnQgdmFyIHF1YW50aXplZEltYWdlT3JpZ2luYWxWc1F1YW50aXplZCA9IHtcblx0aWQgICA6IFwib3JpZ2luYWxWc1F1YW50aXplZFwiLFxuXHRyb3dzIDogW1xuXHRcdHtcblx0XHRcdGlkICAgICA6IFwiaW1hZ2VWaWV3Mi1zdGF0aXN0aWNzXCIsXG5cdFx0XHR2aWV3ICAgOiBcInRlbXBsYXRlXCIsXG5cdFx0XHRoZWlnaHQgOiAzMFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0Y29scyA6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJvd3MgOiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHR5cGUgICAgIDogXCJoZWFkZXJcIixcblx0XHRcdFx0XHRcdFx0dGVtcGxhdGUgOiBcIlBhbGV0dGVcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0aWQgICAgOiBcImltYWdlVmlldzItcGFsZXR0ZVwiLFxuXHRcdFx0XHRcdFx0XHR3aWR0aCA6IDE0MCxcblx0XHRcdFx0XHRcdFx0dmlldyAgOiBcInRlbXBsYXRlXCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyb3dzIDogW1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0eXBlICAgICA6IFwiaGVhZGVyXCIsXG5cdFx0XHRcdFx0XHRcdHRlbXBsYXRlIDogXCJPcmlnaW5hbCBJbWFnZVwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRpZCAgIDogXCJpbWFnZVZpZXcyLWltYWdlLW9yaWdpbmFsXCIsXG5cdFx0XHRcdFx0XHRcdHZpZXcgOiBcInRlbXBsYXRlXCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyb3dzIDogW1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0eXBlICAgICA6IFwiaGVhZGVyXCIsXG5cdFx0XHRcdFx0XHRcdHRlbXBsYXRlIDogXCJRdWFudGl6ZWQgSW1hZ2VcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0aWQgICA6IFwiaW1hZ2VWaWV3Mi1pbWFnZS1xdWFudGl6ZWRcIixcblx0XHRcdFx0XHRcdFx0dmlldyA6IFwidGVtcGxhdGVcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH1cblx0XVxufTtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdWkvcmlnaHRQYW5lbC9vcmlnaW5hbFZzUXVhbnRpemVkLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==