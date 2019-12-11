import {ServerTrackingData} from "@app/shared/models/server-tracking-data";

export interface ListiniCreazioneModel extends ServerTrackingData {
  id: number;
  suppliersId: number;
  price: number;
  min_qty: number;
  productsId: number;
  price_listId: number;
}
