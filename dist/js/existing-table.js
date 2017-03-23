/*!
 * Existing-table v0.1.0 (https://roctive.github.io/existing-table/)
 * Copyright 2017 Galen Tian.
 * Licensed under the MIT license
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);

/***/ },
/* 1 */
/***/ function(module, exports) {

	$(function () {
	    var format = function (source, params) {
	        if (arguments.length == 1)
	            return function () {
	                var args = $.makeArray(arguments);
	                args.unshift(source);
	                return $.format.apply(this, args);
	            };
	        if (arguments.length > 2 && params.constructor != Array) {
	            params = $.makeArray(arguments).slice(1);
	        }
	        if (params.constructor != Array) {
	            params = [params];
	        }
	        $.each(params, function (i, n) {
	            source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
	        });
	        return source;
	    };

	    $.format = format;
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	(function ($) {
	    var TABLE_TAG = 'table',
	        TBODY_TAG = 'tbody',
	    
	        TABLE_CLASS = 'table',
	        ORIGIN_TABLE_CONTAINER_CLASS = 'origin-table-container',
	        HEAD_TABLE_CONTAINER_CLASS = 'head-table-container',
	        COLUMN_TABLE_CONTAINER_CLASS = 'column-table-container',
	        COLUMN_HEAD_TABLE_CONTAINER_CLASS = 'column-head-table-container',

	        TABLE_FIXED = 'table-fixed'

	    $.widget("ejs.table", {
	        options: {
	            frozenColumnsCount: 0
	        },

	        _create: function () {
	            var _self = this,
	                _$el = _self.element;

	            _self._initOriginTable();
	            _self._initHeadTable();
	            _self._initColumnTable();

	            _self.updateLayout();

	            _self._initEvents();
	        },
	        _initEvents: function () {
	            var _self = this,
	                _eventNamespace = _self.eventNamespace;

	            _self._$originTableContainer
	                .off(_eventNamespace)
	                .on('scroll' + _eventNamespace, _self, function (e) {
	                var _self = e.data;

	                _self._$headTableContainer.scrollLeft(_self._$originTableContainer.scrollLeft());
	            });

	            $(window)
	                .off(_eventNamespace)
	                .on('resize' + _eventNamespace, _self, function (e) {
	                    e.data.updateLayout();
	                });
	        },
	        _initOriginTable: function () {
	            var _self = this,
	                _$el = _self.element;

	            _self._$originTableContainer = $($.format('<div class="{0}"></div>', ORIGIN_TABLE_CONTAINER_CLASS));
	            _self._$originTable = _$el.children(TABLE_TAG);
	            _self._$originTableContainer
	                .append(_self._$originTable)
	                .appendTo(_$el);
	        },
	        _initHeadTable: function () {
	            var _self = this,
	                _$el = _self.element;

	            var _wrapper = $($.format('<div class="{0}"></div>', HEAD_TABLE_CONTAINER_CLASS));

	            _self._$headTable = _self._$originTable.clone();
	            _self._$headTable.addClass(TABLE_FIXED).children(TBODY_TAG).remove();

	            _wrapper.append(_self._$headTable);
	            _$el.append(_wrapper);

	            _self._$headTableContainer = _wrapper;
	        },
	        _initColumnTable: function () {
	            var _self = this,
	                _options = _self.options,
	                _$el = _self.element;

	            if (_options.frozenColumnsCount > 0) {
	                var _wrapper = $($.format('<div class="{0}"></div>', COLUMN_TABLE_CONTAINER_CLASS));



	                _self._initColumnHeadTable();
	            }
	        },
	        _initColumnHeadTable: function () {
	            var _self = this,
	                _$el = _self.element;

	            var _wrapper = $($.format('<div class="{0}"></div>', COLUMN_HEAD_TABLE_CONTAINER_CLASS));
	        },
	        _updateContainer: function (headHeight) {
	            var _self = this;

	            _self.element.css('padding-top', headHeight);
	        },
	        _updateOriginTable: function (headHeight) {
	            var _self = this,
	                _$el = _self.element;

	            _self._$originTableContainer.outerHeight(_$el[0].clientHeight)
	            _self._$originTable.css('margin-top', headHeight * -1);
	        },
	        _updateHeadTable: function (headHeight) {
	            var _self = this;

	            var _oths = _self._$originTable.find('th'),
	                _hths = _self._$headTable.find('th');

	            for (var i = 0; i < _oths.length; i++) {
	                $(_hths[i]).outerWidth($(_oths[i]).outerWidth());
	            }
	            
	            _self._$headTableContainer.outerWidth(_self._$originTableContainer[0].clientWidth);
	        },
	        _destroy: function () {

	        },

	        updateLayout: function () {
	            var _self = this;

	            var _headHeight = _self._$originTable.find('> thead > tr').outerHeight();
	            _self._updateContainer(_headHeight);
	            _self._updateOriginTable(_headHeight);
	            _self._updateHeadTable(_headHeight);
	        },
	        updateItemsSource: function () {
	            var _self = this;

	        }
	    })
	})(jQuery)

/***/ }
/******/ ]);