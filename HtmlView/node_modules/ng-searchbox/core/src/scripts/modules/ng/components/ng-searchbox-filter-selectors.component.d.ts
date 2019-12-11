import { AfterViewInit } from '@angular/core';
import { NgSearchboxAddedFilter } from './ng-searchbox-added-filter.component';
import { Search, ModifiedSearch } from '../../../interfaces/search';
export declare class NgSearchboxFilterSelectors implements AfterViewInit {
    private ngAddedFilter;
    filter: ModifiedSearch.ModifiedFilter;
    selectors: Search.Selector[];
    shownStatus: boolean;
    constructor(ngAddedFilter: NgSearchboxAddedFilter);
    takeSelector(selector: Search.Selector): void;
    getDefaultSelector(): NgSearchboxFilterSelectors;
    ngAfterViewInit(): void;
    setVisibility(visibility?: boolean): NgSearchboxFilterSelectors;
}
