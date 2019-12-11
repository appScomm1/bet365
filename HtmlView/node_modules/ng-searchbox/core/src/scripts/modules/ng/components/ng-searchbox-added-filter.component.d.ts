import { ElementRef } from '@angular/core';
import { FilteringService } from '../services/filtering.service';
import { UtilsService } from '../services/utils.service';
import { EventHandling } from '../services/event-handling.service';
import { NgSearchboxComponent } from './ng-searchbox.component';
import { NgSearchboxFilterSelectors } from './ng-searchbox-filter-selectors.component';
import { ModifiedSearch } from '../../../interfaces/search';
export declare class NgSearchboxAddedFilter {
    private utils;
    ngSearchboxAddedFilter: ElementRef;
    ngFilterSelectors: NgSearchboxFilterSelectors;
    Filtering: FilteringService;
    Event: EventHandling;
    filter: ModifiedSearch.ModifiedFilter;
    searchbox: NgSearchboxComponent;
    uuid: string;
    v: string;
    pv: string;
    private proxiedFunction;
    constructor(utils: UtilsService);
    set(filteringSvc: FilteringService, searchbox: NgSearchboxComponent, filter: ModifiedSearch.ModifiedFilter): NgSearchboxAddedFilter;
    toggleActivation(force?: boolean): void;
    openFilter(): NgSearchboxAddedFilter;
    setFocus(): NgSearchboxAddedFilter;
    closeFilter(): NgSearchboxAddedFilter;
    toggleFilterSelectors(): void;
    valueChange(val: string): void;
    onKeyDown(event: any): void;
    onKeyUp(event: KeyboardEvent): void;
    windowClicked(event: MouseEvent): void;
    /**
     * @method destroy
     * Unload this filter from our searchbox memory
     */
    destroy(): void;
}
