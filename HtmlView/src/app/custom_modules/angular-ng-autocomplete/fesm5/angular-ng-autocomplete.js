import { Injectable, Component, NgModule, defineInjectable, EventEmitter, forwardRef, ViewEncapsulation, ElementRef, Renderer2, ViewChild, Input, Output, ContentChild, TemplateRef, Pipe } from '@angular/core';
import { __spread, __assign } from 'tslib';
import { fromEvent } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AutocompleteLibService = /** @class */ (function () {
    function AutocompleteLibService() {
    }
    AutocompleteLibService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    AutocompleteLibService.ctorParameters = function () { return []; };
    /** @nocollapse */ AutocompleteLibService.ngInjectableDef = defineInjectable({ factory: function AutocompleteLibService_Factory() { return new AutocompleteLibService(); }, token: AutocompleteLibService, providedIn: "root" });
    return AutocompleteLibService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AutocompleteLibComponent = /** @class */ (function () {
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
        { type: Component, args: [{
                    selector: 'ng-autocomplete-lib',
                    template: "\n    <p>\n      autocomplete-lib works!\n    </p>\n  ",
                    styles: []
                },] },
    ];
    /** @nocollapse */
    AutocompleteLibComponent.ctorParameters = function () { return []; };
    return AutocompleteLibComponent;
}());

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
var AutocompleteComponent = /** @class */ (function () {
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
        this.selected = new EventEmitter();
        /**
         * Event that is emitted whenever an input is changed.
         */
        this.inputChanged = new EventEmitter();
        /**
         * Event that is emitted whenever an input is focused.
         */
        this.inputFocused = new EventEmitter();
        /**
         * Event that is emitted whenever an input is cleared.
         */
        this.inputCleared = new EventEmitter();
        /**
         * Event that is emitted when the autocomplete panel is opened.
         */
        this.opened = new EventEmitter();
        /**
         * Event that is emitted when the autocomplete panel is closed.
         */
        this.closed = new EventEmitter();
        /**
         * Event that is emitted when scrolled to the end of items.
         */
        this.scrolledToEnd = new EventEmitter();
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

          if (this.filteredList.length > 0 ) {
            if (this.filteredList.length > 6) {
              this.filteredList.length = 6;
              this.filteredList.push({label: 'Cerca ancora...', value: null})
            }
          }
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
                if (!existingHistory.some(function (existingItem) { return !_this.isType(existingItem)
                    ? existingItem[_this.searchKeyword] == item[_this.searchKeyword] : existingItem == item; })) {
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
        this.inputKeyUp$ = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(map(function (e) { return e; }));
        this.inputKeyDown$ = fromEvent(this.searchInput.nativeElement, 'keydown').pipe(map(function (e) { return e; }));
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
            .pipe(filter(function (e) {
            return !isArrowUpDown(e.keyCode) &&
                !isEnter(e.keyCode) &&
                !isESC(e.keyCode) &&
                !isTab(e.keyCode);
        }), debounceTime(this.debounceTime)).subscribe(function (e) {
            _this.onKeyUp(e);
        });
        // cursor up & down
        this.inputKeyDown$.pipe(filter(function (e) { return isArrowUpDown(e.keyCode); })).subscribe(function (e) {
            e.preventDefault();
            _this.onFocusItem(e);
        });
        // enter keyup
        this.inputKeyUp$.pipe(filter(function (e) { return isEnter(e.keyCode); })).subscribe(function (e) {
            //this.onHandleEnter();
        });
        // enter keydown
        this.inputKeyDown$.pipe(filter(function (e) { return isEnter(e.keyCode); })).subscribe(function (e) {
            _this.onHandleEnter();
        });
        // ESC
        this.inputKeyUp$.pipe(filter(function (e) { return isESC(e.keyCode); }, debounceTime(100))).subscribe(function (e) {
            _this.onEsc();
        });
        // delete
        this.inputKeyDown$.pipe(filter(function (e) { return isBackspace(e.keyCode) || isDelete(e.keyCode); })).subscribe(function (e) {
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
            if (!this.historyList.some(function (item) { return !_this.isType(item)
                ? item[_this.searchKeyword] == selected[_this.searchKeyword] : item == selected; })) {
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
        { type: Component, args: [{
                    selector: 'ng-autocomplete',
                    template: "<div class=\"autocomplete-container\">\n  <div class=\"input-container\">\n    <input #searchInput type=\"text\" placeholder={{placeHolder}}\n           [(ngModel)]=query\n           (input)=\"onChange($event)\"\n           (focus)=handleFocus($event)>\n    <div class=\"x\" *ngIf=\"query && !isLoading\" (click)=\"remove($event)\">\n      <i class=\"material-icons\">close</i>\n    </div>\n    <!--Loading mask-->\n    <div class=\"sk-fading-circle\" *ngIf=\"isLoading\">\n      <div class=\"sk-circle1 sk-circle\"></div>\n      <div class=\"sk-circle2 sk-circle\"></div>\n      <div class=\"sk-circle3 sk-circle\"></div>\n      <div class=\"sk-circle4 sk-circle\"></div>\n      <div class=\"sk-circle5 sk-circle\"></div>\n      <div class=\"sk-circle6 sk-circle\"></div>\n      <div class=\"sk-circle7 sk-circle\"></div>\n      <div class=\"sk-circle8 sk-circle\"></div>\n      <div class=\"sk-circle9 sk-circle\"></div>\n      <div class=\"sk-circle10 sk-circle\"></div>\n      <div class=\"sk-circle11 sk-circle\"></div>\n      <div class=\"sk-circle12 sk-circle\"></div>\n    </div>\n  </div>\n\n  <!--FilteredList items-->\n  <div class=\"suggestions-container\"\n       [ngClass]=\"{ 'is-hidden': isHistoryListVisible, 'is-visible': !isHistoryListVisible}\">\n    <ul #filteredListElement>\n      <li *ngFor=\"let item of filteredList; let idx = index\" class=\"item\">\n        <!--string logic-->\n        <div [class.complete-selected]=\"idx === selectedIdx\" *ngIf='isType(item)'\n             (click)=\"select(item)\">\n          <ng-container\n            *ngTemplateOutlet=\"itemTemplate;  context: { $implicit: item | highlight: toHighlight }\">\n          </ng-container>\n        </div>\n        <!--object logic-->\n        <div [class.complete-selected]=\"idx === selectedIdx\" *ngIf='!isType(item)'\n             (click)=\"select(item)\">\n          <ng-container\n            *ngTemplateOutlet=\"itemTemplate; context: { $implicit: item | highlight: toHighlight : searchKeyword }\">\n          </ng-container>\n        </div>\n\n      </li>\n    </ul>\n  </div>\n\n  <!--HistoryList items-->\n  <div class=\"suggestions-container\"\n       [ngClass]=\"{ 'is-hidden': !isHistoryListVisible, 'is-visible': isHistoryListVisible}\">\n    <!--HistoryList heading-->\n    <div class=\"history-heading\" *ngIf=\"historyList.length > 0 && historyHeading\">\n      <div class=\"text\">{{historyHeading}}</div>\n      <div class=\"x\" (click)=\"resetHistoryList($event)\">\n        <i class=\"material-icons\">delete</i>\n      </div>\n    </div>\n\n    <ul #historyListElement>\n      <li *ngFor=\"let item of historyList; let idx = index\" class=\"item\">\n        <!--string logic-->\n        <div [class.complete-selected]=\"idx === selectedIdx\" *ngIf='isType(item)' (click)=\"select(item)\">\n          <ng-container\n            *ngTemplateOutlet=\"itemTemplate;  context: { $implicit: item }\">\n          </ng-container>\n        </div>\n        <!--object logic-->\n        <div [class.complete-selected]=\"idx === selectedIdx\" *ngIf='!isType(item)' (click)=\"select(item)\">\n          <ng-container\n            *ngTemplateOutlet=\"itemTemplate; context: { $implicit: item }\">\n          </ng-container>\n        </div>\n        <div class=\"x\" (click)=\"removeHistoryItem(idx, $event)\">\n          <i class=\"material-icons\">close</i>\n        </div>\n      </li>\n    </ul>\n  </div>\n\n  <!--Not found-->\n  <div class=\"not-found\" *ngIf=\"isLoading ? !isLoading && notFound : notFound\">\n    <ng-container\n      *ngTemplateOutlet=\"notFoundTemplate;  context: { $implicit: notFoundText  }\">\n    </ng-container>\n  </div>\n</div>\n",
                    styles: ["@import url(https://fonts.googleapis.com/icon?family=Material+Icons);.ng-autocomplete{width:600px}.autocomplete-container{box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);position:relative;overflow:visible;height:40px}.autocomplete-container .input-container input{font-size:14px;box-sizing:border-box;border:none;box-shadow:none;outline:0;background-color:#fff;color:rgba(0,0,0,.87);width:100%;padding:0 15px;line-height:40px;height:40px}.autocomplete-container .input-container .x{position:absolute;right:10px;margin:auto;cursor:pointer;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.autocomplete-container .input-container .x i{color:rgba(0,0,0,.54);font-size:22px;vertical-align:middle}.autocomplete-container .suggestions-container{position:absolute;width:100%;background:#fff;height:auto;box-shadow:0 2px 5px rgba(0,0,0,.25);box-sizing:border-box}.autocomplete-container .suggestions-container ul{padding:0;margin:0;max-height:240px;overflow-y:auto}.autocomplete-container .suggestions-container ul li{position:relative;list-style:none;padding:0;margin:0;cursor:pointer}.autocomplete-container .suggestions-container ul li a{padding:14px 15px;display:block;text-decoration:none;cursor:pointer;color:rgba(0,0,0,.87);font-size:15px}.autocomplete-container .suggestions-container .complete-selected,.autocomplete-container .suggestions-container ul li:hover{background-color:rgba(158,158,158,.18)}.autocomplete-container .suggestions-container .history-heading{position:relative;padding:10px 15px;border:1px solid #f1f1f1}.autocomplete-container .suggestions-container .history-heading .text{font-size:.85em}.autocomplete-container .suggestions-container .x{position:absolute;right:10px;margin:auto;cursor:pointer;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.autocomplete-container .suggestions-container .x i{color:rgba(0,0,0,.54);font-size:18px;vertical-align:middle}.autocomplete-container .suggestions-container.is-hidden{visibility:hidden}.autocomplete-container .suggestions-container.is-visible{visibility:visible}.autocomplete-container .not-found{padding:0 .75em;border:1px solid #f1f1f1;background:#fff}.autocomplete-container .not-found div{padding:.4em 0;font-size:.95em;line-height:1.4;border-bottom:1px solid rgba(230,230,230,.7)}.highlight{font-weight:700}.sk-fading-circle{width:20px;height:20px;position:absolute;right:10px;top:0;bottom:0;margin:auto}.sk-fading-circle .sk-circle{width:100%;height:100%;position:absolute;left:0;top:0}.sk-fading-circle .sk-circle:before{content:'';display:block;margin:0 auto;width:15%;height:15%;background-color:#333;border-radius:100%;-webkit-animation:1.2s ease-in-out infinite both sk-circleFadeDelay;animation:1.2s ease-in-out infinite both sk-circleFadeDelay}.sk-fading-circle .sk-circle2{-webkit-transform:rotate(30deg);transform:rotate(30deg)}.sk-fading-circle .sk-circle3{-webkit-transform:rotate(60deg);transform:rotate(60deg)}.sk-fading-circle .sk-circle4{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.sk-fading-circle .sk-circle5{-webkit-transform:rotate(120deg);transform:rotate(120deg)}.sk-fading-circle .sk-circle6{-webkit-transform:rotate(150deg);transform:rotate(150deg)}.sk-fading-circle .sk-circle7{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.sk-fading-circle .sk-circle8{-webkit-transform:rotate(210deg);transform:rotate(210deg)}.sk-fading-circle .sk-circle9{-webkit-transform:rotate(240deg);transform:rotate(240deg)}.sk-fading-circle .sk-circle10{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.sk-fading-circle .sk-circle11{-webkit-transform:rotate(300deg);transform:rotate(300deg)}.sk-fading-circle .sk-circle12{-webkit-transform:rotate(330deg);transform:rotate(330deg)}.sk-fading-circle .sk-circle2:before{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.sk-fading-circle .sk-circle3:before{-webkit-animation-delay:-1s;animation-delay:-1s}.sk-fading-circle .sk-circle4:before{-webkit-animation-delay:-.9s;animation-delay:-.9s}.sk-fading-circle .sk-circle5:before{-webkit-animation-delay:-.8s;animation-delay:-.8s}.sk-fading-circle .sk-circle6:before{-webkit-animation-delay:-.7s;animation-delay:-.7s}.sk-fading-circle .sk-circle7:before{-webkit-animation-delay:-.6s;animation-delay:-.6s}.sk-fading-circle .sk-circle8:before{-webkit-animation-delay:-.5s;animation-delay:-.5s}.sk-fading-circle .sk-circle9:before{-webkit-animation-delay:-.4s;animation-delay:-.4s}.sk-fading-circle .sk-circle10:before{-webkit-animation-delay:-.3s;animation-delay:-.3s}.sk-fading-circle .sk-circle11:before{-webkit-animation-delay:-.2s;animation-delay:-.2s}.sk-fading-circle .sk-circle12:before{-webkit-animation-delay:-.1s;animation-delay:-.1s}@-webkit-keyframes sk-circleFadeDelay{0%,100%,39%{opacity:0}40%{opacity:1}}@keyframes sk-circleFadeDelay{0%,100%,39%{opacity:0}40%{opacity:1}}"],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return AutocompleteComponent; }),
                            multi: true
                        }
                    ],
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '(document:click)': 'handleClick($event)',
                        'class': 'ng-autocomplete'
                    },
                },] },
    ];
    /** @nocollapse */
    AutocompleteComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    AutocompleteComponent.propDecorators = {
        searchInput: [{ type: ViewChild, args: ['searchInput',] }],
        filteredListElement: [{ type: ViewChild, args: ['filteredListElement',] }],
        historyListElement: [{ type: ViewChild, args: ['historyListElement',] }],
        data: [{ type: Input }],
        searchKeyword: [{ type: Input }],
        placeHolder: [{ type: Input }],
        initialValue: [{ type: Input }],
        historyIdentifier: [{ type: Input }],
        historyHeading: [{ type: Input }],
        historyListMaxNumber: [{ type: Input }],
        notFoundText: [{ type: Input }],
        isLoading: [{ type: Input }],
        debounceTime: [{ type: Input }],
        minQueryLength: [{ type: Input }],
        selected: [{ type: Output }],
        inputChanged: [{ type: Output }],
        inputFocused: [{ type: Output }],
        inputCleared: [{ type: Output }],
        opened: [{ type: Output }],
        closed: [{ type: Output }],
        scrolledToEnd: [{ type: Output }],
        itemTemplate: [{ type: ContentChild, args: [TemplateRef,] }, { type: Input }],
        notFoundTemplate: [{ type: Input }]
    };
    return AutocompleteComponent;
}());
var HighlightPipe = /** @class */ (function () {
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
        { type: Pipe, args: [{ name: 'highlight' },] },
    ];
    return HighlightPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AutocompleteLibModule = /** @class */ (function () {
    function AutocompleteLibModule() {
    }
    AutocompleteLibModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule
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

export { AutocompleteLibService, AutocompleteLibComponent, AutocompleteLibModule, AutocompleteComponent, HighlightPipe };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1uZy1hdXRvY29tcGxldGUuanMubWFwIiwic291cmNlcyI6WyJuZzovL2FuZ3VsYXItbmctYXV0b2NvbXBsZXRlL2xpYi9hdXRvY29tcGxldGUtbGliLnNlcnZpY2UudHMiLCJuZzovL2FuZ3VsYXItbmctYXV0b2NvbXBsZXRlL2xpYi9hdXRvY29tcGxldGUtbGliLmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci1uZy1hdXRvY29tcGxldGUvbGliL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyLW5nLWF1dG9jb21wbGV0ZS9saWIvYXV0b2NvbXBsZXRlLWxpYi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBdXRvY29tcGxldGVMaWJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctYXV0b2NvbXBsZXRlLWxpYicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICBhdXRvY29tcGxldGUtbGliIHdvcmtzIVxuICAgIDwvcD5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBBdXRvY29tcGxldGVMaWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZixcbiAgSW5wdXQsIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFBpcGUsXG4gIFBpcGVUcmFuc2Zvcm0sIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlcywgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2Zyb21FdmVudCwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2RlYm91bmNlVGltZSwgZmlsdGVyLCBtYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbi8qKlxuICogS2V5Ym9hcmQgZXZlbnRzXG4gKi9cbmNvbnN0IGlzQXJyb3dVcCA9IGtleUNvZGUgPT4ga2V5Q29kZSA9PT0gMzg7XG5jb25zdCBpc0Fycm93RG93biA9IGtleUNvZGUgPT4ga2V5Q29kZSA9PT0gNDA7XG5jb25zdCBpc0Fycm93VXBEb3duID0ga2V5Q29kZSA9PiBpc0Fycm93VXAoa2V5Q29kZSkgfHwgaXNBcnJvd0Rvd24oa2V5Q29kZSk7XG5jb25zdCBpc0VudGVyID0ga2V5Q29kZSA9PiBrZXlDb2RlID09PSAxMztcbmNvbnN0IGlzQmFja3NwYWNlID0ga2V5Q29kZSA9PiBrZXlDb2RlID09PSA4O1xuY29uc3QgaXNEZWxldGUgPSBrZXlDb2RlID0+IGtleUNvZGUgPT09IDQ2O1xuY29uc3QgaXNFU0MgPSBrZXlDb2RlID0+IGtleUNvZGUgPT09IDI3O1xuY29uc3QgaXNUYWIgPSBrZXlDb2RlID0+IGtleUNvZGUgPT09IDk7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctYXV0b2NvbXBsZXRlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiYXV0b2NvbXBsZXRlLWNvbnRhaW5lclwiPlxuICA8ZGl2IGNsYXNzPVwiaW5wdXQtY29udGFpbmVyXCI+XG4gICAgPGlucHV0ICNzZWFyY2hJbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPXt7cGxhY2VIb2xkZXJ9fVxuICAgICAgICAgICBbKG5nTW9kZWwpXT1xdWVyeVxuICAgICAgICAgICAoaW5wdXQpPVwib25DaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgIChmb2N1cyk9aGFuZGxlRm9jdXMoJGV2ZW50KT5cbiAgICA8ZGl2IGNsYXNzPVwieFwiICpuZ0lmPVwicXVlcnkgJiYgIWlzTG9hZGluZ1wiIChjbGljayk9XCJyZW1vdmUoJGV2ZW50KVwiPlxuICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmNsb3NlPC9pPlxuICAgIDwvZGl2PlxuICAgIDwhLS1Mb2FkaW5nIG1hc2stLT5cbiAgICA8ZGl2IGNsYXNzPVwic2stZmFkaW5nLWNpcmNsZVwiICpuZ0lmPVwiaXNMb2FkaW5nXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwic2stY2lyY2xlMSBzay1jaXJjbGVcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzay1jaXJjbGUyIHNrLWNpcmNsZVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNrLWNpcmNsZTMgc2stY2lyY2xlXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic2stY2lyY2xlNCBzay1jaXJjbGVcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzay1jaXJjbGU1IHNrLWNpcmNsZVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNrLWNpcmNsZTYgc2stY2lyY2xlXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic2stY2lyY2xlNyBzay1jaXJjbGVcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzay1jaXJjbGU4IHNrLWNpcmNsZVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNrLWNpcmNsZTkgc2stY2lyY2xlXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic2stY2lyY2xlMTAgc2stY2lyY2xlXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic2stY2lyY2xlMTEgc2stY2lyY2xlXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic2stY2lyY2xlMTIgc2stY2lyY2xlXCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDwhLS1GaWx0ZXJlZExpc3QgaXRlbXMtLT5cbiAgPGRpdiBjbGFzcz1cInN1Z2dlc3Rpb25zLWNvbnRhaW5lclwiXG4gICAgICAgW25nQ2xhc3NdPVwieyAnaXMtaGlkZGVuJzogaXNIaXN0b3J5TGlzdFZpc2libGUsICdpcy12aXNpYmxlJzogIWlzSGlzdG9yeUxpc3RWaXNpYmxlfVwiPlxuICAgIDx1bCAjZmlsdGVyZWRMaXN0RWxlbWVudD5cbiAgICAgIDxsaSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBmaWx0ZXJlZExpc3Q7IGxldCBpZHggPSBpbmRleFwiIGNsYXNzPVwiaXRlbVwiPlxuICAgICAgICA8IS0tc3RyaW5nIGxvZ2ljLS0+XG4gICAgICAgIDxkaXYgW2NsYXNzLmNvbXBsZXRlLXNlbGVjdGVkXT1cImlkeCA9PT0gc2VsZWN0ZWRJZHhcIiAqbmdJZj0naXNUeXBlKGl0ZW0pJ1xuICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3QoaXRlbSlcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgIGNvbnRleHQ6IHsgJGltcGxpY2l0OiBpdGVtIHwgaGlnaGxpZ2h0OiB0b0hpZ2hsaWdodCB9XCI+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8IS0tb2JqZWN0IGxvZ2ljLS0+XG4gICAgICAgIDxkaXYgW2NsYXNzLmNvbXBsZXRlLXNlbGVjdGVkXT1cImlkeCA9PT0gc2VsZWN0ZWRJZHhcIiAqbmdJZj0nIWlzVHlwZShpdGVtKSdcbiAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0KGl0ZW0pXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBpdGVtIHwgaGlnaGxpZ2h0OiB0b0hpZ2hsaWdodCA6IHNlYXJjaEtleXdvcmQgfVwiPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICA8L2Rpdj5cblxuICA8IS0tSGlzdG9yeUxpc3QgaXRlbXMtLT5cbiAgPGRpdiBjbGFzcz1cInN1Z2dlc3Rpb25zLWNvbnRhaW5lclwiXG4gICAgICAgW25nQ2xhc3NdPVwieyAnaXMtaGlkZGVuJzogIWlzSGlzdG9yeUxpc3RWaXNpYmxlLCAnaXMtdmlzaWJsZSc6IGlzSGlzdG9yeUxpc3RWaXNpYmxlfVwiPlxuICAgIDwhLS1IaXN0b3J5TGlzdCBoZWFkaW5nLS0+XG4gICAgPGRpdiBjbGFzcz1cImhpc3RvcnktaGVhZGluZ1wiICpuZ0lmPVwiaGlzdG9yeUxpc3QubGVuZ3RoID4gMCAmJiBoaXN0b3J5SGVhZGluZ1wiPlxuICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj57e2hpc3RvcnlIZWFkaW5nfX08L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ4XCIgKGNsaWNrKT1cInJlc2V0SGlzdG9yeUxpc3QoJGV2ZW50KVwiPlxuICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZGVsZXRlPC9pPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8dWwgI2hpc3RvcnlMaXN0RWxlbWVudD5cbiAgICAgIDxsaSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBoaXN0b3J5TGlzdDsgbGV0IGlkeCA9IGluZGV4XCIgY2xhc3M9XCJpdGVtXCI+XG4gICAgICAgIDwhLS1zdHJpbmcgbG9naWMtLT5cbiAgICAgICAgPGRpdiBbY2xhc3MuY29tcGxldGUtc2VsZWN0ZWRdPVwiaWR4ID09PSBzZWxlY3RlZElkeFwiICpuZ0lmPSdpc1R5cGUoaXRlbSknIChjbGljayk9XCJzZWxlY3QoaXRlbSlcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgIGNvbnRleHQ6IHsgJGltcGxpY2l0OiBpdGVtIH1cIj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwhLS1vYmplY3QgbG9naWMtLT5cbiAgICAgICAgPGRpdiBbY2xhc3MuY29tcGxldGUtc2VsZWN0ZWRdPVwiaWR4ID09PSBzZWxlY3RlZElkeFwiICpuZ0lmPSchaXNUeXBlKGl0ZW0pJyAoY2xpY2spPVwic2VsZWN0KGl0ZW0pXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBpdGVtIH1cIj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ4XCIgKGNsaWNrKT1cInJlbW92ZUhpc3RvcnlJdGVtKGlkeCwgJGV2ZW50KVwiPlxuICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5jbG9zZTwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gIDwvZGl2PlxuXG4gIDwhLS1Ob3QgZm91bmQtLT5cbiAgPGRpdiBjbGFzcz1cIm5vdC1mb3VuZFwiICpuZ0lmPVwiaXNMb2FkaW5nID8gIWlzTG9hZGluZyAmJiBub3RGb3VuZCA6IG5vdEZvdW5kXCI+XG4gICAgPG5nLWNvbnRhaW5lclxuICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJub3RGb3VuZFRlbXBsYXRlOyAgY29udGV4dDogeyAkaW1wbGljaXQ6IG5vdEZvdW5kVGV4dCAgfVwiPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYEBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vaWNvbj9mYW1pbHk9TWF0ZXJpYWwrSWNvbnMpOy5uZy1hdXRvY29tcGxldGV7d2lkdGg6NjAwcHh9LmF1dG9jb21wbGV0ZS1jb250YWluZXJ7Ym94LXNoYWRvdzowIDFweCAzcHggMCByZ2JhKDAsMCwwLC4yKSwwIDFweCAxcHggMCByZ2JhKDAsMCwwLC4xNCksMCAycHggMXB4IC0xcHggcmdiYSgwLDAsMCwuMTIpO3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OnZpc2libGU7aGVpZ2h0OjQwcHh9LmF1dG9jb21wbGV0ZS1jb250YWluZXIgLmlucHV0LWNvbnRhaW5lciBpbnB1dHtmb250LXNpemU6MTRweDtib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym9yZGVyOm5vbmU7Ym94LXNoYWRvdzpub25lO291dGxpbmU6MDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Y29sb3I6cmdiYSgwLDAsMCwuODcpO3dpZHRoOjEwMCU7cGFkZGluZzowIDE1cHg7bGluZS1oZWlnaHQ6NDBweDtoZWlnaHQ6NDBweH0uYXV0b2NvbXBsZXRlLWNvbnRhaW5lciAuaW5wdXQtY29udGFpbmVyIC54e3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjEwcHg7bWFyZ2luOmF1dG87Y3Vyc29yOnBvaW50ZXI7dG9wOjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpfS5hdXRvY29tcGxldGUtY29udGFpbmVyIC5pbnB1dC1jb250YWluZXIgLnggaXtjb2xvcjpyZ2JhKDAsMCwwLC41NCk7Zm9udC1zaXplOjIycHg7dmVydGljYWwtYWxpZ246bWlkZGxlfS5hdXRvY29tcGxldGUtY29udGFpbmVyIC5zdWdnZXN0aW9ucy1jb250YWluZXJ7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTAwJTtiYWNrZ3JvdW5kOiNmZmY7aGVpZ2h0OmF1dG87Ym94LXNoYWRvdzowIDJweCA1cHggcmdiYSgwLDAsMCwuMjUpO2JveC1zaXppbmc6Ym9yZGVyLWJveH0uYXV0b2NvbXBsZXRlLWNvbnRhaW5lciAuc3VnZ2VzdGlvbnMtY29udGFpbmVyIHVse3BhZGRpbmc6MDttYXJnaW46MDttYXgtaGVpZ2h0OjI0MHB4O292ZXJmbG93LXk6YXV0b30uYXV0b2NvbXBsZXRlLWNvbnRhaW5lciAuc3VnZ2VzdGlvbnMtY29udGFpbmVyIHVsIGxpe3Bvc2l0aW9uOnJlbGF0aXZlO2xpc3Qtc3R5bGU6bm9uZTtwYWRkaW5nOjA7bWFyZ2luOjA7Y3Vyc29yOnBvaW50ZXJ9LmF1dG9jb21wbGV0ZS1jb250YWluZXIgLnN1Z2dlc3Rpb25zLWNvbnRhaW5lciB1bCBsaSBhe3BhZGRpbmc6MTRweCAxNXB4O2Rpc3BsYXk6YmxvY2s7dGV4dC1kZWNvcmF0aW9uOm5vbmU7Y3Vyc29yOnBvaW50ZXI7Y29sb3I6cmdiYSgwLDAsMCwuODcpO2ZvbnQtc2l6ZToxNXB4fS5hdXRvY29tcGxldGUtY29udGFpbmVyIC5zdWdnZXN0aW9ucy1jb250YWluZXIgLmNvbXBsZXRlLXNlbGVjdGVkLC5hdXRvY29tcGxldGUtY29udGFpbmVyIC5zdWdnZXN0aW9ucy1jb250YWluZXIgdWwgbGk6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDE1OCwxNTgsMTU4LC4xOCl9LmF1dG9jb21wbGV0ZS1jb250YWluZXIgLnN1Z2dlc3Rpb25zLWNvbnRhaW5lciAuaGlzdG9yeS1oZWFkaW5ne3Bvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmc6MTBweCAxNXB4O2JvcmRlcjoxcHggc29saWQgI2YxZjFmMX0uYXV0b2NvbXBsZXRlLWNvbnRhaW5lciAuc3VnZ2VzdGlvbnMtY29udGFpbmVyIC5oaXN0b3J5LWhlYWRpbmcgLnRleHR7Zm9udC1zaXplOi44NWVtfS5hdXRvY29tcGxldGUtY29udGFpbmVyIC5zdWdnZXN0aW9ucy1jb250YWluZXIgLnh7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MTBweDttYXJnaW46YXV0bztjdXJzb3I6cG9pbnRlcjt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSl9LmF1dG9jb21wbGV0ZS1jb250YWluZXIgLnN1Z2dlc3Rpb25zLWNvbnRhaW5lciAueCBpe2NvbG9yOnJnYmEoMCwwLDAsLjU0KTtmb250LXNpemU6MThweDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmF1dG9jb21wbGV0ZS1jb250YWluZXIgLnN1Z2dlc3Rpb25zLWNvbnRhaW5lci5pcy1oaWRkZW57dmlzaWJpbGl0eTpoaWRkZW59LmF1dG9jb21wbGV0ZS1jb250YWluZXIgLnN1Z2dlc3Rpb25zLWNvbnRhaW5lci5pcy12aXNpYmxle3Zpc2liaWxpdHk6dmlzaWJsZX0uYXV0b2NvbXBsZXRlLWNvbnRhaW5lciAubm90LWZvdW5ke3BhZGRpbmc6MCAuNzVlbTtib3JkZXI6MXB4IHNvbGlkICNmMWYxZjE7YmFja2dyb3VuZDojZmZmfS5hdXRvY29tcGxldGUtY29udGFpbmVyIC5ub3QtZm91bmQgZGl2e3BhZGRpbmc6LjRlbSAwO2ZvbnQtc2l6ZTouOTVlbTtsaW5lLWhlaWdodDoxLjQ7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgcmdiYSgyMzAsMjMwLDIzMCwuNyl9LmhpZ2hsaWdodHtmb250LXdlaWdodDo3MDB9LnNrLWZhZGluZy1jaXJjbGV7d2lkdGg6MjBweDtoZWlnaHQ6MjBweDtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDoxMHB4O3RvcDowO2JvdHRvbTowO21hcmdpbjphdXRvfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGV7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjB9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTpiZWZvcmV7Y29udGVudDonJztkaXNwbGF5OmJsb2NrO21hcmdpbjowIGF1dG87d2lkdGg6MTUlO2hlaWdodDoxNSU7YmFja2dyb3VuZC1jb2xvcjojMzMzO2JvcmRlci1yYWRpdXM6MTAwJTstd2Via2l0LWFuaW1hdGlvbjoxLjJzIGVhc2UtaW4tb3V0IGluZmluaXRlIGJvdGggc2stY2lyY2xlRmFkZURlbGF5O2FuaW1hdGlvbjoxLjJzIGVhc2UtaW4tb3V0IGluZmluaXRlIGJvdGggc2stY2lyY2xlRmFkZURlbGF5fS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGUyey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzMGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgzMGRlZyl9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTN7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDYwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDYwZGVnKX0uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlNHstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoOTBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoOTBkZWcpfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGU1ey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgxMjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMTIwZGVnKX0uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlNnstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMTUwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDE1MGRlZyl9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTd7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDE4MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgxODBkZWcpfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGU4ey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgyMTBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMjEwZGVnKX0uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlOXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMjQwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDI0MGRlZyl9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTEwey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgyNzBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMjcwZGVnKX0uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlMTF7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDMwMGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgzMDBkZWcpfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGUxMnstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzMwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDMzMGRlZyl9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTI6YmVmb3Jley13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0xLjFzO2FuaW1hdGlvbi1kZWxheTotMS4xc30uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlMzpiZWZvcmV7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LTFzO2FuaW1hdGlvbi1kZWxheTotMXN9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTQ6YmVmb3Jley13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0uOXM7YW5pbWF0aW9uLWRlbGF5Oi0uOXN9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTU6YmVmb3Jley13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0uOHM7YW5pbWF0aW9uLWRlbGF5Oi0uOHN9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTY6YmVmb3Jley13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0uN3M7YW5pbWF0aW9uLWRlbGF5Oi0uN3N9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTc6YmVmb3Jley13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0uNnM7YW5pbWF0aW9uLWRlbGF5Oi0uNnN9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTg6YmVmb3Jley13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0uNXM7YW5pbWF0aW9uLWRlbGF5Oi0uNXN9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTk6YmVmb3Jley13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0uNHM7YW5pbWF0aW9uLWRlbGF5Oi0uNHN9LnNrLWZhZGluZy1jaXJjbGUgLnNrLWNpcmNsZTEwOmJlZm9yZXstd2Via2l0LWFuaW1hdGlvbi1kZWxheTotLjNzO2FuaW1hdGlvbi1kZWxheTotLjNzfS5zay1mYWRpbmctY2lyY2xlIC5zay1jaXJjbGUxMTpiZWZvcmV7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LS4yczthbmltYXRpb24tZGVsYXk6LS4yc30uc2stZmFkaW5nLWNpcmNsZSAuc2stY2lyY2xlMTI6YmVmb3Jley13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0uMXM7YW5pbWF0aW9uLWRlbGF5Oi0uMXN9QC13ZWJraXQta2V5ZnJhbWVzIHNrLWNpcmNsZUZhZGVEZWxheXswJSwxMDAlLDM5JXtvcGFjaXR5OjB9NDAle29wYWNpdHk6MX19QGtleWZyYW1lcyBzay1jaXJjbGVGYWRlRGVsYXl7MCUsMTAwJSwzOSV7b3BhY2l0eTowfTQwJXtvcGFjaXR5OjF9fWBdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEF1dG9jb21wbGV0ZUNvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaG9zdDoge1xuICAgICcoZG9jdW1lbnQ6Y2xpY2spJzogJ2hhbmRsZUNsaWNrKCRldmVudCknLFxuICAgICdjbGFzcyc6ICduZy1hdXRvY29tcGxldGUnXG4gIH0sXG59KVxuXG5leHBvcnQgY2xhc3MgQXV0b2NvbXBsZXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQFZpZXdDaGlsZCgnc2VhcmNoSW5wdXQnKSBzZWFyY2hJbnB1dDogRWxlbWVudFJlZjsgLy8gaW5wdXQgZWxlbWVudFxuICBAVmlld0NoaWxkKCdmaWx0ZXJlZExpc3RFbGVtZW50JykgZmlsdGVyZWRMaXN0RWxlbWVudDogRWxlbWVudFJlZjsgLy8gZWxlbWVudCBvZiBpdGVtc1xuICBAVmlld0NoaWxkKCdoaXN0b3J5TGlzdEVsZW1lbnQnKSBoaXN0b3J5TGlzdEVsZW1lbnQ6IEVsZW1lbnRSZWY7IC8vIGVsZW1lbnQgb2YgaGlzdG9yeSBpdGVtc1xuXG4gIGlucHV0S2V5VXAkOiBPYnNlcnZhYmxlPGFueT47IC8vIGlucHV0IGV2ZW50c1xuICBpbnB1dEtleURvd24kOiBPYnNlcnZhYmxlPGFueT47IC8vIGlucHV0IGV2ZW50c1xuXG4gIHB1YmxpYyBxdWVyeSA9ICcnOyAvLyBzZWFyY2ggcXVlcnlcbiAgcHVibGljIGZpbHRlcmVkTGlzdCA9IFtdOyAvLyBsaXN0IG9mIGl0ZW1zXG4gIHB1YmxpYyBoaXN0b3J5TGlzdCA9IFtdOyAvLyBsaXN0IG9mIGhpc3RvcnkgaXRlbXNcbiAgcHVibGljIGlzSGlzdG9yeUxpc3RWaXNpYmxlID0gdHJ1ZTtcbiAgcHVibGljIGVsZW1lbnRSZWY7XG4gIHB1YmxpYyBzZWxlY3RlZElkeCA9IC0xO1xuICBwdWJsaWMgdG9IaWdobGlnaHQ6IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgbm90Rm91bmQgPSBmYWxzZTtcbiAgcHVibGljIGlzRm9jdXNlZCA9IGZhbHNlO1xuICBwdWJsaWMgaXNPcGVuID0gZmFsc2U7XG4gIHB1YmxpYyBpc1Njcm9sbFRvRW5kID0gZmFsc2U7XG4gIHByaXZhdGUgbWFudWFsT3BlbiA9IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBtYW51YWxDbG9zZSA9IHVuZGVmaW5lZDtcblxuXG4gIC8vIGlucHV0c1xuICAvKipcbiAgICogRGF0YSBvZiBpdGVtcyBsaXN0LlxuICAgKiBJdCBjYW4gYmUgYXJyYXkgb2Ygc3RyaW5ncyBvciBhcnJheSBvZiBvYmplY3RzLlxuICAgKi9cbiAgQElucHV0KCkgcHVibGljIGRhdGEgPSBbXTtcbiAgQElucHV0KCkgcHVibGljIHNlYXJjaEtleXdvcmQ6IHN0cmluZzsgLy8ga2V5d29yZCB0byBmaWx0ZXIgdGhlIGxpc3RcbiAgQElucHV0KCkgcHVibGljIHBsYWNlSG9sZGVyID0gJyc7IC8vIGlucHV0IHBsYWNlaG9sZGVyXG4gIEBJbnB1dCgpIHB1YmxpYyBpbml0aWFsVmFsdWU6IGFueTsgLy8gc2V0IGluaXRpYWwgdmFsdWVcbiAgLyoqXG4gICAqIEhpc3RvcnkgaWRlbnRpZmllciBvZiBoaXN0b3J5IGxpc3RcbiAgICogV2hlbiB2YWxpZCBoaXN0b3J5IGlkZW50aWZpZXIgaXMgZ2l2ZW4sIHRoZW4gY29tcG9uZW50IHN0b3JlcyBzZWxlY3RlZCBpdGVtIHRvIGxvY2FsIHN0b3JhZ2Ugb2YgdXNlcidzIGJyb3dzZXIuXG4gICAqIElmIGl0IGlzIG51bGwgdGhlbiBoaXN0b3J5IGlzIGhpZGRlbi5cbiAgICogSGlzdG9yeSBsaXN0IGlzIHZpc2libGUgaWYgYXQgbGVhc3Qgb25lIGhpc3RvcnkgaXRlbSBpcyBzdG9yZWQuXG4gICAqL1xuICBASW5wdXQoKSBwdWJsaWMgaGlzdG9yeUlkZW50aWZpZXI6IFN0cmluZztcbiAgLyoqXG4gICAqIEhlYWRpbmcgdGV4dCBvZiBoaXN0b3J5IGxpc3QuXG4gICAqIElmIGl0IGlzIG51bGwgdGhlbiBoaXN0b3J5IGhlYWRpbmcgaXMgaGlkZGVuLlxuICAgKi9cbiAgQElucHV0KCkgcHVibGljIGhpc3RvcnlIZWFkaW5nID0gJ1JlY2VudGx5IHNlbGVjdGVkJztcbiAgQElucHV0KCkgcHVibGljIGhpc3RvcnlMaXN0TWF4TnVtYmVyID0gMTU7IC8vIG1heGltdW0gbnVtYmVyIG9mIGl0ZW1zIGluIHRoZSBoaXN0b3J5IGxpc3QuXG4gIEBJbnB1dCgpIHB1YmxpYyBub3RGb3VuZFRleHQgPSAnTm90IGZvdW5kJzsgLy8gc2V0IGN1c3RvbSB0ZXh0IHdoZW4gZmlsdGVyIHJldHVybnMgZW1wdHkgcmVzdWx0XG4gIEBJbnB1dCgpIHB1YmxpYyBpc0xvYWRpbmc6IEJvb2xlYW47IC8vIGxvYWRpbmcgbWFza1xuICBASW5wdXQoKSBwdWJsaWMgZGVib3VuY2VUaW1lOiA0MDA7IC8vIGRlbGF5IHRpbWUgd2hpbGUgdHlwaW5nXG4gIC8qKlxuICAgKiBUaGUgbWluaW11bSBudW1iZXIgb2YgY2hhcmFjdGVycyB0aGUgdXNlciBtdXN0IHR5cGUgYmVmb3JlIGEgc2VhcmNoIGlzIHBlcmZvcm1lZC5cbiAgICovXG4gIEBJbnB1dCgpIHB1YmxpYyBtaW5RdWVyeUxlbmd0aCA9IDE7XG5cblxuICAvLyBvdXRwdXQgZXZlbnRzXG4gIC8qKiBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbmV2ZXIgYW4gaXRlbSBmcm9tIHRoZSBsaXN0IGlzIHNlbGVjdGVkLiAqL1xuICBAT3V0cHV0KCkgc2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKiogRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW5ldmVyIGFuIGlucHV0IGlzIGNoYW5nZWQuICovXG4gIEBPdXRwdXQoKSBpbnB1dENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKiogRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW5ldmVyIGFuIGlucHV0IGlzIGZvY3VzZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBpbnB1dEZvY3VzZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW5ldmVyIGFuIGlucHV0IGlzIGNsZWFyZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBpbnB1dENsZWFyZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW4gdGhlIGF1dG9jb21wbGV0ZSBwYW5lbCBpcyBvcGVuZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBvcGVuZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW4gdGhlIGF1dG9jb21wbGV0ZSBwYW5lbCBpcyBjbG9zZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBjbG9zZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW4gc2Nyb2xsZWQgdG8gdGhlIGVuZCBvZiBpdGVtcy4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHNjcm9sbGVkVG9FbmQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuXG4gIC8vIGN1c3RvbSB0ZW1wbGF0ZXNcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZilcbiAgQElucHV0KCkgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBASW5wdXQoKSBub3RGb3VuZFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBQcm9wYWdhdGVzIG5ldyB2YWx1ZSB3aGVuIG1vZGVsIGNoYW5nZXNcbiAgICovXG4gIHByb3BhZ2F0ZUNoYW5nZTogYW55ID0gKCkgPT4ge1xuICB9O1xuXG5cbiAgLyoqXG4gICAqIFdyaXRlcyBhIG5ldyB2YWx1ZSBmcm9tIHRoZSBmb3JtIG1vZGVsIGludG8gdGhlIHZpZXcsXG4gICAqIFVwZGF0ZXMgbW9kZWxcbiAgICovXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5xdWVyeSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSBoYW5kbGVyIHRoYXQgaXMgY2FsbGVkIHdoZW4gc29tZXRoaW5nIGluIHRoZSB2aWV3IGhhcyBjaGFuZ2VkXG4gICAqL1xuICByZWdpc3Rlck9uQ2hhbmdlKGZuKSB7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSBoYW5kbGVyIHNwZWNpZmljYWxseSBmb3Igd2hlbiBhIGNvbnRyb2wgcmVjZWl2ZXMgYSB0b3VjaCBldmVudFxuICAgKi9cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSB2YWx1ZSBvZiBhbiBpbnB1dCBlbGVtZW50IGlzIGNoYW5nZWRcbiAgICovXG4gIG9uQ2hhbmdlKGV2ZW50KSB7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHRoaXMuZWxlbWVudFJlZiA9IGVsZW1lbnRSZWY7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmhhbmRsZVNjcm9sbCgpO1xuICAgIHRoaXMuaW5pdEV2ZW50U3RyZWFtKCk7XG4gICAgdGhpcy5zZXRJbml0aWFsVmFsdWUodGhpcy5pbml0aWFsVmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBpbml0aWFsIHZhbHVlXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgcHVibGljIHNldEluaXRpYWxWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMuaW5pdGlhbFZhbHVlKSB7XG4gICAgICB0aGlzLnNlbGVjdCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBzZWFyY2ggcmVzdWx0c1xuICAgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIGNoYW5nZXMgJiZcbiAgICAgIGNoYW5nZXMuZGF0YSAmJlxuICAgICAgQXJyYXkuaXNBcnJheShjaGFuZ2VzLmRhdGEuY3VycmVudFZhbHVlKVxuICAgICkge1xuICAgICAgdGhpcy5oYW5kbGVJdGVtc0NoYW5nZSgpO1xuICAgICAgaWYgKCFjaGFuZ2VzLmRhdGEuZmlyc3RDaGFuZ2UgJiYgdGhpcy5pc0ZvY3VzZWQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVPcGVuKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEl0ZW1zIGNoYW5nZVxuICAgKi9cbiAgcHVibGljIGhhbmRsZUl0ZW1zQ2hhbmdlKCkge1xuICAgIHRoaXMuaXNTY3JvbGxUb0VuZCA9IGZhbHNlO1xuICAgIGlmICghdGhpcy5pc09wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmZpbHRlcmVkTGlzdCA9IHRoaXMuZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaWx0ZXIgZGF0YVxuICAgKi9cbiAgcHVibGljIGZpbHRlckxpc3QoKSB7XG4gICAgdGhpcy5zZWxlY3RlZElkeCA9IC0xO1xuICAgIHRoaXMuaW5pdFNlYXJjaEhpc3RvcnkoKTtcbiAgICBpZiAodGhpcy5xdWVyeSAhPSBudWxsICYmIHRoaXMuZGF0YSkge1xuICAgICAgdGhpcy50b0hpZ2hsaWdodCA9IHRoaXMucXVlcnk7XG4gICAgICB0aGlzLmZpbHRlcmVkTGlzdCA9IHRoaXMuZGF0YS5maWx0ZXIoKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgLy8gc3RyaW5nIGxvZ2ljLCBjaGVjayBlcXVhbGl0eSBvZiBzdHJpbmdzXG4gICAgICAgICAgcmV0dXJuIGl0ZW0udG9Mb3dlckNhc2UoKS5pbmRleE9mKHRoaXMucXVlcnkudG9Mb3dlckNhc2UoKSkgPiAtMTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcgJiYgaXRlbS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICAgICAgLy8gb2JqZWN0IGxvZ2ljLCBjaGVjayBwcm9wZXJ0eSBlcXVhbGl0eVxuICAgICAgICAgIHJldHVybiBpdGVtW3RoaXMuc2VhcmNoS2V5d29yZF0udG9Mb3dlckNhc2UoKS5pbmRleE9mKHRoaXMucXVlcnkudG9Mb3dlckNhc2UoKSkgPiAtMTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubm90Rm91bmQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBDaGVjayB0eXBlIG9mIGl0ZW0gaW4gdGhlIGxpc3QuXG4gICAqIEBwYXJhbSBpdGVtXG4gICAqL1xuICBpc1R5cGUoaXRlbSkge1xuICAgIHJldHVybiB0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZyc7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IGl0ZW0gaW4gdGhlIGxpc3QuXG4gICAqIEBwYXJhbSBpdGVtXG4gICAqL1xuICBwdWJsaWMgc2VsZWN0KGl0ZW0pIHtcbiAgICB0aGlzLnF1ZXJ5ID0gIXRoaXMuaXNUeXBlKGl0ZW0pID8gaXRlbVt0aGlzLnNlYXJjaEtleXdvcmRdIDogaXRlbTtcbiAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgdGhpcy5zZWxlY3RlZC5lbWl0KGl0ZW0pO1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKGl0ZW0pO1xuXG4gICAgaWYgKHRoaXMuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAvLyBjaGVjayBpZiBoaXN0b3J5IGFscmVhZHkgZXhpc3RzIGluIGxvY2FsU3RvcmFnZSBhbmQgdGhlbiB1cGRhdGVcbiAgICAgIGNvbnN0IGhpc3RvcnkgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7dGhpcy5oaXN0b3J5SWRlbnRpZmllcn1gKTtcbiAgICAgIGlmIChoaXN0b3J5KSB7XG4gICAgICAgIGxldCBleGlzdGluZ0hpc3RvcnkgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVtgJHt0aGlzLmhpc3RvcnlJZGVudGlmaWVyfWBdKTtcbiAgICAgICAgaWYgKCEoZXhpc3RpbmdIaXN0b3J5IGluc3RhbmNlb2YgQXJyYXkpKSBleGlzdGluZ0hpc3RvcnkgPSBbXTtcblxuICAgICAgICAvLyBjaGVjayBpZiBzZWxlY3RlZCBpdGVtIGV4aXN0cyBpbiBleGlzdGluZ0hpc3RvcnlcbiAgICAgICAgaWYgKCFleGlzdGluZ0hpc3Rvcnkuc29tZSgoZXhpc3RpbmdJdGVtKSA9PiAhdGhpcy5pc1R5cGUoZXhpc3RpbmdJdGVtKVxuICAgICAgICAgID8gZXhpc3RpbmdJdGVtW3RoaXMuc2VhcmNoS2V5d29yZF0gPT0gaXRlbVt0aGlzLnNlYXJjaEtleXdvcmRdIDogZXhpc3RpbmdJdGVtID09IGl0ZW0pKSB7XG4gICAgICAgICAgZXhpc3RpbmdIaXN0b3J5LnVuc2hpZnQoaXRlbSk7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYCR7dGhpcy5oaXN0b3J5SWRlbnRpZmllcn1gLCBKU09OLnN0cmluZ2lmeShleGlzdGluZ0hpc3RvcnkpKTtcblxuICAgICAgICAgIC8vIGNoZWNrIGlmIGl0ZW1zIGRvbid0IGV4Y2VlZCBtYXggYWxsb3dlZCBudW1iZXJcbiAgICAgICAgICBpZiAoZXhpc3RpbmdIaXN0b3J5Lmxlbmd0aCA+PSB0aGlzLmhpc3RvcnlMaXN0TWF4TnVtYmVyKSB7XG4gICAgICAgICAgICBleGlzdGluZ0hpc3Rvcnkuc3BsaWNlKGV4aXN0aW5nSGlzdG9yeS5sZW5ndGggLSAxLCAxKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGAke3RoaXMuaGlzdG9yeUlkZW50aWZpZXJ9YCwgSlNPTi5zdHJpbmdpZnkoZXhpc3RpbmdIaXN0b3J5KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGlmIHNlbGVjdGVkIGl0ZW0gZXhpc3RzIGluIGV4aXN0aW5nSGlzdG9yeSBzd2FwIHRvIHRvcCBpbiBhcnJheVxuICAgICAgICAgIGlmICghdGhpcy5pc1R5cGUoaXRlbSkpIHtcbiAgICAgICAgICAgIC8vIG9iamVjdCBsb2dpY1xuICAgICAgICAgICAgY29uc3QgY29waWVkRXhpc3RpbmdIaXN0b3J5ID0gZXhpc3RpbmdIaXN0b3J5LnNsaWNlKCk7IC8vIGNvcHkgb3JpZ2luYWwgZXhpc3RpbmdIaXN0b3J5IGFycmF5XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gY29waWVkRXhpc3RpbmdIaXN0b3J5Lm1hcCgoZWwpID0+IGVsW3RoaXMuc2VhcmNoS2V5d29yZF0pLmluZGV4T2YoaXRlbVt0aGlzLnNlYXJjaEtleXdvcmRdKTtcbiAgICAgICAgICAgIGNvcGllZEV4aXN0aW5nSGlzdG9yeS5zcGxpY2Uoc2VsZWN0ZWRJbmRleCwgMSk7XG4gICAgICAgICAgICBjb3BpZWRFeGlzdGluZ0hpc3Rvcnkuc3BsaWNlKDAsIDAsIGl0ZW0pO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYCR7dGhpcy5oaXN0b3J5SWRlbnRpZmllcn1gLCBKU09OLnN0cmluZ2lmeShjb3BpZWRFeGlzdGluZ0hpc3RvcnkpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc3RyaW5nIGxvZ2ljXG4gICAgICAgICAgICBjb25zdCBjb3BpZWRFeGlzdGluZ0hpc3RvcnkgPSBleGlzdGluZ0hpc3Rvcnkuc2xpY2UoKTsgLy8gY29weSBvcmlnaW5hbCBleGlzdGluZ0hpc3RvcnkgYXJyYXlcbiAgICAgICAgICAgIGNvcGllZEV4aXN0aW5nSGlzdG9yeS5zcGxpY2UoY29waWVkRXhpc3RpbmdIaXN0b3J5LmluZGV4T2YoaXRlbSksIDEpO1xuICAgICAgICAgICAgY29waWVkRXhpc3RpbmdIaXN0b3J5LnNwbGljZSgwLCAwLCBpdGVtKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGAke3RoaXMuaGlzdG9yeUlkZW50aWZpZXJ9YCwgSlNPTi5zdHJpbmdpZnkoY29waWVkRXhpc3RpbmdIaXN0b3J5KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNhdmVIaXN0b3J5KGl0ZW0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNhdmVIaXN0b3J5KGl0ZW0pO1xuICAgIH1cbiAgICB0aGlzLmhhbmRsZUNsb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogRG9jdW1lbnQgY2xpY2tcbiAgICogQHBhcmFtIGUgZXZlbnRcbiAgICovXG4gIHB1YmxpYyBoYW5kbGVDbGljayhlKSB7XG4gICAgbGV0IGNsaWNrZWRDb21wb25lbnQgPSBlLnRhcmdldDtcbiAgICBsZXQgaW5zaWRlID0gZmFsc2U7XG4gICAgZG8ge1xuICAgICAgaWYgKGNsaWNrZWRDb21wb25lbnQgPT09IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgIGluc2lkZSA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLmZpbHRlcmVkTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLmhhbmRsZU9wZW4oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2xpY2tlZENvbXBvbmVudCA9IGNsaWNrZWRDb21wb25lbnQucGFyZW50Tm9kZTtcbiAgICB9IHdoaWxlIChjbGlja2VkQ29tcG9uZW50KTtcbiAgICBpZiAoIWluc2lkZSkge1xuICAgICAgdGhpcy5oYW5kbGVDbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTY3JvbGwgaXRlbXNcbiAgICovXG4gIHB1YmxpYyBoYW5kbGVTY3JvbGwoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5maWx0ZXJlZExpc3RFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzY3JvbGwnLCAoKSA9PiB7XG4gICAgICB0aGlzLnNjcm9sbFRvRW5kKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lIHBhbmVsIHN0YXRlXG4gICAqL1xuICBzZXRQYW5lbFN0YXRlKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gICAgLy8gSWYgY29udHJvbHMgYXJlIHVudG91Y2hlZFxuICAgIGlmICh0eXBlb2YgdGhpcy5tYW51YWxPcGVuID09PSAndW5kZWZpbmVkJ1xuICAgICAgJiYgdHlwZW9mIHRoaXMubWFudWFsQ2xvc2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgdGhpcy5oYW5kbGVPcGVuKCk7XG4gICAgfVxuXG4gICAgLy8gSWYgb25lIG9mIHRoZSBjb250cm9scyBpcyB1bnRvdWNoZWQgYW5kIG90aGVyIGlzIGRlYWN0aXZhdGVkXG4gICAgaWYgKHR5cGVvZiB0aGlzLm1hbnVhbE9wZW4gPT09ICd1bmRlZmluZWQnXG4gICAgICAmJiB0aGlzLm1hbnVhbENsb3NlID09PSBmYWxzZVxuICAgICAgfHwgdHlwZW9mIHRoaXMubWFudWFsQ2xvc2UgPT09ICd1bmRlZmluZWQnXG4gICAgICAmJiB0aGlzLm1hbnVhbE9wZW4gPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgdGhpcy5oYW5kbGVPcGVuKCk7XG4gICAgfVxuXG4gICAgLy8gaWYgY29udHJvbHMgYXJlIHRvdWNoZWQgYnV0IGJvdGggYXJlIGRlYWN0aXZhdGVkXG4gICAgaWYgKHRoaXMubWFudWFsT3BlbiA9PT0gZmFsc2UgJiYgdGhpcy5tYW51YWxDbG9zZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICB0aGlzLmhhbmRsZU9wZW4oKTtcbiAgICB9XG5cbiAgICAvLyBpZiBvcGVuIGNvbnRyb2wgaXMgdG91Y2hlZCBhbmQgYWN0aXZhdGVkXG4gICAgaWYgKHRoaXMubWFudWFsT3Blbikge1xuICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgIHRoaXMuaGFuZGxlT3BlbigpO1xuICAgICAgdGhpcy5tYW51YWxPcGVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gaWYgY2xvc2UgY29udHJvbCBpcyB0b3VjaGVkIGFuZCBhY3RpdmF0ZWRcbiAgICBpZiAodGhpcy5tYW51YWxDbG9zZSkge1xuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgdGhpcy5oYW5kbGVDbG9zZSgpO1xuICAgICAgdGhpcy5tYW51YWxDbG9zZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNYW51YWwgY29udHJvbHNcbiAgICovXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5tYW51YWxPcGVuID0gdHJ1ZTtcbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgIHRoaXMuaGFuZGxlT3BlbigpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5tYW51YWxDbG9zZSA9IHRydWU7XG4gICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgIHRoaXMuaGFuZGxlQ2xvc2UoKTtcbiAgfVxuXG4gIGZvY3VzKCkge1xuICAgIHRoaXMuaGFuZGxlRm9jdXMoZXZlbnQpO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5yZW1vdmUoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBzZWFyY2ggcXVlcnlcbiAgICovXG4gIHB1YmxpYyByZW1vdmUoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5xdWVyeSA9ICcnO1xuICAgIHRoaXMuaW5wdXRDbGVhcmVkLmVtaXQoKTtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLnF1ZXJ5KTtcbiAgICB0aGlzLnNldFBhbmVsU3RhdGUoZSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBoaXN0b3J5TGlzdCBzZWFyY2hcbiAgICovXG4gIGluaXRTZWFyY2hIaXN0b3J5KCkge1xuICAgIHRoaXMuaXNIaXN0b3J5TGlzdFZpc2libGUgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5oaXN0b3J5SWRlbnRpZmllciAmJiAhdGhpcy5xdWVyeSkge1xuICAgICAgY29uc3QgaGlzdG9yeSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHt0aGlzLmhpc3RvcnlJZGVudGlmaWVyfWApO1xuICAgICAgaWYgKGhpc3RvcnkpIHtcbiAgICAgICAgdGhpcy5pc0hpc3RvcnlMaXN0VmlzaWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZmlsdGVyZWRMaXN0ID0gW107XG4gICAgICAgIHRoaXMuaGlzdG9yeUxpc3QgPSBoaXN0b3J5ID8gSlNPTi5wYXJzZShoaXN0b3J5KSA6IFtdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pc0hpc3RvcnlMaXN0VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzSGlzdG9yeUxpc3RWaXNpYmxlID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlT3BlbigpIHtcbiAgICBpZiAodGhpcy5pc09wZW4gfHwgdGhpcy5pc09wZW4gJiYgIXRoaXMuaXNMb2FkaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIElmIGRhdGEgZXhpc3RzXG4gICAgaWYgKHRoaXMuZGF0YSAmJiB0aGlzLmRhdGEubGVuZ3RoKSB7XG4gICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICB0aGlzLmZpbHRlckxpc3QoKTtcbiAgICAgIHRoaXMub3BlbmVkLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDbG9zZSgpIHtcbiAgICBpZiAoIXRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLmlzRm9jdXNlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgIHRoaXMuZmlsdGVyZWRMaXN0ID0gW107XG4gICAgdGhpcy5zZWxlY3RlZElkeCA9IC0xO1xuICAgIHRoaXMubm90Rm91bmQgPSBmYWxzZTtcbiAgICB0aGlzLmlzSGlzdG9yeUxpc3RWaXNpYmxlID0gZmFsc2U7XG4gICAgdGhpcy5pc0ZvY3VzZWQgPSBmYWxzZTtcbiAgICB0aGlzLmNsb3NlZC5lbWl0KCk7XG4gIH1cblxuICBoYW5kbGVGb2N1cyhlKSB7XG4gICAgLy90aGlzLnNlYXJjaElucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICBpZiAodGhpcy5pc0ZvY3VzZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5pbnB1dEZvY3VzZWQuZW1pdChlKTtcbiAgICAvLyBpZiBkYXRhIGV4aXN0cyB0aGVuIG9wZW5cbiAgICBpZiAodGhpcy5kYXRhICYmIHRoaXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgIHRoaXMuc2V0UGFuZWxTdGF0ZShldmVudCk7XG4gICAgfVxuICAgIHRoaXMuaXNGb2N1c2VkID0gdHJ1ZTtcbiAgfVxuXG4gIHNjcm9sbFRvRW5kKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzU2Nyb2xsVG9FbmQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzY3JvbGxUb3AgPSB0aGlzLmZpbHRlcmVkTGlzdEVsZW1lbnQubmF0aXZlRWxlbWVudFxuICAgICAgLnNjcm9sbFRvcDtcbiAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSB0aGlzLmZpbHRlcmVkTGlzdEVsZW1lbnQubmF0aXZlRWxlbWVudFxuICAgICAgLnNjcm9sbEhlaWdodDtcbiAgICBjb25zdCBlbGVtZW50SGVpZ2h0ID0gdGhpcy5maWx0ZXJlZExpc3RFbGVtZW50Lm5hdGl2ZUVsZW1lbnRcbiAgICAgIC5jbGllbnRIZWlnaHQ7XG4gICAgY29uc3QgYXRCb3R0b20gPSBzY3JvbGxIZWlnaHQgPT09IHNjcm9sbFRvcCArIGVsZW1lbnRIZWlnaHQ7XG4gICAgaWYgKGF0Qm90dG9tKSB7XG4gICAgICB0aGlzLnNjcm9sbGVkVG9FbmQuZW1pdCgpO1xuICAgICAgdGhpcy5pc1Njcm9sbFRvRW5kID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBrZXlib2FyZCBldmVudHNcbiAgICovXG4gIGluaXRFdmVudFN0cmVhbSgpIHtcbiAgICB0aGlzLmlucHV0S2V5VXAkID0gZnJvbUV2ZW50KFxuICAgICAgdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LCAna2V5dXAnXG4gICAgKS5waXBlKG1hcChcbiAgICAgIChlOiBhbnkpID0+IGVcbiAgICApKTtcblxuICAgIHRoaXMuaW5wdXRLZXlEb3duJCA9IGZyb21FdmVudChcbiAgICAgIHRoaXMuc2VhcmNoSW5wdXQubmF0aXZlRWxlbWVudCxcbiAgICAgICdrZXlkb3duJ1xuICAgICkucGlwZShtYXAoXG4gICAgICAoZTogYW55KSA9PiBlXG4gICAgKSk7XG5cbiAgICB0aGlzLmxpc3RlbkV2ZW50U3RyZWFtKCk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuIGtleWJvYXJkIGV2ZW50c1xuICAgKi9cbiAgbGlzdGVuRXZlbnRTdHJlYW0oKSB7XG4gICAgLy8ga2V5IHVwIGV2ZW50XG4gICAgdGhpcy5pbnB1dEtleVVwJFxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcihlID0+XG4gICAgICAgICAgIWlzQXJyb3dVcERvd24oZS5rZXlDb2RlKSAmJlxuICAgICAgICAgICFpc0VudGVyKGUua2V5Q29kZSkgJiZcbiAgICAgICAgICAhaXNFU0MoZS5rZXlDb2RlKSAmJlxuICAgICAgICAgICFpc1RhYihlLmtleUNvZGUpKSxcbiAgICAgICAgZGVib3VuY2VUaW1lKHRoaXMuZGVib3VuY2VUaW1lKVxuICAgICAgKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICB0aGlzLm9uS2V5VXAoZSk7XG4gICAgfSk7XG5cbiAgICAvLyBjdXJzb3IgdXAgJiBkb3duXG4gICAgdGhpcy5pbnB1dEtleURvd24kLnBpcGUoZmlsdGVyKFxuICAgICAgZSA9PiBpc0Fycm93VXBEb3duKGUua2V5Q29kZSlcbiAgICApKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLm9uRm9jdXNJdGVtKGUpO1xuICAgIH0pO1xuXG4gICAgLy8gZW50ZXIga2V5dXBcbiAgICB0aGlzLmlucHV0S2V5VXAkLnBpcGUoZmlsdGVyKGUgPT4gaXNFbnRlcihlLmtleUNvZGUpKSkuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgLy90aGlzLm9uSGFuZGxlRW50ZXIoKTtcbiAgICB9KTtcblxuICAgIC8vIGVudGVyIGtleWRvd25cbiAgICB0aGlzLmlucHV0S2V5RG93biQucGlwZShmaWx0ZXIoZSA9PiBpc0VudGVyKGUua2V5Q29kZSkpKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICB0aGlzLm9uSGFuZGxlRW50ZXIoKTtcbiAgICB9KTtcblxuICAgIC8vIEVTQ1xuICAgIHRoaXMuaW5wdXRLZXlVcCQucGlwZShcbiAgICAgIGZpbHRlcihlID0+IGlzRVNDKGUua2V5Q29kZSksXG4gICAgICAgIGRlYm91bmNlVGltZSgxMDApKVxuICAgICkuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgdGhpcy5vbkVzYygpO1xuICAgIH0pO1xuXG4gICAgLy8gZGVsZXRlXG4gICAgdGhpcy5pbnB1dEtleURvd24kLnBpcGUoXG4gICAgICBmaWx0ZXIoZSA9PiBpc0JhY2tzcGFjZShlLmtleUNvZGUpIHx8IGlzRGVsZXRlKGUua2V5Q29kZSkpXG4gICAgKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICB0aGlzLm9uRGVsZXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogb24ga2V5dXAgPT0gd2hlbiBpbnB1dCBjaGFuZ2VkXG4gICAqIEBwYXJhbSBlIGV2ZW50XG4gICAqL1xuICBvbktleVVwKGUpIHtcbiAgICB0aGlzLm5vdEZvdW5kID0gZmFsc2U7IC8vIHNlYXJjaCByZXN1bHRzIGFyZSB1bmtub3duIHdoaWxlIHR5cGluZ1xuICAgIC8vIGlmIGlucHV0IGlzIGVtcHR5XG4gICAgaWYgKCF0aGlzLnF1ZXJ5KSB7XG4gICAgICB0aGlzLm5vdEZvdW5kID0gZmFsc2U7XG4gICAgICB0aGlzLmlucHV0Q2hhbmdlZC5lbWl0KGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgIHRoaXMuaW5wdXRDbGVhcmVkLmVtaXQoKTtcbiAgICAgIC8vdGhpcy5maWx0ZXJMaXN0KCk7XG4gICAgICB0aGlzLnNldFBhbmVsU3RhdGUoZSk7XG4gICAgfVxuICAgIC8vIGlmIHF1ZXJ5ID49IHRvIG1pblF1ZXJ5TGVuZ3RoXG4gICAgaWYgKHRoaXMucXVlcnkubGVuZ3RoID49IHRoaXMubWluUXVlcnlMZW5ndGgpIHtcbiAgICAgIHRoaXMuaW5wdXRDaGFuZ2VkLmVtaXQoZS50YXJnZXQudmFsdWUpO1xuICAgICAgdGhpcy5maWx0ZXJMaXN0KCk7XG5cbiAgICAgIC8vIElmIG5vIHJlc3VsdHMgZm91bmRcbiAgICAgIGlmICghdGhpcy5maWx0ZXJlZExpc3QubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubm90Rm91bmRUZXh0ID8gdGhpcy5ub3RGb3VuZCA9IHRydWUgOiB0aGlzLm5vdEZvdW5kID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogS2V5Ym9hcmQgYXJyb3cgdG9wIGFuZCBhcnJvdyBib3R0b21cbiAgICogQHBhcmFtIGUgZXZlbnRcbiAgICovXG4gIG9uRm9jdXNJdGVtKGUpIHtcbiAgICAvLyBtb3ZlIGFycm93IHVwIGFuZCBkb3duIG9uIGZpbHRlcmVkTGlzdCBvciBoaXN0b3J5TGlzdFxuICAgIGlmICghdGhpcy5oaXN0b3J5TGlzdC5sZW5ndGggfHwgIXRoaXMuaXNIaXN0b3J5TGlzdFZpc2libGUpIHtcbiAgICAgIC8vIGZpbHRlcmVkTGlzdFxuICAgICAgY29uc3QgdG90YWxOdW1JdGVtID0gdGhpcy5maWx0ZXJlZExpc3QubGVuZ3RoO1xuICAgICAgaWYgKGUuY29kZSA9PT0gJ0Fycm93RG93bicpIHtcbiAgICAgICAgbGV0IHN1bSA9IHRoaXMuc2VsZWN0ZWRJZHg7XG4gICAgICAgIHN1bSA9ICh0aGlzLnNlbGVjdGVkSWR4ID09PSBudWxsKSA/IDAgOiBzdW0gKyAxO1xuICAgICAgICB0aGlzLnNlbGVjdGVkSWR4ID0gKHRvdGFsTnVtSXRlbSArIHN1bSkgJSB0b3RhbE51bUl0ZW07XG4gICAgICAgIHRoaXMuc2Nyb2xsVG9Gb2N1c2VkSXRlbSh0aGlzLnNlbGVjdGVkSWR4KTtcbiAgICAgIH0gZWxzZSBpZiAoZS5jb2RlID09PSAnQXJyb3dVcCcpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJZHggPT0gLTEpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkSWR4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbGVjdGVkSWR4ID0gKHRvdGFsTnVtSXRlbSArIHRoaXMuc2VsZWN0ZWRJZHggLSAxKSAlIHRvdGFsTnVtSXRlbTtcbiAgICAgICAgdGhpcy5zY3JvbGxUb0ZvY3VzZWRJdGVtKHRoaXMuc2VsZWN0ZWRJZHgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoaXN0b3J5TGlzdFxuICAgICAgY29uc3QgdG90YWxOdW1JdGVtID0gdGhpcy5oaXN0b3J5TGlzdC5sZW5ndGg7XG4gICAgICBpZiAoZS5jb2RlID09PSAnQXJyb3dEb3duJykge1xuICAgICAgICBsZXQgc3VtID0gdGhpcy5zZWxlY3RlZElkeDtcbiAgICAgICAgc3VtID0gKHRoaXMuc2VsZWN0ZWRJZHggPT09IG51bGwpID8gMCA6IHN1bSArIDE7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJZHggPSAodG90YWxOdW1JdGVtICsgc3VtKSAlIHRvdGFsTnVtSXRlbTtcbiAgICAgICAgdGhpcy5zY3JvbGxUb0ZvY3VzZWRJdGVtKHRoaXMuc2VsZWN0ZWRJZHgpO1xuICAgICAgfSBlbHNlIGlmIChlLmNvZGUgPT09ICdBcnJvd1VwJykge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZElkeCA9PSAtMSkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJZHggPSAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJZHggPSAodG90YWxOdW1JdGVtICsgdGhpcy5zZWxlY3RlZElkeCAtIDEpICUgdG90YWxOdW1JdGVtO1xuICAgICAgICB0aGlzLnNjcm9sbFRvRm9jdXNlZEl0ZW0odGhpcy5zZWxlY3RlZElkeCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbCB0byBmb2N1c2VkIGl0ZW1cbiAgICogKiBAcGFyYW0gaW5kZXhcbiAgICovXG4gIHNjcm9sbFRvRm9jdXNlZEl0ZW0oaW5kZXgpIHtcbiAgICBsZXQgbGlzdEVsZW1lbnQgPSBudWxsO1xuICAgIC8vIERlZmluZSBsaXN0IGVsZW1lbnRcbiAgICBpZiAoIXRoaXMuaGlzdG9yeUxpc3QubGVuZ3RoIHx8ICF0aGlzLmlzSGlzdG9yeUxpc3RWaXNpYmxlKSB7XG4gICAgICAvLyBmaWx0ZXJlZExpc3QgZWxlbWVudFxuICAgICAgbGlzdEVsZW1lbnQgPSB0aGlzLmZpbHRlcmVkTGlzdEVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGlzdG9yeUxpc3QgZWxlbWVudFxuICAgICAgbGlzdEVsZW1lbnQgPSB0aGlzLmhpc3RvcnlMaXN0RWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIGNvbnN0IGl0ZW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobGlzdEVsZW1lbnQuY2hpbGROb2RlcykuZmlsdGVyKChub2RlOiBhbnkpID0+IHtcbiAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAgIC8vIGlmIG5vZGUgaXMgZWxlbWVudFxuICAgICAgICByZXR1cm4gbm9kZS5jbGFzc05hbWUuaW5jbHVkZXMoJ2l0ZW0nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICghaXRlbXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbGlzdEhlaWdodCA9IGxpc3RFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBpdGVtSGVpZ2h0ID0gaXRlbXNbaW5kZXhdLm9mZnNldEhlaWdodDtcbiAgICBjb25zdCB2aXNpYmxlVG9wID0gbGlzdEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIGNvbnN0IHZpc2libGVCb3R0b20gPSBsaXN0RWxlbWVudC5zY3JvbGxUb3AgKyBsaXN0SGVpZ2h0IC0gaXRlbUhlaWdodDtcbiAgICBjb25zdCB0YXJnZXRQb3NpdGlvbiA9IGl0ZW1zW2luZGV4XS5vZmZzZXRUb3A7XG5cbiAgICBpZiAodGFyZ2V0UG9zaXRpb24gPCB2aXNpYmxlVG9wKSB7XG4gICAgICBsaXN0RWxlbWVudC5zY3JvbGxUb3AgPSB0YXJnZXRQb3NpdGlvbjtcbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0UG9zaXRpb24gPiB2aXNpYmxlQm90dG9tKSB7XG4gICAgICBsaXN0RWxlbWVudC5zY3JvbGxUb3AgPSB0YXJnZXRQb3NpdGlvbiAtIGxpc3RIZWlnaHQgKyBpdGVtSGVpZ2h0O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgaXRlbSBvbiBlbnRlciBjbGlja1xuICAgKi9cbiAgb25IYW5kbGVFbnRlcigpIHtcbiAgICAvLyBjbGljayBlbnRlciB0byBjaG9vc2UgaXRlbSBmcm9tIGZpbHRlcmVkTGlzdCBvciBoaXN0b3J5TGlzdFxuICAgIGlmICh0aGlzLnNlbGVjdGVkSWR4ID4gLTEpIHtcbiAgICAgIGlmICghdGhpcy5oaXN0b3J5TGlzdC5sZW5ndGggfHwgIXRoaXMuaXNIaXN0b3J5TGlzdFZpc2libGUpIHtcbiAgICAgICAgLy8gZmlsdGVyZWRMaXN0XG4gICAgICAgIHRoaXMucXVlcnkgPSAhdGhpcy5pc1R5cGUodGhpcy5maWx0ZXJlZExpc3RbdGhpcy5zZWxlY3RlZElkeF0pXG4gICAgICAgICAgPyB0aGlzLmZpbHRlcmVkTGlzdFt0aGlzLnNlbGVjdGVkSWR4XVt0aGlzLnNlYXJjaEtleXdvcmRdXG4gICAgICAgICAgOiB0aGlzLmZpbHRlcmVkTGlzdFt0aGlzLnNlbGVjdGVkSWR4XTtcblxuICAgICAgICB0aGlzLnNhdmVIaXN0b3J5KHRoaXMuZmlsdGVyZWRMaXN0W3RoaXMuc2VsZWN0ZWRJZHhdKTtcbiAgICAgICAgdGhpcy5zZWxlY3QodGhpcy5maWx0ZXJlZExpc3RbdGhpcy5zZWxlY3RlZElkeF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaGlzdG9yeUxpc3RcbiAgICAgICAgdGhpcy5xdWVyeSA9ICF0aGlzLmlzVHlwZSh0aGlzLmhpc3RvcnlMaXN0W3RoaXMuc2VsZWN0ZWRJZHhdKVxuICAgICAgICAgID8gdGhpcy5oaXN0b3J5TGlzdFt0aGlzLnNlbGVjdGVkSWR4XVt0aGlzLnNlYXJjaEtleXdvcmRdXG4gICAgICAgICAgOiB0aGlzLmhpc3RvcnlMaXN0W3RoaXMuc2VsZWN0ZWRJZHhdO1xuICAgICAgICB0aGlzLnNhdmVIaXN0b3J5KHRoaXMuaGlzdG9yeUxpc3RbdGhpcy5zZWxlY3RlZElkeF0pO1xuICAgICAgICB0aGlzLnNlbGVjdCh0aGlzLmhpc3RvcnlMaXN0W3RoaXMuc2VsZWN0ZWRJZHhdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5pc0hpc3RvcnlMaXN0VmlzaWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuaGFuZGxlQ2xvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFc2MgY2xpY2tcbiAgICovXG4gIG9uRXNjKCkge1xuICAgIHRoaXMuc2VhcmNoSW5wdXQubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgdGhpcy5oYW5kbGVDbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBjbGlja1xuICAgKi9cbiAgb25EZWxldGUoKSB7XG4gICAgLy8gcGFuZWwgaXMgb3BlbiBvbiBkZWxldGVcbiAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBTZWxlY3QgaXRlbSB0byBzYXZlIGluIGxvY2FsU3RvcmFnZVxuICAgKiBAcGFyYW0gc2VsZWN0ZWRcbiAgICovXG4gIHNhdmVIaXN0b3J5KHNlbGVjdGVkKSB7XG4gICAgaWYgKHRoaXMuaGlzdG9yeUlkZW50aWZpZXIpIHtcbiAgICAgIC8vIGNoZWNrIGlmIHNlbGVjdGVkIGl0ZW0gZXhpc3RzIGluIGhpc3RvcnlMaXN0XG4gICAgICBpZiAoIXRoaXMuaGlzdG9yeUxpc3Quc29tZSgoaXRlbSkgPT4gIXRoaXMuaXNUeXBlKGl0ZW0pXG4gICAgICAgID8gaXRlbVt0aGlzLnNlYXJjaEtleXdvcmRdID09IHNlbGVjdGVkW3RoaXMuc2VhcmNoS2V5d29yZF0gOiBpdGVtID09IHNlbGVjdGVkKSkge1xuICAgICAgICB0aGlzLnNhdmVIaXN0b3J5VG9Mb2NhbFN0b3JhZ2UoW3NlbGVjdGVkLCAuLi50aGlzLmhpc3RvcnlMaXN0XSk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgaXRlbXMgZG9uJ3QgZXhjZWVkIG1heCBhbGxvd2VkIG51bWJlclxuICAgICAgICBpZiAodGhpcy5oaXN0b3J5TGlzdC5sZW5ndGggPj0gdGhpcy5oaXN0b3J5TGlzdE1heE51bWJlcikge1xuICAgICAgICAgIHRoaXMuaGlzdG9yeUxpc3Quc3BsaWNlKHRoaXMuaGlzdG9yeUxpc3QubGVuZ3RoIC0gMSwgMSk7XG4gICAgICAgICAgdGhpcy5zYXZlSGlzdG9yeVRvTG9jYWxTdG9yYWdlKFtzZWxlY3RlZCwgLi4udGhpcy5oaXN0b3J5TGlzdF0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpZiBzZWxlY3RlZCBpdGVtIGV4aXN0cyBpbiBoaXN0b3J5TGlzdCBzd2FwIHRvIHRvcCBpbiBhcnJheVxuICAgICAgICBpZiAoIXRoaXMuaXNUeXBlKHNlbGVjdGVkKSkge1xuICAgICAgICAgIC8vIG9iamVjdCBsb2dpY1xuICAgICAgICAgIGNvbnN0IGNvcGllZEhpc3RvcnlMaXN0ID0gdGhpcy5oaXN0b3J5TGlzdC5zbGljZSgpOyAvLyBjb3B5IG9yaWdpbmFsIGhpc3RvcnlMaXN0IGFycmF5XG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IGNvcGllZEhpc3RvcnlMaXN0Lm1hcCgoaXRlbSkgPT4gaXRlbVt0aGlzLnNlYXJjaEtleXdvcmRdKS5pbmRleE9mKHNlbGVjdGVkW3RoaXMuc2VhcmNoS2V5d29yZF0pO1xuICAgICAgICAgIGNvcGllZEhpc3RvcnlMaXN0LnNwbGljZShzZWxlY3RlZEluZGV4LCAxKTtcbiAgICAgICAgICBjb3BpZWRIaXN0b3J5TGlzdC5zcGxpY2UoMCwgMCwgc2VsZWN0ZWQpO1xuICAgICAgICAgIHRoaXMuc2F2ZUhpc3RvcnlUb0xvY2FsU3RvcmFnZShbLi4uY29waWVkSGlzdG9yeUxpc3RdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBzdHJpbmcgbG9naWNcbiAgICAgICAgICBjb25zdCBjb3BpZWRIaXN0b3J5TGlzdCA9IHRoaXMuaGlzdG9yeUxpc3Quc2xpY2UoKTsgLy8gY29weSBvcmlnaW5hbCBoaXN0b3J5TGlzdCBhcnJheVxuICAgICAgICAgIGNvcGllZEhpc3RvcnlMaXN0LnNwbGljZSh0aGlzLmhpc3RvcnlMaXN0LmluZGV4T2Yoc2VsZWN0ZWQpLCAxKTtcbiAgICAgICAgICBjb3BpZWRIaXN0b3J5TGlzdC5zcGxpY2UoMCwgMCwgc2VsZWN0ZWQpO1xuICAgICAgICAgIHRoaXMuc2F2ZUhpc3RvcnlUb0xvY2FsU3RvcmFnZShbLi4uY29waWVkSGlzdG9yeUxpc3RdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlIGl0ZW0gaW4gbG9jYWxTdG9yYWdlXG4gICAqIEBwYXJhbSBzZWxlY3RlZFxuICAgKi9cbiAgc2F2ZUhpc3RvcnlUb0xvY2FsU3RvcmFnZShzZWxlY3RlZCkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgIGAke3RoaXMuaGlzdG9yeUlkZW50aWZpZXJ9YCxcbiAgICAgIEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGl0ZW0gZnJvbSBsb2NhbFN0b3JhZ2VcbiAgICogQHBhcmFtIGluZGV4XG4gICAqIEBwYXJhbSBlIGV2ZW50XG4gICAqL1xuICByZW1vdmVIaXN0b3J5SXRlbShpbmRleCwgZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5oaXN0b3J5TGlzdCA9IHRoaXMuaGlzdG9yeUxpc3QuZmlsdGVyKCh2LCBpKSA9PiBpICE9PSBpbmRleCk7XG4gICAgdGhpcy5zYXZlSGlzdG9yeVRvTG9jYWxTdG9yYWdlKHRoaXMuaGlzdG9yeUxpc3QpO1xuICAgIGlmICh0aGlzLmhpc3RvcnlMaXN0Lmxlbmd0aCA9PSAwKSB7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYCR7dGhpcy5oaXN0b3J5SWRlbnRpZmllcn1gKTtcbiAgICAgIHRoaXMuZmlsdGVyTGlzdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCBsb2NhbFN0b3JhZ2VcbiAgICogQHBhcmFtIGUgZXZlbnRcbiAgICovXG4gIHJlc2V0SGlzdG9yeUxpc3QoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5oaXN0b3J5TGlzdCA9IFtdO1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHt0aGlzLmhpc3RvcnlJZGVudGlmaWVyfWApO1xuICAgIHRoaXMuZmlsdGVyTGlzdCgpO1xuICB9XG59XG5cbkBQaXBlKHtuYW1lOiAnaGlnaGxpZ2h0J30pXG5leHBvcnQgY2xhc3MgSGlnaGxpZ2h0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odGV4dDogYW55LCBzZWFyY2g6IGFueSwgc2VhcmNoS2V5d29yZD86IGFueSk6IGFueSB7XG4gICAgbGV0IHBhdHRlcm4gPSBzZWFyY2gucmVwbGFjZSgvW1xcLVxcW1xcXVxcL1xce1xcfVxcKFxcKVxcKlxcK1xcP1xcLlxcXFxcXF5cXCRcXHxdL2csICdcXFxcJCYnKTtcbiAgICBwYXR0ZXJuID0gcGF0dGVybi5zcGxpdCgnICcpLmZpbHRlcigodCkgPT4ge1xuICAgICAgcmV0dXJuIHQubGVuZ3RoID4gMDtcbiAgICB9KS5qb2luKCd8Jyk7XG4gICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKHBhdHRlcm4sICdnaScpO1xuXG4gICAgaWYgKCFzZWFyY2gpIHtcbiAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cblxuICAgIGlmIChzZWFyY2hLZXl3b3JkKSB7XG4gICAgICBjb25zdCBuYW1lID0gdGV4dFtzZWFyY2hLZXl3b3JkXS5yZXBsYWNlKHJlZ2V4LCAobWF0Y2gpID0+IGA8Yj4ke21hdGNofTwvYj5gKTtcbiAgICAgIC8vIGNvcHkgb3JpZ2luYWwgb2JqZWN0XG4gICAgICBjb25zdCB0ZXh0MiA9IHsuLi50ZXh0fTtcbiAgICAgIC8vIHNldCBib2xkIHZhbHVlIGludG8gc2VhcmNoS2V5d29yZCBvZiBjb3BpZWQgb2JqZWN0XG4gICAgICB0ZXh0MltzZWFyY2hLZXl3b3JkXSA9IG5hbWU7XG4gICAgICByZXR1cm4gdGV4dDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzZWFyY2ggPyB0ZXh0LnJlcGxhY2UocmVnZXgsIChtYXRjaCkgPT4gYDxiPiR7bWF0Y2h9PC9iPmApIDogdGV4dDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBdXRvY29tcGxldGVMaWJDb21wb25lbnR9IGZyb20gJy4vYXV0b2NvbXBsZXRlLWxpYi5jb21wb25lbnQnO1xuaW1wb3J0IHtBdXRvY29tcGxldGVDb21wb25lbnQsIEhpZ2hsaWdodFBpcGV9IGZyb20gJy4vYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQXV0b2NvbXBsZXRlTGliQ29tcG9uZW50LCBBdXRvY29tcGxldGVDb21wb25lbnQsIEhpZ2hsaWdodFBpcGVdLFxuICBleHBvcnRzOiBbQXV0b2NvbXBsZXRlTGliQ29tcG9uZW50LCBBdXRvY29tcGxldGVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEF1dG9jb21wbGV0ZUxpYk1vZHVsZSB7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtJQU9FO0tBQWlCOztnQkFMbEIsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7Ozs7aUNBSkQ7Ozs7Ozs7QUNBQTtJQWFFO0tBQWlCOzs7O0lBRWpCLDJDQUFROzs7SUFBUjtLQUNDOztnQkFkRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFLHdEQUlUO29CQUNELE1BQU0sRUFBRSxFQUFFO2lCQUNYOzs7O21DQVZEOzs7Ozs7Ozs7O0FDb0JBLElBQU0sU0FBUyxHQUFHLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxLQUFLLEVBQUUsR0FBQSxDQUFDOztBQUM1QyxJQUFNLFdBQVcsR0FBRyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sS0FBSyxFQUFFLEdBQUEsQ0FBQzs7QUFDOUMsSUFBTSxhQUFhLEdBQUcsVUFBQSxPQUFPLElBQUksT0FBQSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFBLENBQUM7O0FBQzVFLElBQU0sT0FBTyxHQUFHLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxLQUFLLEVBQUUsR0FBQSxDQUFDOztBQUMxQyxJQUFNLFdBQVcsR0FBRyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sS0FBSyxDQUFDLEdBQUEsQ0FBQzs7QUFDN0MsSUFBTSxRQUFRLEdBQUcsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLEtBQUssRUFBRSxHQUFBLENBQUM7O0FBQzNDLElBQU0sS0FBSyxHQUFHLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxLQUFLLEVB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
