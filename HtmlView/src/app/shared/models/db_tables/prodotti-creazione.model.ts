import {ServerTrackingData} from "@app/shared/models/server-tracking-data";

export interface ProdottiCreazioneModel extends ServerTrackingData {
  companiesId: number;
  id: number;
  name: string;
  type: string;
  internal_sku: string;
  barcode: string;
  notes: string;
  categories: [];
}
