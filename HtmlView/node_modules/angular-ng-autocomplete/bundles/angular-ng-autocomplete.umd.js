(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angular-ng-autocomplete', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/forms', '@angular/common'], factory) :
    (factory((global['angular-ng-autocomplete'] = {}),global.ng.core,global.rxjs,global.rxjs.operators,global.ng.forms,global.ng.common));
}(this, (function (exports,i0,rxjs,operators,forms,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AutocompleteLibService = (function () {
        function AutocompleteLibService() {
        }
        AutocompleteLibService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        AutocompleteLibService.ctorParameters = function () { return []; };
        /** @nocollapse */ AutocompleteLibService.ngInjectableDef = i0.defineInjectable({ factory: function AutocompleteLibService_Factory() { return new AutocompleteLibService(); }, token: AutocompleteLibService, providedIn: "root" });
        return AutocompleteLibService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AutocompleteLibComponent = (function () {
        function AutocompleteLibComponent() {
        }
        /**
         * @return {?}
         */
        AutocompleteLibComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        AutocompleteLibComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ng-autocomplete-lib',
                        template: "\n    <p>\n      autocomplete-lib works!\n    </p>\n  ",
                        styles: []
                    },] },
        ];
        /** @nocollapse */
        AutocompleteLibComponent.ctorParameters = function () { return []; };
        return AutocompleteLibComponent;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** *
     * Keyboard events
      @type {?} */
    var isArrowUp = function (keyCode) { return keyCode === 38; };
    /** @type {?} */
    var isArrowDown = function (keyCode) { return keyCode === 40; };
    /** @type {?} */
    var isArrowUpDown = function (keyCode) { return isArrowUp(keyCode) || isArrowDown(keyCode); };
    /** @type {?} */
    var isEnter = function (keyCode) { return keyCode === 13; };
    /** @type {?} */
    var isBackspace = function (keyCode) { return keyCode === 8; };
    /** @type {?} */
    var isDelete = function (keyCode) { return keyCode === 46; };
    /** @type {?} */
    var isESC = function (keyCode) { return keyCode === 27; };
    /** @type {?} */
    var isTab = function (keyCode) { return keyCode === 9; };
    var AutocompleteComponent = (function () {
        function AutocompleteComponent(elementRef, renderer) {
            this.renderer = renderer;
            this.query = '';
            this.filteredList = [];
            this.historyList = [];
            this.isHistoryListVisible = true;
            this.selectedIdx = -1;
            this.toHighlight = '';
            this.notFound = false;
            this.isFocused = false;
            this.isOpen = false;
            this.isScrollToEnd = false;
            this.manualOpen = undefined;
            this.manualClose = undefined;
            /**
             * Data of items list.
             * It can be array of strings or array of objects.
             */
            this.data = [];
            this.placeHolder = '';
            /**
             * Heading text of history list.
             * If it is null then history heading is hidden.
             */
            this.historyHeading = 'Recently selected';
            this.historyListMaxNumber = 15;
            this.notFoundText = 'Not found';
            /**
             * The minimum number of characters the user must type before a search is performed.
             */
            this.minQueryLength = 1;
            /**
             * Event that is emitted whenever an item from the list is selected.
             */
            this.selected = new i0.EventEmitter();
            /**
             * Event that is emitted whenever an input is changed.
             */
            this.inputChanged = new i0.EventEmitter();
            /**
             * Event that is emitted whenever an input is focused.
             */
            this.inputFocused = new i0.EventEmitter();
            /**
             * Event that is emitted whenever an input is cleared.
             */
            this.inputCleared = new i0.EventEmitter();
            /**
             * Event that is emitted when the autocomplete panel is opened.
             */
            this.opened = new i0.EventEmitter();
            /**
             * Event that is emitted when the autocomplete panel is closed.
             */
            this.closed = new i0.EventEmitter();
            /**
             * Event that is emitted when scrolled to the end of items.
             */
            this.scrolledToEnd = new i0.EventEmitter();
            /**
             * Propagates new value when model changes
             */
            this.propagateChange = function () {
            };
            this.elementRef = elementRef;
        }
        /**
         * Writes a new value from the form model into the view,
         * Updates model
         */
        /**
         * Writes a new value from the form model into the view,
         * Updates model
         * @param {?} value
         * @return {?}
         */
        AutocompleteComponent.prototype.writeValue = /**
         * Writes a new value from the form model into the view,
         * Updates model
         * @param {?} value
         * @return {?}
         */
            function (value) {
                if (value) {
                    this.query = value;
                }
            };
        /**
         * Registers a handler that is called when something in the view has changed
         */
        /**
         * Registers a handler that is called when something in the view has changed
         * @param {?} fn
         * @return {?}
         */
        AutocompleteComponent.prototype.registerOnChange = /**
         * Registers a handler that is called when something in the view has changed
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                this.propagateChange = fn;
            };
        /**
         * Registers a handler specifically for when a control receives a touch event
         */
        /**
         * Registers a handler specifically for when a control receives a touch event
         * @param {?} fn
         * @return {?}
         */
        AutocompleteComponent.prototype.registerOnTouched = /**
         * Registers a handler specifically for when a control receives a touch event
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
            };
        /**
         * Event that is called when the value of an input element is changed
         */
        /**
         * Event that is called when the value of an input element is changed
         * @param {?} event
         * @return {?}
         */
        AutocompleteComponent.prototype.onChange = /**
         * Event that is called when the value of an input element is changed
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.propagateChange(event.target.value);
            };
        /**
         * @return {?}
         */
        AutocompleteComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.handleScroll();
                this.initEventStream();
                this.setInitialValue(this.initialValue);
            };
        /**
         * Set initial value
         * @param {?} value
         * @return {?}
         */
        AutocompleteComponent.prototype.setInitialValue = /**
         * Set initial value
         * @param {?} value
         * @return {?}
         */
            function (value) {
                if (this.initialValue) {
                    this.select(value);
                }
            };
        /**
         * Update search results
         */
        /**
         * Update search results
         * @param {?} changes
         * @return {?}
         */
        AutocompleteComponent.prototype.ngOnChanges = /**
         * Update search results
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (changes && changes["data"] &&
                    Array.isArray(changes["data"].currentValue)) {
                    this.handleItemsChange();
                    if (!changes["data"].firstChange && this.isFocused) {
                        this.handleOpen();
                    }
                }
            };
        /**
         * Items change
         * @return {?}
         */
        AutocompleteComponent.prototype.handleItemsChange = /**
         * Items change
         * @return {?}
         */
            function () {
                this.isScrollToEnd = false;
                if (!this.isOpen) {
                    return;
                }
                this.filteredList = this.data;
            };
        /**
         * Filter data
         * @return {?}
         */
        AutocompleteComponent.prototype.filterList = /**
         * Filter data
         * @return {?}
         */
            function () {
                var _this = this;
                this.selectedIdx = -1;
                this.initSearchHistory();
                if (this.query != null && this.data) {
                    this.toHighlight = this.query;
                    this.filteredList = this.data.filter(function (item) {
                        if (typeof item === 'string') {
                            // string logic, check equality of strings
                            return item.toLowerCase().indexOf(_this.query.toLowerCase()) > -1;
                        }
                        else if (typeof item === 'object' && item.constructor === Object) {
                            // object logic, check property equality
                            return item[_this.searchKeyword].toLowerCase().indexOf(_this.query.toLowerCase()) > -1;
                        }
                    });
                }
                else {
                    this.notFound = false;
                }
            };
        /**
         * Check type of item in the list.
         * @param item
         */
        /**
         * Check type of item in the list.
         * @param {?} item
         * @return {?}
         */
        AutocompleteComponent.prototype.isType = /**
         * Check type of item in the list.
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return typeof item === 'string';
            };
        /**
         * Select item in the list.
         * @param {?} item
         * @return {?}
         */
        AutocompleteComponent.prototype.select = /**
         * Select item in the list.
         * @param {?} item
         * @return {?}
         */
            function (item) {
                var _this = this;
                this.query = !this.isType(item) ? item[this.searchKeyword] : item;
                this.isOpen = true;
                this.selected.emit(item);
                this.propagateChange(item);
                if (this.initialValue) {
                    /** @type {?} */
                    var history_1 = window.localStorage.getItem("" + this.historyIdentifier);
                    if (history_1) {
                        /** @type {?} */
                        var existingHistory = JSON.parse(localStorage["" + this.historyIdentifier]);
                        if (!(existingHistory instanceof Array))
                            existingHistory = [];
                        // check if selected item exists in existingHistory
                        if (!existingHistory.some(function (existingItem) {
                            return !_this.isType(existingItem)
                                ? existingItem[_this.searchKeyword] == item[_this.searchKeyword] : existingItem == item;
                        })) {
                            existingHistory.unshift(item);
                            localStorage.setItem("" + this.historyIdentifier, JSON.stringify(existingHistory));
                            // check if items don't exceed max allowed number
                            if (existingHistory.length >= this.historyListMaxNumber) {
                                existingHistory.splice(existingHistory.length - 1, 1);
                                localStorage.setItem("" + this.historyIdentifier, JSON.stringify(existingHistory));
                            }
                        }
                        else {
                            // if selected item exists in existingHistory swap to top in array
                            if (!this.isType(item)) {
                                /** @type {?} */
                                var copiedExistingHistory = existingHistory.slice();
                                /** @type {?} */
                                var selectedIndex = copiedExistingHistory.map(function (el) { return el[_this.searchKeyword]; }).indexOf(item[this.searchKeyword]);
                                copiedExistingHistory.splice(selectedIndex, 1);
                                copiedExistingHistory.splice(0, 0, item);
                                localStorage.setItem("" + this.historyIdentifier, JSON.stringify(copiedExistingHistory));
                            }
                            else {
                                /** @type {?} */
                                var copiedExistingHistory = existingHistory.slice(); // copy original existingHistory array
                                copiedExistingHistory.splice(copiedExistingHistory.indexOf(item), 1);
                                copiedExistingHistory.splice(0, 0, item);
                                localStorage.setItem("" + this.historyIdentifier, JSON.stringify(copiedExistingHistory));
                            }
                        }
                    }
                    else {
                        this.saveHistory(item);
                    }
                }
                else {
                    this.saveHistory(item);
                }
                this.handleClose();
            };
        /**
         * Document click
         * @param {?} e event
         * @return {?}
         */
        AutocompleteComponent.prototype.handleClick = /**
         * Document click
         * @param {?} e event
         * @return {?}
         */
            function (e) {
                /** @type {?} */
                var clickedComponent = e.target;
                /** @type {?} */
                var inside = false;
                do {
                    if (clickedComponent === this.elementRef.nativeElement) {
                        inside = true;
                        if (this.filteredList.length) {
                            this.handleOpen();
                        }
                    }
                    clickedComponent = clickedComponent.parentNode;
                } while (clickedComponent);
                if (!inside) {
                    this.handleClose();
                }
            };
        /**
         * Scroll items
         * @return {?}
         */
        AutocompleteComponent.prototype.handleScroll = /**
         * Scroll items
         * @return {?}
         */
            function () {
                var _this = this;
                this.renderer.listen(this.filteredListElement.nativeElement, 'scroll', function () {
                    _this.scrollToEnd();
                });
            };
        /**
         * Define panel state
         */
        /**
         * Define panel state
         * @param {?} event
         * @return {?}
         */
        AutocompleteComponent.prototype.setPanelState = /**
         * Define panel state
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (event) {
                    event.stopPropagation();
                }
                // If controls are untouched
                if (typeof this.manualOpen === 'undefined'
                    && typeof this.manualClose === 'undefined') {
                    this.isOpen = false;
                    this.handleOpen();
                }
                // If one of the controls is untouched and other is deactivated
                if (typeof this.manualOpen === 'undefined'
                    && this.manualClose === false
                    || typeof this.manualClose === 'undefined'
                        && this.manualOpen === false) {
                    this.isOpen = false;
                    this.handleOpen();
                }
                // if controls are touched but both are deactivated
                if (this.manualOpen === false && this.manualClose === false) {
                    this.isOpen = false;
                    this.handleOpen();
                }
                // if open control is touched and activated
                if (this.manualOpen) {
                    this.isOpen = false;
                    this.handleOpen();
                    this.manualOpen = false;
                }
                // if close control is touched and activated
                if (this.manualClose) {
                    this.isOpen = true;
                    this.handleClose();
                    this.manualClose = false;
                }
            };
        /**
         * Manual controls
         */
        /**
         * Manual controls
         * @return {?}
         */
        AutocompleteComponent.prototype.open = /**
         * Manual controls
         * @return {?}
         */
            function () {
                this.manualOpen = true;
                this.isOpen = false;
                this.handleOpen();
            };
        /**
         * @return {?}
         */
        AutocompleteComponent.prototype.close = /**
         * @return {?}
         */
            function () {
                this.manualClose = true;
                this.isOpen = true;
                this.handleClose();
            };
        /**
         * @return {?}
         */
        AutocompleteComponent.prototype.focus = /**
         * @return {?}
         */
            function () {
                this.handleFocus(event);
            };
        /**
         * @return {?}
         */
        AutocompleteComponent.prototype.clear = /**
         * @return {?}
         */
            function () {
                this.remove(event);
            };
        /**
         * Remove search query
         * @param {?} e
         * @return {?}
         */
        AutocompleteComponent.prototype.remove = /**
         * Remove search query
         * @param {?} e
         * @return {?}
         */
            function (e) {
                e.stopPropagation();
                this.query = '';
                this.inputCleared.emit();
                this.propagateChange(this.query);
                this.setPanelState(e);
            };
        /**
         * Initialize historyList search
         */
        /**
         * Initialize historyList search
         * @return {?}
         */
        AutocompleteComponent.prototype.initSearchHistory = /**
         * Initialize historyList search
         * @return {?}
         */
            function () {
                this.isHistoryListVisible = false;
                if (this.historyIdentifier && !this.query) {
                    /** @type {?} */
                    var history_2 = window.localStorage.getItem("" + this.historyIdentifier);
                    if (history_2) {
                        this.isHistoryListVisible = true;
                        this.filteredList = [];
                        this.historyList = history_2 ? JSON.parse(history_2) : [];
                    }
                    else {
                        this.isHistoryListVisible = false;
                    }
                }
                else {
                    this.isHistoryListVisible = false;
                }
            };
        /**
         * @return {?}
         */
        AutocompleteComponent.prototype.handleOpen = /**
         * @return {?}
         */
            function () {
                if (this.isOpen || this.isOpen && !this.isLoading) {
                    return;
                }
                // If data exists
                if (this.data && this.data.length) {
                    this.isOpen = true;
                    this.filterList();
                    this.opened.emit();
                }
            };
        /**
         * @return {?}
         */
        AutocompleteComponent.prototype.handleClose = /**
         * @return {?}
         */
            function () {
                if (!this.isOpen) {
                    this.isFocused = false;
                    return;
                }
                this.isOpen = false;
                this.filteredList = [];
                this.selectedIdx = -1;
                this.notFound = false;
                this.isHistoryListVisible = false;
                this.isFocused = false;
                this.closed.emit();
            };
        /**
         * @param {?} e
         * @return {?}
         */
        AutocompleteComponent.prototype.handleFocus = /**
         * @param {?} e
         * @return {?}
         */
            function (e) {
                //this.searchInput.nativeElement.focus();
                if (this.isFocused) {
                    return;
                }
                this.inputFocused.emit(e);
                // if data exists then open
                if (this.data && this.data.length) {
                    this.setPanelState(event);
                }
                this.isFocused = true;
            };
        /**
         * @return {?}
         */
        AutocompleteComponent.prototype.scrollToEnd = /**
         * @return {?}
         */
            function () {
                if (this.isScrollToEnd) {
                    return;
                }
                /** @type {?} */
                var scrollTop = this.filteredListElement.nativeElement
                    .scrollTop;
                /** @type {?} */
                var scrollHeight = this.filteredListElement.nativeElement
                    .scrollHeight;
                /** @type {?} */
                var elementHeight = this.filteredListElement.nativeElement
                    .clientHeight;
                /** @type {?} */
                var atBottom = scrollHeight === scrollTop + elementHeight;
                if (atBottom) {
                    this.scrolledToEnd.emit();
                    this.isScrollToEnd = true;
                }
            };
        /**
         * Initialize keyboard events
         */
        /**
         * Initialize keyboard events
         * @return {?}
         */
        AutocompleteComponent.prototype.initEventStream = /**
         * Initialize keyboard events
         * @return {?}
         */
            function () {
                this.inputKeyUp$ = rxjs.fromEvent(this.searchInput.nativeElement, 'keyup').pipe(operators.map(function (e) { return e; }));
                this.inputKeyDown$ = rxjs.fromEvent(this.searchInput.nativeElement, 'keydown').pipe(operators.map(function (e) { return e; }));
                this.listenEventStream();
            };
        /**
         * Listen keyboard events
         */
        /**
         * Listen keyboard events
         * @return {?}
         */
        AutocompleteComponent.prototype.listenEventStream = /**
         * Listen keyboard events
         * @return {?}
         */
            function () {
                var _this = this;
                // key up event
                this.inputKeyUp$
                    .pipe(operators.filter(function (e) {
                    return !isArrowUpDown(e.keyCode) &&
                        !isEnter(e.keyCode) &&
                        !isESC(e.keyCode) &&
                        !isTab(e.keyCode);
                }), operators.debounceTime(this.debounceTime)).subscribe(function (e) {
                    _this.onKeyUp(e);
                });
                // cursor up & down
                this.inputKeyDown$.pipe(operators.filter(function (e) { return isArrowUpDown(e.keyCode); })).subscribe(function (e) {
                    e.preventDefault();
                    _this.onFocusItem(e);
                });
                // enter keyup
                this.inputKeyUp$.pipe(operators.filter(function (e) { return isEnter(e.keyCode); })).subscribe(function (e) {
                    //this.onHandleEnter();
                });
                // enter keydown
                this.inputKeyDown$.pipe(operators.filter(function (e) { return isEnter(e.keyCode); })).subscribe(function (e) {
                    _this.onHandleEnter();
                });
                // ESC
                this.inputKeyUp$.pipe(operators.filter(function (e) { return isESC(e.keyCode); }, operators.debounceTime(100))).subscribe(function (e) {
                    _this.onEsc();
                });
                // delete
                this.inputKeyDown$.pipe(operators.filter(function (e) { return isBackspace(e.keyCode) || isDelete(e.keyCode); })).subscribe(function (e) {
                    _this.onDelete();
                });
            };
        /**
         * on keyup == when input changed
         * @param e event
         */
        /**
         * on keyup == when input changed
         * @param {?} e event
         * @return {?}
         */
        AutocompleteComponent.prototype.onKeyUp = /**
         * on keyup == when input changed
         * @param {?} e event
         * @return {?}
         */
            function (e) {
                this.notFound = false; // search results are unknown while typing
                // if input is empty
                if (!this.query) {
                    this.notFound = false;
                    this.inputChanged.emit(e.target.value);
                    this.inputCleared.emit();
                    //this.filterList();
                    this.setPanelState(e);
                }
                // if query >= to minQueryLength
                if (this.query.length >= this.minQueryLength) {
                    this.inputChanged.emit(e.target.value);
                    this.filterList();
                    // If no results found
                    if (!this.filteredList.length) {
                        this.notFoundText ? this.notFound = true : this.notFound = false;
                    }
                }
            };
        /**
         * Keyboard arrow top and arrow bottom
         * @param e event
         */
        /**
         * Keyboard arrow top and arrow bottom
         * @param {?} e event
         * @return {?}
         */
        AutocompleteComponent.prototype.onFocusItem = /**
         * Keyboard arrow top and arrow bottom
         * @param {?} e event
         * @return {?}
         */
            function (e) {
                // move arrow up and down on filteredList or historyList
                if (!this.historyList.length || !this.isHistoryListVisible) {
                    /** @type {?} */
                    var totalNumItem = this.filteredList.length;
                    if (e.code === 'ArrowDown') {
                        /** @type {?} */
                        var sum = this.selectedIdx;
                        sum = (this.selectedIdx === null) ? 0 : sum + 1;
                        this.selectedIdx = (totalNumItem + sum) % totalNumItem;
                        this.scrollToFocusedItem(this.selectedIdx);
                    }
                    else if (e.code === 'ArrowUp') {
                        if (this.selectedIdx == -1) {
                            this.selectedIdx = 0;
                        }
                        this.selectedIdx = (totalNumItem + this.selectedIdx - 1) % totalNumItem;
                        this.scrollToFocusedItem(this.selectedIdx);
                    }
                }
                else {
                    /** @type {?} */
                    var totalNumItem = this.historyList.length;
                    if (e.code === 'ArrowDown') {
                        /** @type {?} */
                        var sum = this.selectedIdx;
                        sum = (this.selectedIdx === null) ? 0 : sum + 1;
                        this.selectedIdx = (totalNumItem + sum) % totalNumItem;
                        this.scrollToFocusedItem(this.selectedIdx);
                    }
                    else if (e.code === 'ArrowUp') {
                        if (this.selectedIdx == -1) {
                            this.selectedIdx = 0;
                        }
                        this.selectedIdx = (totalNumItem + this.selectedIdx - 1) % totalNumItem;
                        this.scrollToFocusedItem(this.selectedIdx);
                    }
                }
            };
        /**
         * Scroll to focused item
         * * @param index
         */
        /**
         * Scroll to focused item
         * * \@param index
         * @param {?} index
         * @return {?}
         */
        AutocompleteComponent.prototype.scrollToFocusedItem = /**
         * Scroll to focused item
         * * \@param index
         * @param {?} index
         * @return {?}
         */
            function (index) {
                /** @type {?} */
                var listElement = null;
                // Define list element
                if (!this.historyList.length || !this.isHistoryListVisible) {
                    // filteredList element
                    listElement = this.filteredListElement.nativeElement;
                }
                else {
                    // historyList element
                    listElement = this.historyListElement.nativeElement;
                }
                /** @type {?} */
                var items = Array.prototype.slice.call(listElement.childNodes).filter(function (node) {
                    if (node.nodeType === 1) {
                        // if node is element
                        return node.className.includes('item');
                    }
                    else {
                        return false;
                    }
                });
                if (!items.length) {
                    return;
                }
                /** @type {?} */
                var listHeight = listElement.offsetHeight;
                /** @type {?} */
                var itemHeight = items[index].offsetHeight;
                /** @type {?} */
                var visibleTop = listElement.scrollTop;
                /** @type {?} */
                var visibleBottom = listElement.scrollTop + listHeight - itemHeight;
                /** @type {?} */
                var targetPosition = items[index].offsetTop;
                if (targetPosition < visibleTop) {
                    listElement.scrollTop = targetPosition;
                }
                if (targetPosition > visibleBottom) {
                    listElement.scrollTop = targetPosition - listHeight + itemHeight;
                }
            };
        /**
         * Select item on enter click
         */
        /**
         * Select item on enter click
         * @return {?}
         */
        AutocompleteComponent.prototype.onHandleEnter = /**
         * Select item on enter click
         * @return {?}
         */
            function () {
                // click enter to choose item from filteredList or historyList
                if (this.selectedIdx > -1) {
                    if (!this.historyList.length || !this.isHistoryListVisible) {
                        // filteredList
                        this.query = !this.isType(this.filteredList[this.selectedIdx])
                            ? this.filteredList[this.selectedIdx][this.searchKeyword]
                            : this.filteredList[this.selectedIdx];
                        this.saveHistory(this.filteredList[this.selectedIdx]);
                        this.select(this.filteredList[this.selectedIdx]);
                    }
                    else {
                        // historyList
                        this.query = !this.isType(this.historyList[this.selectedIdx])
                            ? this.historyList[this.selectedIdx][this.searchKeyword]
                            : this.historyList[this.selectedIdx];
                        this.saveHistory(this.historyList[this.selectedIdx]);
                        this.select(this.historyList[this.selectedIdx]);
                    }
                }
                this.isHistoryListVisible = false;
                this.handleClose();
            };
        /**
         * Esc click
         */
        /**
         * Esc click
         * @return {?}
         */
        AutocompleteComponent.prototype.onEsc = /**
         * Esc click
         * @return {?}
         */
            function () {
                this.searchInput.nativeElement.blur();
                this.handleClose();
            };
        /**
         * Delete click
         */
        /**
         * Delete click
         * @return {?}
         */
        AutocompleteComponent.prototype.onDelete = /**
         * Delete click
         * @return {?}
         */
            function () {
                // panel is open on delete
                this.isOpen = true;
            };
        /**
         * Select item to save in localStorage
         * @param selected
         */
        /**
         * Select item to save in localStorage
         * @param {?} selected
         * @return {?}
         */
        AutocompleteComponent.prototype.saveHistory = /**
         * Select item to save in localStorage
         * @param {?} selected
         * @return {?}
         */
            function (selected) {
                var _this = this;
                if (this.historyIdentifier) {
                    // check if selected item exists in historyList
                    if (!this.historyList.some(function (item) {
                        return !_this.isType(item)
                            ? item[_this.searchKeyword] == selected[_this.searchKeyword] : item == selected;
                    })) {
                        this.saveHistoryToLocalStorage(__spread([selected], this.historyList));
                        // check if items don't exceed max allowed number
                        if (this.historyList.length >= this.historyListMaxNumber) {
                            this.historyList.splice(this.historyList.length - 1, 1);
                            this.saveHistoryToLocalStorage(__spread([selected], this.historyList));
                        }
                    }
                    else {
                        // if selected item exists in historyList swap to top in array
                        if (!this.isType(selected)) {
                            /** @type {?} */
                            var copiedHistoryList = this.historyList.slice();
                            /** @type {?} */
                            var selectedIndex = copiedHistoryList.map(function (item) { return item[_this.searchKeyword]; }).indexOf(selected[this.searchKeyword]);
                            copiedHistoryList.splice(selectedIndex, 1);
                            copiedHistoryList.splice(0, 0, selected);
                            this.saveHistoryToLocalStorage(__spread(copiedHistoryList));
                        }
                        else {
                            /** @type {?} */
                            var copiedHistoryList = this.historyList.slice(); // copy original historyList array
                            copiedHistoryList.splice(this.historyList.indexOf(selected), 1);
                            copiedHistoryList.splice(0, 0, selected);
                            this.saveHistoryToLocalStorage(__spread(copiedHistoryList));
                        }
                    }
                }
            };
        /**
         * Save item in localStorage
         * @param selected
         */
        /**
         * Save item in localStorage
         * @param {?} selected
         * @return {?}
         */
        AutocompleteComponent.prototype.saveHistoryToLocalStorage = /**
         * Save item in localStorage
         * @param {?} selected
         * @return {?}
         */
            function (selected) {
                window.localStorage.setItem("" + this.historyIdentifier, JSON.stringify(selected));
            };
        /**
         * Remove item from localStorage
         * @param index
         * @param e event
         */
        /**
         * Remove item from localStorage
         * @param {?} index
         * @param {?} e event
         * @return {?}
         */
        AutocompleteComponent.prototype.removeHistoryItem = /**
         * Remove item from localStorage
         * @param {?} index
         * @param {?} e event
         * @return {?}
         */
            function (index, e) {
                e.stopPropagation();
                this.historyList = this.historyList.filter(function (v, i) { return i !== index; });
                this.saveHistoryToLocalStorage(this.historyList);
                if (this.historyList.length == 0) {
                    window.localStorage.removeItem("" + this.historyIdentifier);
                    this.filterList();
                }
            };
        /**
         * Reset localStorage
         * @param e event
         */
        /**
         * Reset localStorage
         * @param {?} e event
         * @return {?}
         */
        AutocompleteComponent.prototype.resetHistoryList = /**
         * Reset localStorage
         * @param {?} e event
         * @return {?}
         */
            function (e) {
                e.stopPropagation();
                this.historyList = [];
                window.localStorage.removeItem("" + this.historyIdentifier);
                this.filterList();
            };
        AutocompleteComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ng-autocomplete',
                        template: "<div class=\"autocomplete-container\">\n  <div class=\"input-container\">\n    <input #searchInput type=\"text\" placeholder={{placeHolder}}\n           [(ngModel)]=query\n           (input)=\"onChange($event)\"\n           (focus)=handleFocus($event)>\n    <div class=\"x\" *ngIf=\"query && !isLoading\" (click)=\"remove($event)\">\n      <i class=\"material-icons\">close</i>\n    </div>\n    <!--Loading mask-->\n    <div class=\"sk-fading-circle\" *ngIf=\"isLoading\">\n      <div class=\"sk-circle1 sk-circle\"></div>\n      <div class=\"sk-circle2 sk-circle\"></div>\n      <div class=\"sk-circle3 sk-circle\"></div>\n      <div class=\"sk-circle4 sk-circle\"></div>\n      <div class=\"sk-circle5 sk-circle\"></div>\n      <div class=\"sk-circle6 sk-circle\"></div>\n      <div class=\"sk-circle7 sk-circle\"></div>\n      <div class=\"sk-circle8 sk-circle\"></div>\n      <div class=\"sk-circle9 sk-circle\"></div>\n      <div class=\"sk-circle10 sk-circle\"></div>\n      <div class=\"sk-circle11 sk-circle\"></div>\n      <div class=\"sk-circle12 sk-circle\"></div>\n    </div>\n  </div>\n\n  <!--FilteredList items-->\n  <div class=\"suggestions-container\"\n       [ngClass]=\"{ 'is-hidden': isHistoryListVisible, 'is-visible': !isHistoryListVisible}\">\n    <ul #filteredListElement>\n      <li *ngFor=\"let item of filteredList; let idx = index\" class=\"item\">\n        <!--string logic-->\n        <div [class.complete-selected]=\"idx === selectedIdx\" *ngIf='isType(item)'\n             (click)=\"select(item)\">\n          <ng-container\n            *ngTemplateOutlet=\"itemTemplate;  context: { $implicit: item | highlight: toHighlight }\">\n          </ng-container>\n        </div>\n        <!--object logic-->\n        <div [class.complete-selected]=\"idx === selectedIdx\" *ngIf='!isType(item)'\n             (click)=\"select(item)\">\n          <ng-container\n            *ngTemplateOutlet=\"itemTemplate; context: { $implicit: item | highlight: toHighlight : searchKeyword }\">\n          </ng-container>\n        </div>\n\n      </li>\n    </ul>\n  </div>\n\n  <!--HistoryList items-->\n  <div class=\"suggestions-container\"\n       [ngClass]=\"{ 'is-hidden': !isHistoryListVisible, 'is-visible': isHistoryListVisible}\">\n    <!--HistoryList heading-->\n    <div class=\"history-heading\" *ngIf=\"historyList.length > 0 && historyHeading\">\n      <div class=\"text\">{{historyHeading}}</div>\n      <div class=\"x\" (click)=\"resetHistoryList($event)\">\n        <i class=\"material-icons\">delete</i>\n      </div>\n    </div>\n\n    <ul #historyListElement>\n      <li *ngFor=\"let item of historyList; let idx = index\" class=\"item\">\n        <!--string logic-->\n        <div [class.complete-selected]=\"idx === selectedIdx\" *ngIf='isType(item)' (click)=\"select(item)\">\n          <ng-container\n            *ngTemplateOutlet=\"itemTemplate;  context: { $implicit: item }\">\n          </ng-container>\n        </div>\n        <!--object logic-->\n        <div [class.complete-selected]=\"idx === selectedIdx\" *ngIf='!isType(item)' (click)=\"select(item)\">\n          <ng-container\n            *ngTemplateOutlet=\"itemTemplate; context: { $implicit: item }\">\n          </ng-container>\n        </div>\n        <div class=\"x\" (click)=\"removeHistoryItem(idx, $event)\">\n          <i class=\"material-icons\">close</i>\n        </div>\n      </li>\n    </ul>\n  </div>\n\n  <!--Not found-->\n  <div class=\"not-found\" *ngIf=\"isLoading ? !isLoading && notFound : notFound\">\n    <ng-container\n      *ngTemplateOutlet=\"notFoundTemplate;  context: { $implicit: notFoundText  }\">\n    </ng-container>\n  </div>\n</div>\n",
                        styles: ["@import url(https://fonts.googleapis.com/icon?family=Material+Icons);.ng-autocomplete{width:600px}.autocomplete-container{box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);position:relative;overflow:visible;height:40px}.autocomplete-container .input-container input{font-size:14px;box-sizing:border-box;border:none;box-shadow:none;outline:0;background-color:#fff;color:rgba(0,0,0,.87);width:100%;padding:0 15px;line-height:40px;height:40px}.autocomplete-container .input-container .x{position:absolute;right:10px;margin:auto;cursor:pointer;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.autocomplete-container .input-container .x i{color:rgba(0,0,0,.54);font-size:22px;vertical-align:middle}.autocomplete-container .suggestions-container{position:absolute;width:100%;background:#fff;height:auto;box-shadow:0 2px 5px rgba(0,0,0,.25);box-sizing:border-box}.autocomplete-container .suggestions-container ul{padding:0;margin:0;max-height:240px;overflow-y:auto}.autocomplete-container .suggestions-container ul li{position:relative;list-style:none;padding:0;margin:0;cursor:pointer}.autocomplete-container .suggestions-container ul li a{padding:14px 15px;display:block;text-decoration:none;cursor:pointer;color:rgba(0,0,0,.87);font-size:15px}.autocomplete-container .suggestions-container .complete-selected,.autocomplete-container .suggestions-container ul li:hover{background-color:rgba(158,158,158,.18)}.autocomplete-container .suggestions-container .history-heading{position:relative;padding:10px 15px;border:1px solid #f1f1f1}.autocomplete-container .suggestions-container .history-heading .text{font-size:.85em}.autocomplete-container .suggestions-container .x{position:absolute;right:10px;margin:auto;cursor:pointer;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.autocomplete-container .suggestions-container .x i{color:rgba(0,0,0,.54);font-size:18px;vertical-align:middle}.autocomplete-container .suggestions-container.is-hidden{visibility:hidden}.autocomplete-container .suggestions-container.is-visible{visibility:visible}.autocomplete-container .not-found{padding:0 .75em;border:1px solid #f1f1f1;background:#fff}.autocomplete-container .not-found div{padding:.4em 0;font-size:.95em;line-height:1.4;border-bottom:1px solid rgba(230,230,230,.7)}.highlight{font-weight:700}.sk-fading-circle{width:20px;height:20px;position:absolute;right:10px;top:0;bottom:0;margin:auto}.sk-fading-circle .sk-circle{width:100%;height:100%;position:absolute;left:0;top:0}.sk-fading-circle .sk-circle:before{content:'';display:block;margin:0 auto;width:15%;height:15%;background-color:#333;border-radius:100%;-webkit-animation:1.2s ease-in-out infinite both sk-circleFadeDelay;animation:1.2s ease-in-out infinite both sk-circleFadeDelay}.sk-fading-circle .sk-circle2{-webkit-transform:rotate(30deg);transform:rotate(30deg)}.sk-fading-circle .sk-circle3{-webkit-transform:rotate(60deg);transform:rotate(60deg)}.sk-fading-circle .sk-circle4{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.sk-fading-circle .sk-circle5{-webkit-transform:rotate(120deg);transform:rotate(120deg)}.sk-fading-circle .sk-circle6{-webkit-transform:rotate(150deg);transform:rotate(150deg)}.sk-fading-circle .sk-circle7{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.sk-fading-circle .sk-circle8{-webkit-transform:rotate(210deg);transform:rotate(210deg)}.sk-fading-circle .sk-circle9{-webkit-transform:rotate(240deg);transform:rotate(240deg)}.sk-fading-circle .sk-circle10{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.sk-fading-circle .sk-circle11{-webkit-transform:rotate(300deg);transform:rotate(300deg)}.sk-fading-circle .sk-circle12{-webkit-transform:rotate(330deg);transform:rotate(330deg)}.sk-fading-circle .sk-circle2:before{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.sk-fading-circle .sk-circle3:before{-webkit-animation-delay:-1s;animation-delay:-1s}.sk-fading-circle .sk-circle4:before{-webkit-animation-delay:-.9s;animation-delay:-.9s}.sk-fading-circle .sk-circle5:before{-webkit-animation-delay:-.8s;animation-delay:-.8s}.sk-fading-circle .sk-circle6:before{-webkit-animation-delay:-.7s;animation-delay:-.7s}.sk-fading-circle .sk-circle7:before{-webkit-animation-delay:-.6s;animation-delay:-.6s}.sk-fading-circle .sk-circle8:before{-webkit-animation-delay:-.5s;animation-delay:-.5s}.sk-fading-circle .sk-circle9:before{-webkit-animation-delay:-.4s;animation-delay:-.4s}.sk-fading-circle .sk-circle10:before{-webkit-animation-delay:-.3s;animation-delay:-.3s}.sk-fading-circle .sk-circle11:before{-webkit-animation-delay:-.2s;animation-delay:-.2s}.sk-fading-circle .sk-circle12:before{-webkit-animation-delay:-.1s;animation-delay:-.1s}@-webkit-keyframes sk-circleFadeDelay{0%,100%,39%{opacity:0}40%{opacity:1}}@keyframes sk-circleFadeDelay{0%,100%,39%{opacity:0}40%{opacity:1}}"],
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: i0.forwardRef(function () { return AutocompleteComponent; }),
                                multi: true
                            }
                        ],
                        encapsulation: i0.ViewEncapsulation.None,
                        host: {
                            '(document:click)': 'handleClick($event)',
                            'class': 'ng-autocomplete'
                        },
                    },] },
        ];
        /** @nocollapse */
        AutocompleteComponent.ctorParameters = function () {
            return [
                { type: i0.ElementRef },
                { type: i0.Renderer2 }
            ];
        };
        AutocompleteComponent.propDecorators = {
            searchInput: [{ type: i0.ViewChild, args: ['searchInput',] }],
            filteredListElement: [{ type: i0.ViewChild, args: ['filteredListElement',] }],
            historyListElement: [{ type: i0.ViewChild, args: ['historyListElement',] }],
            data: [{ type: i0.Input }],
            searchKeyword: [{ type: i0.Input }],
            placeHolder: [{ type: i0.Input }],
            initialValue: [{ type: i0.Input }],
            historyIdentifier: [{ type: i0.Input }],
            historyHeading: [{ type: i0.Input }],
            historyListMaxNumber: [{ type: i0.Input }],
            notFoundText: [{ type: i0.Input }],
            isLoading: [{ type: i0.Input }],
            debounceTime: [{ type: i0.Input }],
            minQueryLength: [{ type: i0.Input }],
            selected: [{ type: i0.Output }],
            inputChanged: [{ type: i0.Output }],
            inputFocused: [{ type: i0.Output }],
            inputCleared: [{ type: i0.Output }],
            opened: [{ type: i0.Output }],
            closed: [{ type: i0.Output }],
            scrolledToEnd: [{ type: i0.Output }],
            itemTemplate: [{ type: i0.ContentChild, args: [i0.TemplateRef,] }, { type: i0.Input }],
            notFoundTemplate: [{ type: i0.Input }]
        };
        return AutocompleteComponent;
    }());
    var HighlightPipe = (function () {
        function HighlightPipe() {
        }
        /**
         * @param {?} text
         * @param {?} search
         * @param {?=} searchKeyword
         * @return {?}
         */
        HighlightPipe.prototype.transform = /**
         * @param {?} text
         * @param {?} search
         * @param {?=} searchKeyword
         * @return {?}
         */
            function (text, search, searchKeyword) {
                /** @type {?} */
                var pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
                pattern = pattern.split(' ').filter(function (t) {
                    return t.length > 0;
                }).join('|');
                /** @type {?} */
                var regex = new RegExp(pattern, 'gi');
                if (!search) {
                    return text;
                }
                if (searchKeyword) {
                    /** @type {?} */
                    var name_1 = text[searchKeyword].replace(regex, function (match) { return "<b>" + match + "</b>"; });
                    /** @type {?} */
                    var text2 = __assign({}, text);
                    // set bold value into searchKeyword of copied object
                    text2[searchKeyword] = name_1;
                    return text2;
                }
                else {
                    return search ? text.replace(regex, function (match) { return "<b>" + match + "</b>"; }) : text;
                }
            };
        HighlightPipe.decorators = [
            { type: i0.Pipe, args: [{ name: 'highlight' },] },
        ];
        return HighlightPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AutocompleteLibModule = (function () {
        function AutocompleteLibModule() {
        }
        AutocompleteLibModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule
                        ],
                        declarations: [AutocompleteLibComponent, AutocompleteComponent, HighlightPipe],
                        exports: [AutocompleteLibComponent, AutocompleteComponent]
                    },] },
        ];
        return AutocompleteLibModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.AutocompleteLibService = AutocompleteLibService;
    exports.AutocompleteLibComponent = AutocompleteLibComponent;
    exports.AutocompleteLibModule = AutocompleteLibModule;
    exports.AutocompleteComponent = AutocompleteComponent;
    exports.HighlightPipe = HighlightPipe;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1uZy1hdXRvY29tcGxldGUudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hbmd1bGFyLW5nLWF1dG9jb21wbGV0ZS9saWIvYXV0b2NvbXBsZXRlLWxpYi5zZXJ2aWNlLnRzIiwibmc6Ly9hbmd1bGFyLW5nLWF1dG9jb21wbGV0ZS9saWIvYXV0b2NvbXBsZXRlLWxpYi5jb21wb25lbnQudHMiLG51bGwsIm5nOi8vYW5ndWxhci1uZy1hdXRvY29tcGxldGUvbGliL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyLW5nLWF1dG9jb21wbGV0ZS9saWIvYXV0b2NvbXBsZXRlLWxpYi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBdXRvY29tcGxldGVMaWJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctYXV0b2NvbXBsZXRlLWxpYicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICBhdXRvY29tcGxldGUtbGliIHdvcmtzIVxuICAgIDwvcD5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBBdXRvY29tcGxldGVMaWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsIENvbnRlbnRDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLFxuICBJbnB1dCwgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUGlwZSxcbiAgUGlwZVRyYW5zZm9ybSwgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLCBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ZnJvbUV2ZW50LCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGVib3VuY2VUaW1lLCBmaWx0ZXIsIG1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLyoqXG4gKiBLZXlib2FyZCBldmVudHNcbiAqL1xuY29uc3QgaXNBcnJvd1VwID0ga2V5Q29kZSA9PiBrZXlDb2RlID09PSAzODtcbmNvbnN0IGlzQXJyb3dEb3duID0ga2V5Q29kZSA9PiBrZXlDb2RlID09PSA0MDtcbmNvbnN0IGlzQXJyb3dVcERvd24gPSBrZXlDb2RlID0+IGlzQXJyb3dVcChrZXlDb2RlKSB8fCBpc0Fycm93RG93bihrZXlDb2RlKTtcbmNvbnN0IGlzRW50ZXIgPSBrZXlDb2RlID0+IGtleUNvZGUgPT09IDEzO1xuY29uc3QgaXNCYWNrc3BhY2UgPSBrZXlDb2RlID0+IGtleUNvZGUgPT09IDg7XG5jb25zdCBpc0RlbGV0ZSA9IGtleUNvZGUgPT4ga2V5Q29kZSA9PT0gNDY7XG5jb25zdCBpc0VTQyA9IGtleUNvZGUgPT4ga2V5Q29kZSA9PT0gMjc7XG5jb25zdCBpc1RhYiA9IGtleUNvZGUgPT4ga2V5Q29kZSA9PT0gOTtcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1hdXRvY29tcGxldGUnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJhdXRvY29tcGxldGUtY29udGFpbmVyXCI+XG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1jb250YWluZXJcIj5cbiAgICA8aW5wdXQgI3NlYXJjaElucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9e3twbGFjZUhvbGRlcn19XG4gICAgICAgICAgIFsobmdNb2RlbCldPXF1ZXJ5XG4gICAgICAgICAgIChpbnB1dCk9XCJvbkNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgKGZvY3VzKT1oYW5kbGVGb2N1cygkZXZlbnQpPlxuICAgIDxkaXYgY2xhc3M9XCJ4XCIgKm5nSWY9XCJxdWVyeSAmJiAhaXNMb2FkaW5nXCIgKGNsaWNrKT1cInJlbW92ZSgkZXZlbnQpXCI+XG4gICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Y2xvc2U8L2k+XG4gICAgPC9kaXY+XG4gICAgPCEtLUxvYWRpbmcgbWFzay0tPlxuICAgIDxkaXYgY2xhc3M9XCJzay1mYWRpbmctY2lyY2xlXCIgKm5nSWY9XCJpc0xvYWRpbmdcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzay1jaXJjbGUxIHNrLWNpcmNsZVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNrLWNpcmNsZTIgc2stY2lyY2xlXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic2stY2lyY2xlMyBzay1jaXJjbGVcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzay1jaXJjbGU0IHNrLWNpcmNsZVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNrLWNpcmNsZTUgc2stY2lyY2xlXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic2stY2lyY2xlNiBzay1jaXJjbGVcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzay1jaXJjbGU3IHNrLWNpcmNsZVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNrLWNpcmNsZTggc2stY2lyY2xlXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic2stY2lyY2xlOSBzay1jaXJjbGVcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzay1jaXJjbGUxMCBzay1jaXJjbGVcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzay1jaXJjbGUxMSBzay1jaXJjbGVcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzay1jaXJjbGUxMiBzay1jaXJjbGVcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPCEtLUZpbHRlcmVkTGlzdCBpdGVtcy0tPlxuICA8ZGl2IGNsYXNzPVwic3VnZ2VzdGlvbnMtY29udGFpbmVyXCJcbiAgICAgICBbbmdDbGFzc109XCJ7ICdpcy1oaWRkZW4nOiBpc0hpc3RvcnlMaXN0VmlzaWJsZSwgJ2lzLXZpc2libGUnOiAhaXNIaXN0b3J5TGlzdFZpc2libGV9XCI+XG4gICAgPHVsICNmaWx0ZXJlZExpc3RFbGVtZW50PlxuICAgICAgPGxpICpuZ0Zvcj1cImxldCBpdGVtIG9mIGZpbHRlcmVkTGlzdDsgbGV0IGlkeCA9IGluZGV4XCIgY2xhc3M9XCJpdGVtXCI+XG4gICAgICAgIDwhLS1zdHJpbmcgbG9naWMtLT5cbiAgICAgICAgPGRpdiBbY2xhc3MuY29tcGxldGUtc2VsZWN0ZWRdPVwiaWR4ID09PSBzZWxlY3RlZElkeFwiICpuZ0lmPSdpc1R5cGUoaXRlbSknXG4gICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdChpdGVtKVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyAgY29udGV4dDogeyAkaW1wbGljaXQ6IGl0ZW0gfCBoaWdobGlnaHQ6IHRvSGlnaGxpZ2h0IH1cIj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwhLS1vYmplY3QgbG9naWMtLT5cbiAgICAgICAgPGRpdiBbY2xhc3MuY29tcGxldGUtc2VsZWN0ZWRdPVwiaWR4ID09PSBzZWxlY3RlZElkeFwiICpuZ0lmPSchaXNUeXBlKGl0ZW0pJ1xuICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3QoaXRlbSlcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGl0ZW0gfCBoaWdobGlnaHQ6IHRvSGlnaGxpZ2h0IDogc2VhcmNoS2V5d29yZCB9XCI+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gIDwvZGl2PlxuXG4gIDwhLS1IaXN0b3J5TGlzdCBpdGVtcy0tPlxuICA8ZGl2IGNsYXNzPVwic3VnZ2VzdGlvbnMtY29udGFpbmVyXCJcbiAgICAgICBbbmdDbGFzc109XCJ7ICdpcy1oaWRkZW4nOiAhaXNIaXN0b3J5TGlzdFZpc2libGUsICdpcy12aXNpYmxlJzogaXNIaXN0b3J5TGlzdFZpc2libGV9XCI+XG4gICAgPCEtLUhpc3RvcnlMaXN0IGhlYWRpbmctLT5cbiAgICA8ZGl2IGNsYXNzPVwiaGlzdG9yeS1oZWFkaW5nXCIgKm5nSWY9XCJoaXN0b3J5TGlzdC5sZW5ndGggPiAwICYmIGhpc3RvcnlIZWFkaW5nXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPnt7aGlzdG9yeUhlYWRpbmd9fTwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInhcIiAoY2xpY2spPVwicmVzZXRIaXN0b3J5TGlzdCgkZXZlbnQpXCI+XG4gICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5kZWxldGU8L2k+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDx1bCAjaGlzdG9yeUxpc3RFbGVtZW50PlxuICAgICAgPGxpICpuZ0Zvcj1cImxldCBpdGVtIG9mIGhpc3RvcnlMaXN0OyBsZXQgaWR4ID0gaW5kZXhcIiBjbGFzcz1cIml0ZW1cIj5cbiAgICAgICAgPCEtLXN0cmluZyBsb2dpYy0tPlxuICAgICAgICA8ZGl2IFtjbGFzcy5jb21wbGV0ZS1zZWxlY3RlZF09XCJpZHggPT09IHNlbGVjdGVkSWR4XCIgKm5nSWY9J2lzVHlwZShpdGVtKScgKGNsaWNrKT1cInNlbGVjdChpdGVtKVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyAgY29udGV4dDogeyAkaW1wbGljaXQ6IGl0ZW0gfVwiPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCEtLW9iamVjdCBsb2dpYy0tPlxuICAgICAgICA8ZGl2IFtjbGFzcy5jb21wbGV0ZS1zZWxlY3RlZF09XCJpZHggPT09IHNlbGVjdGVkSWR4XCIgKm5nSWY9JyFpc1R5cGUoaXRlbSknIChjbGljayk9XCJzZWxlY3QoaXRlbSlcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGl0ZW0gfVwiPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInhcIiAoY2xpY2spPVwicmVtb3ZlSGlzdG9yeUl0ZW0oaWR4LCAkZXZlbnQpXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmNsb3NlPC9pPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgPC9kaXY+XG5cbiAgPCEtLU5vdCBmb3VuZC0tPlxuICA8ZGl2IGNsYXNzPVwibm90LWZvdW5kXCIgKm5nSWY9XCJpc0xvYWRpbmcgPyAhaXNMb2FkaW5nICYmIG5vdEZvdW5kIDogbm90Rm91bmRcIj5cbiAgICA8bmctY29udGFpbmVyXG4gICAgICAqbmdUZW1wbGF0ZU91dGxldD1cIm5vdEZvdW5kVGVtcGxhdGU7ICBjb250ZXh0OiB7ICRpbXBsaWNpdDogbm90Rm91bmRUZXh0ICB9XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9pY29uP2ZhbWlseT1NYXRlcmlhbCtJY29ucyk7Lm5nLWF1dG9jb21wbGV0ZXt3aWR0aDo2MDBweH0uYXV0b2NvbXBsZXRlLWNvbnRhaW5lcntib3gtc2hhZG93OjAgMXB4IDNweCAwIHJnYmEoMCwwLDAsLjIpLDAgMXB4IDFweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDJweCAxcHggLTFweCByZ2JhKDAsMCwwLC4xMik7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6dmlzaWJsZTtoZWlnaHQ6NDBweH0uYXV0b2NvbXBsZXRlLWNvbnRhaW5lciAuaW5wdXQtY29udGFpbmVyIGlucHV0e2ZvbnQtc2l6ZToxNHB4O2JveC1zaXppbmc6Ym9yZGVyLWJveDtib3JkZXI6bm9uZTtib3gtc2hhZG93Om5vbmU7b3V0bGluZTowO2JhY2tncm91bmQtY29sb3I6I2ZmZjtjb2xvcjpyZ2JhKDAsMCwwLC44Nyk7d2lkdGg6MTAwJTtwYWRkaW5nOjAgMTVweDtsaW5lLWhlaWdodDo0MHB4O2hlaWdodDo0MHB4fS5hdXRvY29tcGxldGUtY29udGFpbmVyIC5pbnB1dC1jb250YWluZXIgLnh7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MTBweDttYXJnaW46YXV0bztjdXJzb3I6cG9pbnRlcjt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSl9LmF1dG9jb21wbGV0ZS1jb250YWluZXIgLmlucHV0LWNvbnRhaW5lciAueCBpe2NvbG9yOnJnYmEoMCwwLDAsLjU0KTtmb250LXNpemU6MjJweDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmF1dG9jb21wbGV0ZS1jb250YWluZXIgLnN1Z2dlc3Rpb25zLWNvbnRhaW5lcntwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxMDAlO2JhY2tncm91bmQ6I2ZmZjtoZWlnaHQ6YXV0bztib3gtc2hhZG93OjAgMnB4IDVweCByZ2JhKDAsMCwwLC4yNSk7Ym94LXNpemluZzpib3JkZXItYm94fS5hdXRvY29tcGxldGUtY29udGFpbmVyIC5zdWdnZXN0aW9ucy1jb250YWluZXIgdWx7cGFkZGluZzowO21hcmdpbjowO21heC1oZWlnaHQ6MjQwcHg7b3ZlcmZsb3cteTphdXRvfS5hdXRvY29tcGxldGUtY29udGFpbmVyIC5zdWdnZXN0aW9ucy1jb250YWluZXIgdWwgbGl7cG9zaXRpb246cmVsYXRpdmU7bGlzdC1zdHlsZTpub25lO3BhZGRpbmc6MDttYXJnaW46MDtjdXJzb3I6cG9pbnRlcn0uYXV0b2NvbXBsZXRlLWNvbnRhaW5lciAuc3VnZ2VzdGlvbnMtY29udGFpbmVyIHVsIGxpIGF7cGFkZGluZzoxNHB4IDE1cHg7ZGlzcGxheTpibG9jazt0ZXh0LWRlY29yYXRpb246bm9uZTtjdXJzb3I6cG9pbnRlcjtjb2xvcjpyZ2JhKDAsMCwwLC44Nyk7Zm9udC1zaXplOjE1cHh9LmF1dG9jb21wbGV0ZS1jb250YWluZXIgLnN1Z2dlc3Rpb25zLWNvbnRhaW5lciAuY29tcGxldGUtc2VsZWN0ZWQsLmF1dG9jb21wbGV0ZS1jb250YWluZXIgLnN1Z2dlc3Rpb25zLWNvbnRhaW5lciB1bCBsaTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMTU4LDE1OCwxNTgsLjE4KX0uYXV0b2NvbXBsZXRlLWNvbnRhaW5lciAuc3VnZ2VzdGlvbnMtY29udGFpbmVyIC5oaXN0b3J5LWhlYWRpbmd7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzoxMHB4IDE1cHg7Ym9yZGVyOjFweCBzb2xpZCAjZjFmMWYxfS5hdXRvY29tcGxldGUtY29udGFpbmVyIC5zdWdnZXN0aW9ucy1jb250YWluZXIgLmhpc3RvcnktaGVhZGluZyAudGV4dHtmb250LXNpemU6Ljg1ZW19LmF1dG9jb21wbGV0ZS1jb250YWluZXIgLnN1Z2dlc3Rpb25zLWNvbnRhaW5lciAueHtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDoxMHB4O21hcmdpbjphdXRvO2N1cnNvcjpwb2ludGVyO3RvcDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKX0uYXV0b2NvbXBsZXRlLWNvbnRhaW5lciAuc3VnZ2VzdGlvbnMtY29udGFpbmVyIC54IGl7Y29sb3I6cmdiYSgwLDAsMCwuNTQpO2ZvbnQtc2l6ZToxOHB4O3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uYXV0b2NvbXBsZXRlLWNvbnRhaW5lciAuc3VnZ2VzdGlvbnMtY29udGFpbmVyLmlzLWhpZGRlbnt2aXNpYmlsaXR5OmhpZGRlbn0uYXV0b2NvbXBsZXRlLWNvbnRhaW5lciAuc3VnZ2VzdGlvbnMtY29udGFpbmVyLmlzLXZpc2libGV7dmlzaWJpbGl0eTp2aXNpYmxlfS5hdXRvY29tcGxldGUtY29udGFpbmVyIC5ub3QtZm91bmR7cGFkZGluZzowIC43NWVtO2JvcmRlcjoxcHggc29saWQgI2YxZjFmMTtiYWNrZ3JvdW5kOiNmZmZ9LmF1dG9jb21wbGV0ZS1jb250YWluZXIgLm5vdC1mb3VuZCBkaXZ7cGFkZGluZzouNGVtIDA7Zm9udC1zaXplOi45NWVtO2xpbmUtaGVpZ2h0OjEuNDtib3JkZXItYm90dG9tOjFweCBzb2xpZCByZ2JhKDIzMCwyMzAsMjMwLC43KX0uaGlnaGxpZ2h0e2ZvbnQtd2VpZ2h0OjcwMH0uc2stZmFkaW5nLWNpcmNsZXt3aWR0aDoyMHB4O2hlaWdodDoyMHB4O3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjEwcHg7dG9wOjA7Ym90dG9tOjA7bWFyZ2luOmF1dG99LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZXt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MH0uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlOmJlZm9yZXtjb250ZW50OicnO2Rpc3BsYXk6YmxvY2s7bWFyZ2luOjAgYXV0bzt3aWR0aDoxNSU7aGVpZ2h0OjE1JTtiYWNrZ3JvdW5kLWNvbG9yOiMzMzM7Ym9yZGVyLXJhZGl1czoxMDAlOy13ZWJraXQtYW5pbWF0aW9uOjEuMnMgZWFzZS1pbi1vdXQgaW5maW5pdGUgYm90aCBzay1jaXJjbGVGYWRlRGVsYXk7YW5pbWF0aW9uOjEuMnMgZWFzZS1pbi1vdXQgaW5maW5pdGUgYm90aCBzay1jaXJjbGVGYWRlRGVsYXl9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTJ7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDMwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDMwZGVnKX0uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlM3std2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoNjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoNjBkZWcpfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGU0ey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSg5MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSg5MGRlZyl9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDEyMGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgxMjBkZWcpfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGU2ey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgxNTBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMTUwZGVnKX0uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlN3std2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMTgwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDE4MGRlZyl9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTh7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDIxMGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgyMTBkZWcpfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGU5ey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgyNDBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMjQwZGVnKX0uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlMTB7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDI3MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgyNzBkZWcpfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGUxMXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzAwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDMwMGRlZyl9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTEyey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzMzBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMzMwZGVnKX0uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlMjpiZWZvcmV7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LTEuMXM7YW5pbWF0aW9uLWRlbGF5Oi0xLjFzfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGUzOmJlZm9yZXstd2Via2l0LWFuaW1hdGlvbi1kZWxheTotMXM7YW5pbWF0aW9uLWRlbGF5Oi0xc30uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlNDpiZWZvcmV7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LS45czthbmltYXRpb24tZGVsYXk6LS45c30uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlNTpiZWZvcmV7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LS44czthbmltYXRpb24tZGVsYXk6LS44c30uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlNjpiZWZvcmV7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LS43czthbmltYXRpb24tZGVsYXk6LS43c30uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlNzpiZWZvcmV7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LS42czthbmltYXRpb24tZGVsYXk6LS42c30uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlODpiZWZvcmV7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LS41czthbmltYXRpb24tZGVsYXk6LS41c30uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlOTpiZWZvcmV7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LS40czthbmltYXRpb24tZGVsYXk6LS40c30uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlMTA6YmVmb3Jley13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0uM3M7YW5pbWF0aW9uLWRlbGF5Oi0uM3N9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTExOmJlZm9yZXstd2Via2l0LWFuaW1hdGlvbi1kZWxheTotLjJzO2FuaW1hdGlvbi1kZWxheTotLjJzfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGUxMjpiZWZvcmV7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LS4xczthbmltYXRpb24tZGVsYXk6LS4xc31ALXdlYmtpdC1rZXlmcmFtZXMgc2stY2lyY2xlRmFkZURlbGF5ezAlLDEwMCUsMzkle29wYWNpdHk6MH00MCV7b3BhY2l0eToxfX1Aa2V5ZnJhbWVzIHNrLWNpcmNsZUZhZGVEZWxheXswJSwxMDAlLDM5JXtvcGFjaXR5OjB9NDAle29wYWNpdHk6MX19YF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQXV0b2NvbXBsZXRlQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgJyhkb2N1bWVudDpjbGljayknOiAnaGFuZGxlQ2xpY2soJGV2ZW50KScsXG4gICAgJ2NsYXNzJzogJ25nLWF1dG9jb21wbGV0ZSdcbiAgfSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBBdXRvY29tcGxldGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBAVmlld0NoaWxkKCdzZWFyY2hJbnB1dCcpIHNlYXJjaElucHV0OiBFbGVtZW50UmVmOyAvLyBpbnB1dCBlbGVtZW50XG4gIEBWaWV3Q2hpbGQoJ2ZpbHRlcmVkTGlzdEVsZW1lbnQnKSBmaWx0ZXJlZExpc3RFbGVtZW50OiBFbGVtZW50UmVmOyAvLyBlbGVtZW50IG9mIGl0ZW1zXG4gIEBWaWV3Q2hpbGQoJ2hpc3RvcnlMaXN0RWxlbWVudCcpIGhpc3RvcnlMaXN0RWxlbWVudDogRWxlbWVudFJlZjsgLy8gZWxlbWVudCBvZiBoaXN0b3J5IGl0ZW1zXG5cbiAgaW5wdXRLZXlVcCQ6IE9ic2VydmFibGU8YW55PjsgLy8gaW5wdXQgZXZlbnRzXG4gIGlucHV0S2V5RG93biQ6IE9ic2VydmFibGU8YW55PjsgLy8gaW5wdXQgZXZlbnRzXG5cbiAgcHVibGljIHF1ZXJ5ID0gJyc7IC8vIHNlYXJjaCBxdWVyeVxuICBwdWJsaWMgZmlsdGVyZWRMaXN0ID0gW107IC8vIGxpc3Qgb2YgaXRlbXNcbiAgcHVibGljIGhpc3RvcnlMaXN0ID0gW107IC8vIGxpc3Qgb2YgaGlzdG9yeSBpdGVtc1xuICBwdWJsaWMgaXNIaXN0b3J5TGlzdFZpc2libGUgPSB0cnVlO1xuICBwdWJsaWMgZWxlbWVudFJlZjtcbiAgcHVibGljIHNlbGVjdGVkSWR4ID0gLTE7XG4gIHB1YmxpYyB0b0hpZ2hsaWdodDogc3RyaW5nID0gJyc7XG4gIHB1YmxpYyBub3RGb3VuZCA9IGZhbHNlO1xuICBwdWJsaWMgaXNGb2N1c2VkID0gZmFsc2U7XG4gIHB1YmxpYyBpc09wZW4gPSBmYWxzZTtcbiAgcHVibGljIGlzU2Nyb2xsVG9FbmQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBtYW51YWxPcGVuID0gdW5kZWZpbmVkO1xuICBwcml2YXRlIG1hbnVhbENsb3NlID0gdW5kZWZpbmVkO1xuXG5cbiAgLy8gaW5wdXRzXG4gIC8qKlxuICAgKiBEYXRhIG9mIGl0ZW1zIGxpc3QuXG4gICAqIEl0IGNhbiBiZSBhcnJheSBvZiBzdHJpbmdzIG9yIGFycmF5IG9mIG9iamVjdHMuXG4gICAqL1xuICBASW5wdXQoKSBwdWJsaWMgZGF0YSA9IFtdO1xuICBASW5wdXQoKSBwdWJsaWMgc2VhcmNoS2V5d29yZDogc3RyaW5nOyAvLyBrZXl3b3JkIHRvIGZpbHRlciB0aGUgbGlzdFxuICBASW5wdXQoKSBwdWJsaWMgcGxhY2VIb2xkZXIgPSAnJzsgLy8gaW5wdXQgcGxhY2Vob2xkZXJcbiAgQElucHV0KCkgcHVibGljIGluaXRpYWxWYWx1ZTogYW55OyAvLyBzZXQgaW5pdGlhbCB2YWx1ZVxuICAvKipcbiAgICogSGlzdG9yeSBpZGVudGlmaWVyIG9mIGhpc3RvcnkgbGlzdFxuICAgKiBXaGVuIHZhbGlkIGhpc3RvcnkgaWRlbnRpZmllciBpcyBnaXZlbiwgdGhlbiBjb21wb25lbnQgc3RvcmVzIHNlbGVjdGVkIGl0ZW0gdG8gbG9jYWwgc3RvcmFnZSBvZiB1c2VyJ3MgYnJvd3Nlci5cbiAgICogSWYgaXQgaXMgbnVsbCB0aGVuIGhpc3RvcnkgaXMgaGlkZGVuLlxuICAgKiBIaXN0b3J5IGxpc3QgaXMgdmlzaWJsZSBpZiBhdCBsZWFzdCBvbmUgaGlzdG9yeSBpdGVtIGlzIHN0b3JlZC5cbiAgICovXG4gIEBJbnB1dCgpIHB1YmxpYyBoaXN0b3J5SWRlbnRpZmllcjogU3RyaW5nO1xuICAvKipcbiAgICogSGVhZGluZyB0ZXh0IG9mIGhpc3RvcnkgbGlzdC5cbiAgICogSWYgaXQgaXMgbnVsbCB0aGVuIGhpc3RvcnkgaGVhZGluZyBpcyBoaWRkZW4uXG4gICAqL1xuICBASW5wdXQoKSBwdWJsaWMgaGlzdG9yeUhlYWRpbmcgPSAnUmVjZW50bHkgc2VsZWN0ZWQnO1xuICBASW5wdXQoKSBwdWJsaWMgaGlzdG9yeUxpc3RNYXhOdW1iZXIgPSAxNTsgLy8gbWF4aW11bSBudW1iZXIgb2YgaXRlbXMgaW4gdGhlIGhpc3RvcnkgbGlzdC5cbiAgQElucHV0KCkgcHVibGljIG5vdEZvdW5kVGV4dCA9ICdOb3QgZm91bmQnOyAvLyBzZXQgY3VzdG9tIHRleHQgd2hlbiBmaWx0ZXIgcmV0dXJucyBlbXB0eSByZXN1bHRcbiAgQElucHV0KCkgcHVibGljIGlzTG9hZGluZzogQm9vbGVhbjsgLy8gbG9hZGluZyBtYXNrXG4gIEBJbnB1dCgpIHB1YmxpYyBkZWJvdW5jZVRpbWU6IDQwMDsgLy8gZGVsYXkgdGltZSB3aGlsZSB0eXBpbmdcbiAgLyoqXG4gICAqIFRoZSBtaW5pbXVtIG51bWJlciBvZiBjaGFyYWN0ZXJzIHRoZSB1c2VyIG11c3QgdHlwZSBiZWZvcmUgYSBzZWFyY2ggaXMgcGVyZm9ybWVkLlxuICAgKi9cbiAgQElucHV0KCkgcHVibGljIG1pblF1ZXJ5TGVuZ3RoID0gMTtcblxuXG4gIC8vIG91dHB1dCBldmVudHNcbiAgLyoqIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuZXZlciBhbiBpdGVtIGZyb20gdGhlIGxpc3QgaXMgc2VsZWN0ZWQuICovXG4gIEBPdXRwdXQoKSBzZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qKiBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbmV2ZXIgYW4gaW5wdXQgaXMgY2hhbmdlZC4gKi9cbiAgQE91dHB1dCgpIGlucHV0Q2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qKiBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbmV2ZXIgYW4gaW5wdXQgaXMgZm9jdXNlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGlucHV0Rm9jdXNlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKiBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbmV2ZXIgYW4gaW5wdXQgaXMgY2xlYXJlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGlucHV0Q2xlYXJlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKiBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbiB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsIGlzIG9wZW5lZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9wZW5lZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKiBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbiB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsIGlzIGNsb3NlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNsb3NlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKiBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbiBzY3JvbGxlZCB0byB0aGUgZW5kIG9mIGl0ZW1zLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgc2Nyb2xsZWRUb0VuZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG5cbiAgLy8gY3VzdG9tIHRlbXBsYXRlc1xuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKVxuICBASW5wdXQoKSBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBJbnB1dCgpIG5vdEZvdW5kVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIFByb3BhZ2F0ZXMgbmV3IHZhbHVlIHdoZW4gbW9kZWwgY2hhbmdlc1xuICAgKi9cbiAgcHJvcGFnYXRlQ2hhbmdlOiBhbnkgPSAoKSA9PiB7XG4gIH07XG5cblxuICAvKipcbiAgICogV3JpdGVzIGEgbmV3IHZhbHVlIGZyb20gdGhlIGZvcm0gbW9kZWwgaW50byB0aGUgdmlldyxcbiAgICogVXBkYXRlcyBtb2RlbFxuICAgKi9cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnF1ZXJ5ID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGhhbmRsZXIgdGhhdCBpcyBjYWxsZWQgd2hlbiBzb21ldGhpbmcgaW4gdGhlIHZpZXcgaGFzIGNoYW5nZWRcbiAgICovXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm4pIHtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGhhbmRsZXIgc3BlY2lmaWNhbGx5IGZvciB3aGVuIGEgY29udHJvbCByZWNlaXZlcyBhIHRvdWNoIGV2ZW50XG4gICAqL1xuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIHZhbHVlIG9mIGFuIGlucHV0IGVsZW1lbnQgaXMgY2hhbmdlZFxuICAgKi9cbiAgb25DaGFuZ2UoZXZlbnQpIHtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShldmVudC50YXJnZXQudmFsdWUpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgdGhpcy5lbGVtZW50UmVmID0gZWxlbWVudFJlZjtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaGFuZGxlU2Nyb2xsKCk7XG4gICAgdGhpcy5pbml0RXZlbnRTdHJlYW0oKTtcbiAgICB0aGlzLnNldEluaXRpYWxWYWx1ZSh0aGlzLmluaXRpYWxWYWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGluaXRpYWwgdmFsdWVcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBwdWJsaWMgc2V0SW5pdGlhbFZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5pbml0aWFsVmFsdWUpIHtcbiAgICAgIHRoaXMuc2VsZWN0KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHNlYXJjaCByZXN1bHRzXG4gICAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgY2hhbmdlcyAmJlxuICAgICAgY2hhbmdlcy5kYXRhICYmXG4gICAgICBBcnJheS5pc0FycmF5KGNoYW5nZXMuZGF0YS5jdXJyZW50VmFsdWUpXG4gICAgKSB7XG4gICAgICB0aGlzLmhhbmRsZUl0ZW1zQ2hhbmdlKCk7XG4gICAgICBpZiAoIWNoYW5nZXMuZGF0YS5maXJzdENoYW5nZSAmJiB0aGlzLmlzRm9jdXNlZCkge1xuICAgICAgICB0aGlzLmhhbmRsZU9wZW4oKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSXRlbXMgY2hhbmdlXG4gICAqL1xuICBwdWJsaWMgaGFuZGxlSXRlbXNDaGFuZ2UoKSB7XG4gICAgdGhpcy5pc1Njcm9sbFRvRW5kID0gZmFsc2U7XG4gICAgaWYgKCF0aGlzLmlzT3Blbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZmlsdGVyZWRMaXN0ID0gdGhpcy5kYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbHRlciBkYXRhXG4gICAqL1xuICBwdWJsaWMgZmlsdGVyTGlzdCgpIHtcbiAgICB0aGlzLnNlbGVjdGVkSWR4ID0gLTE7XG4gICAgdGhpcy5pbml0U2VhcmNoSGlzdG9yeSgpO1xuICAgIGlmICh0aGlzLnF1ZXJ5ICE9IG51bGwgJiYgdGhpcy5kYXRhKSB7XG4gICAgICB0aGlzLnRvSGlnaGxpZ2h0ID0gdGhpcy5xdWVyeTtcbiAgICAgIHRoaXMuZmlsdGVyZWRMaXN0ID0gdGhpcy5kYXRhLmZpbHRlcigoaXRlbTogYW55KSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAvLyBzdHJpbmcgbG9naWMsIGNoZWNrIGVxdWFsaXR5IG9mIHN0cmluZ3NcbiAgICAgICAgICByZXR1cm4gaXRlbS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5xdWVyeS50b0xvd2VyQ2FzZSgpKSA+IC0xO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtID09PSAnb2JqZWN0JyAmJiBpdGVtLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcbiAgICAgICAgICAvLyBvYmplY3QgbG9naWMsIGNoZWNrIHByb3BlcnR5IGVxdWFsaXR5XG4gICAgICAgICAgcmV0dXJuIGl0ZW1bdGhpcy5zZWFyY2hLZXl3b3JkXS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5xdWVyeS50b0xvd2VyQ2FzZSgpKSA+IC0xO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ub3RGb3VuZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIENoZWNrIHR5cGUgb2YgaXRlbSBpbiB0aGUgbGlzdC5cbiAgICogQHBhcmFtIGl0ZW1cbiAgICovXG4gIGlzVHlwZShpdGVtKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgaXRlbSBpbiB0aGUgbGlzdC5cbiAgICogQHBhcmFtIGl0ZW1cbiAgICovXG4gIHB1YmxpYyBzZWxlY3QoaXRlbSkge1xuICAgIHRoaXMucXVlcnkgPSAhdGhpcy5pc1R5cGUoaXRlbSkgPyBpdGVtW3RoaXMuc2VhcmNoS2V5d29yZF0gOiBpdGVtO1xuICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICB0aGlzLnNlbGVjdGVkLmVtaXQoaXRlbSk7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UoaXRlbSk7XG5cbiAgICBpZiAodGhpcy5pbml0aWFsVmFsdWUpIHtcbiAgICAgIC8vIGNoZWNrIGlmIGhpc3RvcnkgYWxyZWFkeSBleGlzdHMgaW4gbG9jYWxTdG9yYWdlIGFuZCB0aGVuIHVwZGF0ZVxuICAgICAgY29uc3QgaGlzdG9yeSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHt0aGlzLmhpc3RvcnlJZGVudGlmaWVyfWApO1xuICAgICAgaWYgKGhpc3RvcnkpIHtcbiAgICAgICAgbGV0IGV4aXN0aW5nSGlzdG9yeSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW2Ake3RoaXMuaGlzdG9yeUlkZW50aWZpZXJ9YF0pO1xuICAgICAgICBpZiAoIShleGlzdGluZ0hpc3RvcnkgaW5zdGFuY2VvZiBBcnJheSkpIGV4aXN0aW5nSGlzdG9yeSA9IFtdO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHNlbGVjdGVkIGl0ZW0gZXhpc3RzIGluIGV4aXN0aW5nSGlzdG9yeVxuICAgICAgICBpZiAoIWV4aXN0aW5nSGlzdG9yeS5zb21lKChleGlzdGluZ0l0ZW0pID0+ICF0aGlzLmlzVHlwZShleGlzdGluZ0l0ZW0pXG4gICAgICAgICAgPyBleGlzdGluZ0l0ZW1bdGhpcy5zZWFyY2hLZXl3b3JkXSA9PSBpdGVtW3RoaXMuc2VhcmNoS2V5d29yZF0gOiBleGlzdGluZ0l0ZW0gPT0gaXRlbSkpIHtcbiAgICAgICAgICBleGlzdGluZ0hpc3RvcnkudW5zaGlmdChpdGVtKTtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgJHt0aGlzLmhpc3RvcnlJZGVudGlmaWVyfWAsIEpTT04uc3RyaW5naWZ5KGV4aXN0aW5nSGlzdG9yeSkpO1xuXG4gICAgICAgICAgLy8gY2hlY2sgaWYgaXRlbXMgZG9uJ3QgZXhjZWVkIG1heCBhbGxvd2VkIG51bWJlclxuICAgICAgICAgIGlmIChleGlzdGluZ0hpc3RvcnkubGVuZ3RoID49IHRoaXMuaGlzdG9yeUxpc3RNYXhOdW1iZXIpIHtcbiAgICAgICAgICAgIGV4aXN0aW5nSGlzdG9yeS5zcGxpY2UoZXhpc3RpbmdIaXN0b3J5Lmxlbmd0aCAtIDEsIDEpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYCR7dGhpcy5oaXN0b3J5SWRlbnRpZmllcn1gLCBKU09OLnN0cmluZ2lmeShleGlzdGluZ0hpc3RvcnkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaWYgc2VsZWN0ZWQgaXRlbSBleGlzdHMgaW4gZXhpc3RpbmdIaXN0b3J5IHN3YXAgdG8gdG9wIGluIGFycmF5XG4gICAgICAgICAgaWYgKCF0aGlzLmlzVHlwZShpdGVtKSkge1xuICAgICAgICAgICAgLy8gb2JqZWN0IGxvZ2ljXG4gICAgICAgICAgICBjb25zdCBjb3BpZWRFeGlzdGluZ0hpc3RvcnkgPSBleGlzdGluZ0hpc3Rvcnkuc2xpY2UoKTsgLy8gY29weSBvcmlnaW5hbCBleGlzdGluZ0hpc3RvcnkgYXJyYXlcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSW5kZXggPSBjb3BpZWRFeGlzdGluZ0hpc3RvcnkubWFwKChlbCkgPT4gZWxbdGhpcy5zZWFyY2hLZXl3b3JkXSkuaW5kZXhPZihpdGVtW3RoaXMuc2VhcmNoS2V5d29yZF0pO1xuICAgICAgICAgICAgY29waWVkRXhpc3RpbmdIaXN0b3J5LnNwbGljZShzZWxlY3RlZEluZGV4LCAxKTtcbiAgICAgICAgICAgIGNvcGllZEV4aXN0aW5nSGlzdG9yeS5zcGxpY2UoMCwgMCwgaXRlbSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgJHt0aGlzLmhpc3RvcnlJZGVudGlmaWVyfWAsIEpTT04uc3RyaW5naWZ5KGNvcGllZEV4aXN0aW5nSGlzdG9yeSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBzdHJpbmcgbG9naWNcbiAgICAgICAgICAgIGNvbnN0IGNvcGllZEV4aXN0aW5nSGlzdG9yeSA9IGV4aXN0aW5nSGlzdG9yeS5zbGljZSgpOyAvLyBjb3B5IG9yaWdpbmFsIGV4aXN0aW5nSGlzdG9yeSBhcnJheVxuICAgICAgICAgICAgY29waWVkRXhpc3RpbmdIaXN0b3J5LnNwbGljZShjb3BpZWRFeGlzdGluZ0hpc3RvcnkuaW5kZXhPZihpdGVtKSwgMSk7XG4gICAgICAgICAgICBjb3BpZWRFeGlzdGluZ0hpc3Rvcnkuc3BsaWNlKDAsIDAsIGl0ZW0pO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYCR7dGhpcy5oaXN0b3J5SWRlbnRpZmllcn1gLCBKU09OLnN0cmluZ2lmeShjb3BpZWRFeGlzdGluZ0hpc3RvcnkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2F2ZUhpc3RvcnkoaXRlbSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2F2ZUhpc3RvcnkoaXRlbSk7XG4gICAgfVxuICAgIHRoaXMuaGFuZGxlQ2xvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEb2N1bWVudCBjbGlja1xuICAgKiBAcGFyYW0gZSBldmVudFxuICAgKi9cbiAgcHVibGljIGhhbmRsZUNsaWNrKGUpIHtcbiAgICBsZXQgY2xpY2tlZENvbXBvbmVudCA9IGUudGFyZ2V0O1xuICAgIGxldCBpbnNpZGUgPSBmYWxzZTtcbiAgICBkbyB7XG4gICAgICBpZiAoY2xpY2tlZENvbXBvbmVudCA9PT0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgaW5zaWRlID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyZWRMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuaGFuZGxlT3BlbigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjbGlja2VkQ29tcG9uZW50ID0gY2xpY2tlZENvbXBvbmVudC5wYXJlbnROb2RlO1xuICAgIH0gd2hpbGUgKGNsaWNrZWRDb21wb25lbnQpO1xuICAgIGlmICghaW5zaWRlKSB7XG4gICAgICB0aGlzLmhhbmRsZUNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbCBpdGVtc1xuICAgKi9cbiAgcHVibGljIGhhbmRsZVNjcm9sbCgpIHtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmZpbHRlcmVkTGlzdEVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgIHRoaXMuc2Nyb2xsVG9FbmQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmUgcGFuZWwgc3RhdGVcbiAgICovXG4gIHNldFBhbmVsU3RhdGUoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgICAvLyBJZiBjb250cm9scyBhcmUgdW50b3VjaGVkXG4gICAgaWYgKHR5cGVvZiB0aGlzLm1hbnVhbE9wZW4gPT09ICd1bmRlZmluZWQnXG4gICAgICAmJiB0eXBlb2YgdGhpcy5tYW51YWxDbG9zZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICB0aGlzLmhhbmRsZU9wZW4oKTtcbiAgICB9XG5cbiAgICAvLyBJZiBvbmUgb2YgdGhlIGNvbnRyb2xzIGlzIHVudG91Y2hlZCBhbmQgb3RoZXIgaXMgZGVhY3RpdmF0ZWRcbiAgICBpZiAodHlwZW9mIHRoaXMubWFudWFsT3BlbiA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgICYmIHRoaXMubWFudWFsQ2xvc2UgPT09IGZhbHNlXG4gICAgICB8fCB0eXBlb2YgdGhpcy5tYW51YWxDbG9zZSA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgICYmIHRoaXMubWFudWFsT3BlbiA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICB0aGlzLmhhbmRsZU9wZW4oKTtcbiAgICB9XG5cbiAgICAvLyBpZiBjb250cm9scyBhcmUgdG91Y2hlZCBidXQgYm90aCBhcmUgZGVhY3RpdmF0ZWRcbiAgICBpZiAodGhpcy5tYW51YWxPcGVuID09PSBmYWxzZSAmJiB0aGlzLm1hbnVhbENsb3NlID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgIHRoaXMuaGFuZGxlT3BlbigpO1xuICAgIH1cblxuICAgIC8vIGlmIG9wZW4gY29udHJvbCBpcyB0b3VjaGVkIGFuZCBhY3RpdmF0ZWRcbiAgICBpZiAodGhpcy5tYW51YWxPcGVuKSB7XG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgdGhpcy5oYW5kbGVPcGVuKCk7XG4gICAgICB0aGlzLm1hbnVhbE9wZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBpZiBjbG9zZSBjb250cm9sIGlzIHRvdWNoZWQgYW5kIGFjdGl2YXRlZFxuICAgIGlmICh0aGlzLm1hbnVhbENsb3NlKSB7XG4gICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICB0aGlzLmhhbmRsZUNsb3NlKCk7XG4gICAgICB0aGlzLm1hbnVhbENsb3NlID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1hbnVhbCBjb250cm9sc1xuICAgKi9cbiAgb3BlbigpIHtcbiAgICB0aGlzLm1hbnVhbE9wZW4gPSB0cnVlO1xuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5oYW5kbGVPcGVuKCk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLm1hbnVhbENsb3NlID0gdHJ1ZTtcbiAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgdGhpcy5oYW5kbGVDbG9zZSgpO1xuICB9XG5cbiAgZm9jdXMoKSB7XG4gICAgdGhpcy5oYW5kbGVGb2N1cyhldmVudCk7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLnJlbW92ZShldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIHNlYXJjaCBxdWVyeVxuICAgKi9cbiAgcHVibGljIHJlbW92ZShlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnF1ZXJ5ID0gJyc7XG4gICAgdGhpcy5pbnB1dENsZWFyZWQuZW1pdCgpO1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMucXVlcnkpO1xuICAgIHRoaXMuc2V0UGFuZWxTdGF0ZShlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIGhpc3RvcnlMaXN0IHNlYXJjaFxuICAgKi9cbiAgaW5pdFNlYXJjaEhpc3RvcnkoKSB7XG4gICAgdGhpcy5pc0hpc3RvcnlMaXN0VmlzaWJsZSA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmhpc3RvcnlJZGVudGlmaWVyICYmICF0aGlzLnF1ZXJ5KSB7XG4gICAgICBjb25zdCBoaXN0b3J5ID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke3RoaXMuaGlzdG9yeUlkZW50aWZpZXJ9YCk7XG4gICAgICBpZiAoaGlzdG9yeSkge1xuICAgICAgICB0aGlzLmlzSGlzdG9yeUxpc3RWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5maWx0ZXJlZExpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5oaXN0b3J5TGlzdCA9IGhpc3RvcnkgPyBKU09OLnBhcnNlKGhpc3RvcnkpIDogW107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmlzSGlzdG9yeUxpc3RWaXNpYmxlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNIaXN0b3J5TGlzdFZpc2libGUgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVPcGVuKCkge1xuICAgIGlmICh0aGlzLmlzT3BlbiB8fCB0aGlzLmlzT3BlbiAmJiAhdGhpcy5pc0xvYWRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gSWYgZGF0YSBleGlzdHNcbiAgICBpZiAodGhpcy5kYXRhICYmIHRoaXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgIHRoaXMuZmlsdGVyTGlzdCgpO1xuICAgICAgdGhpcy5vcGVuZWQuZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNsb3NlKCkge1xuICAgIGlmICghdGhpcy5pc09wZW4pIHtcbiAgICAgIHRoaXMuaXNGb2N1c2VkID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5maWx0ZXJlZExpc3QgPSBbXTtcbiAgICB0aGlzLnNlbGVjdGVkSWR4ID0gLTE7XG4gICAgdGhpcy5ub3RGb3VuZCA9IGZhbHNlO1xuICAgIHRoaXMuaXNIaXN0b3J5TGlzdFZpc2libGUgPSBmYWxzZTtcbiAgICB0aGlzLmlzRm9jdXNlZCA9IGZhbHNlO1xuICAgIHRoaXMuY2xvc2VkLmVtaXQoKTtcbiAgfVxuXG4gIGhhbmRsZUZvY3VzKGUpIHtcbiAgICAvL3RoaXMuc2VhcmNoSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIGlmICh0aGlzLmlzRm9jdXNlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmlucHV0Rm9jdXNlZC5lbWl0KGUpO1xuICAgIC8vIGlmIGRhdGEgZXhpc3RzIHRoZW4gb3BlblxuICAgIGlmICh0aGlzLmRhdGEgJiYgdGhpcy5kYXRhLmxlbmd0aCkge1xuICAgICAgdGhpcy5zZXRQYW5lbFN0YXRlKGV2ZW50KTtcbiAgICB9XG4gICAgdGhpcy5pc0ZvY3VzZWQgPSB0cnVlO1xuICB9XG5cbiAgc2Nyb2xsVG9FbmQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNTY3JvbGxUb0VuZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHRoaXMuZmlsdGVyZWRMaXN0RWxlbWVudC5uYXRpdmVFbGVtZW50XG4gICAgICAuc2Nyb2xsVG9wO1xuICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IHRoaXMuZmlsdGVyZWRMaXN0RWxlbWVudC5uYXRpdmVFbGVtZW50XG4gICAgICAuc2Nyb2xsSGVpZ2h0O1xuICAgIGNvbnN0IGVsZW1lbnRIZWlnaHQgPSB0aGlzLmZpbHRlcmVkTGlzdEVsZW1lbnQubmF0aXZlRWxlbWVudFxuICAgICAgLmNsaWVudEhlaWdodDtcbiAgICBjb25zdCBhdEJvdHRvbSA9IHNjcm9sbEhlaWdodCA9PT0gc2Nyb2xsVG9wICsgZWxlbWVudEhlaWdodDtcbiAgICBpZiAoYXRCb3R0b20pIHtcbiAgICAgIHRoaXMuc2Nyb2xsZWRUb0VuZC5lbWl0KCk7XG4gICAgICB0aGlzLmlzU2Nyb2xsVG9FbmQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIGtleWJvYXJkIGV2ZW50c1xuICAgKi9cbiAgaW5pdEV2ZW50U3RyZWFtKCkge1xuICAgIHRoaXMuaW5wdXRLZXlVcCQgPSBmcm9tRXZlbnQoXG4gICAgICB0aGlzLnNlYXJjaElucHV0Lm5hdGl2ZUVsZW1lbnQsICdrZXl1cCdcbiAgICApLnBpcGUobWFwKFxuICAgICAgKGU6IGFueSkgPT4gZVxuICAgICkpO1xuXG4gICAgdGhpcy5pbnB1dEtleURvd24kID0gZnJvbUV2ZW50KFxuICAgICAgdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LFxuICAgICAgJ2tleWRvd24nXG4gICAgKS5waXBlKG1hcChcbiAgICAgIChlOiBhbnkpID0+IGVcbiAgICApKTtcblxuICAgIHRoaXMubGlzdGVuRXZlbnRTdHJlYW0oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW4ga2V5Ym9hcmQgZXZlbnRzXG4gICAqL1xuICBsaXN0ZW5FdmVudFN0cmVhbSgpIHtcbiAgICAvLyBrZXkgdXAgZXZlbnRcbiAgICB0aGlzLmlucHV0S2V5VXAkXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKGUgPT5cbiAgICAgICAgICAhaXNBcnJvd1VwRG93bihlLmtleUNvZGUpICYmXG4gICAgICAgICAgIWlzRW50ZXIoZS5rZXlDb2RlKSAmJlxuICAgICAgICAgICFpc0VTQyhlLmtleUNvZGUpICYmXG4gICAgICAgICAgIWlzVGFiKGUua2V5Q29kZSkpLFxuICAgICAgICBkZWJvdW5jZVRpbWUodGhpcy5kZWJvdW5jZVRpbWUpXG4gICAgICApLnN1YnNjcmliZShlID0+IHtcbiAgICAgIHRoaXMub25LZXlVcChlKTtcbiAgICB9KTtcblxuICAgIC8vIGN1cnNvciB1cCAmIGRvd25cbiAgICB0aGlzLmlucHV0S2V5RG93biQucGlwZShmaWx0ZXIoXG4gICAgICBlID0+IGlzQXJyb3dVcERvd24oZS5rZXlDb2RlKVxuICAgICkpLnN1YnNjcmliZShlID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMub25Gb2N1c0l0ZW0oZSk7XG4gICAgfSk7XG5cbiAgICAvLyBlbnRlciBrZXl1cFxuICAgIHRoaXMuaW5wdXRLZXlVcCQucGlwZShmaWx0ZXIoZSA9PiBpc0VudGVyKGUua2V5Q29kZSkpKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICAvL3RoaXMub25IYW5kbGVFbnRlcigpO1xuICAgIH0pO1xuXG4gICAgLy8gZW50ZXIga2V5ZG93blxuICAgIHRoaXMuaW5wdXRLZXlEb3duJC5waXBlKGZpbHRlcihlID0+IGlzRW50ZXIoZS5rZXlDb2RlKSkpLnN1YnNjcmliZShlID0+IHtcbiAgICAgIHRoaXMub25IYW5kbGVFbnRlcigpO1xuICAgIH0pO1xuXG4gICAgLy8gRVNDXG4gICAgdGhpcy5pbnB1dEtleVVwJC5waXBlKFxuICAgICAgZmlsdGVyKGUgPT4gaXNFU0MoZS5rZXlDb2RlKSxcbiAgICAgICAgZGVib3VuY2VUaW1lKDEwMCkpXG4gICAgKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICB0aGlzLm9uRXNjKCk7XG4gICAgfSk7XG5cbiAgICAvLyBkZWxldGVcbiAgICB0aGlzLmlucHV0S2V5RG93biQucGlwZShcbiAgICAgIGZpbHRlcihlID0+IGlzQmFja3NwYWNlKGUua2V5Q29kZSkgfHwgaXNEZWxldGUoZS5rZXlDb2RlKSlcbiAgICApLnN1YnNjcmliZShlID0+IHtcbiAgICAgIHRoaXMub25EZWxldGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBvbiBrZXl1cCA9PSB3aGVuIGlucHV0IGNoYW5nZWRcbiAgICogQHBhcmFtIGUgZXZlbnRcbiAgICovXG4gIG9uS2V5VXAoZSkge1xuICAgIHRoaXMubm90Rm91bmQgPSBmYWxzZTsgLy8gc2VhcmNoIHJlc3VsdHMgYXJlIHVua25vd24gd2hpbGUgdHlwaW5nXG4gICAgLy8gaWYgaW5wdXQgaXMgZW1wdHlcbiAgICBpZiAoIXRoaXMucXVlcnkpIHtcbiAgICAgIHRoaXMubm90Rm91bmQgPSBmYWxzZTtcbiAgICAgIHRoaXMuaW5wdXRDaGFuZ2VkLmVtaXQoZS50YXJnZXQudmFsdWUpO1xuICAgICAgdGhpcy5pbnB1dENsZWFyZWQuZW1pdCgpO1xuICAgICAgLy90aGlzLmZpbHRlckxpc3QoKTtcbiAgICAgIHRoaXMuc2V0UGFuZWxTdGF0ZShlKTtcbiAgICB9XG4gICAgLy8gaWYgcXVlcnkgPj0gdG8gbWluUXVlcnlMZW5ndGhcbiAgICBpZiAodGhpcy5xdWVyeS5sZW5ndGggPj0gdGhpcy5taW5RdWVyeUxlbmd0aCkge1xuICAgICAgdGhpcy5pbnB1dENoYW5nZWQuZW1pdChlLnRhcmdldC52YWx1ZSk7XG4gICAgICB0aGlzLmZpbHRlckxpc3QoKTtcblxuICAgICAgLy8gSWYgbm8gcmVzdWx0cyBmb3VuZFxuICAgICAgaWYgKCF0aGlzLmZpbHRlcmVkTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5ub3RGb3VuZFRleHQgPyB0aGlzLm5vdEZvdW5kID0gdHJ1ZSA6IHRoaXMubm90Rm91bmQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBLZXlib2FyZCBhcnJvdyB0b3AgYW5kIGFycm93IGJvdHRvbVxuICAgKiBAcGFyYW0gZSBldmVudFxuICAgKi9cbiAgb25Gb2N1c0l0ZW0oZSkge1xuICAgIC8vIG1vdmUgYXJyb3cgdXAgYW5kIGRvd24gb24gZmlsdGVyZWRMaXN0IG9yIGhpc3RvcnlMaXN0XG4gICAgaWYgKCF0aGlzLmhpc3RvcnlMaXN0Lmxlbmd0aCB8fCAhdGhpcy5pc0hpc3RvcnlMaXN0VmlzaWJsZSkge1xuICAgICAgLy8gZmlsdGVyZWRMaXN0XG4gICAgICBjb25zdCB0b3RhbE51bUl0ZW0gPSB0aGlzLmZpbHRlcmVkTGlzdC5sZW5ndGg7XG4gICAgICBpZiAoZS5jb2RlID09PSAnQXJyb3dEb3duJykge1xuICAgICAgICBsZXQgc3VtID0gdGhpcy5zZWxlY3RlZElkeDtcbiAgICAgICAgc3VtID0gKHRoaXMuc2VsZWN0ZWRJZHggPT09IG51bGwpID8gMCA6IHN1bSArIDE7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJZHggPSAodG90YWxOdW1JdGVtICsgc3VtKSAlIHRvdGFsTnVtSXRlbTtcbiAgICAgICAgdGhpcy5zY3JvbGxUb0ZvY3VzZWRJdGVtKHRoaXMuc2VsZWN0ZWRJZHgpO1xuICAgICAgfSBlbHNlIGlmIChlLmNvZGUgPT09ICdBcnJvd1VwJykge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZElkeCA9PSAtMSkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJZHggPSAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJZHggPSAodG90YWxOdW1JdGVtICsgdGhpcy5zZWxlY3RlZElkeCAtIDEpICUgdG90YWxOdW1JdGVtO1xuICAgICAgICB0aGlzLnNjcm9sbFRvRm9jdXNlZEl0ZW0odGhpcy5zZWxlY3RlZElkeCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhpc3RvcnlMaXN0XG4gICAgICBjb25zdCB0b3RhbE51bUl0ZW0gPSB0aGlzLmhpc3RvcnlMaXN0Lmxlbmd0aDtcbiAgICAgIGlmIChlLmNvZGUgPT09ICdBcnJvd0Rvd24nKSB7XG4gICAgICAgIGxldCBzdW0gPSB0aGlzLnNlbGVjdGVkSWR4O1xuICAgICAgICBzdW0gPSAodGhpcy5zZWxlY3RlZElkeCA9PT0gbnVsbCkgPyAwIDogc3VtICsgMTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZElkeCA9ICh0b3RhbE51bUl0ZW0gKyBzdW0pICUgdG90YWxOdW1JdGVtO1xuICAgICAgICB0aGlzLnNjcm9sbFRvRm9jdXNlZEl0ZW0odGhpcy5zZWxlY3RlZElkeCk7XG4gICAgICB9IGVsc2UgaWYgKGUuY29kZSA9PT0gJ0Fycm93VXAnKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSWR4ID09IC0xKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZElkeCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWxlY3RlZElkeCA9ICh0b3RhbE51bUl0ZW0gKyB0aGlzLnNlbGVjdGVkSWR4IC0gMSkgJSB0b3RhbE51bUl0ZW07XG4gICAgICAgIHRoaXMuc2Nyb2xsVG9Gb2N1c2VkSXRlbSh0aGlzLnNlbGVjdGVkSWR4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2Nyb2xsIHRvIGZvY3VzZWQgaXRlbVxuICAgKiAqIEBwYXJhbSBpbmRleFxuICAgKi9cbiAgc2Nyb2xsVG9Gb2N1c2VkSXRlbShpbmRleCkge1xuICAgIGxldCBsaXN0RWxlbWVudCA9IG51bGw7XG4gICAgLy8gRGVmaW5lIGxpc3QgZWxlbWVudFxuICAgIGlmICghdGhpcy5oaXN0b3J5TGlzdC5sZW5ndGggfHwgIXRoaXMuaXNIaXN0b3J5TGlzdFZpc2libGUpIHtcbiAgICAgIC8vIGZpbHRlcmVkTGlzdCBlbGVtZW50XG4gICAgICBsaXN0RWxlbWVudCA9IHRoaXMuZmlsdGVyZWRMaXN0RWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoaXN0b3J5TGlzdCBlbGVtZW50XG4gICAgICBsaXN0RWxlbWVudCA9IHRoaXMuaGlzdG9yeUxpc3RFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgY29uc3QgaXRlbXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0RWxlbWVudC5jaGlsZE5vZGVzKS5maWx0ZXIoKG5vZGU6IGFueSkgPT4ge1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgLy8gaWYgbm9kZSBpcyBlbGVtZW50XG4gICAgICAgIHJldHVybiBub2RlLmNsYXNzTmFtZS5pbmNsdWRlcygnaXRlbScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCFpdGVtcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBsaXN0SGVpZ2h0ID0gbGlzdEVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IGl0ZW1IZWlnaHQgPSBpdGVtc1tpbmRleF0ub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IHZpc2libGVUb3AgPSBsaXN0RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgY29uc3QgdmlzaWJsZUJvdHRvbSA9IGxpc3RFbGVtZW50LnNjcm9sbFRvcCArIGxpc3RIZWlnaHQgLSBpdGVtSGVpZ2h0O1xuICAgIGNvbnN0IHRhcmdldFBvc2l0aW9uID0gaXRlbXNbaW5kZXhdLm9mZnNldFRvcDtcblxuICAgIGlmICh0YXJnZXRQb3NpdGlvbiA8IHZpc2libGVUb3ApIHtcbiAgICAgIGxpc3RFbGVtZW50LnNjcm9sbFRvcCA9IHRhcmdldFBvc2l0aW9uO1xuICAgIH1cblxuICAgIGlmICh0YXJnZXRQb3NpdGlvbiA+IHZpc2libGVCb3R0b20pIHtcbiAgICAgIGxpc3RFbGVtZW50LnNjcm9sbFRvcCA9IHRhcmdldFBvc2l0aW9uIC0gbGlzdEhlaWdodCArIGl0ZW1IZWlnaHQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCBpdGVtIG9uIGVudGVyIGNsaWNrXG4gICAqL1xuICBvbkhhbmRsZUVudGVyKCkge1xuICAgIC8vIGNsaWNrIGVudGVyIHRvIGNob29zZSBpdGVtIGZyb20gZmlsdGVyZWRMaXN0IG9yIGhpc3RvcnlMaXN0XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRJZHggPiAtMSkge1xuICAgICAgaWYgKCF0aGlzLmhpc3RvcnlMaXN0Lmxlbmd0aCB8fCAhdGhpcy5pc0hpc3RvcnlMaXN0VmlzaWJsZSkge1xuICAgICAgICAvLyBmaWx0ZXJlZExpc3RcbiAgICAgICAgdGhpcy5xdWVyeSA9ICF0aGlzLmlzVHlwZSh0aGlzLmZpbHRlcmVkTGlzdFt0aGlzLnNlbGVjdGVkSWR4XSlcbiAgICAgICAgICA/IHRoaXMuZmlsdGVyZWRMaXN0W3RoaXMuc2VsZWN0ZWRJZHhdW3RoaXMuc2VhcmNoS2V5d29yZF1cbiAgICAgICAgICA6IHRoaXMuZmlsdGVyZWRMaXN0W3RoaXMuc2VsZWN0ZWRJZHhdO1xuXG4gICAgICAgIHRoaXMuc2F2ZUhpc3RvcnkodGhpcy5maWx0ZXJlZExpc3RbdGhpcy5zZWxlY3RlZElkeF0pO1xuICAgICAgICB0aGlzLnNlbGVjdCh0aGlzLmZpbHRlcmVkTGlzdFt0aGlzLnNlbGVjdGVkSWR4XSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBoaXN0b3J5TGlzdFxuICAgICAgICB0aGlzLnF1ZXJ5ID0gIXRoaXMuaXNUeXBlKHRoaXMuaGlzdG9yeUxpc3RbdGhpcy5zZWxlY3RlZElkeF0pXG4gICAgICAgICAgPyB0aGlzLmhpc3RvcnlMaXN0W3RoaXMuc2VsZWN0ZWRJZHhdW3RoaXMuc2VhcmNoS2V5d29yZF1cbiAgICAgICAgICA6IHRoaXMuaGlzdG9yeUxpc3RbdGhpcy5zZWxlY3RlZElkeF07XG4gICAgICAgIHRoaXMuc2F2ZUhpc3RvcnkodGhpcy5oaXN0b3J5TGlzdFt0aGlzLnNlbGVjdGVkSWR4XSk7XG4gICAgICAgIHRoaXMuc2VsZWN0KHRoaXMuaGlzdG9yeUxpc3RbdGhpcy5zZWxlY3RlZElkeF0pO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmlzSGlzdG9yeUxpc3RWaXNpYmxlID0gZmFsc2U7XG4gICAgdGhpcy5oYW5kbGVDbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVzYyBjbGlja1xuICAgKi9cbiAgb25Fc2MoKSB7XG4gICAgdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgICB0aGlzLmhhbmRsZUNsb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGNsaWNrXG4gICAqL1xuICBvbkRlbGV0ZSgpIHtcbiAgICAvLyBwYW5lbCBpcyBvcGVuIG9uIGRlbGV0ZVxuICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFNlbGVjdCBpdGVtIHRvIHNhdmUgaW4gbG9jYWxTdG9yYWdlXG4gICAqIEBwYXJhbSBzZWxlY3RlZFxuICAgKi9cbiAgc2F2ZUhpc3Rvcnkoc2VsZWN0ZWQpIHtcbiAgICBpZiAodGhpcy5oaXN0b3J5SWRlbnRpZmllcikge1xuICAgICAgLy8gY2hlY2sgaWYgc2VsZWN0ZWQgaXRlbSBleGlzdHMgaW4gaGlzdG9yeUxpc3RcbiAgICAgIGlmICghdGhpcy5oaXN0b3J5TGlzdC5zb21lKChpdGVtKSA9PiAhdGhpcy5pc1R5cGUoaXRlbSlcbiAgICAgICAgPyBpdGVtW3RoaXMuc2VhcmNoS2V5d29yZF0gPT0gc2VsZWN0ZWRbdGhpcy5zZWFyY2hLZXl3b3JkXSA6IGl0ZW0gPT0gc2VsZWN0ZWQpKSB7XG4gICAgICAgIHRoaXMuc2F2ZUhpc3RvcnlUb0xvY2FsU3RvcmFnZShbc2VsZWN0ZWQsIC4uLnRoaXMuaGlzdG9yeUxpc3RdKTtcblxuICAgICAgICAvLyBjaGVjayBpZiBpdGVtcyBkb24ndCBleGNlZWQgbWF4IGFsbG93ZWQgbnVtYmVyXG4gICAgICAgIGlmICh0aGlzLmhpc3RvcnlMaXN0Lmxlbmd0aCA+PSB0aGlzLmhpc3RvcnlMaXN0TWF4TnVtYmVyKSB7XG4gICAgICAgICAgdGhpcy5oaXN0b3J5TGlzdC5zcGxpY2UodGhpcy5oaXN0b3J5TGlzdC5sZW5ndGggLSAxLCAxKTtcbiAgICAgICAgICB0aGlzLnNhdmVIaXN0b3J5VG9Mb2NhbFN0b3JhZ2UoW3NlbGVjdGVkLCAuLi50aGlzLmhpc3RvcnlMaXN0XSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIHNlbGVjdGVkIGl0ZW0gZXhpc3RzIGluIGhpc3RvcnlMaXN0IHN3YXAgdG8gdG9wIGluIGFycmF5XG4gICAgICAgIGlmICghdGhpcy5pc1R5cGUoc2VsZWN0ZWQpKSB7XG4gICAgICAgICAgLy8gb2JqZWN0IGxvZ2ljXG4gICAgICAgICAgY29uc3QgY29waWVkSGlzdG9yeUxpc3QgPSB0aGlzLmhpc3RvcnlMaXN0LnNsaWNlKCk7IC8vIGNvcHkgb3JpZ2luYWwgaGlzdG9yeUxpc3QgYXJyYXlcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gY29waWVkSGlzdG9yeUxpc3QubWFwKChpdGVtKSA9PiBpdGVtW3RoaXMuc2VhcmNoS2V5d29yZF0pLmluZGV4T2Yoc2VsZWN0ZWRbdGhpcy5zZWFyY2hLZXl3b3JkXSk7XG4gICAgICAgICAgY29waWVkSGlzdG9yeUxpc3Quc3BsaWNlKHNlbGVjdGVkSW5kZXgsIDEpO1xuICAgICAgICAgIGNvcGllZEhpc3RvcnlMaXN0LnNwbGljZSgwLCAwLCBzZWxlY3RlZCk7XG4gICAgICAgICAgdGhpcy5zYXZlSGlzdG9yeVRvTG9jYWxTdG9yYWdlKFsuLi5jb3BpZWRIaXN0b3J5TGlzdF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHN0cmluZyBsb2dpY1xuICAgICAgICAgIGNvbnN0IGNvcGllZEhpc3RvcnlMaXN0ID0gdGhpcy5oaXN0b3J5TGlzdC5zbGljZSgpOyAvLyBjb3B5IG9yaWdpbmFsIGhpc3RvcnlMaXN0IGFycmF5XG4gICAgICAgICAgY29waWVkSGlzdG9yeUxpc3Quc3BsaWNlKHRoaXMuaGlzdG9yeUxpc3QuaW5kZXhPZihzZWxlY3RlZCksIDEpO1xuICAgICAgICAgIGNvcGllZEhpc3RvcnlMaXN0LnNwbGljZSgwLCAwLCBzZWxlY3RlZCk7XG4gICAgICAgICAgdGhpcy5zYXZlSGlzdG9yeVRvTG9jYWxTdG9yYWdlKFsuLi5jb3BpZWRIaXN0b3J5TGlzdF0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgaXRlbSBpbiBsb2NhbFN0b3JhZ2VcbiAgICogQHBhcmFtIHNlbGVjdGVkXG4gICAqL1xuICBzYXZlSGlzdG9yeVRvTG9jYWxTdG9yYWdlKHNlbGVjdGVkKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgYCR7dGhpcy5oaXN0b3J5SWRlbnRpZmllcn1gLFxuICAgICAgSlNPTi5zdHJpbmdpZnkoc2VsZWN0ZWQpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgaXRlbSBmcm9tIGxvY2FsU3RvcmFnZVxuICAgKiBAcGFyYW0gaW5kZXhcbiAgICogQHBhcmFtIGUgZXZlbnRcbiAgICovXG4gIHJlbW92ZUhpc3RvcnlJdGVtKGluZGV4LCBlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmhpc3RvcnlMaXN0ID0gdGhpcy5oaXN0b3J5TGlzdC5maWx0ZXIoKHYsIGkpID0+IGkgIT09IGluZGV4KTtcbiAgICB0aGlzLnNhdmVIaXN0b3J5VG9Mb2NhbFN0b3JhZ2UodGhpcy5oaXN0b3J5TGlzdCk7XG4gICAgaWYgKHRoaXMuaGlzdG9yeUxpc3QubGVuZ3RoID09IDApIHtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHt0aGlzLmhpc3RvcnlJZGVudGlmaWVyfWApO1xuICAgICAgdGhpcy5maWx0ZXJMaXN0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IGxvY2FsU3RvcmFnZVxuICAgKiBAcGFyYW0gZSBldmVudFxuICAgKi9cbiAgcmVzZXRIaXN0b3J5TGlzdChlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmhpc3RvcnlMaXN0ID0gW107XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGAke3RoaXMuaGlzdG9yeUlkZW50aWZpZXJ9YCk7XG4gICAgdGhpcy5maWx0ZXJMaXN0KCk7XG4gIH1cbn1cblxuQFBpcGUoe25hbWU6ICdoaWdobGlnaHQnfSlcbmV4cG9ydCBjbGFzcyBIaWdobGlnaHRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh0ZXh0OiBhbnksIHNlYXJjaDogYW55LCBzZWFyY2hLZXl3b3JkPzogYW55KTogYW55IHtcbiAgICBsZXQgcGF0dGVybiA9IHNlYXJjaC5yZXBsYWNlKC9bXFwtXFxbXFxdXFwvXFx7XFx9XFwoXFwpXFwqXFwrXFw/XFwuXFxcXFxcXlxcJFxcfF0vZywgJ1xcXFwkJicpO1xuICAgIHBhdHRlcm4gPSBwYXR0ZXJuLnNwbGl0KCcgJykuZmlsdGVyKCh0KSA9PiB7XG4gICAgICByZXR1cm4gdC5sZW5ndGggPiAwO1xuICAgIH0pLmpvaW4oJ3wnKTtcbiAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAocGF0dGVybiwgJ2dpJyk7XG5cbiAgICBpZiAoIXNlYXJjaCkge1xuICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxuXG4gICAgaWYgKHNlYXJjaEtleXdvcmQpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSB0ZXh0W3NlYXJjaEtleXdvcmRdLnJlcGxhY2UocmVnZXgsIChtYXRjaCkgPT4gYDxiPiR7bWF0Y2h9PC9iPmApO1xuICAgICAgLy8gY29weSBvcmlnaW5hbCBvYmplY3RcbiAgICAgIGNvbnN0IHRleHQyID0gey4uLnRleHR9O1xuICAgICAgLy8gc2V0IGJvbGQgdmFsdWUgaW50byBzZWFyY2hLZXl3b3JkIG9mIGNvcGllZCBvYmplY3RcbiAgICAgIHRleHQyW3NlYXJjaEtleXdvcmRdID0gbmFtZTtcbiAgICAgIHJldHVybiB0ZXh0MjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNlYXJjaCA/IHRleHQucmVwbGFjZShyZWdleCwgKG1hdGNoKSA9PiBgPGI+JHttYXRjaH08L2I+YCkgOiB0ZXh0O1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0F1dG9jb21wbGV0ZUxpYkNvbXBvbmVudH0gZnJvbSAnLi9hdXRvY29tcGxldGUtbGliLmNvbXBvbmVudCc7XG5pbXBvcnQge0F1dG9jb21wbGV0ZUNvbXBvbmVudCwgSGlnaGxpZ2h0UGlwZX0gZnJvbSAnLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmNvbXBvbmVudCc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtBdXRvY29tcGxldGVMaWJDb21wb25lbnQsIEF1dG9jb21wbGV0ZUNvbXBvbmVudCwgSGlnaGxpZ2h0UGlwZV0sXG4gIGV4cG9ydHM6IFtBdXRvY29tcGxldGVMaWJDb21wb25lbnQsIEF1dG9jb21wbGV0ZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQXV0b2NvbXBsZXRlTGliTW9kdWxlIHtcbn1cbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiQ29tcG9uZW50IiwiRXZlbnRFbWl0dGVyIiwiZnJvbUV2ZW50IiwibWFwIiwiZmlsdGVyIiwiZGVib3VuY2VUaW1lIiwiTkdfVkFMVUVfQUNDRVNTT1IiLCJmb3J3YXJkUmVmIiwiVmlld0VuY2Fwc3VsYXRpb24iLCJFbGVtZW50UmVmIiwiUmVuZGVyZXIyIiwiVmlld0NoaWxkIiwiSW5wdXQiLCJPdXRwdXQiLCJDb250ZW50Q2hpbGQiLCJUZW1wbGF0ZVJlZiIsIlBpcGUiLCJOZ01vZHVsZSIsIkNvbW1v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