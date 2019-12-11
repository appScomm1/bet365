import { ModifiedSearch, Search } from '../../../interfaces/search';
import { NgSearchboxComponent } from '../components/ng-searchbox.component';
export declare class EventHandling {
    private ngSearchBoxComponent;
    timer: any;
    constructor(ngSearchBoxComponent: NgSearchboxComponent);
    fire(type: string, data?: any): EventHandling;
    onChange(parameters: any, invocation?: Function): EventHandling;
    onQueryAdded(n: string, o: string): EventHandling;
    onQueryRemoved(n: string, o: string): EventHandling;
    onEraser(): EventHandling;
    onGarbage(): EventHandling;
    onFilterChanged(filter: ModifiedSearch.ModifiedFilter): EventHandling;
    onFilterSelectorChanged(selector: Search.Selector, filter: ModifiedSearch.ModifiedFilter): EventHandling;
    onOperatorChanged(operator: Search.Operator, filter: ModifiedSearch.ModifiedFilter): EventHandling;
}
