import {ServerTrackingData} from '@app/shared/models/server-tracking-data';

export interface ListiniListaModel  extends ServerTrackingData {
  id: number;
  productsId: number;
  min_qty: number;
  price: number;
  price_listId: number;
}

