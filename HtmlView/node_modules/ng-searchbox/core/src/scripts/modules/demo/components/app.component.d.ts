import { Search } from '../../../interfaces/search';
import { API } from '../../ng/services/api.service';
export declare class AppComponent {
    afterDclComponents: any[];
    filters: Search.AvailableFilter[];
    config: Search.Configuration;
    register(api: API): void;
}
