import {ServerTrackingData} from '@app/shared/models/server-tracking-data';

export interface OrdiniListaModel extends ServerTrackingData {
  oldFields: any;
  id: number;
  status: string;
  emit_date: string;
  delivery_address: string;
  delivery_term: string;
  payment_term: string;
  packaging: string;
  currency: string;
  suppliersId: number;
  companiesId: number;
  orderType: string;
  code: string;
  viewed: boolean;
  email_send_status: boolean;
  response_term: number;
  rows: [];
  referent: {first_name: string, last_name: string};
  supplier: { r_sociale: string };
}
