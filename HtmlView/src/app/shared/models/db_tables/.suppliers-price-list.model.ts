import {ServerTrackingData} from '@app/shared/models/server-tracking-data';

export interface SuppliersPriceListModel {
  min_qty: number;
  price: string;
  lead_time: number;
  PriceList: Array<PriceListModel>;
}

export interface PriceListModel extends ServerTrackingData {
  id: number;
  currency: string;
  suppliersId: number;
}
