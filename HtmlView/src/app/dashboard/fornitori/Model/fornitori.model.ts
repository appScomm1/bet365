import {ServerTrackingData} from '@app/shared/models/server-tracking-data';

export interface Fornitori extends ServerTrackingData {
  business_name: string;
  vat: string;
  delivery_address: string;
  email: string;
  phone: number;
  website: string;
  currency: string;
  delivery_term: string;
  payment_term: string;
  handler: Array<Handler>;
  address: Array<Address>;
  bank_account: Array<Bankaccount>;
  comunication: string;
}

export interface Handler {
  name: string;
  last_name: string;
  phone: number;
  branch: string ;
}

export interface Address {
  address: string;
  city: string;
  district: string;
  post_code: string;
}

export interface Bankaccount {
  bank: string;
  bank_account: string;
}
